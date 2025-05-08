// components/jobs/JobListings.tsx
'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchInitialJobs } from '@/lib/redux/jobsSlice';
import Link from 'next/link';
import './JobListings.scss';
import JobCard from '../JobCard/JobCard';
import { fetchPaginatedJobs } from '@/app/services/jobsApi';

const JobListings = () => {
  const dispatch = useAppDispatch();
  const { filteredJobs, isLoading, error } = useAppSelector((state) => state.jobs);
  const [lastDoc, setLastDoc] = React.useState<any>(null);

  useEffect(() => {
    dispatch(fetchInitialJobs());
  }, [dispatch]);

  if (isLoading) return <div className="loading">Loading jobs...</div>;
  if (error) return <div className="error">An error occurred while loading jobs. Please try again later.</div>;

  console.log('Filtered Jobs:', filteredJobs);

  const MemoizedJobCard = React.memo(JobCard);

  const loadMoreJobs = async () => {
    const { jobs, lastVisible } = await fetchPaginatedJobs(
      {}, // Pass searchQuery
      {}, // Pass filters
      lastDoc,
      10 // Limit
    );
    setLastDoc(lastVisible);
    dispatch(setFilters({ filteredJobs: [...filteredJobs, ...jobs] }));
  };

  return (
    <div className='joblistings'>
      <div className='joblistings__wrapper'>
        {filteredJobs.length === 0 ? (
          <div className="no-data">
            <p>No jobs match your search criteria. Please try different keywords or filters.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div className="job__card" key={job.id}>
              <MemoizedJobCard 
                title={job.title}
                type={job.jobType}
                salary={`$${job.salaryMin} - $${job.salaryMax}`}
                company={job.company}
                location={job.location}
                applicants={0} // Placeholder for applicants
                logo={job.company_logo}
                id={job.id}
              />
            </div>
          ))
        )}
      </div>
      {filteredJobs.length > 0 && (
        <>
          <div className="viewAll">
            <Link href="#" className='viewAll'>View More</Link>
          </div>
          <button onClick={loadMoreJobs} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </>
      )}
    </div>
  );
};

export default JobListings;