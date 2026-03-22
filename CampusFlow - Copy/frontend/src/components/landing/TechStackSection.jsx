import { Code2, Database, PanelsTopLeft, Workflow } from "lucide-react";

const stack = [
  {
    title: "React + Vite",
    text: "Fast, component-based frontend with smooth navigation and reusable UI.",
    icon: PanelsTopLeft,
  },
  {
    title: "Tailwind CSS",
    text: "Modern utility-first styling for premium dark UI and responsive layouts.",
    icon: Code2,
  },
  {
    title: "FastAPI Backend",
    text: "High-performance API layer for timetable logic, CRUD operations, and scheduling endpoints.",
    icon: Workflow,
  },
  {
    title: "PostgreSQL / SQLite",
    text: "Reliable storage for faculty, rooms, sections, and generated timetables.",
    icon: Database,
  },
];

export default function TechStackSection() {
  return (
    <section id="tech" className="py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
            Architecture
          </p>
          <h2 className="text-3xl font-bold md:text-5xl">
            Technology Stack & System Design
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            The platform combines a responsive frontend, a scheduling backend,
            a constraint validation engine, and structured storage to deliver
            optimized academic timetables.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <h3 className="mb-6 text-2xl font-bold">Core Stack</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {stack.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-500/30 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-400/30"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                      <Icon size={22} />
                    </div>
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <h3 className="mb-6 text-2xl font-bold">System Flow</h3>
            <div className="space-y-4">
              {[
                "Admin Dashboard",
                "Faculty / Rooms / Subjects / Sections Input",
                "Scheduling Engine",
                "Constraint Validation",
                "Conflict-Free Timetable Output",
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/60"
                >
                  <p className="text-sm text-slate-500 dark:text-slate-400">Layer {i + 1}</p>
                  <p className="font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}