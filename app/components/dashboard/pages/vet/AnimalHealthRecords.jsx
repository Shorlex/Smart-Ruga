"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  X,
  ArrowLeft,
  RefreshCw,
  Plus,
  Loader2,
  Trash2,
  Edit2,
  Check,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getSlug() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_token") ?? "";
}

function calcAge(dob) {
  if (!dob) return "—";
  const diff = Date.now() - new Date(dob).getTime();
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30),
  );
  if (years > 0) return `${years}yr${months > 0 ? ` ${months}mo` : ""}`;
  return `${months}mo`;
}

function formatDate(str) {
  if (!str) return "—";
  return (
    new Date(str).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    " · " +
    new Date(str).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

function formatDateShort(str) {
  if (!str) return "—";
  return (
    new Date(str).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    " " +
    new Date(str).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

function toDatetimeLocal(str) {
  if (!str) return "";
  return new Date(str).toISOString().slice(0, 16);
}

// ── Health badge ──────────────────────────────────────────────────────────────

const HEALTH_META = {
  healthy: { cls: "bg-[#f0fdf4] text-[#4CAF50]", icon: "✅" },
  sick: { cls: "bg-red-50    text-red-500", icon: "🤒" },
  recovering: { cls: "bg-blue-50   text-blue-500", icon: "💊" },
  quarantined: { cls: "bg-purple-50 text-purple-500", icon: "🔒" },
};

function HealthBadge({ status }) {
  const s = (status ?? "").toLowerCase();
  const { cls, icon } = HEALTH_META[s] ?? {
    cls: "bg-gray-100 text-gray-500",
    icon: "❓",
  };
  return (
    <span
      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize whitespace-nowrap ${cls}`}
    >
      {icon} {status?.replace(/_/g, " ") ?? "—"}
    </span>
  );
}

// ── Post Health Modal ─────────────────────────────────────────────────────────

const HEALTH_STATUSES = ["healthy", "sick", "recovering", "quarantined"];

function PostHealthModal({ animal, onClose, onSuccess }) {
  const [form, setForm] = useState({ status: "healthy", notes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const body = { status: form.status };
      if (form.notes) body.notes = form.notes;
      const res = await fetch(
        `${API}/ranches/${getSlug()}/animals/${animal.id}/health`,
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
        throw new Error(
          err.message ?? JSON.stringify(err.errors?.[0]?.message ?? err),
        );
      }
      const json = await res.json();
      onSuccess(json?.data?.healthStatus ?? form.status);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="bg-white rounded-t-3xl w-full max-w-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-gray-800">Record Health Event</p>
          <button onClick={onClose} className="text-gray-400">
            <X size={18} />
          </button>
        </div>
        {error && (
          <div className="px-4 py-2.5 rounded-xl bg-red-50 text-xs text-red-500">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">
              Health Status
            </p>
            <div className="flex flex-wrap gap-2">
              {HEALTH_STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, status: s }))}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium capitalize transition-all ${
                    form.status === s
                      ? "border-[#4CAF50] bg-[#f0fdf4] text-[#4CAF50]"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  {HEALTH_META[s]?.icon} {s.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1.5">
              Notes (optional)
            </p>
            <textarea
              value={form.notes}
              onChange={(e) =>
                setForm((f) => ({ ...f, notes: e.target.value }))
              }
              rows={3}
              placeholder="Observations, symptoms..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-2xl bg-[#4CAF50] text-white text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              {loading && <Loader2 size={12} className="animate-spin" />}
              {loading ? "Saving..." : "Save Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Vaccination Form Modal (Add / Edit) ───────────────────────────────────────

function VaccinationModal({ animal, vaccination, onClose, onSuccess }) {
  const isEdit = !!vaccination;
  const [form, setForm] = useState({
    vaccineName: vaccination?.vaccineName ?? "",
    dose: vaccination?.dose ?? "",
    administeredAt: vaccination?.administeredAt
      ? toDatetimeLocal(vaccination.administeredAt)
      : "",
    nextDueAt: vaccination?.nextDueAt
      ? toDatetimeLocal(vaccination.nextDueAt)
      : "",
    notes: vaccination?.notes ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isValid = form.vaccineName && form.dose && form.administeredAt;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const body = {
        vaccineName: form.vaccineName,
        dose: form.dose,
        administeredAt: new Date(form.administeredAt).toISOString(),
      };
      if (form.nextDueAt)
        body.nextDueAt = new Date(form.nextDueAt).toISOString();
      if (form.notes) body.notes = form.notes;

      const url = isEdit
        ? `${API}/ranches/${getSlug()}/animals/${animal.publicId}/vaccinations/${vaccination.publicId}`
        : `${API}/ranches/${getSlug()}/animals/${animal.publicId}/vaccinations`;

      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        console.error("❌ Vaccination error:", JSON.stringify(err, null, 2));
        throw new Error(
          err.message ?? JSON.stringify(err.errors?.[0]?.message ?? err),
        );
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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="bg-white rounded-t-3xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-gray-800">
            {isEdit ? "Edit Vaccination" : "Add Vaccination"}
          </p>
          <button onClick={onClose} className="text-gray-400">
            <X size={18} />
          </button>
        </div>
        <p className="text-xs text-gray-400">
          {animal.tagNumber} — {animal.species?.name}
        </p>

        {error && (
          <div className="px-4 py-2.5 rounded-xl bg-red-50 text-xs text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Vaccine Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Vaccine Name <span className="text-red-400">*</span>
            </label>
            <input
              value={form.vaccineName}
              onChange={set("vaccineName")}
              placeholder="e.g. CBPP Vaccine"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50]"
            />
          </div>

          {/* Dose */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Dose <span className="text-red-400">*</span>
            </label>
            <input
              value={form.dose}
              onChange={set("dose")}
              placeholder="e.g. 10ml"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50]"
            />
          </div>

          {/* Administered At + Next Due */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Administered At <span className="text-red-400">*</span>
              </label>
              <input
                type="datetime-local"
                value={form.administeredAt}
                onChange={set("administeredAt")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Next Due
              </label>
              <input
                type="datetime-local"
                value={form.nextDueAt}
                onChange={set("nextDueAt")}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50]"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Notes
            </label>
            <textarea
              value={form.notes}
              onChange={set("notes")}
              rows={2}
              placeholder="e.g. Administered by visiting vet"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || loading}
              className={`flex-1 py-3 rounded-2xl text-white text-xs font-semibold flex items-center justify-center gap-1.5 ${
                isValid && !loading
                  ? "bg-[#4CAF50] hover:bg-[#43a047]"
                  : "bg-[#a5d6a7] cursor-not-allowed"
              }`}
            >
              {loading && <Loader2 size={12} className="animate-spin" />}
              {loading
                ? "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Add Vaccination"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Vaccinations Tab ──────────────────────────────────────────────────────────

function VaccinationsTab({ animal }) {
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null); // vaccination being edited
  const [deleting, setDeleting] = useState(null); // id being deleted

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
      console.log("✅ Vaccinations:", json);
      // Defensive parsing — adjust once real shape confirmed
      const list =
        json?.data?.vaccinations ?? json?.vaccinations ?? json?.data ?? [];
      setVaccinations(Array.isArray(list) ? list : []);
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
    if (!confirm(`Archive "${vax.vaccineName}" record?`)) return;
    setDeleting(vax.publicId);
    try {
      await fetch(
        `${API}/ranches/${getSlug()}/animals/${animal.publicId}/vaccinations/${vax.publicId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      );
      setVaccinations((prev) =>
        prev.filter((v) => v.publicId !== vax.publicId),
      );
    } catch {
      fetchVaccinations();
    } finally {
      setDeleting(null);
    }
  };

  if (loading)
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-gray-50 rounded-2xl p-4 animate-pulse space-y-2"
          >
            <div className="h-3 bg-gray-100 rounded w-1/2" />
            <div className="h-2.5 bg-gray-100 rounded w-1/3" />
          </div>
        ))}
      </div>
    );

  return (
    <div className="space-y-3">
      {/* Add button */}
      <button
        onClick={() => setShowAdd(true)}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-[#4CAF50] text-[#4CAF50] text-xs font-semibold hover:bg-[#f0fdf4] transition-colors"
      >
        <Plus size={14} /> Add Vaccination Record
      </button>

      {/* Empty */}
      {vaccinations.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
          <p className="text-sm text-gray-400">No vaccination records yet.</p>
        </div>
      )}

      {/* Vaccination cards */}
      {vaccinations.map((vax, i) => (
        <div
          key={vax.publicId ?? i}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-2.5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-gray-800">
                💉 {vax.vaccineName}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Dose: {vax.dose ?? "—"}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setEditing(vax)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-[#4CAF50] hover:bg-[#f0fdf4] transition-colors"
              >
                <Edit2 size={13} />
              </button>
              <button
                onClick={() => handleDelete(vax)}
                disabled={deleting === vax.publicId}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
              >
                {deleting === vax.publicId ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Trash2 size={13} />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-gray-400">Administered</p>
              <p className="font-semibold text-gray-700">
                {formatDateShort(vax.administeredAt)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Next Due</p>
              <p
                className={`font-semibold ${vax.nextDueAt && new Date(vax.nextDueAt) < new Date() ? "text-red-500" : "text-gray-700"}`}
              >
                {formatDateShort(vax.nextDueAt)}
              </p>
            </div>
          </div>

          {vax.notes && (
            <p className="text-[11px] text-gray-400 italic">"{vax.notes}"</p>
          )}
        </div>
      ))}

      {/* Add modal */}
      {showAdd && (
        <VaccinationModal
          animal={animal}
          onClose={() => setShowAdd(false)}
          onSuccess={() => {
            fetchVaccinations();
            setShowAdd(false);
          }}
        />
      )}

      {/* Edit modal */}
      {editing && (
        <VaccinationModal
          animal={animal}
          vaccination={editing}
          onClose={() => setEditing(null)}
          onSuccess={() => {
            fetchVaccinations();
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

// ── Animal Detail (3 tabs) ────────────────────────────────────────────────────

function AnimalDetail({ animal: initialAnimal, onBack, onHealthUpdate }) {
  const [animal, setAnimal] = useState(initialAnimal);
  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("latest");

  const fetchHealth = useCallback(async () => {
    setLoading(true);
    try {
      const [latestRes, historyRes] = await Promise.all([
        fetch(
          `${API}/ranches/${getSlug()}/animals/${animal.id}/health/latest`,
          { headers: { Authorization: `Bearer ${getToken()}` } },
        ),
        fetch(
          `${API}/ranches/${getSlug()}/animals/${animal.id}/health/history`,
          { headers: { Authorization: `Bearer ${getToken()}` } },
        ),
      ]);
      if (latestRes.ok) {
        const j = await latestRes.json();
        setLatest(j?.data ?? null);
      }
      if (historyRes.ok) {
        const j = await historyRes.json();
        setHistory(j?.data?.events ?? []);
      }
    } catch (err) {
      console.error("Health fetch:", err.message);
    } finally {
      setLoading(false);
    }
  }, [animal.id]);

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  const currentStatus = latest?.healthStatus ?? animal.healthStatus;

  return (
    <div className="px-4 pb-8 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 font-medium"
        >
          <ArrowLeft size={15} /> Back
        </button>
        {activeTab !== "vaccinations" && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 bg-[#4CAF50] text-white text-xs font-semibold px-3 py-2 rounded-xl"
          >
            <Plus size={13} /> Record Health
          </button>
        )}
      </div>

      {/* Animal card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-gray-800">
              {animal.tagNumber ?? "—"}
            </p>
            <p className="text-xs text-gray-400 capitalize">
              {animal.species?.name ?? "—"} · {animal.sex ?? "—"}
            </p>
          </div>
          <HealthBadge status={currentStatus} />
        </div>
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div>
            <p className="text-gray-400">Age</p>{" "}
            <p className="font-semibold">{calcAge(animal.dateOfBirth)}</p>
          </div>
          <div>
            <p className="text-gray-400">Weight</p>{" "}
            <p className="font-semibold">
              {animal.weight ? `${animal.weight}kg` : "—"}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Breed</p>{" "}
            <p className="font-semibold capitalize">{animal.breed ?? "—"}</p>
          </div>
        </div>
      </div>

      {/* 3 Tabs */}
      <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
        {[
          { key: "latest", label: "Latest" },
          { key: "history", label: "History" },
          { key: "vaccinations", label: "Vaccinations" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === key
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Loading skeleton for health tabs */}
      {loading && activeTab !== "vaccinations" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3 animate-pulse">
          <div className="h-3 bg-gray-100 rounded w-1/3" />
          <div className="h-16 bg-gray-100 rounded-xl" />
        </div>
      )}

      {/* Latest Status */}
      {!loading && activeTab === "latest" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
          <p className="text-sm font-bold text-gray-800">
            Current Health Status
          </p>
          {latest?.latest ? (
            <>
              <div className="flex items-center justify-between">
                <HealthBadge status={latest.healthStatus} />
                <span className="text-[10px] text-gray-400">
                  {formatDate(latest.latest.createdAt)}
                </span>
              </div>
              {latest.latest.notes && (
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-600 italic">
                  "{latest.latest.notes}"
                </div>
              )}
              {latest.latest.recordedBy && (
                <p className="text-[10px] text-gray-400">
                  Recorded by{" "}
                  <span className="font-medium text-gray-600">
                    {[
                      latest.latest.recordedBy.firstName,
                      latest.latest.recordedBy.lastName,
                    ]
                      .filter(Boolean)
                      .join(" ") ||
                      latest.latest.recordedBy.email ||
                      "—"}
                  </span>
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-gray-400 mb-2">No health record yet</p>
              <button
                onClick={() => setShowModal(true)}
                className="text-xs text-[#4CAF50] font-medium"
              >
                + Record first health event
              </button>
            </div>
          )}
        </div>
      )}

      {/* Health History */}
      {!loading && activeTab === "history" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-sm font-bold text-gray-800 mb-4">
            Health History
            {history.length > 0 && (
              <span className="ml-2 text-xs text-gray-400 font-normal">
                {history.length} events
              </span>
            )}
          </p>
          {history.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">
              No health history yet.
            </p>
          ) : (
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-100" />
              <div className="space-y-5">
                {history.map((event, i) => {
                  const { cls, icon } = HEALTH_META[
                    (event.status ?? "").toLowerCase()
                  ] ?? { cls: "bg-gray-100", icon: "❓" };
                  return (
                    <div key={event.id ?? i} className="flex gap-3 relative">
                      <div
                        className={`w-7 h-7 rounded-full ${cls} flex items-center justify-center shrink-0 z-10 text-sm`}
                      >
                        {icon}
                      </div>
                      <div className="flex-1 pb-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <HealthBadge status={event.status} />
                          <span className="text-[10px] text-gray-400 whitespace-nowrap">
                            {formatDate(event.createdAt)}
                          </span>
                        </div>
                        {event.notes && (
                          <p className="text-xs text-gray-500 italic mt-1">
                            "{event.notes}"
                          </p>
                        )}
                        {event.recordedBy && (
                          <p className="text-[10px] text-gray-400 mt-1">
                            By{" "}
                            <span className="font-medium text-gray-600">
                              {[
                                event.recordedBy.firstName,
                                event.recordedBy.lastName,
                              ]
                                .filter(Boolean)
                                .join(" ") ||
                                event.recordedBy.email ||
                                "—"}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Vaccinations */}
      {activeTab === "vaccinations" && <VaccinationsTab animal={animal} />}

      {/* Post Health Modal */}
      {showModal && (
        <PostHealthModal
          animal={animal}
          onClose={() => setShowModal(false)}
          onSuccess={(newStatus) => {
            setAnimal((a) => ({ ...a, healthStatus: newStatus }));
            onHealthUpdate?.(animal.id, newStatus);
            fetchHealth();
            setActiveTab("latest");
          }}
        />
      )}
    </div>
  );
}

// ── Animal List ───────────────────────────────────────────────────────────────

export default function AnimalHealthRecords() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  const fetchAnimals = useCallback(async (p = 1) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${API}/ranches/${getSlug()}/animals?limit=50&page=${p}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      );
      if (!res.ok) throw new Error(`Failed to fetch animals (${res.status})`);
      const json = await res.json();
      setAnimals(json?.data?.animals ?? json?.animals ?? []);
      const meta = json?.meta?.pagination ?? json?.data?.pagination ?? {};
      setPagination({
        total: Number(meta.total) || 0,
        totalPages: Number(meta.totalPages) || 1,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnimals(page);
  }, [fetchAnimals, page]);

  const handleHealthUpdate = (animalId, newStatus) => {
    setAnimals((prev) =>
      prev.map((a) =>
        a.id === animalId ? { ...a, healthStatus: newStatus } : a,
      ),
    );
  };

  const filtered = animals.filter((a) => {
    const matchHealth =
      filter === "all" || (a.healthStatus ?? "").toLowerCase() === filter;
    const matchSearch =
      !search ||
      (a.tagNumber ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (a.species?.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (a.breed ?? "").toLowerCase().includes(search.toLowerCase());
    return matchHealth && matchSearch;
  });

  const counts = {
    all: animals.length,
    healthy: animals.filter((a) => a.healthStatus === "healthy").length,
    sick: animals.filter((a) => a.healthStatus === "sick").length,
    recovering: animals.filter((a) => a.healthStatus === "recovering").length,
    quarantined: animals.filter((a) => a.healthStatus === "quarantined").length,
  };

  if (selected) {
    return (
      <AnimalDetail
        animal={selected}
        onBack={() => setSelected(null)}
        onHealthUpdate={handleHealthUpdate}
      />
    );
  }

  return (
    <div className="px-4 pb-8 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-bold text-gray-800">Health Records</p>
          {!loading && (
            <p className="text-xs text-gray-400 mt-0.5">
              {animals.length} of {pagination.total || animals.length} animals
            </p>
          )}
        </div>
        <button
          onClick={fetchAnimals}
          className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by tag, species or breed..."
          className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50]"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <X size={13} />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {[
          { key: "all", label: "All" },
          { key: "healthy", label: "Healthy" },
          { key: "sick", label: "Sick" },
          { key: "recovering", label: "Recovering" },
          { key: "quarantined", label: "Quarantined" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === key
                ? "bg-[#4CAF50] text-white"
                : "bg-white border border-gray-200 text-gray-500"
            }`}
          >
            {label}
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                filter === key
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse"
            >
              <div className="flex justify-between mb-3">
                <div className="h-3 bg-gray-100 rounded w-1/3" />
                <div className="h-5 bg-gray-100 rounded w-20" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-8 bg-gray-100 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
          <p className="text-sm text-red-500 mb-2">{error}</p>
          <button
            onClick={fetchAnimals}
            className="text-xs text-[#4CAF50] hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
          <p className="text-sm text-gray-400">No animals found.</p>
          {(search || filter !== "all") && (
            <button
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="mt-2 text-xs text-[#4CAF50] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {!loading &&
        !error &&
        filtered.map((animal, i) => (
          <button
            key={animal.publicId ?? i}
            onClick={() => setSelected(animal)}
            className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-left hover:border-[#4CAF50] hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🐄</span>
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    {animal.tagNumber ?? "—"}
                  </p>
                  <p className="text-[10px] text-gray-400 capitalize">
                    {animal.species?.name ?? "—"}
                  </p>
                </div>
              </div>
              <HealthBadge status={animal.healthStatus} />
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <p className="text-gray-400">Sex</p>{" "}
                <p className="font-semibold text-gray-700 capitalize">
                  {animal.sex ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Age</p>{" "}
                <p className="font-semibold text-gray-700">
                  {calcAge(animal.dateOfBirth)}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Weight</p>{" "}
                <p className="font-semibold text-gray-700">
                  {animal.weight ? `${animal.weight}kg` : "—"}
                </p>
              </div>
            </div>
            {animal.isOverdue && (
              <div className="flex items-center gap-1.5 text-[11px] text-amber-500 bg-amber-50 px-3 py-1.5 rounded-lg">
                ⚠️ Vaccination overdue by {animal.daysOverdue} day
                {animal.daysOverdue !== 1 ? "s" : ""}
              </div>
            )}
          </button>
        ))}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 pb-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            ← Prev
          </button>
          <p className="text-xs text-gray-500">
            Page <span className="font-bold text-gray-800">{page}</span> of{" "}
            {pagination.totalPages}
            <span className="text-gray-400 ml-1">
              ({pagination.total} animals)
            </span>
          </p>
          <button
            onClick={() =>
              setPage((p) => Math.min(pagination.totalPages, p + 1))
            }
            disabled={page === pagination.totalPages}
            className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
