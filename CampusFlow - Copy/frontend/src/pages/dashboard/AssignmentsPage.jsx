import { useEffect, useState } from "react";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/common/ConfirmModal";
import { useToast } from "../../context/ToastContext";

const fallbackAssignments = [
  {
    id: 1,
    section: "CSE-A",
    subject: "Mathematics",
    faculty: "Dr. Sharma",
    hours: 4,
    type: "Theory",
  },
  {
    id: 2,
    section: "CSE-A",
    subject: "Programming Lab",
    faculty: "Prof. Verma",
    hours: 3,
    type: "Lab",
  },
];

const fallbackSections = [
  { id: 1, name: "CSE-A" },
  { id: 2, name: "CSE-B" },
];

const fallbackSubjects = [
  { id: 1, name: "Mathematics", type: "Theory" },
  { id: 2, name: "Physics", type: "Theory" },
  { id: 3, name: "Programming Lab", type: "Lab" },
];

const fallbackFaculty = [
  { id: 1, name: "Dr. Sharma" },
  { id: 2, name: "Prof. Verma" },
  { id: 3, name: "Dr. Mehta" },
];

export default function AssignmentsPage() {
  const { showToast } = useToast();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const [sections] = useState(fallbackSections);
  const [subjects] = useState(fallbackSubjects);
  const [facultyList] = useState(fallbackFaculty);

  const [formData, setFormData] = useState({
    section: "CSE-A",
    subject: "Mathematics",
    faculty: "Dr. Sharma",
    hours: "",
    type: "Theory",
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  function fetchAssignments() {
    setLoading(true);

    setTimeout(() => {
      setAssignments(fallbackAssignments);
      setUsingFallback(true);
      setLoading(false);
    }, 400);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "subject") {
      const selectedSubject = subjects.find((item) => item.name === value);
      setFormData((prev) => ({
        ...prev,
        subject: value,
        type: selectedSubject?.type || "Theory",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAddAssignment(e) {
    e.preventDefault();

    if (
      !formData.section ||
      !formData.subject ||
      !formData.faculty ||
      !formData.hours
    ) {
      showToast("Please fill all fields", "error");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      section: formData.section,
      subject: formData.subject,
      faculty: formData.faculty,
      hours: Number(formData.hours),
      type: formData.type,
    };

    setAssignments((prev) => [...prev, newAssignment]);

    setFormData({
      section: "CSE-A",
      subject: "Mathematics",
      faculty: "Dr. Sharma",
      hours: "",
      type: "Theory",
    });

    showToast("Assignment added successfully");
  }

  function confirmDelete() {
    if (!deleteId) return;

    setAssignments((prev) => prev.filter((item) => item.id !== deleteId));
    setDeleteId(null);
    showToast("Assignment deleted");
  }

  return (
    <div className="space-y-8">
      <ConfirmModal
        open={!!deleteId}
        title="Delete Assignment?"
        message="This subject-faculty-section mapping will be removed."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />

      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
          Assignments
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">
          Subject-Faculty Assignments
        </h2>
        <p className="mt-3 max-w-3xl text-slate-500 dark:text-slate-400">
          Map sections, subjects, and faculty with weekly hours so the scheduler
          can generate a conflict-free timetable.
        </p>

        {usingFallback && (
          <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
            Demo mode active. Backend mapping API is not connected yet.
          </div>
        )}
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="text-xl font-bold">Create Assignment</h3>

          <form onSubmit={handleAddAssignment} className="mt-6 space-y-4">
            <SelectField
              label="Section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              options={sections.map((item) => ({
                label: item.name,
                value: item.name,
              }))}
            />

            <SelectField
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              options={subjects.map((item) => ({
                label: `${item.name} (${item.type})`,
                value: item.name,
              }))}
            />

            <SelectField
              label="Faculty"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              options={facultyList.map((item) => ({
                label: item.name,
                value: item.name,
              }))}
            />

            <InputField
              label="Weekly Hours"
              name="hours"
              type="number"
              value={formData.hours}
              onChange={handleChange}
              placeholder="Enter weekly hours"
            />

            <div>
              <label className="mb-2 block text-sm text-slate-600 dark:text-slate-300">
                Type
              </label>
              <div className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300">
                {formData.type}
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-500 px-4 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/30 dark:bg-blue-400 dark:text-slate-950 dark:hover:bg-blue-300"
            >
              Add Assignment
            </button>
          </form>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-bold">Assignments List</h3>
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
              {assignments.length} Records
            </span>
          </div>

          {loading ? (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-white/10 dark:bg-white/5">
              <p className="text-slate-500 dark:text-slate-400">
                Loading assignments...
              </p>
            </div>
          ) : assignments.length === 0 ? (
            <EmptyState
              title="No assignments added yet"
              text="Create subject-faculty mappings before generating the timetable."
            />
          ) : (
            <div className="grid gap-4">
              {assignments.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:border-blue-500/20 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-400/20 dark:hover:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">
                        {item.section} → {item.subject}
                      </p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Faculty: {item.faculty}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Weekly Hours: {item.hours} • Type: {item.type}
                      </p>
                    </div>

                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="rounded-xl border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold text-red-500 transition-all duration-200 hover:scale-[1.03] hover:bg-red-100 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300 dark:hover:bg-red-400/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}