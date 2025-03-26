
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw-EIzaDp7bY48eC31lP1UBIQqunJVWfw",
  authDomain: "sou-wie.firebaseapp.com",
  projectId: "sou-wie",
  storageBucket: "sou-wie.firebasestorage.app",
  messagingSenderId: "121651925560",
  appId: "1:121651925560:web:546b25b498e56ed42ecccd",
  measurementId: "G-SN3ND5NW0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
