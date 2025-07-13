import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { Job } from '@/app/types/job';

export async function getJobById(id: string): Promise<Job | null> {
  const docRef = doc(db, 'jobs', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Job;
  }
  return null;
}
