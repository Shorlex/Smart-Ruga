"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

// ── Placeholder data ──────────────────────────────────────────────────────────

const pendingRows = [
  {
    id: "#FR-1040",
    date: "30 Aug 2025",
    type: "Restock",
    details: "Antibiotics for cows",
    qty: "20 Bottles",
    costPerUnit: "₦5,000",
    estCost: "₦150,000",
  },
  {
    id: "#IR-2090",
    date: "28 Aug 2025",
    type: "Inventory",
    details: "New livestock ear tags",
    qty: "20 Tags",
    costPerUnit: "₦15,000",
    estCost: "₦200,000",
  },
  {
    id: "#IR-2090",
    date: "28 Aug 2025",
    type: "Inventory",
    details: "Maize Feed",
    qty: "800 kg",
    costPerUnit: "₦2,500",
    estCost: "₦200,000",
  },
  {
    id: "#FR-1040",
    date: "30 Aug 2025",
    type: "Restock",
    details: "Antibiotics for cows",
    qty: "20 Bottles",
    costPerUnit: "₦5,000",
    estCost: "₦150,000",
  },
  {
    id: "#IR-2090",
    date: "28 Aug 2025",
    type: "Inventory",
    details: "New livestock ear tags",
    qty: "20 Tags",
    costPerUnit: "₦15,000",
    estCost: "₦200,000",
  },
  {
    id: "#IR-2090",
    date: "28 Aug 2025",
    type: "Inventory",
    details: "Maize Feed",
    qty: "800 kg",
    costPerUnit: "₦2,500",
    estCost: "₦200,000",
  },
  {
    id: "#FR-1040",
    date: "30 Aug 2025",
    type: "Restock",
    details: "Antibiotics for cows",
    qty: "20 Bottles",
    costPerUnit: "₦5,000",
    estCost: "₦150,000",
  },
];

const historyRows = [
  {
    id: "#FR-1040",
    date: "30 Aug 2025",
    type: "Restock",
    details: "Antibiotics for cows",
    qty: "20 Bottles",
    costPerUnit: "₦5,000",
    estCost: "₦150,000",
    status: "Approved",
  },
  {
    id: "#IR-2090",
    date: "28 Aug 2025",
    type: "Inventory",
    details: "New livestock ear tags",
    qty: "20 Tags",
    costPerUnit: "₦15,000",
    estCost: "₦200,000",
    status: "Declined",
  },
  {
    id: "#IR-2090",
    date: "28 Aug 2025",
    type: "Inventory",
    details: "Maize Feed",
    qty: "800 kg",
    costPerUnit: "₦2,500",
    estCost: "₦200,000",
    status: "Approved",
  },
  {
    id: "#FR-1040",
    date: "30 Aug 2025",
    type: "Restock",
    details: "Antibiotics for cows",
    qty: "20 Bottles",
    costPerUnit: "₦5,000",
    estCost: "₦150,000",
    status: "Declined",
  },
  {
    id: "#IR-2090",
    date: "28 Aug 2025",
    type: "Inventory",
    details: "New livestock ear tags",
    qty: "20 Tags",
    costPerUnit: "₦15,000",
    estCost: "₦200,000",
    status: "Approved",
  },
  {
    id: "#IR-2090",
    date: "28 Aug 2025",
    type: "Inventory",
    details: "Maize Feed",
    qty: "800 kg",
    costPerUnit: "₦2,500",
    estCost: "₦200,000",
    status: "Declined",
  },
  {
    id: "#FR-1040",
    date: "30 Aug 2025",
    type: "Restock",
    details: "Antibiotics for cows",
    qty: "20 Bottles",
    costPerUnit: "₦5,000",
    estCost: "₦150,000",
    status: "Approved",
  },
];

// ── Shared columns ────────────────────────────────────────────────────────────

const sharedCols = [
  "Request ID",
  "Date",
  "Request Type",
  "Details",
  "Unit / Qty",
  "Cost Per Unit",
  "Est. Cost",
];

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const styles = {
    Approved: "bg-[#f0fdf4] text-[#4CAF50]",
    Declined: "bg-red-50 text-red-500",
  };
  const icons = { Approved: "✅", Declined: "❌" };
  return (
    <span
      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full w-fit ${styles[status] ?? "bg-gray-100 text-gray-500"}`}
    >
      <span className="text-[11px]">{icons[status]}</span> {status}
    </span>
  );
}

// ── Shared row cells ──────────────────────────────────────────────────────────

function SharedCells({ row }) {
  return (
    <>
      <td className="py-4 px-5 font-medium text-gray-700 whitespace-nowrap">
        {row.id}
      </td>
      <td className="py-4 px-5 text-gray-500 whitespace-nowrap">{row.date}</td>
      <td className="py-4 px-5 text-gray-600 whitespace-nowrap">{row.type}</td>
      <td className="py-4 px-5 text-gray-600">{row.details}</td>
      <td className="py-4 px-5 text-gray-600 whitespace-nowrap">{row.qty}</td>
      <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
        {row.costPerUnit}
      </td>
      <td className="py-4 px-5 text-gray-700 font-medium whitespace-nowrap">
        {row.estCost}
      </td>
    </>
  );
}

// ── Pending Requests Table ────────────────────────────────────────────────────

function PendingTable({ rows }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
        <span className="text-base">🟠</span>
        <h3 className="text-sm font-bold text-gray-800">
          All Pending Requests
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {[...sharedCols, "Action"].map((col) => (
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
                <SharedCells row={row} />
                <td className="py-4 px-5 text-gray-400 italic whitespace-nowrap text-[11px]">
                  Awaiting Owner's Approval
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── History Table ─────────────────────────────────────────────────────────────

function HistoryTable({ rows }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
        <span className="text-base">🟠</span>
        <h3 className="text-sm font-bold text-gray-800">
          All Requests History
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {[...sharedCols, "Action"].map((col) => (
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
                <SharedCells row={row} />
                <td className="py-4 px-5">
                  <StatusBadge status={row.status} />
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

export default function Requests() {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Tab bar + action button */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center justify-between">
        <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "pending"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Pending Requests
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "history"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Requests History
          </button>
        </div>

        <button
          onClick={() => console.log("Create New Request")}
          className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          <Plus size={13} /> Create New Request
        </button>
      </div>

      {activeTab === "pending" ? (
        <PendingTable rows={pendingRows} />
      ) : (
        <HistoryTable rows={historyRows} />
      )}
    </main>
  );
}
