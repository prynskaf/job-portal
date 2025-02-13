import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, googleProvider, db } from "./firebaseConfig";
import { doc, setDoc, getDoc, DocumentReference, DocumentSnapshot } from "firebase/firestore";

// Google Sign-In
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user exists in Firestore
    const userDocRef: DocumentReference = doc(db, "users", user.uid);
    const userSnapshot: DocumentSnapshot = await getDoc(userDocRef);

    // If user doesn't exist, add to Firestore
    if (!userSnapshot.exists()) {
      await setDoc(userDocRef, {
        id: user.uid,
        email: user.email,
        fullName: user.displayName || "",
        phoneNumber: "",
        savedJobs: [],
        appliedJobs: [],
        profilePic: user.photoURL || "",
      });
    }

    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return null;
  }
};

// Email/Password Sign-Up
export const signUpWithEmail = async (
  email: string,
  password: string,
  fullName: string,
  mobileNumber: string
): Promise<User | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Set display name in Firebase Auth
    await updateProfile(user, {
      displayName: fullName,
    });

    // Add user to Firestore
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      email: user.email,
      fullName: fullName,
      phoneNumber: mobileNumber,
      savedJobs: [],
      appliedJobs: [],
      profilePic: "",
    });

    return user;
  } catch (error) {
    console.error("Sign-Up Error:", error);
    return null;
  }
};

// Email/Password Sign-In
export const signInWithEmail = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Sign-In Error:", error);
    return null;
  }
};

// Logout
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

export { auth };