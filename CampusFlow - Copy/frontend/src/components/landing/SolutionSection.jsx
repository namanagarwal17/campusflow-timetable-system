import {
  CalendarCheck2,
  Cpu,
  Database,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";

const flow = [
  { title: "Admin Dashboard", icon: LayoutDashboard },
  { title: "Scheduling Engine", icon: Cpu },
  { title: "Constraint Validator", icon: ShieldCheck },
  { title: "Database", icon: Database },
  { title: "Timetable Output", icon: CalendarCheck2 },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="py-20">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
            Solution
          </p>
          <h2 className="text-3xl font-bold md:text-5xl">
            Intelligent Timetable Generation System
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            CampusFlow solves timetable generation as a constraint optimization
            problem. The system automatically checks faculty availability,
            section mapping, room allocation, and lab requirements before
            generating a conflict-free timetable.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ["Conflict Prevention", "Prevents faculty, room, and section clashes before the timetable is finalized."],
              ["Multi-Section Support", "Handles multiple classes, labs, and section-wise scheduling in one system."],
              ["Dynamic Regeneration", "If faculty or room conditions change, the timetable can be regenerated quickly."],
              ["Fast Optimization", "Converts weeks of manual planning into seconds of automated scheduling."],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300">{title}</h3>
                <p className="mt-2 text-slate-500 dark:text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="mb-6 text-2xl font-bold">System Workflow</h3>
          <div className="space-y-4">
            {flow.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/60">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Stage {index + 1}</p>
                      <p className="font-semibold">{item.title}</p>
                    </div>
                  </div>
                  {index !== flow.length - 1 && (
                    <div className="ml-6 mt-2 h-6 w-px bg-gradient-to-b from-blue-400/50 to-green-400/30" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}