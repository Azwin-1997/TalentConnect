import Link from "next/link";
import { MapPin, Briefcase } from "lucide-react";

const featuredJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLabs",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130k - $170k",
  },
  {
    id: 3,
    title: "UX Designer",
    company: "DesignStudio",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $120k",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataWorks",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $150k",
  },
];

export function FeaturedJobsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Jobs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore top opportunities from leading companies
          </p>
        </div>

        {/* Job Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl transition"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>

                <span className="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {job.type}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {job.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {job.company}
              </p>

              {/* Card Content */}
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {job.location}
                </div>
                <p className="text-blue-600 font-medium">
                  {job.salary}
                </p>
              </div>

              {/* Card Footer */}
              <Link
                href="/login"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-medium transition"
              >
                Apply
              </Link>
            </div>
          ))}
        </div>

        {/* View All Jobs */}
        <div className="text-center mt-12">
          <Link
            href="/login"
            className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full px-8 py-3 font-medium transition"
          >
            View All Jobs
          </Link>
        </div>
      </div>
    </section>
  );
}
