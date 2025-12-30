import { MapPin, Clock, Briefcase, Bookmark } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  jobType: string;
  salary?: string;
  postedTime: string;
  logo?: string;
  isSaved?: boolean;
}

export function JobCard({
  title,
  company,
  location,
  jobType,
  salary,
  postedTime,
  isSaved = false,
}: JobCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
            {company[0]}
          </div>

          {/* Job Info */}
          <div>
            <h3 className="text-gray-900 mb-1">{title}</h3>
            <p className="text-gray-700 mb-2">{company}</p>
            <div className="flex flex-wrap items-center gap-3 text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {jobType}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {postedTime}
              </span>
            </div>
          </div>
        </div>

        {/* Bookmark Button */}
        <button
          className={`p-2 rounded-lg transition-colors ${
            isSaved
              ? "bg-blue-50 text-blue-600"
              : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          }`}
        >
          <Bookmark className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Salary */}
      {salary && (
        <div className="mb-4">
          <span className="text-gray-900">{salary}</span>
        </div>
      )}

      {/* Actions */}
      {/* Actions */}
<div className="flex gap-3">
  <button
    className="flex-1 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700
               text-white font-medium
               hover:from-blue-700 hover:to-blue-800
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
               transition-all"
  >
    Apply Now
  </button>

  <button
    className="h-10 px-4 rounded-lg border border-gray-300
               text-gray-700 font-medium
               hover:bg-gray-50
               focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
               transition-all"
  >
    View Details
  </button>
</div>

    </div>
  );
}
