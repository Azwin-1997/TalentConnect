"use client";

import { useEffect, useState } from "react";
import EmptyState from "../../components/EmptyState";
import JobListSkeleton from "../../components/JobListSkeleton";

export default function JobsPage() {
  // STEP 1: UI states
  const [loading, setLoading] = useState(true);
  const [hasJobs, setHasJobs] = useState(false);

  // STEP 2: fake loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // STEP 3: loading → skeleton
  if (loading) {
    return <JobListSkeleton />;
  }

  // STEP 4: empty → empty state
  if (!hasJobs) {
    return (
      <EmptyState
        title="No jobs available"
        description="There are no jobs right now. Please check back later."
        actionLabel="Refresh"
        onAction={() => window.location.reload()}
      />
    );
  }

  // STEP 5: data → real UI (dummy for now)
  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4">
        <h3 className="font-semibold">Frontend Developer</h3>
        <p className="text-sm text-gray-500">TechCorp • Remote</p>
      </div>
    </div>
  );
}
