export default function ConfirmModal({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/50 px-4">
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-950">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-3 text-slate-500 dark:text-slate-400">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="rounded-2xl bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-400"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}