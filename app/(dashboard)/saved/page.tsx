"use client";

import { useState } from "react";
import EmptyState from "../../components/EmptyState";

export default function SavedJobs() {
  const [hasSavedJobs, setHasSavedJobs] = useState(false);

  // Empty state
  if (!hasSavedJobs) {
    return (
      <EmptyState
        title="No saved jobs"
        description="You haven’t saved any jobs yet."
        actionLabel="Browse jobs"
      />
    );
  }

  // Data state (placeholder for now)
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Saved Jobs</h2>
      <p className="text-sm text-gray-500">
        Your saved jobs will appear here.
      </p>
    </div>
  );
}
