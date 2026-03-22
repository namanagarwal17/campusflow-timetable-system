import { useEffect, useState } from "react";
import EmptyState from "../../components/common/EmptyState";
import { getTimetable } from "../../services/api";

const fallbackTimetable = [
  {
    section_name: "CSE-A",
    day: "Monday",
    slot: "9:00 - 10:00",
    subject_name: "Maths",
    faculty_name: "Dr. Sharma",
    room_name: "R-101",
  },
  {
    section_name: "CSE-A",
    day: "Tuesday",
    slot: "10:00 - 11:00",
    subject_name: "Physics",
    faculty_name: "Prof. Verma",
    room_name: "R-102",
  },
];

export default function TimetablePage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    fetchTimetable();
  }, []);

  async function fetchTimetable() {
    try {
      setLoading(true);
      const data = await getTimetable();

      if (Array.isArray(data)) {
        setRows(data);
      } else {
        setRows([]);
      }

      setUsingFallback(false);
    } catch (error) {
      setRows(fallbackTimetable);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
          Timetable
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">Timetable Viewer</h2>
        <p className="mt-3 max-w-3xl text-slate-500 dark:text-slate-400">
          View the generated timetable in a clean list format.
        </p>

        {usingFallback && (
          <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
            Backend is not connected right now. Showing demo timetable.
          </div>
        )}
      </div>

      {loading ? (
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-white/10 dark:bg-white/5">
          <p className="text-slate-500 dark:text-slate-400">
            Loading timetable...
          </p>
        </div>
      ) : rows.length === 0 ? (
        <EmptyState
          title="No timetable generated yet"
          text="Go to Generate page and run timetable generation first."
        />
      ) : (
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-bold">Generated Timetable Entries</h3>
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
              {rows.length} Entries
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10">
            <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 text-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
                <tr>
                  <th className="px-4 py-3">Section</th>
                  <th className="px-4 py-3">Day</th>
                  <th className="px-4 py-3">Slot</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Faculty</th>
                  <th className="px-4 py-3">Room</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="border-t border-slate-200 bg-white transition-all duration-200 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/[0.08]"
                  >
                    <td className="px-4 py-4">{item.section_name}</td>
                    <td className="px-4 py-4">{item.day}</td>
                    <td className="px-4 py-4">{item.slot}</td>
                    <td className="px-4 py-4">{item.subject_name}</td>
                    <td className="px-4 py-4">{item.faculty_name}</td>
                    <td className="px-4 py-4">{item.room_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}