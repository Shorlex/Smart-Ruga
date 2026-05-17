"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, X, Upload } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

function getSlug() {
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
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

// ── Badge helpers ─────────────────────────────────────────────────────────────

const STATUS_STYLES = {
  open: "bg-amber-50 text-amber-500",
  in_review: "bg-blue-50 text-blue-500",
  resolved: "bg-[#f0fdf4] text-[#4CAF50]",
  dismissed: "bg-gray-100 text-gray-400",
};

const PRIORITY_STYLES = {
  low: "bg-gray-100 text-gray-500",
  medium: "bg-amber-50 text-amber-500",
  high: "bg-orange-50 text-orange-500",
  urgent: "bg-red-50 text-red-500",
};

function Badge({ value, styleMap }) {
  const s = (value ?? "").toLowerCase();
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize whitespace-nowrap ${styleMap[s] ?? "bg-gray-100 text-gray-500"}`}
    >
      {(value ?? "—").replace("_", " ")}
    </span>
  );
}

// ── New Request Modal ─────────────────────────────────────────────────────────

const CATEGORIES = [
  "health",
  "inventory",
  "animal",
  "facility",
  "security",
  "task",
  "other",
];
const PRIORITIES = ["low", "medium", "high", "urgent"];

function NewRequestModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    assignedToUserId: "",
    entityType: "",
    entityPublicId: "",
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
      if (form.assignedToUserId)
        data.append("assignedToUserId", form.assignedToUserId);
      if (form.entityType) data.append("entityType", form.entityType);
      if (form.entityPublicId)
        data.append("entityPublicId", form.entityPublicId);
      if (image) data.append("image", image);

      const res = await fetch(`${API}/ranches/${getSlug()}/concerns`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: data,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create request");
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
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">New Request</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
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
              placeholder="Brief title of the request"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={3}
              placeholder="Describe the issue or request in detail..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors resize-none"
            />
          </div>

          {/* Category + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                value={form.category}
                onChange={set("category")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors appearance-none"
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
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors appearance-none"
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

          {/* Assigned To User ID */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Assign To (User ID)
            </label>
            <input
              value={form.assignedToUserId}
              onChange={set("assignedToUserId")}
              placeholder="UUID of staff member (optional)"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
            />
          </div>

          {/* Entity Type + Public ID */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Entity Type
              </label>
              <select
                value={form.entityType}
                onChange={set("entityType")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors appearance-none"
              >
                <option value="">None</option>
                <option value="animal">Animal</option>
                <option value="facility">Facility</option>
                <option value="task">Task</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Entity Public ID
              </label>
              <input
                value={form.entityPublicId}
                onChange={set("entityPublicId")}
                placeholder="UUID (optional)"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
              />
            </div>
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Attach Photo (optional)
            </label>
            <label className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 flex flex-col items-center gap-1.5 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] transition-colors cursor-pointer bg-gray-50">
              <Upload size={16} />
              <span className="text-xs font-medium">
                {image ? image.name : "Click to upload photo"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
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
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold text-white transition-colors ${
                isValid && !loading
                  ? "bg-[#4CAF50] hover:bg-[#43a047]"
                  : "bg-[#a5d6a7] cursor-not-allowed"
              }`}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const STATUSES = ["open", "in_review", "resolved", "dismissed"];
const PRIORITIES_F = ["low", "medium", "high", "urgent"];
const CATEGORIES_F = [
  "health",
  "inventory",
  "animal",
  "facility",
  "security",
  "task",
  "other",
];
const EMPTY_FILTERS = {
  status: "",
  priority: "",
  category: "",
  raisedByMe: false,
};

export default function RequestsApprovalsPage() {
  const [concerns, setConcerns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [showModal, setShowModal] = useState(false);
  const [pagination, setPagination] = useState({ total: 0 });

  const fetchConcerns = useCallback(async (f) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (f.status) params.append("status", f.status);
      if (f.priority) params.append("priority", f.priority);
      if (f.category) params.append("category", f.category);
      if (f.raisedByMe) params.append("raisedByMe", "true");

      const query = params.toString() ? `?${params.toString()}` : "";
      const res = await fetch(`${API}/ranches/${getSlug()}/concerns${query}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Failed to fetch concerns");
      const json = await res.json();
      console.log("✅ Concerns:", json);

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
  const activeFilters = Object.values(filters).filter(Boolean).length;

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
              {pagination.total ?? concerns.length} total
            </p>
          )}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          <Plus size={13} /> New Request
        </button>
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={filters.status}
          onChange={(e) => setFilter("status", e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-[#4CAF50] bg-white appearance-none"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilter("priority", e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-[#4CAF50] bg-white appearance-none"
        >
          <option value="">All Priorities</option>
          {PRIORITIES_F.map((p) => (
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
          {CATEGORIES_F.map((c) => (
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
          My Requests
        </button>

        {activeFilters > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 font-medium"
          >
            <X size={12} /> Clear ({activeFilters})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="h-3 bg-gray-100 rounded flex-1" />
                <div className="h-3 bg-gray-100 rounded w-20" />
                <div className="h-3 bg-gray-100 rounded w-16" />
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
            <p className="text-sm text-gray-400">No requests found.</p>
            {activeFilters > 0 && (
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
                  const raisedBy =
                    [c.raisedBy?.firstName, c.raisedBy?.lastName]
                      .filter(Boolean)
                      .join(" ") ||
                    c.raisedBy?.email ||
                    "—";
                  const assignedTo =
                    [c.assignedTo?.firstName, c.assignedTo?.lastName]
                      .filter(Boolean)
                      .join(" ") ||
                    c.assignedTo?.email ||
                    "—";
                  return (
                    <tr
                      key={c.id ?? i}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-5 font-medium text-gray-800 max-w-[200px]">
                        <div>
                          <p className="truncate">{c.title ?? "—"}</p>
                          {c.description && (
                            <p className="text-[10px] text-gray-400 truncate mt-0.5">
                              {c.description}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-5 text-gray-500 whitespace-nowrap capitalize">
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
                      <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                        {assignedTo}
                      </td>
                      <td className="py-4 px-5 text-gray-400 whitespace-nowrap">
                        {formatDate(c.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Request Modal */}
      {showModal && (
        <NewRequestModal
          onClose={() => setShowModal(false)}
          onSuccess={() => fetchConcerns(filters)}
        />
      )}
    </main>
  );
}
