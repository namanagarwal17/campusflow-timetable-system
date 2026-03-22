export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 transition-colors duration-300 dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center md:px-10">
        <div>
          <h3 className="text-2xl font-black">
            <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
              CampusFlow
            </span>
          </h3>
          <p className="mt-2 max-w-xs text-sm text-slate-500 dark:text-slate-400">
            Intelligent Timetable Generator and Campus Management platform for modern educational institutions.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 md:items-end">
          <div className="flex gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Contact</a>
          </div>
          <div className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            © 2026 CampusFlow • Smart Campus Hackathon • Team Blue-Green
          </div>
        </div>
      </div>
    </footer>
  );
}