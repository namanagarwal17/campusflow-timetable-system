import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Sparkles,
} from "lucide-react";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { dashboardStats, recentActivities, systemStatus } from "../../data/mockStats";

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
            <Sparkles size={16} />
            Dashboard Overview
          </div>

          <h2 className="mt-5 text-3xl font-black md:text-5xl">
            Smart Timetable Control Center
          </h2>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-500 dark:text-slate-400">
            Manage faculty, subjects, rooms, sections, and generate conflict-free
            academic schedules from one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/dashboard/generate"
              className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:scale-[1.02] hover:bg-cyan-400"
            >
              Generate Timetable
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/dashboard/timetable"
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-cyan-500/30 hover:text-cyan-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-cyan-400/30 dark:hover:text-cyan-300"
            >
              View Timetable
            </Link>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">System Status</h3>
            <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
              Live
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {systemStatus.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/60"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
                <p className="mt-1 font-semibold text-cyan-600 dark:text-cyan-300">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((item) => (
          <DashboardCard
            key={item.title}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-5 flex items-center gap-2">
            <Clock3 className="text-cyan-600 dark:text-cyan-300" size={20} />
            <h3 className="text-xl font-bold">Recent Activity</h3>
          </div>

          <div className="space-y-4">
            {recentActivities.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-500/20 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-cyan-400/20 dark:hover:bg-slate-900"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 text-cyan-600 dark:text-cyan-300"
                    size={18}
                  />
                  <p className="text-slate-700 dark:text-slate-300">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-5 flex items-center gap-2">
            <CalendarDays className="text-cyan-600 dark:text-cyan-300" size={20} />
            <h3 className="text-xl font-bold">Timetable Snapshot</h3>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
            <div className="grid grid-cols-5 gap-2 bg-slate-100 px-3 py-3 text-center text-xs font-semibold text-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-2 bg-white p-3 text-center text-xs dark:bg-white/5">
              {[
                "Maths",
                "Physics",
                "Lab",
                "DBMS",
                "AI",
                "OS",
                "DSA",
                "Maths",
                "Lab",
                "DBMS",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl px-2 py-3 font-semibold ${
                    item === "Lab"
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-200"
                      : "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-200"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/60">
              <div className="flex items-center gap-2">
                <BarChart3 className="text-cyan-600 dark:text-cyan-300" size={18} />
                <p className="font-semibold">Faculty Allocation</p>
              </div>
              <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-white/10">
                <div className="h-2 w-4/5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/60">
              <div className="flex items-center gap-2">
                <BarChart3 className="text-purple-600 dark:text-purple-300" size={18} />
                <p className="font-semibold">Room Utilization</p>
              </div>
              <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-white/10">
                <div className="h-2 w-3/4 rounded-full bg-purple-500 dark:bg-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}