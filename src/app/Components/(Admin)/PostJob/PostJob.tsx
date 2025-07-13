"use client";
import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import "./PostJob.scss";
import { db } from "@/lib/firebaseConfig";
import { toast } from "sonner";

interface HiringTeamContact {
  linkedin: string;
  email: string;
}

interface HiringTeam {
  name: string;
  position: string;
  contact: HiringTeamContact;
}

interface JobData {
  title: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  jobType: string;
  workMode: string;
  function: string;
  experienceLevel: string;
  company: string;
  company_logo: string;
  about: string;
  responsibilities: string[];
  technicalSkills: string[];
  experience: string[];
  softSkills: string[];
  hiringTeam: HiringTeam;
}

const initialJobState: JobData = {
  title: "",
  location: "",
  salaryMin: 0,
  salaryMax: 0,
  jobType: "",
  workMode: "",
  function: "",
  experienceLevel: "",
  company: "",
  company_logo: "",
  about: "",
  responsibilities: [],
  technicalSkills: [],
  experience: [],
  softSkills: [],
  hiringTeam: {
    name: "",
    position: "",
    contact: {
      linkedin: "",
      email: "",
    },
  },
};

const PostJob: React.FC = () => {
  const [job, setJob] = useState<JobData>(initialJobState);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setJob((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setLogoFile(file);
    } else {
      toast.error("Please upload a valid image file.");
    }
  }, []);

  const handleArrayInput = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>, field: keyof JobData) => {
      const values = e.target.value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      setJob((prev) => ({ ...prev, [field]: values }));
    },
    []
  );

  const handleHiringTeamChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, field: keyof HiringTeam | "linkedin" | "email") => {
      const { value } = e.target;
      setJob((prev) => ({
        ...prev,
        hiringTeam: {
          ...prev.hiringTeam,
          ...(field === "linkedin" || field === "email"
            ? { contact: { ...prev.hiringTeam.contact, [field]: value } }
            : { [field]: value }),
        },
      }));
    },
    []
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate required fields
    const requiredFields: Array<keyof JobData> = ['title', 'company', 'location', 'jobType', 'about'];
    const missingFields = requiredFields.filter(field => !job[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Missing required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (job.salaryMin < 0 || job.salaryMax < 0 || job.salaryMin > job.salaryMax) {
      toast.error("Please enter a valid salary range.");
      return;
    }

    setIsSubmitting(true);
    let logoURL = job.company_logo; // Default to existing if no new file

    try {
      // Handle logo upload if a new file was provided
      if (logoFile) {
        const formData = new FormData();
        formData.append("file", logoFile);
        formData.append("upload_preset", "job_portal_upload_preset");

        const uploadToast = toast.loading("Uploading logo...");
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );

        if (!response.ok) throw new Error("Logo upload failed");

        const data = await response.json();
        logoURL = data.secure_url;
        toast.success("Logo uploaded successfully!", { id: uploadToast });
      }

      // Create a new document reference
      const jobRef = doc(collection(db, "jobs"));
      
      // Set the document data (without explicitly adding jobId)
      await setDoc(jobRef, {
        ...job,
        salaryMin: Number(job.salaryMin),
        salaryMax: Number(job.salaryMax),
        company_logo: logoURL,
        postedAt: new Date().toISOString(), // Convert to string
         updatedAt: new Date().toISOString() // Convert to string
      });

      toast.success("Job posted successfully!");
      setJob(initialJobState);
      setLogoFile(null);
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-job-container">
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit} className="job-form">
        {/* Job Basics */}
        <h3>Job Basics</h3>
        <input type="text" name="title" placeholder="Job Title" value={job.title} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={job.location} onChange={handleChange} required />
        <div className="salary-group">
          <input type="number" name="salaryMin" placeholder="Min Salary" value={job.salaryMin} onChange={handleChange} required min="0" />
          <input type="number" name="salaryMax" placeholder="Max Salary" value={job.salaryMax} onChange={handleChange} required min="0" />
        </div>
        <input type="text" name="jobType" placeholder="Job Type (Full-time, Part-time)" value={job.jobType} onChange={handleChange} required />
        <input type="text" name="workMode" placeholder="Work Mode (Remote, On-site, Hybrid)" value={job.workMode} onChange={handleChange} required />
        <input type="text" name="function" placeholder="Function (e.g., Frontend, Backend)" value={job.function} onChange={handleChange} required />
        <input type="text" name="experienceLevel" placeholder="Experience Level (e.g., Entry, Mid, Senior)" value={job.experienceLevel} onChange={handleChange} required />
        <input type="text" name="company" placeholder="Company Name" value={job.company} onChange={handleChange} required />
        <textarea name="about" placeholder="About this Job" value={job.about} onChange={handleChange} required rows={4} />

        {/* Skills & Experience */}
        <h3>Skills & Experience</h3>
        <textarea name="responsibilities" placeholder="Responsibilities (comma separated)" value={job.responsibilities.join(", ")} onChange={(e) => handleArrayInput(e, "responsibilities")} rows={3} />
        <textarea name="technicalSkills" placeholder="Technical Skills (comma separated)" value={job.technicalSkills.join(", ")} onChange={(e) => handleArrayInput(e, "technicalSkills")} rows={3} />
        <textarea name="experience" placeholder="Experience (comma separated)" value={job.experience.join(", ")} onChange={(e) => handleArrayInput(e, "experience")} rows={3} />
        <textarea name="softSkills" placeholder="Soft Skills (comma separated)" value={job.softSkills.join(", ")} onChange={(e) => handleArrayInput(e, "softSkills")} rows={3} />

        {/* Hiring Team */}
        <h3>Hiring Team Details</h3>
        <input type="text" placeholder="Hiring Team Member Name" value={job.hiringTeam.name} onChange={(e) => handleHiringTeamChange(e, "name")} />
        <input type="text" placeholder="Hiring Team Member Position" value={job.hiringTeam.position} onChange={(e) => handleHiringTeamChange(e, "position")} />
        <input type="text" placeholder="LinkedIn" value={job.hiringTeam.contact.linkedin} onChange={(e) => handleHiringTeamChange(e, "linkedin")} />
        <input type="email" placeholder="Email" value={job.hiringTeam.contact.email} onChange={(e) => handleHiringTeamChange(e, "email")} />

        {/* Logo */}
        <h3>Company Logo</h3>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit" disabled={isSubmitting} className={isSubmitting ? "submitting" : ""}>
          {isSubmitting ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;