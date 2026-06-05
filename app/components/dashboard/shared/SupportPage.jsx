"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, X, Loader2, RefreshCw, ChevronDown } from "lucide-react";

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

// ── Constants ─────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    value: "bug_report",
    label: "🐛 Bug Report",
    desc: "Something is broken or not working",
  },
  {
    value: "feature_request",
    label: "💡 Feature Request",
    desc: "Suggest a new feature or improvement",
  },
  {
    value: "billing",
    label: "💳 Billing",
    desc: "Subscription, payment or invoice issues",
  },
  {
    value: "technical",
    label: "⚙️ Technical",
    desc: "Performance, API or integration issues",
  },
  {
    value: "account",
    label: "👤 Account",
    desc: "Access, permissions or login issues",
  },
  {
    value: "general",
    label: "💬 General",
    desc: "General enquiry or anything else",
  },
];

const PRIORITIES = [
  {
    value: "low",
    label: "Low",
    color: "border-gray-300   text-gray-500   bg-gray-50",
  },
  {
    value: "medium",
    label: "Medium",
    color: "border-amber-300  text-amber-500  bg-amber-50",
  },
  {
    value: "high",
    label: "High",
    color: "border-orange-300 text-orange-500 bg-orange-50",
  },
  {
    value: "urgent",
    label: "Urgent",
    color: "border-red-300    text-red-500    bg-red-50",
  },
];

const STATUS_STYLES = {
  open: "bg-amber-50  text-amber-500",
  in_progress: "bg-blue-50   text-blue-500",
  resolved: "bg-[#f0fdf4] text-[#4CAF50]",
  closed: "bg-gray-100  text-gray-400",
};

const PRIORITY_STYLES = {
  low: "bg-gray-100  text-gray-500",
  medium: "bg-amber-50  text-amber-500",
  high: "bg-orange-50 text-orange-500",
  urgent: "bg-red-50    text-red-500",
};

// ── New Ticket Modal ──────────────────────────────────────────────────────────

function NewTicketModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "low",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isValid = form.title && form.description && form.category;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/ranches/${getSlug()}/platform-tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category,
          priority: form.priority,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? "Failed to submit ticket");
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
              New Support Ticket
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Our team will respond as soon as possible
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

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              value={form.title}
              onChange={set("title")}
              placeholder="Brief summary of the issue..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Category <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map(({ value, label, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, category: value }))}
                  className={`text-left px-3 py-2.5 rounded-xl border-2 transition-all ${
                    form.category === value
                      ? "border-[#4CAF50] bg-[#f0fdf4]"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <p className="text-xs font-semibold text-gray-800">{label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                    {desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Priority
            </label>
            <div className="flex gap-2">
              {PRIORITIES.map(({ value, label, color }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, priority: value }))}
                  className={`flex-1 py-2 rounded-xl border-2 text-xs font-semibold transition-all ${
                    form.priority === value
                      ? color
                      : "border-gray-200 text-gray-400 bg-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={4}
              placeholder="Please describe the issue in detail. Include steps to reproduce if it's a bug..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none transition-colors"
            />
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
              {loading ? "Submitting..." : "Submit Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Ticket Card ───────────────────────────────────────────────────────────────

function TicketCard({ ticket }) {
  const [expanded, setExpanded] = useState(false);
  const category = CATEGORIES.find((c) => c.value === ticket.category);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-800 truncate">
              {ticket.title}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {category?.label ?? ticket.category} ·{" "}
              {formatDate(ticket.createdAt)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${STATUS_STYLES[ticket.status ?? "open"] ?? "bg-gray-100 text-gray-500"}`}
            >
              {(ticket.status ?? "open").replace(/_/g, " ")}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${PRIORITY_STYLES[ticket.priority ?? "low"] ?? "bg-gray-100 text-gray-500"}`}
            >
              {ticket.priority ?? "low"}
            </span>
          </div>
        </div>
        <p className="text-[10px] text-[#4CAF50] font-medium mt-2">
          {expanded ? "Hide details ↑" : "Show details ↓"}
        </p>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-2 space-y-3 border-t border-gray-50">
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
              Description
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              {ticket.description ?? "—"}
            </p>
          </div>

          {ticket.adminNotes && (
            <div className="bg-[#f0fdf4] border border-[#d1fae5] rounded-xl px-4 py-3">
              <p className="text-[10px] font-semibold text-[#4CAF50] uppercase tracking-wide mb-1">
                Response from Support
              </p>
              <p className="text-xs text-gray-600">{ticket.adminNotes}</p>
            </div>
          )}

          {ticket.resolvedAt && (
            <p className="text-[10px] text-gray-400">
              Resolved: {formatDate(ticket.resolvedAt)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const FILTERS = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "in_progress", label: "In Progress" },
  { key: "resolved", label: "Resolved" },
  { key: "closed", label: "Closed" },
];

export default function SupportPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/ranches/${getSlug()}/platform-tickets`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      console.log("✅ Support tickets:", json);
      setTickets(json?.data?.tickets ?? json?.tickets ?? json?.data ?? []);
    } catch {
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const displayed =
    filter === "all" ? tickets : tickets.filter((t) => t.status === filter);

  const counts = tickets.reduce((acc, t) => {
    const s = t.status ?? "open";
    acc[s] = (acc[s] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-800">Support</h1>
          <p className="text-xs text-gray-400 mt-0.5">Get help from our team</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchTickets}
            className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors"
          >
            <Plus size={13} /> New Ticket
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-[#f0fdf4] border border-[#d1fae5] rounded-xl px-4 py-3 text-xs text-gray-600">
        <p className="font-semibold text-[#4CAF50] mb-0.5">How it works</p>
        Submit a ticket and our support team will respond within 24 hours. You
        can track the status of your tickets here.
      </div>

      {/* Filter tabs */}
      <div className="flex items-center bg-gray-100 rounded-full p-1 gap-0.5 overflow-x-auto">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              filter === key
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {label}
            {key !== "all" && counts[key] > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-200 text-gray-600">
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
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center space-y-3">
          <p className="text-3xl">🎫</p>
          <p className="text-sm font-semibold text-gray-600">
            {filter === "all"
              ? "No tickets yet"
              : `No ${filter.replace("_", " ")} tickets`}
          </p>
          <p className="text-xs text-gray-400">
            {filter === "all" &&
              "Have an issue? Tap 'New Ticket' to contact our support team"}
          </p>
        </div>
      )}

      {/* Tickets */}
      {!loading &&
        displayed.map((t, i) => (
          <TicketCard key={t.publicId ?? t.id ?? i} ticket={t} />
        ))}

      {showModal && (
        <NewTicketModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            fetchTickets();
          }}
        />
      )}
    </div>
  );
}
