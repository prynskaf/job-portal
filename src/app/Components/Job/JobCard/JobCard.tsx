// components/jobs/JobCard.tsx
'use client';

import { Bookmark, Users } from 'lucide-react';
import Image from 'next/image';
import { HiOutlineLocationMarker } from "react-icons/hi";
import Link from 'next/link';
import './JobCard.scss';

interface JobCardProps {
  id: string;
  title: string;
  type: string;
  salary: string;
  company: string;
  location: string;
  applicants: number;
  logo: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  type,
  salary,
  company,
  location,
  applicants,
  logo,
}) => {
  return (
    <div className="card">
      <div className="grid first-grid">
        <div className="title-and-icon">
          <h3 className="title">{title}</h3>
          <Bookmark className="bookmark" />
        </div>

        <div className="type-and-salary">
          <span className={`type ${type === 'Full-Time' ? 'fullTime' : 'partTime'}`}>
            {type}
          </span>
          <p className="salary">{salary}</p>
        </div>
      </div>

      <div className="grid second-grid">
        <Image 
          src={logo || '/default-company.png'} 
          alt={`${company} logo`} 
          width={48} 
          height={48} 
          className="logo" 
        />
        <div className="company-and-location">
          <p className="company">{company}</p>
          <span className='flex gap-2'>
            <HiOutlineLocationMarker />
            <p className="location">{location}</p>
          </span>
        </div>
      </div>

      <div className="grid third-grid">
        <div className="applicants">
          <Users className="icon" />
          <span>{applicants}+ applicants</span>
        </div>
      </div>

      <div className="grid fourth-grid actions">
        <button className="viewDetails">
          <Link href={`/jobs/${id}`}>View details</Link>
        </button>
        <button className="applyNow">
          <Link href={`/jobs/${id}/apply`}>Apply now</Link>
        </button>
      </div>
    </div>
  );
};

export default JobCard;