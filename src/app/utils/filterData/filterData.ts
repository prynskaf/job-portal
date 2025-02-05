export type FilterCategory = {
  title: string;
  options: { label: string; count: number }[];
};

export const filterData: FilterCategory[] = [
  {
    title: "Job Type",
    options: [
      { label: "All", count: 2597 },
      { label: "Full-Time", count: 450 },
      { label: "Part-Time", count: 145 },
      { label: "Internship", count: 55 },
      { label: "Contract", count: 12 },
    ],
  },
  {
    title: "Work Mode",
    options: [
      { label: "On-Site", count: 180 },
      { label: "Remote", count: 180 },
      { label: "Hybrid", count: 200 },
    ],
  },
  {
    title: "Job Functions",
    options: [
      { label: "Marketing", count: 21 },
      { label: "Engineering", count: 45 },
      { label: "Design", count: 71 },
      { label: "Sales", count: 24 },
      { label: "Customer Service", count: 109 },
    ],
  },
  {
    title: "Experience Level",
    options: [
      { label: "Entry-Level", count: 285 },
      { label: "Junior", count: 21 },
      { label: "Mid-Level", count: 212 },
      { label: "Senior", count: 12 },
      { label: "Lead/Managerial", count: 24 },
      { label: "Director/Executive", count: 10 },
    ],
  },
];
