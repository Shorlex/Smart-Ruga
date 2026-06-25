"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Upload, X, Loader2, CheckCircle } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getSlug() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_token") ?? "";
}
function getRole() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_role") ?? "";
}
function getUserId() {
  if (typeof window === "undefined") return "";
  try {
    return JSON.parse(localStorage.getItem("sr_user") ?? "{}").id ?? "";
  } catch {
    return "";
  }
}

function formatDate(str) {
  if (!str) return "—";
  return new Date(str).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ── Badges ────────────────────────────────────────────────────────────────────

const TASK_STATUS_STYLES = {
  pending: "bg-amber-50  text-amber-500",
  in_review: "bg-purple-50 text-purple-500",
  completed: "bg-[#f0fdf4] text-[#4CAF50]",
  cancelled: "bg-gray-100  text-gray-400",
};

const CONCERN_STATUS_STYLES = {
  open: "bg-amber-50  text-amber-500",
  in_review: "bg-blue-50   text-blue-500",
  resolved: "bg-[#f0fdf4] text-[#4CAF50]",
  dismissed: "bg-gray-100  text-gray-400",
};

const PRIORITY_STYLES = {
  low: "bg-gray-100  text-gray-500",
  medium: "bg-amber-50  text-amber-500",
  high: "bg-orange-50 text-orange-500",
  urgent: "bg-red-50    text-red-500",
};

// ── Task Submission Modal (existing flow) ─────────────────────────────────────

function TaskSubmitModal({ task, onClose, onSuccess }) {
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("proofType", "image");
      if (notes) formData.append("notes", notes);
      if (image) formData.append("image", image);

      const res = await fetch(
        `${API}/ranches/${getSlug()}/tasks/${task.publicId}/submissions`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${getToken()}` },
          body: formData,
        },
      );
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.message ?? "Failed");
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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-gray-800">Submit Task</p>
          <button onClick={onClose} className="text-gray-400">
            <X size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-500 truncate">{task.title}</p>
        {error && (
          <div className="px-3 py-2 rounded-xl bg-red-50 text-xs text-red-500">
            {error}
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Describe what you did..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
          />
        </div>

        {/* Optional image */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Photo Evidence{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <label className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 flex flex-col items-center gap-1.5 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] cursor-pointer bg-gray-50 transition-colors">
            <Upload size={18} />
            <span className="text-xs font-medium">
              {image ? image.name : "Tap to upload photo"}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            />
          </label>
          {image && (
            <div className="mt-2 flex items-center gap-2">
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-16 h-16 object-cover rounded-xl border border-gray-200"
              />
              <button
                onClick={() => setImage(null)}
                className="text-xs text-red-400 hover:underline"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-60"
          >
            {loading && <Loader2 size={12} className="animate-spin" />}
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Task Card ─────────────────────────────────────────────────────────────────

function TaskCard({ task, onSubmit }) {
  const isActionable = task.status === "pending";
  const isInReview = task.status === "in_review";

  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm ${
        task.isOverdue && isActionable
          ? "border-l-4 border-l-red-400 border-gray-100"
          : "border-gray-100"
      }`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                Task
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${TASK_STATUS_STYLES[task.status ?? "pending"] ?? "bg-gray-100 text-gray-500"}`}
              >
                {(task.status ?? "pending").replace(/_/g, " ")}
              </span>
            </div>
            <p className="text-sm font-bold text-gray-800 leading-snug">
              {task.title}
            </p>
            {task.description && (
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                {task.description}
              </p>
            )}
            {task.assignedBy && (
              <p className="text-[10px] text-gray-400 mt-1">
                Assigned by:{" "}
                {task.assignedBy.name ?? task.assignedBy.email ?? "—"}
              </p>
            )}
            {task.dueDate && (
              <p
                className={`text-[10px] font-semibold mt-0.5 ${task.isOverdue ? "text-red-500" : "text-gray-400"}`}
              >
                {task.isOverdue
                  ? `⚠ Overdue by ${task.daysOverdue} day${task.daysOverdue !== 1 ? "s" : ""}`
                  : `Due: ${formatDate(task.dueDate)}`}
              </p>
            )}
          </div>
        </div>

        {isActionable && (
          <button
            onClick={() => onSubmit(task)}
            className="mt-3 w-full py-2.5 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors"
          >
            ✓ Mark As Done
          </button>
        )}
        {isInReview && (
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-purple-500 bg-purple-50 py-2 rounded-xl">
            🔍 Submitted · Pending Review
          </div>
        )}
      </div>
    </div>
  );
}

// ── Concern Card ──────────────────────────────────────────────────────────────

function ConcernCard({ concern }) {
  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm ${
        concern.priority === "urgent"
          ? "border-l-4 border-l-red-400 border-gray-100"
          : "border-gray-100"
      }`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                Concern
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${CONCERN_STATUS_STYLES[concern.status ?? "open"] ?? "bg-gray-100 text-gray-500"}`}
              >
                {(concern.status ?? "open").replace(/_/g, " ")}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${PRIORITY_STYLES[concern.priority ?? "low"] ?? "bg-gray-100 text-gray-500"}`}
              >
                {concern.priority ?? "low"}
              </span>
            </div>
            <p className="text-sm font-bold text-gray-800 leading-snug">
              {concern.title}
            </p>
            {concern.description && (
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                {concern.description}
              </p>
            )}
            <div className="flex items-center gap-3 mt-1">
              <p className="text-[10px] text-gray-400 capitalize">
                {concern.category}
              </p>
              <p className="text-[10px] text-gray-400">
                Raised by: {concern.raisedBy?.name ?? "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Read-only awareness note */}
        <div className="mt-3 px-3 py-2 bg-gray-50 rounded-xl">
          <p className="text-[10px] text-gray-400 text-center">
            👀 You're assigned to this concern. If action is needed, your
            manager will create a task for you.
          </p>
        </div>

        {concern.resolutionNotes && (
          <div className="mt-3 bg-[#f0fdf4] border border-[#d1fae5] rounded-xl px-3 py-2.5">
            <p className="text-[10px] font-semibold text-[#4CAF50] mb-0.5">
              Manager Notes
            </p>
            <p className="text-xs text-gray-600">{concern.resolutionNotes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const FILTERS = [
  { key: "all", label: "All" },
  { key: "tasks", label: "Tasks" },
  { key: "concerns", label: "Concerns" },
  { key: "done", label: "Completed" },
];

export default function MyWorkPage() {
  const [tasks, setTasks] = useState([]);
  const [concerns, setConcerns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [taskModal, setTaskModal] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [tasksRes, concernsRes] = await Promise.all([
        fetch(`${API}/ranches/${getSlug()}/tasks`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
        fetch(`${API}/ranches/${getSlug()}/concerns`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
      ]);

      if (tasksRes.ok) {
        const j = await tasksRes.json();
        // Filter to only tasks assigned to current user
        const allTasks = j?.data?.tasks ?? j?.tasks ?? [];
        const userId = getUserId();
        setTasks(
          userId
            ? allTasks.filter(
                (t) =>
                  t.assignedTo?.publicId === userId ||
                  t.assignedTo?.id === userId,
              )
            : allTasks,
        );
      }

      if (concernsRes.ok) {
        const j = await concernsRes.json();
        // Filter to only concerns assigned to current user
        const allConcerns =
          j?.data?.data?.concerns ?? j?.data?.concerns ?? j?.concerns ?? [];
        const userId = getUserId();
        setConcerns(
          userId
            ? allConcerns.filter(
                (c) =>
                  c.assignedTo?.publicId === userId ||
                  c.assignedTo?.id === userId,
              )
            : [],
        );
      }
    } catch (err) {
      console.error("MyWork fetch:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Update task status optimistically
  const handleTaskSubmit = (publicId) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.publicId === publicId ? { ...t, status: "in_review" } : t,
      ),
    );
  };

  // Build combined + filtered list
  const pendingTasks = tasks.filter(
    (t) => !["completed", "done", "cancelled"].includes(t.status ?? ""),
  );
  const pendingConcerns = concerns.filter(
    (c) => !["resolved", "dismissed"].includes(c.status ?? ""),
  );
  const doneTasks = tasks.filter((t) =>
    ["completed", "done"].includes(t.status ?? ""),
  );
  const doneConcerns = concerns.filter((c) =>
    ["resolved"].includes(c.status ?? ""),
  );

  const displayed = (() => {
    if (filter === "tasks")
      return pendingTasks.map((t) => ({ ...t, _type: "task" }));
    if (filter === "concerns")
      return pendingConcerns.map((c) => ({ ...c, _type: "concern" }));
    if (filter === "done")
      return [
        ...doneTasks.map((t) => ({ ...t, _type: "task" })),
        ...doneConcerns.map((c) => ({ ...c, _type: "concern" })),
      ];
    // All — active items
    return [
      ...pendingTasks.map((t) => ({ ...t, _type: "task" })),
      ...pendingConcerns.map((c) => ({ ...c, _type: "concern" })),
    ];
  })();

  const counts = {
    all: pendingTasks.length + pendingConcerns.length,
    tasks: pendingTasks.length,
    concerns: pendingConcerns.length,
    done: doneTasks.length + doneConcerns.length,
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-800">My Work</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {counts.all} active · {counts.done} completed
          </p>
        </div>
        <button
          onClick={fetchAll}
          className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all ${
              filter === key
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {label}
            {counts[key] > 0 && (
              <span
                className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  filter === key
                    ? "bg-gray-100 text-gray-600"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {counts[key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse space-y-2"
            >
              <div className="h-3 bg-gray-100 rounded w-2/3" />
              <div className="h-2.5 bg-gray-100 rounded w-1/2" />
              <div className="h-8 bg-gray-100 rounded-xl mt-3" />
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && displayed.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center space-y-2">
          <p className="text-2xl">🎉</p>
          <p className="text-sm font-semibold text-gray-600">
            {filter === "done"
              ? "No completed items yet"
              : "Nothing assigned to you"}
          </p>
          <p className="text-xs text-gray-400">
            {filter !== "done" &&
              "Tasks and concerns assigned to you will appear here"}
          </p>
        </div>
      )}

      {/* Items */}
      {!loading &&
        displayed.map((item, i) =>
          item._type === "task" ? (
            <TaskCard
              key={`task-${item.publicId ?? i}`}
              task={item}
              onSubmit={(t) => setTaskModal(t)}
            />
          ) : (
            <ConcernCard key={`concern-${item.publicId ?? i}`} concern={item} />
          ),
        )}

      {/* Task submit modal */}
      {taskModal && (
        <TaskSubmitModal
          task={taskModal}
          onClose={() => setTaskModal(null)}
          onSuccess={(id) => {
            handleTaskSubmit(id);
            setTaskModal(null);
          }}
        />
      )}
    </div>
  );
}
