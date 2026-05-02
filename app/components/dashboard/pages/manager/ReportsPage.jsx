"use client";

import { ChevronDown } from "lucide-react";

// ── Placeholder data ──────────────────────────────────────────────────────────

const workerEfficiency = [
  { name: "Aliyu Hazeem", pct: 95, detail: "11/12" },
  { name: "Bala Musa", pct: 75, detail: "16/20" },
  { name: "Abdul Alimi", pct: 60, detail: "16/24" },
  { name: "Grace Daniels", pct: 90, detail: "13/15" },
];

const inventoryRows = [
  {
    category: "Feed",
    item: "Maize",
    stockIn: "2,500 kg",
    remaining: "2,050 kg",
    avgDaily: "420 kg",
    expiry: "——",
    alert: "High",
    lastRestock: "20 Aug 2025",
  },
  {
    category: "Feed",
    item: "Mineral Mix",
    stockIn: "400 kg",
    remaining: "250 kg",
    avgDaily: "30 kg",
    expiry: "——",
    alert: "Low",
    lastRestock: "28 Aug 2025",
  },
  {
    category: "Medicine",
    item: "Antibiotics",
    stockIn: "100 doses",
    remaining: "25 doses",
    avgDaily: "2 doses",
    expiry: "Dec 2025",
    alert: "High",
    lastRestock: "15 Aug 2025",
  },
  {
    category: "Equipment",
    item: "Ear Tags",
    stockIn: "500 units",
    remaining: "120 units",
    avgDaily: "——",
    expiry: "——",
    alert: "Low",
    lastRestock: "10 Aug 2025",
  },
];

// ── Mini Bar sparkline ────────────────────────────────────────────────────────

function MiniBar({ heights = [40, 60, 50, 80, 55, 70, 65] }) {
  return (
    <div className="flex items-end gap-0.5 h-8">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-2 rounded-sm bg-[#4CAF50] opacity-40"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

function ReportStatCard({ title, value, unit, suffix, period, heights }) {
  return (
    <div className="flex-1 bg-[linear-gradient(135deg,#DCFFA2_0%,#DCFFA2_60%,#FDE7C5_100%)] rounded-xl border border-gray-100 shadow-sm p-4 min-w-0">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-600">{title}</span>
        <button className="flex items-center gap-0.5 text-[10px] text-gray-400 hover:text-gray-600">
          {period} <ChevronDown size={10} />
        </button>
      </div>
      <div className="flex items-end justify-between mt-10">
        <p className="text-3xl font-bold text-gray-800 leading-none">
          {value}
          {unit && (
            <span className="text-base font-semibold text-gray-500 ml-1">
              {unit}
            </span>
          )}
          {suffix && (
            <span className="text-sm font-medium text-gray-400 ml-1">
              {suffix}
            </span>
          )}
        </p>
        <MiniBar heights={heights} />
      </div>
    </div>
  );
}

// ── Worker Efficiency Breakdown ───────────────────────────────────────────────

function efficiencyColor(pct) {
  if (pct >= 90) return "#4CAF50";
  if (pct >= 75) return "#f59e0b";
  return "#ef4444";
}

function WorkerEfficiencyBreakdown({ workers }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-bold text-gray-800">
        Worker Efficiency Breakdown
      </h3>
      <p className="text-[11px] text-gray-400 mb-5">
        Breakdown of workers efficiency based on tasks done
      </p>

      <div className="space-y-5">
        {workers.map(({ name, pct, detail }) => (
          <div key={name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-gray-700">
                {name}
              </span>
              <span className="text-xs text-gray-400">
                {pct}% ({detail})
              </span>
            </div>
            {/* Track */}
            <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  backgroundColor: efficiencyColor(pct),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Low Stock Alert Badge ─────────────────────────────────────────────────────

function AlertBadge({ level }) {
  const styles = {
    High: "bg-red-50 text-red-500",
    Low: "bg-[#f0fdf4] text-[#4CAF50]",
  };
  const dotColors = { High: "bg-red-500", Low: "bg-[#4CAF50]" };

  return (
    <span
      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${styles[level] ?? "bg-gray-100 text-gray-500"}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotColors[level] ?? "bg-gray-400"}`}
      />
      {level}
    </span>
  );
}

// ── Ranch Inventory Reports table ─────────────────────────────────────────────

function InventoryTable({ rows }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-bold text-gray-800 mb-4">
        Ranch Inventory Reports
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {[
                "Category",
                "Item Name",
                "Stock In (Total)",
                "Stock Remaining",
                "Avg Daily Use",
                "Expiry Date",
                "Low Stock Alert",
                "Last Restock Date",
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
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                  {row.category}
                </td>
                <td className="py-3.5 px-4 font-medium text-gray-700 whitespace-nowrap">
                  {row.item}
                </td>
                <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                  {row.stockIn}
                </td>
                <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                  {row.remaining}
                </td>
                <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                  {row.avgDaily}
                </td>
                <td className="py-3.5 px-4 text-gray-400 whitespace-nowrap">
                  {row.expiry}
                </td>
                <td className="py-3.5 px-4">
                  <AlertBadge level={row.alert} />
                </td>
                <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                  {row.lastRestock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Stat cards */}
      <div className="flex gap-4">
        <ReportStatCard
          title="Tasks Completed"
          value="84%"
          period="7 days"
          heights={[40, 65, 50, 80, 55, 70, 85]}
        />
        <ReportStatCard
          title="Worker Efficiency"
          value="92%"
          suffix="(Avg.)"
          period="7 days"
          heights={[60, 75, 65, 90, 70, 85, 92]}
        />
        <ReportStatCard
          title="Issues Logged"
          value="12"
          suffix="Logged"
          period="30 days"
          heights={[20, 40, 30, 55, 35, 45, 30]}
        />
        <ReportStatCard
          title="Feed Consumed"
          value="660"
          unit="kg"
          suffix="total"
          period="30 days"
          heights={[50, 70, 60, 80, 65, 75, 70]}
        />
      </div>

      {/* Worker efficiency breakdown */}
      <WorkerEfficiencyBreakdown workers={workerEfficiency} />

      {/* Inventory table */}
      <InventoryTable rows={inventoryRows} />
    </main>
  );
}
