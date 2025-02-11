import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHJB84j82mAzH7HH9VMz4M-MYaIeWY6T4",
  authDomain: "job-portal-e0d6b.firebaseapp.com",
  projectId: "job-portal-e0d6b",
  storageBucket: "job-portal-e0d6b.firebasestorage.app",
  messagingSenderId: "276629624684",
  appId: "1:276629624684:web:7c1434dd4b3cf075d04549",
  measurementId: "G-E6JJHKZ3QH"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();