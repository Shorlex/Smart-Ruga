"use client";

import { useState, useEffect, useCallback } from "react";
import {
  RefreshCw,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getToken() {
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

const STATUS_STYLES = {
  open: "bg-amber-50  text-amber-500",
  in_progress: "bg-blue-50   text-blue-500",
  resolved: "bg-[#f0fdf4] text-[#4CAF50]",
  closed: "bg-gray-100  text-gray-400",
};

const STATUSES = ["open", "in_progress", "resolved", "closed"];

// ── Ticket Detail Panel ───────────────────────────────────────────────────────

function TicketDetailPanel({ ticket, onClose, onUpdate }) {
  const [status, setStatus] = useState(ticket.status ?? "open");
  const [notes, setNotes] = useState(ticket.adminNotes ?? ticket.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const body = {};
      if (status !== ticket.status) body.status = status;
      if (notes) body.adminNotes = notes;
      if (!Object.keys(body).length) {
        onClose();
        return;
      }

      const res = await fetch(
        `${API}/admin/platform-tickets/${ticket.publicId}`,
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
        const e = await res.json();
        throw new Error(e.message ?? "Failed");
      }
      setSaved(true);
      onUpdate({ ...ticket, status, adminNotes: notes });
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

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full z-50 w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex-1 pr-4">
            <p className="text-sm font-bold text-gray-800">
              {ticket.title ?? "Ticket"}
            </p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize ${STATUS_STYLES[ticket.status ?? "open"] ?? "bg-gray-100 text-gray-500"}`}
              >
                {(ticket.status ?? "open").replace(/_/g, " ")}
              </span>
              <span className="text-[10px] text-gray-400">
                {formatDate(ticket.createdAt)}
              </span>
              {ticket.ranch && (
                <span className="text-[10px] text-gray-400">
                  · {ticket.ranch.name}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 text-xs text-red-500">
              {error}
            </div>
          )}
          {saved && (
            <div className="px-4 py-3 rounded-xl bg-[#f0fdf4] text-xs text-[#4CAF50] font-semibold">
              ✅ Updated successfully
            </div>
          )}

          {/* Description */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
              Description
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {ticket.description ?? "—"}
            </p>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
                Raised By
              </p>
              <p className="text-xs font-semibold text-gray-700">
                {[ticket.raisedByUser?.firstName, ticket.raisedByUser?.lastName]
                  .filter(Boolean)
                  .join(" ") ||
                  ticket.raisedByUser?.email ||
                  "—"}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                {ticket.raisedByUser?.email ?? ""}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
                Category
              </p>
              <p className="text-xs font-semibold text-gray-700 capitalize">
                {(ticket.category ?? "—").replace(/_/g, " ")}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
                Priority
              </p>
              <p
                className={`text-xs font-semibold capitalize ${
                  ticket.priority === "urgent"
                    ? "text-red-500"
                    : ticket.priority === "high"
                      ? "text-orange-500"
                      : ticket.priority === "medium"
                        ? "text-amber-500"
                        : "text-gray-500"
                }`}
              >
                {ticket.priority ?? "—"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
                Ranch
              </p>
              <p className="text-xs font-semibold text-gray-700">
                {ticket.ranch?.name ?? "—"}
              </p>
            </div>
          </div>

          {/* Previous admin notes */}
          {ticket.adminNotes && (
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-[10px] font-semibold text-blue-500 uppercase tracking-wide mb-1">
                Previous Admin Notes
              </p>
              <p className="text-xs text-gray-600">{ticket.adminNotes}</p>
            </div>
          )}

          <div className="border-t border-gray-100" />

          {/* Update status */}
          <div>
            <p className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">
              Update Status
            </p>
            <div className="flex gap-2 flex-wrap">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-3 py-2 rounded-xl border-2 text-xs font-semibold capitalize transition-all ${
                    status === s
                      ? `${STATUS_STYLES[s]} border-current`
                      : "border-gray-200 text-gray-400 hover:border-gray-300"
                  }`}
                >
                  {s.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Admin notes */}
          <div>
            <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Admin Notes
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add notes or response for this ticket..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#0f172a] resize-none"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition-colors"
          >
            {saving ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [selected, setSelected] = useState(null);

  const fetchTickets = useCallback(
    async (p = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: p, limit: 20 });
        if (filter) params.append("status", filter);

        const res = await fetch(`${API}/admin/platform-tickets?${params}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!res.ok) throw new Error();
        const json = await res.json();
        console.log("✅ SA Tickets:", json);
        setTickets(json?.data?.tickets ?? json?.tickets ?? []);
        const meta =
          json?.data?.pagination ??
          json?.meta?.pagination ??
          json?.pagination ??
          {};
        setPagination({
          total: Number(meta.total) || 0,
          totalPages: Number(meta.totalPages) || 1,
        });
      } catch {
        setTickets([]);
      } finally {
        setLoading(false);
      }
    },
    [filter],
  );

  useEffect(() => {
    fetchTickets(page);
  }, [fetchTickets, page]);

  const handleUpdate = (updated) => {
    setTickets((prev) =>
      prev.map((t) =>
        (t.publicId ?? t.id) === (updated.publicId ?? updated.id) ? updated : t,
      ),
    );
    setSelected(updated);
  };

  return (
    <div className="px-6 py-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-800">
            Platform Tickets
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {pagination.total} total tickets
          </p>
        </div>
        <button
          onClick={() => fetchTickets(page)}
          className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: "", label: "All" },
          ...STATUSES.map((s) => ({ key: s, label: s.replace(/_/g, " ") })),
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => {
              setFilter(key);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all ${
              filter === key
                ? "bg-[#0f172a] text-white"
                : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-14 bg-gray-50 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : tickets.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-2xl mb-2">🎫</p>
            <p className="text-sm text-gray-400">No tickets found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Title", "Raised By", "Category", "Status", "Date", ""].map(
                    (col) => (
                      <th
                        key={col}
                        className="text-left py-3 px-5 text-gray-400 font-medium whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {tickets.map((t, i) => (
                  <tr
                    key={t.publicId ?? t.id ?? i}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelected(t)}
                  >
                    <td className="py-4 px-5 max-w-55">
                      <p className="font-semibold text-gray-800 truncate">
                        {t.title ?? "—"}
                      </p>
                      {t.ranch && (
                        <p className="text-[10px] text-gray-400 truncate mt-0.5">
                          📍 {t.ranch.name}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                      {[t.raisedByUser?.firstName, t.raisedByUser?.lastName]
                        .filter(Boolean)
                        .join(" ") ||
                        t.raisedByUser?.email ||
                        "—"}
                    </td>
                    <td className="py-4 px-5 text-gray-500 capitalize whitespace-nowrap">
                      {(t.category ?? "—").replace(/_/g, " ")}
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize ${STATUS_STYLES[t.status ?? "open"] ?? "bg-gray-100 text-gray-500"}`}
                      >
                        {(t.status ?? "open").replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-gray-400 whitespace-nowrap">
                      {formatDate(t.createdAt)}
                    </td>
                    <td className="py-4 px-5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(t);
                        }}
                        className="flex items-center gap-1 text-[#0f172a] font-semibold hover:underline whitespace-nowrap"
                      >
                        View <ArrowRight size={11} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 disabled:opacity-40 hover:bg-gray-50"
          >
            <ChevronLeft size={13} /> Prev
          </button>
          <p className="text-xs text-gray-500">
            Page <span className="font-bold">{page}</span> of{" "}
            {pagination.totalPages}
          </p>
          <button
            onClick={() =>
              setPage((p) => Math.min(pagination.totalPages, p + 1))
            }
            disabled={page === pagination.totalPages}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 disabled:opacity-40 hover:bg-gray-50"
          >
            Next <ChevronRight size={13} />
          </button>
        </div>
      )}

      {/* Detail Panel */}
      {selected && (
        <TicketDetailPanel
          ticket={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
