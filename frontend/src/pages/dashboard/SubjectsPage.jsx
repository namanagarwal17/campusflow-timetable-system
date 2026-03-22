import { useEffect, useState } from "react";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/common/ConfirmModal";
import { useToast } from "../../context/ToastContext";
import {
  createSubject,
  deleteSubject,
  getSubjects,
} from "../../services/api";

const fallbackSubjects = [
  { id: 1, name: "Mathematics", hours: 4, type: "Theory" },
  { id: 2, name: "Programming Lab", hours: 3, type: "Lab" },
];

export default function SubjectsPage() {
  const { showToast } = useToast();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    hours: "",
    type: "Theory",
  });

  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  async function fetchSubjects() {
    try {
      setLoading(true);
      const data = await getSubjects();

      if (Array.isArray(data)) {
        const normalized = data.map((item) => ({
          id: item.id,
          name: item.name || item.subject_name || "Unnamed Subject",
          hours:
            item.hours ??
            item.hours_per_week ??
            item.weekly_hours ??
            0,
          type:
            item.type ||
            (item.lab_required ? "Lab" : "Theory"),
        }));

        setSubjects(normalized);
      } else {
        setSubjects([]);
      }

      setUsingFallback(false);
    } catch (error) {
      setSubjects(fallbackSubjects);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleAdd(e) {
    e.preventDefault();

    if (!formData.name || !formData.hours) {
      showToast("Please fill all fields", "error");
      return;
    }

    const payload = {
      name: formData.name,
      hours_per_week: Number(formData.hours),
      type: formData.type,
      lab_required: formData.type === "Lab",
    };

    try {
      const created = await createSubject(payload);

      if (usingFallback) {
        setSubjects((prev) => [
          ...prev,
          {
            id: Date.now(),
            name: formData.name,
            hours: Number(formData.hours),
            type: formData.type,
          },
        ]);
      } else {
        setSubjects((prev) => [
          ...prev,
          {
            id: created.id,
            name: created.name || created.subject_name || formData.name,
            hours:
              created.hours ??
              created.hours_per_week ??
              created.weekly_hours ??
              Number(formData.hours),
            type:
              created.type || (created.lab_required ? "Lab" : formData.type),
          },
        ]);
      }

      setFormData({ name: "", hours: "", type: "Theory" });
      showToast("Subject added successfully");
    } catch (error) {
      setSubjects((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: formData.name,
          hours: Number(formData.hours),
          type: formData.type,
        },
      ]);
      setUsingFallback(true);
      setFormData({ name: "", hours: "", type: "Theory" });
      showToast("Backend unavailable. Added locally.");
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;

    try {
      await deleteSubject(deleteId);
      setSubjects((prev) => prev.filter((item) => item.id !== deleteId));
      showToast("Subject deleted");
    } catch (error) {
      setSubjects((prev) => prev.filter((item) => item.id !== deleteId));
      setUsingFallback(true);
      showToast("Deleted locally");
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <div className="space-y-8">
      <ConfirmModal
        open={!!deleteId}
        title="Delete Subject?"
        message="This subject will be removed from the list."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />

      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
          Subjects
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">Subjects Management</h2>

        {usingFallback && (
          <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
            Backend is not connected right now. Showing local demo data.
          </div>
        )}
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="text-xl font-bold">Add Subject</h3>

          <form onSubmit={handleAdd} className="mt-6 space-y-4">
            <InputField
              label="Subject Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Subject name"
            />

            <InputField
              label="Weekly Hours"
              name="hours"
              type="number"
              value={formData.hours}
              onChange={handleChange}
              placeholder="Weekly hours"
            />

            <SelectField
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={[
                { label: "Theory", value: "Theory" },
                { label: "Lab", value: "Lab" },
              ]}
            />

            <button
              className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
            >
              Add Subject
            </button>
          </form>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="mb-5 text-xl font-bold">Subjects List</h3>

          {loading ? (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-white/10 dark:bg-white/5">
              <p className="text-slate-500 dark:text-slate-400">
                Loading subjects...
              </p>
            </div>
          ) : subjects.length === 0 ? (
            <EmptyState
              title="No subjects found"
              text="Start by adding theory or lab subjects."
            />
          ) : (
            <div className="grid gap-4">
              {subjects.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:border-cyan-500/20 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-cyan-400/20 dark:hover:bg-slate-900"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.hours} hrs/week • {item.type}
                    </p>
                  </div>

                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="rounded-xl border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold text-red-500 transition-all duration-200 hover:scale-[1.03] hover:bg-red-100 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300 dark:hover:bg-red-400/20"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}