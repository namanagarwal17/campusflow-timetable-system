import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LockKeyhole, Mail, User, ShieldCheck, ArrowRight, UserPlus } from "lucide-react";
import ThemeToggle from "../components/common/ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const result = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role
    });

    setLoading(false);
    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10 md:px-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/60 transition-colors duration-300 dark:border-white/10 dark:bg-white/5 dark:shadow-blue-500/10 lg:grid-cols-2">
          
          {/* Left Side - Visuals */}
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-green-500 via-emerald-500 to-blue-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
                Join the Community
              </p>
              <h1 className="mt-6 text-5xl font-black leading-tight">
                Create Your Account
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-white/90">
                Start your journey with CampusFlow. Experience the most advanced 
                college management and timetable generation system.
              </p>
            </div>

            <div className="relative z-10 space-y-4">
               <div className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                   <ShieldCheck className="text-white" />
                 </div>
                 <div>
                   <p className="font-bold">Secure Access</p>
                   <p className="text-sm text-white/80">Enterprise-grade security for your data.</p>
                 </div>
               </div>
               <div className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                   <UserPlus className="text-white" />
                 </div>
                 <div>
                   <p className="font-bold">Smart Roles</p>
                   <p className="text-sm text-white/80">Tailored experiences for Faculty and Students.</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex items-center justify-center p-8 md:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black tracking-tight">Sign Up</h2>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Get started with CampusFlow today
                  </p>
                </div>
                <ThemeToggle />
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Username
                    </label>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 transition-all duration-200 hover:border-emerald-400 focus-within:border-emerald-400 dark:border-white/10 dark:bg-slate-900/60">
                      <User size={18} className="text-slate-400" />
                      <input
                        type="text"
                        name="username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="john_doe"
                        className="w-full bg-transparent outline-none placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Role
                    </label>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 transition-all duration-200 hover:border-emerald-400 focus-within:border-emerald-400 dark:border-white/10 dark:bg-slate-900/60">
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full bg-transparent outline-none"
                      >
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 transition-all duration-200 hover:border-emerald-400 focus-within:border-emerald-400 dark:border-white/10 dark:bg-slate-900/60">
                    <Mail size={18} className="text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-transparent outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 transition-all duration-200 hover:border-emerald-400 focus-within:border-emerald-400 dark:border-white/10 dark:bg-slate-900/60">
                    <LockKeyhole size={18} className="text-slate-400" />
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-transparent outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Confirm Password
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 transition-all duration-200 hover:border-emerald-400 focus-within:border-emerald-400 dark:border-white/10 dark:bg-slate-900/60">
                    <LockKeyhole size={18} className="text-slate-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-transparent outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300">
                   {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 px-5 py-3.5 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50"
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-blue-600 hover:text-blue-500 dark:text-blue-300"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
