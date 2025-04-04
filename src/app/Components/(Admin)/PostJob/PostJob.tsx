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

    // Handle input changes for text and textarea fields
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setJob((prev) => ({ ...prev, [name]: value }));
        },
        []
    );

    // Handle file input changes for logo upload
    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setLogoFile(file);
        } else {
            toast.error("Please upload a valid image file.");
        }
    }, []);

    // Handle array input fields (e.g., responsibilities, technicalSkills)
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

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        // Validate required fields
        if (!job.title || !job.company || !job.location || !job.jobType || !job.about) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (job.salaryMin < 0 || job.salaryMax < 0 || job.salaryMin > job.salaryMax) {
            toast.error("Please enter a valid salary range.");
            return;
        }

        setIsSubmitting(true);
        let logoURL = "";

        try {
            if (logoFile) {
                const formData = new FormData();
                formData.append("file", logoFile);
                formData.append("upload_preset", "job_portal_upload_preset");

                toast.loading("Uploading logo...");
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    { method: "POST", body: formData }
                );

                const data = await response.json();

                if (data.secure_url) {
                    logoURL = data.secure_url;
                } else {
                    throw new Error("Failed to upload logo.");
                }

                toast.success("Logo uploaded successfully!");
            }

            const jobRef = doc(collection(db, "jobs"));
            const jobId = jobRef.id;

            await setDoc(jobRef, {
                ...job,
                jobId,
                salaryMin: Number(job.salaryMin),
                salaryMax: Number(job.salaryMax),
                company_logo: logoURL,
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
                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={job.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={job.location}
                    onChange={handleChange}
                    required
                />
                <div className="salary-group">
                    <input
                        type="number"
                        name="salaryMin"
                        placeholder="Min Salary"
                        value={job.salaryMin}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="salaryMax"
                        placeholder="Max Salary"
                        value={job.salaryMax}
                        onChange={handleChange}
                        required
                    />
                </div>
                <input
                    type="text"
                    name="jobType"
                    placeholder="Job Type (Full-time, Part-time)"
                    value={job.jobType}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="about"
                    placeholder="About this Job"
                    value={job.about}
                    onChange={handleChange}
                    required
                ></textarea>
                <textarea
                    name="responsibilities"
                    placeholder="Responsibilities (comma separated)"
                    value={job.responsibilities.join(", ")}
                    onChange={(e) => handleArrayInput(e, "responsibilities")}
                />
                <textarea
                    name="technicalSkills"
                    placeholder="Technical Skills (comma separated)"
                    value={job.technicalSkills.join(", ")}
                    onChange={(e) => handleArrayInput(e, "technicalSkills")}
                />
                <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={job.company}
                    onChange={handleChange}
                    required
                />

                {/* Hiring Team Section */}
                <h3>Hiring Team Details</h3>
                <input
                    type="text"
                    placeholder="Hiring Team Member Name"
                    value={job.hiringTeam.name}
                    onChange={(e) => handleHiringTeamChange(e, "name")}
                />
                <input
                    type="text"
                    placeholder="Hiring Team Member Position"
                    value={job.hiringTeam.position}
                    onChange={(e) => handleHiringTeamChange(e, "position")}
                />
                <input
                    type="text"
                    placeholder="LinkedIn"
                    value={job.hiringTeam.contact.linkedin}
                    onChange={(e) => handleHiringTeamChange(e, "linkedin")}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={job.hiringTeam.contact.email}
                    onChange={(e) => handleHiringTeamChange(e, "email")}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Posting..." : "Post Job"}
                </button>
            </form>
        </div>
    );
};

export default PostJob;
