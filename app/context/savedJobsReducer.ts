import { SavedJob } from "@/app/types/savedJob";

export type SavedJobsState = {
  jobs: SavedJob[];
};

export type SavedJobsAction =
  | { type: "LOAD_JOBS"; payload: SavedJob[] }
  | { type: "SAVE_JOB"; payload: SavedJob }
  | { type: "REMOVE_JOB"; payload: number };

export function savedJobsReducer(
  state: SavedJobsState,
  action: SavedJobsAction
): SavedJobsState {
  switch (action.type) {
    case "LOAD_JOBS":
      return { jobs: action.payload };

    case "SAVE_JOB":
      return {
        jobs: state.jobs.some((j) => j.id === action.payload.id)
          ? state.jobs
          : [...state.jobs, action.payload],
      };

    case "REMOVE_JOB":
      return {
        jobs: state.jobs.filter((job) => job.id !== action.payload),
      };

    default:
      return state;
  }
}
