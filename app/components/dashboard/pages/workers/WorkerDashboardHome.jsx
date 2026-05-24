"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Scan, Plus, Loader2 } from "lucide-react";

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
  return new Date(str).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ── Mark As Done Modal ────────────────────────────────────────────────────────

function MarkAsDoneModal({ task, onClose, onSuccess }) {
  const [proofMode, setProofMode] = useState("Scan Tag");
  const [form, setForm] = useState({
    timeCompleted: "",
    feedUsed: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("proofType", proofMode === "Scan Tag" ? "scan" : "image");
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
        <p className="text-xs text-gray-500 -mt-2 truncate">{task.title}</p>

        {error && (
          <div className="px-4 py-2.5 rounded-xl bg-red-50 text-xs text-red-500">
            {error}
          </div>
        )}

        <div>
          <p className="text-xs font-semibold text-gray-700 mb-1.5">
            Time Completed
          </p>
          <input
            type="datetime-local"
            value={form.timeCompleted}
            onChange={set("timeCompleted")}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#4CAF50]"
          />
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-700 mb-1.5">
            Feed Used (optional)
          </p>
          <input
            value={form.feedUsed}
            onChange={set("feedUsed")}
            placeholder="e.g. 120 Kg Maize"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50]"
          />
        </div>

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
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {proofMode === "Scan Tag" ? (
            <button className="w-full border-2 border-dashed border-gray-300 rounded-xl py-5 flex flex-col items-center gap-1 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] bg-gray-50">
              <Scan size={22} />
              <span className="text-xs font-medium">Scan Livestock Tag</span>
            </button>
          ) : (
            <button className="w-full border-2 border-dashed border-gray-300 rounded-xl py-5 flex flex-col items-center gap-1 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] bg-gray-50">
              <span className="text-2xl">📷</span>
              <span className="text-xs font-medium">Take or Upload Photo</span>
            </button>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-700 mb-1.5">
            Notes (Optional)
          </p>
          <textarea
            value={form.notes}
            onChange={set("notes")}
            rows={3}
            placeholder="Additional notes...."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3.5 rounded-2xl bg-[#4CAF50] hover:bg-[#43a047] text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 size={13} className="animate-spin" />}
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-2xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard Home ────────────────────────────────────────────────────────────

export default function WorkerDashboardHome({ greeting, onNavigate }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/ranches/${getSlug()}/tasks`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      const list =
        json?.data?.tasks ??
        json?.tasks ??
        (Array.isArray(json?.data) ? json.data : []);
      setTasks(list);
    } catch {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Mark task as in_review after submission (pending manager approval)
  const handleMarkDone = (publicId) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.publicId === publicId ? { ...t, status: "in_review" } : t,
      ),
    );
  };

  const completed = tasks.filter((t) =>
    ["completed", "done"].includes((t.status ?? "").toLowerCase()),
  ).length;
  const pending = tasks.filter(
    (t) => (t.status ?? "").toLowerCase() === "pending",
  ).length;
  const inReview = tasks.filter(
    (t) => (t.status ?? "").toLowerCase() === "in_review",
  ).length;
  const overdue = tasks.filter(
    (t) =>
      t.isOverdue &&
      !["completed", "done", "in_review"].includes(
        (t.status ?? "").toLowerCase(),
      ),
  ).length;

  const stats = [
    { label: "Completed", value: completed, icon: "✅" },
    { label: "Pending", value: pending, icon: "⏳" },
    { label: "In Review", value: inReview, icon: "🔍" },
    { label: "Overdue", value: overdue, icon: "🔴" },
  ];

  // Show only pending tasks on dashboard (in_review removed from pending list)
  const pendingTasks = tasks
    .filter((t) => (t.status ?? "").toLowerCase() === "pending")
    .slice(0, 5);

  return (
    <div className="relative flex flex-col min-h-full">
      <div className="px-4 pb-24 space-y-4">
        {/* Greeting */}
        <h1 className="text-lg font-bold text-gray-800 mt-1">{greeting}</h1>

        {/* Stat cards */}
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm animate-pulse"
              >
                <div className="h-3 bg-gray-100 rounded w-2/3 mb-3" />
                <div className="h-7 bg-gray-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {stats.map(({ label, value, icon }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
              >
                <p className="text-xs text-gray-400 mb-1">{label}</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-gray-800">{value}</p>
                  <span className="text-2xl opacity-20">{icon}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pending Tasks */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-800">Pending Tasks</p>
            <button
              onClick={() => onNavigate?.("history")}
              className="text-xs text-[#4CAF50] font-medium hover:underline"
            >
              See All
            </button>
          </div>

          {loading && (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse space-y-2"
                >
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                  <div className="h-2.5 bg-gray-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {!loading && pendingTasks.length === 0 && (
            <div className="bg-white rounded-2xl p-6 text-center text-gray-400 text-sm border border-gray-100">
              🎉 No pending tasks!
            </div>
          )}

          <div className="space-y-3">
            {!loading &&
              pendingTasks.map((task, i) => (
                <div
                  key={task.publicId ?? i}
                  className={`bg-white rounded-2xl p-4 border shadow-sm ${
                    task.isOverdue
                      ? "border-l-4 border-l-red-400 border-gray-100"
                      : "border-gray-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 leading-snug mb-1">
                        {task.title}
                      </p>
                      {task.assignedBy && (
                        <p className="text-[10px] text-gray-400">
                          By:{" "}
                          {[task.assignedBy.firstName, task.assignedBy.lastName]
                            .filter(Boolean)
                            .join(" ") ||
                            task.assignedBy.email ||
                            "—"}
                        </p>
                      )}
                      {task.isOverdue && (
                        <p className="text-[10px] text-red-400 font-semibold mt-0.5">
                          ⚠️ Overdue by {task.daysOverdue} day
                          {task.daysOverdue !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      {task.dueDate && (
                        <p className="text-[10px] text-gray-400 whitespace-nowrap">
                          {formatDate(task.dueDate)}
                        </p>
                      )}
                      <button
                        onClick={() => setSelectedTask(task)}
                        className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors whitespace-nowrap"
                      >
                        ✓ Mark As Done
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Report New Issue FAB */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => onNavigate?.("livestock")}
          className="flex items-center gap-2 bg-[#4CAF50] hover:bg-[#43a047] text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg transition-colors"
        >
          <Plus size={16} /> Report New Issue
        </button>
      </div>

      {/* Mark As Done Modal */}
      {selectedTask && (
        <MarkAsDoneModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSuccess={(publicId) => {
            handleMarkDone(publicId);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}
