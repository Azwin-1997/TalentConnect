"use client";

import { useEffect, useState } from "react";
import EmptyState from "../../components/EmptyState";
import SavedJobSkeleton from "../../components/skeletons/SavedJobSkeleton";
import SavedJobCard from "../../components/SavedJobsCard";
import { mockSavedJobs } from "../../../data/mockSavedJobs";

interface SavedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  jobType: string;
  savedAt: string;
}

export default function SavedJobs() {
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);

  // simulate API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setSavedJobs(mockSavedJobs); // ✅ mock data
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Loading state
  if (loading) {
    return <SavedJobSkeleton />;
  }

  // Empty state
  if (savedJobs.length === 0) {
    return (
      <EmptyState
        title="No saved jobs"
        description="You haven’t saved any jobs yet."
        actionLabel="Browse jobs"
        href="/jobs"
      />
    );
  }

  // Data state
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Saved Jobs</h2>
      <p className="text-sm font-black text-gray-500">
        Jobs you’ve saved for later.
      </p>

      <div className="space-y-3">
  {savedJobs.map((job) => (
    <SavedJobCard
      key={job.id}
      title={job.title}
      company={job.company}
      location={job.location}
      jobType={job.jobType}
      savedAt={job.savedAt}
      onRemove={() =>
        setSavedJobs((prev) => prev.filter((j) => j.id !== job.id))
      }
    />
  ))}
</div>

    </div>
  );
}
