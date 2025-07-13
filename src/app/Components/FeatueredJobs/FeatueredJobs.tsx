'use client';
import React, { useEffect, useState } from 'react';
import './FeatueredJobs.scss';
import JobCard from '../Job/JobCard/JobCard';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchInitialJobs } from '@/lib/redux/jobsSlice';
import Loader from '../Loader/Loader';
import { toast } from 'sonner';

const FeatueredJobs = () => {
  const dispatch = useAppDispatch();
  const { filteredJobs, isLoading, error } = useAppSelector((state) => state.jobs);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      await dispatch(fetchInitialJobs());
      setHasFetched(true);
    };
    fetchJobs();
  }, [dispatch]);

  // 🔥 Show toast on error
  useEffect(() => {
    if (hasFetched && error) {
      toast.error('Failed to load featured jobs.', {
        description: 'Please try again later.',
        duration: 5000,
      });
    }
  }, [error, hasFetched]);

  const MemoizedJobCard = React.memo(JobCard);

  // ✅ Sort by updatedAt or postedAt
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="featured__wrapper">
      <div className="featured__jobs">
        <div className="featured__heading">
          <h1>Featured Jobs</h1>
          <p>Choose jobs from the top employers and apply for the same.</p>
        </div>

        <div className="featured__list" style={{ position: 'relative' }}>
          {isLoading && (
            <div className="joblistings__loader-overlay">
              <Loader />
            </div>
          )}
          {!isLoading && hasFetched && sortedJobs.slice(0, 3).map((job) => (
            <div className="job__card" key={job.id}>
              <MemoizedJobCard job={job} />
            </div>
          ))}
        </div>

        {!isLoading && filteredJobs.length > 3 && (
          <div className="viewAll">
            <Link href="/jobs" className="viewAll">View More</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatueredJobs;
