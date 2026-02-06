export interface Profile {
  id: string;
  userId: string;

  // Basic info
  headline?: string;
  summary?: string;
  location?: string;

  // Arrays
  skills?: string[];
  experience?: any[];   // refine later if needed
  education?: any[];

  // Meta
  createdAt?: string;
  updatedAt?: string;
}
