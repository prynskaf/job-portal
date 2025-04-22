// types/job.ts
export interface Job {
  id: string;
  title: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  jobType: 'Full-Time' | 'Part-Time' | 'Internship' | 'Contract';
  workMode: 'On-Site' | 'Remote' | 'Hybrid';
  function: string; // Marketing, Engineering, etc.
  experienceLevel: 'Entry-Level' | 'Junior' | 'Mid-Level' | 'Senior' | 'Lead/Managerial' | 'Director/Executive';
  company: string;
  company_logo: string;
  postedAt: string; // Updated to string
  updatedAt: string; // Added as string
  about: string;
  responsibilities: string[];
  technicalSkills: string[];
}