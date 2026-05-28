"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import Sidebar from "../../shared/Sidebar";
import Topbar from "../../shared/Topbar";
import StatCard from "../../shared/StatCard";
import {
  LineChart,
  DonutChart,
} from "../../shared/Charts";
import AnalyticsPage from "../../pages/owner/Analyticspage";
import LivestockPage from "../../pages/owner/LivestckOverview";
import RequestsApprovalsPage from "../../pages/owner/RequestAprrovalPage";
import StaffManagementPage from "../../pages/owner/StaffManagementPage";
import NotificationsPage from "../../pages/owner/NotificationsPage";
import SettingsPage from "../../pages/owner/SettingsPage";
import InventoryPage from "../../pages/storekeeper/InventoryPage";
import StockLedgerPage from "../../pages/storekeeper/StockLedgerPage";
import Image from "next/image";
import { useAuth } from "../../../../context/AuthContext";

const API = process.env.NEXT_PUBLIC_API_URL;

// Safe client-side only accessors
function getSlug() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_token") ?? "";
}

export default function OwnerDashboard() {
  const { user } = useAuth();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [dashData, setDashData] = useState(null);
  const [dashLoading, setDashLoading] = useState(true);
  const [invTab, setInvTab] = useState("Items");

  const fetchDashboard = async () => {
    setDashLoading(true);
    try {
      const res = await fetch(`${API}/ranches/${getSlug()}/dashboard`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      console.log("✅ Dashboard data:", json);
      setDashData(json?.data?.data ?? json?.data ?? json);
    } catch {
      // keep dashData null → UI falls back to demo values
    } finally {
      setDashLoading(false);
    }
  };

  useEffect(() => {
    if (activeItem === "Dashboard") fetchDashboard();
  }, [activeItem]);

  // ── Map API fields precisely from real response ───────────────────────────
  const ranchName = getSlug() || "Your Ranch";
  const ranchId = getSlug() || "—";

  // Animals
  const livestockCount = dashData?.animals?.total ?? "—";
  const sickAnimals = dashData?.animals?.sick ?? 0;
  const activeAnimals = dashData?.animals?.active ?? 0;

  // Inventory
  const inventoryTotal = dashData?.inventory?.totalItems ?? "—";
  const lowStock = dashData?.inventory?.lowStockItems ?? 0;
  const totalQty = dashData?.inventory?.totalQuantityOnHand ?? "—";

  // Tasks
  const tasksPending = dashData?.tasks?.pending ?? "—";
  const tasksTotal = dashData?.tasks?.total ?? "—";
  const tasksCompleted = dashData?.tasks?.completed ?? "—";

  // Members
  const membersTotal = dashData?.members?.total ?? "—";

  // Concerns
  const concernsOpen = dashData?.concerns?.open ?? "—";
  const concernsUrgent = dashData?.concerns?.urgent ?? 0;

  // Vaccination alerts
  const vaxOverdue = dashData?.vaccinationAlerts?.overdue ?? 0;
  const vaxDueToday = dashData?.vaccinationAlerts?.dueToday ?? 0;

  // Top performers for worker performance section
  const topPerformers = dashData?.topPerformers ?? [];

  // Low stock items
  const lowStockItems = dashData?.lowStockItemsList ?? [];

  // Recent activity
  const recentActivity = dashData?.recentActivity ?? [];

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar
        activeItem={activeItem}
        onNavClick={(href) => {
          const map = {
            "/dashboard": "Dashboard",
            "/analytics": "Analytics & Reports",
            "/livestock": "Livestock Overview",
            "/requests": "Requests & Approvals",
            "/staff": "Staff Management",
            "/notifications": "Notifications",
            "/settings": "Settings",
            "/inventory": "Inventory",
          };
          if (map[href]) setActiveItem(map[href]);
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar userInitials={user?.initials ?? "AH"} notificationCount={1} />

        {activeItem === "Analytics & Reports" ? (
          <AnalyticsPage />
        ) : activeItem === "Livestock Overview" ? (
          <LivestockPage />
        ) : activeItem === "Requests & Approvals" ? (
          <RequestsApprovalsPage />
        ) : activeItem === "Staff Management" ? (
          <StaffManagementPage />
        ) : activeItem === "Notifications" ? (
          <NotificationsPage />
        ) : activeItem === "Settings" ? (
          <SettingsPage />
        ) : activeItem === "Inventory" ? (
          <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-base font-bold text-gray-800">Inventory</h1>
                <p className="text-xs text-gray-400 mt-0.5">
                  Read-only view — managed by storekeeper
                </p>
              </div>
            </div>
            <div className="flex gap-1 bg-gray-100 rounded-full p-1 w-fit mb-2">
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
        ) : (
          <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {/* Welcome */}
            <div className="flex items-center justify-between">
              <h1 className="text-base font-bold text-gray-800">
                Welcome, {ranchName}
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                Ranch ID:{" "}
                <span className="font-semibold text-gray-600">{ranchId}</span>
                <button
                  onClick={fetchDashboard}
                  className="hover:text-[#4CAF50] transition-colors"
                  title="Refresh"
                >
                  <RefreshCw
                    size={12}
                    className={dashLoading ? "animate-spin" : ""}
                  />
                </button>
              </div>
            </div>

            {/* Stat Cards — real data */}
            <div className="lg:flex gap-4">
              <div className="md:flex gap-4 w-full lg:w-1/2 mb-5 lg:mb-0">
                <div className="w-full md:w-1/2 mb-4 md:mb-0 relative">
                  <StatCard title="Livestock Population" badge="Total">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-4xl font-bold text-gray-800 mb-1">
                          {livestockCount}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {activeAnimals} active · {sickAnimals} sick
                        </p>
                      </div>
                      <Image
                        src="/images/chat.png"
                        width={50}
                        height={50}
                        alt="chart"
                      />
                    </div>
                  </StatCard>
                </div>
                <div className="w-full md:w-1/2">
                  <StatCard
                    title="Inventory"
                    badge="Stock"
                    badgeColor="bg-amber-50 text-amber-500"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-4xl font-bold text-gray-800 mb-1">
                          {inventoryTotal}
                        </p>
                        <p className="text-[10px] text-red-400 font-medium">
                          {lowStock} low stock
                        </p>
                      </div>
                      <Image
                        src="/images/chat.png"
                        width={50}
                        height={50}
                        alt="chart"
                      />
                    </div>
                  </StatCard>
                </div>
              </div>
              <div className="md:flex gap-4 w-full lg:w-1/2">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <StatCard title="Tasks" badge="Today">
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {[
                        { label: "Pending", val: tasksPending },
                        { label: "Completed", val: tasksCompleted },
                      ].map(({ label, val }) => (
                        <div
                          key={label}
                          className="nth-[1]:border-r-2 border-gray-400 mr-5"
                        >
                          <p className="text-[10px] text-gray-400">{label}</p>
                          <p className="text-3xl font-bold text-gray-800">
                            {dashLoading ? "—" : val}
                          </p>
                        </div>
                      ))}
                    </div>
                  </StatCard>
                </div>
                <div className="w-full md:w-1/2">
                  <StatCard title="Concerns" badge="Open">
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {[
                        { label: "Open", val: concernsOpen },
                        { label: "Urgent", val: concernsUrgent },
                      ].map(({ label, val }) => (
                        <div
                          key={label}
                          className="nth-[1]:border-r-2 border-gray-400 mr-5"
                        >
                          <p className="text-[10px] text-gray-400">{label}</p>
                          <p
                            className={`text-3xl font-bold ${label === "Urgent" && val > 0 ? "text-red-500" : "text-gray-800"}`}
                          >
                            {dashLoading ? "—" : val}
                          </p>
                        </div>
                      ))}
                    </div>
                  </StatCard>
                </div>
              </div>
            </div>

            {/* Vaccination Alerts banner — only show if overdue */}
            {!dashLoading && vaxOverdue > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">💉</span>
                  <div>
                    <p className="text-xs font-bold text-amber-700">
                      {vaxOverdue} vaccination{vaxOverdue !== 1 ? "s" : ""}{" "}
                      overdue
                    </p>
                    {vaxDueToday > 0 && (
                      <p className="text-[10px] text-amber-500">
                        {vaxDueToday} due today
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setActiveItem("Livestock Overview")}
                  className="text-xs text-amber-600 font-semibold hover:underline"
                >
                  View →
                </button>
              </div>
            )}

            {/* Low stock banner */}
            {!dashLoading && lowStockItems.length > 0 && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-5 py-3">
                <p className="text-xs font-bold text-red-600 mb-1">
                  ⚠️ Low Stock Alert
                </p>
                <div className="flex flex-wrap gap-2">
                  {lowStockItems.map((item) => (
                    <span
                      key={item.publicId}
                      className="text-[11px] text-red-500 bg-red-100 px-2 py-0.5 rounded-full"
                    >
                      {item.name}: {item.quantityOnHand} {item.unit} left
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Charts — kept as-is with demo data since API doesn't return chart series */}
            <div className="flex gap-4 flex-wrap-reverse">
              <LineChart
                title="Feed Consumption Trend"
                period="30 days"
                labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                data={[
                  180, 320, 490, 410, 550, 420, 380, 510, 460, 390, 430, 480,
                  350, 310,
                ]}
                legend={[
                  { color: "#4CAF50", label: "Avg 510 kg/day" },
                  { color: "#a5d6a7", label: "Peaked at 630 kg last week" },
                ]}
              />
              <DonutChart
                title="Animals by Status"
                value={
                  dashData
                    ? Math.round((activeAnimals / (livestockCount || 1)) * 100)
                    : 73
                }
                color="#4CAF50"
                trackColor="#f59e0b"
                period="Total"
                legend={[
                  { color: "#4CAF50", label: `Active – ${activeAnimals}` },
                  { color: "#f59e0b", label: `Sick – ${sickAnimals}` },
                ]}
              />
              <DonutChart
                title="Task Progress"
                value={
                  dashData
                    ? Math.round((tasksCompleted / (tasksTotal || 1)) * 100)
                    : 30
                }
                label={
                  dashData
                    ? `${Math.round((tasksCompleted / (tasksTotal || 1)) * 100)}%`
                    : "30%"
                }
                color="#4CAF50"
                trackColor="#f59e0b"
                period="This Month"
                legend={[
                  { color: "#4CAF50", label: `Completed – ${tasksCompleted}` },
                  { color: "#f59e0b", label: `Pending – ${tasksPending}` },
                ]}
              />
            </div>

            {/* Recent Concerns */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div>
                  <h3 className="text-sm font-bold text-gray-800">
                    Recent Concerns
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Latest issues raised by staff
                  </p>
                </div>
                <button
                  onClick={() => setActiveItem("Requests & Approvals")}
                  className="text-xs text-[#4CAF50] font-semibold hover:underline flex items-center gap-1"
                >
                  See All →
                </button>
              </div>

              {(dashData?.recentAssignedConcerns ?? []).length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-gray-400">No recent concerns 🎉</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {(dashData?.recentAssignedConcerns ?? [])
                    .slice(0, 5)
                    .map((r, i) => {
                      const statusCls =
                        {
                          open: "bg-amber-50  text-amber-500",
                          in_review: "bg-blue-50   text-blue-500",
                          resolved: "bg-[#f0fdf4] text-[#4CAF50]",
                          dismissed: "bg-gray-100  text-gray-400",
                        }[(r.status ?? "open").toLowerCase()] ??
                        "bg-gray-100 text-gray-500";

                      const priorityCls =
                        {
                          low: "bg-gray-100  text-gray-500",
                          medium: "bg-amber-50  text-amber-500",
                          high: "bg-orange-50 text-orange-500",
                          urgent: "bg-red-50    text-red-500",
                        }[(r.priority ?? "low").toLowerCase()] ??
                        "bg-gray-100 text-gray-500";

                      const raisedBy =
                        r.raisedBy?.name || r.raisedBy?.email || "—";

                      return (
                        <div
                          key={r.publicId ?? i}
                          className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => setActiveItem("Requests & Approvals")}
                        >
                          <div className="flex-1 min-w-0 pr-4">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {r.title ?? "—"}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-0.5 capitalize">
                              {r.category ?? "—"} · By {raisedBy}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${priorityCls}`}
                            >
                              {r.priority ?? "—"}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${statusCls}`}
                            >
                              {(r.status ?? "open").replace(/_/g, " ")}
                            </span>
                            <span className="text-[10px] text-gray-400 whitespace-nowrap">
                              {r.createdAt
                                ? new Date(r.createdAt).toLocaleDateString(
                                    "en-GB",
                                    { day: "2-digit", month: "short" },
                                  )
                                : "—"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
