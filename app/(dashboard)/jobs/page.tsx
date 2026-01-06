"use client";

import { useEffect, useState } from "react";
import EmptyState from "../../components/EmptyState";
import JobListSkeleton from "../../components/JobListSkeleton";
import JobCard from "../../components/JobCard";
import { SavedJob } from "@/app/types/savedJob";

export default function JobsPage() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<SavedJob[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setJobs([
        {
          id: 1,
          title: "Frontend Developer",
          company: "TechCorp",
          location: "Remote",
          jobType: "Full-time",
          savedAt: "",
        },
        {
          id: 2,
          title: "React Engineer",
          company: "InnovateX",
          location: "Bangalore",
          jobType: "Full-time",
          savedAt: "",
        },
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <JobListSkeleton />;
  }

  if (jobs.length === 0) {
    return (
      <EmptyState
        title="No jobs available"
        description="There are no jobs right now. Please check back later."
        actionLabel="Refresh"
        onAction={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
