"use client";

import { useState } from "react";
import { ChevronDown, LayoutGrid } from "lucide-react";

// ── Placeholder data ──────────────────────────────────────────────────────────

const pendingRequests = [
  {
    id: "#FR-1040",
    date: "30 Aug 2025",
    type: "Finance",
    details: "Emergency antibiotics (mastitis outbreak)",
    qty: "50 Cows",
    cost: "₦150,000",
    by: "Vet Doctor",
  },
  {
    id: "#IR-2090",
    date: "28 Aug 2025",
    type: "Inventory",
    details: "20 new livestock ear tags",
    qty: "20 Cows",
    cost: "₦200,000",
    by: "Storekeeper",
  },
  {
    id: "#TR-5020",
    date: "29 Aug 2025",
    type: "Ranch Operation",
    details: "Expansion of grazing area fence",
    qty: "Area fencing",
    cost: "₦100,000",
    by: "Ranch Manager",
  },
  {
    id: "#FR-1040",
    date: "30 Aug 2025",
    type: "Finance",
    details: "Emergency antibiotics (mastitis outbreak)",
    qty: "50 Cows",
    cost: "₦150,000",
    by: "Vet Doctor",
  },
  {
    id: "#IR-2090",
    date: "28 Aug 2025",
    type: "Inventory",
    details: "20 new livestock ear tags",
    qty: "20 Cows",
    cost: "₦200,000",
    by: "Storekeeper",
  },
  {
    id: "#TR-5020",
    date: "29 Aug 2025",
    type: "Ranch Operation",
    details: "Expansion of grazing area fence",
    qty: "Area fencing",
    cost: "₦100,000",
    by: "Ranch Manager",
  },
  {
    id: "#FR-1040",
    date: "30 Aug 2025",
    type: "Finance",
    details: "Emergency antibiotics (mastitis outbreak)",
    qty: "50 Cows",
    cost: "₦150,000",
    by: "Vet Doctor",
  },
];

const approvalHistory = [
  {
    id: "#FR-1040",
    date: "30 Aug 2025",
    type: "Finance",
    details: "Emergency antibiotics (mastitis outbreak)",
    qty: "50 Cows",
    cost: "₦150,000",
    by: "Vet Doctor",
    status: "Approved",
  },
  {
    id: "#IR-2090",
    date: "28 Aug 2025",
    type: "Inventory",
    details: "20 new livestock ear tags",
    qty: "20 Cows",
    cost: "₦200,000",
    by: "Storekeeper",
    status: "Declined",
  },
  {
    id: "#TR-5020",
    date: "29 Aug 2025",
    type: "Ranch Operation",
    details: "Expansion of grazing area fence",
    qty: "Area fencing",
    cost: "₦100,000",
    by: "Ranch Manager",
    status: "Approved",
  },
  {
    id: "#FR-1040",
    date: "30 Aug 2025",
    type: "Finance",
    details: "Emergency antibiotics (mastitis outbreak)",
    qty: "50 Cows",
    cost: "₦150,000",
    by: "Vet Doctor",
    status: "Approved",
  },
  {
    id: "#IR-2090",
    date: "28 Aug 2025",
    type: "Inventory",
    details: "20 new livestock ear tags",
    qty: "20 Cows",
    cost: "₦200,000",
    by: "Storekeeper",
    status: "Declined",
  },
  {
    id: "#TR-5020",
    date: "29 Aug 2025",
    type: "Ranch Operation",
    details: "Expansion of grazing area fence",
    qty: "Area fencing",
    cost: "₦100,000",
    by: "Ranch Manager",
    status: "Approved",
  },
  {
    id: "#FR-1040",
    date: "30 Aug 2025",
    type: "Finance",
    details: "Emergency antibiotics (mastitis outbreak)",
    qty: "50 Cows",
    cost: "₦150,000",
    by: "Vet Doctor",
    status: "Approved",
  },
];

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const approved = status === "Approved";
  return (
    <span
      className={`flex items-center gap-1 text-xs font-semibold ${approved ? "text-[#4CAF50]" : "text-red-500"}`}
    >
      {approved ? "✅" : "❌"} {status}
    </span>
  );
}

// ── Shared table columns ──────────────────────────────────────────────────────

const sharedColumns = [
  "Request ID",
  "Date",
  "Request Type",
  "Details",
  "Units / Qty",
  "Est. Cost",
  "Requested By",
];

// ── Pending Table ─────────────────────────────────────────────────────────────

function PendingTable({ rows, onApprove, onDecline }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Section label */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
        <span className="text-base">🟠</span>
        <h3 className="text-sm font-bold text-gray-800">
          All Pending Approvals
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {[...sharedColumns, "Action"].map((col) => (
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
                <td className="py-4 px-5 font-medium text-gray-700 whitespace-nowrap">
                  {row.id}
                </td>
                <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                  {row.date}
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.type}
                </td>
                <td className="py-4 px-5 text-gray-600 max-w-40">
                  {row.details}
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.qty}
                </td>
                <td className="py-4 px-5 text-gray-700 font-medium whitespace-nowrap">
                  {row.cost}
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.by}
                </td>
                <td className="py-4 px-5">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onDecline?.(row)}
                      className="px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 text-[11px] font-medium transition-colors"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => onApprove?.(row)}
                      className="px-4 py-1.5 rounded-full bg-[#4CAF50] text-white hover:bg-[#43a047] text-[11px] font-medium transition-colors"
                    >
                      Approve
                    </button>
                  </div>
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
        <h3 className="text-sm font-bold text-gray-800">Approvals History</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {[...sharedColumns, "Status"].map((col) => (
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
                <td className="py-4 px-5 font-medium text-gray-700 whitespace-nowrap">
                  {row.id}
                </td>
                <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                  {row.date}
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.type}
                </td>
                <td className="py-4 px-5 text-gray-600 max-w-40">
                  {row.details}
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.qty}
                </td>
                <td className="py-4 px-5 text-gray-700 font-medium whitespace-nowrap">
                  {row.cost}
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.by}
                </td>
                <td className="py-4 px-5 whitespace-nowrap">
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

export default function RequestsApprovalsPage() {
  const [activeTab, setActiveTab] = useState("pending");
  const period = activeTab === "pending" ? "Last 7 days" : "Last 30 days";

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Tab bar + filter row */}
      <div className="flex items-center gap-3 justify-between flex-wrap-reverse">
        {/* Tabs */}
        <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "pending"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Pending Request
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "history"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Approvals History
          </button>
        </div>

        {/* Right controls */}
        <div className="flex w-full justify-end gap-3">
          <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <LayoutGrid size={15} className="text-gray-500" />
          </button>
          <button className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            {period} <ChevronDown size={13} />
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === "pending" ? (
        <PendingTable
          rows={pendingRequests}
          onApprove={(row) => console.log("Approved", row)}
          onDecline={(row) => console.log("Declined", row)}
        />
      ) : (
        <HistoryTable rows={approvalHistory} />
      )}
    </main>
  );
}
