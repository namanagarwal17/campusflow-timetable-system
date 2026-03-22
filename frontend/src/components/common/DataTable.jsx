export default function DataTable({ columns = [], rows = [], renderActions }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
      <div
        className="grid gap-4 border-b border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300"
        style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
      >
        {columns.map((column) => (
          <p key={column}>{column}</p>
        ))}
      </div>

      {rows.map((row, index) => (
        <div
          key={row.id || index}
          className="grid gap-4 border-b border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 transition-all duration-200 last:border-b-0 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/[0.08]"
          style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
        >
          {Object.values(row).map((value, idx) => (
            <p key={idx} className="truncate">
              {value}
            </p>
          ))}
          {renderActions && renderActions(row)}
        </div>
      ))}
    </div>
  );
}