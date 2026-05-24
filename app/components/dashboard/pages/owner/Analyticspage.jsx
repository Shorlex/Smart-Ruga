"use client";

import { useState, useEffect, useCallback } from "react";
import { Download, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getSlug() {
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
  return localStorage.getItem("sr_token") ?? "";
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function pct(part, total) {
  if (!total || !part) return "0%";
  return `${Math.round((part / total) * 100)}%`;
}

function fmtNum(n) {
  if (n === null || n === undefined || n === "—") return "—";
  return Number(n).toLocaleString();
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  subColor = "text-gray-400",
  icon,
  bg = "bg-[linear-gradient(135deg,#DCFFA2_0%,#DCFFA2_60%,#FDE7C5_100%)]",
}) {
  return (
    <div
      className={`${bg} rounded-xl border border-gray-100 shadow-sm p-5 flex items-start justify-between`}
    >
      <div>
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value ?? "—"}</p>
        {sub && <p className={`text-xs mt-1 font-medium ${subColor}`}>{sub}</p>}
      </div>
      {icon && <span className="text-2xl opacity-30">{icon}</span>}
    </div>
  );
}

// ── Donut Chart ───────────────────────────────────────────────────────────────

function DonutChart({
  segments,
  total,
  centerLabel,
  centerSub,
  size = 140,
  thickness = 14,
}) {
  const r = (size - thickness) / 2;
  const circ = 2 * Math.PI * r;
  const cx = size / 2;
  const cy = size / 2;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Track */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#f3f4f6"
        strokeWidth={thickness}
      />
      {segments.map(({ value, color }, i) => {
        const pctVal = total ? value / total : 0;
        const dash = Math.max(pctVal * circ - 3, 0);
        const el = (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeDasharray={`${dash} ${circ}`}
            strokeDashoffset={-offset + circ * 0.25}
            strokeLinecap="round"
          />
        );
        offset += pctVal * circ;
        return el;
      })}
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill="#1f2937"
      >
        {centerLabel}
      </text>
      {centerSub && (
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          fontSize="9"
          fill="#9ca3af"
        >
          {centerSub}
        </text>
      )}
    </svg>
  );
}

// ── Bar Chart ─────────────────────────────────────────────────────────────────

function BarChart({ data, maxVal }) {
  const max = maxVal ?? Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-2 h-24">
      {data.map(({ label, value, color }, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <p className="text-[10px] text-gray-500 font-semibold">
            {fmtNum(value)}
          </p>
          <div
            className="w-full rounded-t-md transition-all"
            style={{
              height: `${Math.max((value / max) * 80, 4)}px`,
              backgroundColor: color ?? "#4CAF50",
            }}
          />
          <p className="text-[9px] text-gray-400 text-center leading-tight">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── Progress Row ──────────────────────────────────────────────────────────────

function ProgressRow({ label, value, total, color = "#4CAF50" }) {
  const p = total ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-600 capitalize">{label}</span>
        <span className="text-xs font-semibold text-gray-700">
          {fmtNum(value)}{" "}
          <span className="text-gray-400 font-normal">({p}%)</span>
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${p}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [dash, setDash] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [dashRes, animalsRes, itemsRes] = await Promise.all([
        fetch(`${API}/ranches/${getSlug()}/dashboard`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
        fetch(`${API}/ranches/${getSlug()}/animals?limit=100`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
        fetch(`${API}/ranches/${getSlug()}/inventory-items`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
      ]);

      if (dashRes.ok) {
        const j = await dashRes.json();
        setDash(j?.data ?? j);
      }
      if (animalsRes.ok) {
        const j = await animalsRes.json();
        setAnimals(j?.data?.animals ?? j?.animals ?? []);
      }
      if (itemsRes.ok) {
        const j = await itemsRes.json();
        setItems(j?.data?.items ?? j?.items ?? []);
      }
    } catch (err) {
      console.error("Analytics fetch:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ── Derive metrics ──────────────────────────────────────────────────────────

  // Animals
  const totalAnimals = dash?.animals?.total ?? animals.length;
  const healthyCount = animals.filter(
    (a) => a.healthStatus === "healthy",
  ).length;
  const sickCount = animals.filter((a) => a.healthStatus === "sick").length;
  const recoveringCount = animals.filter(
    (a) => a.healthStatus === "recovering",
  ).length;
  const quarantinedCount = animals.filter(
    (a) => a.healthStatus === "quarantined",
  ).length;
  const overdueVax = animals.filter((a) => a.isOverdue).length;

  // Tasks
  const tasksTotal = dash?.tasks?.total ?? 0;
  const tasksCompleted = dash?.tasks?.completed ?? 0;
  const tasksPending = dash?.tasks?.pending ?? 0;
  const tasksOverdue = dash?.tasks?.overdue ?? 0;

  // Concerns
  const concernsTotal =
    (dash?.concerns?.open ?? 0) +
    (dash?.concerns?.resolved ?? 0) +
    (dash?.concerns?.dismissed ?? 0);
  const concernsOpen = dash?.concerns?.open ?? 0;
  const concernsUrgent = dash?.concerns?.urgent ?? 0;

  // Inventory
  const totalItems = dash?.inventory?.totalItems ?? items.length;
  const lowStockCount =
    dash?.inventory?.lowStockItems ?? items.filter((i) => i.isLowStock).length;
  const totalQty =
    dash?.inventory?.totalQuantityOnHand ??
    items.reduce((s, i) => s + (i.quantityOnHand ?? 0), 0);

  // Top performers
  const topPerformers = dash?.topPerformers ?? [];

  // Members
  const membersTotal = dash?.members?.total ?? 0;

  // Inventory by category
  const catMap = items.reduce((acc, item) => {
    const cat = item.category ?? "other";
    acc[cat] = (acc[cat] ?? 0) + (item.quantityOnHand ?? 0);
    return acc;
  }, {});
  const catColors = {
    feed: "#4CAF50",
    medicine: "#60a5fa",
    equipment: "#f59e0b",
    supplement: "#a78bfa",
    other: "#9ca3af",
  };
  const invBars = Object.entries(catMap)
    .map(([cat, qty]) => ({
      label: cat,
      value: qty,
      color: catColors[cat] ?? "#9ca3af",
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const Skeleton = () => (
    <div className="h-full bg-gray-100 rounded-xl animate-pulse min-h-25" />
  );

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-800">
            Analytics &amp; Reports
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Real-time overview of your ranch
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchAll}
            className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <button className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          [1, 2, 3, 4].map((i) => <Skeleton key={i} />)
        ) : (
          <>
            <StatCard
              label="Total Animals"
              value={fmtNum(totalAnimals)}
              sub={`${overdueVax} vax overdue`}
              subColor="text-amber-500"
              icon="🐄"
            />
            <StatCard
              label="Total Members"
              value={fmtNum(membersTotal)}
              sub="Active ranch staff"
              subColor="text-gray-400"
              icon="👥"
            />
            <StatCard
              label="Tasks Completed"
              value={`${tasksCompleted}/${tasksTotal}`}
              sub={`${tasksPending} pending`}
              subColor="text-amber-500"
              icon="✅"
            />
            <StatCard
              label="Open Concerns"
              value={fmtNum(concernsOpen)}
              sub={`${concernsUrgent} urgent`}
              subColor={concernsUrgent > 0 ? "text-red-500" : "text-gray-400"}
              icon="⚠️"
            />
          </>
        )}
      </div>

      {/* Livestock Health + Task Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Livestock Health Distribution */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-bold text-gray-800 mb-4">
            Livestock Health Distribution
          </p>
          {loading ? (
            <Skeleton />
          ) : (
            <div className="flex items-center gap-6">
              <DonutChart
                size={140}
                thickness={16}
                centerLabel={pct(healthyCount, totalAnimals)}
                centerSub="Healthy"
                total={totalAnimals}
                segments={[
                  { value: healthyCount, color: "#4CAF50" },
                  { value: sickCount, color: "#ef4444" },
                  { value: recoveringCount, color: "#60a5fa" },
                  { value: quarantinedCount, color: "#a78bfa" },
                ]}
              />
              <div className="flex-1 space-y-3">
                <ProgressRow
                  label="Healthy"
                  value={healthyCount}
                  total={totalAnimals}
                  color="#4CAF50"
                />
                <ProgressRow
                  label="Sick"
                  value={sickCount}
                  total={totalAnimals}
                  color="#ef4444"
                />
                <ProgressRow
                  label="Recovering"
                  value={recoveringCount}
                  total={totalAnimals}
                  color="#60a5fa"
                />
                <ProgressRow
                  label="Quarantined"
                  value={quarantinedCount}
                  total={totalAnimals}
                  color="#a78bfa"
                />
              </div>
            </div>
          )}
        </div>

        {/* Task Performance */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-bold text-gray-800 mb-4">
            Task Performance
          </p>
          {loading ? (
            <Skeleton />
          ) : (
            <div className="flex items-center gap-6">
              <DonutChart
                size={140}
                thickness={16}
                centerLabel={pct(tasksCompleted, tasksTotal)}
                centerSub="Completed"
                total={tasksTotal}
                segments={[
                  { value: tasksCompleted, color: "#4CAF50" },
                  { value: tasksPending, color: "#f59e0b" },
                  { value: tasksOverdue, color: "#ef4444" },
                ]}
              />
              <div className="flex-1 space-y-3">
                <ProgressRow
                  label="Completed"
                  value={tasksCompleted}
                  total={tasksTotal}
                  color="#4CAF50"
                />
                <ProgressRow
                  label="Pending"
                  value={tasksPending}
                  total={tasksTotal}
                  color="#f59e0b"
                />
                <ProgressRow
                  label="Overdue"
                  value={tasksOverdue}
                  total={tasksTotal}
                  color="#ef4444"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inventory breakdown + Low stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Inventory by Category */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-gray-800">
              Inventory by Category
            </p>
            <p className="text-xs text-gray-400">
              {fmtNum(totalItems)} items · {fmtNum(totalQty)} units total
            </p>
          </div>
          {loading ? (
            <Skeleton />
          ) : invBars.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">
              No inventory data
            </p>
          ) : (
            <BarChart data={invBars} />
          )}
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-gray-800">Low Stock Items</p>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${lowStockCount > 0 ? "bg-red-50 text-red-500" : "bg-[#f0fdf4] text-[#4CAF50]"}`}
            >
              {lowStockCount > 0 ? `${lowStockCount} items low` : "All stocked"}
            </span>
          </div>
          {loading ? (
            <Skeleton />
          ) : (
            <div className="space-y-3">
              {items
                .filter((i) => i.isLowStock)
                .slice(0, 6)
                .map((item) => (
                  <div
                    key={item.publicId}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold text-gray-700">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-gray-400 capitalize">
                        {item.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-red-500">
                        {item.quantityOnHand} {item.unit}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        min: {item.reorderLevel}
                      </p>
                    </div>
                  </div>
                ))}
              {lowStockCount === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">
                  🎉 All items are well stocked
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Top Performers + Vaccination */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Performers */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-bold text-gray-800 mb-4">Top Performers</p>
          {loading ? (
            <Skeleton />
          ) : topPerformers.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">
              No performance data yet
            </p>
          ) : (
            <div className="space-y-3">
              {topPerformers.slice(0, 5).map((p, i) => {
                const name =
                  [p.firstName, p.lastName].filter(Boolean).join(" ") ||
                  p.email ||
                  "—";
                const completed = p.completedTasks ?? 0;
                const approved = p.approvedSubmissions ?? 0;
                const score = completed + approved;
                const maxScore =
                  (topPerformers[0]?.completedTasks ?? 0) +
                    (topPerformers[0]?.approvedSubmissions ?? 0) || 1;
                return (
                  <div key={p.id ?? i} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                        i === 0
                          ? "bg-amber-400"
                          : i === 1
                            ? "bg-gray-400"
                            : i === 2
                              ? "bg-orange-400"
                              : "bg-gray-200"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 truncate">
                        {name}
                      </p>
                      <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-[#4CAF50] rounded-full transition-all"
                          style={{
                            width: `${Math.min((score / maxScore) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-gray-700">
                        {completed} tasks
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {approved} approved
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Vaccination Alerts Summary */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-bold text-gray-800 mb-4">
            Vaccination Status
          </p>
          {loading ? (
            <Skeleton />
          ) : (
            <div className="space-y-4">
              {[
                {
                  label: "Overdue",
                  value: dash?.vaccinationAlerts?.overdue ?? 0,
                  color: "#ef4444",
                  icon: "🔴",
                },
                {
                  label: "Due Today",
                  value: dash?.vaccinationAlerts?.dueToday ?? 0,
                  color: "#f59e0b",
                  icon: "🟡",
                },
                {
                  label: "Upcoming",
                  value: dash?.vaccinationAlerts?.upcoming ?? 0,
                  color: "#60a5fa",
                  icon: "🔵",
                },
                {
                  label: "Overdue on vax",
                  value: overdueVax,
                  color: "#a78bfa",
                  icon: "💉",
                },
              ].map(({ label, value, color, icon }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{icon}</span>
                    <p className="text-xs text-gray-600">{label}</p>
                  </div>
                  <p
                    className={`text-sm font-bold ${value > 0 ? "text-red-500" : "text-[#4CAF50]"}`}
                  >
                    {fmtNum(value)}
                  </p>
                </div>
              ))}

              {overdueVax === 0 &&
                (dash?.vaccinationAlerts?.overdue ?? 0) === 0 && (
                  <p className="text-xs text-[#4CAF50] text-center font-medium pt-2">
                    ✅ All vaccinations up to date
                  </p>
                )}
            </div>
          )}
        </div>
      </div>

      {/* Concerns Summary */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <p className="text-sm font-bold text-gray-800 mb-4">
          Concerns Overview
        </p>
        {loading ? (
          <div className="h-16 bg-gray-100 rounded-xl animate-pulse" />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Open",
                value: dash?.concerns?.open ?? 0,
                color: "#f59e0b",
                icon: "📋",
              },
              {
                label: "Urgent",
                value: dash?.concerns?.urgent ?? 0,
                color: "#ef4444",
                icon: "🚨",
              },
              {
                label: "Resolved",
                value: dash?.concerns?.resolved ?? 0,
                color: "#4CAF50",
                icon: "✅",
              },
              {
                label: "Dismissed",
                value: dash?.concerns?.dismissed ?? 0,
                color: "#9ca3af",
                icon: "🚫",
              },
            ].map(({ label, value, color, icon }) => (
              <div
                key={label}
                className="text-center p-4 rounded-xl bg-gray-50 border border-gray-100"
              >
                <p className="text-2xl mb-1">{icon}</p>
                <p className="text-xl font-bold" style={{ color }}>
                  {fmtNum(value)}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
