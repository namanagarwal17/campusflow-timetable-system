import { useEffect, useState } from "react";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/common/ConfirmModal";
import { useToast } from "../../context/ToastContext";
import { createRoom, deleteRoom, getRooms } from "../../services/api";

export default function RoomsPage() {
  const { showToast } = useToast();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    type: "Classroom",
  });

  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getRooms();

      if (Array.isArray(data)) {
        const normalized = data.map((item) => ({
          id: item.id,
          name: item.name || item.room_name || "Unnamed Room",
          capacity: item.capacity ?? 0,
          type: item.type
            ? item.type.charAt(0).toUpperCase() + item.type.slice(1)
            : "Classroom",
        }));
        setRooms(normalized);
      } else {
        setRooms([]);
      }
    } catch (error) {
      console.error("Rooms fetch error:", error);

      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to load rooms from backend.";

      setErrorMessage(message);
      setRooms([]);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleAdd(e) {
    e.preventDefault();

    if (!formData.name || !formData.capacity) {
      showToast("Please fill all fields", "error");
      return;
    }

    const payload = {
      name: formData.name,
      capacity: Number(formData.capacity),
      type: formData.type.toLowerCase(),
    };

    try {
      setErrorMessage("");

      const created = await createRoom(payload);

      setRooms((prev) => [
        ...prev,
        {
          id: created.id,
          name: created.name || created.room_name || formData.name,
          capacity: created.capacity ?? Number(formData.capacity),
          type: created.type
            ? created.type.charAt(0).toUpperCase() + created.type.slice(1)
            : formData.type,
        },
      ]);

      setFormData({ name: "", capacity: "", type: "Classroom" });
      showToast("Room added successfully");
    } catch (error) {
      console.error("Create room error:", error);

      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to add room.";

      setErrorMessage(message);
      showToast(message, "error");
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;

    try {
      setErrorMessage("");

      await deleteRoom(deleteId);
      setRooms((prev) => prev.filter((item) => item.id !== deleteId));
      showToast("Room deleted successfully");
    } catch (error) {
      console.error("Delete room error:", error);

      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to delete room.";

      setErrorMessage(message);
      showToast(message, "error");
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <div className="space-y-8">
      <ConfirmModal
        open={!!deleteId}
        title="Delete Room?"
        message="This room will be removed from the list."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />

      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
          Rooms
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">Rooms Management</h2>

        {errorMessage && (
          <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
            {errorMessage}
          </div>
        )}
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="text-xl font-bold">Add Room / Lab</h3>

          <form onSubmit={handleAdd} className="mt-6 space-y-4">
            <InputField
              label="Room Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Room name"
            />

            <InputField
              label="Capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Room capacity"
            />

            <SelectField
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={[
                { label: "Classroom", value: "Classroom" },
                { label: "Lab", value: "Lab" },
              ]}
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
            >
              Add Room
            </button>
          </form>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="mb-5 text-xl font-bold">Room List</h3>

          {loading ? (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-white/10 dark:bg-white/5">
              <p className="text-slate-500 dark:text-slate-400">
                Loading rooms...
              </p>
            </div>
          ) : rooms.length === 0 ? (
            <EmptyState
              title="No rooms found"
              text="Add classrooms and labs to continue timetable planning."
            />
          ) : (
            <div className="grid gap-4">
              {rooms.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:border-cyan-500/20 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-cyan-400/20 dark:hover:bg-slate-900"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.capacity} capacity • {item.type}
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