"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Search } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getToken() {
  return localStorage.getItem("sr_token") ?? "";
}

// ── Create Ranch Modal ────────────────────────────────────────────────────────

function CreateRanchModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    locationName: "",
    address: "",
    latitude: "",
    longitude: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isValid = form.name && form.slug;

  // Auto-generate slug from name
  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setForm((f) => ({ ...f, name, slug }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const body = {
        name: form.name,
        slug: form.slug,
      };
      if (form.locationName) body.locationName = form.locationName;
      if (form.address) body.address = form.address;
      if (form.latitude) body.latitude = Number(form.latitude);
      if (form.longitude) body.longitude = Number(form.longitude);

      const res = await fetch(`${API}/ranches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? "Failed to create ranch");
      }
      const json = await res.json();
      console.log("✅ Create ranch:", json);
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
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-800">
              Create New Ranch
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Ranch will be assigned to you as owner
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 text-xs text-red-500">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Ranch Name <span className="text-red-400">*</span>
            </label>
            <input
              value={form.name}
              onChange={handleNameChange}
              placeholder="e.g. Greenfield Ranch"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#0f172a] transition-colors"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Slug <span className="text-red-400">*</span>
            </label>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#0f172a] transition-colors">
              <span className="px-3 text-xs text-gray-400 border-r border-gray-200 py-2.5 bg-gray-100 whitespace-nowrap">
                smartruga.com/
              </span>
              <input
                value={form.slug}
                onChange={set("slug")}
                placeholder="greenfield-ranch"
                className="flex-1 px-3 py-2.5 text-xs text-gray-700 bg-transparent focus:outline-none"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              Auto-generated from name — can be edited
            </p>
          </div>

          {/* Location Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Location Name
            </label>
            <input
              value={form.locationName}
              onChange={set("locationName")}
              placeholder="e.g. Kaduna, Nigeria"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#0f172a] transition-colors"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Address
            </label>
            <textarea
              value={form.address}
              onChange={set("address")}
              rows={2}
              placeholder="Full address..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#0f172a] resize-none transition-colors"
            />
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                value={form.latitude}
                onChange={set("latitude")}
                placeholder="e.g. 10.5204"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#0f172a] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                value={form.longitude}
                onChange={set("longitude")}
                placeholder="e.g. 7.4471"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#0f172a] transition-colors"
              />
            </div>
          </div>

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
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors ${
                isValid && !loading
                  ? "bg-[#0f172a] hover:bg-[#1e293b]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {loading && <Loader2 size={12} className="animate-spin" />}
              {loading ? "Creating..." : "Create Ranch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RanchesPage() {
  const [ranches, setRanches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchRanches = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/ranches`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      console.log("✅ SA Ranches:", json);
      setRanches(json?.data?.ranches ?? json?.ranches ?? json?.data ?? []);
    } catch {
      setRanches([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRanches();
  }, [fetchRanches]);

  // Client-side search filter
  const filtered = ranches.filter(
    (r) =>
      !search ||
      (r.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (r.slug ?? "").toLowerCase().includes(search.toLowerCase()),
  );

  const statusColor = (status) =>
    ({
      active: "bg-[#f0fdf4] text-[#4CAF50]",
      inactive: "bg-gray-100  text-gray-400",
      pending: "bg-amber-50  text-amber-500",
    })[status ?? "active"] ?? "bg-gray-100 text-gray-500";

  return (
    <div className="px-6 py-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-800">Ranches</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {ranches.length} total ranches
          </p>
        </div>
        <button
          onClick={fetchRanches}
          className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Info note */}
      <div className="bg-[#f0fdf4] border border-[#d1fae5] rounded-xl px-4 py-3 text-xs text-gray-600">
        💡 Ranches are created by{" "}
        <span className="font-semibold text-[#4CAF50]">admins</span>. To onboard
        a new ranch owner — go to <span className="font-semibold">Users</span>,
        find the user and elevate their platform role to{" "}
        <span className="font-semibold">admin</span>. They can then create their
        own ranch from their dashboard.
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search
          size={13}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search ranches..."
          className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-4 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#0f172a] transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="h-4 bg-gray-100 rounded flex-1" />
                <div className="h-4 bg-gray-100 rounded w-32" />
                <div className="h-4 bg-gray-100 rounded w-20" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <p className="text-2xl">🏡</p>
            <p className="text-sm font-semibold text-gray-600">
              {search ? "No ranches match your search" : "No ranches yet"}
            </p>
            {!search && (
              <button
                onClick={() => setShowCreate(true)}
                className="text-xs text-[#0f172a] font-semibold hover:underline"
              >
                Create the first ranch →
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Ranch Name", "Slug", "Your Role", "Status"].map((col) => (
                    <th
                      key={col}
                      className="text-left py-3 px-5 text-gray-400 font-medium whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr
                    key={r.id ?? i}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-5">
                      <p className="font-semibold text-gray-800">
                        {r.name ?? "—"}
                      </p>
                    </td>
                    <td className="py-4 px-5 text-gray-400 font-mono text-[11px]">
                      {r.slug ?? "—"}
                    </td>
                    <td className="py-4 px-5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize bg-[#f0fdf4] text-[#4CAF50]">
                        {r.role ?? "—"}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize ${statusColor(r.status)}`}
                      >
                        {r.status ?? "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
