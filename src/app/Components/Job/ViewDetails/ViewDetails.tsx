"use client";
import React from 'react';
import './ViewDetails.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Job } from '@/app/types/job';
import BookmarkButton from '../../BookmarkButton/BookmarkButton';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';




interface ViewDetailsProps {
  job: Job;
}

const ViewDetails: React.FC<ViewDetailsProps> = ({ job }) => {
  const router = useRouter();
  return (
      <div className="view-details">
      {/* back button */}
       <div className="back-button">
          <button onClick={() => router.back()} className="back-link">
            <ArrowLeft className="icon" size="30" /> Back to Jobs
          </button>
        </div>
        <div className="job-header">
          <div className="apply-section">
          <div className="bookmarkwrapper">
          <BookmarkButton job={job} />
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
            <Link href={`/jobs/apply?id=${job.id}`}>Apply now</Link>
            </button>
          </div>
        </div>

        <div className="job-meta-info">
          <div className="info-item">
            <h3>SALARY</h3>
            <p>${job.salaryMin} to ${job.salaryMax} yearly</p>
          </div>
          <div className="info-item">
            <h3>JOB POSTED</h3>
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
    {job.experience && job.experience.length > 0 ? (
      job.experience.map((item, idx) => <li key={idx}>{item}</li>)
    ) : job.experienceLevel ? (
      <li>{job.experienceLevel}</li>
    ) : (
      <li>Not specified</li>
    )}
  </ul>
</section>

<section>
  <h2>Soft Skills</h2>
  <ul>
    {job.softSkills && job.softSkills.length > 0 ? (
      job.softSkills.map((skill, idx) => <li key={idx}>{skill}</li>)
    ) : (
      <>
        <li>Exceptional problem-solving and critical-thinking abilities</li>
        <li>Excellent communication and teamwork skills</li>
        <li>Adaptability in dynamic environments</li>
      </>
    )}
  </ul>
</section>

<section>
  <h2>Hiring Team Member</h2>
  {job.hiringTeam?.name && job.hiringTeam?.position ? (
    <p>{job.hiringTeam.name} – {job.hiringTeam.position}</p>
  ) : (
    <p>Not specified</p>
  )}
</section>

<section>
  <h2>Recruitment Coordinator</h2>
  <ul>
    {job.hiringTeam?.contact?.linkedin && (
      <li>
        <Link href={job.hiringTeam.contact.linkedin} target="_blank">LinkedIn</Link>
      </li>
    )}
    {job.hiringTeam?.contact?.email && (
      <li>
        <a href={`mailto:${job.hiringTeam.contact.email}`}>Mail</a>
      </li>
    )}
    {!job.hiringTeam?.contact?.linkedin && !job.hiringTeam?.contact?.email && (
      <li>Not specified</li>
    )}
  </ul>
</section>

      </div>
    </div>
  );
};

export default ViewDetails;