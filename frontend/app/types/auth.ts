/* ============================
   ROLE
============================ */
export type UserRole = "candidate" | "recruiter" | "admin";

/* ============================
   USER
============================ */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

/* ============================
   AUTH REQUESTS
============================ */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

/* ============================
   AUTH RESPONSE
============================ */
export interface AuthResponse {
  accessToken: string;
  user: User;
}
