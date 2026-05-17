"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, RefreshCw, X, Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getSlug() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_token") ?? "";
}

function formatDate(str) {
  if (!str) return "—";
  return new Date(str).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ── Type badge ────────────────────────────────────────────────────────────────

function TypeBadge({ type }) {
  const t = (type ?? "").toLowerCase();
  const map = {
    stock_in: { label: "Stock In", cls: "bg-[#f0fdf4] text-[#4CAF50]" },
    stock_out: { label: "Stock Out", cls: "bg-red-50   text-red-500" },
    adjustment: { label: "Adjustment", cls: "bg-blue-50  text-blue-500" },
  };
  const { label, cls } = map[t] ?? {
    label: type ?? "—",
    cls: "bg-gray-100 text-gray-500",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${cls}`}
    >
      {label}
    </span>
  );
}

// ── Stock Movement Modal ──────────────────────────────────────────────────────

const TYPE_CONFIG = {
  stock_in: {
    title: "Receive In Stock",
    btnLabel: "Record Receipt",
    btnCls: "bg-[#4CAF50] hover:bg-[#43a047]",
  },
  stock_out: {
    title: "Issue Out Stock",
    btnLabel: "Record Issue",
    btnCls: "bg-[#4CAF50] hover:bg-[#43a047]",
  },
  adjustment: {
    title: "Record Adjustment",
    btnLabel: "Save Adjustment",
    btnCls: "bg-blue-500  hover:bg-blue-600",
  },
};

function StockMovementModal({ type, onClose, onSuccess }) {
  const config = TYPE_CONFIG[type] ?? TYPE_CONFIG.stock_in;

  const [form, setForm] = useState({
    quantity: "",
    reason: "",
    referenceType: "",
    referencePublicId: "",
  });
  const [selectedItemId, setSelectedItemId] = useState("");
  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isValid = selectedItemId && form.quantity && Number(form.quantity) > 0;

  // Fetch inventory items for the dropdown
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/ranches/${getSlug()}/inventory-items`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!res.ok) throw new Error();
        const json = await res.json();
        setItems(json?.data?.items ?? json?.items ?? []);
      } catch {
        setItems([]);
      } finally {
        setItemsLoading(false);
      }
    };
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const body = {
        type,
        quantity: Number(form.quantity),
        reason: form.reason || undefined,
      };
      if (form.referenceType) body.referenceType = form.referenceType;
      if (form.referencePublicId)
        body.referencePublicId = form.referencePublicId;

      const res = await fetch(
        `${API}/ranches/${getSlug()}/inventory-items/${selectedItemId}/movements`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        const err = await res.json();
        console.error("❌ Movement error:", JSON.stringify(err, null, 2));
        throw new Error(
          err.message ??
            JSON.stringify(err.errors?.fieldErrors ?? err) ??
            "Failed to record movement",
        );
      }

      console.log("✅ Movement recorded:", await res.json());
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <h3 className="text-sm font-bold text-gray-800">{config.title}</h3>
            <TypeBadge type={type} />
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-500">
              {error}
            </div>
          )}

          {/* Item dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Inventory Item <span className="text-red-400">*</span>
            </label>
            {itemsLoading ? (
              <div className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-400 animate-pulse">
                Loading items...
              </div>
            ) : (
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors appearance-none"
              >
                <option value="">Select item</option>
                {items.map((item) => (
                  <option key={item.publicId} value={item.publicId}>
                    {item.name} — {item.quantityOnHand} {item.unit} on hand
                  </option>
                ))}
                {items.length === 0 && <option disabled>No items found</option>}
              </select>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Quantity <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={form.quantity}
              onChange={set("quantity")}
              placeholder="e.g. 10"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Reason
            </label>
            <textarea
              value={form.reason}
              onChange={set("reason")}
              rows={2}
              placeholder={
                type === "stock_in"
                  ? "e.g. Received from supplier..."
                  : type === "stock_out"
                    ? "e.g. Issued for Herd A feeding..."
                    : "e.g. Corrected count after audit..."
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors resize-none"
            />
          </div>

          {/* Reference (optional, collapsible) */}
          <details className="group">
            <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600 select-none list-none flex items-center gap-1">
              <span className="group-open:rotate-90 transition-transform inline-block">
                ▶
              </span>
              Reference (optional)
            </summary>
            <div className="mt-3 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Reference Type
                </label>
                <input
                  value={form.referenceType}
                  onChange={set("referenceType")}
                  placeholder="e.g. task, concern, purchase_order"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Reference Public ID
                </label>
                <input
                  value={form.referencePublicId}
                  onChange={set("referencePublicId")}
                  placeholder="UUID of the reference record"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
                />
              </div>
            </div>
          </details>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || loading}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5 ${
                isValid && !loading
                  ? config.btnCls
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {loading && <Loader2 size={12} className="animate-spin" />}
              {loading ? "Recording..." : config.btnLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Shared movement table ─────────────────────────────────────────────────────

function MovementTable({ rows, columns, emptyMsg }) {
  if (rows.length === 0)
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
        <p className="text-sm text-gray-400">{emptyMsg}</p>
      </div>
    );

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((col) => (
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
                key={row.publicId ?? i}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                  {formatDate(row.createdAt)}
                </td>
                <td className="py-4 px-5 whitespace-nowrap">
                  <p className="font-medium text-gray-700">
                    {row.item?.name ?? "—"}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5 capitalize">
                    {row.item?.category ?? ""}
                  </p>
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.quantity != null
                    ? `${row.quantity} ${row.item?.unit ?? ""}`.trim()
                    : "—"}
                </td>
                <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                  {row.previousQuantity != null
                    ? `${row.previousQuantity} ${row.item?.unit ?? ""}`.trim()
                    : "—"}
                </td>
                <td className="py-4 px-5 text-gray-700 font-medium whitespace-nowrap">
                  {row.newQuantity != null
                    ? `${row.newQuantity} ${row.item?.unit ?? ""}`.trim()
                    : "—"}
                </td>
                <td className="py-4 px-5 text-gray-500 max-w-40">
                  {row.reason ?? "—"}
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.recordedByUser?.name ?? row.recordedByUser?.email ?? "—"}
                </td>
                {columns.includes("Type") && (
                  <td className="py-4 px-5">
                    <TypeBadge type={row.type} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const TABS = [
  { key: "stock_out", label: "Issue Stock" },
  { key: "stock_in", label: "Receive Stock" },
  { key: "adjustment", label: "Adjustments" },
];

const COLS_OUT = [
  "Date",
  "Item Name",
  "Qty Issued",
  "Prev. Qty",
  "New Qty",
  "Reason",
  "Recorded By",
];
const COLS_IN = [
  "Date",
  "Item Name",
  "Qty Received",
  "Prev. Qty",
  "New Qty",
  "Reason",
  "Recorded By",
];
const COLS_ADJ = [
  "Date",
  "Item Name",
  "Qty Changed",
  "Prev. Qty",
  "New Qty",
  "Reason",
  "Recorded By",
  "Type",
];
const colsMap = {
  stock_out: COLS_OUT,
  stock_in: COLS_IN,
  adjustment: COLS_ADJ,
};
const emptyMap = {
  stock_out: "No stock issues recorded yet.",
  stock_in: "No stock receipts recorded yet.",
  adjustment: "No adjustments recorded yet.",
};

export default function StockLedgerPage() {
  const [activeTab, setActiveTab] = useState("stock_out");
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalType, setModalType] = useState(null); // "stock_in" | "stock_out" | "adjustment" | null

  const fetchMovements = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${API}/ranches/${getSlug()}/inventory-items/recent-movements`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      );
      if (!res.ok) throw new Error(`Failed to fetch movements (${res.status})`);
      const json = await res.json();
      const list =
        json?.data?.movements ??
        json?.movements ??
        (Array.isArray(json?.data) ? json.data : []);
      setMovements(list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  const filtered = movements.filter((m) => m.type === activeTab);

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Tab bar + action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === key
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {label}
              {!loading && (
                <span
                  className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeTab === key
                      ? "bg-gray-100 text-gray-600"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {movements.filter((m) => m.type === key).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchMovements}
            className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          </button>
          {activeTab === "stock_out" && (
            <button
              onClick={() => setModalType("stock_out")}
              className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              <Plus size={13} /> Issue Out Stock
            </button>
          )}
          {activeTab === "stock_in" && (
            <button
              onClick={() => setModalType("stock_in")}
              className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              <Plus size={13} /> Receive In Stock
            </button>
          )}
          {activeTab === "adjustment" && (
            <button
              onClick={() => setModalType("adjustment")}
              className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              <Plus size={13} /> New Adjustment
            </button>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="h-3 bg-gray-100 rounded w-20" />
              <div className="h-3 bg-gray-100 rounded w-28" />
              <div className="h-3 bg-gray-100 rounded flex-1" />
              <div className="h-3 bg-gray-100 rounded w-20" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center space-y-2">
          <p className="text-sm text-red-500">{error}</p>
          <button
            onClick={fetchMovements}
            className="text-xs text-[#4CAF50] hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <MovementTable
          rows={filtered}
          columns={colsMap[activeTab]}
          emptyMsg={emptyMap[activeTab]}
        />
      )}

      {/* Stock Movement Modal */}
      {modalType && (
        <StockMovementModal
          type={modalType}
          onClose={() => setModalType(null)}
          onSuccess={() => {
            fetchMovements();
            setModalType(null);
          }}
        />
      )}
    </main>
  );
}
