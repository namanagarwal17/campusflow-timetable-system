import { NavLink } from "react-router-dom";
import {
  CalendarDays,
  BookOpen,
  Building2,
  Cpu,
  Layers3,
  LayoutDashboard,
  Users,
  X,
  Link2,
} from "lucide-react";

const items = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Faculty", path: "/dashboard/faculty", icon: Users },
  { name: "Subjects", path: "/dashboard/subjects", icon: BookOpen },
  { name: "Rooms", path: "/dashboard/rooms", icon: Building2 },
  { name: "Sections", path: "/dashboard/sections", icon: Layers3 },
  { name: "Assignments", path: "/dashboard/assignments", icon: Link2 },
  { name: "Generate", path: "/dashboard/generate", icon: Cpu },
  { name: "Timetable", path: "/dashboard/timetable", icon: CalendarDays },
];

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 border-r border-slate-200 bg-white/95 p-6 transition-transform duration-300 lg:static lg:translate-x-0 dark:border-white/10 dark:bg-slate-950/95 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:block`}
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold">
              <span className="bg-gradient-to-r from-blue-400 via-sky-500 to-green-500 bg-clip-text text-transparent">
                CampusFlow
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Timetable Generator Dashboard
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-xl border border-slate-300 bg-white p-2 lg:hidden dark:border-white/10 dark:bg-white/5"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "border border-blue-500/20 bg-blue-500/10 text-blue-600 shadow-md shadow-blue-500/10 dark:border-blue-400/20 dark:bg-blue-400/15 dark:text-blue-300"
                      : "text-slate-600 hover:bg-blue-500/8 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-blue-400/10 dark:hover:text-blue-300"
                  }`
                }
              >
                <Icon size={18} />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}