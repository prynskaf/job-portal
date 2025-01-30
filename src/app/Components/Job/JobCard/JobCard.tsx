

import React from 'react';
import './JobCard.scss';
import { Bookmark, Users } from 'lucide-react';
import Image from 'next/image';
import { HiOutlineLocationMarker } from "react-icons/hi";

interface JobCardProps {
  title: string;
  type: 'FULL-TIME' | 'PART-TIME';
  salary: string;
  company: string;
  location: string;
  applicants: number;
  logo: string;
}

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
        <button className="viewDetails">View details</button>
        <button className="applyNow">Apply now</button>
      </div>
    </div>
  );
};

export default JobCard;




