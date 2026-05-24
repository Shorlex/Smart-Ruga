"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, X, Check, Loader2, Scan, Upload } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getSlug() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_token") ?? "";
}

function formatDate(str) {
  if (!str) return "—";
  return (
    new Date(str).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    " · " +
    new Date(str).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status, isOverdue }) {
  const s = (status ?? "").toLowerCase();
  if (isOverdue && s === "pending") {
    return (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-50 text-red-500">
        🔴 Overdue
      </span>
    );
  }
  const map = {
    pending: { cls: "bg-amber-50  text-amber-500", icon: "⏳" },
    in_progress: { cls: "bg-blue-50   text-blue-500", icon: "🔄" },
    in_review: { cls: "bg-purple-50 text-purple-500", icon: "🔍" },
    completed: { cls: "bg-[#f0fdf4] text-[#4CAF50]", icon: "✅" },
    cancelled: { cls: "bg-gray-100  text-gray-400", icon: "❌" },
  };
  const { cls, icon } = map[s] ?? {
    cls: "bg-gray-100 text-gray-500",
    icon: "•",
  };
  return (
    <span
      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize whitespace-nowrap ${cls}`}
    >
      {icon} {status?.replace(/_/g, " ") ?? "—"}
    </span>
  );
}

// ── Mark As Done Modal ────────────────────────────────────────────────────────

function MarkAsDoneModal({ task, onClose, onSuccess }) {
  const [proofMode, setProofMode] = useState("Scan Tag");
  const [form, setForm] = useState({
    timeCompleted: "",
    feedUsed: "",
    notes: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("proofType", "image");
      if (form.notes) formData.append("notes", form.notes);

      const res = await fetch(
        `${API}/ranches/${getSlug()}/tasks/${task.publicId}/submissions`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${getToken()}` },
          body: formData,
        },
      );

      if (!res.ok) {
        const err = await res.json();
        console.error(
          "❌ Task submission error:",
          JSON.stringify(err, null, 2),
        );
        throw new Error(err.message ?? "Failed to submit task");
      }

      onSuccess(task.publicId);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40">
      <div className="bg-white rounded-t-3xl p-5 space-y-4 max-h-[90%] overflow-y-auto">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-gray-800">Complete Task</p>
          <button onClick={onClose} className="text-gray-400">
            <X size={18} />
          </button>
        </div>
        <p className="text-xs text-gray-400 -mt-2">{task.title}</p>

        {error && (
          <div className="px-4 py-2.5 rounded-xl bg-red-50 text-xs text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Time Completed */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1.5">
              Time Completed
            </p>
            <input
              type="datetime-local"
              value={form.timeCompleted}
              onChange={set("timeCompleted")}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50]"
            />
          </div>

          {/* Feed Used (optional) */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1.5">
              Feed Used (optional)
            </p>
            <input
              value={form.feedUsed}
              onChange={set("feedUsed")}
              placeholder="e.g. 120 Kg Maize"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50]"
            />
          </div>

          {/* Proof mode toggle */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">
              Completion Proof
            </p>
            <div className="flex rounded-full border border-gray-200 overflow-hidden w-fit mb-3">
              {["Scan Tag", "Take Photo"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setProofMode(opt)}
                  className={`px-4 py-1.5 text-xs font-semibold transition-all ${
                    proofMode === opt
                      ? "bg-[#4CAF50] text-white"
                      : "text-gray-500"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {proofMode === "Scan Tag" ? (
              <button
                type="button"
                className="w-full border-2 border-dashed border-gray-300 rounded-xl py-5 flex flex-col items-center gap-1 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] bg-gray-50"
              >
                <Scan size={22} />
                <span className="text-xs font-medium">Scan Livestock Tag</span>
              </button>
            ) : (
              <label className="w-full border-2 border-dashed border-gray-300 rounded-xl py-5 flex flex-col items-center gap-1 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] bg-gray-50 cursor-pointer">
                <Upload size={22} />
                <span className="text-xs font-medium">
                  {image ? image.name : "Upload proof photo"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                />
              </label>
            )}
          </div>

          {/* Notes */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1.5">
              Notes (Optional)
            </p>
            <textarea
              value={form.notes}
              onChange={set("notes")}
              rows={2}
              placeholder="Additional notes..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3.5 rounded-2xl bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              {loading && <Loader2 size={12} className="animate-spin" />}
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Task Card ─────────────────────────────────────────────────────────────────

function TaskCard({ task, onMarkDone }) {
  const isDone = ["completed", "done"].includes(
    (task.status ?? "").toLowerCase(),
  );
  const isCancelled = task.status?.toLowerCase() === "cancelled";
  const isInReview = task.status?.toLowerCase() === "in_review";

  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm p-4 space-y-3 ${
        isDone ? "border-gray-100 opacity-75" : "border-gray-100"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 leading-snug">
            {task.title ?? "—"}
          </p>
          {task.description && task.title !== task.description && (
            <p className="text-[11px] text-gray-400 mt-0.5 truncate">
              {task.description}
            </p>
          )}
        </div>
        <StatusBadge status={task.status} isOverdue={task.isOverdue} />
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-gray-400">Assigned By</p>
          <p className="font-semibold text-gray-700">
            {task.assignedBy?.name ?? task.assignedBy?.email ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Deadline</p>
          <p
            className={`font-semibold ${task.isOverdue ? "text-red-500" : "text-gray-700"}`}
          >
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "—"}
            {task.isOverdue && ` (${task.daysOverdue}d late)`}
          </p>
        </div>
      </div>

      {/* Proof image if completed */}
      {isDone && task.imageUrl && (
        <div>
          <p className="text-[10px] text-gray-400 mb-1">Proof of Work</p>
          <img
            src={task.imageUrl}
            alt="Proof"
            className="h-20 w-auto rounded-xl object-cover border border-gray-100"
          />
        </div>
      )}

      {/* Mark as done button */}
      {!isDone && !isCancelled && !isInReview && (
        <button
          onClick={() => onMarkDone(task)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors"
        >
          <Check size={13} /> Mark As Done
        </button>
      )}
      {isInReview && (
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-purple-500 bg-purple-50 py-2 rounded-full">
          🔍 Submitted · Pending Review
        </div>
      )}

      {/* Verified badge */}
      {isDone && (
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#4CAF50] bg-[#f0fdf4] py-2 rounded-full">
          ✅ Completed
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "in_review", label: "In Review" },
  { key: "completed", label: "Completed" },
  { key: "overdue", label: "Overdue" },
];

export default function WorkerTaskHistoryPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeTask, setActiveTask] = useState(null); // task being marked done

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/ranches/${getSlug()}/tasks`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error(`Failed to fetch tasks (${res.status})`);
      const json = await res.json();
      console.log("✅ Worker tasks:", json);
      const list =
        json?.data?.tasks ??
        json?.tasks ??
        (Array.isArray(json?.data) ? json.data : []);
      setTasks(list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Optimistically mark task as completed
  const handleMarkDone = (taskPublicId) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.publicId === taskPublicId ? { ...t, status: "in_review" } : t,
      ),
    );
  };

  // Filter tasks
  const filtered = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "overdue")
      return (
        t.isOverdue &&
        !["completed", "done", "in_review"].includes(
          (t.status ?? "").toLowerCase(),
        )
      );
    if (filter === "pending")
      return (t.status ?? "").toLowerCase() === "pending";
    if (filter === "in_review")
      return (t.status ?? "").toLowerCase() === "in_review";
    if (filter === "completed")
      return ["completed", "done"].includes((t.status ?? "").toLowerCase());
    return true;
  });

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => (t.status ?? "").toLowerCase() === "pending")
      .length,
    in_review: tasks.filter(
      (t) => (t.status ?? "").toLowerCase() === "in_review",
    ).length,
    completed: tasks.filter((t) =>
      ["completed", "done"].includes((t.status ?? "").toLowerCase()),
    ).length,
    overdue: tasks.filter(
      (t) =>
        t.isOverdue &&
        !["completed", "done", "in_review"].includes(
          (t.status ?? "").toLowerCase(),
        ),
    ).length,
  };

  return (
    <div className="relative flex flex-col min-h-full">
      <div className="px-4 pb-24 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-gray-800">My Tasks</p>
            {!loading && (
              <p className="text-xs text-gray-400 mt-0.5">
                {filtered.length} of {tasks.length} tasks
              </p>
            )}
          </div>
          <button
            onClick={fetchTasks}
            className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                filter === key
                  ? "bg-[#4CAF50] text-white"
                  : "bg-white border border-gray-200 text-gray-500"
              }`}
            >
              {label}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  filter === key
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse space-y-3"
              >
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                  <div className="h-5 bg-gray-100 rounded w-20" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-8 bg-gray-100 rounded" />
                  <div className="h-8 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <p className="text-sm text-red-500 mb-2">{error}</p>
            <button
              onClick={fetchTasks}
              className="text-xs text-[#4CAF50] hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <p className="text-sm text-gray-400">
              {filter === "all"
                ? "No tasks assigned yet."
                : `No ${filter} tasks.`}
            </p>
          </div>
        )}

        {/* Task cards */}
        {!loading &&
          !error &&
          filtered.map((task, i) => (
            <TaskCard
              key={task.publicId ?? i}
              task={task}
              onMarkDone={setActiveTask}
            />
          ))}
      </div>

      {/* Mark As Done Modal */}
      {activeTask && (
        <MarkAsDoneModal
          task={activeTask}
          onClose={() => setActiveTask(null)}
          onSuccess={(publicId) => {
            handleMarkDone(publicId);
            setActiveTask(null);
          }}
        />
      )}
    </div>
  );
}
