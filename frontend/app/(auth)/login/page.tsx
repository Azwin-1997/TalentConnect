"use client";

import {
  useState,
  FormEvent,
  JSX,
  ChangeEvent
} from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function LoginPage(): JSX.Element {
  const { login } = useAuth(); // ⬅️ DO NOT use auth loading here

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false); // ✅ local loading

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(email, password, rememberMe);
    } catch (err: any) {
      setError(err?.message || "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600">
              TalentConnect
            </h1>
            <p className="text-gray-600 mt-2">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-2 text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-700 block">
                Email Address
              </label>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  required
                  className="w-full pl-10 h-12 rounded-lg border border-gray-300
                  focus:border-blue-600 focus:ring-2 focus:ring-blue-600
                  focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-700 block">
                Password
              </label>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  required
                  className="w-full pl-10 pr-10 h-12 rounded-lg border border-gray-300
                  focus:border-blue-600 focus:ring-2 focus:ring-blue-600
                  outline-none transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>

              <a href="/forgotpassword" className="text-blue-600">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full h-12 rounded-lg flex items-center justify-center gap-2
              text-white transition-all
              ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              }`}
            >
              {submitting ? "Signing in..." : "Sign In"}
              {!submitting && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-gray-600 text-sm">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 relative">
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
