"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Download } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getSlug() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_token") ?? "";
}

function fmtNum(n) {
  if (!n && n !== 0) return "—";
  return Number(n).toLocaleString();
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

function ReportStatCard({ title, value, sub, icon, color = "#4CAF50" }) {
  return (
    <div className="flex-1 bg-[linear-gradient(135deg,#DCFFA2_0%,#DCFFA2_60%,#FDE7C5_100%)] rounded-xl border border-[#d1fae5] shadow-sm p-5 min-w-0">
      <p className="text-xs font-semibold text-gray-600 mb-3">{title}</p>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-800 leading-none">
            {value ?? "—"}
          </p>
          {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
        </div>
        <span className="text-3xl opacity-20">{icon}</span>
      </div>
    </div>
  );
}

// ── Worker Efficiency ─────────────────────────────────────────────────────────

function efficiencyColor(score, max) {
  const p = max ? score / max : 0;
  if (p >= 0.8)
    return { bar: "#4CAF50", label: "Excellent", cls: "text-[#4CAF50]" };
  if (p >= 0.5) return { bar: "#f59e0b", label: "Good", cls: "text-amber-500" };
  if (p >= 0.2)
    return { bar: "#f97316", label: "Average", cls: "text-orange-500" };
  return { bar: "#ef4444", label: "Poor", cls: "text-red-500" };
}

function WorkerEfficiency({ performers }) {
  const maxScore = Math.max(
    ...performers.map(
      (p) => (p.completedTasks ?? 0) + (p.approvedSubmissions ?? 0),
    ),
    1,
  );

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-bold text-gray-800">
        Worker Efficiency Breakdown
      </h3>
      <p className="text-[11px] text-gray-400 mb-5">
        Based on completed tasks + approved submissions
      </p>

      {performers.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">
          No performance data yet
        </p>
      ) : (
        <div className="space-y-5">
          {performers.map((p, i) => {
            const name =
              [p.firstName, p.lastName].filter(Boolean).join(" ") ||
              p.email ||
              "—";
            const score =
              (p.completedTasks ?? 0) + (p.approvedSubmissions ?? 0);
            const pct = maxScore ? Math.round((score / maxScore) * 100) : 0;
            const { bar, label, cls } = efficiencyColor(score, maxScore);
            return (
              <div key={p.id ?? i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-gray-700">
                    {name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {score} pts ({pct}%)
                    </span>
                    <span className={`text-[10px] font-bold ${cls}`}>
                      {label}
                    </span>
                  </div>
                </div>
                <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: bar }}
                  />
                </div>
                <div className="flex gap-4 mt-1">
                  <p className="text-[10px] text-gray-400">
                    {p.completedTasks ?? 0} tasks completed
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {p.approvedSubmissions ?? 0} submissions approved
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Inventory Table ───────────────────────────────────────────────────────────

function AlertBadge({ isLow }) {
  return (
    <span
      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${
        isLow ? "bg-red-50 text-red-500" : "bg-[#f0fdf4] text-[#4CAF50]"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${isLow ? "bg-red-500" : "bg-[#4CAF50]"}`}
      />
      {isLow ? "Low" : "OK"}
    </span>
  );
}

function InventoryTable({ items }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-bold text-gray-800 mb-4">
        Ranch Inventory Report
      </h3>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">
          No inventory data
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                {[
                  "Category",
                  "Item Name",
                  "Qty on Hand",
                  "Reorder Level",
                  "SKU",
                  "Low Stock",
                  "Status",
                ].map((col) => (
                  <th
                    key={col}
                    className="text-left py-3 px-4 text-gray-400 font-medium whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr
                  key={item.publicId ?? i}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap capitalize">
                    {item.category ?? "—"}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-gray-700 whitespace-nowrap">
                    {item.name ?? "—"}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                    {fmtNum(item.quantityOnHand)} {item.unit}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                    {fmtNum(item.reorderLevel)} {item.unit}
                  </td>
                  <td className="py-3.5 px-4 text-gray-400 whitespace-nowrap">
                    {item.sku ?? "—"}
                  </td>
                  <td className="py-3.5 px-4">
                    <AlertBadge isLow={item.isLowStock} />
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-xs font-semibold ${item.isActive ? "text-[#4CAF50]" : "text-gray-400"}`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Concerns Summary ──────────────────────────────────────────────────────────

function ConcernsSummary({ concerns }) {
  const open = concerns.filter((c) => c.status === "open").length;
  const inReview = concerns.filter((c) => c.status === "in_review").length;
  const resolved = concerns.filter((c) => c.status === "resolved").length;
  const urgent = concerns.filter((c) => c.priority === "urgent").length;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-bold text-gray-800 mb-4">Concerns Summary</h3>
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            label: "Open",
            value: open,
            color: "text-amber-500",
            bg: "bg-amber-50",
          },
          {
            label: "In Review",
            value: inReview,
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            label: "Resolved",
            value: resolved,
            color: "text-[#4CAF50]",
            bg: "bg-[#f0fdf4]",
          },
          {
            label: "Urgent",
            value: urgent,
            color: "text-red-500",
            bg: "bg-red-50",
          },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-xl p-4 text-center`}>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const [dash, setDash] = useState(null);
  const [items, setItems] = useState([]);
  const [concerns, setConcerns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [dashRes, itemsRes, concernsRes] = await Promise.all([
        fetch(`${API}/ranches/${getSlug()}/dashboard`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
        fetch(`${API}/ranches/${getSlug()}/inventory-items`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
        fetch(`${API}/ranches/${getSlug()}/concerns`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
      ]);
      if (dashRes.ok) {
        const j = await dashRes.json();
        setDash(j?.data ?? j);
      }
      if (itemsRes.ok) {
        const j = await itemsRes.json();
        setItems(j?.data?.items ?? j?.items ?? []);
      }
      if (concernsRes.ok) {
        const j = await concernsRes.json();
        setConcerns(
          j?.data?.data?.concerns ?? j?.data?.concerns ?? j?.concerns ?? [],
        );
      }
    } catch (err) {
      console.error("Reports:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const performers = dash?.topPerformers ?? [];
  const tasksTotal = dash?.tasks?.total ?? 0;
  const tasksComplete = dash?.tasks?.completed ?? 0;
  const tasksPending = dash?.tasks?.pending ?? 0;
  const lowStock = dash?.inventory?.lowStockItems ?? 0;
  const totalAnimals = dash?.animals?.total ?? 0;
  const sickAnimals = dash?.animals?.sick ?? 0;

  const completionPct = tasksTotal
    ? `${Math.round((tasksComplete / tasksTotal) * 100)}%`
    : "—";
  const avgScore = performers.length
    ? Math.round(
        performers.reduce(
          (s, p) => s + (p.completedTasks ?? 0) + (p.approvedSubmissions ?? 0),
          0,
        ) / performers.length,
      )
    : 0;

  const Skeleton = ({ h = "h-24" }) => (
    <div className={`${h} bg-gray-100 rounded-xl animate-pulse`} />
  );

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold text-gray-800">Reports</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchAll}
            className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          </button>
          <button className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Stat cards */}
      {loading ? (
        <div className="flex gap-4">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap">
          <ReportStatCard
            title="Task Completion Rate"
            value={completionPct}
            sub={`${tasksComplete} of ${tasksTotal} tasks`}
            icon="✅"
          />
          <ReportStatCard
            title="Avg Worker Score"
            value={avgScore}
            sub={`${performers.length} workers`}
            icon="👥"
          />
          <ReportStatCard
            title="Open Concerns"
            value={concerns.filter((c) => c.status === "open").length}
            sub="Needs attention"
            icon="⚠️"
          />
          <ReportStatCard
            title="Low Stock Items"
            value={lowStock}
            sub={`${totalAnimals} animals, ${sickAnimals} sick`}
            icon="📦"
          />
        </div>
      )}

      {/* Worker Efficiency */}
      {loading ? (
        <Skeleton h="h-64" />
      ) : (
        <WorkerEfficiency performers={performers} />
      )}

      {/* Inventory + Concerns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          {loading ? <Skeleton h="h-64" /> : <InventoryTable items={items} />}
        </div>
        <div>
          {loading ? (
            <Skeleton h="h-64" />
          ) : (
            <ConcernsSummary concerns={concerns} />
          )}
        </div>
      </div>
    </main>
  );
}
