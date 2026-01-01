"use client";

import { useState } from "react";
import EmptyState from "../../components/EmptyState";

export default function Applications() {
  const [hasApplications, setHasApplications] = useState(false);

  if (!hasApplications) {
    return (
      <EmptyState
        title="No applications yet"
        description="You haven’t applied to any jobs yet."
        actionLabel="Find jobs"
      />
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Applications</h2>
      <p className="text-sm text-gray-500">
        Your job applications will appear here.
      </p>
    </div>
  );
}
