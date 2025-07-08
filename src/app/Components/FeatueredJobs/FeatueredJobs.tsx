"use client"
import React, { useEffect } from 'react'
import './FeatueredJobs.scss'
import JobCard from '../Job/JobCard/JobCard';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchInitialJobs } from '@/lib/redux/jobsSlice';


const FeatueredJobs = () => {
    const dispatch = useAppDispatch();
    const { filteredJobs, isLoading, error } = useAppSelector((state) => state.jobs);

     useEffect(() => {
        dispatch(fetchInitialJobs());
      }, [dispatch]);

  const MemoizedJobCard = React.memo(JobCard);


  if (isLoading) return <div className="loading">Loading jobs...</div>;
  if (error) return <div className="error">An error occurred while loading jobs. Please try again later.</div>;

  // ✅ Sort jobs by updatedAt or postedAt (newest first)
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="featured__wrapper">
      <div className="featured__jobs">
        <div className='featured__heading'>
          <h1>Featured Jobs</h1>
          <p>Choose jobs from the top employers and apply for the same.</p>
        </div>
        <div className='featured__list'>
            {sortedJobs.slice(0,3).map((job) => (
              <div className="job__card" key={job.id}>
              <MemoizedJobCard job={job} />
              </div>
            ))}
          </div>
          <div className="viewAll">
            <Link href="/jobs" className='viewAll'>View More</Link>
            </div>
      </div>
    </div>
  )
}

export default FeatueredJobs
