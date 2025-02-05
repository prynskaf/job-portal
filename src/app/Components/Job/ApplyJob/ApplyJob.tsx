"use client"
import React, { useRef, useState } from 'react'
import './ApplyJob.scss'

const ApplyJob = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState('No file chosen')

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.files?.[0]?.name || 'No file chosen')
  }

  return (
    <div className="job-application-container">
      <div className="form-header">
        <h1>Job Application Forms</h1>
        <p>Applying for Technical Support Specialist</p>
      </div>

      <form className="application-form">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="John Doe" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Johndoe@gmail.com" />
        </div>

        <div className="form-group">
          <label>Phone number</label>
          <input type="tel" placeholder="+32 00 44 885 20" />
        </div>

        <div className="form-group">
          <label>Cover Letter</label>
          <textarea placeholder="Tell us why you're interested in this position."></textarea>
        </div>

        <div className="form-group">
          <label>CV / Resume</label>
          <div className="file-upload">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
            />
            <button type="button" onClick={handleFileUpload}>Choose file</button>
            <span>{fileName}</span>
          </div>
        </div>

        <div className="form-group">
          <label>Portfolio URL (optional)</label>
          <input type="text" placeholder="https://your-portfolio.com" />
        </div>

        <button type="submit" className="submit-button">Submit Application</button>
      </form>
    </div>
  )
}

export default ApplyJob