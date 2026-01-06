import { SavedJob } from "../types/savedJob";

const STORAGE_KEY = "saved_jobs";

export const savedJobsService = {
  getAll(): SavedJob[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveAll(jobs: SavedJob[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  },

  add(job: SavedJob): SavedJob[] {
    const jobs = this.getAll();
    const exists = jobs.some((j) => j.id === job.id);

    if (!exists) {
      jobs.push(job);
      this.saveAll(jobs);
    }

    return jobs;
  },

  remove(jobId: number): SavedJob[] {
    const jobs = this.getAll();
    const updated = jobs.filter((job) => job.id !== jobId);
    this.saveAll(updated);
    return updated;
  },
};
