import {
  BarChart4,
  CalendarRange,
  MonitorSmartphone,
  RefreshCcw,
  School,
  ShieldAlert,
} from "lucide-react";

const features = [
  {
    title: "Multi-Section Scheduling",
    text: "Generate timetables for multiple sections without overlap.",
    icon: CalendarRange,
  },
  {
    title: "Conflict Detection",
    text: "Detect faculty, room, and section clashes before publishing schedules.",
    icon: ShieldAlert,
  },
  {
    title: "Lab & Room Allocation",
    text: "Assign suitable rooms and labs based on type and availability.",
    icon: School,
  },
  {
    title: "Dynamic Regeneration",
    text: "Regenerate schedules instantly if constraints or resources change.",
    icon: RefreshCcw,
  },
  {
    title: "Resource Optimization",
    text: "Improve room usage and faculty assignment efficiency.",
    icon: BarChart4,
  },
  {
    title: "Real-Time Dashboard",
    text: "Provide administrators with a clear and organized scheduling interface.",
    icon: MonitorSmartphone,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
            Features
          </p>
          <h2 className="text-3xl font-bold md:text-5xl">
            Built for Real Academic Scheduling
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            CampusFlow is designed to make timetable generation fast, accurate,
            and scalable for universities handling complex scheduling requirements.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-green-400/30"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700 transition group-hover:bg-green-200 dark:bg-green-500/10 dark:text-green-300 dark:group-hover:bg-green-500/20">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-500 dark:text-slate-400">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}