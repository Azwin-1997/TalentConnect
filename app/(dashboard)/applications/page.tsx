"use client";

import { useEffect, useState } from "react";
import EmptyState from "../../components/EmptyState";
import ApplicationSkeleton from "../../components/skeletons/ApplicationSkeleton";

export default function Applications() {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);

  // simulate API call
  useEffect(() => {
    setTimeout(() => {
      setApplications([]); // later replace with mock / real API
      setLoading(false);
    }, 1200);
  }, []);

  // Loading state
  if (loading) {
    return <ApplicationSkeleton />;
  }

  // Empty state
  if (applications.length === 0) {
    return (
      <EmptyState
        title="No applications yet"
        description="You haven’t applied to any jobs yet."
        actionLabel="Find jobs"
        href="/jobs"
      />
    );
  }

  // Data state
  return (
    <div className="p-4 space-y-2">
      <h2 className="text-lg font-semibold">Applications</h2>
      <p className="text-sm text-gray-500">
        Your job applications will appear here.
      </p>

      {/* application cards will be mapped here */}
    </div>
  );
}
