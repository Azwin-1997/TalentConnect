"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../context/AuthContext";
import DashboardHeader from "../components/layout/DashboardHeader";
import DashboardSidebar from "../components/layout/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Not logged in
    if (!user) {
      router.push("/login");
      return;
    }

    // Logged in but wrong role
    if (user.role !== "candidate") {
      router.push("/login"); // or /unauthorized
    }
  }, [loading, user, router]);

  // Wait for auth to resolve
  if (loading) return null;

  // Block render if no user or wrong role
  if (!user || user.role !== "candidate") return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
