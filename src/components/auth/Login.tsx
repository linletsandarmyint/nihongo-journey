import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  LogIn,
  Sparkles,
  CheckCircle2,
  XCircle,
  X,
  Eye,
  EyeOff,
} from "lucide-react";

import { useAuth } from "../context/useAuth";

function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } = await signIn(email, password);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess("Welcome back! 🌸");

    setTimeout(() => {
      navigate("/");
    }, 1200);
  }

  function closeError() {
    setError("");
  }

  function closeSuccess() {
    setSuccess("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-10">
      {/* Success Alert */}
      {success && (
        <div className="fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-sm animate-in slide-in-from-right-5 rounded-2xl border border-green-100 bg-white p-4 shadow-xl shadow-green-100">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 size={20} className="text-green-500" />
            </div>

            <div className="flex-1">
              <p className="font-bold text-gray-800">Login Successful! 🌸</p>

              <p className="mt-1 text-sm leading-5 text-gray-500">{success}</p>
            </div>

            <button
              type="button"
              onClick={closeSuccess}
              className="text-gray-400 transition hover:text-gray-600"
              aria-label="Close notification"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-sm animate-in slide-in-from-right-5 rounded-2xl border border-red-100 bg-white p-4 shadow-xl shadow-red-100">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <XCircle size={20} className="text-red-500" />
            </div>

            <div className="flex-1">
              <p className="font-bold text-gray-800">Login Failed</p>

              <p className="mt-1 text-sm leading-5 text-gray-500">{error}</p>
            </div>

            <button
              type="button"
              onClick={closeError}
              className="text-gray-400 transition hover:text-gray-600"
              aria-label="Close notification"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Login Card */}
      <div className="mx-auto flex min-h-[85vh] max-w-md items-center justify-center">
        <div className="w-full rounded-[2rem] border border-pink-100 bg-white p-7 shadow-[0_20px_60px_rgba(244,114,182,0.15)] sm:p-9">
          {/* Logo */}
          <div className="mb-7 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-3xl shadow-sm">
              🌸
            </div>

            <h1 className="mt-5 text-2xl font-extrabold text-gray-800">
              Welcome Back!
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Continue your Japanese learning journey ✨
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  className="w-full rounded-xl border border-pink-100 bg-pink-50/40 py-3.5 pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-pink-300 focus:bg-white focus:ring-2 focus:ring-pink-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-pink-100 bg-pink-50/40 py-3.5 pl-11 pr-12 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-pink-300 focus:bg-white focus:ring-2 focus:ring-pink-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-pink-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-500 py-3.5 text-sm font-bold text-white shadow-md shadow-pink-200 transition hover:bg-pink-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Log In
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-7 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-pink-500 transition hover:text-pink-600"
              >
                Create account
              </Link>
            </p>
          </div>

          {/* Cute Decoration */}
          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-pink-300">
            <Sparkles size={14} />
            <span>Study • Practice • Grow</span>
            <Sparkles size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
