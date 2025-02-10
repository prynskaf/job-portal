import React from 'react'
import './FeatueredJobs.scss'
import JobCard from '../Job/JobCard/JobCard';
import { jobs } from '@/app/utils/joblist/job';
import Link from 'next/link';

const FeatueredJobs = () => {

  return (
    <div className="featured__wrapper">

      <div className="featured__jobs">


        <div className='featured__heading'>
          <h1>Featured Jobs</h1>
          <p>Choose jobs from the top employers and apply for the same.</p>
        </div>



        <div className='featured__list'>
            {jobs.slice(0,3).map((job, index) => (
              <div className="job__card" key={index}>
              <JobCard {...job} />
              </div>
            ))}
          </div>
          <div className="viewAll">
            <Link href="#" className='viewAll'>View More</Link>
            </div>


      </div>
    </div>
  )
}

export default FeatueredJobs
