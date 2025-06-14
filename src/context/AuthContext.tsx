import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
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
  updateDoc,
  arrayUnion,
  Timestamp
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
  addSubmission: (submission: Omit<Submission, "id">) => Promise<void>;
  updateSolvedQuestion: (questionId: string) => Promise<void>;
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
  
  // Reference to progress listeners
  const progressListeners = useRef<((progress: UserProgress) => void)[]>([]);

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
      
      // Convert Date objects to Firestore timestamps
      const firestoreProgress = {
        ...progress,
        streak: {
          ...progress.streak,
          lastActive: Timestamp.fromDate(new Date(progress.streak.lastActive))
        },
        submissions: progress.submissions?.map(sub => ({
          ...sub,
          timestamp: Timestamp.fromDate(new Date(sub.timestamp))
        })),
        badges: progress.badges?.map(badge => ({
          ...badge,
          earnedAt: Timestamp.fromDate(new Date(badge.earnedAt))
        }))
      };
      
      await setDoc(progressDocRef, firestoreProgress);
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
        questionTitle: questionTitle || submission.questionTitle, // Add the question title to the submission
        ...submission,
      };

      // Add to Firestore
      const userProgressRef = doc(db, 'userProgress', currentUser.uid);
      
      // Get current progress
      const userProgressDoc = await getDoc(userProgressRef);
      if (userProgressDoc.exists()) {
        const currentProgress = userProgressDoc.data() as UserProgress;
        
        // Update with new submission at the beginning of the array
        const updatedSubmissions = [newSubmission, ...(currentProgress.submissions || [])];
        
        await updateDoc(userProgressRef, {
          submissions: updatedSubmissions
        });
        
        // Update local state
        setUserProgress({
          ...userProgress,
          submissions: updatedSubmissions
        });
      }

      // Only update solved status if the submission was successful
      if (submission.status === 'Accepted') {
        // Don't await this to make the UI more responsive
        updateSolvedQuestion(submission.questionId);
      }
    } catch (error) {
      console.error("Error adding submission:", error);
      throw error;
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
    updateSolvedQuestion
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};