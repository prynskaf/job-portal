// app/jobs/[id]/page.tsx
import ViewDetails from '@/app/Components/Job/ViewDetails/ViewDetails'
import { getJobById } from '@/lib/getJobById';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ViewDetailsPage({ params }: Props) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return <div>Job not found.</div>;
  }

  return (
    <div>
      <ViewDetails job={job} />
    </div>
  );
}
