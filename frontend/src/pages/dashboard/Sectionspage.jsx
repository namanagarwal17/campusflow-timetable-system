import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import {
  createSection,
  deleteSection,
  getSections,
} from "../../services/api";

export default function SectionsPage() {
  const { showToast } = useToast();

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    semester: "",
    student_count: "",
  });

  useEffect(() => {
    fetchSections();
  }, []);

  async function fetchSections() {
    try {
      setLoading(true);
      setStatusMessage("");

      const data = await getSections();
      setSections(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Sections fetch error:", error);

      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to load sections from backend.";

      setStatusMessage(message);
      setSections([]);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.semester || !formData.student_count) {
      showToast("Please fill all fields", "error");
      return;
    }

    try {
      setSubmitting(true);
      setStatusMessage("");

      await createSection({
        name: formData.name,
        semester: Number(formData.semester),
        student_count: Number(formData.student_count),
      });

      showToast("Section created successfully");

      setFormData({
        name: "",
        semester: "",
        student_count: "",
      });

      await fetchSections();
    } catch (error) {
      console.error("Create section error:", error);

      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to create section.";

      setStatusMessage(message);
      showToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteSection(id);
      showToast("Section deleted successfully");
      await fetchSections();
    } catch (error) {
      console.error("Delete section error:", error);

      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to delete section.";

      setStatusMessage(message);
      showToast(message, "error");
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
          Sections
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">Sections Management</h2>
        <p className="mt-3 max-w-3xl text-slate-500 dark:text-slate-400">
          Create and manage academic sections with semester and student count.
        </p>
      </div>

      {statusMessage && (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
          {statusMessage}
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[1fr,1.1fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="text-2xl font-bold">Create Section</h3>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                Section Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter section name"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-slate-900/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                Semester
              </label>
              <input
                type="number"
                name="semester"
                min="1"
                value={formData.semester}
                onChange={handleChange}
                placeholder="Enter semester"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-slate-900/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                Student Count
              </label>
              <input
                type="number"
                name="student_count"
                min="1"
                value={formData.student_count}
                onChange={handleChange}
                placeholder="Enter number of students"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-slate-900/60"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
            >
              {submitting ? "Creating..." : "Create Section"}
            </button>
          </form>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Sections List</h3>
            <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
              {sections.length} Records
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-400">
                Loading sections...
              </div>
            ) : sections.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-400">
                No sections found.
              </div>
            ) : (
              sections.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        {item.name}
                      </h4>

                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Semester: {item.semester}
                      </p>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Student Count: {item.student_count}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:border-red-400/20 dark:hover:bg-red-400/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}