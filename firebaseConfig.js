import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCWJRfMosqyOSHa3kvKM3Uy4o1wR57fPzs",
  authDomain: "pokemon-tracker-2023.firebaseapp.com",
  projectId: "pokemon-tracker-2023",
  storageBucket: "pokemon-tracker-2023.appspot.com",
  messagingSenderId: "545685753956",
  appId: "1:545685753956:web:2553c054e62eb789778f71"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);