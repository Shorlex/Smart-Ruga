"use client";

import { useState } from "react";
import Sidebar from "../../shared/Sidebar";
import Topbar from "../../shared/Topbar";
import { LineChart } from "../../shared/Charts";
import DataTable from "../../shared/DataTable";
import {
  LayoutDashboard,
  ClipboardList,
  BookOpen,
  Users,
  ClipboardCheck,
  BarChart2,
  Bell,
  Settings,
  Copy,
} from "lucide-react";
import TaskManagementPage from "./TaskManagement";
import LivestockPage from "../owner/LivestckOverview";
import StaffManagementPage from "../owner/StaffManagementPage";
import RequestsApprovalsPage from "../owner/RequestAprrovalPage";
import NotificationsPage from "../owner/NotificationsPage";
import SettingsPage from "../owner/SettingsPage";
import ReportsPage from "./ReportsPage";

// ── Manager nav items ─────────────────────────────────────────────────────────

const managerNav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Task Management", icon: ClipboardList, href: "/tasks" },
  { label: "Livestock Records", icon: BookOpen, href: "/livestock" },
  { label: "Staff Management", icon: Users, href: "/staff" },
  { label: "Requests & Approvals", icon: ClipboardCheck, href: "/requests" },
  { label: "Reports", icon: BarChart2, href: "/reports" },
  { label: "Notifications", icon: Bell, href: "/notifications" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

// ── Placeholder data ──────────────────────────────────────────────────────────

const quickAlerts = [
  {
    type: "Livestock Health",
    description: "Cow #1123 flagged sick (Fever & Cough)",
    by: "Worker Musa",
    datetime: "10 Sept/6:30PM",
  },
  {
    type: "Livestock Health",
    description: "Cow #1123 flagged sick (Fever & Cough)",
    by: "Worker Musa",
    datetime: "10 Sept/6:30PM",
  },
  {
    type: "Livestock Health",
    description: "Cow #1123 flagged sick (Fever & Cough)",
    by: "Worker Musa",
    datetime: "10 Sept/6:30PM",
  },
];

const workerPerformance = [
  {
    name: "Aliyu (Worker #011)",
    assigned: "12 Field Tasks",
    completed: "12 Tasks Completed",
    completion: "100%",
    issues: "0 Issues",
    status: "Excellent",
  },
  {
    name: "Musa (Worker #012)",
    assigned: "10 Field Tasks",
    completed: "8 Tasks Completed",
    completion: "80%",
    issues: "1 Issue",
    status: "Good",
  },
  {
    name: "Kola (Worker #013)",
    assigned: "12 Field Tasks",
    completed: "6 Tasks Completed",
    completion: "50%",
    issues: "3 Issues",
    status: "Average",
  },
];

// ── Active Tasks Overview card ────────────────────────────────────────────────

function ActiveTasksCard() {
  const stats = [
    { label: "Total Tasks Today", value: "01", sub: null },
    { label: "Completed", value: "08", sub: "(67%)" },
    { label: "Pending", value: "04", sub: "(67%)" },
    { label: "Overdue", value: "01", sub: null },
  ];

  return (
    <div className="flex-1 rounded-xl bg-[linear-gradient(135deg,#DCFFA2_0%,#DCFFA2_60%,#FDE7C5_100%)] border border-[#d1fae5] p-5">
      <p className="text-sm font-bold text-gray-700 mb-4">
        Active Tasks Overview
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 items-end gap-4 divide-x divide-gray-400">
        {stats.map(({ label, value, sub }) => (
          <div key={label} className="flex-1 px-4 first:pl-0">
            <p className="text-[10px] text-gray-500 mb-1">{label}</p>
            <p className="text-3xl font-bold text-gray-800 leading-none">
              {value}
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

// ── Feed & Store Balance card ─────────────────────────────────────────────────

function FeedStoreCard() {
  const items = [
    { label: "Maize Feed (Kg)", value: "1200", unit: "Kg" },
    { label: "Soy Feed (Kg)", value: "900", unit: "Kg" },
    { label: "Medicines (Doses)", value: "25", unit: "(antibiotics)" },
    { label: "Ear Tags", value: "12", unit: null },
  ];

  return (
    <div className="flex-1 rounded-xl bg-[linear-gradient(135deg,#DCFFA2_0%,#DCFFA2_60%,#FDE7C5_100%)] border border-[#d1fae5] p-5">
      <p className="text-sm font-bold text-gray-700 mb-4">
        Feed & Store Balance
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 items-end gap-4 divide-x divide-gray-400">
        {items.map(({ label, value, unit }) => (
          <div key={label} className="flex-1 px-4 first:pl-0">
            <p className="text-[10px] text-gray-500 mb-1">{label}</p>
            <p className="text-3xl font-bold text-gray-800 leading-none">
              {value}
              {unit && (
                <span className="text-xs font-medium text-gray-500 ml-0.5">
                  {unit}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Quick Alerts table ────────────────────────────────────────────────────────

function QuickAlerts({ rows }) {
  return (
    <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5 min-w-0 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800">Quick Alerts</h3>
        <button className="text-xs text-[#4CAF50] font-medium hover:underline">
          See All
        </button>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100">
            {["Alert Type", "Description", "Reported By", "Date & Time"].map(
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
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-3 whitespace-nowrap">
                <span className="flex items-center gap-1.5 font-medium text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  {row.type}
                </span>
              </td>
              <td className="py-3 px-3 text-gray-500">{row.description}</td>
              <td className="py-3 px-3 text-gray-600 whitespace-nowrap">
                {row.by}
              </td>
              <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                {row.datetime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Worker Performance table ──────────────────────────────────────────────────

const statusColors = {
  Excellent: "text-[#4CAF50]",
  Good: "text-blue-500",
  Average: "text-amber-500",
  Poor: "text-red-500",
};

function WorkerPerformance({ rows }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800">Worker Performance</h3>
        <button className="text-xs text-[#4CAF50] font-medium hover:underline">
          See All
        </button>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100">
            {[
              "Worker Name",
              "Tasks Assigned",
              "Tasks Completed",
              "Completion %",
              "Issues Logged",
              "Performance Status",
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
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">
                {row.name}
              </td>
              <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                {row.assigned}
              </td>
              <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                {row.completed}
              </td>
              <td className="py-3 px-4 text-gray-700 font-semibold whitespace-nowrap">
                {row.completion}
              </td>
              <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                {row.issues}
              </td>
              <td className="py-3 px-4 whitespace-nowrap">
                <span
                  className={`flex items-center gap-1.5 font-semibold ${statusColors[row.status] ?? "text-gray-500"}`}
                >
                  <span className="w-2 h-2 rounded-full bg-current" />
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Page map — extend as more manager pages are built ─────────────────────────

const pageMap = {
  Dashboard: null, // rendered inline below
  // "Task Management":      <TaskManagementPage />,  ← add as built
  // "Livestock Records":    <LivestockRecordsPage />, ← add as built
};

// ── Manager Dashboard shell ───────────────────────────────────────────────────

export default function ManagerDashboard() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const hrefToLabel = managerNav.reduce((acc, { href, label }) => {
    acc[href] = label;
    return acc;
  }, {});

  return (
    <div className="flex h-screen bg-gray-50 pb-15 font-sans overflow-hidden">
      <Sidebar
        activeItem={activeItem}
        navItems={managerNav}
        user={{
          name: "Amin Danladi",
          email: "Danladmin@mail.com",
          initials: "AD",
        }}
        onNavClick={(href) => {
          const label = hrefToLabel[href];
          if (label) setActiveItem(label);
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar userInitials="AD" notificationCount={2} />

        {/* Dashboard home */}
        {activeItem === "Dashboard" && (
          <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {/* Welcome */}
            <div className="flex items-center justify-between">
              <h1 className="text-base font-bold text-gray-800">
                Welcome Back, Amin
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                Ranch ID:{" "}
                <span className="font-semibold text-gray-600">RAN-45821</span>
                <button className="hover:text-[#4CAF50] transition-colors">
                  <Copy size={12} />
                </button>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ActiveTasksCard />
              <FeedStoreCard />
            </div>

            {/* Alerts + Chart */}
            <div className="grid grid-cols-1 lg:flex gap-4">
              <QuickAlerts rows={quickAlerts} />
              <div className="w-[380px] shrink-0">
                <LineChart
                  title="Feed Consumption Trend"
                  period="30 days"
                  labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
                  data={[
                    180, 320, 490, 410, 550, 420, 380, 510, 460, 390, 430, 480,
                  ]}
                  legend={[
                    { color: "#4CAF50", label: "Avg 510 kg/day" },
                    { color: "#a5d6a7", label: "Peaked at 630 kg last week" },
                  ]}
                />
              </div>
            </div>

            {/* Worker Performance */}
            <WorkerPerformance rows={workerPerformance} />
          </main>
        )}

        {/* Task Management */}
        {activeItem === "Task Management" ? (
          <TaskManagementPage />
        ) : activeItem === "Livestock Records" ? (
          <LivestockPage />
        ) : activeItem === "Staff Management" ? (
          <StaffManagementPage />
        ) : activeItem === "Requests & Approvals" ? (
          <RequestsApprovalsPage />
        ) : activeItem === "Notifications" ? (
          <NotificationsPage />
        ) : activeItem === "Settings" ? (
          <SettingsPage />
        ) : (
          activeItem === "Reports" && <ReportsPage />
        )}

        {/* Placeholder for pages not yet built */}
        {activeItem !== "Dashboard" &&
          activeItem !== "Task Management" &&
          activeItem !== "Livestock Records" &&
          activeItem !== "Staff Management" &&
          activeItem !== "Requests & Approvals" &&
          activeItem !== "Notifications" &&
          activeItem !== "Settings" &&
          activeItem !== "Reports" && (
            <main className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              {activeItem} — coming soon
            </main>
          )}
      </div>
    </div>
  );
}
