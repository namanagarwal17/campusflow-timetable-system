export default function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-600 dark:text-slate-300">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-blue-500/30 focus:border-blue-500 dark:border-white/10 dark:bg-slate-900/60 dark:text-white dark:hover:border-blue-400/20 dark:focus:border-blue-400"
      />
    </div>
  );
}