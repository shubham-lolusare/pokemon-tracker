import { initializeApp } from "firebase/app";

// firebase fiestore
import { getFirestore } from "firebase/firestore";

// firebase storage
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWJRfMosqyOSHa3kvKM3Uy4o1wR57fPzs",
  authDomain: "pokemon-tracker-2023.firebaseapp.com",
  projectId: "pokemon-tracker-2023",
  storageBucket: "pokemon-tracker-2023.appspot.com",
  messagingSenderId: "545685753956",
  appId: "1:545685753956:web:2553c054e62eb789778f71",
  // apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  // authDomain: `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`,
  // projectId: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
  // storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}`,
  // messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGING_ID}`,
  // appId: `${import.meta.env.VITE_FIREBASE_APP_ID}`,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// intializing firebase firestore
export const db = getFirestore(app);

// initializing firebase storage
export const storage = getStorage(app);
