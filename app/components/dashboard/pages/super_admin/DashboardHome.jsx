"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  Building2,
  Ticket,
  RefreshCw,
  ArrowRight,
  Heart,
  Package,
  Syringe,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getToken() {
  return localStorage.getItem("sr_token") ?? "";
}
function fmtNum(n) {
  return n != null ? Number(n).toLocaleString() : "—";
}
function formatDate(str) {
  if (!str) return "—";
  return new Date(str).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  subColor = "text-gray-400",
  icon: Icon,
  iconBg,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start justify-between">
      <div>
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value ?? "—"}</p>
        {sub && <p className={`text-xs mt-1 font-medium ${subColor}`}>{sub}</p>}
      </div>
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
      >
        <Icon size={18} className="text-white" />
      </div>
    </div>
  );
}

// ── Ranch Health Table ────────────────────────────────────────────────────────

function RanchHealthTable({ ranches }) {
  if (!ranches?.length)
    return (
      <p className="text-sm text-gray-400 text-center py-6">No ranch data</p>
    );
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100">
            {["Ranch", "Animals", "Open Concerns", "Low Stock"].map((col) => (
              <th
                key={col}
                className="text-left py-2.5 px-4 text-gray-400 font-medium whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ranches.map((r, i) => (
            <tr
              key={r.id ?? i}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4 font-semibold text-gray-800">
                {r.name}
              </td>
              <td className="py-3 px-4 text-gray-600">
                {fmtNum(r.totalAnimals)}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`font-semibold ${r.openConcerns > 0 ? "text-amber-500" : "text-[#4CAF50]"}`}
                >
                  {fmtNum(r.openConcerns)}
                </span>
              </td>
              <td className="py-3 px-4">
                <span
                  className={`font-semibold ${r.lowStockItems > 0 ? "text-red-500" : "text-[#4CAF50]"}`}
                >
                  {fmtNum(r.lowStockItems)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Recent Users ──────────────────────────────────────────────────────────────

function RecentUserRow({ user }) {
  const roleColor =
    {
      super_admin: "bg-purple-50 text-purple-600",
      admin: "bg-blue-50   text-blue-600",
      user: "bg-gray-100  text-gray-500",
    }[user.platformRole ?? "user"] ?? "bg-gray-100 text-gray-500";

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#0f172a] flex items-center justify-center shrink-0">
          <span className="text-white text-[10px] font-bold">
            {`${(user.firstName ?? "")[0] ?? ""}${(user.lastName ?? "")[0] ?? ""}`.toUpperCase() ||
              "?"}
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-800">
            {[user.firstName, user.lastName].filter(Boolean).join(" ") ||
              user.email}
          </p>
          <p className="text-[10px] text-gray-400">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${roleColor}`}
        >
          {(user.platformRole ?? "user").replace(/_/g, " ")}
        </span>
        <span className="text-[10px] text-gray-400">
          {formatDate(user.createdAt)}
        </span>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DashboardHome({ setActive }) {
  const [dash, setDash] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        const j = await res.json();
        setDash(j?.data ?? j);
      }
    } catch (err) {
      console.error("SA Dashboard:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const ov = dash?.overview ?? {};
  const Skeleton = ({ h = "h-24" }) => (
    <div className={`${h} bg-gray-100 rounded-xl animate-pulse`} />
  );

  const stats = [
    {
      label: "Total Users",
      value: fmtNum(ov.totalUsers),
      sub: `${fmtNum(ov.activeUsers)} active`,
      subColor: "text-[#4CAF50]",
      icon: Users,
      iconBg: "bg-[#0f172a]",
    },
    {
      label: "Total Ranches",
      value: fmtNum(ov.totalRanches),
      sub: `${fmtNum(ov.totalMemberships)} memberships`,
      subColor: "text-blue-500",
      icon: Building2,
      iconBg: "bg-blue-500",
    },
    {
      label: "Open Concerns",
      value: fmtNum(ov.openConcerns),
      sub: "Across all ranches",
      subColor: "text-amber-500",
      icon: Ticket,
      iconBg: "bg-amber-500",
    },
    {
      label: "Total Animals",
      value: fmtNum(ov.totalAnimals),
      sub: `${fmtNum(ov.overdueVaccinations)} vax overdue`,
      subColor: "text-red-400",
      icon: Heart,
      iconBg: "bg-[#4CAF50]",
    },
    {
      label: "Low Stock Items",
      value: fmtNum(ov.lowStockItems),
      sub: "Needs restocking",
      subColor: "text-red-500",
      icon: Package,
      iconBg: "bg-red-500",
    },
    {
      label: "Overdue Vaccinations",
      value: fmtNum(ov.overdueVaccinations),
      sub: "Animals overdue",
      subColor: "text-orange-500",
      icon: Syringe,
      iconBg: "bg-orange-500",
    },
  ];

  return (
    <div className="px-6 py-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-800">
            Platform Overview
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Real-time platform metrics
          </p>
        </div>
        <button
          onClick={fetchAll}
          className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Stat cards — 3 cols on desktop */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      )}

      {/* Ranch Health + Recent Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ranch Health */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-gray-800">Ranch Health</p>
            <button
              onClick={() => setActive("ranches")}
              className="flex items-center gap-1 text-xs text-[#4CAF50] font-semibold hover:underline"
            >
              See All <ArrowRight size={12} />
            </button>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} h="h-10" />
              ))}
            </div>
          ) : (
            <RanchHealthTable ranches={dash?.ranchHealth} />
          )}
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-gray-800">Recent Users</p>
            <button
              onClick={() => setActive("users")}
              className="flex items-center gap-1 text-xs text-[#4CAF50] font-semibold hover:underline"
            >
              See All <ArrowRight size={12} />
            </button>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} h="h-12" />
              ))}
            </div>
          ) : (dash?.recentUsers ?? []).length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">
              No users yet
            </p>
          ) : (
            (dash?.recentUsers ?? []).map((u, i) => (
              <RecentUserRow key={u.id ?? i} user={u} />
            ))
          )}
        </div>
      </div>

      {/* Recent Ranches */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold text-gray-800">Recent Ranches</p>
          <button
            onClick={() => setActive("ranches")}
            className="flex items-center gap-1 text-xs text-[#4CAF50] font-semibold hover:underline"
          >
            See All <ArrowRight size={12} />
          </button>
        </div>
        {loading ? (
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} h="h-20" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(dash?.recentRanches ?? []).map((r, i) => (
              <div
                key={r.id ?? i}
                className="bg-gray-50 rounded-xl p-4 border border-gray-100"
              >
                <p className="text-sm font-bold text-gray-800">{r.name}</p>
                <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                  {r.slug}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
