"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebaseAuth";
import ProfileHeader from '../Components/Profile/ProfileHeader/ProfileHeader';
import AppliedJobs from '../Components/Profile/AppliedJobs/AppliedJobs';
import SavedJobs from '../Components/Profile/SavedJobs/SavedJobs';

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <ProfileHeader />
      <AppliedJobs />
      <SavedJobs />
    </div>
  );
}

export default ProfilePage;
