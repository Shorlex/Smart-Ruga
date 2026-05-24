"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, RefreshCw, Search, Edit, X, Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getSlug() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_token") ?? "";
}

// ── Alert Badge ───────────────────────────────────────────────────────────────

function AlertBadge({ level }) {
  const s = (level ?? "").toLowerCase();
  const styles = {
    high: "bg-red-50 text-red-500",
    medium: "bg-amber-50 text-amber-500",
    low: "bg-[#f0fdf4] text-[#4CAF50]",
    true: "bg-red-50 text-red-500", // isLowStock: true
    false: "bg-[#f0fdf4] text-[#4CAF50]",
  };
  const dots = {
    high: "bg-red-500",
    medium: "bg-amber-400",
    low: "bg-[#4CAF50]",
    true: "bg-red-500",
    false: "bg-[#4CAF50]",
  };
  const label = s === "true" ? "Low" : s === "false" ? "OK" : (level ?? "—");
  return (
    <span
      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${styles[s] ?? "bg-gray-100 text-gray-500"}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${dots[s] ?? "bg-gray-400"}`}
      />
      {label}
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function InventoryPage({ isReadOnly = false }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [lowStock, setLowStock] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // item being edited
  const [editItem, setEditItem] = useState(null); // item being edited

  const fetchInventory = useCallback(async (filterLowStock = false) => {
    setLoading(true);
    setError("");
    try {
      const endpoint = filterLowStock
        ? `${API}/ranches/${getSlug()}/inventory-items/low-stock`
        : `${API}/ranches/${getSlug()}/inventory-items`;

      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (!res.ok) throw new Error(`Failed to fetch inventory (${res.status})`);

      const json = await res.json();
      console.log("✅ Inventory API response:", JSON.stringify(json, null, 2));

      // Actual shape: { data: { items: [] } }
      const list =
        json?.data?.items ??
        json?.items ??
        (Array.isArray(json?.data) ? json.data : []);
      console.log("✅ Inventory parsed:", list.length, "items");
      setItems(list);
    } catch (err) {
      console.error("❌ Inventory fetch error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory(lowStock);
  }, [lowStock, fetchInventory]);

  // Local search filter on top of API results
  const filtered = items.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (item.name ?? "").toLowerCase().includes(q) ||
      (item.category ?? "").toLowerCase().includes(q) ||
      (item.sku ?? item.code ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4 justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-800 shrink-0">
            Inventory
          </h1>
          {!loading && !error && (
            <p className="text-xs text-gray-400 mt-0.5">
              {items.length} item{items.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <div className="relative flex-1 max-w-lg">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inventory..."
            className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-[#4CAF50] transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Low stock toggle */}
          <button
            onClick={() => setLowStock((v) => !v)}
            className={`text-xs font-medium px-3 py-2 rounded-lg border transition-colors ${
              lowStock
                ? "border-red-300 bg-red-50 text-red-500"
                : "border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {lowStock ? "⚠️ Low Stock" : "All Items"}
          </button>
          <button
            onClick={() => fetchInventory(lowStock)}
            className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          </button>
          {!isReadOnly && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              <Plus size={13} /> Add New Item
            </button>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="h-3 bg-gray-100 rounded w-32" />
              <div className="h-3 bg-gray-100 rounded w-20" />
              <div className="h-3 bg-gray-100 rounded flex-1" />
              <div className="h-3 bg-gray-100 rounded w-16" />
              <div className="h-3 bg-gray-100 rounded w-16" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center space-y-2">
          <p className="text-sm text-red-500">{error}</p>
          <button
            onClick={() => fetchInventory(lowStock)}
            className="text-xs text-[#4CAF50] hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
          <p className="text-sm text-gray-400">
            {lowStock
              ? "No low stock items found."
              : search
                ? "No items match your search."
                : "No inventory items yet."}
          </p>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="mt-2 text-xs text-[#4CAF50] hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {/* Table */}
      {!loading && !error && filtered.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    "Item Name / SKU",
                    "Category",
                    "Qty on Hand",
                    "Reorder Level",
                    "Low Stock",
                    "Created At",
                    "Status",
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
                    key={item.publicId ?? i}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <td className="py-4 px-5 whitespace-nowrap">
                      <p className="font-medium text-gray-800">
                        {item.name ?? "—"}
                      </p>
                      {item.sku && (
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {item.sku}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-5 text-gray-500 whitespace-nowrap capitalize">
                      {item.category ?? "—"}
                    </td>
                    <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                      {item.quantityOnHand != null
                        ? `${item.quantityOnHand} ${item.unit ?? ""}`.trim()
                        : "—"}
                    </td>
                    <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                      {item.reorderLevel != null
                        ? `${item.reorderLevel} ${item.unit ?? ""}`.trim()
                        : "—"}
                    </td>
                    <td className="py-4 px-5">
                      <AlertBadge level={item.isLowStock ? "high" : "low"} />
                    </td>
                    <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                      {item.isActive ? (
                        <span className="text-[#4CAF50] font-medium">
                          Active
                        </span>
                      ) : (
                        <span className="text-gray-400">Inactive</span>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      {!isReadOnly && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingItem(item);
                          }}
                          className="flex items-center gap-1 text-[#4CAF50] hover:text-[#43a047] font-semibold text-xs transition-colors"
                        >
                          Edit <Edit size={11} />
                        </button>
                      )}
                      {isReadOnly && (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Add Item Modal */}
      {showModal && (
        <AddItemModal
          onClose={() => setShowModal(false)}
          onSuccess={() => fetchInventory(lowStock)}
        />
      )}

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSuccess={() => {
            fetchInventory(lowStock);
            setEditingItem(null);
          }}
        />
      )}
    </main>
  );
}

// ── Edit Item Modal ───────────────────────────────────────────────────────────

function EditItemModal({ item, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: item.name ?? "",
    category: item.category ?? "",
    unit: item.unit ?? "",
    sku: item.sku ?? "",
    description: item.description ?? "",
    quantityOnHand: item.quantityOnHand ?? "",
    reorderLevel: item.reorderLevel ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isValid = form.name && form.category && form.unit;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Only send fields that changed
      const body = {};
      const fields = ["name", "category", "unit", "sku", "description"];
      fields.forEach((k) => {
        if (form[k] !== (item[k] ?? "")) body[k] = form[k];
      });
      if (String(form.quantityOnHand) !== String(item.quantityOnHand ?? ""))
        body.quantityOnHand = Number(form.quantityOnHand);
      if (String(form.reorderLevel) !== String(item.reorderLevel ?? ""))
        body.reorderLevel = Number(form.reorderLevel);

      if (Object.keys(body).length === 0) {
        onClose();
        return;
      } // nothing changed

      const res = await fetch(
        `${API}/ranches/${getSlug()}/inventory-items/${item.publicId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        const err = await res.json();
        console.error("❌ Edit item error:", JSON.stringify(err, null, 2));
        throw new Error(
          err.message ??
            JSON.stringify(err.errors?.fieldErrors ?? err) ??
            "Failed to update item",
        );
      }

      console.log("✅ Item updated:", await res.json());
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const CATEGORIES = [
    "feed",
    "medicine",
    "equipment",
    "supplement",
    "chemical",
    "tool",
    "other",
  ];
  const UNITS = [
    "kg",
    "g",
    "litre",
    "ml",
    "pack",
    "bag",
    "roll",
    "unit",
    "box",
    "piece",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-800">Edit Item</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">
              {item.sku ?? item.publicId?.slice(0, 8)}
            </p>
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

          {/* Name + SKU */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Item Name <span className="text-red-400">*</span>
              </label>
              <input
                value={form.name}
                onChange={set("name")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                SKU
              </label>
              <input
                value={form.sku}
                onChange={set("sku")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors"
              />
            </div>
          </div>

          {/* Category + Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                value={form.category}
                onChange={set("category")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors appearance-none"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="capitalize">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Unit <span className="text-red-400">*</span>
              </label>
              <select
                value={form.unit}
                onChange={set("unit")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors appearance-none"
              >
                <option value="">Select unit</option>
                {UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Qty on Hand + Reorder Level */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Quantity on Hand
              </label>
              <input
                type="number"
                min="0"
                value={form.quantityOnHand}
                onChange={set("quantityOnHand")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Reorder Level
              </label>
              <input
                type="number"
                min="0"
                value={form.reorderLevel}
                onChange={set("reorderLevel")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={3}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors resize-none"
            />
          </div>

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
                  ? "bg-[#4CAF50] hover:bg-[#43a047]"
                  : "bg-[#a5d6a7] cursor-not-allowed"
              }`}
            >
              {loading && <Loader2 size={12} className="animate-spin" />}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddItemModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    unit: "",
    sku: "",
    description: "",
    quantityOnHand: "",
    reorderLevel: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isValid = form.name && form.category && form.unit;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("category", form.category);
      data.append("unit", form.unit);
      if (form.sku) data.append("sku", form.sku);
      if (form.description) data.append("description", form.description);
      if (form.quantityOnHand)
        data.append("quantityOnHand", Number(form.quantityOnHand));
      if (form.reorderLevel)
        data.append("reorderLevel", Number(form.reorderLevel));
      if (image) data.append("image", image);

      const res = await fetch(`${API}/ranches/${getSlug()}/inventory-items`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: data,
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("❌ Add item error:", JSON.stringify(err, null, 2));
        throw new Error(
          err.message ??
            JSON.stringify(err.errors?.fieldErrors ?? err) ??
            "Failed to add item",
        );
      }

      console.log("✅ Item added:", await res.json());
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const CATEGORIES = [
    "feed",
    "medicine",
    "equipment",
    "supplement",
    "chemical",
    "tool",
    "other",
  ];
  const UNITS = [
    "kg",
    "g",
    "litre",
    "ml",
    "pack",
    "bag",
    "roll",
    "unit",
    "box",
    "piece",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Add New Item</h3>
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

          {/* Name + SKU */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Item Name <span className="text-red-400">*</span>
              </label>
              <input
                value={form.name}
                onChange={set("name")}
                placeholder="e.g. Vitamin Supplement"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                SKU
              </label>
              <input
                value={form.sku}
                onChange={set("sku")}
                placeholder="e.g. GF-MED-201"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
              />
            </div>
          </div>

          {/* Category + Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                value={form.category}
                onChange={set("category")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors appearance-none"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="capitalize">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Unit <span className="text-red-400">*</span>
              </label>
              <select
                value={form.unit}
                onChange={set("unit")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors appearance-none"
              >
                <option value="">Select unit</option>
                {UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Qty on Hand + Reorder Level */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Quantity on Hand
              </label>
              <input
                type="number"
                min="0"
                value={form.quantityOnHand}
                onChange={set("quantityOnHand")}
                placeholder="e.g. 24"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Reorder Level
              </label>
              <input
                type="number"
                min="0"
                value={form.reorderLevel}
                onChange={set("reorderLevel")}
                placeholder="e.g. 6"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={3}
              placeholder="Brief description of the item..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors resize-none"
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Item Photo (optional)
            </label>
            <label className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 flex flex-col items-center gap-1.5 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] transition-colors cursor-pointer bg-gray-50">
              <span className="text-lg">📦</span>
              <span className="text-xs font-medium">
                {image ? image.name : "Click to upload photo"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

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
                  ? "bg-[#4CAF50] hover:bg-[#43a047]"
                  : "bg-[#a5d6a7] cursor-not-allowed"
              }`}
            >
              {loading && <Loader2 size={12} className="animate-spin" />}
              {loading ? "Adding..." : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
