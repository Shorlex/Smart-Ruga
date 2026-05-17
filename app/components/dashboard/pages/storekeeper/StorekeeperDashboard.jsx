"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar } from "lucide-react";
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
import StorekeeperRequestsPage from "./Requests";
import StorekeeperAlertsPage from "./AlertsPage";
import SharedSettingsPage from "../../shared/Settings";

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

const storekeeperNav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Inventory", icon: Archive, href: "/inventory" },
  { label: "Stock Ledger", icon: ArrowLeftRight, href: "/stock-ledger" },
  { label: "Requests", icon: ClipboardList, href: "/requests" },
  { label: "Alerts", icon: Bell, href: "/alerts" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

const hrefToLabel = storekeeperNav.reduce(
  (acc, { href, label }) => ({ ...acc, [href]: label }),
  {},
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(str) {
  if (!str) return "—";
  return new Date(str).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function today() {
  return new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Group items by category and sum quantityOnHand
function groupByCategory(items) {
  return items.reduce((acc, item) => {
    const cat = (item.category ?? "other").toLowerCase();
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});
}

// ── Stock Card ────────────────────────────────────────────────────────────────

function StockCard({ title, items, loading }) {
  return (
    <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5 min-w-0">
      <p className="text-xs font-semibold text-gray-600 mb-4">{title}</p>
      {loading ? (
        <div className="flex gap-4 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="flex-1 h-10 bg-gray-100 rounded" />
          ))}
        </div>
      ) : (
        <div className="flex divide-x divide-gray-100">
          {items.map(({ label, value }) => (
            <div key={label} className="flex-1 px-3 first:pl-0">
              <p className="text-[10px] text-gray-400 mb-1 truncate">{label}</p>
              <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-xs text-gray-400">No items</p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Low Stock Banner ──────────────────────────────────────────────────────────

function LowStockBanner({ items }) {
  if (!items.length) return null;
  return (
    <div className="bg-red-50 border border-red-100 rounded-xl px-5 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-base">⚠️</span>
        <div>
          <p className="text-xs font-bold text-red-600">
            {items.length} item{items.length > 1 ? "s" : ""} below reorder level
          </p>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {items.map((item) => (
              <span
                key={item.publicId}
                className="text-[10px] text-red-500 bg-red-100 px-2 py-0.5 rounded-full"
              >
                {item.name}: {item.quantityOnHand} {item.unit}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Bar Chart (SVG) ───────────────────────────────────────────────────────────

function BarChart({ data }) {
  if (!data.length)
    return (
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center justify-center">
        <p className="text-sm text-gray-400">No movement data yet</p>
      </div>
    );

  const W = 420;
  const H = 180;
  const maxV = Math.max(...data.map((d) => d.value), 1);
  const barW = Math.min(28, W / data.length - 10);
  const gap = (W - data.length * barW) / (data.length + 1);
  const yTicks = [
    0,
    Math.round(maxV * 0.25),
    Math.round(maxV * 0.5),
    Math.round(maxV * 0.75),
    maxV,
  ];

  return (
    <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">
          Top Items by Movement
        </h3>
        <span className="text-[10px] text-gray-400">Recent movements</span>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col justify-between text-right text-[11px] text-gray-400 pb-1">
          {[...yTicks].reverse().map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9FE870" />
              <stop offset="100%" stopColor="#4CAF50" />
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
            const h = Math.max((d.value / maxV) * H, 2);
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
      <div className="flex justify-around mt-1">
        {data.map((d) => (
          <span
            key={d.label}
            className="text-[11px] text-gray-400 truncate max-w-15 text-center"
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Feed Distribution ─────────────────────────────────────────────────────────

const TOTAL_BLOCKS = 20;

function FeedDistribution({ items }) {
  const totalQty = items.reduce((s, i) => s + (i.qty ?? 0), 0);
  return (
    <div className="w-[320px] shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800">Stock by Category</h3>
        <span className="text-[10px] text-gray-400">Qty on hand</span>
      </div>
      {items.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-4">No data</p>
      ) : (
        <div className="space-y-4">
          {items.map(({ label, qty, pct, color }) => {
            const filledBlocks = Math.round((pct / 100) * TOTAL_BLOCKS);
            return (
              <div key={label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-gray-700 capitalize">
                    {label}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {qty} units ({pct}%)
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
      )}
      {totalQty > 0 && (
        <p className="text-xs text-gray-500 mt-4">
          Total:{" "}
          <span className="font-bold text-gray-800">{totalQty} units</span>
        </p>
      )}
    </div>
  );
}

// ── Activity Logs ─────────────────────────────────────────────────────────────

function ActionBadge({ type }) {
  const t = (type ?? "").toLowerCase();
  const styles = {
    stock_in: { cls: "bg-blue-50 text-blue-500", icon: "↓", label: "Received" },
    stock_out: {
      cls: "bg-[#f0fdf4] text-[#4CAF50]",
      icon: "↑",
      label: "Issued",
    },
    adjustment: {
      cls: "bg-purple-50 text-purple-500",
      icon: "⟳",
      label: "Adjusted",
    },
  };
  const { cls, icon, label } = styles[t] ?? {
    cls: "bg-gray-100 text-gray-500",
    icon: "•",
    label: type,
  };
  return (
    <span
      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${cls}`}
    >
      {icon} {label}
    </span>
  );
}

function ActivityLogs({ rows, loading }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800">
          Recent Activity Logs
        </h3>
      </div>
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="h-3 bg-gray-100 rounded w-24" />
              <div className="h-3 bg-gray-100 rounded w-16" />
              <div className="h-3 bg-gray-100 rounded flex-1" />
            </div>
          ))}
        </div>
      ) : rows.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">
          No recent activity.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                {[
                  "Date",
                  "Action",
                  "Item",
                  "Qty Changed",
                  "Prev Qty",
                  "New Qty",
                  "Reason",
                  "Recorded By",
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
                  key={row.publicId ?? i}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                    {formatDate(row.createdAt)}
                  </td>
                  <td className="py-3 px-4">
                    <ActionBadge type={row.type} />
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-700 whitespace-nowrap">
                    {row.item?.name ?? "—"}
                    {row.item?.category && (
                      <span className="text-[10px] text-gray-400 ml-1 capitalize">
                        ({row.item.category})
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                    {row.quantity != null
                      ? `${row.quantity} ${row.item?.unit ?? ""}`.trim()
                      : "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                    {row.previousQuantity != null
                      ? `${row.previousQuantity} ${row.item?.unit ?? ""}`.trim()
                      : "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 font-medium whitespace-nowrap">
                    {row.newQuantity != null
                      ? `${row.newQuantity} ${row.item?.unit ?? ""}`.trim()
                      : "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-500 max-w-35 truncate">
                    {row.reason ?? "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                    {row.recordedByUser?.name ??
                      row.recordedByUser?.email ??
                      "—"}
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

// ── Dashboard Home ────────────────────────────────────────────────────────────

const CATEGORY_COLORS = [
  "#4CAF50",
  "#f59e0b",
  "#60a5fa",
  "#a78bfa",
  "#f87171",
  "#34d399",
];

function DashboardHome() {
  const [items, setItems] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [itemsRes, movRes] = await Promise.all([
        fetch(`${API}/ranches/${getSlug()}/inventory-items`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
        fetch(`${API}/ranches/${getSlug()}/inventory-items/recent-movements`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
      ]);

      if (itemsRes.ok) {
        const json = await itemsRes.json();
        setItems(json?.data?.items ?? json?.items ?? []);
      }
      if (movRes.ok) {
        const json = await movRes.json();
        setMovements(json?.data?.movements ?? json?.movements ?? []);
      }
    } catch (err) {
      console.error("SK Dashboard fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ── Derive stock cards from items ─────────────────────────────────────────
  const grouped = groupByCategory(items);

  const feedItems = (grouped["feed"] ?? []).slice(0, 3).map((i) => ({
    label: `${i.name} (${i.unit})`,
    value: i.quantityOnHand ?? 0,
  }));

  const medicineItems = (grouped["medicine"] ?? []).slice(0, 3).map((i) => ({
    label: `${i.name} (${i.unit})`,
    value: i.quantityOnHand ?? 0,
  }));

  const equipmentItems = [
    ...(grouped["equipment"] ?? []),
    ...(grouped["tool"] ?? []),
  ]
    .slice(0, 3)
    .map((i) => ({
      label: `${i.name}`,
      value: i.quantityOnHand ?? 0,
    }));

  // ── Low stock ─────────────────────────────────────────────────────────────
  const lowStockItems = items.filter((i) => i.isLowStock);

  // ── Bar chart: top items by total movement quantity ───────────────────────
  const movSummary = movements.reduce((acc, m) => {
    const name = m.item?.name ?? "Unknown";
    acc[name] = (acc[name] ?? 0) + (m.quantity ?? 0);
    return acc;
  }, {});

  const barData = Object.entries(movSummary)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, value]) => ({ label, value }));

  // ── Feed distribution: qty on hand per category ───────────────────────────
  const catTotals = Object.entries(grouped).map(([cat, catItems]) => ({
    label: cat,
    qty: catItems.reduce((s, i) => s + (i.quantityOnHand ?? 0), 0),
  }));
  const grandTotal = catTotals.reduce((s, c) => s + c.qty, 0) || 1;
  const distData = catTotals
    .filter((c) => c.qty > 0)
    .slice(0, 5)
    .map((c, i) => ({
      label: c.label,
      qty: Math.round(c.qty * 10) / 10,
      pct: Math.round((c.qty / grandTotal) * 100),
      color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
    }));

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold text-gray-800">Welcome Back</h1>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          {today()} <Calendar size={13} />
        </div>
      </div>

      {/* Low stock banner */}
      {!loading && <LowStockBanner items={lowStockItems} />}

      {/* Stock cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:flex gap-4">
        <StockCard
          title="Feed Stock"
          items={
            feedItems.length
              ? feedItems
              : [{ label: "No feed items", value: "—" }]
          }
          loading={loading}
        />
        <StockCard
          title="Medicine Stock"
          items={
            medicineItems.length
              ? medicineItems
              : [{ label: "No medicine items", value: "—" }]
          }
          loading={loading}
        />
        <StockCard
          title="Equipment & Tools"
          items={
            equipmentItems.length
              ? equipmentItems
              : [{ label: "No equipment", value: "—" }]
          }
          loading={loading}
        />
      </div>

      {/* Bar chart + Distribution */}
      <div className="flex flex-wrap-reverse gap-4">
        <BarChart data={barData} />
        <FeedDistribution items={distData} />
      </div>

      {/* Activity logs */}
      <ActivityLogs rows={movements.slice(0, 10)} loading={loading} />
    </main>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────

export default function StorekeeperDashboard() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  // Read user from localStorage
  const storedUser = (() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem("sr_user") || "{}");
    } catch {
      return {};
    }
  })();

  const user = {
    name: storedUser.name ?? "Storekeeper",
    email: storedUser.email ?? "",
    initials: storedUser.initials ?? "SK",
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar
        activeItem={activeItem}
        navItems={storekeeperNav}
        user={user}
        onNavClick={(href) => {
          const label = hrefToLabel[href];
          if (label) setActiveItem(label);
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar userInitials={user.initials} notificationCount={0} />

        {activeItem === "Dashboard" && <DashboardHome />}
        {activeItem === "Inventory" && <InventoryPage />}
        {activeItem === "Stock Ledger" && <StockLedgerPage />}
        {activeItem === "Reports" && <StorekeeperReportsPage />}
        {activeItem === "Requests" && <StorekeeperRequestsPage />}
        {activeItem === "Alerts" && <StorekeeperAlertsPage />}
        {activeItem === "Settings" && (
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <SharedSettingsPage
              defaultName={user.name}
              defaultEmail={user.email}
              defaultPhone=""
              avatarInitials={user.initials}
            />
          </div>
        )}
      </div>
    </div>
  );
}
