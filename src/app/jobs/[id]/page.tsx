// app/jobs/[id]/page.tsx
import ViewDetails from '@/app/Components/Job/ViewDetails/ViewDetails'

interface Props {
  params: {
    id: string;
  };
}

export default async function ViewDetailsPage({ params }: Props) {
  const job = await getJobById(params.id); // Fetch from Firebase or your API

  return (
    <div>
      <ViewDetails job={job} />
    </div>
  );
}
