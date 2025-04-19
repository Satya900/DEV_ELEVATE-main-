import { createContext, useContext, useEffect, useState } from 'react';
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
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  profileLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
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

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

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
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      if (user) {
        fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
        setProfileLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    // Create default profile for new users
    const userDocRef = doc(db, 'users', credential.user.uid);
    await setDoc(userDocRef, defaultProfile);
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
        await updateProfile(currentUser, {
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
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    } finally {
      setProfileLoading(false);
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    profileLoading,
    signIn,
    signUp,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 