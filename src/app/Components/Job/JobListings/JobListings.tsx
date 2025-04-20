// components/jobs/JobListings.tsx
'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchInitialJobs } from '@/lib/redux/jobsSlice';
import Link from 'next/link';
import './JobListings.scss';
import JobCard from '../JobCard/JobCard';

const JobListings = () => {
  const dispatch = useAppDispatch();
  const { filteredJobs, isLoading, error } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchInitialJobs());


  }, [dispatch]);

  if (isLoading) return <div className="loading">Loading jobs...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  console.log('Filtered Jobs:', filteredJobs);

  return (
    <div className='joblistings'>
      <div className='joblistings__wrapper'>
        {filteredJobs.map((job) => (
          <div className="job__card" key={job.id}>
            <JobCard 
              title={job.title}
              type={job.jobType}
              salary={`$${job.salaryMin} - $${job.salaryMax}`}
              company={job.company}
              location={job.location}
              applicants={0} // You might want to add this to your Job type
              logo={job.company_logo}
              id={job.id}
            />
          </div>
        ))}
      </div>
      {filteredJobs.length > 0 && (
        <div className="viewAll">
          <Link href="#" className='viewAll'>View More</Link>
        </div>
      )}
    </div>
  );
};

export default JobListings;