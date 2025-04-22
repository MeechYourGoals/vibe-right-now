
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  onAuthStateChanged,
  getAuth,
  UserCredential
} from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

// User role types
export type UserRole = 'user' | 'admin' | 'venue_partner';

// User profile interface
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  createdAt: Date;
  lastLogin: Date;
  preferences?: {
    location?: {
      city: string;
      state: string;
      country: string;
    };
    notifications?: boolean;
    categories?: string[];
  };
}

// Create a new user with email and password
export const registerWithEmail = async (
  email: string, 
  password: string, 
  displayName: string
): Promise<UserCredential> => {
  try {
    // Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update the display name
    await updateProfile(user, { displayName });
    
    // Create a user profile document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName,
      photoURL: user.photoURL,
      role: 'user', // Default role
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      preferences: {
        notifications: true
      }
    });
    
    return userCredential;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmail = async (
  email: string, 
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login timestamp
    await setDoc(
      doc(db, 'users', userCredential.user.uid),
      { lastLogin: serverTimestamp() },
      { merge: true }
    );
    
    return userCredential;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Check if the user document exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create a new user profile if it doesn't exist
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: 'user', // Default role
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        preferences: {
          notifications: true
        }
      });
    } else {
      // Update last login timestamp
      await setDoc(
        doc(db, 'users', user.uid),
        { lastLogin: serverTimestamp() },
        { merge: true }
      );
    }
    
    return userCredential;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Sign out the current user
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

// Get the current user profile from Firestore
export const getCurrentUserProfile = async (): Promise<UserProfile | null> => {
  const user = auth.currentUser;
  
  if (!user) {
    return null;
  }
  
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (
  profile: Partial<UserProfile>
): Promise<void> => {
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('No authenticated user found');
  }
  
  try {
    // Update displayName and photoURL in Firebase Auth if provided
    if (profile.displayName || profile.photoURL) {
      await updateProfile(user, {
        displayName: profile.displayName || user.displayName,
        photoURL: profile.photoURL || user.photoURL
      });
    }
    
    // Update profile in Firestore
    await setDoc(
      doc(db, 'users', user.uid),
      { ...profile, updatedAt: serverTimestamp() },
      { merge: true }
    );
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Check if the user has a specific role
export const hasRole = async (
  user: User,
  role: UserRole
): Promise<boolean> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserProfile;
      return userData.role === role;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
};

// Listen to authentication state changes
export const subscribeToAuthChanges = (
  callback: (user: User | null) => void
) => {
  return onAuthStateChanged(auth, callback);
};

// Custom hook for Firebase authentication
export const useFirebaseAuth = () => {
  const firebaseAuth = getAuth();
  
  return {
    auth: firebaseAuth,
    registerWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signOutUser,
    resetPassword,
    getCurrentUserProfile,
    updateUserProfile,
    hasRole,
    subscribeToAuthChanges
  };
};
