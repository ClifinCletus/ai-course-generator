// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-generator-cb423.firebaseapp.com",
  projectId: "ai-course-generator-cb423",
  storageBucket: "ai-course-generator-cb423.firebasestorage.app",
  messagingSenderId: "43192075927",
  appId: "1:43192075927:web:31666c024ae48e978ecbd2",
  measurementId: "G-K5PNLQ8565"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app) // to get storage