"use client";

import { ChevronDown, Edit } from "lucide-react";

// ── Placeholder data ──────────────────────────────────────────────────────────

const usageRows = [
  {
    date: "20 Aug 2025",
    item: "Maize",
    issued: "500 kg",
    returned: "0",
    wasted: "10 kg",
    netUsed: "1200 kg",
  },
  {
    date: "18 Aug 2025",
    item: "Soy beans",
    issued: "350 kg",
    returned: "0",
    wasted: "0",
    netUsed: "16,000",
  },
  {
    date: "17 Aug 2025",
    item: "Antibiotics",
    issued: "5 Bottles",
    returned: "2 Bottles",
    wasted: "0",
    netUsed: "50,000",
  },
  {
    date: "15 Aug 2025",
    item: "Soy beans",
    issued: "350 kg",
    returned: "0",
    wasted: "5 kg",
    netUsed: "16,000",
  },
  {
    date: "14 Aug 2025",
    item: "Maize",
    issued: "500 kg",
    returned: "100 kg",
    wasted: "10 kg",
    netUsed: "24,000",
  },
];

const medicineStock = [
  { label: "Antibiotics (Packs)", kg: 450, pct: 58, color: "#4CAF50" },
  { label: "FMD Vaccine", kg: 210, pct: 32, color: "#f59e0b" },
  { label: "Dewormer", kg: 60, pct: 10, color: "#d9f99d" },
];

const ROW = 10;

// ── Line Chart (Feed Usage Trend) ─────────────────────────────────────────────

function FeedUsageTrend() {
  const data = [
    180, 320, 490, 410, 550, 420, 380, 510, 460, 390, 430, 480, 350, 310,
  ];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const W = 360,
    H = 160;
  const minV = Math.min(...data),
    maxV = Math.max(...data);
  const xs = data.map((_, i) => (i / (data.length - 1)) * W);
  const ys = data.map((v) => H - ((v - minV) / (maxV - minV)) * (H - 20) - 10);
  const linePath = xs
    .map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`)
    .join(" ");
  const areaPath = `${linePath} L${W},${H} L0,${H} Z`;
  const yTicks = [100, 200, 300, 400, 500, 600];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-800">Feed Usage Trend</h3>
        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
          Last 7 days <ChevronDown size={12} />
        </button>
      </div>

      <div className="flex gap-2 flex-1">
        {/* Y-axis */}
        <div className="flex flex-col justify-between text-right shrink-0 pb-5">
          {[...yTicks].reverse().map((t) => (
            <span key={t} className="text-[9px] text-gray-400 leading-none">
              {t}kg
            </span>
          ))}
        </div>

        {/* Chart */}
        <div className="flex-1 min-w-0">
          <svg
            width="100%"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="storeAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#4CAF50" stopOpacity="0" />
              </linearGradient>
            </defs>
            {yTicks.map((t) => (
              <line
                key={t}
                x1="0"
                y1={H - ((t - minV) / (maxV - minV)) * (H - 20) - 10}
                x2={W}
                y2={H - ((t - minV) / (maxV - minV)) * (H - 20) - 10}
                stroke="#f3f4f6"
                strokeWidth="1"
                strokeDasharray="4,2"
              />
            ))}
            <path d={areaPath} fill="url(#storeAreaGrad)" />
            <path
              d={linePath}
              fill="none"
              stroke="#CFF998"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex justify-between mt-1">
            {labels.map((l) => (
              <span key={l} className="text-[9px] text-gray-400">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-3">
        {[
          { color: "#4CAF50", label: "Avg 510 kg/day" },
          { color: "#a5d6a7", label: "Peaked at 630 kg last week" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: color }}
            />
            <span className="text-[10px] text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Donut Chart (Wastage vs Utilization) ──────────────────────────────────────

function WastageDonut() {
  const segments = [
    { pct: 0.008, color: "#d1d5db" },
    { pct: 0.016, color: "#fde68a" },
    { pct: 0.016, color: "#d9f99d" },
    { pct: 0.96, color: "#4CAF50" },
  ];
  const r = 58,
    cx = 75,
    cy = 75;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-800">
          Wastage vs Utilization
        </h3>
        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
          30 days <ChevronDown size={12} />
        </button>
      </div>

      <div className="flex justify-center flex-1">
        <svg width="150" height="150" viewBox="0 0 150 150">
          {segments.map(({ pct, color }, i) => {
            const dash = pct * circ - 4;
            const el = (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={color}
                strokeWidth="18"
                strokeDasharray={`${dash} ${circ}`}
                strokeDashoffset={-offset + circ * 0.25}
                strokeLinecap="round"
              />
            );
            offset += pct * circ;
            return el;
          })}
        </svg>
      </div>

      <div className="flex flex-col gap-1.5 mt-2">
        {[
          { color: "#d1d5db", label: "Deceased - 0.8%" },
          { color: "#fde68a", label: "Newborns - 1.6%" },
          { color: "#d9f99d", label: "Newborns - 1.6%" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-[10px] text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Medicine Stock (block tiles) ──────────────────────────────────────────────

function MedicineStock({ items }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col">
      <h3 className="text-sm font-bold text-gray-800 mb-4">
        Medicine Stock In vs Usage
      </h3>
      <div className="flex flex-col gap-5 flex-1">
        {items.map(({ label, kg, pct, color }) => {
          const filled = Math.round((pct / 100) * (ROW * 2));
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
              <div className="flex flex-col gap-1">
                {[0, 1].map((row) => (
                  <div key={row} className="flex gap-1">
                    {Array.from({ length: ROW }).map((_, col) => {
                      const idx = row * ROW + col;
                      return (
                        <div
                          key={col}
                          className="w-4 h-4 rounded-sm"
                          style={{
                            backgroundColor: idx < filled ? color : "#f3f4f6",
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Usage & Wastage Table ─────────────────────────────────────────────────────

function UsageTable({ rows }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {[
                "Date",
                "Item Name",
                "Issued",
                "Returned",
                "Wasted",
                "Net Used",
                "Action",
              ].map((col) => (
                <th
                  key={col}
                  className="text-left py-3 px-5 text-gray-500 font-medium whitespace-nowrap"
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
                <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                  {row.date}
                </td>
                <td className="py-4 px-5 font-medium text-gray-700 whitespace-nowrap">
                  {row.item}
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.issued}
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.returned}
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.wasted}
                </td>
                <td className="py-4 px-5 text-gray-700 font-medium whitespace-nowrap">
                  {row.netUsed}
                </td>
                <td className="py-4 px-5">
                  <button className="flex items-center gap-1 text-[#4CAF50] hover:text-[#43a047] font-semibold text-xs transition-colors">
                    Edit <Edit size={11} />
                  </button>
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

export default function StorekeeperReportsPage() {
  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/*
        Responsive chart grid:
        - Mobile (< md):  1 column, stacked
        - Tablet (md):    2 columns
        - Desktop (lg+):  3 columns side by side
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FeedUsageTrend />
        <WastageDonut />
        <MedicineStock items={medicineStock} />
      </div>

      {/* Usage & Wastage table — full width, always */}
      <UsageTable rows={usageRows} />
    </main>
  );
}
