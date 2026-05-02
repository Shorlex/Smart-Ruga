"use client";

import { ChevronDown } from "lucide-react";

/**
 * LineChart — SVG area/line chart
 * @param {Object}   props
 * @param {string}   props.title
 * @param {number[]} props.data       - Raw values to plot
 * @param {string[]} props.labels     - X-axis labels (e.g. days of week)
 * @param {Object[]} props.legend     - [{ color, label }]
 * @param {string}   props.period     - Period label shown in dropdown
 */
export function LineChart({
  title = "Feed Consumption Trend",
  data = [
    100, 150, 160, 440, 500, 470, 560, 380, 450, 430, 460, 270, 430, 390, 260,
    260, 260, 450,
  ],
  labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  legend = [
    { color: "#9FE870", label: "Avg 510 kg/day" },
    { color: "#B7F08A", label: "Peaked at 630 kg last week" },
  ],
  period = "30 days",
}) {
  const W = 360,
    H = 140;

  // Fixed scale like screenshot
  const minV = 100;
  const maxV = 600;

  const scaleY = (v) => H - ((v - minV) / (maxV - minV)) * (H - 30) - 10;
  const scaleX = (_, i) => (i / (data.length - 1)) * W;

  const points = data.map((v, i) => [scaleX(v, i), scaleY(v)]);
  const linePath = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`)
    .join(" ");

  const yTicks = [600, 500, 400, 300, 200, 100];

  return (
    <div className="flex-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-700">{title}</h3>
        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
          {period} <ChevronDown size={14} />
        </button>
      </div>

      {/* Chart */}
      <div className="flex gap-3">
        {/* Y Axis */}
        <div className="flex flex-col justify-between pr-2 text-right shrink-0">
          {yTicks.map((v) => (
            <span key={v} className="text-xs text-gray-400">
              {v}kg
            </span>
          ))}
        </div>

        {/* SVG */}
        <div className="flex-1">
          <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
            {/* Grid lines */}
            {yTicks.map((v) => {
              const y = scaleY(v);
              return (
                <line
                  key={v}
                  x1="0"
                  y1={y}
                  x2={W}
                  y2={y}
                  stroke="#e9e9e9"
                  strokeWidth="1"
                  strokeDasharray="6 6"
                />
              );
            })}

            {/* Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#B8E986"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* X labels */}
      <div className="flex justify-between mt-2 pl-10">
        {labels.map((l) => (
          <span key={l} className="text-xs text-gray-400">
            {l}
          </span>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-10 mt-5">
        {legend.map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className="w-6 h-6 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${color}, #7AC943)`,
              }}
            />
            <span className="text-sm text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * DonutChart — SVG donut with label and legend
 * @param {Object}   props
 * @param {string}   props.title
 * @param {number}   props.value       - 0–100, shown as percentage
 * @param {string}   props.label       - Centre label override (e.g. "1.2%")
 * @param {string}   props.color       - Fill color
 * @param {string}   props.trackColor  - Background track color
 * @param {Object[]} props.legend      - [{ color, label }]
 * @param {string}   props.period
 */
export function DonutChart({
  title = "Rate",
  value = 73,
  label,
  legend = [],
  period = "30 days",
}) {
  const r = 42;
  const stroke = 12;
  const cx = 55;
  const cy = 55;

  const circumference = 2 * Math.PI * r;

  // Tuned visually (not just mathematically)
  const gapPercent = 8; // visual gap between segments
  const capCompensation = 4; // fixes round cap overlap

  const progressPercent = value;
  const remainPercent = 100 - value;

  const progressLen =
    ((progressPercent - gapPercent / 2 - capCompensation) / 100) *
    circumference;

  const remainLen =
    ((remainPercent - gapPercent / 2 - capCompensation) / 100) * circumference;

  const gapLen = (gapPercent / 100) * circumference;

  const displayLabel = label ?? `${value}%`;

  return (
    <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
          {period}
        </button>
      </div>

      <div className="flex justify-center">
        <svg width="110" height="110" viewBox="0 0 110 110">
          {/* Green Progress */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#9CD550"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${progressLen} ${circumference}`}
            transform={`rotate(-90 ${cx} ${cy})`}
          />

          {/* Orange Remaining */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#F9D298"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${remainLen} ${circumference}`}
            strokeDashoffset={-(progressLen + gapLen)}
            transform={`rotate(-90 ${cx} ${cy})`}
          />

          {/* Center Label */}
          <text
            x={cx}
            y={cy + 5}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="#1f2937"
          >
            {displayLabel}
          </text>
        </svg>
      </div>

      <div className="flex flex-col gap-1 mt-3">
        {legend.map(({ color: c, label: l }) => (
          <div key={l} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: c }}
            />
            <span className="text-[10px] text-gray-500">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
