import { Job } from "@/app/types/job";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";


export const toggleSavedJob = async (
  userId: string,
  job: Job & { jobId: string }
): Promise<boolean> => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return false;

  const userData = userSnap.data();
  const alreadySaved = (userData.savedJobs || []).some((j: any) => j.jobId === job.jobId);

  await updateDoc(userRef, {
    savedJobs: alreadySaved
      ? arrayRemove(job)
      : arrayUnion(job),
  });

  return !alreadySaved; // new saved state
};
