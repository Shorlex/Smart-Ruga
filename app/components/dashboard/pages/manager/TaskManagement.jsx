"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, RefreshCw, X, Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getSlug() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_token") ?? "";
}

function formatDeadline(str) {
  if (!str) return "—";
  const d = new Date(str);
  return (
    d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    " / " +
    d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const s = (status ?? "").toLowerCase();
  const styles = {
    done: "bg-[#f0fdf4] text-[#4CAF50]",
    completed: "bg-[#f0fdf4] text-[#4CAF50]",
    pending: "bg-amber-50  text-amber-500",
    in_progress: "bg-blue-50   text-blue-500",
    in_review: "bg-purple-50 text-purple-500",
    overdue: "bg-red-50    text-red-500",
    cancelled: "bg-gray-100  text-gray-400",
  };
  const dots = {
    done: "bg-[#4CAF50]",
    completed: "bg-[#4CAF50]",
    pending: "bg-amber-400",
    in_progress: "bg-blue-400",
    in_review: "bg-purple-400",
    overdue: "bg-red-500",
    cancelled: "bg-gray-400",
  };
  return (
    <span
      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit capitalize ${styles[s] ?? "bg-gray-100 text-gray-500"}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${dots[s] ?? "bg-gray-400"}`}
      />
      {status?.replace(/_/g, " ") ?? "—"}
    </span>
  );
}

// ── Proof Cell ────────────────────────────────────────────────────────────────

function ProofCell({ proof }) {
  if (proof) {
    return (
      <div className="w-14 h-10 rounded-lg overflow-hidden bg-amber-100 shrink-0">
        <img
          src={proof}
          alt="Proof"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-base">
      🖼
    </div>
  );
}

// ── Review Modal ──────────────────────────────────────────────────────────────

function ReviewModal({ task, onClose, onSuccess }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewing, setReviewing] = useState(null); // submissionPublicId being reviewed
  const [reviewNotes, setReviewNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `${API}/ranches/${getSlug()}/tasks/${task.publicId}/submissions`,
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          },
        );
        if (!res.ok) throw new Error();
        const json = await res.json();
        console.log("✅ Submissions:", json);
        const list =
          json?.data?.submissions ?? json?.submissions ?? json?.data ?? [];
        setSubmissions(Array.isArray(list) ? list : []);
      } catch {
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [task.publicId]);

  const handleReview = async (submission, status) => {
    setError("");
    setReviewing(submission.publicId ?? submission.id);
    try {
      const res = await fetch(
        `${API}/ranches/${getSlug()}/tasks/${task.publicId}/submissions/${submission.publicId ?? submission.id}/review`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            status,
            reviewNotes: reviewNotes || undefined,
          }),
        },
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? "Failed to review submission");
      }
      onSuccess(task.publicId, status);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setReviewing(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-800">
              Review Submission
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate">
              {task.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 text-xs text-red-500">
              {error}
            </div>
          )}

          {loading && (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-50 rounded-xl animate-pulse"
                />
              ))}
            </div>
          )}

          {!loading && submissions.length === 0 && (
            <div className="text-center py-8 space-y-2">
              <p className="text-2xl">📋</p>
              <p className="text-sm font-semibold text-gray-600">
                No submissions yet
              </p>
              <p className="text-xs text-gray-400">
                The worker hasn't submitted this task yet.
              </p>
            </div>
          )}

          {!loading &&
            submissions.map((sub, i) => (
              <div
                key={sub.publicId ?? sub.id ?? i}
                className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-700">
                      Submitted by{" "}
                      {[sub.submittedBy?.firstName, sub.submittedBy?.lastName]
                        .filter(Boolean)
                        .join(" ") ||
                        sub.submittedBy?.email ||
                        "Worker"}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {sub.createdAt
                        ? new Date(sub.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </p>
                  </div>
                  {sub.status && (
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${
                        sub.status === "approved"
                          ? "bg-[#f0fdf4] text-[#4CAF50]"
                          : sub.status === "rejected"
                            ? "bg-red-50 text-red-500"
                            : "bg-amber-50 text-amber-500"
                      }`}
                    >
                      {sub.status}
                    </span>
                  )}
                </div>

                {sub.notes && (
                  <p className="text-xs text-gray-600 italic">"{sub.notes}"</p>
                )}

                {sub.proofUrl && (
                  <img
                    src={sub.proofUrl}
                    alt="Proof"
                    className="w-full h-32 object-cover rounded-xl border border-gray-200"
                  />
                )}

                {/* Review form — only for pending submissions */}
                {(!sub.status || sub.status === "pending") && (
                  <div className="space-y-2 pt-1">
                    <textarea
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="Review notes (optional)..."
                      rows={2}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReview(sub, "approved")}
                        disabled={!!reviewing}
                        className="flex-1 py-2.5 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-60"
                      >
                        {reviewing === (sub.publicId ?? sub.id) ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          "✅"
                        )}
                        Approve
                      </button>
                      <button
                        onClick={() => handleReview(sub, "rejected")}
                        disabled={!!reviewing}
                        className="flex-1 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-60"
                      >
                        ❌ Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// ── Create Task Modal ─────────────────────────────────────────────────────────

function CreateTaskModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedToUserPublicId: "",
    category: "",
    priority: "",
  });
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isValid = form.title && form.dueDate;

  // Fetch ranch members for the Assign To dropdown
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/ranches/${getSlug()}/members`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!res.ok) throw new Error();
        const json = await res.json();
        console.log("✅ Members for task dropdown:", json);
        const list =
          json?.data?.data?.members ??
          json?.data?.members ??
          json?.members ??
          (Array.isArray(json?.data) ? json.data : []);
        setMembers(list);
      } catch {
        setMembers([]);
      } finally {
        setMembersLoading(false);
      }
    };
    load();
  }, []);

  // Get the publicId to send in the POST body
  const getMemberId = (m) =>
    m.user?.publicId ?? m.user?.id ?? m.publicId ?? m.id ?? "";

  // Build the label: "Fatima Garba — worker"
  const getMemberLabel = (m) => {
    const name =
      m.user?.name ??
      [m.user?.firstName, m.user?.lastName].filter(Boolean).join(" ") ??
      m.name ??
      m.email ??
      "Unknown";
    const role = (m.role ?? m.ranchRole ?? "").replace(/_/g, " ");
    return role ? `${name} — ${role}` : name;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const body = { title: form.title, dueDate: form.dueDate };
      if (form.description) body.description = form.description;
      if (form.assignedToUserPublicId)
        body.assignedToUserPublicId = form.assignedToUserPublicId;
      if (form.category) body.category = form.category;
      if (form.priority) body.priority = form.priority;

      const res = await fetch(`${API}/ranches/${getSlug()}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        // Log full error so we can see exactly what fields the API expects
        console.error("❌ Create task error:", JSON.stringify(err, null, 2));
        throw new Error(
          err.message ??
            JSON.stringify(err.errors ?? err) ??
            "Failed to create task",
        );
      }

      const json = await res.json();
      console.log("✅ Task created:", json);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Create New Task</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-500">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              value={form.title}
              onChange={set("title")}
              placeholder="e.g. Feed Herd A (Morning)"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={3}
              placeholder="Describe the task in detail..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors resize-none"
            />
          </div>

          {/* Due Date + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Due Date <span className="text-red-400">*</span>
              </label>
              <input
                type="datetime-local"
                value={form.dueDate}
                onChange={set("dueDate")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Category
              </label>
              <select
                value={form.category}
                onChange={set("category")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors appearance-none"
              >
                <option value="">Select category</option>
                {[
                  "feeding",
                  "cleaning",
                  "health",
                  "maintenance",
                  "vaccination",
                  "other",
                ].map((c) => (
                  <option key={c} value={c} className="capitalize">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Assign To dropdown + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Assign To
              </label>
              {membersLoading ? (
                <div className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-400 animate-pulse">
                  Loading members...
                </div>
              ) : (
                <select
                  value={form.assignedToUserPublicId}
                  onChange={set("assignedToUserPublicId")}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors appearance-none"
                >
                  <option value="">Select member</option>
                  {members.map((m, i) => (
                    <option key={getMemberId(m) || i} value={getMemberId(m)}>
                      {getMemberLabel(m)}
                    </option>
                  ))}
                  {members.length === 0 && (
                    <option disabled>No members found</option>
                  )}
                </select>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={set("priority")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors appearance-none"
              >
                <option value="">Select priority</option>
                {["low", "medium", "high", "urgent"].map((p) => (
                  <option key={p} value={p} className="capitalize">
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || loading}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5 ${
                isValid && !loading
                  ? "bg-[#4CAF50] hover:bg-[#43a047]"
                  : "bg-[#a5d6a7] cursor-not-allowed"
              }`}
            >
              {loading && <Loader2 size={12} className="animate-spin" />}
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TaskManagementPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [reviewingTask, setReviewingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/ranches/${getSlug()}/tasks`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (!res.ok) throw new Error(`Failed to fetch tasks (${res.status})`);

      const json = await res.json();
      // Log full response so we can inspect the shape for the POST form
      console.log("✅ Tasks API response:", JSON.stringify(json, null, 2));

      // Actual shape: { data: { tasks: [] } }
      const list =
        json?.data?.tasks ??
        json?.tasks ??
        (Array.isArray(json?.data) ? json.data : []);
      console.log("✅ Tasks parsed:", list.length, "tasks");
      setTasks(list);
    } catch (err) {
      console.error("❌ Tasks fetch error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-800">Task Management</h1>
          {!loading && !error && (
            <p className="text-xs text-gray-400 mt-0.5">
              {tasks.length} task{tasks.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchTasks}
            className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <Plus size={13} /> Create New Task
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="h-3 bg-gray-100 rounded w-16" />
              <div className="h-3 bg-gray-100 rounded w-24" />
              <div className="h-3 bg-gray-100 rounded flex-1" />
              <div className="h-3 bg-gray-100 rounded w-20" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center space-y-2">
          <p className="text-sm text-red-500">{error}</p>
          <button
            onClick={fetchTasks}
            className="text-xs text-[#4CAF50] hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && tasks.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
          <p className="text-sm text-gray-400">
            No tasks found. Create your first task!
          </p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && tasks.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    "Task ID",
                    "Task Description",
                    "Assigned To",
                    "Deadline",
                    "Status",
                    "Proof",
                  ].map((col) => (
                    <th
                      key={col}
                      className="text-left py-3 px-5 text-gray-500 font-medium whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, i) => (
                  <tr
                    key={task.publicId ?? i}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    {/* Task ID — short publicId */}
                    <td className="py-3.5 px-5 font-mono text-[11px] font-medium text-gray-700 whitespace-nowrap">
                      {task.publicId?.slice(0, 8) ?? "—"}
                    </td>
                    {/* Task Type — API uses title, no separate type field */}
                    {/* <td className="py-3.5 px-5 text-gray-600 whitespace-nowrap capitalize">
                      {task.category ?? task.type ?? "—"}
                    </td> */}
                    {/* Description / Title */}
                    <td className="py-3.5 px-5 text-gray-600 max-w-50">
                      <p className="font-medium text-gray-700 truncate">
                        {task.title ?? "—"}
                      </p>
                      {task.description && task.description !== task.title && (
                        <p className="text-[10px] text-gray-400 truncate mt-0.5">
                          {task.description}
                        </p>
                      )}
                    </td>
                    {/* Assigned To — object with name field */}
                    <td className="py-3.5 px-5 text-gray-600 whitespace-nowrap">
                      {task.assignedTo?.name ?? "—"}
                    </td>
                    {/* Deadline */}
                    <td className="py-3.5 px-5 text-gray-500 whitespace-nowrap">
                      <div>
                        {task.dueDate ? formatDeadline(task.dueDate) : "—"}
                        {task.isOverdue && (
                          <p className="text-[10px] text-red-400 font-medium">
                            {task.daysOverdue}d overdue
                          </p>
                        )}
                      </div>
                    </td>
                    {/* Status */}
                    <td className="py-3.5 px-5">
                      <StatusBadge
                        status={
                          task.isOverdue && task.status === "pending"
                            ? "overdue"
                            : task.status
                        }
                      />
                    </td>
                    {/* Proof / Review */}
                    <td className="py-3.5 px-5">
                      {!["completed", "done", "cancelled"].includes(
                        (task.status ?? "").toLowerCase(),
                      ) ? (
                        <button
                          onClick={() => setReviewingTask(task)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-600 text-xs font-semibold transition-colors whitespace-nowrap"
                        >
                          🔍 Review
                        </button>
                      ) : (
                        <ProofCell
                          proof={
                            task.imageUrl ?? task.submission?.imageUrl ?? null
                          }
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            fetchTasks();
          }}
        />
      )}

      {/* Review Modal */}
      {reviewingTask && (
        <ReviewModal
          task={reviewingTask}
          onClose={() => setReviewingTask(null)}
          onSuccess={(taskPublicId, status) => {
            setTasks((prev) =>
              prev.map((t) =>
                t.publicId === taskPublicId
                  ? {
                      ...t,
                      status: status === "approved" ? "completed" : "pending",
                    }
                  : t,
              ),
            );
            setReviewingTask(null);
          }}
        />
      )}
    </main>
  );
}
