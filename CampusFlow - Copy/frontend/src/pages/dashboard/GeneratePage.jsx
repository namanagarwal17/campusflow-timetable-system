import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import { generateTimetable } from "../../services/api";

export default function GeneratePage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [lastStatus, setLastStatus] = useState("");

  async function handleGenerate() {
    try {
      setLoading(true);
      setLastStatus("");

      await generateTimetable();

      setLastStatus("Timetable generated successfully.");
      showToast("Timetable generated successfully");
    } catch (error) {
      setLastStatus("Backend unavailable. Demo generation simulated.");
      showToast("Backend unavailable. Demo generation simulated.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
          Generate
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">Generate Timetable</h2>
        <p className="mt-3 max-w-3xl text-slate-500 dark:text-slate-400">
          Trigger the scheduling engine to create a conflict-free timetable.
        </p>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-200 hover:border-blue-500/20 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-400/20 dark:hover:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Faculty Data
            </p>
            <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-300">
              Ready
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-200 hover:border-blue-500/20 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-400/20 dark:hover:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Rooms & Labs
            </p>
            <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-300">
              Ready
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-200 hover:border-blue-500/20 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-400/20 dark:hover:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Subject Mapping
            </p>
            <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-300">
              Ready
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-900/60">
          <h3 className="text-lg font-bold">Generation Notes</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li>• Faculty clashes will be avoided</li>
            <li>• Room conflicts will be checked</li>
            <li>• Lab subjects should be placed in lab rooms</li>
            <li>• Section overlap will be prevented</li>
          </ul>
        </div>

        {lastStatus && (
          <div className="mt-6 rounded-2xl border border-blue-300 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
            {lastStatus}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-8 rounded-2xl bg-blue-500 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-blue-400 dark:text-slate-950 dark:hover:bg-blue-300"
        >
          {loading ? "Generating..." : "Generate Timetable"}
        </button>
      </div>
    </div>
  );
}