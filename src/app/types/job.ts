export interface Job {
  id: string;
  title: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  jobType: 'Full-Time' | 'Part-Time' | 'Internship' | 'Contract';
  workMode: 'On-Site' | 'Remote' | 'Hybrid';
  function: string;
  experienceLevel: 'Entry-Level' | 'Junior' | 'Mid-Level' | 'Senior' | 'Lead/Managerial' | 'Director/Executive';
  company: string;
  company_logo: string;
  postedAt: string;
  updatedAt: string;
  savedAt?: string;  

  about: string;
  responsibilities: string[];
  technicalSkills: string[];
  experience?: string[];
  softSkills?: string[];

  // ✅ Match Firebase structure
  hiringTeam?: {
    name: string;
    position: string;
    contact: {
      email?: string;
      linkedin?: string;
    };
  };
}
