import { SavedJob } from "@/app/types/savedJob";

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

  remove(id: number): SavedJob[] {
    const updated = this.getAll().filter((job) => job.id !== id);
    this.saveAll(updated);
    return updated;
  },

  isSaved(id: number): boolean {
    return this.getAll().some((job) => job.id === id);
  },
};
