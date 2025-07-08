'use client';

import { Users } from 'lucide-react';
import Image from 'next/image';
import { HiOutlineLocationMarker } from "react-icons/hi";
import Link from 'next/link';
import './JobCard.scss';
import BookmarkButton from '../../BookmarkButton/BookmarkButton';
import { Job } from '@/app/types/job';

interface JobCardProps {
  job: Job;
  onUnsave?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onUnsave }) => {
  return (
    <div className="card">
      <div className="grid first-grid">
        <div className="title-and-icon">
          <h3 className="title">{job.title}</h3>
          <BookmarkButton job={job} onUnsave={onUnsave} />
        </div>

        <div className="type-and-salary">
          <span className={`type ${job.jobType === 'Full-Time' ? 'fullTime' : 'partTime'}`}>
            {job.jobType}
          </span>
          <p className="salary">{`${job.salaryMin} - ${job.salaryMax}`}</p>
        </div>
      </div>

      <div className="grid second-grid">
        <Image 
          src={job.company_logo || '/default-company.png'} 
          alt={`${job.company} logo`} 
          width={48} 
          height={48} 
          className="logo" 
        />
        <div className="company-and-location">
          <p className="company">{job.company}</p>
          <span className='flex gap-2'>
            <HiOutlineLocationMarker />
            <p className="location">{job.location}</p>
          </span>
        </div>
      </div>

      <div className="grid third-grid">
        <div className="applicants">
          <Users className="icon" />
          {/* You may need to add applicants count to your Job interface or get it elsewhere */}
          <span>{/*job.applicants*/} applicants</span>
        </div>
      </div>

      <div className="grid fourth-grid actions">
        <button className="viewDetails">
          <Link href={`/jobs/${job.id}`}>View details</Link>
        </button>
        <button className="applyNow">
          <Link href={`/jobs/apply?id=${job.id}`}>Apply now</Link>
        </button>
      </div>
    </div>
  );
};

export default JobCard;
