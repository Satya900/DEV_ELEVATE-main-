// src/context/AuthContext.tsx (Merged and Unified)

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOutFn, // Renamed to avoid collision with context method
  onAuthStateChanged,
  User,
  updateProfile
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp
} from 'firebase/firestore';

// NOTE: You must ensure these imports point to the correct files in your project.
// Adjust as necessary, e.g., 'firebase/config' vs 'firebaseClient'
import { auth, db } from '../firebase/config';
import { mockQuestions } from '../data/mockQuestions';
import { UserProgress, Submission } from "../data/userProgress";
import { getTopicsForQuestion, calculateTopicProgress } from '../data/topics';

// --- Type Definitions (from second code block) ---

// Define the shape of the user profile stored in Firestore
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

// Define the slimmed-down user object exposed by the context
export interface CurrentUser {
  uid: string;
  email: string;
  displayName: string;
}

// Define the shape of the context value
interface AuthContextType {
  currentUser: CurrentUser | null;
  userProfile: UserProfile | null;
  userProgress: UserProgress | null;
  loading: boolean;
  profileLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  addSubmission: (submission: Omit<Submission, "id" | "userId" | "questionTitle"> & { questionTitle?: string }) => Promise<void>;
  updateSolvedQuestion: (questionId: string) => Promise<void>;
}

// --- Default Data (from second code block) ---

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
    { category: "Array", solved: 0, total: 3, percentage: 0 },
    { category: "Hash Table", solved: 0, total: 2, percentage: 0 },
    { category: "Math", solved: 0, total: 1, percentage: 0 },
    { category: "Basics", solved: 0, total: 1, percentage: 0 }
  ],
  difficultyProgress: [
    { difficulty: "Beginner", solved: 0, total: 1, percentage: 0 },
    { difficulty: "Easy", solved: 0, total: 3, percentage: 0 },
    { difficulty: "Medium", solved: 0, total: 1, percentage: 0 },
    { difficulty: "Hard", solved: 0, total: 0, percentage: 0 },
    { difficulty: "Expert", solved: 0, total: 0, percentage: 0 }
  ],
  badges: [],
  totalSolved: 0,
  totalAttempted: 0,
  rank: 0,
  xp: 0,
  level: 1
};

// --- Context & Hook ---

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// --- Provider Component ---

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  // --- Firestore Utility Functions ---

  const saveUserProgress = useCallback(async (progress: UserProgress) => {
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
  }, [currentUser]);

  const fetchUserProgress = useCallback(async (userId: string) => {
    try {
      const progressDocRef = doc(db, 'userProgress', userId);
      const progressDoc = await getDoc(progressDocRef);

      if (progressDoc.exists()) {
        const data = progressDoc.data();

        // Handle date conversions from Timestamp
        const progress: UserProgress = {
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
        const newProgress: UserProgress = {
          ...defaultUserProgress,
          userId,
          displayName: auth.currentUser?.displayName || ""
        };
        await setDoc(progressDocRef, newProgress);
        setUserProgress(newProgress);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  }, []);

  const fetchUserProfile = useCallback(async (userId: string) => {
    setProfileLoading(true);
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setUserProfile(userDoc.data() as UserProfile);
      } else {
        // Create default profile if none exists
        const newProfile = {
            ...defaultProfile,
            displayName: auth.currentUser?.displayName || '',
        };
        await setDoc(userDocRef, newProfile);
        setUserProfile(newProfile);
      }

      // Fetch user progress data
      await fetchUserProgress(userId);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setProfileLoading(false);
    }
  }, [fetchUserProgress]);

  // --- Auth State Listener ---

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Map Firebase User to CurrentUser
        const mappedUser: CurrentUser = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'User'
        };
        setCurrentUser(mappedUser);

        // Fetch profile and progress data
        fetchUserProfile(user.uid);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        setUserProgress(null);
        setProfileLoading(false); // Ensure profile loading is off when logged out
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [fetchUserProfile]);

  // --- Auth & Data Actions ---

  const signIn = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: unknown) {
    console.error('AuthContext: Sign in failed with error:', error);

    let message = 'An error occurred during sign in.';

    if (error && typeof error === 'object' && 'code' in error) {
      switch ((error as any).code) {
        case 'auth/wrong-password':
          message = 'Invalid password. Please try again.';
          break;
        case 'auth/user-not-found':
          message = 'No user found with this email.';
          break;
        case 'auth/too-many-requests':
          message = 'Too many failed attempts. Please try later.';
          break;
        case 'auth/invalid-email':
          message = 'Please enter a valid email address.';
          break;
        default:
          message = (error as any).message || message;
      }
    }

    // Throw a string instead of Error object for easier display in TSX form
    throw message;
  }
};



  const signUp = async (email: string, password: string) => {
    try {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = credential.user.uid;

        // 1. Set Auth display name
        await updateProfile(credential.user, { displayName: 'New User' });

        // 2. Create default profile for new users
        const userDocRef = doc(db, 'users', userId);
        const profileToCreate = {
            ...defaultProfile,
            displayName: 'New User'
        };
        await setDoc(userDocRef, profileToCreate);

        // 3. Create default progress for new users
        const progressDocRef = doc(db, 'userProgress', userId);
        const newProgress = {
            ...defaultUserProgress,
            userId: userId,
            displayName: 'New User'
        };
        await setDoc(progressDocRef, newProgress);
        // State updated via onAuthStateChanged listener
    } catch (error) {
        console.error('AuthContext: Sign up failed with error:', error);
        throw error;
    }
  };

  const logout = async () => {
    // Retained the behavior of the second context (just signs out, listener handles state change)
    await firebaseSignOutFn(auth);
  };

  const updateUserProfile = async (profileData: Partial<UserProfile>) => {
    if (!currentUser) throw new Error('No authenticated user');

    setProfileLoading(true);
    try {
      // 1. Update displayName in Firebase Auth if provided
      if (profileData.displayName) {
        await updateProfile(auth.currentUser!, {
          displayName: profileData.displayName
        });
      }

      // 2. Update user data in Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, profileData as Record<string, any>);

      // 3. Update local state
      setUserProfile(prev => {
        if (!prev) return profileData as UserProfile;
        return { ...prev, ...profileData };
      });

      // 4. Update displayName in userProgress if it changed
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

  const addSubmission = async (submission: Omit<Submission, "id" | "userId" | "questionTitle"> & { questionTitle?: string }) => {
    if (!currentUser || !userProgress) {
      console.error("Cannot add submission: user or progress data is missing");
      return;
    }

    try {
      const question = mockQuestions.find(q => q.id === submission.questionId);
      const questionTitle = question ? question.title : submission.questionTitle || `Problem #${submission.questionId}`;

      const newSubmission: Submission = {
        id: Date.now().toString(),
        userId: currentUser.uid,
        questionTitle: questionTitle,
        timestamp: new Date().toISOString(), // Use ISO string initially
        ...submission,
      };

      const userProgressRef = doc(db, 'userProgress', currentUser.uid);
      const userProgressDoc = await getDoc(userProgressRef);

      if (userProgressDoc.exists()) {
        const currentData = userProgressDoc.data() as any;
        const updatedSubmissions = [newSubmission, ...(currentData.submissions?.map((sub: any) => ({
            ...sub,
            timestamp: sub.timestamp?.toDate() || new Date()
        })) || [])];

        // Prepare for Firestore: convert timestamps back
        const firestoreSubmissions = updatedSubmissions.map(sub => ({
            ...sub,
            timestamp: Timestamp.fromDate(new Date(sub.timestamp))
        }));

        await updateDoc(userProgressRef, {
          submissions: firestoreSubmissions,
          totalAttempted: Math.max(userProgress.totalAttempted || 0, updatedSubmissions.length)
        });
        
        // Update local state with new submission and totalAttempted count
        const updatedProgress = {
          ...userProgress,
          submissions: updatedSubmissions,
          totalAttempted: Math.max(userProgress.totalAttempted || 0, updatedSubmissions.length)
        };
        
        console.log('Updated user progress with new submission:', {
          totalSubmissions: updatedSubmissions.length,
          newSubmission,
          updatedProgress
        });
        
        setUserProgress(updatedProgress);
      }

      if (submission.status === 'Accepted') {
        updateSolvedQuestion(submission.questionId);
      }
    } catch (error) {
      console.error("Error adding submission:", error);
      throw error;
    }
  };

  const updateSolvedQuestion = async (questionId: string) => {
    if (!userProgress || !currentUser) {
      console.error("Cannot update solved question: userProgress or currentUser is null");
      return;
    }

    // Check if already solved (handling both array and object storage formats)
    const isSolvedArray = Array.isArray(userProgress.solvedQuestions) && userProgress.solvedQuestions.includes(questionId);
    const isSolvedObject = typeof userProgress.solvedQuestions === 'object' && userProgress.solvedQuestions !== null && !!userProgress.solvedQuestions[questionId];

    if (isSolvedArray || isSolvedObject) return;

    // Convert to object format for updates if currently an array
    let updatedSolvedQuestions: Record<string, boolean>;
    if (Array.isArray(userProgress.solvedQuestions)) {
      updatedSolvedQuestions = userProgress.solvedQuestions.reduce((acc, id) => ({ ...acc, [id]: true }), {});
    } else {
      updatedSolvedQuestions = userProgress.solvedQuestions || {};
    }
    updatedSolvedQuestions[questionId] = true;

    const solvedQuestionsArray = Object.keys(updatedSolvedQuestions);

    // 1. Calculate new progress state
    const updatedProgress: UserProgress = {
      ...userProgress,
      solvedQuestions: updatedSolvedQuestions,
      totalSolved: userProgress.totalSolved + 1,
      totalAttempted: Math.max(userProgress.totalAttempted, userProgress.totalSolved + 1),
      xp: userProgress.xp + 10
    };

    // Update Topic Progress
    const affectedTopics = getTopicsForQuestion(questionId);
    if (affectedTopics.length > 0) {
      const updatedTopicProgress = [...(updatedProgress.topicProgress || [])];

      affectedTopics.forEach(topic => {
        const topicProgress = calculateTopicProgress(topic, solvedQuestionsArray);
        const existingTopicProgressIndex = updatedTopicProgress.findIndex(tp => tp.topicId === topic.id);
        const topicSolvedQuestions = solvedQuestionsArray.filter(qId => topic.questions.includes(qId));
        const newPoints = topicSolvedQuestions.length * 10;

        const newTopicProgress = {
          topicId: topic.id,
          solvedQuestions: topicSolvedQuestions,
          points: newPoints,
          badgeLevel: topicProgress.badgeLevel,
          lastUpdated: new Date().toISOString()
        };

        if (existingTopicProgressIndex >= 0) {
          updatedTopicProgress[existingTopicProgressIndex] = newTopicProgress;
        } else {
          updatedTopicProgress.push(newTopicProgress);
        }
      });
      updatedProgress.topicProgress = updatedTopicProgress;
    }

    // 2. Update local state
    setUserProgress(updatedProgress);

    // 3. Asynchronously save to Firebase
    try {
      await saveUserProgress(updatedProgress);
    } catch (error) {
      console.error("Error saving user progress to Firebase:", error);
    }
  };

  // --- Context Value ---

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
      {/* Only render children after initial loading is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};