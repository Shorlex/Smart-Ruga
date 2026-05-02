"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

// ── Placeholder data ──────────────────────────────────────────────────────────

const issueRows = [
  {
    date: "20 Aug 2025",
    item: "Maize",
    qty: "500 kg",
    issuedTo: "Worker Aliyu (012)",
    purpose: "Feeding of Herd A",
    total: "24,000",
    status: "Done",
  },
  {
    date: "18 Aug 2025",
    item: "Soy beans",
    qty: "350 kg",
    issuedTo: "Worker Musa (022)",
    purpose: "Feeding of Herd C",
    total: "16,000",
    status: "Done",
  },
  {
    date: "17 Aug 2025",
    item: "Antibiotics",
    qty: "5 Bottles",
    issuedTo: "Vet Dr. Musa (024)",
    purpose: "Herd A's Treatment",
    total: "50,000",
    status: "Done",
  },
  {
    date: "15 Aug 2025",
    item: "Soy beans",
    qty: "350 kg",
    issuedTo: "Worker Musa (022)",
    purpose: "Feeding of Herd C",
    total: "16,000",
    status: "Done",
  },
  {
    date: "14 Aug 2025",
    item: "Maize",
    qty: "500 kg",
    issuedTo: "Worker Aliyu (012)",
    purpose: "Feeding of Herd A",
    total: "24,000",
    status: "Done",
  },
  {
    date: "13 Aug 2025",
    item: "Antibiotics",
    qty: "5 Bottles",
    issuedTo: "Vet Dr. Musa (024)",
    purpose: "Herd A's Treatment",
    total: "50,000",
    status: "Done",
  },
  {
    date: "12 Aug 2025",
    item: "Maize",
    qty: "500 kg",
    issuedTo: "Worker Aliyu (012)",
    purpose: "Feeding of Herd A",
    total: "24,000",
    status: "Done",
  },
  {
    date: "10 Aug 2025",
    item: "Maize",
    qty: "500 kg",
    issuedTo: "Worker Aliyu (012)",
    purpose: "Feeding of Herd A",
    total: "24,000",
    status: "Done",
  },
];

const receiveRows = [
  {
    date: "20 Aug 2025",
    item: "Maize",
    qty: "6700 kg",
    supplier: "AgriFarm",
    unitCost: "650",
    total: "4,355,000",
    expiry: "——",
    status: "Done",
  },
  {
    date: "20 Aug 2025",
    item: "Soybeans",
    qty: "700 kg",
    supplier: "AgriFarm",
    unitCost: "720",
    total: "504,000",
    expiry: "——",
    status: "Done",
  },
  {
    date: "19 Aug 2025",
    item: "Ear Tags",
    qty: "24 Pcs",
    supplier: "Gritech Pro",
    unitCost: "6,000",
    total: "144,000",
    expiry: "——",
    status: "Done",
  },
  {
    date: "20 Aug 2025",
    item: "Vaccine (FMD)",
    qty: "200 Vials",
    supplier: "VetCare",
    unitCost: "1,200",
    total: "240,000",
    expiry: "28 Jun 2026",
    status: "Done",
  },
  {
    date: "20 Aug 2025",
    item: "Soybeans",
    qty: "700 kg",
    supplier: "AgriFarm",
    unitCost: "720",
    total: "504,000",
    expiry: "——",
    status: "Done",
  },
  {
    date: "19 Aug 2025",
    item: "Ear Tags",
    qty: "24 Pcs",
    supplier: "Gritech Pro",
    unitCost: "6,000",
    total: "144,000",
    expiry: "——",
    status: "Done",
  },
  {
    date: "20 Aug 2025",
    item: "Vaccine (FMD)",
    qty: "200 Vials",
    supplier: "VetCare",
    unitCost: "1,200",
    total: "240,000",
    expiry: "28 Jun 2026",
    status: "Done",
  },
  {
    date: "20 Aug 2025",
    item: "Soybeans",
    qty: "700 kg",
    supplier: "AgriFarm",
    unitCost: "720",
    total: "504,000",
    expiry: "——",
    status: "Done",
  },
  {
    date: "20 Aug 2025",
    item: "Maize",
    qty: "420 kg",
    supplier: "AgriFarm",
    unitCost: "——",
    total: "24,000",
    expiry: "——",
    status: "Done",
  },
];

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold text-[#4CAF50]">
      <span className="w-2 h-2 rounded-full bg-[#4CAF50]" /> {status}
    </span>
  );
}

// ── Issue Stock Table ─────────────────────────────────────────────────────────

function IssueStockTable({ rows, onIssue }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {[
                "Date",
                "Item Name",
                "Quantity",
                "Issued To",
                "Purpose",
                "Total Value (₦)",
                "Status",
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
                  {row.qty}
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.issuedTo}
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.purpose}
                </td>
                <td className="py-4 px-5 text-gray-700 font-medium whitespace-nowrap">
                  {row.total}
                </td>
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

// ── Receive Stock Table ───────────────────────────────────────────────────────

function ReceiveStockTable({ rows, onReceive }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {[
                "Date",
                "Item Name",
                "Quantity",
                "Supplier",
                "Unit Cost (₦)",
                "Total Value (₦)",
                "Expiry Date",
                "Status",
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
                  {row.qty}
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.supplier}
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.unitCost}
                </td>
                <td className="py-4 px-5 text-gray-700 font-medium whitespace-nowrap">
                  {row.total}
                </td>
                <td className="py-4 px-5 text-gray-400 whitespace-nowrap">
                  {row.expiry}
                </td>
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

export default function StockLedgerPage() {
  const [activeTab, setActiveTab] = useState("issue");

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Tab bar + action button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
          <button
            onClick={() => setActiveTab("issue")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "issue"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Issue Stock
          </button>
          <button
            onClick={() => setActiveTab("receive")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "receive"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Receive Stock
          </button>
        </div>

        {activeTab === "issue" ? (
          <button
            onClick={() => console.log("Issue Out Stock")}
            className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <Plus size={13} /> Issue Out Stock
          </button>
        ) : (
          <button
            onClick={() => console.log("Receive In Stock")}
            className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <Plus size={13} /> Receive In Stock
          </button>
        )}
      </div>

      {/* Content */}
      {activeTab === "issue" ? (
        <IssueStockTable rows={issueRows} />
      ) : (
        <ReceiveStockTable rows={receiveRows} />
      )}
    </main>
  );
}
