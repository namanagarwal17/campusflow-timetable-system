import { useEffect, useState } from "react";
import InputField from "../../components/common/InputField";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/common/ConfirmModal";
import { useToast } from "../../context/ToastContext";
import { createFaculty, deleteFaculty, getFaculty } from "../../services/api";

const fallbackFaculty = [
  {
    id: 1,
    name: "Dr. Sharma",
    department: "CSE",
    email: "sharma@college.edu",
  },
  {
    id: 2,
    name: "Prof. Verma",
    department: "CSE",
    email: "verma@college.edu",
  },
];

export default function FacultyPage() {
  const { showToast } = useToast();

  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    email: "",
  });

  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchFaculty();
  }, []);

  async function fetchFaculty() {
    try {
      setLoading(true);
      const data = await getFaculty();

      if (Array.isArray(data)) {
        setFacultyList(data);
      } else {
        setFacultyList([]);
      }

      setUsingFallback(false);
    } catch (error) {
      setFacultyList(fallbackFaculty);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleAddFaculty(e) {
    e.preventDefault();

    if (!formData.name || !formData.department || !formData.email) {
      showToast("Please fill all fields", "error");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        department: formData.department,
        email: formData.email,
      };

      const created = await createFaculty(payload);

      if (usingFallback) {
        setFacultyList((prev) => [
          ...prev,
          {
            id: Date.now(),
            ...payload,
          },
        ]);
      } else {
        setFacultyList((prev) => [...prev, created]);
      }

      setFormData({
        name: "",
        department: "",
        email: "",
      });

      showToast("Faculty added successfully");
    } catch (error) {
      const localItem = {
        id: Date.now(),
        name: formData.name,
        department: formData.department,
        email: formData.email,
      };

      setFacultyList((prev) => [...prev, localItem]);
      setUsingFallback(true);
      setFormData({
        name: "",
        department: "",
        email: "",
      });

      showToast("Backend unavailable. Added locally.");
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;

    try {
      await deleteFaculty(deleteId);
      setFacultyList((prev) => prev.filter((item) => item.id !== deleteId));
      showToast("Faculty deleted");
    } catch (error) {
      setFacultyList((prev) => prev.filter((item) => item.id !== deleteId));
      showToast("Deleted locally");
      setUsingFallback(true);
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <div className="space-y-8">
      <ConfirmModal
        open={!!deleteId}
        title="Delete Faculty?"
        message="This faculty record will be removed from the list."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />

      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
          Faculty
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">Faculty Management</h2>
        <p className="mt-3 max-w-3xl text-slate-500 dark:text-slate-400">
          Add faculty records for timetable allocation and scheduling.
        </p>

        {usingFallback && (
          <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
            Backend is not connected right now. Showing local demo data.
          </div>
        )}
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="text-xl font-bold">Add Faculty</h3>

          <form onSubmit={handleAddFaculty} className="mt-6 space-y-4">
            <InputField
              label="Faculty Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter faculty name"
            />

            <InputField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter department"
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-500 px-4 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/30 dark:bg-blue-400 dark:text-slate-950 dark:hover:bg-blue-300"
            >
              Add Faculty
            </button>
          </form>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-bold">Faculty List</h3>
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
              {facultyList.length} Records
            </span>
          </div>

          {loading ? (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-white/10 dark:bg-white/5">
              <p className="text-slate-500 dark:text-slate-400">
                Loading faculty data...
              </p>
            </div>
          ) : facultyList.length === 0 ? (
            <EmptyState
              title="No faculty added yet"
              text="Add faculty from the form to manage scheduling assignments."
            />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
              <div className="grid grid-cols-4 gap-4 border-b border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300">
                <p>Name</p>
                <p>Department</p>
                <p>Email</p>
                <p>Action</p>
              </div>

              {facultyList.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 gap-4 border-b border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 transition-all duration-200 last:border-b-0 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/[0.08]"
                >
                  <p>{item.name}</p>
                  <p>{item.department}</p>
                  <p className="truncate">{item.email}</p>

                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="w-fit rounded-xl border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold text-red-500 transition-all duration-200 hover:scale-[1.03] hover:bg-red-100 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300 dark:hover:bg-red-400/20"
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