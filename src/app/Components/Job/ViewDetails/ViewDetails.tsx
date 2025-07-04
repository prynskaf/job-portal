import React from 'react';
import './ViewDetails.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import { Job } from '@/app/types/job';

interface ViewDetailsProps {
  job: Job;
}

const ViewDetails: React.FC<ViewDetailsProps> = ({ job }) => {
  return (
    <div className="view-details">
      <div className="job-header">
        <div className="apply-section">
          <div className="bookmarkwrapper">
            <Bookmark className="bookmark" />
          </div>
          <h2>Apply</h2>
          <p>Apply for your desired job matching your skills</p>
        </div>
        
        <div className="job-title-section">
          <Image src={job.company_logo} alt={`${job.company} logo`} className="company-logo" width={200} height={200} />
          <div className="job-title-content">
            <h1>{job.title}</h1>
            <p className="company-name">{job.company}</p>
            <button className="apply-button">
              <Link href="/jobs/apply">Apply now</Link>
            </button>
          </div>
        </div>

        <div className="job-meta-info">
          <div className="info-item">
            <h3>SALARY</h3>
            <p>${job.salaryMin} to ${job.salaryMax} yearly</p>
          </div>
          <div className="info-item">
            <h3>Job Posted</h3>
            <p>{job.postedAt ? new Date(job.postedAt).toLocaleDateString() : '-'}</p>
          </div>
          <div className="info-item">
            <h3>LOCATION</h3>
            <p>{job.location}</p>
          </div>
        </div>

        <div className="job-tags">
          <span className="tag">{job.jobType}</span>
          <span className="tag">{job.workMode}</span>
          <span className="tag">{job.function}</span>
          <span className="tag">{job.experienceLevel}</span>
        </div>
      </div>

      <div className="job-details">
        <section>
          <h2>About this job</h2>
          <h3>Job Description</h3>
          <p>{job.about}</p>
        </section>

        <section>
          <h2>Responsibilities</h2>
          <ul>
            {job.responsibilities?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Technical Skills</h2>
          <ul>
            {job.technicalSkills?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Experience</h2>
          <ul>
            {job.experienceLevel && <li>{job.experienceLevel}</li>}
          </ul>
        </section>

        {/* Add more sections as needed, e.g. Soft Skills, Hiring Team, etc. */}
      </div>
    </div>
  );
};

export default ViewDetails;