"use client";

import { useEffect, useState } from "react";
import EmptyState from "../../components/EmptyState";
import SavedJobSkeleton from "../../components/skeletons/SavedJobSkeleton";

export default function SavedJobs() {
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);

  // simulate API call
  useEffect(() => {
    setTimeout(() => {
      setSavedJobs([]); // later replace with mock / real data
      setLoading(false);
    }, 1200);
  }, []);

  // Loading state
  if (loading) {
    return <SavedJobSkeleton />;
  }

  //  Empty state
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

  // Data state (placeholder)
  return (
    <div className="p-4 space-y-2">
      <h2 className="text-lg font-semibold">Saved Jobs</h2>
      <p className="text-sm text-gray-500">
        Your saved jobs will appear here.
      </p>

      {/* SavedJobCard will be mapped here */}
    </div>
  );
}
