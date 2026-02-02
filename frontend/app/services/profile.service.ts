import api from "../lib/axios";

export async function getMyProfile() {
  return (await api.get("/profile/me")).data;
}

export type WorkExperience = {
  title?: string;
  company?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
};

export type Education = {
  degree?: string;
  institution?: string;
  description?: string;
};

export type ProfilePayload = {
  name?: string;
  title?: string;
  location?: string;
  phone?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  workExperience?: WorkExperience[];
  education?: Education[];
  portfolioLinks?: string[];
  resumeUploaded?: boolean;
  placementStatus?: "training" | "ready" | "placed";
  resumeFileId?: string;
  resumeFilename?: string;
  resumeMime?: string;
};

export async function upsertMyProfile(payload: ProfilePayload) {
  return (await api.put("/profile/me", payload)).data;
}

