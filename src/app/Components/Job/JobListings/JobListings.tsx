'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
  fetchInitialJobs,
  fetchJobs,
  setSearchQuery
} from '@/lib/redux/jobsSlice';
import { useSearchParams } from 'next/navigation';
import './JobListings.scss';
import JobCard from '../JobCard/JobCard';
import Loader from '../../Loader/Loader';
import { toast } from "sonner";


const JobListings = () => {
  const dispatch = useAppDispatch();
  const { filteredJobs, isLoading, error } = useAppSelector((state) => state.jobs);
  const [visibleCount, setVisibleCount] = useState(9);
  const [hasFetched, setHasFetched] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const jobTitle = searchParams.get('jobTitle') || '';
    const location = searchParams.get('location') || '';

    const fetch = async () => {
      if (jobTitle || location) {
        dispatch(setSearchQuery({ jobTitle, location }));
        await dispatch(fetchJobs());
      } else {
        await dispatch(fetchInitialJobs());
      }
      setHasFetched(true);
    };

    fetch();
  }, [dispatch, searchParams]);

  useEffect(() => {
    setVisibleCount(9);
  }, [filteredJobs]);

  const MemoizedJobCard = React.memo(JobCard);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 9);
  const handleShowFew = () => setVisibleCount(9);

  const jobsToShow = filteredJobs.slice(0, visibleCount);

  // Toast message 
// ✅ Show toast only if there's an error
  useEffect(() => {
    if (error) {
      toast.error('Failed to load jobs.', {
        description: 'Please check your internet connection or try again shortly.',
        duration: 5000,
      });
    }
  }, [error]);

  return (
    <div className='joblistings'>
      <div className='joblistings__wrapper' style={{ position: 'relative' }}>
        {isLoading && (
          <div className="joblistings__loader-overlay">
            <Loader />
          </div>
        )}

        {!isLoading && hasFetched && jobsToShow.length === 0 ? (
          <div className="no-data">
            <p>No jobs match your search criteria. Please try different keywords or filters.</p>
          </div>
        ) : (
          jobsToShow.map((job) => (
            <div className="job__card" key={job.id}>
              <MemoizedJobCard job={job} />
            </div>
          ))
        )}
      </div>

      {filteredJobs.length > visibleCount && (
        <div className="viewAll">
          <button className='viewAll' onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {filteredJobs.length > 9 && filteredJobs.length <= visibleCount && (
        <div className="viewAll">
          <button className='viewAll' onClick={handleShowFew} disabled={isLoading || visibleCount <= 9}>
            Show Few
          </button>
        </div>
      )}
    </div>
  );
};

export default JobListings;
