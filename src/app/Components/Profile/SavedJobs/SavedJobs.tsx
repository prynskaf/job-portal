'use client';

import React, { useEffect, useState } from 'react';
import './SavedJobs.scss';
import JobCard from '../../Job/JobCard/JobCard';
import Link from 'next/link';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Job } from '@/app/types/job';
import { auth, db } from '@/lib/firebaseConfig';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  // Handle unsave: update state and Firestore
  const handleUnsave = async (jobId: string) => {
    // Optimistically update UI
    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));

    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const currentData = userDocSnap.data();
        const updatedSavedJobs = (currentData.savedJobs || []).filter(
          (job: Job) => job.id !== jobId
        );

        await updateDoc(userDocRef, {
          savedJobs: updatedSavedJobs,
        });

        // Notify ProfileHeader to update count
        window.dispatchEvent(new CustomEvent('savedJobsChanged'));
      }
    } catch (error) {
      console.error('Error removing saved job:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log('User is logged in:', currentUser.uid);

        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const saved = userData.savedJobs || [];

          console.log('Fetched saved jobs:', saved);
          setSavedJobs(saved as Job[]);
        } else {
          console.log('No user document found');
        }
      } else {
        console.log('User not logged in');
      }
    });

    return () => unsubscribe();
  }, []);

  const MemoizedJobCard = React.memo(JobCard);

  return (
    <div className='SavedJobs'>
      <div className="SavedJobs__wrapper">
        <div className='saved-jobs-title'>Saved Jobs</div>
        <div className='saved-jobs-description'>A list of your saved jobs.</div>
        <div className='saved-jobs-list'>
          {savedJobs.length === 0 ? (
            <p>No saved jobs yet.</p>
          ) : (
            savedJobs.map((job) => (
              <div className="job__card" key={job.id}>
                <MemoizedJobCard
                  job={job}
                  onUnsave={() => handleUnsave(job.id)}
                />
              </div>
            ))
          )}
        </div>
        {savedJobs.length > 3 && (
          <div className="viewAll">
            <Link href="/jobs" className="viewAll">View More</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
