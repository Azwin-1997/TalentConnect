"use client";

import { useState } from "react";
import { Eye, EyeOff, Check, X, CheckCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    match: password === confirmPassword && password.length > 0,
  };

  const isPasswordValid = Object.values(validations).every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPasswordValid) {
      setIsSubmitted(true);
    }
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
                  Reset Password
                </h2>
                <p className="text-gray-600">
                  Create a new password for your account
                </p>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-14 h-14 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Password Reset Successful
                </h2>
                <p className="text-gray-600">
                  Your password has been successfully reset. You can now log in
                  with your new password.
                </p>
              </>
            )}
          </div>

          {!isSubmitted ? (
            <>
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full h-12 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full h-12 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Rules */}
                {password && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                    <p className="font-medium text-gray-700">
                      Password must contain:
                    </p>

                    {[
                      ["At least 8 characters", validations.length],
                      ["One uppercase letter", validations.uppercase],
                      ["One lowercase letter", validations.lowercase],
                      ["One number", validations.number],
                      ["Passwords match", validations.match],
                    ].map(([label, valid], index) => (
                      <div key={index} className="flex items-center gap-2">
                        {valid ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <X className="w-4 h-4 text-gray-400" />
                        )}
                        <span
                          className={
                            valid ? "text-green-600" : "text-gray-600"
                          }
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isPasswordValid}
                  className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-md hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Password
                </button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 text-center">
                <a
                  href="/login"
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  Back to Login
                </a>
              </div>
            </>
          ) : (
            <>
              {/* Success Action */}
              <button
                onClick={() => (window.location.href = "/login")}
                className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-md hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition"
              >
                Continue to Login
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        {!isSubmitted && (
          <p className="mt-6 text-center text-gray-500">
            Remember your password?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
