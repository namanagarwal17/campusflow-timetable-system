export default function DashboardCard({ title, value, subtitle }) {
  return (
    <div className="cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-cyan-400/30">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <h3 className="mt-3 text-4xl font-black tracking-tight text-cyan-600 dark:text-cyan-300">
        {value}
      </h3>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}