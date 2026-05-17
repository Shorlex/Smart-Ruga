"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckCheck, Check, Square, CheckSquare } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getSlug() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_token") ?? "";
}

function formatTime(str) {
  if (!str) return "—";
  const d = new Date(str);
  return (
    d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    " | " +
    d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  );
}

// ── Filter to storekeeper-relevant alerts ─────────────────────────────────────

function isStorekeeperAlert(alert) {
  const type = (alert.alertType ?? alert.type ?? "").toLowerCase();
  const entityType = (alert.entityType ?? "").toLowerCase();
  return (
    type.includes("stock") ||
    type.includes("inventory") ||
    type.includes("low_stock") ||
    entityType === "inventory" ||
    // concern alerts that relate to inventory
    (type.includes("concern") &&
      entityType !== "animal" &&
      entityType !== "task")
  );
}

function alertMeta(alert) {
  const type = (alert.alertType ?? alert.type ?? "").toLowerCase();
  if (type.includes("low_stock") || type.includes("stock"))
    return { icon: "📦", bg: "bg-amber-50", label: "Stock" };
  if (type.includes("concern_resolved"))
    return { icon: "✅", bg: "bg-green-50", label: "Resolved" };
  if (type.includes("concern"))
    return { icon: "⚠️", bg: "bg-orange-50", label: "Concern" };
  return { icon: "🔔", bg: "bg-blue-50", label: "Alert" };
}

function isAlertRead(alert) {
  return alert.isRead === true || alert.read === true || !!alert.readAt;
}

// ── Single Alert Row ──────────────────────────────────────────────────────────

function AlertRow({ alert, selected, onToggleSelect, onMarkOneRead }) {
  const { icon, bg, label } = alertMeta(alert);
  const alertId = alert.publicId;
  const read = isAlertRead(alert);
  const message = alert.message ?? alert.title ?? "No message";

  return (
    <div
      className={`bg-white rounded-xl border shadow-sm px-5 py-4 transition-all ${
        read
          ? "border-gray-100 opacity-75"
          : "border-l-4 border-l-[#4CAF50] border-gray-100"
      } ${selected ? "ring-2 ring-[#4CAF50]/40 bg-[#f0fdf4]/20" : ""}`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox — unread only */}
        {!read ? (
          <button
            onClick={() => onToggleSelect(alertId)}
            className="mt-0.5 shrink-0 text-gray-300 hover:text-[#4CAF50] transition-colors"
          >
            {selected ? (
              <CheckSquare size={16} className="text-[#4CAF50]" />
            ) : (
              <Square size={16} />
            )}
          </button>
        ) : (
          <div className="w-4 shrink-0" />
        )}

        <div className="flex-1 min-w-0 flex items-start justify-between gap-4">
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span
                className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center text-sm shrink-0`}
              >
                {icon}
              </span>
              <span className="text-xs font-semibold text-gray-500 border border-gray-200 rounded-full px-2.5 py-0.5">
                {label}
              </span>
              <p className="text-sm font-semibold text-gray-800">{message}</p>
              {!read && (
                <span className="w-2 h-2 rounded-full bg-[#4CAF50] shrink-0" />
              )}
            </div>
          </div>

          {/* Timestamp + mark read */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="text-[11px] text-gray-400 whitespace-nowrap">
              {formatTime(alert.createdAt)}
            </span>
            {!read && alertId && (
              <button
                onClick={() => onMarkOneRead(alertId)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#4CAF50] text-[#4CAF50] hover:bg-green-50 text-xs font-semibold transition-colors"
              >
                <Check size={11} /> Mark Read
              </button>
            )}
            {read && (
              <span className="text-[10px] text-gray-300 font-medium">
                Read
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function StorekeeperAlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [marking, setMarking] = useState(false);

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/ranches/${getSlug()}/alerts`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Failed to fetch alerts");
      const json = await res.json();

      const list =
        json?.data?.alerts ??
        json?.data?.data?.alerts ??
        json?.alerts ??
        (Array.isArray(json?.data) ? json.data : []);

      // Filter client-side to storekeeper-relevant alerts
      const filtered = list
        .filter(isStorekeeperAlert)
        .map((a, i) => ({ ...a, _key: a.publicId ?? `alert-${i}` }));

      console.log("✅ SK Alerts:", filtered.length, "of", list.length, "total");
      setAlerts(filtered);
      setSelected(new Set());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  // ── Checkbox toggle ─────────────────────────────────────────────────────────

  const toggleSelect = useCallback((alertId) => {
    if (!alertId) return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(alertId) ? next.delete(alertId) : next.add(alertId);
      return next;
    });
  }, []);

  // ── Mark ONE read ───────────────────────────────────────────────────────────

  const markOneRead = useCallback(
    async (alertId) => {
      if (!alertId || marking) return;
      setMarking(true);
      try {
        await fetch(`${API}/ranches/${getSlug()}/alerts/${alertId}/read`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setAlerts((prev) =>
          prev.map((a) =>
            a.publicId === alertId ? { ...a, isRead: true } : a,
          ),
        );
        setSelected((prev) => {
          const n = new Set(prev);
          n.delete(alertId);
          return n;
        });
      } catch {
        fetchAlerts();
      } finally {
        setMarking(false);
      }
    },
    [marking, fetchAlerts],
  );

  // ── Mark SELECTED read ──────────────────────────────────────────────────────

  const markSelectedRead = useCallback(async () => {
    const ids = [...selected].filter(Boolean);
    if (!ids.length || marking) return;
    setMarking(true);
    try {
      await fetch(`${API}/ranches/${getSlug()}/alerts/read`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ alertIds: ids }),
      });
      setAlerts((prev) =>
        prev.map((a) =>
          ids.includes(a.publicId) ? { ...a, isRead: true } : a,
        ),
      );
      setSelected(new Set());
    } catch {
      fetchAlerts();
    } finally {
      setMarking(false);
    }
  }, [selected, marking, fetchAlerts]);

  // ── Mark ALL read ───────────────────────────────────────────────────────────

  const markAllRead = useCallback(async () => {
    if (marking) return;
    setMarking(true);
    try {
      await fetch(`${API}/ranches/${getSlug()}/alerts/read-all`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setAlerts((prev) => prev.map((a) => ({ ...a, isRead: true })));
      setSelected(new Set());
    } catch {
      fetchAlerts();
    } finally {
      setMarking(false);
    }
  }, [marking, fetchAlerts]);

  // ── Derived ─────────────────────────────────────────────────────────────────

  const unreadAlerts = alerts.filter((a) => !isAlertRead(a));
  const unreadCount = unreadAlerts.length;
  const unreadIds = unreadAlerts.map((a) => a.publicId).filter(Boolean);
  const allUnreadSelected =
    unreadIds.length > 0 && unreadIds.every((id) => selected.has(id));
  const selectedCount = selected.size;

  const toggleSelectAll = () => {
    setSelected(allUnreadSelected ? new Set() : new Set(unreadIds));
  };

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-base font-bold text-gray-800">Alerts</h1>
          {unreadCount > 0 && (
            <p className="text-xs text-[#4CAF50] font-medium mt-0.5">
              {unreadCount} unread
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {selectedCount > 0 && (
            <button
              onClick={markSelectedRead}
              disabled={marking}
              className="flex items-center gap-1.5 text-xs text-white bg-[#4CAF50] hover:bg-[#43a047] px-3 py-1.5 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <Check size={13} />
              {marking ? "Marking..." : `Mark ${selectedCount} Read`}
            </button>
          )}
          {unreadCount > 0 && selectedCount === 0 && (
            <button
              onClick={markAllRead}
              disabled={marking}
              className="flex items-center gap-1.5 text-xs text-[#4CAF50] border border-[#4CAF50] hover:bg-green-50 px-3 py-1.5 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <CheckCheck size={13} />
              {marking ? "Marking..." : "Mark All Read"}
            </button>
          )}
        </div>
      </div>

      {/* Select all unread */}
      {!loading && unreadCount > 0 && (
        <div className="flex items-center gap-2 px-1 pb-1">
          <button
            onClick={toggleSelectAll}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            {allUnreadSelected ? (
              <CheckSquare size={14} className="text-[#4CAF50]" />
            ) : (
              <Square size={14} />
            )}
            {allUnreadSelected
              ? "Deselect all"
              : `Select all unread (${unreadCount})`}
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 px-5 py-4 animate-pulse"
            >
              <div className="flex gap-3">
                <div className="w-4 h-4 bg-gray-100 rounded mt-0.5 shrink-0" />
                <div className="w-7 h-7 bg-gray-100 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                  <div className="h-2.5 bg-gray-100 rounded w-1/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <p className="text-sm text-red-500 mb-2">{error}</p>
          <button
            onClick={fetchAlerts}
            className="text-xs text-[#4CAF50] hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && alerts.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <p className="text-sm text-gray-400">No inventory alerts yet.</p>
        </div>
      )}

      {/* Rows */}
      {!loading &&
        !error &&
        alerts.map((alert) => (
          <AlertRow
            key={alert._key}
            alert={alert}
            selected={selected.has(alert.publicId)}
            onToggleSelect={toggleSelect}
            onMarkOneRead={markOneRead}
          />
        ))}
    </main>
  );
}
