"use client";

import { useEffect, useState } from "react";
import EmptyState from "../../components/EmptyState";
import ApplicationSkeleton from "../../components/skeletons/ApplicationSkeleton";
import ApplicationCard from "../../components/ApplicationCard";
import { mockApplications } from "../../../data/mockApplications";

export default function Applications() {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);

  // simulate API call
  useEffect(() => {
    setTimeout(() => {
      setApplications(mockApplications); // ✅ mock data
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
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Applications</h2>
      <p className="text-sm font-black text-gray-500">
        Your job applications will appear here.
      </p>

      <div className="space-y-3">
        {applications.map((app) => (
          <ApplicationCard
            key={app.id}
            title={app.title}
            company={app.company}
            location={app.location}
            status={app.status}
          />
        ))}
      </div>
    </div>
  );
}
