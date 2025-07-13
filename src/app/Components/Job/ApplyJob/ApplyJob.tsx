'use client';
import React, { useRef, useState, useEffect } from 'react';
import './ApplyJob.scss';
import { Job } from '@/app/types/job';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { auth, db } from '@/lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { toast } from 'sonner';

interface ApplyJobProps {
  job: Job;
}

const ApplyJob: React.FC<ApplyJobProps> = ({ job }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('No file chosen');
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.files?.[0]?.name || 'No file chosen');
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!userId) {
    toast.error('You must be logged in to apply.');
    return;
  }

  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const appliedJobs = userData.appliedJobs || [];

      // Prevent duplicate entries
      const alreadyApplied = appliedJobs.some((j: Job) => j.id === job.id);
      if (alreadyApplied) {
        toast.error('You have already applied for this job.');
        return;
      }

      // Create a new applied job object with date and status
      const appliedJobWithMetadata = {
        ...job,
        appliedDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        status: 'Pending',
      };

      await updateDoc(userDocRef, {
        appliedJobs: [...appliedJobs, appliedJobWithMetadata],
      });

      // Increment applicantsCount on the job document
      const jobDocRef = doc(db, 'jobs', job.id);
      await updateDoc(jobDocRef, {
        applicantsCount: increment(1),
      });

      toast.success('Job application submitted successfully!');
      router.push('/profile');
    } else {
      toast.error('User document not found.');
    }
  } catch (error) {
    console.error('Error applying for job:', error);
    toast.error('An error occurred. Please try again later.');
  }
};



  return (
    <div className="job-application-container">
      <div className="form-header">
        <div className="back-button">
          <button onClick={() => router.back()} className="back-link">
            <ArrowLeft className="icon" size="30" /> Back to Jobs
          </button>
        </div>
        <h1>Job Application Form</h1>
        <p>Applying for <strong>{job.title}</strong></p>
      </div>

      <form className="application-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="John Doe" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Johndoe@gmail.com" required />
        </div>

        <div className="form-group">
          <label>Phone number</label>
          <input type="tel" placeholder="+32 00 44 885 20" required />
        </div>

        <div className="form-group">
          <label>Cover Letter</label>
          <textarea placeholder="Tell us why you're interested in this position." required />
        </div>

        <div className="form-group">
          <label>CV / Resume</label>
          <div className="file-upload">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button type="button" onClick={handleFileUpload}>Choose file</button>
            <span>{fileName}</span>
          </div>
        </div>

        <div className="form-group">
          <label>Portfolio URL (optional)</label>
          <input type="text" placeholder="https://your-portfolio.com" />
        </div>

        <button type="submit" className="submit-button">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyJob;
