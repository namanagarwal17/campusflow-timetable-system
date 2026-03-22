import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";

const navItems = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Features", href: "#features" },
  { label: "Tech Stack", href: "#tech" },
  { label: "Impact", href: "#impact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/75">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/home" className="text-2xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-500 bg-clip-text text-transparent">
            CampusFlow
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            to="/dashboard"
            className="rounded-full border border-cyan-400/25 bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-cyan-400 dark:bg-cyan-400/10 dark:text-cyan-300 dark:hover:bg-cyan-400/20"
          >
            Open Dashboard
          </Link>
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
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-600 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-2">
              <ThemeToggle />
            </div>

            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-cyan-400/25 bg-cyan-500 px-5 py-2.5 text-center text-sm font-semibold text-white dark:bg-cyan-400/10 dark:text-cyan-300"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}