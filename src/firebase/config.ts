
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwNhYnt33S8UKQrKJ3WHvG35pqbhxaoQU",
  authDomain: "vrn-attempt-3.firebaseapp.com",
  projectId: "vrn-attempt-3",
  storageBucket: "vrn-attempt-3.appspot.com",
  messagingSenderId: "905624743663",
  appId: "1:905624743663:web:e509e331d993d30f4e751a",
  measurementId: "G-5B7Y5L2N26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Initialize Analytics conditionally (may not be available in all environments)
let analytics = null;

// Setup analytics if supported
const setupAnalytics = async () => {
  try {
    if (await isSupported()) {
      analytics = getAnalytics(app);
    }
  } catch (e) {
    console.log('Analytics not supported in this environment');
  }
};

setupAnalytics();
export { analytics };

export default app;
