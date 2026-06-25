"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, X, Upload, ArrowRight, Loader2, RefreshCw } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

function getSlug() {
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
  return localStorage.getItem("sr_token") ?? "";
}
function getRole() {
  return localStorage.getItem("sr_role") ?? "";
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

const STATUS_STYLES = {
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

function Badge({ value, styleMap }) {
  const s = (value ?? "").toLowerCase();
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize whitespace-nowrap ${styleMap[s] ?? "bg-gray-100 text-gray-500"}`}
    >
      {(value ?? "—").replace(/_/g, " ")}
    </span>
  );
}

// ── New Concern Modal ─────────────────────────────────────────────────────────

const CATEGORIES = [
  "health",
  "feed",
  "equipment",
  "facility",
  "inventory",
  "security",
  "other",
];
const PRIORITIES = ["low", "medium", "high", "urgent"];

function NewConcernModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isValid = form.title && form.description && form.category;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("category", form.category);
      if (form.priority) data.append("priority", form.priority);
      if (image) data.append("image", image);

      const res = await fetch(`${API}/ranches/${getSlug()}/concerns`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: data,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? "Failed to raise concern");
      }
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
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Raise New Concern</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 text-xs text-red-500">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              value={form.title}
              onChange={set("title")}
              placeholder="Brief summary..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={3}
              placeholder="Describe the issue..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                value={form.category}
                onChange={set("category")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] appearance-none"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="capitalize">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={set("priority")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] appearance-none"
              >
                <option value="">Select priority</option>
                {PRIORITIES.map((p) => (
                  <option key={p} value={p} className="capitalize">
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Attach Photo (optional)
            </label>
            <label className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 flex flex-col items-center gap-1.5 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] cursor-pointer bg-gray-50">
              <Upload size={16} />
              <span className="text-xs font-medium">
                {image ? image.name : "Click to upload"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || loading}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 ${
                isValid && !loading
                  ? "bg-[#4CAF50] hover:bg-[#43a047]"
                  : "bg-[#a5d6a7] cursor-not-allowed"
              }`}
            >
              {loading && <Loader2 size={12} className="animate-spin" />}
              {loading ? "Submitting..." : "Raise Concern"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Detail Panel ──────────────────────────────────────────────────────────────

const STATUSES = ["open", "in_review", "resolved", "dismissed"];

function DetailPanel({ concern, members, onClose, onUpdate, onCreateTask }) {
  const isManager = ["manager", "owner", "admin"].includes(getRole());

  const [priority, setPriority] = useState(concern.priority ?? "");
  const [saving, setSaving] = useState(false);
  const [assigneeId, setAssigneeId] = useState(
    concern.assignedTo?.publicId ?? concern.assignedTo?.id ?? "",
  );
  const [status, setStatus] = useState(concern.status ?? "open");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const body = { status };
      if (priority !== concern.priority) body.priority = priority;
      if (note) body.resolutionNotes = note;
      if (assigneeId) body.assignedToUserPublicId = assigneeId;
      console.log("📡 PATCH concern body:", JSON.stringify(body, null, 2));

      if (Object.keys(body).length === 0) {
        onClose();
        return;
      }

      const res = await fetch(
        `${API}/ranches/${getSlug()}/concerns/${concern.publicId ?? concern.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(body),
        },
      );
      if (!res.ok) {
        const err = await res.json();
        console.error("❌ Concern PATCH error:", JSON.stringify(err, null, 2));
        throw new Error(err.message ?? "Failed to update concern");
      }
      const json = await res.json();
      setSaved(true);
      onUpdate({
        ...concern,
        status,
        assignedTo: members.find(
          (m) => (m.user?.publicId ?? m.id) === assigneeId,
        ),
      });
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const raisedBy = concern.raisedBy?.name || concern.raisedBy?.email || "—";
  const assignedTo =
    concern.assignedTo?.name || concern.assignedTo?.email || "Unassigned";

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full z-50 w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex-1 min-w-0 pr-4">
            <p className="text-sm font-bold text-gray-800 leading-snug">
              {concern.title}
            </p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <Badge value={concern.priority} styleMap={PRIORITY_STYLES} />
              <Badge value={status} styleMap={STATUS_STYLES} />
              <span className="text-[10px] text-gray-400 capitalize">
                {concern.category}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Description
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {concern.description ?? "—"}
            </p>
          </div>

          {/* Image */}
          {concern.imageUrl && (
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Attached Photo
              </p>
              <img
                src={concern.imageUrl}
                alt="Concern"
                className="w-full h-48 object-cover rounded-xl border border-gray-100"
              />
            </div>
          )}

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Raised By
              </p>
              <p className="text-sm font-medium text-gray-800">{raisedBy}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Date
              </p>
              <p className="text-sm text-gray-600">
                {formatDate(concern.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Currently Assigned
              </p>
              <p className="text-sm font-medium text-gray-800">{assignedTo}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Category
              </p>
              <p className="text-sm text-gray-600 capitalize">
                {concern.category ?? "—"}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Manager-only actions */}
          {isManager ? (
            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                Manager Actions
              </p>

              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-50 text-xs text-red-500">
                  {error}
                </div>
              )}

              {/* Assign To */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Assign To
                </label>
                <select
                  value={assigneeId}
                  onChange={(e) => setAssigneeId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] appearance-none"
                >
                  <option value="">— Unassigned —</option>
                  {members
                    .filter((m) =>
                      ["vet", "storekeeper", "worker", "manager"].includes(
                        m.ranchRole ?? m.role ?? "",
                      ),
                    )
                    .map((m) => {
                      const id =
                        m.user?.publicId ?? m.user?.id ?? m.memberId ?? "";
                      const name = m.user?.firstName
                        ? [m.user.firstName, m.user.lastName]
                            .filter(Boolean)
                            .join(" ")
                        : (m.user?.name ?? m.user?.email ?? "—");
                      const role = m.ranchRole ?? m.role ?? "";
                      return (
                        <option key={id} value={id}>
                          {name} ({role})
                        </option>
                      );
                    })}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Update Priority
                </label>
                <div className="flex gap-2 flex-wrap">
                  {PRIORITIES.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                        priority === p
                          ? `${PRIORITY_STYLES[p]} ring-2 ring-offset-1 ring-current`
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Update Status
                </label>
                <div className="flex gap-2 flex-wrap">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                        status === s
                          ? `${STATUS_STYLES[s]} ring-2 ring-offset-1 ring-current`
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {s.replace(/_/g, " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Add Note (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Internal note or instructions..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 text-center">
                Only managers can assign and update concerns.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {isManager && (
          <div className="px-6 py-4 border-t border-gray-100 space-y-2">
            {saved ? (
              <div className="w-full py-3 rounded-xl bg-[#f0fdf4] text-[#4CAF50] text-xs font-semibold text-center">
                ✅ Saved successfully!
              </div>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full py-3 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition-colors"
                >
                  {saving ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      Save Changes <ArrowRight size={14} />
                    </>
                  )}
                </button>
                <button
                  onClick={() => onCreateTask(concern)}
                  className="w-full py-3 rounded-xl border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#f0fdf4] text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus size={14} /> Create Task from Concern
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// ── Create Task from Concern Modal ────────────────────────────────────────────

function CreateTaskFromConcernModal({ concern, members, onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: `Resolve: ${concern.title}`,
    description: concern.description ?? "",
    assignedToUserPublicId: concern.assignedTo?.publicId ?? "",
    priority: concern.priority ?? "medium",
    dueDate: "",
    category: concern.category ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isValid = form.title && form.dueDate && form.assignedToUserPublicId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const body = {
        title: form.title,
        dueDate: new Date(form.dueDate).toISOString(),
        assignedToUserPublicId: form.assignedToUserPublicId,
        priority: form.priority,
      };
      if (form.description) body.description = form.description;
      if (form.category) body.category = form.category;
      // Link to the concern so it can be tracked
      body.relatedConcernPublicId = concern.publicId;

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
        throw new Error(err.message ?? "Failed to create task");
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-800">
              Create Task from Concern
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Assign actionable work to a staff member
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 text-xs text-red-500">
              {error}
            </div>
          )}

          <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 text-xs text-amber-600">
            📋 Linked to concern:{" "}
            <span className="font-semibold">{concern.title}</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Task Title <span className="text-red-400">*</span>
            </label>
            <input
              value={form.title}
              onChange={set("title")}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={3}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Assign To <span className="text-red-400">*</span>
            </label>
            <select
              value={form.assignedToUserPublicId}
              onChange={set("assignedToUserPublicId")}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] appearance-none"
            >
              <option value="">— Select staff member —</option>
              {members
                .filter((m) =>
                  ["vet", "storekeeper", "worker", "manager"].includes(
                    m.ranchRole ?? m.role ?? "",
                  ),
                )
                .map((m) => {
                  const id = m.user?.publicId ?? m.user?.id ?? m.memberId ?? "";
                  const name = m.user?.firstName
                    ? [m.user.firstName, m.user.lastName]
                        .filter(Boolean)
                        .join(" ")
                    : (m.user?.name ?? m.user?.email ?? "—");
                  const role = m.ranchRole ?? m.role ?? "";
                  return (
                    <option key={id} value={id}>
                      {name} ({role})
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Due Date <span className="text-red-400">*</span>
              </label>
              <input
                type="datetime-local"
                value={form.dueDate}
                onChange={set("dueDate")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={set("priority")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] appearance-none capitalize"
              >
                {["low", "medium", "high", "urgent"].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || loading}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors ${
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

const EMPTY_FILTERS = {
  status: "",
  priority: "",
  category: "",
  raisedByMe: false,
};

export default function RequestApprovalPage() {
  const [concerns, setConcerns] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null); // concern in detail panel
  const [taskFromConcern, setTaskFromConcern] = useState(null);
  const [pagination, setPagination] = useState({ total: 0 });

  const isManager = ["manager", "owner", "admin"].includes(getRole());

  // Fetch members for assign dropdown
  useEffect(() => {
    if (!isManager) return;
    const load = async () => {
      try {
        const res = await fetch(`${API}/ranches/${getSlug()}/members`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!res.ok) return;
        const json = await res.json();
        const list =
          json?.data?.data?.members ??
          json?.data?.members ??
          json?.members ??
          [];
        setMembers(list);
      } catch {}
    };
    load();
  }, [isManager]);

  const fetchConcerns = useCallback(async (f) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (f.status) params.append("status", f.status);
      if (f.priority) params.append("priority", f.priority);
      if (f.category) params.append("category", f.category);
      if (f.raisedByMe) params.append("raisedByMe", "true");

      const res = await fetch(
        `${API}/ranches/${getSlug()}/concerns?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch concerns");
      const json = await res.json();
      const list =
        json?.data?.data?.concerns ??
        json?.data?.concerns ??
        json?.concerns ??
        (Array.isArray(json?.data) ? json.data : []);
      setConcerns(list);
      setPagination(
        json?.data?.pagination ?? json?.pagination ?? { total: list.length },
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConcerns(filters);
  }, [filters, fetchConcerns]);

  const setFilter = (k, v) => setFilters((f) => ({ ...f, [k]: v }));
  const clearFilters = () => setFilters(EMPTY_FILTERS);
  const activeCount = Object.values(filters).filter(Boolean).length;

  // Update concern in list after PATCH
  const handleUpdate = (updated) => {
    setConcerns((prev) =>
      prev.map((c) =>
        (c.publicId ?? c.id) === (updated.publicId ?? updated.id)
          ? { ...c, ...updated }
          : c,
      ),
    );
  };

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-800">
            Requests & Approvals
          </h1>
          {!loading && (
            <p className="text-xs text-gray-400 mt-0.5">
              {pagination.total ?? concerns.length} total concerns
            </p>
          )}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          <Plus size={13} /> Raise Concern
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={filters.status}
          onChange={(e) => setFilter("status", e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-[#4CAF50] bg-white appearance-none"
        >
          <option value="">All Statuses</option>
          {["open", "in_review", "resolved", "dismissed"].map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, " ")}
            </option>
          ))}
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilter("priority", e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-[#4CAF50] bg-white appearance-none"
        >
          <option value="">All Priorities</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p} className="capitalize">
              {p}
            </option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilter("category", e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-[#4CAF50] bg-white appearance-none"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="capitalize">
              {c}
            </option>
          ))}
        </select>

        <button
          onClick={() => setFilter("raisedByMe", !filters.raisedByMe)}
          className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
            filters.raisedByMe
              ? "border-[#4CAF50] bg-[#f0fdf4] text-[#4CAF50]"
              : "border-gray-200 text-gray-500 hover:bg-gray-50"
          }`}
        >
          My Concerns
        </button>

        <button
          onClick={() => fetchConcerns(filters)}
          className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
        </button>

        {activeCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 font-medium"
          >
            <X size={12} /> Clear ({activeCount})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="h-3 bg-gray-100 rounded flex-1" />
                <div className="h-3 bg-gray-100 rounded w-20" />
                <div className="h-3 bg-gray-100 rounded w-16" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-sm text-red-500 mb-2">{error}</p>
            <button
              onClick={() => fetchConcerns(filters)}
              className="text-xs text-[#4CAF50] hover:underline"
            >
              Try again
            </button>
          </div>
        ) : concerns.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-gray-400">No concerns found.</p>
            {activeCount > 0 && (
              <button
                onClick={clearFilters}
                className="mt-2 text-xs text-[#4CAF50] hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    "Title",
                    "Category",
                    "Priority",
                    "Status",
                    "Raised By",
                    "Assigned To",
                    "Date",
                    "",
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
                {concerns.map((c, i) => {
                  const raisedBy = c.raisedBy?.name || c.raisedBy?.email || "—";
                  const assignedTo =
                    c.assignedTo?.name || c.assignedTo?.email || "—";
                  const isUnassigned = !c.assignedTo;

                  return (
                    <tr
                      key={c.publicId ?? c.id ?? i}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelected(c)}
                    >
                      <td className="py-4 px-5 max-w-50">
                        <p className="font-medium text-gray-800 truncate">
                          {c.title ?? "—"}
                        </p>
                        {c.description && (
                          <p className="text-[10px] text-gray-400 truncate mt-0.5">
                            {c.description}
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-5 text-gray-500 capitalize whitespace-nowrap">
                        {c.category ?? "—"}
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        <Badge value={c.priority} styleMap={PRIORITY_STYLES} />
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        <Badge value={c.status} styleMap={STATUS_STYLES} />
                      </td>
                      <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                        {raisedBy}
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        {isUnassigned ? (
                          <span className="text-amber-500 text-[11px] font-medium">
                            ⚠ Unassigned
                          </span>
                        ) : (
                          <span className="text-gray-600">{assignedTo}</span>
                        )}
                      </td>
                      <td className="py-4 px-5 text-gray-400 whitespace-nowrap">
                        {formatDate(c.createdAt)}
                      </td>
                      <td className="py-4 px-5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(c);
                          }}
                          className="flex items-center gap-1 text-[#4CAF50] hover:text-[#43a047] text-xs font-semibold whitespace-nowrap transition-colors"
                        >
                          View <ArrowRight size={12} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Concern Modal */}
      {showModal && (
        <NewConcernModal
          onClose={() => setShowModal(false)}
          onSuccess={() => fetchConcerns(filters)}
        />
      )}

      {/* Detail Panel */}
      {selected && (
        <DetailPanel
          concern={selected}
          members={members}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
          onCreateTask={(c) => {
            setTaskFromConcern(c);
            setSelected(null);
          }}
        />
      )}

      {/* Create Task from Concern modal */}
      {taskFromConcern && (
        <CreateTaskFromConcernModal
          concern={taskFromConcern}
          members={members}
          onClose={() => setTaskFromConcern(null)}
          onSuccess={() => setTaskFromConcern(null)}
        />
      )}
    </main>
  );
}
