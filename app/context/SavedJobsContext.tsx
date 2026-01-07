"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { SavedJob } from "@/app/types/savedJob";
import { savedJobsService } from "@/app/lib/savedJobsService";
import {
  savedJobsReducer,
  SavedJobsState,
} from "./savedJobsReducer";

type SavedJobsContextType = {
  jobs: SavedJob[];
  saveJob: (job: SavedJob) => void;
  removeJob: (id: number) => void;
  isSaved: (id: number) => boolean;
};

const SavedJobsContext = createContext<SavedJobsContextType | null>(
  null
);

export function SavedJobsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(savedJobsReducer, {
    jobs: [],
  });

  // Load jobs once
  useEffect(() => {
    const jobs = savedJobsService.getAll();
    dispatch({ type: "LOAD_JOBS", payload: jobs });
  }, []);

  const saveJob = (job: SavedJob) => {
    const updated = savedJobsService.add(job);
    dispatch({ type: "LOAD_JOBS", payload: updated });
  };

  const removeJob = (id: number) => {
    const updated = savedJobsService.remove(id);
    dispatch({ type: "LOAD_JOBS", payload: updated });
  };

  const isSaved = (id: number) =>
    state.jobs.some((job) => job.id === id);

  return (
    <SavedJobsContext.Provider
      value={{
        jobs: state.jobs,
        saveJob,
        removeJob,
        isSaved,
      }}
    >
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error(
      "useSavedJobs must be used inside SavedJobsProvider"
    );
  }
  return context;
}
