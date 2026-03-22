export default function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-600 dark:text-slate-300">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all duration-200 hover:border-cyan-500/30 focus:border-cyan-500 dark:border-white/10 dark:bg-slate-900/60 dark:text-white dark:hover:border-cyan-400/20 dark:focus:border-cyan-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}