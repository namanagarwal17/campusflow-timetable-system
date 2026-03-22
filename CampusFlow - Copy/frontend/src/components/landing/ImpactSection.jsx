const stats = [
  { value: "Weeks", label: "Manual Scheduling Time" },
  { value: "Seconds", label: "Automated Scheduling Time" },
  { value: "0", label: "Conflict Output Goal" },
];

const benefits = [
  "Reduces timetable creation from weeks to seconds",
  "Prevents faculty, section, and room conflicts",
  "Improves room and faculty utilization",
  "Scales across departments and multiple sections",
  "Reduces administrative workload significantly",
];

export default function ImpactSection() {
  return (
    <section id="impact" className="py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10 dark:border-white/10 dark:bg-white/5">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
              Impact
            </p>
            <h2 className="text-3xl font-bold md:text-5xl">
              Measurable Value for Smart Campuses
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
              CampusFlow helps institutions move from manual, error-prone
              planning to faster, smarter, and scalable timetable generation.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-white/10 dark:bg-slate-900/70"
              >
                <p className="text-4xl font-black text-blue-600 md:text-5xl dark:text-blue-300">
                  {item.value}
                </p>
                <p className="mt-3 text-slate-500 dark:text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}