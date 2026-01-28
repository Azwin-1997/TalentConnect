"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import {
  login as loginService,
  logout as logoutService,
  register as registerService,
} from "../services/auth.service";

import api from "../lib/axios";
import { User } from "../types/auth";

/* ============================
   TYPES
============================ */
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: "candidate" | "recruiter" | "admin",
    rememberMe: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
}

/* ============================
   CONTEXT
============================ */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ============================
   PROVIDER
============================ */
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ============================
     LOAD USER ON REFRESH
  ============================ */
  useEffect(() => {
  const loadUser = async () => {
    try {
      const token =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await api.get<User>("/auth/me");
      console.log("Frontend loadUser role:", res.data.role);
      setUser(res.data);
    } catch {
      // Hard reset on auth failure
      localStorage.clear();
      sessionStorage.clear();
      document.cookie = "refreshToken=; Max-Age=0; path=/";
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  loadUser();
}, []);


  /* ============================
     ROLE BASED REDIRECT
  ============================ */
  const redirectByRole = (role: User["role"]) => {
    if (role === "candidate") {
      router.push("/dashboard");
    } else if (role === "recruiter") {
      router.push("/hr");
    } else if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/login");
    }
  };

  /* ============================
     LOGIN
  ============================ */
  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    const data = await loginService({ email, password });

    if (rememberMe) {
      localStorage.setItem("accessToken", data.accessToken);
    } else {
      sessionStorage.setItem("accessToken", data.accessToken);
    }

    setUser(data.user);
    redirectByRole(data.user.role);
  };

  /* ============================
     REGISTER
  ============================ */
  const register = async (
    name: string,
    email: string,
    password: string,
    role: "candidate" | "recruiter" | "admin",
    rememberMe: boolean
  ) => {
    const data = await registerService({
      name,
      email,
      password,
      role,
    });

    // Jobseeker (candidate): do not auto-login — redirect to login page
    if (role === "candidate") {
      router.push("/login");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("accessToken", data.accessToken);
    } else {
      sessionStorage.setItem("accessToken", data.accessToken);
    }

    setUser(data.user);
    redirectByRole(data.user.role);
  };

  /* ============================
     LOGOUT
  ============================ */
  const logout = async () => {
    await logoutService();
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ============================
   HOOK
============================ */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
