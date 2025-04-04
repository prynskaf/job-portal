import React from 'react';
import './ViewDetails.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';

const ViewDetails = () => {
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
          <Image src="/jobsIcons/gogole.svg" alt="Google logo" className="company-logo" width={200} height={200} />
          <div className="job-title-content">
            <h1>Product Store Manager for Google in Los Angeles</h1>
            <p className="company-name">Google (Incorporated)</p>
            <button className="apply-button"><Link href="/jobs/apply">Apply now</Link></button>
          </div>
        </div>

        <div className="job-meta-info">
          <div className="info-item">
            <h3>SALARY</h3>
            <p>$120,000 to $150,000 yearly</p>
          </div>
          <div className="info-item">
            <h3>Job Posted</h3>
            <p>1st of June 2020</p>
          </div>
          <div className="info-item">
            <h3>LOCATION</h3>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div className="job-tags">
          <span className="tag">FULL TIME</span>
          <span className="tag">ON-SITE</span>
          <span className="tag">ACCOUNTING</span>
          <span className="tag">MID-LEVEL</span>
        </div>
      </div>

      <div className="job-details">
        <section>
          <h2>About this job</h2>
          <h3>Job Description</h3>
          <p>Are you passionate about building modern, high-performing web applications? Join us here as a Frontend Web Developer where you'll play a critical role in developing and enhancing applications that impact thousands of users. You'll be part of an agile-driven environment, working closely with a talented team of engineers to deliver high-quality solutions that guide the innovation of web development.</p>
        </section>

        <section>
          <h2>Responsibilities</h2>
          <ul>
            <li>Technical Leadership: Act as a tech lead expert in all aspects of frontend development, providing guidance on best practices, architecture improvements, and innovative solutions</li>
            <li>Application Development: Design and implement high-performing, scalable and user-friendly applications with a strong focus on responsiveness and usability</li>
          </ul>
        </section>

        <section>
          <h2>Technical Skills</h2>
          <ul>
            <li>Advanced Master's degree in HTML, JavaScript and CSS with a deep understanding of web platform fundamentals</li>
            <li>Intermediate Proficiency in Vue.js is required; experience with Angular or React is a bonus</li>
          </ul>
        </section>

        <section>
          <h2>Experience</h2>
          <ul>
            <li>A minimum of 3 years in frontend development, showcasing a portfolio of successful projects</li>
            <li>Proven ability to diagnose and resolve performance issues in web applications</li>
            <li>Experience in writing readable, testable, and efficient code with strong debugging skills</li>
          </ul>
        </section>

        <section>
          <h2>Soft Skills</h2>
          <ul>
            <li>Exceptional problem-solving and critical-thinking abilities</li>
            <li>Excellent communication and teamwork skills to collaborate effectively with backend engineers and analysts</li>
          </ul>
        </section>

        <section>
          <h2>Hiring Team Member</h2>
          <p>Anita Shield</p>
        </section>

        <section>
          <h2>Recruitment Coordinator</h2>
          <ul>
            <li>LinkedIn</li>
            <li>Mail</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ViewDetails;