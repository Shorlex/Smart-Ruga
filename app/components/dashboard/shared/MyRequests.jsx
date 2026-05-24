"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, X, Loader2, RefreshCw, Upload } from "lucide-react";

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

// ── New Request Modal ─────────────────────────────────────────────────────────

const PRIORITIES = ["low", "medium", "high", "urgent"];

function NewRequestModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    itemName: "",
    quantity: "",
    reason: "",
    priority: "medium",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isValid = form.itemName && form.quantity && form.reason;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", `Request: ${form.itemName} (${form.quantity})`);
      data.append("description", form.reason);
      data.append("category", "inventory");
      data.append("priority", form.priority);
      if (image) data.append("image", image);

      const res = await fetch(`${API}/ranches/${getSlug()}/concerns`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: data,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? "Failed to submit request");
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
          <div>
            <h3 className="text-sm font-bold text-gray-800">
              New Supply Request
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Request will be sent to the storekeeper
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

          {/* Item name + quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Item Name <span className="text-red-400">*</span>
              </label>
              <input
                value={form.itemName}
                onChange={set("itemName")}
                placeholder="e.g. Antibiotics, Maize Feed"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Quantity <span className="text-red-400">*</span>
              </label>
              <input
                value={form.quantity}
                onChange={set("quantity")}
                placeholder="e.g. 50 kg, 10 doses"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50]"
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Reason / Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.reason}
              onChange={set("reason")}
              rows={3}
              placeholder="Why do you need this item? Describe the situation..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Urgency
            </label>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => {
                const active = form.priority === p;
                const cls = {
                  low: "border-gray-300   text-gray-500   bg-gray-50",
                  medium: "border-amber-300  text-amber-500  bg-amber-50",
                  high: "border-orange-300 text-orange-500 bg-orange-50",
                  urgent: "border-red-300    text-red-500    bg-red-50",
                }[p];
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, priority: p }))}
                    className={`flex-1 py-2 rounded-xl border-2 text-xs font-semibold capitalize transition-all ${
                      active ? cls : "border-gray-200 text-gray-400 bg-white"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photo */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Attach Photo (optional)
            </label>
            <label className="w-full border-2 border-dashed border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] cursor-pointer bg-gray-50 text-xs font-medium">
              <Upload size={14} />
              {image ? image.name : "Click to attach photo"}
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
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors ${
                isValid && !loading
                  ? "bg-[#4CAF50] hover:bg-[#43a047]"
                  : "bg-[#a5d6a7] cursor-not-allowed"
              }`}
            >
              {loading && <Loader2 size={12} className="animate-spin" />}
              {loading ? "Submitting..." : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Request Card ──────────────────────────────────────────────────────────────

function RequestCard({ concern }) {
  const [expanded, setExpanded] = useState(false);

  // Extract item name and quantity from title: "Request: Antibiotics (10 doses)"
  const titleMatch = (concern.title ?? "").match(
    /^Request:\s*(.+?)\s*\((.+?)\)$/,
  );
  const itemName = titleMatch?.[1] ?? concern.title ?? "—";
  const quantity = titleMatch?.[2] ?? "—";

  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm transition-all ${
        concern.status === "resolved"
          ? "border-[#d1fae5]"
          : concern.priority === "urgent"
            ? "border-l-4 border-l-red-400 border-gray-100"
            : "border-gray-100"
      }`}
    >
      <div
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-800 truncate">
              {itemName}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Qty: <span className="font-medium text-gray-700">{quantity}</span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <Badge value={concern.status} styleMap={STATUS_STYLES} />
            <Badge value={concern.priority} styleMap={PRIORITY_STYLES} />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <p className="text-[10px] text-gray-400">
            {formatDate(concern.createdAt)}
          </p>
          <p className="text-[10px] text-[#4CAF50] font-medium">
            {expanded ? "Hide details ↑" : "Show details ↓"}
          </p>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-50 pt-3">
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
              Reason
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              {concern.description ?? "—"}
            </p>
          </div>

          {concern.assignedTo && (
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Assigned To
              </p>
              <p className="text-xs text-gray-700 font-medium">
                {concern.assignedTo?.name ?? concern.assignedTo?.email ?? "—"}
              </p>
            </div>
          )}

          {concern.resolutionNotes && (
            <div className="bg-[#f0fdf4] border border-[#d1fae5] rounded-xl px-4 py-3">
              <p className="text-[10px] font-semibold text-[#4CAF50] uppercase tracking-wide mb-1">
                Resolution Notes
              </p>
              <p className="text-xs text-gray-600">{concern.resolutionNotes}</p>
            </div>
          )}

          {concern.imageUrl && (
            <img
              src={concern.imageUrl}
              alt="Attachment"
              className="w-full h-32 object-cover rounded-xl border border-gray-100"
            />
          )}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const FILTERS = [
  { key: "all", label: "All" },
  { key: "open", label: "Pending" },
  { key: "in_review", label: "In Review" },
  { key: "resolved", label: "Resolved" },
];

export default function MyRequests() {
  const [concerns, setConcerns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        category: "inventory",
        raisedByMe: "true",
      });
      if (filter !== "all") params.append("status", filter);

      const res = await fetch(
        `${API}/ranches/${getSlug()}/concerns?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      );
      if (!res.ok) throw new Error();
      const json = await res.json();
      setConcerns(
        json?.data?.data?.concerns ??
          json?.data?.concerns ??
          json?.concerns ??
          [],
      );
    } catch {
      setConcerns([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Counts per tab
  const counts = concerns.reduce(
    (acc, c) => {
      acc.all++;
      if (c.status === "open") acc.open++;
      if (c.status === "in_review") acc.in_review++;
      if (c.status === "resolved") acc.resolved++;
      return acc;
    },
    { all: 0, open: 0, in_review: 0, resolved: 0 },
  );

  // Filter locally for instant tab switching
  const displayed =
    filter === "all" ? concerns : concerns.filter((c) => c.status === filter);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-800">My Requests</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Supply requests to the storekeeper
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchRequests}
            className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors"
          >
            <Plus size={13} /> New Request
          </button>
        </div>
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
              <div className="h-2.5 bg-gray-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && displayed.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center space-y-2">
          <p className="text-2xl">📦</p>
          <p className="text-sm font-semibold text-gray-600">No requests yet</p>
          <p className="text-xs text-gray-400">
            {filter === "all"
              ? "Tap 'New Request' to request supplies from the storekeeper"
              : `No ${filter.replace("_", " ")} requests`}
          </p>
        </div>
      )}

      {/* Request cards */}
      {!loading &&
        displayed.map((c, i) => (
          <RequestCard key={c.publicId ?? i} concern={c} />
        ))}

      {/* New Request Modal */}
      {showModal && (
        <NewRequestModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            fetchRequests();
          }}
        />
      )}
    </div>
  );
}
