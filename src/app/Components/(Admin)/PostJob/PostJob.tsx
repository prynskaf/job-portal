"use client"
import React, { useState, ChangeEvent, FormEvent } from "react";
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

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = e.target;
        setJob((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file) setLogoFile(file);
    };

    const handleArrayInput = (
        e: ChangeEvent<HTMLTextAreaElement>,
        field: keyof Pick<JobData, 'responsibilities' | 'technicalSkills' | 'experience' | 'softSkills'>
    ): void => {
        const values = e.target.value.split(",").map((item) => item.trim());
        setJob((prev) => ({ ...prev, [field]: values }));
    };

    const handleHiringTeamChange = (
        e: ChangeEvent<HTMLInputElement>,
        field: keyof HiringTeam | 'linkedin' | 'email'
    ): void => {
        const { value } = e.target;
        setJob((prev) => ({
            ...prev,
            hiringTeam: {
                ...prev.hiringTeam,
                ...(field === 'linkedin' || field === 'email'
                    ? { contact: { ...prev.hiringTeam.contact, [field]: value } }
                    : { [field]: value }),
            },
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            let logoURL = "";
            if (logoFile) {
                const formData = new FormData();
                formData.append('file', logoFile);
                formData.append('upload_preset', 'job_portal_upload_preset');

                const loadingToastId = toast.loading("Uploading logo...");

                try {
                    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                        method: 'POST',
                        body: formData,
                    });

                    const data = await response.json();

                    if (data.secure_url) {
                        logoURL = data.secure_url;
                    } else {
                        console.error('Upload error: secure_url not found in response', data);
                        throw new Error('Failed to process uploaded logo. Please try again.');
                    }
                } catch (error) {
                    console.error('Upload error:', error);
                    toast.error('Logo upload failed. Please try again.');
                    return;
                } finally {
                    toast.dismiss(loadingToastId);
                }
            }

            // Generate a new document reference with a unique ID
            const jobRef = doc(collection(db, "jobs"));
            const jobId = jobRef.id; // Get the generated job ID

            // Save job details to Firestore with the Cloudinary logo URL and jobId
            await setDoc(jobRef, {
                ...job,
                jobId, // Include the jobId in the document
                salaryMin: Number(job.salaryMin),
                salaryMax: Number(job.salaryMax),
                company_logo: logoURL,
            });

            toast.success("Job posted successfully!");
            setJob(initialJobState);
            setLogoFile(null);
        } catch (error) {
            console.error("Error posting job:", error); // Log detailed error
            toast.error("Failed to post job. Please check Firestore rules and configuration.");
        }
    };

    return (
        <div className="post-job-container">
            <h2>Post a Job</h2>
            <form onSubmit={handleSubmit} className="job-form">
                <input type="text" name="title" placeholder="Job Title" value={job.title} onChange={handleChange} />
                <input type="text" name="location" placeholder="Location" value={job.location} onChange={handleChange} />
                <div className="salary-group">
                    <input type="number" name="salaryMin" placeholder="Min Salary" value={job.salaryMin} onChange={handleChange} />
                    <input type="number" name="salaryMax" placeholder="Max Salary" value={job.salaryMax} onChange={handleChange} />
                </div>
                <input type="text" name="jobType" placeholder="Job Type (Full-time, Part-time)" value={job.jobType} onChange={handleChange} />
                <input type="text" name="workMode" placeholder="Work Mode (Remote, On-site)" value={job.workMode} onChange={handleChange} />
                <input type="text" name="function" placeholder="Job Function" value={job.function} onChange={handleChange} />
                <input type="text" name="experienceLevel" placeholder="Experience Level" value={job.experienceLevel} onChange={handleChange} />
                <textarea name="about" placeholder="About this Job" value={job.about} onChange={handleChange}></textarea>
                <textarea 
                    name="responsibilities" 
                    placeholder="Responsibilities (comma separated)" 
                    value={job.responsibilities.join(", ")} 
                    onChange={(e) => handleArrayInput(e, 'responsibilities')}
                />
                <textarea 
                    name="technicalSkills" 
                    placeholder="Technical Skills (comma separated)" 
                    value={job.technicalSkills.join(", ")} 
                    onChange={(e) => handleArrayInput(e, 'technicalSkills')}
                />
                <textarea 
                    name="experience" 
                    placeholder="Experience (comma separated)" 
                    value={job.experience.join(", ")} 
                    onChange={(e) => handleArrayInput(e, 'experience')}
                />
                <textarea 
                    name="softSkills" 
                    placeholder="Soft Skills (comma separated)" 
                    value={job.softSkills.join(", ")} 
                    onChange={(e) => handleArrayInput(e, 'softSkills')}
                />
                <input type="text" name="company" placeholder="Company Name" value={job.company} onChange={handleChange} />
                <input 
                    type="text" 
                    placeholder="Hiring Team Member Name" 
                    value={job.hiringTeam.name} 
                    onChange={(e) => handleHiringTeamChange(e, 'name')} 
                />
                <input 
                    type="text" 
                    placeholder="Hiring Team Member Position" 
                    value={job.hiringTeam.position} 
                    onChange={(e) => handleHiringTeamChange(e, 'position')} 
                />
                <input 
                    type="text" 
                    placeholder="LinkedIn" 
                    value={job.hiringTeam.contact.linkedin} 
                    onChange={(e) => handleHiringTeamChange(e, 'linkedin')} 
                />
                <input 
                    type="text" 
                    placeholder="Email" 
                    value={job.hiringTeam.contact.email} 
                    onChange={(e) => handleHiringTeamChange(e, 'email')} 
                />
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Post Job</button>
            </form>
        </div>
    );
};

export default PostJob;
