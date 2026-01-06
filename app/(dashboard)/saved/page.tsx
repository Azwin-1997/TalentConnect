"use client";

import { useEffect, useState } from "react";
import EmptyState from "../../components/EmptyState";
import SavedJobSkeleton from "../../components/skeletons/SavedJobSkeleton";
import SavedJobCard from "../../components/SavedJobsCard";
import { SavedJob } from "@/app/types/savedJob";
import { savedJobsService } from "@/app/lib/savedJobsService";
import { toast } from "sonner";

export default function SavedJobs() {
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);

  // load saved jobs (simulate API delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      const jobs = savedJobsService.getAll();
      setSavedJobs(jobs);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleRemove = (id: number) => {
  const updated = savedJobsService.remove(id);
  setSavedJobs(updated);
  toast.success("Job removed from saved");
};


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
            job={job}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
}
