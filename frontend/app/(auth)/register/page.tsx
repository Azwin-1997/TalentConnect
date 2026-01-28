"use client";

import {
  useState,
  FormEvent,
  ChangeEvent,
  JSX
} from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

/* ============================
   ROLE TYPES
============================ */
type UiRole = "jobseeker" | "recruiter";
type BackendRole = "candidate" | "recruiter";

/* ============================
   FORM DATA
============================ */
interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UiRole;
}

function RegisterPage(): JSX.Element {
  const { register, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "jobseeker",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // ✅ UI ROLE → BACKEND ROLE (FINAL & CORRECT)
    const mappedRole: BackendRole =
      formData.role === "jobseeker"
        ? "candidate"
        : "recruiter";

    try {
      await register(
        formData.fullName,
        formData.email,
        formData.password,
        mappedRole,
        true // rememberMe
      );
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError("An account with this email already exists");
      } else {
        setError(
          err.response?.data?.message ||
          "Registration failed. Please try again."
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-blue-600 mb-2 text-3xl font-bold">
              TalentConnect
            </h1>
            <h2 className="text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">
              Join TalentConnect and get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-2 text-sm">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="h-12 w-full rounded-lg border border-gray-300 px-4
                           text-black focus:border-blue-600 focus:ring-blue-600"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12 w-full rounded-lg border border-gray-300 px-4
                           text-black focus:border-blue-600 focus:ring-blue-600"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-lg border border-gray-300 px-4 pr-10
                             text-black focus:border-blue-600 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-lg border border-gray-300 px-4 pr-10
                             text-black focus:border-blue-600 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-black">I am a:</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="jobseeker"
                    checked={formData.role === "jobseeker"}
                    onChange={handleChange}
                  />
                  <span className="text-black">Job Seeker</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={formData.role === "recruiter"}
                    onChange={handleChange}
                  />
                  <span className="text-black">Recruiter</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <img
          src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1"
          alt="Workspace"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
    </div>
  );
}

export default RegisterPage;
