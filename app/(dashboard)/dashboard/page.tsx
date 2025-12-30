"use client";

import { StatsCard } from "../../components/dashboard/StatsCard";
import { JobCard } from "../../components/dashboard/JobCard";
import { ApplicationsTable } from "../../components/dashboard/ApplicationsTable";
import { ProfilePanel } from "../../components/dashboard/ProfilePanel";
import { Eye, FileText, UserCheck, MessageSquare, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  // Mock data for stats
  const stats = [
    {
      title: "Profile Views",
      value: "1,234",
      icon: Eye,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Jobs Applied",
      value: "24",
      icon: FileText,
      change: "+3",
      changeType: "positive" as const,
    },
    {
      title: "Shortlisted",
      value: "8",
      icon: UserCheck,
      change: "+2",
      changeType: "positive" as const,
    },
    {
      title: "Messages",
      value: "15",
      icon: MessageSquare,
      change: "5 new",
      changeType: "neutral" as const,
    },
  ];

  // Mock data for recommended jobs
  const recommendedJobs = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      jobType: "Full-time",
      salary: "$100k - $130k/year",
      postedTime: "2 hours ago",
      isSaved: false,
    },
    {
      title: "React Developer",
      company: "StartupHub",
      location: "New York, NY",
      jobType: "Full-time",
      salary: "$90k - $120k/year",
      postedTime: "5 hours ago",
      isSaved: true,
    },
    {
      title: "UI/UX Engineer",
      company: "Design Studio",
      location: "San Francisco, CA",
      jobType: "Contract",
      salary: "$80k - $100k/year",
      postedTime: "1 day ago",
      isSaved: false,
    },
  ];

  // Mock data for recent applications
  const recentApplications = [
    {
      id: "1",
      jobRole: "Senior Frontend Developer",
      company: "Google",
      status: "interview" as const,
      appliedDate: "Dec 25, 2024",
    },
    {
      id: "2",
      jobRole: "React Developer",
      company: "Meta",
      status: "shortlisted" as const,
      appliedDate: "Dec 22, 2024",
    },
    {
      id: "3",
      jobRole: "Full Stack Developer",
      company: "Amazon",
      status: "pending" as const,
      appliedDate: "Dec 20, 2024",
    },
    {
      id: "4",
      jobRole: "Frontend Engineer",
      company: "Microsoft",
      status: "shortlisted" as const,
      appliedDate: "Dec 18, 2024",
    },
    {
      id: "5",
      jobRole: "UI Developer",
      company: "Apple",
      status: "rejected" as const,
      appliedDate: "Dec 15, 2024",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="flex">
        

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-gray-900 mb-2">Welcome back, John! 👋</h1>
              <p className="text-gray-600">
                Here's what's happening with your profile
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  change={stat.change}
                  changeType={stat.changeType}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Recommended Jobs Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-gray-900 mb-1">Recommended Jobs</h2>
                      <p className="text-gray-600">Based on your profile and preferences</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
                      View All
                      <TrendingUp className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recommendedJobs.map((job, index) => (
                      <JobCard key={index} {...job} />
                    ))}
                  </div>
                </div>

                {/* Recent Applications Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-gray-900 mb-1">Recent Applications</h2>
                      <p className="text-gray-600">Track your application status</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 transition-colors">
                      View All
                    </button>
                  </div>
                  <ApplicationsTable applications={recentApplications} />
                </div>
              </div>

              {/* Right Column - Profile Panel */}
              <div className="lg:col-span-1">
                <ProfilePanel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
