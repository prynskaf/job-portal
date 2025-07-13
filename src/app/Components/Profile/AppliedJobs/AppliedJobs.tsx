'use client';

import React, { useEffect, useState } from 'react';
import './AppliedJobs.scss';
import { auth, db } from '@/lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AppliedJob {
  id: string;
  title: string;
  company: string;
  appliedDate?: string; // Optional - you can add this on application submit if you want
  status?: string; // Optional
}

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const jobs = userData.appliedJobs || [];
          setAppliedJobs(jobs);
        }
      } else {
        setAppliedJobs([]); // no user logged in
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading applied jobs...</p>;

  if (appliedJobs.length === 0) {
    return (
      <div className="AppliedJobs">
        <div className="AppliedJobs__wrapper">
          <div className="applied-jobs-title">Applied Jobs</div>
          <div className="applied-jobs-description">You haven&#39;t applied for any jobs yet.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="AppliedJobs">
      <div className="AppliedJobs__wrapper">
        <div className="applied-jobs-title">Applied Jobs</div>
        <div className="applied-jobs-description">A list of your applied jobs.</div>
        <table className="applied-jobs-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Applied Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.appliedDate || 'N/A'}</td>
                <td>
                  <span className={`status status--${(job.status || 'pending').toLowerCase()}`}>
                    {job.status || 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedJobs;
