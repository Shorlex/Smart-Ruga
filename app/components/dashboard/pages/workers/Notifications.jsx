"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, CheckCheck, Square, CheckSquare } from "lucide-react";

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

function alertIcon(alert) {
  const t = (alert.alertType ?? alert.type ?? "").toLowerCase();
  if (t.includes("task")) return { icon: "✅", bg: "bg-[#f0fdf4]" };
  if (t.includes("health")) return { icon: "❤️", bg: "bg-red-50" };
  if (t.includes("concern")) return { icon: "⚠️", bg: "bg-orange-50" };
  if (t.includes("vaccination")) return { icon: "💉", bg: "bg-blue-50" };
  return { icon: "🔔", bg: "bg-gray-100" };
}

function isRead(alert) {
  return alert.isRead === true || alert.read === true || !!alert.readAt;
}

export default function WorkerNotificationsPage() {
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
      if (!res.ok) throw new Error("Failed to fetch notifications");
      const json = await res.json();
      const list =
        json?.data?.alerts ??
        json?.alerts ??
        (Array.isArray(json?.data) ? json.data : []);
      setAlerts(
        list.map((a, i) => ({ ...a, _key: a.publicId ?? `alert-${i}` })),
      );
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

  const toggleSelect = (id) => {
    if (!id) return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const markOneRead = async (alertId) => {
    if (!alertId || marking) return;
    setMarking(true);
    try {
      await fetch(`${API}/ranches/${getSlug()}/alerts/${alertId}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setAlerts((prev) =>
        prev.map((a) => (a.publicId === alertId ? { ...a, isRead: true } : a)),
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
  };

  const markSelectedRead = async () => {
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
  };

  const markAllRead = async () => {
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
  };

  const unreadAlerts = alerts.filter((a) => !isRead(a));
  const unreadCount = unreadAlerts.length;
  const unreadIds = unreadAlerts.map((a) => a.publicId).filter(Boolean);
  const allUnreadSelected =
    unreadIds.length > 0 && unreadIds.every((id) => selected.has(id));
  const selectedCount = selected.size;

  return (
    <div className="px-4 pb-8 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-bold text-gray-800">Notifications</p>
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
              className="flex items-center gap-1 text-xs text-white bg-[#4CAF50] px-3 py-1.5 rounded-full font-semibold disabled:opacity-50"
            >
              <Check size={11} /> Mark {selectedCount} Read
            </button>
          )}
          {unreadCount > 0 && selectedCount === 0 && (
            <button
              onClick={markAllRead}
              disabled={marking}
              className="flex items-center gap-1 text-xs text-[#4CAF50] border border-[#4CAF50] px-3 py-1.5 rounded-full font-semibold disabled:opacity-50"
            >
              <CheckCheck size={11} /> {marking ? "Marking..." : "All Read"}
            </button>
          )}
        </div>
      </div>

      {/* Select all unread */}
      {!loading && unreadCount > 0 && (
        <button
          onClick={() =>
            setSelected(allUnreadSelected ? new Set() : new Set(unreadIds))
          }
          className="flex items-center gap-1.5 text-xs text-gray-500 font-medium"
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
      )}

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl px-4 py-3 animate-pulse flex gap-3"
            >
              <div className="w-9 h-9 bg-gray-100 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-2/3" />
                <div className="h-2.5 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-white rounded-2xl p-6 text-center">
          <p className="text-sm text-red-500 mb-2">{error}</p>
          <button onClick={fetchAlerts} className="text-xs text-[#4CAF50]">
            Try again
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && alerts.length === 0 && (
        <div className="bg-white rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-400">No notifications yet.</p>
        </div>
      )}

      {/* Alert rows */}
      {!loading &&
        !error &&
        alerts.map((alert) => {
          const { icon, bg } = alertIcon(alert);
          const read = isRead(alert);
          const sel = selected.has(alert.publicId);
          return (
            <div
              key={alert._key}
              className={`bg-white rounded-2xl border shadow-sm px-4 py-3 transition-all ${
                read
                  ? "border-gray-100 opacity-80"
                  : "border-l-4 border-l-[#4CAF50] border-gray-100"
              } ${sel ? "ring-2 ring-[#4CAF50]/30" : ""}`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                {!read ? (
                  <button
                    onClick={() => toggleSelect(alert.publicId)}
                    className="mt-0.5 shrink-0 text-gray-300 hover:text-[#4CAF50] transition-colors"
                  >
                    {sel ? (
                      <CheckSquare size={15} className="text-[#4CAF50]" />
                    ) : (
                      <Square size={15} />
                    )}
                  </button>
                ) : (
                  <div className="w-4 shrink-0" />
                )}

                {/* Icon */}
                <div
                  className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center shrink-0`}
                >
                  <span className="text-sm">{icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {alert.title ?? alert.message ?? "Notification"}
                      </p>
                      {alert.message && alert.title && (
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          {alert.message}
                        </p>
                      )}
                      <p className="text-[10px] text-gray-400 mt-1">
                        {formatTime(alert.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      {!read && (
                        <span className="w-2 h-2 rounded-full bg-[#4CAF50]" />
                      )}
                      {!read && alert.publicId && (
                        <button
                          onClick={() => markOneRead(alert.publicId)}
                          className="text-[10px] text-[#4CAF50] border border-[#4CAF50] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap"
                        >
                          Mark Read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
