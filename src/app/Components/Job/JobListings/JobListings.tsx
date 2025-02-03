import React from 'react'
import JobCard from '../JobCard/JobCard'
import { jobs } from '@/app/utils/joblist/job'
import Link from 'next/link'
import './JobListings.scss'

const JobListings = () => {
  return (
    <div className='joblistings'>
      <div className='joblistings__wrapper'>
      {jobs.map((job, index) => (
              <div className="job__card" key={index}>
              <JobCard {...job} />
              </div>
            ))}
          </div>
          <div className="viewAll">
            <Link href="#" className='viewAll'>View all</Link>
            </div>
      </div>
      
  )
}

export default JobListings
