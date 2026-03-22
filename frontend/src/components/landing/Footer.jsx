export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 md:flex-row md:items-center md:px-10">
        <div>
          <h3 className="text-xl font-bold">
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-purple-400 bg-clip-text text-transparent">
              CampusFlow
            </span>
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Intelligent Timetable Generator for Smart Campuses
          </p>
        </div>

        <div className="text-sm text-slate-500">
          Smart Campus Hackathon 2026 • Team CampusFlow
        </div>
      </div>
    </footer>
  );
}