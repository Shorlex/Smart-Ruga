"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw } from "lucide-react";

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

// ── Alert badge ───────────────────────────────────────────────────────────────

function AlertBadge({ status, daysOverdue, daysUntilDue }) {
  if (status === "overdue")
    return (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-50 text-red-500 whitespace-nowrap">
        🔴 Overdue {daysOverdue > 0 ? `${daysOverdue}d` : ""}
      </span>
    );
  if (status === "due_today")
    return (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-500 whitespace-nowrap">
        🟡 Due Today
      </span>
    );
  return (
    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-500 whitespace-nowrap">
      🔵 Due in {daysUntilDue}d
    </span>
  );
}

// ── Vaccination Alert Card ────────────────────────────────────────────────────

function VaxAlertCard({ item }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-2.5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-gray-800">
            💉 {item.vaccineName}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 capitalize">
            {item.animalTagNumber ?? "—"} · {item.animalBreed ?? "—"} ·{" "}
            {item.animalSex ?? "—"}
          </p>
        </div>
        <AlertBadge
          status={item.alertStatus}
          daysOverdue={item.daysOverdue}
          daysUntilDue={item.daysUntilDue}
        />
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <p className="text-gray-400">Dose</p>
          <p className="font-semibold text-gray-700">{item.dose ?? "—"}</p>
        </div>
        <div>
          <p className="text-gray-400">Last Given</p>
          <p className="font-semibold text-gray-700">
            {formatDate(item.administeredAt)}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Next Due</p>
          <p className="font-semibold text-red-500">
            {formatDate(item.nextDueAt)}
          </p>
        </div>
      </div>
      {item.notes && (
        <p className="text-[11px] text-gray-400 italic">"{item.notes}"</p>
      )}
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

function AlertSection({ title, icon, items, emptyMsg }) {
  if (items.length === 0)
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
        <p className="text-xs text-gray-400">{emptyMsg}</p>
      </div>
    );
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <VaxAlertCard key={item.publicId ?? i} item={item} />
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AlertsCriticalCases() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overdue");

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${API}/ranches/${getSlug()}/vaccinations/alerts`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      );
      if (!res.ok) throw new Error(`Failed to fetch alerts (${res.status})`);
      const json = await res.json();
      console.log("✅ Vaccination alerts:", json);
      setData(json?.data ?? json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const summary = data?.summary ?? {};
  const overdue = data?.overdue ?? [];
  const dueToday = data?.dueToday ?? [];
  const dueSoon = data?.dueSoon ?? [];

  const tabs = [
    {
      key: "overdue",
      label: "Overdue",
      count: summary.overdueCount ?? overdue.length,
      color: "text-red-500",
    },
    {
      key: "today",
      label: "Due Today",
      count: summary.dueTodayCount ?? dueToday.length,
      color: "text-amber-500",
    },
    {
      key: "soon",
      label: "Due Soon",
      count: summary.dueSoonCount ?? dueSoon.length,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="px-4 pb-8 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-bold text-gray-800">
            Vaccination Alerts
          </p>
          {!loading && data && (
            <p className="text-xs text-gray-400 mt-0.5">
              {summary.totalAlerts ??
                overdue.length + dueToday.length + dueSoon.length}{" "}
              total alerts
            </p>
          )}
        </div>
        <button
          onClick={fetchAlerts}
          className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Summary cards */}
      {!loading && data && (
        <div className="grid grid-cols-3 gap-3">
          {tabs.map(({ key, label, count, color }) => (
            <div
              key={key}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center"
            >
              <p className={`text-2xl font-bold ${color}`}>{count}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
        {tabs.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === key
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400"
            }`}
          >
            {label}
            {count > 0 && (
              <span className="ml-1 text-[10px] font-bold">({count})</span>
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
              className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse space-y-2"
            >
              <div className="flex justify-between">
                <div className="h-3 bg-gray-100 rounded w-1/3" />
                <div className="h-5 bg-gray-100 rounded w-20" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-8 bg-gray-100 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
          <p className="text-sm text-red-500 mb-2">{error}</p>
          <button
            onClick={fetchAlerts}
            className="text-xs text-[#4CAF50] hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {activeTab === "overdue" && (
            <AlertSection
              title="Overdue"
              icon="🔴"
              items={overdue}
              emptyMsg="No overdue vaccinations 🎉"
            />
          )}
          {activeTab === "today" && (
            <AlertSection
              title="Due Today"
              icon="🟡"
              items={dueToday}
              emptyMsg="No vaccinations due today"
            />
          )}
          {activeTab === "soon" && (
            <AlertSection
              title="Due Soon"
              icon="🔵"
              items={dueSoon}
              emptyMsg="No vaccinations due soon"
            />
          )}
        </>
      )}
    </div>
  );
}
