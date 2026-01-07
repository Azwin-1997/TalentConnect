"use client";

import { useSavedJobs } from "@/app/context/SavedJobsContext";
import SavedJobCard from "../../components/SavedJobsCard";
import EmptyState from "../../components/EmptyState";

export default function SavedJobsPage() {
  const { jobs, removeJob } = useSavedJobs();

  if (jobs.length === 0) {
    return (
      <EmptyState
        title="No saved jobs"
        description="You haven’t saved any jobs yet."
      />
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <SavedJobCard
          key={job.id}
          job={job}
          onRemove={() => removeJob(job.id)}
        />
      ))}
    </div>
  );
}
