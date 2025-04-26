// Firebase Firestore Schema

// User Profile Schema
export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  problemsSolved: number;
  totalSubmissions: number;
  successfulSubmissions: number;
  joinDate: Date;
  lastActive: Date;
  preferredLanguage?: string;
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

// Submission Schema
export interface SubmissionDocument {
  userId: string;
  problemId: string;
  code: string;
  language: string;
  status: 'pending' | 'running' | 'accepted' | 'wrong_answer' | 'time_limit_exceeded' | 'runtime_error';
  timestamp: Date;
  executionTime?: number;
  memoryUsed?: number;
  testCasesPassed?: number;
  totalTestCases?: number;
}

// User Stats Schema
export interface UserStatsDocument {
  userId: string;
  problemsSolved: number;
  totalSubmissions: number;
  successfulSubmissions: number;
  ranking: number;
  rating: number;
  badges: {
    id: string;
    name: string;
    description: string;
    earnedAt: Date;
  }[];
  lastUpdated: Date;
}