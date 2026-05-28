"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Scan, Loader2, Upload, AlertTriangle } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getSlug() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_token") ?? "";
}

function formatDateTime(str) {
  if (!str) return "—";
  return new Date(str).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function calcAge(dob) {
  if (!dob) return "—";
  const diff = Date.now() - new Date(dob).getTime();
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  if (years >= 1) return `${years}yr${years > 1 ? "s" : ""}`;
  return `${months}mo`;
}

const HEALTH_STATUSES = ["healthy", "sick", "recovering", "quarantined"];
const HEALTH_COLORS = {
  healthy: "bg-[#f0fdf4] text-[#4CAF50] border-[#d1fae5]",
  sick: "bg-red-50    text-red-500   border-red-200",
  recovering: "bg-blue-50   text-blue-500  border-blue-200",
  quarantined: "bg-purple-50 text-purple-500 border-purple-200",
};

// ── Health Update Modal ───────────────────────────────────────────────────────

function HealthUpdateModal({ animal, onClose, onSuccess }) {
  const [status, setStatus] = useState(animal.healthStatus ?? "healthy");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/animals/${animal.publicId}/health`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status, notes: notes || undefined }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? "Failed to update health status");
      }
      onSuccess(status);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-end justify-center bg-black/40 px-4 pb-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl space-y-4 p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-gray-800">
            Update Health Status
          </p>
          <button onClick={onClose} className="text-gray-400">
            <X size={16} />
          </button>
        </div>

        <p className="text-xs text-gray-500">
          Tag:{" "}
          <span className="font-semibold text-gray-700">
            {animal.tagNumber ?? "—"}
          </span>
          {" · "}
          {animal.species?.name ?? "—"}
        </p>

        {error && (
          <div className="px-3 py-2 rounded-xl bg-red-50 text-xs text-red-500">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          {HEALTH_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`py-3 rounded-xl border-2 text-xs font-semibold capitalize transition-all ${
                status === s
                  ? HEALTH_COLORS[s]
                  : "border-gray-200 text-gray-400 bg-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Additional notes (optional)..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-60"
          >
            {loading && <Loader2 size={12} className="animate-spin" />}
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Report Issue Modal ────────────────────────────────────────────────────────

function ReportIssueModal({ animal, onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: `Health concern — ${animal.tagNumber ?? animal.publicId?.slice(0, 8)}`,
    description: "",
    priority: "medium",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.description) {
      setError("Please describe the issue");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("category", "health");
      data.append("priority", form.priority);
      data.append("entityType", "animal");
      data.append("entityPublicId", animal.publicId ?? "");
      if (image) data.append("image", image);

      const res = await fetch(`${API}/ranches/${getSlug()}/concerns`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: data,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? "Failed to report issue");
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-end justify-center bg-black/40 px-4 pb-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl space-y-4 p-5 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-gray-800">Report Issue</p>
          <button onClick={onClose} className="text-gray-400">
            <X size={16} />
          </button>
        </div>

        <p className="text-xs text-gray-500">
          Tag:{" "}
          <span className="font-semibold text-gray-700">
            {animal.tagNumber ?? "—"}
          </span>
          {" · "}
          {animal.species?.name ?? "—"}
        </p>

        {error && (
          <div className="px-3 py-2 rounded-xl bg-red-50 text-xs text-red-500">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Title
          </label>
          <input
            value={form.title}
            onChange={set("title")}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Description <span className="text-red-400">*</span>
          </label>
          <textarea
            value={form.description}
            onChange={set("description")}
            rows={3}
            placeholder="Describe the issue — symptoms, behaviour, anything unusual..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Priority
          </label>
          <div className="flex gap-2">
            {["low", "medium", "high", "urgent"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setForm((f) => ({ ...f, priority: p }))}
                className={`flex-1 py-2 rounded-xl border-2 text-xs font-semibold capitalize transition-all ${
                  form.priority === p
                    ? {
                        low: "border-gray-300 text-gray-600 bg-gray-50",
                        medium: "border-amber-300 text-amber-500 bg-amber-50",
                        high: "border-orange-300 text-orange-500 bg-orange-50",
                        urgent: "border-red-300 text-red-500 bg-red-50",
                      }[p]
                    : "border-gray-200 text-gray-400 bg-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <label className="w-full border-2 border-dashed border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] cursor-pointer bg-gray-50 text-xs font-medium">
          <Upload size={13} />
          {image ? image.name : "Attach photo (optional)"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          />
        </label>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-60"
          >
            {loading && <Loader2 size={12} className="animate-spin" />}
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Vaccination Section ───────────────────────────────────────────────────────

function VaccinationSection({ animal }) {
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchVaccinations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API}/ranches/${getSlug()}/animals/${animal.publicId}/vaccinations`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      );
      if (!res.ok) throw new Error();
      const json = await res.json();
      setVaccinations(
        json?.data?.vaccinations ?? json?.vaccinations ?? json?.data ?? [],
      );
    } catch {
      setVaccinations([]);
    } finally {
      setLoading(false);
    }
  }, [animal.publicId]);

  useEffect(() => {
    fetchVaccinations();
  }, [fetchVaccinations]);

  const handleDelete = async (vax) => {
    if (!confirm(`Delete "${vax.vaccineName}" record?`)) return;
    try {
      await fetch(
        `${API}/ranches/${getSlug()}/animals/${animal.publicId}/vaccinations/${vax.publicId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      );
      fetchVaccinations();
    } catch {
      alert("Failed to delete vaccination");
    }
  };

  const isOverdue = (vax) =>
    vax.nextDueAt && new Date(vax.nextDueAt) < new Date();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
          Vaccination Records
        </p>
        <button
          onClick={() => {
            setEditing(null);
            setShowModal(true);
          }}
          className="flex items-center gap-1 text-xs font-semibold text-[#4CAF50] hover:underline"
        >
          + Add Record
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-14 bg-gray-100 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : vaccinations.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-400">No vaccination records yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {vaccinations.map((vax, i) => {
            const overdue = isOverdue(vax);
            return (
              <div
                key={vax.publicId ?? i}
                className={`rounded-xl p-3 border ${overdue ? "border-red-200 bg-red-50" : "border-gray-100 bg-gray-50"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">
                      {vax.vaccineName}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      Dose: {vax.dose} · Given:{" "}
                      {formatDateTime(vax.administeredAt)}
                    </p>
                    {vax.nextDueAt && (
                      <p
                        className={`text-[10px] font-semibold mt-0.5 ${overdue ? "text-red-500" : "text-[#4CAF50]"}`}
                      >
                        {overdue ? "⚠ Overdue" : "✓ Next due"}:{" "}
                        {formatDateTime(vax.nextDueAt)}
                      </p>
                    )}
                    {vax.notes && (
                      <p className="text-[10px] text-gray-400 italic mt-0.5">
                        "{vax.notes}"
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditing(vax);
                        setShowModal(true);
                      }}
                      className="text-[10px] text-[#4CAF50] font-semibold hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vax)}
                      className="text-[10px] text-red-400 font-semibold hover:underline"
                    >
                      Del
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <VaccinationFormModal
          animal={animal}
          vaccination={editing}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchVaccinations();
          }}
        />
      )}
    </div>
  );
}

// ── Vaccination Form Modal ────────────────────────────────────────────────────

function VaccinationFormModal({ animal, vaccination, onClose, onSuccess }) {
  const isEdit = !!vaccination;
  const [form, setForm] = useState({
    vaccineName: vaccination?.vaccineName ?? "",
    dose: vaccination?.dose ?? "",
    administeredAt: vaccination?.administeredAt
      ? vaccination.administeredAt.slice(0, 16)
      : "",
    nextDueAt: vaccination?.nextDueAt ? vaccination.nextDueAt.slice(0, 16) : "",
    notes: vaccination?.notes ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isValid = form.vaccineName && form.dose && form.administeredAt;

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const url = isEdit
        ? `${API}/ranches/${getSlug()}/animals/${animal.publicId}/vaccinations/${vaccination.publicId}`
        : `${API}/ranches/${getSlug()}/animals/${animal.publicId}/vaccinations`;

      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          vaccineName: form.vaccineName,
          dose: form.dose,
          administeredAt: new Date(form.administeredAt).toISOString(),
          nextDueAt: form.nextDueAt
            ? new Date(form.nextDueAt).toISOString()
            : undefined,
          notes: form.notes || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? "Failed to save vaccination");
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-70 flex items-end justify-center bg-black/40 px-4 pb-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl space-y-4 p-5 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-gray-800">
            {isEdit ? "Edit" : "Add"} Vaccination
          </p>
          <button onClick={onClose} className="text-gray-400">
            <X size={16} />
          </button>
        </div>

        {error && (
          <div className="px-3 py-2 rounded-xl bg-red-50 text-xs text-red-500">
            {error}
          </div>
        )}

        {[
          {
            k: "vaccineName",
            label: "Vaccine Name",
            placeholder: "e.g. CBPP Vaccine",
            type: "text",
          },
          { k: "dose", label: "Dose", placeholder: "e.g. 5ml", type: "text" },
          {
            k: "administeredAt",
            label: "Date Administered",
            placeholder: "",
            type: "datetime-local",
          },
          {
            k: "nextDueAt",
            label: "Next Due Date",
            placeholder: "",
            type: "datetime-local",
          },
        ].map(({ k, label, placeholder, type }) => (
          <div key={k}>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              {label}{" "}
              {["vaccineName", "dose", "administeredAt"].includes(k) && (
                <span className="text-red-400">*</span>
              )}
            </label>
            <input
              type={type}
              value={form[k]}
              onChange={set(k)}
              placeholder={placeholder}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50]"
            />
          </div>
        ))}

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Notes
          </label>
          <textarea
            value={form.notes}
            onChange={set("notes")}
            rows={2}
            placeholder="Optional notes..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className="flex-1 py-3 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-60"
          >
            {loading && <Loader2 size={12} className="animate-spin" />}
            {loading ? "Saving..." : isEdit ? "Update" : "Save Record"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AnimalCard({ animal, onUpdateHealth, onReportIssue }) {
  const role =
    typeof window !== "undefined"
      ? (localStorage.getItem("sr_role") ?? "")
      : "";
  const isVet = role === "vet";
  const [tab, setTab] = useState("details");

  const health = animal.healthStatus ?? animal.status ?? "—";
  const hCls =
    HEALTH_COLORS[(health ?? "").toLowerCase()] ??
    "bg-gray-100 text-gray-500 border-gray-200";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Animal image */}
      {animal.imageUrl ? (
        <img
          src={animal.imageUrl}
          alt={animal.tagNumber}
          className="w-full h-36 object-cover"
        />
      ) : (
        <div className="w-full h-36 bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center">
          <span className="text-5xl opacity-30">🐄</span>
        </div>
      )}

      <div className="p-4 space-y-3">
        {/* Identity */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-base font-bold text-gray-800">
              {animal.tagNumber ?? "—"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 capitalize">
              {animal.species?.name ?? "—"} · {animal.sex ?? "—"} ·{" "}
              {calcAge(animal.dateOfBirth)}
            </p>
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize border ${hCls}`}
          >
            {health}
          </span>
        </div>

        {/* Tabs — vet sees vaccinations tab, worker only sees details */}
        {isVet && (
          <div className="flex gap-1 bg-gray-100 rounded-full p-1">
            {["details", "vaccinations"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                  tab === t
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* Details tab */}
        {tab === "details" && (
          <>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 rounded-xl p-2.5">
                <p className="text-gray-400 mb-0.5">RFID Tag</p>
                <p className="font-semibold text-gray-700 truncate">
                  {animal.rfidTag ?? "—"}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-2.5">
                <p className="text-gray-400 mb-0.5">Date of Birth</p>
                <p className="font-semibold text-gray-700">
                  {formatDateTime(animal.dateOfBirth)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-2.5">
                <p className="text-gray-400 mb-0.5">Species Code</p>
                <p className="font-semibold text-gray-700 uppercase">
                  {animal.species?.code ?? "—"}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-2.5">
                <p className="text-gray-400 mb-0.5">Status</p>
                <p className="font-semibold text-gray-700 capitalize">
                  {animal.status ?? "—"}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={onUpdateHealth}
                className="flex-1 py-3 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors"
              >
                Update Health
              </button>
              <button
                onClick={onReportIssue}
                className="flex-1 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <AlertTriangle size={12} /> Report Issue
              </button>
            </div>
          </>
        )}

        {/* Vaccinations tab — vet only */}
        {tab === "vaccinations" && isVet && (
          <VaccinationSection animal={animal} />
        )}
      </div>
    </div>
  );
}

// ── Main Scan Modal ───────────────────────────────────────────────────────────

export default function ScanAnimalModal({ onClose }) {
  const [rfidInput, setRfidInput] = useState("");
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showHealth, setShowHealth] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const inputRef = useRef(null);

  // Auto-focus input so RFID reader can type directly
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const lookup = async (value) => {
    const q = (value ?? rfidInput).trim();
    if (!q) return;
    setError("");
    setAnimal(null);
    setLoading(true);
    try {
      const res = await fetch(
        `${API}/ranches/${getSlug()}/animals/lookup?identifier=${encodeURIComponent(q)}`,
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? "Animal not found");
      }
      const json = await res.json();
      const found = json?.data?.animal ?? json?.animal ?? json?.data ?? null;
      if (!found) throw new Error("Animal not found");
      setAnimal(found);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Detect RFID reader input — most readers send a carriage return at the end
  const handleKeyDown = (e) => {
    if (e.key === "Enter") lookup();
  };

  const handleReset = () => {
    setAnimal(null);
    setRfidInput("");
    setError("");
    setSuccessMsg("");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
        <div className="bg-white rounded-t-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
            <div className="flex items-center gap-2">
              <Scan size={18} className="text-[#4CAF50]" />
              <p className="text-sm font-bold text-gray-800">Scan Animal</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-5 py-4 space-y-4 pb-8">
            {/* Success message */}
            {successMsg && (
              <div className="px-4 py-3 rounded-xl bg-[#f0fdf4] border border-[#d1fae5] text-xs text-[#4CAF50] font-semibold">
                ✅ {successMsg}
              </div>
            )}

            {/* RFID input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                RFID Tag / Tag Number
              </label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Scan
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    ref={inputRef}
                    value={rfidInput}
                    onChange={(e) => setRfidInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Scan RFID tag or type manually..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50]"
                  />
                </div>
                <button
                  onClick={() => lookup()}
                  disabled={!rfidInput.trim() || loading}
                  className="px-4 py-3 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold disabled:opacity-50 transition-colors whitespace-nowrap"
                >
                  {loading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    "Look Up"
                  )}
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5">
                💡 Point your RFID reader at the animal's tag — it will
                auto-fill and search
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-500 flex items-center gap-2">
                <AlertTriangle size={13} /> {error}
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center gap-3 py-8">
                <Loader2 size={32} className="animate-spin text-[#4CAF50]" />
                <p className="text-sm text-gray-400">Looking up animal...</p>
              </div>
            )}

            {/* Animal card */}
            {!loading && animal && (
              <>
                <AnimalCard
                  animal={animal}
                  onUpdateHealth={() => setShowHealth(true)}
                  onReportIssue={() => setShowReport(true)}
                />
                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  🔄 Scan Another Animal
                </button>
              </>
            )}

            {/* Empty state */}
            {!loading && !animal && !error && (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#f0fdf4] flex items-center justify-center">
                  <Scan size={28} className="text-[#4CAF50]" />
                </div>
                <p className="text-sm font-semibold text-gray-600">
                  Ready to scan
                </p>
                <p className="text-xs text-gray-400 max-w-60">
                  Hold the RFID reader near the animal's tag or type the tag
                  number manually
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Health Update Modal */}
      {showHealth && animal && (
        <HealthUpdateModal
          animal={animal}
          onClose={() => setShowHealth(false)}
          onSuccess={(newStatus) => {
            setAnimal((prev) => ({ ...prev, healthStatus: newStatus }));
            setShowHealth(false);
            setSuccessMsg(
              `Health status updated to "${newStatus}" for ${animal.tagNumber}`,
            );
          }}
        />
      )}

      {/* Report Issue Modal */}
      {showReport && animal && (
        <ReportIssueModal
          animal={animal}
          onClose={() => setShowReport(false)}
          onSuccess={() => {
            setShowReport(false);
            setSuccessMsg(`Issue reported for ${animal.tagNumber}`);
          }}
        />
      )}
    </>
  );
}
