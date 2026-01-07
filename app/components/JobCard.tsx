import { SavedJob } from "@/app/types/savedJob";
import { useSavedJobs } from "@/app/context/SavedJobsContext";
import { toast } from "sonner";

export default function JobCard({ job }: { job: SavedJob }) {
  const { saveJob, removeJob, isSaved } = useSavedJobs();
  const saved = isSaved(job.id);

  const handleToggleSave = () => {
    if (saved) {
      removeJob(job.id);
      toast.success("Job removed from saved");
    } else {
      saveJob({ ...job, savedAt: "Just now" });
      toast.success("Job saved");
    }
  };

  return (
    <div className="rounded-lg border p-4 bg-white shadow-sm">
      <h3 className="text-xl font-bold text-black">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.company}</p>

      <button
        onClick={handleToggleSave}
        className={`text-sm ${
          saved ? "text-green-600" : "text-blue-600"
        }`}
      >
        {saved ? "Saved" : "Save"}
      </button>
    </div>
  );
}
