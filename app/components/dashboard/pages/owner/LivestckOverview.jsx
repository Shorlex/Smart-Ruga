"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronDown,
  ArrowRight,
  Plus,
  X,
  Upload,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import Image from "next/image";
import CowDetailPage from "./CowDetailsPage";

const API = process.env.NEXT_PUBLIC_API_URL;

// ── Helpers ───────────────────────────────────────────────────────────────────

function getSlug() {
  // Stored separately after login for easy access
  const slug = localStorage.getItem("sr_slug");
  if (slug) return slug;
  // Fallback: try reading from sr_user object
  try {
    const user = JSON.parse(localStorage.getItem("sr_user") || "{}");
    return user.ranchSlug ?? null;
  } catch {
    return null;
  }
}

function getToken() {
  return localStorage.getItem("sr_token") ?? "";
}

function calcAge(dateOfBirth) {
  if (!dateOfBirth) return "—";
  const diff = Date.now() - new Date(dateOfBirth).getTime();
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30),
  );
  if (years > 0)
    return `${years} yr${years > 1 ? "s" : ""}${months > 0 ? `, ${months} mo` : ""}`;
  return `${months} month${months !== 1 ? "s" : ""}`;
}

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const isActive = status === "active";
  return (
    <span
      className={`flex items-center gap-1 text-xs font-semibold ${isActive ? "text-[#4CAF50]" : "text-amber-500"}`}
    >
      {isActive ? "✅" : "⚠️"} {status}
    </span>
  );
}

// ── Add Animal Modal ──────────────────────────────────────────────────────────

function AddAnimalModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    speciesId: "",
    tagNumber: "",
    rfidTag: "",
    sex: "",
    dateOfBirth: "",
    breed: "",
    weight: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [species, setSpecies] = useState([]);
  const [speciesLoading, setSpeciesLoading] = useState(true);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Fetch species list on mount
  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const res = await fetch(`${API}/species`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!res.ok) throw new Error(`Species fetch failed: ${res.status}`);
        const data = await res.json();
        console.log("✅ Species API raw response:", data);

        // Actual shape: { success, message, data: { species: [...] } }
        let list = [];
        if (Array.isArray(data)) list = data;
        else if (Array.isArray(data?.data?.species)) list = data.data.species;
        else if (Array.isArray(data?.data)) list = data.data;
        else if (Array.isArray(data?.species)) list = data.species;

        console.log("✅ Species list parsed:", list);
        setSpecies(list);
      } catch (err) {
        console.error("❌ Species fetch error:", err.message);
        setSpecies([]);
      } finally {
        setSpeciesLoading(false);
      }
    };
    fetchSpecies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const slug = getSlug();
      const data = new FormData();

      data.append("speciesId", form.speciesId);
      data.append("sex", form.sex);
      if (form.tagNumber) data.append("tagNumber", form.tagNumber);
      if (form.rfidTag) data.append("rfidTag", form.rfidTag);
      if (form.dateOfBirth) data.append("dateOfBirth", form.dateOfBirth);
      if (form.breed) data.append("breed", form.breed);
      if (form.weight) data.append("weight", Number(form.weight));
      if (image) data.append("image", image);

      const res = await fetch(`${API}/ranches/${slug}/animals`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: data,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add animal");
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isValid = form.speciesId && form.sex;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Add New Animal</h3>
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

          {/* Species dropdown + Tag Number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Species <span className="text-red-400">*</span>
              </label>
              {speciesLoading ? (
                <div className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-400 animate-pulse">
                  Loading species...
                </div>
              ) : species.length > 0 ? (
                <select
                  value={form.speciesId}
                  onChange={set("speciesId")}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors appearance-none"
                >
                  <option value="">Select species</option>
                  {species.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} {s.code ? `(${s.code})` : ""}
                    </option>
                  ))}
                </select>
              ) : (
                // Fallback: manual UUID input if species endpoint not available
                <input
                  value={form.speciesId}
                  onChange={set("speciesId")}
                  placeholder="Species UUID"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
                />
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Tag Number
              </label>
              <input
                value={form.tagNumber}
                onChange={set("tagNumber")}
                placeholder="e.g. #1201"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
              />
            </div>
          </div>

          {/* RFID Tag + Sex */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                RFID Tag
              </label>
              <input
                value={form.rfidTag}
                onChange={set("rfidTag")}
                placeholder="RFID code"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Sex <span className="text-red-400">*</span>
              </label>
              <select
                value={form.sex}
                onChange={set("sex")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors appearance-none"
              >
                <option value="">Select sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Date of Birth + Breed */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Date of Birth
              </label>
              <input
                type="date"
                value={form.dateOfBirth}
                onChange={set("dateOfBirth")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Breed
              </label>
              <input
                value={form.breed}
                onChange={set("breed")}
                placeholder="e.g. White Fulani"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
              />
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Weight (kg)
            </label>
            <input
              type="number"
              value={form.weight}
              onChange={set("weight")}
              placeholder="e.g. 280"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Animal Photo
            </label>
            <label className="w-full border-2 border-dashed border-gray-200 rounded-xl py-5 flex flex-col items-center gap-1.5 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] transition-colors cursor-pointer bg-gray-50">
              <Upload size={18} />
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
          <div className="flex gap-3 pt-2">
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
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold text-white transition-colors ${
                isValid && !loading
                  ? "bg-[#4CAF50] hover:bg-[#43a047]"
                  : "bg-[#a5d6a7] cursor-not-allowed"
              }`}
            >
              {loading ? "Adding..." : "Add Animal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Filter Panel ──────────────────────────────────────────────────────────────

const EMPTY_FILTERS = { healthStatus: "", status: "", sex: "", species: "" };

function FilterPanel({ filters, onChange, onApply, onClear, speciesList }) {
  const [draft, setDraft] = useState(filters);
  const set = (k) => (e) => setDraft((f) => ({ ...f, [k]: e.target.value }));

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="absolute right-0 top-10 z-30 w-72 bg-white rounded-xl border border-gray-200 shadow-xl p-4 space-y-3">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-bold text-gray-800">Filter Animals</p>
        {activeCount > 0 && (
          <button
            onClick={() => {
              setDraft(EMPTY_FILTERS);
              onClear();
            }}
            className="text-[10px] text-red-400 hover:text-red-600 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Health Status */}
      <div>
        <label className="block text-[10px] font-semibold text-gray-500 mb-1">
          Health Status
        </label>
        <select
          value={draft.healthStatus}
          onChange={set("healthStatus")}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] appearance-none"
        >
          <option value="">All</option>
          <option value="healthy">Healthy</option>
          <option value="sick">Sick</option>
          <option value="under_treatment">Under Treatment</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block text-[10px] font-semibold text-gray-500 mb-1">
          Status
        </label>
        <select
          value={draft.status}
          onChange={set("status")}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] appearance-none"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Sex */}
      <div>
        <label className="block text-[10px] font-semibold text-gray-500 mb-1">
          Sex
        </label>
        <select
          value={draft.sex}
          onChange={set("sex")}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] appearance-none"
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Species */}
      <div>
        <label className="block text-[10px] font-semibold text-gray-500 mb-1">
          Species
        </label>
        <select
          value={draft.species}
          onChange={set("species")}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] appearance-none"
        >
          <option value="">All</option>
          {speciesList.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Apply */}
      <button
        onClick={() => onApply(draft)}
        className="w-full py-2 rounded-lg bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
}

function LivestockCard({ animal, onClick, onReportIssue }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3 cursor-pointer hover:border-[#4CAF50] hover:shadow-md transition-all"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 bg-[#f9f9f9] rounded flex justify-center items-center text-base">
          🐄
        </span>
        <span className="text-sm font-bold text-gray-800">
          {animal.tagNumber ?? animal.publicId?.slice(0, 8) ?? "—"}
        </span>
        <span className="ml-auto text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full capitalize">
          {animal.species?.name ?? "—"}
        </span>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
        <div>
          <p className="text-[10px] text-gray-400">Sex</p>
          <p className="text-xs font-semibold text-gray-800 capitalize">
            {animal.sex ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400">Health Status</p>
          <span
            className={`flex items-center gap-1 text-xs font-semibold capitalize ${
              animal.healthStatus === "healthy"
                ? "text-[#4CAF50]"
                : "text-amber-500"
            }`}
          >
            {animal.healthStatus === "healthy" ? "✅" : "⚠️"}{" "}
            {animal.healthStatus ?? "—"}
          </span>
        </div>
        <div>
          <p className="text-[10px] text-gray-400">Breed</p>
          <p className="text-xs font-semibold text-gray-800">
            {animal.breed ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400">Weight</p>
          <p className="text-xs font-semibold text-gray-800">
            {animal.weight ? `${animal.weight} kg` : "—"}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400">Age</p>
          <p className="text-xs font-semibold text-gray-800">
            {calcAge(animal.dateOfBirth)}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400">Status</p>
          <p className="text-xs font-semibold text-gray-800 capitalize">
            {animal.status ?? "—"}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-50">
        <p className="text-[10px] text-gray-400 truncate max-w-[60%]">
          RFID:{" "}
          <span className="text-gray-600 font-medium">
            {animal.rfidTag ?? "—"}
          </span>
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReportIssue?.(animal);
          }}
          className="flex items-center gap-1 text-xs font-semibold text-[#4CAF50] hover:text-[#43a047] transition-colors"
        >
          Report Issue <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={14} />
      </button>
      <span className="text-xs text-gray-500">
        Page <span className="font-semibold text-gray-800">{page}</span> of{" "}
        {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRightIcon size={14} />
      </button>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LivestockPage() {
  const [animals, setAnimals] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCow, setSelectedCow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [speciesList, setSpeciesList] = useState([]);

  // Fetch species once for the filter dropdown
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/species`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        setSpeciesList(data?.data?.species ?? []);
      } catch {}
    };
    load();
  }, []);

  // Derived: apply filters locally
  const filteredAnimals = animals.filter((a) => {
    if (filters.healthStatus && a.healthStatus !== filters.healthStatus)
      return false;
    if (filters.status && a.status !== filters.status) return false;
    if (filters.sex && a.sex !== filters.sex) return false;
    if (filters.species && a.species?.id !== filters.species) return false;
    return true;
  });

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const fetchAnimals = useCallback(async (p = 1) => {
    setLoading(true);
    setError("");
    try {
      const slug = getSlug();
      if (!slug)
        throw new Error("Ranch not found. Please log out and log in again.");
      const res = await fetch(
        `${API}/ranches/${slug}/animals?page=${p}&limit=50`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch animals");
      const json = await res.json();
      console.log("✅ Animals API raw response:", json);

      // Handle all common response shapes
      // Could be: { animals: [] } or { data: { animals: [] } } or { data: [] }
      let list = [];
      let meta = { page: p, limit: 50, total: 0, totalPages: 1 };

      if (Array.isArray(json?.data?.animals)) {
        list = json.data.animals;
        meta = json.data?.pagination ?? json.data?.meta ?? meta;
      } else if (Array.isArray(json?.animals)) {
        list = json.animals;
        meta = json?.pagination ?? meta;
      } else if (Array.isArray(json?.data)) {
        list = json.data;
        meta = json?.pagination ?? meta;
      }

      console.log("✅ Animals parsed:", list.length, "animals");
      setAnimals(list);
      setPagination(meta);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnimals(page);
  }, [page, fetchAnimals]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (selectedCow) {
    return (
      <CowDetailPage cow={selectedCow} onBack={() => setSelectedCow(null)} />
    );
  }

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-800">
            Livestock Overview
          </h1>
          {!loading && (
            <p className="text-xs text-gray-400 mt-0.5">
              {filteredAnimals.length} of {pagination.total} animals
              {activeFilterCount > 0 && (
                <span className="text-[#4CAF50] font-medium">
                  {" "}
                  · {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}{" "}
                  active
                </span>
              )}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* Filter button */}
          <div className="relative">
            <button
              onClick={() => setShowFilter((v) => !v)}
              className={`flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg border transition-colors ${
                activeFilterCount > 0
                  ? "border-[#4CAF50] text-[#4CAF50] bg-[#f0fdf4]"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Filter
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#4CAF50] text-white text-[9px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown
                size={13}
                className={
                  showFilter
                    ? "rotate-180 transition-transform"
                    : "transition-transform"
                }
              />
            </button>

            {showFilter && (
              <FilterPanel
                filters={filters}
                speciesList={speciesList}
                onApply={(draft) => {
                  setFilters(draft);
                  setShowFilter(false);
                }}
                onClear={() => setFilters(EMPTY_FILTERS)}
              />
            )}
          </div>

          <button className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            Export as <ChevronDown size={13} />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <Plus size={13} /> Add Animal
          </button>
        </div>
      </div>

      {/* Click outside to close filter */}
      {showFilter && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setShowFilter(false)}
        />
      )}

      {/* Loading */}
      {loading && (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-4 h-48 animate-pulse"
            >
              <div className="h-3 bg-gray-100 rounded w-2/3 mb-3" />
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="h-8 bg-gray-100 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <p className="text-sm text-red-500">{error}</p>
          <button
            onClick={() => fetchAnimals(page)}
            className="text-xs text-[#4CAF50] font-medium hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filteredAnimals.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <span className="text-5xl">🐄</span>
          <p className="text-sm text-gray-500">
            {activeFilterCount > 0
              ? "No animals match the selected filters."
              : "No animals found in this ranch."}
          </p>
          {activeFilterCount > 0 ? (
            <button
              onClick={() => setFilters(EMPTY_FILTERS)}
              className="text-xs text-[#4CAF50] font-medium hover:underline"
            >
              Clear filters
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 bg-[#4CAF50] text-white text-xs font-semibold px-4 py-2 rounded-lg"
            >
              <Plus size={13} /> Add First Animal
            </button>
          )}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && filteredAnimals.length > 0 && (
        <>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {filteredAnimals.map((animal, i) => (
              <LivestockCard
                key={animal.publicId ?? i}
                animal={animal}
                onClick={() => setSelectedCow(animal)}
                onReportIssue={(a) => console.log("Report issue:", a)}
              />
            ))}
          </div>
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Add Animal Modal */}
      {showModal && (
        <AddAnimalModal
          onClose={() => setShowModal(false)}
          onSuccess={() => fetchAnimals(page)}
        />
      )}
    </main>
  );
}
