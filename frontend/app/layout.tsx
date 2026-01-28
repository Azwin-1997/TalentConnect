import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import { AuthProvider } from "./context/AuthContext";
import { SavedJobsProvider } from "@/app/context/SavedJobsContext";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TalentConnect",
  description: "Connect talent with opportunity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Global Providers */}
        <AuthProvider>
          <SavedJobsProvider>
            {children}
          </SavedJobsProvider>
        </AuthProvider>

        {/* Global Toasts */}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
