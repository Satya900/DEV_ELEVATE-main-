import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-oEO2KxQjsdVDCFl0rFJDBK-ZNayFlxE",
  authDomain: "develevate-93ebd.firebaseapp.com",
  projectId: "develevate-93ebd",
  storageBucket: "develevate-93ebd.firebasestorage.app",
  messagingSenderId: "76773234742",
  appId: "1:76773234742:web:220b3bd34fbdd4c274a097",
  measurementId: "G-DCJPKFTPV2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// For debugging in development
if (import.meta.env.DEV) {
  console.log('Firebase initialized successfully');
} 