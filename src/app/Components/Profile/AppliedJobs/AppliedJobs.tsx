import React from 'react'
import "./AppliedJobs.scss"

const AppliedJobs = () => {
  const jobsData = [
    {
      jobTitle: "Product Manager",
      company: "InnovateTech",
      appliedDate: "03/06/2023",
      status: "Pending"
    },
    {
      jobTitle: "Product Manager",
      company: "InnovateTech", 
      appliedDate: "03/06/2023",
      status: "Accepted"
    },
    {
      jobTitle: "Product Manager",
      company: "InnovateTech",
      appliedDate: "03/06/2023", 
      status: "Rejected"
    }
  ];

  return (
    <div className=' AppliedJobs'>
     <div className=' AppliedJobs__wrapper'>
        <div className='applied-jobs-title'>Applied Jobs</div>
        <div className='applied-jobs-description'>A list of your applied jobs.</div>
        <table className='applied-jobs-table'>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Applied Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsData.map((job, index) => (
              <tr key={index}>
                <td>{job.jobTitle}</td>
                <td>{job.company}</td>
                <td>{job.appliedDate}</td>
                <td>
                  <span className={`status status--${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     </div>
    </div>
  )
}

export default AppliedJobs