import React from 'react'
import './SavedJobs.scss'
import JobCard from '../../Job/JobCard/JobCard'
import { jobs } from '@/app/utils/joblist/job'
import Link from 'next/link'

const SavedJobs = () => {
  return (
    <div className='SavedJobs'>
      <div className="SavedJobs__wrapper">
        <div className='saved-jobs-title'>Saved Jobs</div>
        <div className='saved-jobs-description'>A list of your saved jobs.</div>
        <div className='saved-jobs-list'>
          {jobs.slice(0, 4).map((job, index) => (
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

export default SavedJobs
