"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../../context/AuthContext";
import Sidebar from "../../shared/Sidebar";
import Topbar from "../../shared/Topbar";
import { LineChart } from "../../shared/Charts";
import {
  LayoutDashboard,
  ClipboardList,
  BookOpen,
  Users,
  ClipboardCheck,
  BarChart2,
  Bell,
  Settings,
  Package,
} from "lucide-react";
import TaskManagementPage from "./TaskManagement";
import LivestockPage from "../../pages/owner/LivestckOverview";
import StaffManagementPage from "../../pages/owner/StaffManagementPage";
import RequestsApprovalsPage from "../../pages/owner/RequestAprrovalPage";
import NotificationsPage from "../../pages/owner/NotificationsPage";
import SettingsPage from "../../shared/Settings";
import ReportsPage from "./ReportsPage";
import InventoryPage from "../../pages/storekeeper/InventoryPage";
import StockLedgerPage from "../../pages/storekeeper/StockLedgerPage";

const API = process.env.NEXT_PUBLIC_API_URL;
function getSlug() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_token") ?? "";
}

// ── Nav ───────────────────────────────────────────────────────────────────────

const managerNav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Task Management", icon: ClipboardList, href: "/tasks" },
  { label: "Livestock Records", icon: BookOpen, href: "/livestock" },
  { label: "Staff Management", icon: Users, href: "/staff" },
  { label: "Requests & Approvals", icon: ClipboardCheck, href: "/requests" },
  { label: "Inventory", icon: Package, href: "/inventory" },
  { label: "Reports", icon: BarChart2, href: "/reports" },
  { label: "Notifications", icon: Bell, href: "/notifications" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

const hrefToLabel = managerNav.reduce(
  (acc, { href, label }) => ({ ...acc, [href]: label }),
  {},
);

function fmtNum(n) {
  if (!n && n !== 0) return "—";
  return Number(n).toLocaleString();
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

function GradientCard({ title, stats }) {
  return (
    <div className="flex-1 rounded-xl bg-[linear-gradient(135deg,#DCFFA2_0%,#DCFFA2_60%,#FDE7C5_100%)] border border-[#d1fae5] p-5">
      <p className="text-sm font-bold text-gray-700 mb-4">{title}</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-x divide-gray-400">
        {stats.map(({ label, value, sub }) => (
          <div key={label} className="flex-1 px-4 first:pl-0">
            <p className="text-[10px] text-gray-500 mb-1">{label}</p>
            <p className="text-3xl font-bold text-gray-800 leading-none">
              {value ?? "—"}
              {sub && (
                <span className="text-sm font-medium text-gray-500 ml-1">
                  {sub}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Quick Alerts ──────────────────────────────────────────────────────────────

function QuickAlerts({ concerns, onSeeAll }) {
  if (!concerns.length)
    return (
      <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-800">Quick Alerts</h3>
          <button
            onClick={onSeeAll}
            className="text-xs text-[#4CAF50] font-medium hover:underline"
          >
            See All
          </button>
        </div>
        <p className="text-sm text-gray-400 text-center py-6">
          No recent concerns 🎉
        </p>
      </div>
    );

  return (
    <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5 min-w-0 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800">Quick Alerts</h3>
        <button
          onClick={onSeeAll}
          className="text-xs text-[#4CAF50] font-medium hover:underline"
        >
          See All
        </button>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100">
            {["Alert Type", "Description", "Raised By", "Priority"].map(
              (col) => (
                <th
                  key={col}
                  className="text-left py-2 px-3 text-gray-400 font-medium whitespace-nowrap"
                >
                  {col}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {concerns.slice(0, 5).map((c, i) => (
            <tr
              key={c.publicId ?? i}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-3 whitespace-nowrap">
                <span className="flex items-center gap-1.5 font-medium text-gray-700 capitalize">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  {c.category ?? "General"}
                </span>
              </td>
              <td className="py-3 px-3 text-gray-500 max-w-[200px] truncate">
                {c.title ?? "—"}
              </td>
              <td className="py-3 px-3 text-gray-600 whitespace-nowrap">
                {c.raisedBy?.name ?? c.raisedBy?.email ?? "—"}
              </td>
              <td className="py-3 px-3">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                    c.priority === "urgent"
                      ? "bg-red-50 text-red-500"
                      : c.priority === "high"
                        ? "bg-orange-50 text-orange-500"
                        : c.priority === "medium"
                          ? "bg-amber-50 text-amber-500"
                          : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {c.priority ?? "—"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Worker Performance ────────────────────────────────────────────────────────

function WorkerPerformance({ performers, onSeeAll }) {
  const statusLabel = (score) => {
    if (score >= 8) return { label: "Excellent", cls: "text-[#4CAF50]" };
    if (score >= 5) return { label: "Good", cls: "text-blue-500" };
    if (score >= 2) return { label: "Average", cls: "text-amber-500" };
    return { label: "Poor", cls: "text-red-500" };
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800">Worker Performance</h3>
        <button
          onClick={onSeeAll}
          className="text-xs text-[#4CAF50] font-medium hover:underline"
        >
          See All
        </button>
      </div>
      {performers.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">
          No performance data yet
        </p>
      ) : (
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {[
                "Worker Name",
                "Tasks Completed",
                "Approved Submissions",
                "Score",
                "Status",
              ].map((col) => (
                <th
                  key={col}
                  className="text-left py-2 px-4 text-gray-400 font-medium whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {performers.map((p, i) => {
              const name =
                [p.firstName, p.lastName].filter(Boolean).join(" ") ||
                p.email ||
                "—";
              const score =
                (p.completedTasks ?? 0) + (p.approvedSubmissions ?? 0);
              const { label, cls } = statusLabel(score);
              return (
                <tr
                  key={p.id ?? i}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">
                    {name}
                  </td>
                  <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                    {p.completedTasks ?? 0}
                  </td>
                  <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                    {p.approvedSubmissions ?? 0}
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-700 whitespace-nowrap">
                    {score}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`flex items-center gap-1.5 font-semibold ${cls}`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current" />
                      {label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ── Dashboard Home ────────────────────────────────────────────────────────────

function DashboardHome({ setActiveItem }) {
  const auth = useAuth();
  const [dash, setDash] = useState(null);
  const [concerns, setConcerns] = useState([]);
  const [loading, setLoading] = useState(true);

  const firstName = auth?.user?.name?.split(" ")[0] ?? "Manager";

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [dashRes, concernsRes] = await Promise.all([
        fetch(`${API}/ranches/${getSlug()}/dashboard`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
        fetch(`${API}/ranches/${getSlug()}/concerns?status=open`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
      ]);
      if (dashRes.ok) {
        const j = await dashRes.json();
        setDash(j?.data ?? j);
      }
      if (concernsRes.ok) {
        const j = await concernsRes.json();
        setConcerns(
          j?.data?.data?.concerns ?? j?.data?.concerns ?? j?.concerns ?? [],
        );
      }
    } catch (err) {
      console.error("Manager dashboard:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const taskStats = [
    { label: "Total Tasks", value: fmtNum(dash?.tasks?.total) },
    {
      label: "Completed",
      value: fmtNum(dash?.tasks?.completed),
      sub: dash?.tasks?.total
        ? `(${Math.round((dash.tasks.completed / dash.tasks.total) * 100)}%)`
        : null,
    },
    { label: "Pending", value: fmtNum(dash?.tasks?.pending) },
    { label: "Overdue", value: fmtNum(dash?.tasks?.overdue) },
  ];

  const feedStats = [
    { label: "Total Animals", value: fmtNum(dash?.animals?.total) },
    { label: "Healthy", value: fmtNum(dash?.animals?.active) },
    { label: "Sick", value: fmtNum(dash?.animals?.sick) },
    { label: "Low Stock Items", value: fmtNum(dash?.inventory?.lowStockItems) },
  ];

  const Skeleton = ({ h = "h-24" }) => (
    <div className={`${h} bg-gray-100 rounded-xl animate-pulse`} />
  );

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold text-gray-800">
          Welcome Back, {firstName}
        </h1>
        <p className="text-xs text-gray-400">
          {new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Stat cards */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Skeleton h="h-28" />
          <Skeleton h="h-28" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <GradientCard title="Active Tasks Overview" stats={taskStats} />
          <GradientCard title="Ranch At a Glance" stats={feedStats} />
        </div>
      )}

      {/* Alerts + Chart */}
      <div className="grid grid-cols-1 lg:flex gap-4">
        {loading ? (
          <Skeleton h="h-48" />
        ) : (
          <QuickAlerts
            concerns={concerns}
            onSeeAll={() => setActiveItem("Requests & Approvals")}
          />
        )}
        <div className="w-96 shrink-0">
          <LineChart
            title="Tasks This Week"
            period="7 days"
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
            data={[
              dash?.tasks?.completed ?? 0,
              dash?.tasks?.pending ?? 0,
              dash?.tasks?.total ?? 0,
              dash?.tasks?.overdue ?? 0,
              dash?.tasks?.completed ?? 0,
              dash?.tasks?.pending ?? 0,
              dash?.tasks?.total ?? 0,
            ]}
            legend={[
              {
                color: "#4CAF50",
                label: `${dash?.tasks?.completed ?? 0} completed`,
              },
              {
                color: "#f59e0b",
                label: `${dash?.tasks?.pending ?? 0} pending`,
              },
            ]}
          />
        </div>
      </div>

      {/* Worker Performance */}
      {loading ? (
        <Skeleton h="h-48" />
      ) : (
        <WorkerPerformance
          performers={dash?.topPerformers ?? []}
          onSeeAll={() => setActiveItem("Reports")}
        />
      )}
    </main>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────

export default function ManagerDashboard() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [invTab, setInvTab] = useState("Items");
  const auth = useAuth();

  const user = {
    name: auth?.user?.name ?? "Manager",
    email: auth?.user?.email ?? "",
    initials: auth?.user?.initials ?? "MG",
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar
        activeItem={activeItem}
        navItems={managerNav}
        user={user}
        onNavClick={(href) => {
          const label = hrefToLabel[href];
          if (label) setActiveItem(label);
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar userInitials={user.initials} notificationCount={0} />

        {activeItem === "Dashboard" && (
          <DashboardHome setActiveItem={setActiveItem} />
        )}
        {activeItem === "Task Management" && <TaskManagementPage />}
        {activeItem === "Livestock Records" && <LivestockPage />}
        {activeItem === "Staff Management" && <StaffManagementPage />}
        {activeItem === "Requests & Approvals" && <RequestsApprovalsPage />}
        {activeItem === "Inventory" && (
          <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-base font-bold text-gray-800">Inventory</h1>
                <p className="text-xs text-gray-400 mt-0.5">
                  Read-only view — managed by storekeeper
                </p>
              </div>
            </div>
            <div className="flex gap-1 bg-gray-100 rounded-full p-1 w-fit">
              {["Items", "Stock Ledger"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setInvTab(tab)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                    invTab === tab
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {invTab === "Items" ? (
              <InventoryPage isReadOnly />
            ) : (
              <StockLedgerPage isReadOnly />
            )}
          </main>
        )}
        {activeItem === "Reports" && <ReportsPage />}
        {activeItem === "Notifications" && <NotificationsPage />}
        {activeItem === "Settings" && <SettingsPage />}
      </div>
    </div>
  );
}
