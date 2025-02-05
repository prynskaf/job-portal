export interface JobCardProps {
    title: string;
    type: 'FULL-TIME' | 'PART-TIME';
    salary: string;
    company: string;
    location: string;
    applicants: number;
    logo: string;
  }
  

 export  const jobs: JobCardProps[] = [
    {
      title: 'Technical Support Specialist',
      type: 'PART-TIME',
      salary: '$20,000 - $25,000',
      company: 'Google Inc.',
      location: 'New Delhi, India',
      applicants: 10,
      logo: '/jobsIcons/gogole.svg',
    },
    {
      title: 'Senior UI/UX Designer',
      type: 'FULL-TIME',
      salary: '$30,000 - $55,000',
      company: 'Apple',
      location: 'Boston, USA',
      applicants: 8,
      logo: '/jobsIcons/apple.svg',
    },
    {
      title: 'Marketing Officer',
      type: 'PART-TIME',
      salary: '$15,000 - $35,000',
      company: 'Intel Corp',
      location: 'Bangalore, India',
      applicants: 30,
      logo: '/jobsIcons/intel.svg',
    },
    {
      title: 'Marketing Officer',
      type: 'PART-TIME',
      salary: '$15,000 - $35,000',
      company: 'Intel Corp',
      location: 'Bangalore, India',
      applicants: 30,
      logo: '/jobsIcons/intel.svg',
    },
    {
      title: 'Marketing Officer',
      type: 'PART-TIME',
      salary: '$15,000 - $35,000',
      company: 'Intel Corp',
      location: 'Bangalore, India',
      applicants: 30,
      logo: '/jobsIcons/intel.svg',
    },
    {
      title: 'Marketing Officer',
      type: 'PART-TIME',
      salary: '$15,000 - $35,000',
      company: 'Intel Corp',
      location: 'Bangalore, India',
      applicants: 30,
      logo: '/jobsIcons/intel.svg',
    },
  ];