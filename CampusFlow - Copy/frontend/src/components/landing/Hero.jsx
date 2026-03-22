import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Sparkles, Zap, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

export default function Hero() {
  const { isAuthenticated } = useAuth();

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute left-0 top-16 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:px-10 lg:grid-cols-2 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
            <Sparkles size={16} />
            Smart Campus Scheduling Platform
          </div>

          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Smarter Timetables for{" "}
            <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
              Smarter Campuses
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            CampusFlow automates university timetable generation using
            constraint-based scheduling to create conflict-free academic plans
            for multiple sections, faculty, labs, and classrooms.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 px-8 py-4 font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Go to Dashboard
                <ArrowRight size={18} />
              </Link>
            ) : (
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 px-8 py-4 font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Get Started Free
                <Rocket size={18} />
              </Link>
            )}

            {!isAuthenticated && (
              <Link
                to="/login"
                className="rounded-full border border-slate-300 bg-white px-8 py-4 font-bold text-slate-700 transition-all duration-200 hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Weeks → Seconds", "Scheduling Time"],
              ["0 Clashes", "Validated Output"],
              ["Multi-Section", "Scalable System"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10 dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-xl font-bold text-blue-600 dark:text-blue-300">
                  {title}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/60 dark:border-white/10 dark:bg-white/5 dark:shadow-blue-500/10">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Dashboard Preview
                </p>
                <h3 className="text-2xl font-bold">Timetable Overview</h3>
              </div>
              <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
                Live System
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/60">
                  <CalendarDays className="mb-2 text-blue-600 dark:text-blue-300" size={20} />
                  <p className="text-sm text-slate-500 dark:text-slate-400">Classes</p>
                  <p className="text-2xl font-bold">128</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/60">
                  <Zap className="mb-2 text-green-500 dark:text-green-300" size={20} />
                  <p className="text-sm text-slate-500 dark:text-slate-400">Sections</p>
                  <p className="text-2xl font-bold">12</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/60">
                  <Sparkles className="mb-2 text-blue-600 dark:text-blue-300" size={20} />
                  <p className="text-sm text-slate-500 dark:text-slate-400">Conflicts</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/60">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-semibold">Weekly Timetable</h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    CSE-A
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2 text-xs">
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                    <div
                      key={day}
                      className="rounded-xl border border-slate-200 bg-white px-2 py-2 text-center font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-5 gap-2 text-xs">
                  {[
                    "Maths",
                    "Physics",
                    "Lab",
                    "DBMS",
                    "AI",
                    "OS",
                    "Maths",
                    "Lab",
                    "DSA",
                    "DBMS",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl px-2 py-3 text-center font-semibold ${
                        item === "Lab"
                          ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-200"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}