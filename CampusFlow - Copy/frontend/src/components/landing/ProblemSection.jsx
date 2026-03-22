import { Building2, Clock3, FlaskConical, Users } from "lucide-react";

const problems = [
  {
    title: "Time-Consuming Planning",
    text: "Manual timetable generation takes days or even weeks of coordination between departments and faculty.",
    icon: Clock3,
  },
  {
    title: "Faculty Conflicts",
    text: "A faculty member may get assigned in multiple classes at the same time, causing scheduling clashes.",
    icon: Users,
  },
  {
    title: "Room Allocation Issues",
    text: "Limited classrooms and room capacity constraints make timetable planning more difficult.",
    icon: Building2,
  },
  {
    title: "Lab Scheduling Complexity",
    text: "Practical sessions need lab availability and consecutive slots, making manual planning error-prone.",
    icon: FlaskConical,
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
            Problem
          </p>
          <h2 className="text-3xl font-bold md:text-5xl">
            Challenges in Manual Timetable Scheduling
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Universities deal with faculty schedules, room capacity, lab sessions,
            and multiple sections. Manual scheduling often leads to delays,
            conflicts, and inefficient resource use.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-400/30"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 transition group-hover:bg-blue-200 dark:bg-blue-400/10 dark:text-blue-300 dark:group-hover:bg-blue-400/20">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-500 dark:text-slate-400">{item.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-4 dark:border-white/10 dark:bg-white/5">
          {["Faculty Input", "Manual Planning", "Conflicts", "Re-Scheduling"].map(
            (step, i) => (
              <div
                key={step}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-white/10 dark:bg-slate-900/60"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400">Step {i + 1}</p>
                <p className="mt-1 font-semibold">{step}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}