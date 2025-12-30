"use client";

import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-blue-600 mb-6">
              TalentConnect
            </h1>

            {!isSubmitted ? (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Forgot Password
                </h2>
                <p className="text-gray-600">
                  Enter your registered email to receive a password reset link
                </p>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-14 h-14 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Check Your Email
                </h2>
                <p className="text-gray-600">
                  We’ve sent a password reset link to{" "}
                  <span className="font-medium text-gray-900">{email}</span>
                </p>
              </>
            )}
          </div>

          {/* Form */}
          {!isSubmitted ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-md hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition"
                >
                  Send Reset Link
                </button>
              </form>

              {/* Back to Login */}
              <div className="mt-6">
                <a
                  href="/login"
                  className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Login
                </a>
              </div>
            </>
          ) : (
            <>
              {/* Success Actions */}
              <div className="space-y-4">
                <button
                  onClick={() => (window.location.href = "mailto:")}
                  className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-md hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition"
                >
                  Open Email App
                </button>

                <p className="text-center text-gray-600">
                  Didn’t receive the email?{" "}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Try again
                  </button>
                </p>
              </div>

              {/* Back to Login */}
              <div className="mt-6">
                <a
                  href="#login"
                  className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Login
                </a>
              </div>
            </>
          )}
        </div>

        {/* Footer Help */}
        <p className="mt-6 text-center text-gray-500">
          Need help?{" "}
          <a
            href="#support"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
