"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import Sidebar from "../../shared/Sidebar";
import Topbar from "../../shared/Topbar";
import {
  LayoutDashboard,
  Archive,
  ArrowLeftRight,
  BarChart2,
  ClipboardList,
  Bell,
  Settings,
} from "lucide-react";
import InventoryPage from "./InventoryPage";
import StockLedgerPage from "./StockLedgerPage";
import StorekeeperReportsPage from "./Report";
import Requests from "./Requests";
import AlertsPage from "./AlertsPage";
import SharedSettingsPage from "../../shared/Settings";

// ── Storekeeper nav ───────────────────────────────────────────────────────────

const storekeeperNav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Inventory", icon: Archive, href: "/inventory" },
  { label: "Stock Ledger", icon: ArrowLeftRight, href: "/stock-ledger" },
  { label: "Reports", icon: BarChart2, href: "/reports" },
  { label: "Requests", icon: ClipboardList, href: "/requests" },
  { label: "Alerts", icon: Bell, href: "/alerts" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

// ── Placeholder data ──────────────────────────────────────────────────────────

const activityLogs = [
  {
    date: "16 September 2025",
    action: "Issued",
    item: "Maize Feed",
    qty: "120 kg",
    by: "Worker Aliyu (021)",
    notes: "Morning feeding",
  },
  {
    date: "16 September 2025",
    action: "Received",
    item: "Antibiotics",
    qty: "50 packs",
    by: "Supplier Kano",
    notes: "Restocked",
  },
  {
    date: "15 September 2025",
    action: "Issued",
    item: "Soy Feed",
    qty: "80 kg",
    by: "Worker Musa (012)",
    notes: "Evening feeding",
  },
  {
    date: "15 September 2025",
    action: "Issued",
    item: "Ear Tags",
    qty: "20 units",
    by: "Vet Dr. Halim",
    notes: "New calves",
  },
];

const barData = [
  { label: "Maize", value: 28000, color: "#4CAF50" },
  { label: "Soybeans", value: 22000, color: "#4CAF50" },
  { label: "Antibiotics", value: 5500, color: "#4CAF50" },
  { label: "Ear Tags", value: 8000, color: "#4CAF50" },
  { label: "Supplements", value: 11000, color: "#4CAF50" },
];

const feedDistribution = [
  { label: "Maize", kg: 450, pct: 58, color: "#4CAF50" },
  { label: "Soybeans", kg: 210, pct: 32, color: "#f59e0b" },
  { label: "Supplement", kg: 60, pct: 10, color: "#d9f99d" },
];

const TOTAL_BLOCKS = 20;

// ── Stock Info Card ───────────────────────────────────────────────────────────

function StockCard({ title, items }) {
  return (
    <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5 min-w-0">
      <p className="text-xs font-semibold text-gray-600 mb-4">{title}</p>
      <div className="flex divide-x divide-gray-100">
        {items.map(({ label, value }) => (
          <div key={label} className="flex-1 px-3 first:pl-0">
            <p className="text-[10px] text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Bar Chart (SVG) ───────────────────────────────────────────────────────────

function BarChart({ data }) {
  const W = 420;
  const H = 200;
  const maxV = Math.max(...data.map((d) => d.value));
  const barW = 18;
  const gap = (W - data.length * barW) / (data.length + 1);
  const yTicks = [0, 5000, 10000, 15000, 20000, 25000, 30000];

  return (
    <div className="bg-white rounded-2xl border border-[#F0F0F0] shadow-[0px_1px_2px_rgba(16,24,40,0.04)] p-6 flex-3">
      <div className="flex justify-between mb-5">
        <h3 className="text-[14px] font-semibold text-[#344054]">
          Top Stock Items by Usage
        </h3>
        <span className="text-[12px] text-[#667085]">7 Days</span>
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col justify-between text-right text-[12px] text-[#667085]">
          {[...yTicks].reverse().map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9FE870" />
              <stop offset="100%" stopColor="#6FCF4B" />
            </linearGradient>
          </defs>

          {yTicks.map((t) => {
            const y = H - (t / maxV) * H;
            return (
              <line
                key={t}
                x1="0"
                y1={y}
                x2={W}
                y2={y}
                stroke="#F2F4F7"
                strokeDasharray="3 3"
              />
            );
          })}

          {data.map((d, i) => {
            const x = gap + i * (barW + gap);
            const h = (d.value / maxV) * H;
            return (
              <rect
                key={i}
                x={x}
                y={H - h}
                width={barW}
                height={h}
                rx="6"
                fill="url(#barGrad)"
              />
            );
          })}
        </svg>
      </div>

      <div className="flex justify-around mt-2 text-[12px] text-[#667085]">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

// ── Feed Distribution (block tiles) ──────────────────────────────────────────

function FeedDistribution({ items }) {
  const totalKg = items.reduce((s, i) => s + i.kg, 0);

  return (
    <div className="w-[340px] shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800">
          Feed Distribution by Type
        </h3>
        <span className="text-[10px] text-gray-400 font-medium">
          Daily Consumption
        </span>
      </div>

      <div className="space-y-4">
        {items.map(({ label, kg, pct, color }) => {
          const filledBlocks = Math.round((pct / 100) * TOTAL_BLOCKS);
          return (
            <div key={label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-gray-700">
                  {label}
                </span>
                <span className="text-[10px] text-gray-400">
                  {kg} kg ({pct}%)
                </span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-sm"
                    style={{
                      backgroundColor: i < filledBlocks ? color : "#f3f4f6",
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Total Feed:{" "}
        <span className="font-bold text-gray-800">{totalKg} kg</span>
      </p>
    </div>
  );
}

// ── Activity Action Badge ─────────────────────────────────────────────────────

function ActionBadge({ action }) {
  const styles = {
    Issued: "bg-[#f0fdf4] text-[#4CAF50]",
    Received: "bg-blue-50 text-blue-500",
  };
  return (
    <span
      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${styles[action] ?? "bg-gray-100 text-gray-500"}`}
    >
      {action === "Issued" ? "↑" : "↓"} {action}
    </span>
  );
}

// ── Recent Activity Logs ──────────────────────────────────────────────────────

function ActivityLogs({ rows }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800">
          Recent Activity Logs
        </h3>
        <button className="text-xs text-[#4CAF50] font-medium hover:underline">
          See All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {[
                "Date",
                "Action",
                "Item",
                "Quantity",
                "Issued / Received by",
                "Purpose / Notes",
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
                <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                  {row.date}
                </td>
                <td className="py-3.5 px-4">
                  <ActionBadge action={row.action} />
                </td>
                <td className="py-3.5 px-4 font-medium text-gray-700 whitespace-nowrap">
                  {row.item}
                </td>
                <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                  {row.qty}
                </td>
                <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                  {row.by}
                </td>
                <td className="py-3.5 px-4 text-gray-500">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────

export default function StorekeeperDashboard() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const hrefToLabel = storekeeperNav.reduce((acc, { href, label }) => {
    acc[href] = label;
    return acc;
  }, {});

  return (
    <div className="flex h-screen bg-gray-50 pb-10 font-sans overflow-hidden">
      <Sidebar
        activeItem={activeItem}
        navItems={storekeeperNav}
        user={{
          name: "Grace Daniels",
          email: "gracedan01@mail.com",
          initials: "GD",
        }}
        onNavClick={(href) => {
          const label = hrefToLabel[href];
          if (label) setActiveItem(label);
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar userInitials="GD" notificationCount={1} />

        {activeItem === "Dashboard" && (
          <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {/* Welcome */}
            <div className="flex items-center justify-between">
              <h1 className="text-base font-bold text-gray-800">
                Welcome Back, Grace
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                18 September 2025
                <Calendar size={13} className="text-gray-400" />
              </div>
            </div>

            {/* Stock cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex gap-4">
              <StockCard
                title="Feed Stock Avail."
                items={[
                  { label: "Maize (Kg)", value: "2105" },
                  { label: "Soy Feed (Kg)", value: "820" },
                ]}
              />
              <StockCard
                title="Medicine Stock Avail."
                items={[
                  { label: "Antibiotics (Packs)", value: "2105" },
                  { label: "Dewormer (Bottles)", value: "820" },
                  { label: "Supplement (Bottles)", value: "20" },
                ]}
              />
              <StockCard
                title="Equipment & Supplies In Stock"
                items={[
                  { label: "Ear Tags", value: "25" },
                  { label: "Cleaning Sets", value: "12" },
                ]}
              />
            </div>

            {/* Bar chart + Feed distribution */}
            <div className="flex flex-wrap-reverse gap-4">
              <BarChart data={barData} />
              <FeedDistribution items={feedDistribution} />
            </div>

            {/* Activity logs */}
            <ActivityLogs rows={activityLogs} />
          </main>
        )}

        {activeItem === "Inventory" ? (
          <InventoryPage />
        ) : activeItem === "Stock Ledger" ? (
          <StockLedgerPage />
        ) : activeItem === "Reports" ? (
          <StorekeeperReportsPage />
        ) : activeItem === "Requests" ? (
          <Requests />
        ) : activeItem === "Alerts" ? (
          <AlertsPage />
        ) : (
          activeItem === "Settings" && (
            <SharedSettingsPage
              defaultName="Grace Daniels"
              defaultEmail="Gracedan01@mail.com"
              defaultPhone="+234 9188 1616 45"
              avatarInitials="GD"
            />
          )
        )}

        {/* Placeholder for pages not yet built */}
        {activeItem !== "Dashboard" &&
          activeItem !== "Inventory" &&
          activeItem !== "Stock Ledger" &&
          activeItem !== "Reports" &&
          activeItem !== "Requests" &&
          activeItem !== "Alerts" &&
          activeItem !== "Settings" && (
            <main className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              {activeItem} — coming soon
            </main>
          )}
      </div>
    </div>
  );
}
