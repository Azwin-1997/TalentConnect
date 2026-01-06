"use client";

import { useEffect, useState } from "react";
import { SavedJob } from "@/app/types/savedJob";
import { savedJobsService } from "@/app/lib/savedJobsService";

interface JobCardProps {
  job: SavedJob;
}

export default function JobCard({ job }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  // check saved state on load
  useEffect(() => {
    setIsSaved(savedJobsService.isSaved(job.id));
  }, [job.id]);

  const handleToggleSave = () => {
    if (isSaved) {
      savedJobsService.remove(job.id);
      setIsSaved(false);
    } else {
      savedJobsService.add({
        ...job,
        savedAt: "Just now",
      });
      setIsSaved(true);
    }
  };

  return (
    <div className="rounded-lg border p-4 bg-white shadow-sm">
      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.company}</p>
      <p className="text-sm text-gray-500">{job.location}</p>

      <div className="mt-2 flex items-center justify-between">
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
          {job.jobType}
        </span>

        <button
          onClick={handleToggleSave}
          className={`text-sm font-medium ${
            isSaved ? "text-green-600" : "text-blue-600"
          }`}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}
