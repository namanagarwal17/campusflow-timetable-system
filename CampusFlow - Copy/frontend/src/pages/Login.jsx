import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LockKeyhole, Mail, ArrowRight } from "lucide-react";
import ThemeToggle from "../components/common/ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: true,
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    const result = login(formData);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/home");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10 md:px-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/60 transition-colors duration-300 dark:border-white/10 dark:bg-white/5 dark:shadow-blue-500/10 lg:grid-cols-2">
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-500 via-sky-500 to-green-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
                Smart Campus Platform
              </p>
              <h1 className="mt-6 text-5xl font-black leading-tight">
                CampusFlow
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-white/90">
                Intelligent timetable generation for modern campuses with
                conflict-free scheduling, smart dashboards, and seamless academic
                planning.
              </p>
            </div>

            <div className="relative z-10 rounded-[28px] border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
              <p className="text-sm text-white/80">Demo Credentials</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-white/80">Username</p>
                  <p className="text-xl font-black">admin</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-white/80">Password</p>
                  <p className="text-xl font-black">admin123</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-8 md:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black tracking-tight">Sign In</h2>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Access your CampusFlow workspace
                  </p>
                </div>
                <ThemeToggle />
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Username / Email
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 transition-all duration-200 hover:border-blue-400 focus-within:border-blue-400 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-400/30">
                    <Mail size={18} className="text-slate-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter username"
                      className="w-full bg-transparent outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 transition-all duration-200 hover:border-blue-400 focus-within:border-blue-400 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-400/30">
                    <LockKeyhole size={18} className="text-slate-400" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className="w-full bg-transparent outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="font-medium text-blue-600 transition hover:text-blue-500 dark:text-blue-300"
                  >
                    Forgot password?
                  </button>
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 px-5 py-3.5 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30"
                >
                  Login
                  <ArrowRight size={18} />
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-300"
                >
                  Sign Up
                </Link>
              </p>

              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                Demo login: <span className="font-semibold">admin</span> /{" "}
                <span className="font-semibold">admin123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}