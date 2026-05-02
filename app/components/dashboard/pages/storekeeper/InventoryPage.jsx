"use client";

import { useState } from "react";
import { ArrowLeft, Search, Plus, Edit } from "lucide-react";

// ── Placeholder data ──────────────────────────────────────────────────────────

const inventoryItems = [
  {
    name: "Maize",
    stockIn: "2,500 kg",
    remaining: "2,050 kg",
    avgDaily: "420 kg",
    alert: "High",
    lastRestock: "20 Aug 2025",
    expiry: "28 Aug 2025",
  },
  {
    name: "Maize",
    stockIn: "2,500 kg",
    remaining: "2,050 kg",
    avgDaily: "420 kg",
    alert: "Medium",
    lastRestock: "20 Aug 2025",
    expiry: "28 Aug 2025",
  },
  {
    name: "Maize",
    stockIn: "2,500 kg",
    remaining: "2,050 kg",
    avgDaily: "420 kg",
    alert: "Low",
    lastRestock: "20 Aug 2025",
    expiry: "28 Aug 2025",
  },
  {
    name: "Maize",
    stockIn: "2,500 kg",
    remaining: "2,050 kg",
    avgDaily: "420 kg",
    alert: "Low",
    lastRestock: "20 Aug 2025",
    expiry: "28 Aug 2025",
  },
  {
    name: "Maize",
    stockIn: "2,500 kg",
    remaining: "2,050 kg",
    avgDaily: "420 kg",
    alert: "Medium",
    lastRestock: "20 Aug 2025",
    expiry: "28 Aug 2025",
  },
  {
    name: "Maize",
    stockIn: "2,500 kg",
    remaining: "2,050 kg",
    avgDaily: "420 kg",
    alert: "Low",
    lastRestock: "20 Aug 2025",
    expiry: "28 Aug 2025",
  },
  {
    name: "Maize",
    stockIn: "2,500 kg",
    remaining: "2,050 kg",
    avgDaily: "420 kg",
    alert: "Low",
    lastRestock: "20 Aug 2025",
    expiry: "28 Aug 2025",
  },
  {
    name: "Maize",
    stockIn: "2,500 kg",
    remaining: "2,050 kg",
    avgDaily: "420 kg",
    alert: "Medium",
    lastRestock: "20 Aug 2025",
    expiry: "28 Aug 2025",
  },
];

const stockMovements = [
  {
    date: "10 September 2025",
    action: "Issued",
    qty: "150Kg",
    by: "Worker Aliyu",
    notes: "Feeding Herd A",
    total: "300,000",
    status: "Done",
  },
  {
    date: "10 September 2025",
    action: "Issued",
    qty: "150Kg",
    by: "Worker Aliyu",
    notes: "Feeding Herd A",
    total: "300,000",
    status: "Done",
  },
  {
    date: "10 September 2025",
    action: "Issued",
    qty: "150Kg",
    by: "Worker Aliyu",
    notes: "Feeding Herd A",
    total: "300,000",
    status: "Done",
  },
  {
    date: "10 September 2025",
    action: "Issued",
    qty: "150Kg",
    by: "Worker Aliyu",
    notes: "Feeding Herd A",
    total: "300,000",
    status: "Done",
  },
  {
    date: "10 September 2025",
    action: "Issued",
    qty: "150Kg",
    by: "Worker Aliyu",
    notes: "Feeding Herd A",
    total: "300,000",
    status: "Done",
  },
  {
    date: "10 September 2025",
    action: "Issued",
    qty: "150Kg",
    by: "Worker Aliyu",
    notes: "Feeding Herd A",
    total: "300,000",
    status: "Done",
  },
];

// ── Alert Badge ───────────────────────────────────────────────────────────────

function AlertBadge({ level }) {
  const styles = {
    High: { bg: "bg-red-50   text-red-500", dot: "bg-red-500" },
    Medium: { bg: "bg-amber-50 text-amber-500", dot: "bg-amber-400" },
    Low: { bg: "bg-[#f0fdf4] text-[#4CAF50]", dot: "bg-[#4CAF50]" },
  };
  const s = styles[level] ?? {
    bg: "bg-gray-100 text-gray-500",
    dot: "bg-gray-400",
  };
  return (
    <span
      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${s.bg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {level}
    </span>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold text-[#4CAF50]">
      <span className="w-2 h-2 rounded-full bg-[#4CAF50]" /> {status}
    </span>
  );
}

// ── Item Overview (detail view) ───────────────────────────────────────────────

function ItemOverview({ item, onBack }) {
  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={15} /> Back
      </button>

      {/* Info cards */}
      <div className="grid grid-cols-1 lg:flex gap-4">
        {/* Item Overview */}
        <div className="flex-3 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">
            Item Overview
          </h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-5">
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">Item Name:</p>
              <p className="text-sm font-bold text-gray-800">Maize Feed</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">
                Current Stock Avail:
              </p>
              <p className="text-sm font-bold text-gray-800">2,050 kg</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">
                Unit Of Measure:
              </p>
              <p className="text-sm font-bold text-gray-800">Kilogram (Kg)</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">Item Code:</p>
              <p className="text-sm font-bold text-gray-800">INV-FEED-001</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">
                Low Stock Alert:
              </p>
              <AlertBadge level="High" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">Category:</p>
              <p className="text-sm font-bold text-gray-800">Feed</p>
            </div>
          </div>
        </div>

        {/* Stock Summary */}
        <div className="flex-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">
            Stock Summary
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">
                Total Stock In:
              </p>
              <p className="text-sm font-bold text-gray-800">2,500 Kg</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">
                Total Issued (This Month):
              </p>
              <p className="text-sm font-bold text-gray-800">1,200 Kg</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] text-gray-400 mb-0.5">
                Current Value in Store:
              </p>
              <p className="text-sm font-bold text-gray-800">
                ₦512,500 (2,050 × ₦250)
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">
                Average Daily Usage:
              </p>
              <p className="text-sm font-bold text-gray-800">120 Kg</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">Cost per Unit:</p>
              <p className="text-sm font-bold text-gray-800">₦250</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Movements table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-4">
          Stock Movements
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 rounded-lg">
                {[
                  "Date",
                  "Action",
                  "Quantity",
                  "Issued/Received By",
                  "Purpose/Notes",
                  "Total Value (₦)",
                  "Status",
                ].map((col) => (
                  <th
                    key={col}
                    className="text-left py-3 px-4 text-gray-500 font-medium whitespace-nowrap first:rounded-l-lg last:rounded-r-lg"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stockMovements.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-gray-500 whitespace-nowrap">
                    {row.date}
                  </td>
                  <td className="py-4 px-4 text-gray-600 whitespace-nowrap">
                    {row.action}
                  </td>
                  <td className="py-4 px-4 text-gray-600 whitespace-nowrap">
                    {row.qty}
                  </td>
                  <td className="py-4 px-4 text-gray-600 whitespace-nowrap">
                    {row.by}
                  </td>
                  <td className="py-4 px-4 text-gray-600 whitespace-nowrap">
                    {row.notes}
                  </td>
                  <td className="py-4 px-4 text-gray-700 font-medium whitespace-nowrap">
                    {row.total}
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

// ── Inventory List ────────────────────────────────────────────────────────────

export default function InventoryPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");

  if (selectedItem) {
    return (
      <ItemOverview item={selectedItem} onBack={() => setSelectedItem(null)} />
    );
  }

  const filtered = inventoryItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4 justify-between">
        <h1 className="text-base font-bold text-gray-800 shrink-0">
          Inventory
        </h1>
        <div className="relative flex-1 max-w-lg">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for inventory...."
            className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-[#4CAF50] transition-colors"
          />
        </div>
        <button className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors shrink-0">
          <Plus size={13} /> Add New Item
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                {[
                  "Item Name",
                  "Stock In (Total)",
                  "Stock Remaining",
                  "Avg Daily Use",
                  "Low Stock Alert",
                  "Last Restock Date",
                  "Expiry Date",
                  "Actions",
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
              {filtered.map((item, i) => (
                <tr
                  key={i}
                  onClick={() => setSelectedItem(item)}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-5 font-medium text-gray-800 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                    {item.stockIn}
                  </td>
                  <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                    {item.remaining}
                  </td>
                  <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                    {item.avgDaily}
                  </td>
                  <td className="py-4 px-5">
                    <AlertBadge level={item.alert} />
                  </td>
                  <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                    {item.lastRestock}
                  </td>
                  <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                    {item.expiry}
                  </td>
                  <td className="py-4 px-5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Edit", item);
                      }}
                      className="flex items-center gap-1 text-[#4CAF50] hover:text-[#43a047] font-semibold transition-colors"
                    >
                      Edit <Edit size={11} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
