import api from "../lib/axios";

export async function getMyProfile() {
  return (await api.get("/profile/me")).data;
}

export async function upsertMyProfile(payload: {
  skills: string[];
  experience: string;
  resumeUploaded: boolean;
  placementStatus: "training" | "ready" | "placed";
}) {
  return (await api.put("/profile/me", payload)).data;
}

