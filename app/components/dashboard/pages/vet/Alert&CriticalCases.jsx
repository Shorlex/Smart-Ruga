"use client";

import { useState } from "react";

// ── Placeholder data ──────────────────────────────────────────────────────────

const allAlerts = [
  {
    type: "Critical Alert",
    typeColor: "text-red-500",
    icon: "⚠️",
    title: "Cow #1144 – Suspected FMD Outbreak",
    symptoms: "Drooling, blistered mouth",
    status: "Untreated",
    reportedBy: "Worker Sani",
    herd: "Herd B",
    datetime: "6:20 PM, 2 September",
    notes: "5 other cows showing early signs",
    action: { label: "Acknowledge", type: "green" },
    severity: "Critical",
  },
  {
    type: "Treatment Follow-Up",
    typeColor: "text-amber-500",
    icon: "🔔",
    title: "Cow #0999 – Mastitis (Follow-Up Due)",
    symptoms: "Drooling, blistered mouth",
    status: "Improving",
    nextCheckUp: "6 September",
    herd: "Herd B",
    action: { label: "View Record", type: "green" },
    severity: "Medium",
  },
  {
    type: "Emergency – Injury Case",
    typeColor: "text-red-500",
    icon: "⚠️",
    title: "Cow #1050 – Leg Injury",
    symptoms: "Limping, swollen joint",
    status: "Untreated",
    reportedBy: "Worker Musa",
    herd: "Herd A",
    datetime: "8:00 AM, 3 September",
    notes: "Requires immediate attention",
    action: { label: "Assign Treatment", type: "green" },
    severity: "Critical",
  },
  {
    type: "Treatment Follow-Up",
    typeColor: "text-amber-500",
    icon: "🔔",
    title: "Cow #1022 – Deworming Due",
    symptoms: "Weight loss, lethargy",
    status: "Improving",
    nextCheckUp: "10 September",
    herd: "Herd C",
    action: { label: "View Record", type: "green" },
    severity: "Medium",
  },
];

// ── Alert Card ────────────────────────────────────────────────────────────────

function AlertCard({ alert, onAction }) {
  const [acknowledged, setAcknowledged] = useState(false);

  const handleAction = () => {
    setAcknowledged(true);
    onAction?.(alert);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span
          className={`flex items-center gap-1.5 text-xs font-bold ${alert.typeColor}`}
        >
          {alert.icon} {alert.type}
        </span>
        <button
          onClick={handleAction}
          className={`px-3 py-1.5 rounded-full text-white text-xs font-semibold transition-colors ${
            acknowledged
              ? "bg-gray-400 cursor-default"
              : "bg-[#4CAF50] hover:bg-[#43a047]"
          }`}
          disabled={acknowledged}
        >
          {acknowledged ? "Done ✓" : alert.action.label}
        </button>
      </div>

      {/* Title */}
      <p className="text-sm font-semibold text-gray-800">{alert.title}</p>

      {/* Fields */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        {alert.symptoms && (
          <>
            <div>
              <p className="text-gray-400">Symptoms:</p>
              <p className="font-semibold text-gray-800">{alert.symptoms}</p>
            </div>
            <div>
              <p className="text-gray-400">Status:</p>
              <p className="font-semibold text-gray-800">{alert.status}</p>
            </div>
          </>
        )}
        {alert.reportedBy && (
          <>
            <div>
              <p className="text-gray-400">Reported By:</p>
              <p className="font-semibold text-gray-800">{alert.reportedBy}</p>
            </div>
            <div>
              <p className="text-gray-400">Livestock Herd:</p>
              <p className="font-semibold text-gray-800">{alert.herd}</p>
            </div>
          </>
        )}
        {alert.nextCheckUp && (
          <>
            <div>
              <p className="text-gray-400">Next Check Up</p>
              <p className="font-semibold text-gray-800">{alert.nextCheckUp}</p>
            </div>
            <div>
              <p className="text-gray-400">Livestock Herd:</p>
              <p className="font-semibold text-gray-800">{alert.herd}</p>
            </div>
          </>
        )}
        {alert.datetime && (
          <div className="col-span-2">
            <p className="text-gray-400">Date & Time</p>
            <p className="font-semibold text-gray-800">{alert.datetime}</p>
          </div>
        )}
      </div>

      {/* Notes */}
      {alert.notes && (
        <div className="bg-[#f0fdf4] rounded-xl px-3 py-2">
          <p className="text-[10px] text-gray-400 mb-0.5">Additional Notes:</p>
          <p className="text-xs text-gray-600 italic">{alert.notes}</p>
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const TABS = ["All Alerts", "Critical", "Medium"];

export default function AlertsCriticalCases() {
  const [activeTab, setActiveTab] = useState("All Alerts");

  const filtered = allAlerts.filter((a) => {
    if (activeTab === "All Alerts") return true;
    return a.severity === activeTab;
  });

  return (
    <div className="px-4 pb-8 space-y-4">
      {/* Tab filter */}
      <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === tab
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Alert cards */}
      <div className="space-y-3">
        {filtered.map((alert, i) => (
          <AlertCard
            key={i}
            alert={alert}
            onAction={(a) => console.log("Action taken:", a)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-8">
            No alerts in this category.
          </p>
        )}
      </div>
    </div>
  );
}
