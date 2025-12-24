import Link from "next/link";

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Connecting Talent with the Right Opportunities
            </h1>

            <p className="text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Discover jobs, connect with recruiters, and grow your career with TalentConnect.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-center font-medium shadow-md transition"
              >
                Get Started
              </Link>

              <Link
                href="/login"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full px-8 py-3 text-center font-medium transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1758518730380-04c8e0d57b68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Professional hiring"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
