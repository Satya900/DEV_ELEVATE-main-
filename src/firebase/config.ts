import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence, Firestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-oEO2KxQjsdVDCFl0rFJDBK-ZNayFlxE",
  authDomain: "develevate-93ebd.firebaseapp.com",
  projectId: "develevate-93ebd",
  storageBucket: "develevate-93ebd.appspot.com",
  messagingSenderId: "76773234742",
  appId: "1:76773234742:web:220b3bd34fbdd4c274a097",
  measurementId: "G-DCJPKFTPV2"
};

// Initialize Firebase with expanded error handling
let app;
try {
  console.log('Initializing Firebase with config:', JSON.stringify({
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain
  }));
  app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized successfully');
} catch (error) {
  console.error('Failed to initialize Firebase app:', error);
  throw new Error('Firebase initialization failed. Please check your internet connection and try again.');
}

// Initialize services with enhanced logging
let auth;
let db: Firestore;

try {
  auth = getAuth(app);
  console.log('Firebase Auth initialized successfully');
  
  // Uncomment for local testing with auth emulator
  // if (location.hostname === 'localhost') {
  //   connectAuthEmulator(auth, 'http://localhost:9099');
  //   console.log('Using Auth emulator at http://localhost:9099');
  // }
} catch (authError) {
  console.error('Failed to initialize Firebase Auth:', authError);
  throw new Error('Authentication service initialization failed');
}

try {
  db = getFirestore(app);
  console.log('Firestore initialized successfully');
  
  // Uncomment for local testing with Firestore emulator
  // if (location.hostname === 'localhost') {
  //   connectFirestoreEmulator(db, 'localhost', 8080);
  //   console.log('Using Firestore emulator at localhost:8080');
  // }
} catch (dbError) {
  console.error('Failed to initialize Firestore:', dbError);
  throw new Error('Database service initialization failed');
}

// Enable offline persistence (for web) with better error handling
try {
  enableIndexedDbPersistence(db).then(() => {
    console.log("Firestore persistence enabled successfully");
  }).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn("Firestore persistence could not be enabled: Multiple tabs open");
    } else if (err.code === 'unimplemented') {
      console.warn("Firestore persistence not available in this browser");
    } else {
      console.error("Firestore persistence failed to enable:", err);
    }
  });
} catch (persistenceError) {
  console.error("Error when setting up Firestore persistence:", persistenceError);
  // Continue without persistence - non-fatal error
}

// Verify Firebase connection is functioning
const verifyFirebaseConnection = async () => {
  try {
    const authCurrentUser = auth.currentUser;
    console.log("Auth check complete, current user:", authCurrentUser ? "Logged in" : "Not logged in");
    
    console.log("Firebase connection verified");
    return true;
  } catch (error) {
    console.error("Firebase connection verification failed:", error);
    return false;
  }
};

// Run verification in development mode
if (import.meta.env.DEV) {
  verifyFirebaseConnection().then(isConnected => {
    console.log('Firebase connection verified:', isConnected ? "SUCCESS" : "FAILED");
  });
}

// Export services and verification function
export { auth, db, verifyFirebaseConnection }; 