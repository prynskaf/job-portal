import ApplyJob from '@/app/Components/Job/ApplyJob/ApplyJob';
import { getJobById } from '@/lib/getJobById';
import { Job } from '@/app/types/job';

interface Props {
  searchParams: { id: string };
}

export default async function ApplyPage({ searchParams }: Props) {
  const { id } = await searchParams;
  const job: Job | null = await getJobById(id);

  if (!job) return <div>Job not found.</div>;

  return (
    <div>
      <ApplyJob job={job} />
    </div>
  );
}
