"use client";

import { ChevronDown } from "lucide-react";

/**
 * MiniBar — sparkbar used inside StatCard
 * @param {number[]} heights - Array of percentages (0–100)
 */
export function MiniBar({ heights = [] }) {
  return (
    <div className="flex items-end gap-0.5 h-8">
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-[#4CAF50] opacity-30"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

/**
 * StatCard — reusable metric card
 * @param {Object}        props
 * @param {string}        props.title
 * @param {string}        props.badge        - e.g. "7 days"
 * @param {string}        props.badgeColor   - Tailwind classes for badge bg + text
 * @param {React.ReactNode} props.children
 */
export default function StatCard({ title, badge, badgeColor = "bg-[#f0fdf4] text-[#4CAF50]", children }) {
  return (
    <div className="flex-1 rounded-xl  bg-[linear-gradient(135deg,#DCFFA2_0%,#DCFFA2_60%,#FDE7C5_100%)] p-4 shadow-sm min-w-0">
      <div className="flex items-center justify-between mb-10">
        <span className="text-xs font-semibold text-gray-600">{title}</span>
        {badge && (
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${badgeColor}`}
          >
            {badge} <ChevronDown size={10} />
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
