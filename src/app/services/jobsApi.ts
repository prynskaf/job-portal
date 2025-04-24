// services/jobsApi.ts
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Job } from '../types/job';
import { db } from '@/lib/firebaseConfig';

// Fetch all jobs without filters
export const fetchAllJobs = async (): Promise<Job[]> => {
  try {
    const q = query(collection(db, 'jobs'), orderBy('postedAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Job));
  } catch (error) {
    console.error('Error fetching all jobs:', error);
    return []; // Return an empty array in case of an error
  }
};

// Fetch jobs with filters
export const fetchFilteredJobs = async (
  searchQuery: { jobTitle: string; location: string },
  filters: {
    jobType?: string[];
    workMode?: string[];
    jobFunction?: string[];
    experienceLevel?: string[];
    salaryMin?: number;
    salaryMax?: number;
  }
): Promise<Job[]> => {
  try {
    let q = query(collection(db, 'jobs'));

    // Apply search filters
    if (searchQuery.jobTitle) {
      q = query(q, where('title', '>=', searchQuery.jobTitle));
    }
    if (searchQuery.location) {
      q = query(q, where('location', '==', searchQuery.location));
    }

    // Apply other filters
    if (filters.jobType?.length) {
      q = query(q, where('jobType', 'in', filters.jobType));
    }
    if (filters.workMode?.length) {
      q = query(q, where('workMode', 'in', filters.workMode));
    }
    if (filters.jobFunction?.length) {
      q = query(q, where('function', 'in', filters.jobFunction));
    }
    if (filters.experienceLevel?.length) {
      q = query(q, where('experienceLevel', 'in', filters.experienceLevel));
    }
    if (filters.salaryMin) {
      q = query(q, where('salaryMin', '>=', filters.salaryMin));
    }
    if (filters.salaryMax) {
      q = query(q, where('salaryMax', '<=', filters.salaryMax));
    }

    // Always sort by newest first
    q = query(q, orderBy('postedAt', 'desc'));

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Job));
  } catch (error) {
    console.error('Error fetching filtered jobs:', error);
    return []; // Return an empty array in case of an error
  }
};

// Fetch unique job titles based on input
export const fetchMatchingJobTitles = async (input: string): Promise<string[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'jobs'));
    const titlesSet = new Set<string>();

    snapshot.docs.forEach((doc) => {
      const title = doc.data().title;
      if (title && title.toLowerCase().includes(input.toLowerCase())) {
        titlesSet.add(title.trim());
      }
    });

    return Array.from(titlesSet);
  } catch (error) {
    console.error('Error fetching job titles:', error);
    return [];
  }
};

// Fetch unique locations based on input
export const fetchMatchingLocations = async (input: string): Promise<string[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'jobs'));
    const locationsSet = new Set<string>();

    snapshot.docs.forEach((doc) => {
      const location = doc.data().location;
      if (location && location.toLowerCase().includes(input.toLowerCase())) {
        locationsSet.add(location.trim());
      }
    });

    return Array.from(locationsSet);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};
