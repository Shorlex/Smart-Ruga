"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import Sidebar from "../../components/dashboard/shared/Sidebar";
import Topbar from "../../components/dashboard/shared/Topbar";
import StatCard from "../../components/dashboard/shared/StatCard";
import {
  LineChart,
  DonutChart,
} from "../../components/dashboard/shared/Charts";
import DataTable from "../../components/dashboard/shared/DataTable";
import AnalyticsPage from "../../components/dashboard/pages/owner/Analyticspage";
import LivestockPage from "../../components/dashboard/pages/owner/LivestckOverview";
import RequestsApprovalsPage from "../../components/dashboard/pages/owner/RequestAprrovalPage";
import StaffManagementPage from "../../components/dashboard/pages/owner/StaffManagementPage";
import NotificationsPage from "../../components/dashboard/pages/owner/NotificationsPage";
import SettingsPage from "../../components/dashboard/pages/owner/SettingsPage";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";

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

  // Pending requests from recentAssignedConcerns
  const pendingRequests = (dashData?.recentAssignedConcerns ?? []).map((r) => ({
    id: r.publicId ?? "—",
    date: r.createdAt
      ? new Date(r.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—",
    type: r.category ?? "—",
    item: r.title ?? "—",
    qty: "—",
    cost: "—",
    by: r.priority ?? "—",
  }));

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

            {/* Pending Requests Table */}
            <DataTable
              title="Recent Concerns"
              columns={[
                "ID",
                "Date",
                "Category",
                "Title",
                "Priority",
                "Status",
                "—",
              ]}
              dataKeys={["id", "date", "type", "item", "qty", "cost", "by"]}
              rows={
                pendingRequests.length > 0
                  ? pendingRequests
                  : [
                      {
                        id: "—",
                        date: "—",
                        type: "No concerns",
                        item: "All clear",
                        qty: "—",
                        cost: "—",
                        by: "—",
                      },
                    ]
              }
              onApprove={(row) => console.log("Approved", row)}
              onDecline={(row) => console.log("Declined", row)}
            />
          </main>
        )}
      </div>
    </div>
  );
}
