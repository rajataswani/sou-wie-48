
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw-EIzaDp7bY48eC31lP1UBIQqunJVWfw",
  authDomain: "sou-wie.firebaseapp.com",
  projectId: "sou-wie",
  storageBucket: "sou-wie.appspot.com",
  messagingSenderId: "121651925560",
  appId: "1:121651925560:web:546b25b498e56ed42ecccd",
  measurementId: "G-SN3ND5NW0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable offline persistence when possible
try {
  console.log("Attempting to enable Firestore persistence...");
  enableIndexedDbPersistence(db)
    .then(() => {
      console.log("Firestore persistence enabled successfully!");
    })
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.warn('Persistence failed: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the features required
        console.warn('Persistence is not available in this browser');
      } else {
        console.error("Unknown error enabling persistence:", err);
      }
    });
} catch (error) {
  console.error("Error enabling persistence:", error);
}

// For troubleshooting Firebase issues
console.log("Firebase initialized with config:", {
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket
});
