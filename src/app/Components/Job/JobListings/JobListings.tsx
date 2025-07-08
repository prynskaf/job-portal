// components/jobs/JobListings.tsx
'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchInitialJobs } from '@/lib/redux/jobsSlice';

import './JobListings.scss';
import JobCard from '../JobCard/JobCard';

const JobListings = () => {
  const dispatch = useAppDispatch();
  const { filteredJobs, isLoading, error } = useAppSelector((state) => state.jobs);
  const [visibleCount, setVisibleCount] = React.useState(9);

  useEffect(() => {
    dispatch(fetchInitialJobs());
  }, [dispatch]);

  // Reset visibleCount when filteredJobs changes (e.g., new search/filter)
  useEffect(() => {
    setVisibleCount(9);
  }, [filteredJobs]);

  if (isLoading) return <div className="loading">Loading jobs...</div>;
  if (error) return <div className="error">An error occurred while loading jobs. Please try again later.</div>;

  const MemoizedJobCard = React.memo(JobCard);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const handleShowFew = () => {
    setVisibleCount(9);
  };

  const jobsToShow = filteredJobs.slice(0, visibleCount);

  return (
    <div className='joblistings'>
      <div className='joblistings__wrapper'>
        {jobsToShow.length === 0 ? (
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