'use client';

import React, { useEffect, useState } from 'react';
import './BookmarkButton.scss';
import { Bookmark, Trash2 } from 'lucide-react';
import { Job } from '@/app/types/job';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebaseConfig';
import {
  doc,
  getDoc,
  updateDoc,
  setDoc
} from 'firebase/firestore';
import { toast } from 'sonner';  

interface BookmarkButtonProps {
  job: Job;
  className?: string;
  onUnsave?: () => void; // Optional callback to remove from UI on profile
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  job,
  className,
  onUnsave
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isProfilePage = pathname === '/profile';

  const [user, setUser] = useState<User | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const jobId = job.id;

  // Check if job is saved in user's savedJobs array
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const savedJobs = userDocSnap.data().savedJobs || [];
          setIsSaved(savedJobs.some((j: Job) => j.id === jobId));
        } else {
          setIsSaved(false);
        }
      } else {
        setUser(null);
        setIsSaved(false);
      }
    });

    return () => unsubscribe();
  }, [jobId]);

const handleClick = async () => {
  if (isLoading) return;

  if (!user) {
    router.push('/login');
    return;
  }

  setIsLoading(true);

  // Save the current saved state before optimistic update
  const wasSaved = isSaved;

  // Optimistic UI update
  setIsSaved(!wasSaved);
  if (wasSaved && onUnsave) onUnsave();

  const userDocRef = doc(db, 'users', user.uid);

  // Show loading toast
  const loadingToastId = toast.loading(wasSaved ? 'Removing...' : 'Saving...');

  try {
    const userDocSnap = await getDoc(userDocRef);
    let savedJobs: Job[] = [];
    if (userDocSnap.exists()) {
      savedJobs = userDocSnap.data().savedJobs || [];
    }

    if (wasSaved) {
      // Remove job
      const updatedJobs = savedJobs.filter((j: Job) => j.id !== jobId);
      await updateDoc(userDocRef, { savedJobs: updatedJobs });
      toast.success('Removed from saved jobs', { id: loadingToastId });
    } else {
      // Add job
      const updatedJobs = [...savedJobs, { ...job }];
      await updateDoc(userDocRef, { savedJobs: updatedJobs }).catch(async () => {
        // If doc doesn't exist, create it
        await setDoc(userDocRef, { savedJobs: updatedJobs });
      });
      toast.success('Saved successfully!', { id: loadingToastId });
    }
  } catch (error) {
    // Rollback optimistic update
    setIsSaved(wasSaved);
    console.error('Error toggling saved job:', error);
    toast.error('Failed to update saved jobs.', { id: loadingToastId });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <button
      onClick={handleClick}
      className={`${className} ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      aria-label={isSaved ? 'Unsave job' : 'Save job'}
    >
      {isSaved && isProfilePage ? (
        <Trash2 size={20} className="text-red-500" />
      ) : (
        <Bookmark
          size={20}
          className={isSaved ? 'text-purple-600' : 'text-gray-400'}
          fill={isSaved ? '#9333EA' : 'none'}
        />
      )}
    </button>
  );
};

export default BookmarkButton;
