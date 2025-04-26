import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc
} from 'firebase/firestore';
import { mockUserProgress, UserProgress, Submission } from "../data/userProgress";
import { topics, getTopicsForQuestion, calculateTopicProgress, getPointsPerQuestion } from '../data/topics';
import { mockQuestions } from '../data/mockQuestions';

// Import Firebase instances from the centralized config
import { auth, db } from '../firebase/config';

export interface UserProfile {
  displayName: string;
  bio: string;
  stats: {
    articlesRead: number;
    projectsCompleted: number;
    contributions: number;
    points: number;
  };
  activities: Array<{
    title: string;
    timestamp: string;
    type: 'course' | 'project';
  }>;
}

interface AuthContextType {
  currentUser: {
    uid: string;
    email: string;
    displayName: string;
  } | null;
  userProgress: UserProgress | null;
  loading: boolean;
  profileLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  addSubmission: (submission: Omit<Submission, "id">) => void;
  updateSolvedQuestion: (questionId: string) => void;
}

const defaultProfile: UserProfile = {
  displayName: '',
  bio: 'React developer passionate about building great user experiences',
  stats: {
    articlesRead: 0,
    projectsCompleted: 0,
    contributions: 0,
    points: 0
  },
  activities: [
    {
      title: 'Joined DevElevate',
      timestamp: new Date().toISOString(),
      type: 'course'
    }
  ]
};

// Initialize default user progress with zero values
const defaultUserProgress: UserProgress = {
  userId: "",
  displayName: "",
  solvedQuestions: [],
  submissions: [],
  streak: {
    currentStreak: 0,
    longestStreak: 0,
    lastActive: new Date(),
    calendar: {}
  },
  categoryProgress: [
    {
      category: "Array",
      solved: 0,
      total: 3,
      percentage: 0
    },
    {
      category: "Hash Table",
      solved: 0,
      total: 2,
      percentage: 0
    },
    {
      category: "Math",
      solved: 0,
      total: 1,
      percentage: 0
    },
    {
      category: "Basics",
      solved: 0,
      total: 1,
      percentage: 0
    }
  ],
  difficultyProgress: [
    {
      difficulty: "Beginner",
      solved: 0,
      total: 1,
      percentage: 0
    },
    {
      difficulty: "Easy",
      solved: 0,
      total: 3,
      percentage: 0
    },
    {
      difficulty: "Medium",
      solved: 0,
      total: 1,
      percentage: 0
    },
    {
      difficulty: "Hard",
      solved: 0,
      total: 0,
      percentage: 0
    },
    {
      difficulty: "Expert",
      solved: 0,
      total: 0,
      percentage: 0
    }
  ],
  badges: [],
  totalSolved: 0,
  totalAttempted: 0,
  rank: 0,
  xp: 0,
  level: 1
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<{
    uid: string;
    email: string;
    displayName: string;
  } | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [userSubmissions, setUserSubmissions] = useState<Submission[]>([]);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (userId: string) => {
    setProfileLoading(true);
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        setUserProfile(userDoc.data() as UserProfile);
      } else {
        // Create default profile if none exists
        await setDoc(userDocRef, defaultProfile);
        setUserProfile(defaultProfile);
      }

      // Fetch user progress data
      await fetchUserProgress(userId);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  // Fetch user progress from Firestore
  const fetchUserProgress = async (userId: string) => {
    try {
      const progressDocRef = doc(db, 'userProgress', userId);
      const progressDoc = await getDoc(progressDocRef);
      
      if (progressDoc.exists()) {
        // Convert Firestore timestamps back to Date objects if needed
        const data = progressDoc.data();
        
        // Handle date conversions
        const progress = {
          ...data,
          streak: {
            ...data.streak,
            lastActive: data.streak.lastActive?.toDate() || new Date()
          },
          submissions: data.submissions?.map((sub: any) => ({
            ...sub,
            timestamp: sub.timestamp?.toDate() || new Date()
          })) || [],
          badges: data.badges?.map((badge: any) => ({
            ...badge,
            earnedAt: badge.earnedAt?.toDate() || new Date()
          })) || []
        } as UserProgress;
        
        setUserProgress(progress);
      } else {
        // Create default progress if none exists
        const newProgress = {
          ...defaultUserProgress,
          userId,
          displayName: currentUser?.displayName || ""
        };
        await setDoc(progressDocRef, newProgress);
        setUserProgress(newProgress);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  // Save user progress to Firestore
  const saveUserProgress = async (progress: UserProgress) => {
    if (!currentUser) return;
    
    try {
      const progressDocRef = doc(db, 'userProgress', currentUser.uid);
      await setDoc(progressDocRef, progress);
    } catch (error) {
      console.error('Error saving user progress:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || ''
        });
        fetchUserProfile(user.uid);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        setUserProgress(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('AuthContext: Attempting sign in with email:', email);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('AuthContext: Sign in successful, user:', result.user.uid);
      return result;
    } catch (error) {
      console.error('AuthContext: Sign in failed with error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    // Create default profile for new users
    const userDocRef = doc(db, 'users', credential.user.uid);
    await setDoc(userDocRef, defaultProfile);
    
    // Create default progress for new users
    const progressDocRef = doc(db, 'userProgress', credential.user.uid);
    const newProgress = {
      ...defaultUserProgress,
      userId: credential.user.uid,
      displayName: credential.user.displayName || ""
    };
    await setDoc(progressDocRef, newProgress);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUserProfile = async (profileData: Partial<UserProfile>) => {
    if (!currentUser) throw new Error('No authenticated user');
    
    setProfileLoading(true);
    try {
      // Update displayName in Firebase Auth if it's provided
      if (profileData.displayName) {
        await updateProfile(auth.currentUser!, {
          displayName: profileData.displayName
        });
      }
      
      // Update user data in Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, profileData);
      
      // Update local state
      setUserProfile(prev => {
        if (!prev) return profileData as UserProfile;
        return { ...prev, ...profileData };
      });
      
      // Update displayName in userProgress if it changed
      if (profileData.displayName && userProgress) {
        const updatedProgress = {
          ...userProgress,
          displayName: profileData.displayName
        };
        setUserProgress(updatedProgress);
        await saveUserProgress(updatedProgress);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    } finally {
      setProfileLoading(false);
    }
  };

  // Function to add a new submission
  const addSubmission = async (submission: Omit<Submission, "id">) => {
    if (!currentUser || !userProgress) {
      console.error("Cannot add submission: user or progress data is missing");
      return;
    }

    try {
      // Get the question details to include title
      const question = mockQuestions.find(q => q.id === submission.questionId);
      const questionTitle = question ? question.title : `Problem #${submission.questionId}`;
      
      // Create a submission record with ID and question title
      const newSubmission: Submission = {
        id: Date.now().toString(),
        userId: currentUser.uid,
        questionTitle, // Add the question title to the submission
        ...submission,
      };

      // Add to Firestore
      const submissionRef = doc(db, 'submissions', newSubmission.id);
      await setDoc(submissionRef, newSubmission);
      
      // Also add to the user's submissions array in the userProgress document
      const userProgressRef = doc(db, 'userProgress', currentUser.uid);
      if (userProgress) {
        // Update with new submission at the beginning of the array
        const updatedSubmissions = [newSubmission, ...(userProgress.submissions || [])];
        await updateDoc(userProgressRef, {
          submissions: updatedSubmissions
        });
      }

      // Update the local state immediately for faster UI response
      const updatedSubmissions = [...userSubmissions, newSubmission];
      setUserSubmissions(updatedSubmissions);

      // Only update solved status if the submission was successful
      if (submission.status === 'success') {
        // Don't await this to make the UI more responsive
        updateSolvedQuestion(submission.questionId);
      }
    } catch (error) {
      console.error("Error adding submission:", error);
    }
  };

  // Function to update solved questions
  const updateSolvedQuestion = async (questionId: string) => {
    if (!userProgress || !currentUser) {
      console.error("Cannot update solved question: userProgress or currentUser is null");
      return;
    }

    // Check if already solved - handle both array and object storage formats
    let alreadySolved = false;
    if (Array.isArray(userProgress.solvedQuestions)) {
      alreadySolved = userProgress.solvedQuestions.includes(questionId);
    } else if (typeof userProgress.solvedQuestions === 'object' && userProgress.solvedQuestions !== null) {
      alreadySolved = !!userProgress.solvedQuestions[questionId];
    }

    if (alreadySolved) {
      return;
    }

    // Handle both array and object formats for solvedQuestions
    let updatedSolvedQuestions: any;
    if (Array.isArray(userProgress.solvedQuestions)) {
      updatedSolvedQuestions = [...userProgress.solvedQuestions, questionId];
    } else {
      // If it's an object or undefined, create/update an object
      updatedSolvedQuestions = { 
        ...(userProgress.solvedQuestions || {}), 
        [questionId]: true 
      };
    }

    // Update solved questions list
    const updatedProgress: UserProgress = {
      ...userProgress,
      solvedQuestions: updatedSolvedQuestions,
      totalSolved: userProgress.totalSolved + 1,
      totalAttempted: Math.max(userProgress.totalAttempted, userProgress.totalSolved + 1),
      xp: userProgress.xp + 10 // Add 10 XP for solving a problem (changed from 50)
    };

    // Update topic progress
    const affectedTopics = getTopicsForQuestion(questionId);
    
    if (affectedTopics.length > 0) {
      // Convert solved questions to array format for topic progress calculation
      const solvedQuestionsArray = Array.isArray(updatedSolvedQuestions) 
        ? updatedSolvedQuestions 
        : Object.keys(updatedSolvedQuestions).filter(id => updatedSolvedQuestions[id]);
      
      // Update each affected topic progress
      const updatedTopicProgress = [...(updatedProgress.topicProgress || [])];
      
      affectedTopics.forEach(topic => {
        // Calculate progress using our optimized function
        const topicProgress = calculateTopicProgress(topic, solvedQuestionsArray);
        const existingTopicProgressIndex = updatedTopicProgress.findIndex(tp => tp.topicId === topic.id);
        
        // Each solved question is worth exactly 10 points for more predictable progress
        const newPoints = solvedQuestionsArray.filter(qId => topic.questions.includes(qId)).length * 10;
        
        if (existingTopicProgressIndex >= 0) {
          updatedTopicProgress[existingTopicProgressIndex] = {
            ...updatedTopicProgress[existingTopicProgressIndex],
            solvedQuestions: solvedQuestionsArray.filter(qId => topic.questions.includes(qId)),
            points: newPoints,
            badgeLevel: topicProgress.badgeLevel,
            lastUpdated: new Date().toISOString()
          };
        } else {
          updatedTopicProgress.push({
            topicId: topic.id,
            solvedQuestions: solvedQuestionsArray.filter(qId => topic.questions.includes(qId)),
            points: newPoints,
            badgeLevel: topicProgress.badgeLevel,
            lastUpdated: new Date().toISOString()
          });
        }
      });
      
      updatedProgress.topicProgress = updatedTopicProgress;
    }

    // Immediately update local state for faster UI updates
    setUserProgress(updatedProgress);
    
    // Then asynchronously save to Firebase
    try {
      await saveUserProgress(updatedProgress);
    } catch (error) {
      console.error("Error saving user progress to Firebase:", error);
    }
  };

  const updateUserProgress = async (
    userId: string,
    questionId: string,
    isCorrect: boolean,
    language: string
  ) => {
    try {
      console.log(`Updating progress for user ${userId}, question ${questionId}, isCorrect: ${isCorrect}`);
      // Get user progress document
      const userProgressRef = doc(db, 'userProgress', userId);
      const userProgressSnap = await getDoc(userProgressRef);
      
      if (!userProgressSnap.exists()) {
        console.error('User progress document not found');
        return;
      }
      
      const userProgress = userProgressSnap.data() as UserProgress;
      console.log('Current user progress:', userProgress);
      
      // Only update if submission is correct
      if (isCorrect) {
        const solvedQuestions = userProgress.solvedQuestions || [];
        const now = Date.now();
        let isNewlySolved = false;
        
        // Check if question was already solved (handling both array and object formats)
        const questionAlreadySolved = Array.isArray(solvedQuestions) 
          ? solvedQuestions.includes(questionId)
          : solvedQuestions[questionId] === true;
          
        console.log(`Question already solved: ${questionAlreadySolved}`);
        
        // If not already solved, add to solved questions
        if (!questionAlreadySolved) {
          isNewlySolved = true;
          
          // Update the solvedQuestions based on its current structure
          if (Array.isArray(solvedQuestions)) {
            userProgress.solvedQuestions = [...solvedQuestions, questionId];
          } else {
            userProgress.solvedQuestions = { 
              ...solvedQuestions, 
              [questionId]: true 
            };
          }
          
          // Increment the right counter based on difficulty
          const question = mockQuestions.find(q => q.id === questionId);
          
          if (question) {
            // Add experience points for solving a problem
            const difficultyMultiplier = 
              question.difficulty === 'Easy' ? 10 :
              question.difficulty === 'Medium' ? 20 : 30;
            
            userProgress.stats.experiencePoints += difficultyMultiplier;
            userProgress.stats.level = calculateLevel(userProgress.stats.experiencePoints);
            
            // Update the difficulty counters
            if (question.difficulty === 'Easy') {
              userProgress.stats.easyCount += 1;
            } else if (question.difficulty === 'Medium') {
              userProgress.stats.mediumCount += 1;
            } else if (question.difficulty === 'Hard') {
              userProgress.stats.hardCount += 1;
            }
            
            // Increment the totalSolved counter
            userProgress.stats.totalSolved += 1;
            
            // Update topic progress for this question
            const relatedTopics = getTopicsForQuestion(questionId);
            console.log(`Question ${questionId} is related to topics:`, relatedTopics);
            
            // Initialize topic progress array if it doesn't exist
            if (!userProgress.topicProgress) {
              userProgress.topicProgress = [];
            }
            
            // Update progress for each related topic
            relatedTopics.forEach(topicId => {
              // Find existing topic progress or create new one
              let topicProgress = userProgress.topicProgress.find(tp => tp.topicId === topicId);
              
              if (!topicProgress) {
                topicProgress = {
                  topicId,
                  solvedQuestions: [],
                  points: 0,
                  badgeLevel: 0,
                  lastUpdated: now
                };
                userProgress.topicProgress.push(topicProgress);
              }
              
              // Add question to solved list if not already there
              if (!topicProgress.solvedQuestions.includes(questionId)) {
                topicProgress.solvedQuestions.push(questionId);
                
                // Add points for this question
                const pointsForQuestion = getPointsPerQuestion(topicId, questionId);
                topicProgress.points += pointsForQuestion;
                
                // Calculate new badge level
                const { badgeLevel } = calculateTopicProgress(topicId, topicProgress.solvedQuestions);
                topicProgress.badgeLevel = badgeLevel;
                topicProgress.lastUpdated = now;
                
                console.log(`Updated topic ${topicId}: points=${topicProgress.points}, badge=${topicProgress.badgeLevel}`);
              }
            });
            
            // Add to activity log
            const newActivity: Activity = {
              type: 'submission',
              timestamp: now,
              data: {
                questionId,
                questionTitle: question.title,
                difficulty: question.difficulty,
                language
              }
            };
            
            // If user leveled up, add that activity too
            if (userProgress.stats.level > (userProgressSnap.data() as UserProgress).stats.level) {
              const levelUpActivity: Activity = {
                type: 'level_up',
                timestamp: now,
                data: {
                  newLevel: userProgress.stats.level
                }
              };
              userProgress.activities = [levelUpActivity, ...(userProgress.activities || [])];
            }
            
            userProgress.activities = [newActivity, ...(userProgress.activities || [])];
          }
        }
        
        // Always update the lastActiveDate
        userProgress.lastActiveDate = now;
        
        // Update streak
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayTimestamp = today.getTime();
        
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayTimestamp = yesterday.getTime();
        
        const lastActiveDate = userProgress.lastActiveDate
          ? new Date(userProgress.lastActiveDate)
          : new Date(0);
        lastActiveDate.setHours(0, 0, 0, 0);
        const lastActiveDateTimestamp = lastActiveDate.getTime();
        
        if (lastActiveDateTimestamp < todayTimestamp) {
          if (lastActiveDateTimestamp === yesterdayTimestamp) {
            // User was active yesterday, increment streak
            userProgress.stats.streak += 1;
          } else if (lastActiveDateTimestamp < yesterdayTimestamp) {
            // User wasn't active yesterday, reset streak
            userProgress.stats.streak = 1;
          }
          // Update max streak if current streak is higher
          if (userProgress.stats.streak > userProgress.stats.maxStreak) {
            userProgress.stats.maxStreak = userProgress.stats.streak;
          }
        }
        
        // Update acceptance rate
        const submissions = userProgress.submissions || [];
        const correctSubmissions = submissions.filter(s => s.status === 'Accepted').length;
        userProgress.stats.acceptanceRate = submissions.length > 0
          ? Math.round((correctSubmissions / submissions.length) * 100)
          : 0;
        
        console.log('Updated user progress:', userProgress);
        
        // Update Firestore
        await setDoc(userProgressRef, userProgress);
        console.log('Successfully updated user progress in Firestore');
        
        // Call any registered progress listeners
        if (progressListeners.current.length > 0) {
          progressListeners.current.forEach(listener => {
            listener(userProgress);
          });
        }
        
        return userProgress;
      }
      
      return userProgress;
    } catch (error) {
      console.error('Error updating user progress:', error);
      return null;
    }
  };

  const value = {
    currentUser,
    userProfile,
    userProgress,
    loading,
    profileLoading,
    signIn,
    signUp,
    logout,
    updateUserProfile,
    addSubmission,
    updateSolvedQuestion,
    updateUserProgress,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 