import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import {
  getAssignments,
  createAssignment,
  deleteAssignment,
  getSections,
  getSubjects,
  getFaculty,
} from "../../services/api";

export default function AssignmentsPage() {
  const { showToast } = useToast();

  const [assignments, setAssignments] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [faculty, setFaculty] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    section_id: "",
    subject_id: "",
    faculty_id: "",
    weekly_hours: "",
    type: "Theory",
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  async function fetchAllData() {
    try {
      setLoading(true);
      setStatusMessage("");

      const results = await Promise.allSettled([
        getAssignments(),
        getSections(),
        getSubjects(),
        getFaculty(),
      ]);

      const [assignmentsRes, sectionsRes, subjectsRes, facultyRes] = results;

      if (assignmentsRes.status === "fulfilled") {
        setAssignments(
          Array.isArray(assignmentsRes.value) ? assignmentsRes.value : []
        );
      } else {
        console.error("Assignments API error:", assignmentsRes.reason);
        setAssignments([]);
      }

      if (sectionsRes.status === "fulfilled") {
        setSections(Array.isArray(sectionsRes.value) ? sectionsRes.value : []);
      } else {
        console.error("Sections API error:", sectionsRes.reason);
        setSections([]);
      }

      if (subjectsRes.status === "fulfilled") {
        setSubjects(Array.isArray(subjectsRes.value) ? subjectsRes.value : []);
      } else {
        console.error("Subjects API error:", subjectsRes.reason);
        setSubjects([]);
      }

      if (facultyRes.status === "fulfilled") {
        setFaculty(Array.isArray(facultyRes.value) ? facultyRes.value : []);
      } else {
        console.error("Faculty API error:", facultyRes.reason);
        setFaculty([]);
      }

      const failedApis = [];
      if (assignmentsRes.status === "rejected") failedApis.push("Assignments");
      if (sectionsRes.status === "rejected") failedApis.push("Sections");
      if (subjectsRes.status === "rejected") failedApis.push("Subjects");
      if (facultyRes.status === "rejected") failedApis.push("Faculty");

      if (failedApis.length > 0) {
        setStatusMessage(
          `${failedApis.join(", ")} API failed or missing in backend.`
        );
      }
    } catch (error) {
      console.error("Assignments fetch error:", error);

      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to load assignments data from backend.";

      setStatusMessage(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.section_id ||
      !formData.subject_id ||
      !formData.faculty_id ||
      !formData.weekly_hours ||
      !formData.type
    ) {
      showToast("Please fill all fields", "error");
      return;
    }

    try {
      setSubmitting(true);
      setStatusMessage("");

      await createAssignment({
        section_id: Number(formData.section_id),
        subject_id: Number(formData.subject_id),
        faculty_id: Number(formData.faculty_id),
        weekly_hours: Number(formData.weekly_hours),
        type: formData.type,
      });

      showToast("Assignment created successfully");

      setFormData({
        section_id: "",
        subject_id: "",
        faculty_id: "",
        weekly_hours: "",
        type: "Theory",
      });

      await fetchAllData();
    } catch (error) {
      console.error("Create assignment error:", error);

      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to create assignment.";

      setStatusMessage(message);
      showToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteAssignment(id);
      showToast("Assignment deleted successfully");
      await fetchAllData();
    } catch (error) {
      console.error("Delete assignment error:", error);

      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to delete assignment.";

      setStatusMessage(message);
      showToast(message, "error");
    }
  }

  function getSectionName(sectionId, item) {
    if (item?.section_name) return item.section_name;
    if (item?.section?.name) return item.section.name;

    const found = sections.find((s) => Number(s.id) === Number(sectionId));
    return found?.name || `Section ${sectionId}`;
  }

  function getSubjectName(subjectId, item) {
    if (item?.subject_name) return item.subject_name;
    if (item?.subject?.name) return item.subject.name;

    const found = subjects.find((s) => Number(s.id) === Number(subjectId));
    return found?.name || `Subject ${subjectId}`;
  }

  function getFacultyName(facultyId, item) {
    if (item?.faculty_name) return item.faculty_name;
    if (item?.faculty?.name) return item.faculty.name;

    const found = faculty.find((f) => Number(f.id) === Number(facultyId));
    return found?.name || `Faculty ${facultyId}`;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
          Assignments
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">
          Subject-Faculty Assignments
        </h2>
        <p className="mt-3 max-w-3xl text-slate-500 dark:text-slate-400">
          Map sections, subjects, and faculty with weekly hours so the scheduler
          can generate a conflict-free timetable.
        </p>
      </div>

      {statusMessage && (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
          {statusMessage}
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[1.1fr,1fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="text-2xl font-bold">Create Assignment</h3>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                Section
              </label>
              <select
                value={formData.section_id}
                onChange={(e) =>
                  setFormData({ ...formData, section_id: e.target.value })
                }
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-slate-900/60"
              >
                <option value="">Select Section</option>
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                Subject
              </label>
              <select
                value={formData.subject_id}
                onChange={(e) =>
                  setFormData({ ...formData, subject_id: e.target.value })
                }
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-slate-900/60"
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                    {subject.type ? ` (${subject.type})` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                Faculty
              </label>
              <select
                value={formData.faculty_id}
                onChange={(e) =>
                  setFormData({ ...formData, faculty_id: e.target.value })
                }
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-slate-900/60"
              >
                <option value="">Select Faculty</option>
                {faculty.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                Weekly Hours
              </label>
              <input
                type="number"
                min="1"
                value={formData.weekly_hours}
                onChange={(e) =>
                  setFormData({ ...formData, weekly_hours: e.target.value })
                }
                placeholder="Enter weekly hours"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-slate-900/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-slate-900/60"
              >
                <option value="Theory">Theory</option>
                <option value="Lab">Lab</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={
                submitting ||
                sections.length === 0 ||
                subjects.length === 0 ||
                faculty.length === 0
              }
              className="rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
            >
              {submitting ? "Creating..." : "Create Assignment"}
            </button>
          </form>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Assignments List</h3>
            <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
              {assignments.length} Records
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-400">
                Loading assignments...
              </div>
            ) : assignments.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-400">
                No assignments found.
              </div>
            ) : (
              assignments.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        {getSectionName(item.section_id, item)} →{" "}
                        {getSubjectName(item.subject_id, item)}
                      </h4>

                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Faculty: {getFacultyName(item.faculty_id, item)}
                      </p>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Weekly Hours: {item.weekly_hours} • Type: {item.type}
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