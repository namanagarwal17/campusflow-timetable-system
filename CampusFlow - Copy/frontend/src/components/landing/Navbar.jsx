import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Features", href: "#features" },
  { label: "Tech Stack", href: "#tech" },
  { label: "Impact", href: "#impact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/75">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/home" className="text-2xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
            CampusFlow
          </span>
        </Link>

        {!isAuthPage && (
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={location.pathname === "/home" ? item.href : `/home${item.href}`}
                className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="rounded-full border border-blue-400/25 bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-blue-400 dark:bg-blue-400/10 dark:text-blue-300 dark:hover:bg-blue-400/20"
            >
              Open Dashboard
            </Link>
          ) : (
            <>
              {location.pathname !== "/login" && (
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300"
                >
                  <LogIn size={18} />
                  Sign In
                </Link>
              )}
              {location.pathname !== "/register" && (
                <Link
                  to="/register"
                  className="rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 px-6 py-2.5 text-sm font-bold text-white transition hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="flex items-center gap-2">
                    <UserPlus size={18} />
                    Sign Up
                  </div>
                </Link>
              )}
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-slate-300 bg-white p-2 text-slate-700 md:hidden dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white/95 md:hidden dark:border-white/10 dark:bg-slate-950/95">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5">
            {!isAuthPage && navItems.map((item) => (
              <a
                key={item.label}
                href={location.pathname === "/home" ? item.href : `/home${item.href}`}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300"
              >
                {item.label}
              </a>
            ))}

            <div className="flex flex-col gap-4 pt-2">
              <ThemeToggle />
              
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-blue-500 px-5 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Open Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex justify-center rounded-full border border-slate-200 py-2.5 text-sm font-bold text-slate-600 dark:border-white/10 dark:text-slate-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 py-2.5 text-center text-sm font-bold text-white"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}