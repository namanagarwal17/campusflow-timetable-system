import { Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";
import { useAuth } from "../../context/AuthContext";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/dashboard/faculty": "Faculty Management",
  "/dashboard/subjects": "Subjects Management",
  "/dashboard/rooms": "Rooms Management",
  "/dashboard/sections": "Sections Management",
  "/dashboard/assignments": "Assignments",
  "/dashboard/generate": "Generate Timetable",
  "/dashboard/timetable": "Timetable Viewer",
};

export default function Topbar({ setSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const currentTitle = pageTitles[location.pathname] || "CampusFlow Dashboard";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="border-b border-slate-200 bg-white/70 px-6 py-4 backdrop-blur-xl transition-colors duration-300 md:px-8 dark:border-white/10 dark:bg-slate-950/60">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl border border-slate-300 bg-white p-2 lg:hidden dark:border-white/10 dark:bg-white/5"
          >
            <Menu size={18} />
          </button>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Smart Campus Hackathon 2026
            </p>
            <h1 className="text-2xl font-bold">{currentTitle}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 md:block dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            {user?.name || "CampusFlow Admin"}
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-100 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300 dark:hover:bg-red-400/20"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}