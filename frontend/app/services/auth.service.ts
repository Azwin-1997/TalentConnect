import api from "../lib/axios";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse
} from "../types/auth";

/* ============================
   LOGIN
============================ */
export const login = async (
  data: LoginRequest
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/login", data);
  return res.data;
};

/* ============================
   REGISTER
============================ */
export const register = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/register", data);
  return res.data;
};

/* ============================
   LOGOUT
============================ */
export const logout = async (): Promise<void> => {
  try {
    await api.post("/auth/logout");
  } finally {
    // Always clean up tokens (even if backend fails)
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
    }
  }
};
