import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

export type FilterCategory = {
  title: string;
  key: string; // Added key to map to Firestore fields
  options: { label: string; count: number }[];
};

// Function to fetch counts dynamically from Firestore
export const fetchFilterData = async (): Promise<FilterCategory[]> => {
  const filterCategories: FilterCategory[] = [
    {
      title: 'Job Type',
      key: 'jobType',
      options: [
        { label: 'Full-Time', count: 0 },
        { label: 'Part-Time', count: 0 },
        { label: 'Internship', count: 0 },
        { label: 'Contract', count: 0 },
      ],
    },
    {
      title: 'Work Mode',
      key: 'workMode',
      options: [
        { label: 'On-Site', count: 0 },
        { label: 'Remote', count: 0 },
        { label: 'Hybrid', count: 0 },
      ],
    },
    {
      title: 'Job Functions',
      key: 'jobFunction',
      options: [
        { label: 'Marketing', count: 0 },
        { label: 'Engineering', count: 0 },
        { label: 'Design', count: 0 },
        { label: 'Sales', count: 0 },
        { label: 'Customer Service', count: 0 },
      ],
    },
    {
      title: 'Experience Level',
      key: 'experienceLevel',
      options: [
        { label: 'Entry-Level', count: 0 },
        { label: 'Junior', count: 0 },
        { label: 'Mid-Level', count: 0 },
        { label: 'Senior', count: 0 },
        { label: 'Lead/Managerial', count: 0 },
        { label: 'Director/Executive', count: 0 },
      ],
    },
  ];

  try {
    // Fetch counts for each filter category
    for (const category of filterCategories) {
      for (const option of category.options) {
        const q = query(
          collection(db, 'jobs'),
          where(category.key, '==', option.label)
        );
        const snapshot = await getDocs(q);
        option.count = snapshot.size; // Set the count dynamically
      }
    }
  } catch (error) {
    console.error('Error fetching filter data:', error);
  }

  return filterCategories;
};
