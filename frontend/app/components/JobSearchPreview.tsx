import Link from "next/link";
import { Search, MapPin } from "lucide-react";

export function JobSearchPreview() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-center text-2xl font-semibold text-gray-900 mb-8">
            Start Your Job Search
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Job Title Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Job Title"
                className="w-full pl-10 h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-gray-700 text-black"
              />
            </div>

            {/* Location Input */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-10 h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-gray-700 text-black"
              />
            </div>

            {/* Search Button → Link */}
            <Link
              href="/login"
              className="h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center font-medium transition"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Link>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Sign in to view full job listings and apply
          </p>
        </div>
      </div>
    </section>
  );
}

