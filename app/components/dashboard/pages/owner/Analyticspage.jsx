"use client";

import { ChevronDown, Download } from "lucide-react";
import { DonutChart, LineChart } from "../../shared/Charts";

// ── Data ──────────────────────────────────────────────────────────────────────

const financialRows = [
  {
    month: "August",
    revenue: "7,900,000",
    expenses: "5,800,000",
    profit: "2,100,000",
    margin: "27%",
    feed: "2,400,000",
    vet: "1,000,000",
    labor: "1,200,000",
    logistics: "250,000",
  },
  {
    month: "July",
    revenue: "7,900,000",
    expenses: "5,800,000",
    profit: "2,100,000",
    margin: "27%",
    feed: "2,400,000",
    vet: "1,000,000",
    labor: "1,200,000",
    logistics: "250,000",
  },
  {
    month: "June",
    revenue: "7,900,000",
    expenses: "5,800,000",
    profit: "2,100,000",
    margin: "27%",
    feed: "2,400,000",
    vet: "1,000,000",
    labor: "1,200,000",
    logistics: "250,000",
  },
];

const financialColumns = [
  "Month",
  "Revenue (₦)",
  "Expenses (₦)",
  "Profit (₦)",
  "Profit Margin",
  "Feed & Nutrition",
  "Vet & Health",
  "Labor & Wages",
  "Logistics",
];
const financialKeys = [
  "month",
  "revenue",
  "expenses",
  "profit",
  "margin",
  "feed",
  "vet",
  "labor",
  "logistics",
];

// ── Financial Table ───────────────────────────────────────────────────────────

function FinancialTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">
          Financial Report
        </h3>
        <button className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
          <Download size={12} />
          Export
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {financialColumns.map((col) => (
                <th
                  key={col}
                  className="text-left py-3 px-4 text-gray-500 font-medium whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {financialRows.map((row) => (
              <tr
                key={row.month}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                {financialKeys.map((key) => (
                  <td
                    key={key}
                    className="py-4 px-4 text-gray-600 whitespace-nowrap"
                  >
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold text-gray-800">
          Analytics &amp; Reports
        </h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            This Month <ChevronDown size={13} />
          </button>
          <button className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors">
            Export as <ChevronDown size={13} />
          </button>
        </div>
      </div>

      {/* Charts row */}
      <div className="flex gap-4 flex-wrap">
        {/* Livestock Health Distribution — large donut with 4-item legend */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">
              Livestock Health Distribution
            </h3>
            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
              30 days <ChevronDown size={12} />
            </button>
          </div>

          <div className="flex items-center gap-6">
            {/* Large donut */}
            <div className="shrink-0">
              <svg width="150" height="150" viewBox="0 0 150 150">
                {(() => {
                  const r = 58,
                    cx = 75,
                    cy = 75;
                  const circ = 2 * Math.PI * r;
                  const segments = [
                    { pct: 0.944, color: "#4CAF50" },
                    { pct: 0.032, color: "#f59e0b" },
                    { pct: 0.008, color: "#d1d5db" },
                    { pct: 0.016, color: "#fde68a" },
                  ];
                  let offset = 0;
                  return segments.map(({ pct, color }, i) => {
                    const dash = pct * circ - 4;
                    const el = (
                      <circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r={r}
                        fill="none"
                        stroke={color}
                        strokeWidth="16"
                        strokeDasharray={`${dash} ${circ}`}
                        strokeDashoffset={-offset + circ * 0.25}
                        strokeLinecap="round"
                      />
                    );
                    offset += pct * circ;
                    return el;
                  });
                })()}
                <text
                  x="75"
                  y="71"
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="700"
                  fill="#1f2937"
                >
                  73%
                </text>
                <text
                  x="75"
                  y="87"
                  textAnchor="middle"
                  fontSize="9"
                  fill="#9ca3af"
                >
                  Healthy
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-2">
              {[
                { color: "#4CAF50", label: "Healthy - 94.4%" },
                { color: "#f59e0b", label: "Sick - 3.2%" },
                { color: "#d1d5db", label: "Deceased - 0.8%" },
                { color: "#fde68a", label: "Newborns - 1.6%" },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cost-Benefit per Batch */}
        <DonutChart
          title="Cost-Benefit per Batch"
          value={60}
          label="180K"
          sublabel="Avg Profit"
          color="#4CAF50"
          trackColor="#f59e0b"
          period="August"
          legend={[
            { color: "#4CAF50", label: "Avg Revenue per Cow:  550,000 (60%)" },
            { color: "#f59e0b", label: "Avg Cost per Cow:  37,000 (40%)" },
          ]}
        />

        {/* Feed Consumption Trend */}
        <LineChart
          title="Feed Consumption Trend"
          period="30 days"
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          data={[
            180, 320, 490, 410, 550, 420, 380, 510, 460, 390, 430, 480, 350,
            310,
          ]}
          legend={[
            { color: "#4CAF50", label: "Avg 510 kg/day" },
            { color: "#a5d6a7", label: "Peaked at 630 kg last week" },
          ]}
        />
      </div>

      {/* Financial Table */}
      <FinancialTable />
    </main>
  );
}
