import React from 'react';
import './JobCard.scss';
import { Bookmark, Users } from 'lucide-react';
import Image from 'next/image';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { JobCardProps } from '@/app/utils/joblist/job';
import Link from 'next/link';



const JobCard: React.FC<JobCardProps> = ({
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
          <span className={`type ${type === 'FULL-TIME' ? 'fullTime' : 'partTime'}`}>{type}</span>
          <p className="salary"> {salary}</p>
        </div>
      </div>

      <div className="grid second-grid">
        <Image src={logo} alt={`${company} logo`} width={500} height={500} className="logo" />
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
        <button className="viewDetails"><Link href="jobs/viewDetails">View details</Link></button>
        <button className="applyNow"><Link href="jobs/apply">Apply now</Link></button>
      </div>
    </div>
  );
};

export default JobCard;




