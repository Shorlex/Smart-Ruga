"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Edit2,
  X,
  Check,
  Loader2,
  ExternalLink,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

function getSlug() {
  const slug = localStorage.getItem("sr_slug");
  if (slug) return slug;
  try {
    return (
      JSON.parse(localStorage.getItem("sr_user") || "{}").ranchSlug ?? null
    );
  } catch {
    return null;
  }
}
function getToken() {
  return localStorage.getItem("sr_token") ?? "";
}

function calcAge(dob) {
  if (!dob) return "—";
  const diff = Date.now() - new Date(dob).getTime();
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30),
  );
  if (years > 0)
    return `${years} yr${years > 1 ? "s" : ""}${months > 0 ? `, ${months} mo` : ""}`;
  return `${months} month${months !== 1 ? "s" : ""}`;
}

// ── Inline editable field ─────────────────────────────────────────────────────

function Field({
  label,
  value,
  fieldKey,
  editing,
  editValues,
  onChange,
  type = "text",
  options,
  readOnly,
}) {
  if (!editing || readOnly) {
    return (
      <div>
        <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
        <p className="text-xs font-semibold text-gray-800">{value ?? "—"}</p>
      </div>
    );
  }
  if (options) {
    return (
      <div>
        <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
        <select
          value={editValues[fieldKey] ?? ""}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          className="w-full bg-gray-50 border border-[#4CAF50] rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none appearance-none"
        >
          <option value="">Select...</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div>
      <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
      <input
        type={type}
        value={editValues[fieldKey] ?? ""}
        onChange={(e) => onChange(fieldKey, e.target.value)}
        className="w-full bg-gray-50 border border-[#4CAF50] rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none"
      />
    </div>
  );
}

// ── Section card with edit/save/cancel ───────────────────────────────────────

function InfoCard({
  title,
  editing,
  onEdit,
  onSave,
  onCancel,
  saving,
  children,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        {!editing ? (
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 text-xs text-[#4CAF50] font-medium hover:underline"
          >
            <Edit2 size={11} /> Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={onCancel}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 font-medium"
            >
              <X size={12} /> Cancel
            </button>
            <button
              onClick={onSave}
              disabled={saving}
              className="flex items-center gap-1 text-xs text-white bg-[#4CAF50] hover:bg-[#43a047] px-3 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-60"
            >
              {saving ? (
                <Loader2 size={11} className="animate-spin" />
              ) : (
                <Check size={11} />
              )}
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────

function Badge({ value, greenValue }) {
  const isGreen = value === greenValue;
  return (
    <span
      className={`flex items-center gap-1 text-xs font-semibold capitalize ${isGreen ? "text-[#4CAF50]" : "text-amber-500"}`}
    >
      {isGreen ? "✅" : "⚠️"} {value ?? "—"}
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CowDetailPage({ cow: initialCow, onBack }) {
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [editingSection, setEditingSection] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");
  const [activity, setActivity] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);

  // ── Fetch single animal ───────────────────────────────────────────────────

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setFetchError("");
      try {
        const slug = getSlug();
        const res = await fetch(
          `${API}/ranches/${slug}/animals/${initialCow.id}`,
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          },
        );
        if (!res.ok) throw new Error("Failed to load animal record");
        const json = await res.json();
        // Handle: { data: { animals: [{}] } } or { data: { animal: {} } } or { data: {} }
        const data =
          json?.data?.animals?.[0] ??
          json?.data?.animal ??
          json?.data ??
          initialCow;
        setAnimal(data);

        // Fetch activity log for this animal
        try {
          const actRes = await fetch(
            `${API}/ranches/${slug}/animals/${initialCow.id}/activity`,
            {
              headers: { Authorization: `Bearer ${getToken()}` },
            },
          );
          if (actRes.ok) {
            const actJson = await actRes.json();
            setActivity(actJson?.events ?? actJson?.data?.events ?? []);
          }
        } catch {
          /* activity is non-critical, fail silently */
        }
        setActivityLoading(false);
      } catch (err) {
        setFetchError(err.message);
        setAnimal(initialCow); // fallback to card data
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [initialCow]);

  // ── Inline edit helpers ───────────────────────────────────────────────────

  const startEdit = (section) => {
    setEditingSection(section);
    setSaveError("");
    setSaveSuccess("");
    setEditValues({
      tagNumber: animal.tagNumber ?? "",
      rfidTag: animal.rfidTag ?? "",
      sex: animal.sex ?? "",
      breed: animal.breed ?? "",
      weight: animal.weight ?? "",
      dateOfBirth: animal.dateOfBirth ? animal.dateOfBirth.slice(0, 10) : "",
      status: animal.status ?? "",
      healthStatus: animal.healthStatus ?? "",
    });
  };

  const cancelEdit = () => {
    setEditingSection(null);
    setSaveError("");
  };
  const handleChange = (key, val) =>
    setEditValues((v) => ({ ...v, [key]: val }));

  // ── PATCH animal ──────────────────────────────────────────────────────────

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");
    try {
      const slug = getSlug();
      const fields =
        editingSection === "basic"
          ? ["tagNumber", "rfidTag", "sex", "breed", "weight", "dateOfBirth"]
          : ["status", "healthStatus"];

      // Only send fields that actually changed
      const body = {};
      fields.forEach((k) => {
        const newVal = editValues[k];
        const oldVal = animal[k] ?? "";
        if (newVal !== "" && String(newVal) !== String(oldVal)) {
          body[k] = k === "weight" ? Number(newVal) : newVal;
        }
      });

      if (Object.keys(body).length === 0) {
        cancelEdit();
        return;
      }

      const res = await fetch(`${API}/ranches/${slug}/animals/${animal.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update animal");
      }

      const json = await res.json();
      const updated = json?.data?.animal ??
        json?.data ?? { ...animal, ...body };
      setAnimal(updated);
      setEditingSection(null);
      setSaveSuccess("Record updated successfully!");
      setTimeout(() => setSaveSuccess(""), 3000);
    } catch (err) {
      setSaveError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // ── Loading skeleton ──────────────────────────────────────────────────────

  if (loading) {
    return (
      <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500"
        >
          <ArrowLeft size={15} /> Back
        </button>
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse space-y-4"
          >
            <div className="h-3 bg-gray-100 rounded w-1/4" />
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((j) => (
                <div key={j} className="h-8 bg-gray-100 rounded" />
              ))}
            </div>
          </div>
        ))}
      </main>
    );
  }

  const a = animal;

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={15} />
        </button>
        <div>
          <h1 className="text-base font-bold text-gray-800">
            {a.tagNumber ?? a.publicId?.slice(0, 8)} —{" "}
            {a.species?.name ?? "Animal"}
          </h1>
          <p className="text-[10px] text-gray-400">ID: {a.publicId}</p>
        </div>
        {a.qrUrl && (
          <a
            href={a.qrUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1 text-xs text-[#4CAF50] border border-[#4CAF50] px-3 py-1.5 rounded-lg hover:bg-[#f0fdf4] transition-colors"
          >
            View QR <ExternalLink size={11} />
          </a>
        )}
      </div>

      {/* Banners */}
      {saveSuccess && (
        <div className="px-4 py-3 rounded-xl bg-[#f0fdf4] border border-[#d1fae5] text-xs text-[#4CAF50] font-medium">
          ✅ {saveSuccess}
        </div>
      )}
      {(saveError || fetchError) && (
        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-500">
          {saveError || `⚠️ Showing partial data — ${fetchError}`}
        </div>
      )}

      {/* ── Basic Information ── */}
      <InfoCard
        title="Basic Information"
        editing={editingSection === "basic"}
        onEdit={() => startEdit("basic")}
        onSave={handleSave}
        onCancel={cancelEdit}
        saving={saving}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
          <Field
            label="Tag Number"
            fieldKey="tagNumber"
            value={a.tagNumber}
            editing={editingSection === "basic"}
            editValues={editValues}
            onChange={handleChange}
          />
          <Field
            label="Species"
            fieldKey="species"
            value={a.species?.name}
            readOnly
            editing={editingSection === "basic"}
            editValues={editValues}
            onChange={handleChange}
          />
          <Field
            label="Sex"
            fieldKey="sex"
            value={a.sex}
            editing={editingSection === "basic"}
            editValues={editValues}
            onChange={handleChange}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
          />
          <Field
            label="Breed"
            fieldKey="breed"
            value={a.breed}
            editing={editingSection === "basic"}
            editValues={editValues}
            onChange={handleChange}
          />
          <Field
            label="Weight (kg)"
            fieldKey="weight"
            value={a.weight ? `${a.weight} kg` : null}
            editing={editingSection === "basic"}
            editValues={editValues}
            onChange={handleChange}
            type="number"
          />
          <Field
            label="Date of Birth"
            fieldKey="dateOfBirth"
            value={
              a.dateOfBirth
                ? new Date(a.dateOfBirth).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : null
            }
            editing={editingSection === "basic"}
            editValues={editValues}
            onChange={handleChange}
            type="date"
          />
          <Field
            label="Age"
            fieldKey="age"
            value={calcAge(a.dateOfBirth)}
            readOnly
            editing={editingSection === "basic"}
            editValues={editValues}
            onChange={handleChange}
          />
          <Field
            label="RFID Tag"
            fieldKey="rfidTag"
            value={a.rfidTag}
            editing={editingSection === "basic"}
            editValues={editValues}
            onChange={handleChange}
          />
        </div>
      </InfoCard>

      {/* ── Health & Status ── */}
      <InfoCard
        title="Health & Status"
        editing={editingSection === "health"}
        onEdit={() => startEdit("health")}
        onSave={handleSave}
        onCancel={cancelEdit}
        saving={saving}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
          {editingSection === "health" ? (
            <>
              <Field
                label="Health Status"
                fieldKey="healthStatus"
                value={a.healthStatus}
                editing={true}
                editValues={editValues}
                onChange={handleChange}
                options={[
                  { value: "healthy", label: "Healthy" },
                  { value: "sick", label: "Sick" },
                  { value: "under_treatment", label: "Under Treatment" },
                ]}
              />
              <Field
                label="Status"
                fieldKey="status"
                value={a.status}
                editing={true}
                editValues={editValues}
                onChange={handleChange}
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
              />
            </>
          ) : (
            <>
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">
                  Health Status
                </p>
                <Badge value={a.healthStatus} greenValue="healthy" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">Status</p>
                <Badge value={a.status} greenValue="active" />
              </div>
            </>
          )}
        </div>

        {/* Animal photo */}
        {a.imageUrl && (
          <div className="mt-4">
            <p className="text-[10px] text-gray-400 mb-1.5">Animal Photo</p>
            <img
              src={a.imageUrl}
              alt="Animal"
              className="h-36 w-auto rounded-xl object-cover border border-gray-100"
            />
          </div>
        )}
      </InfoCard>

      {/* ── Activity Log ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-4">Activity Log</h3>

        {activityLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-7 h-7 rounded-full bg-gray-100 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2.5 bg-gray-100 rounded w-1/2" />
                  <div className="h-2 bg-gray-100 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!activityLoading && activity.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-6">
            No activity recorded yet.
          </p>
        )}

        {!activityLoading && activity.length > 0 && (
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-100" />

            <div className="space-y-5">
              {activity.map((event, i) => (
                <div key={event.id ?? i} className="flex gap-4 relative">
                  {/* Dot */}
                  <div className="w-7 h-7 rounded-full bg-[#f0fdf4] border-2 border-[#4CAF50] flex items-center justify-center shrink-0 z-10">
                    <span className="w-2 h-2 rounded-full bg-[#4CAF50]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pb-1">
                    {/* Event type + timestamp */}
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-700 capitalize">
                        {event.eventType?.replace(/_/g, " ") ?? "Event"}
                      </span>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">
                        {event.createdAt
                          ? new Date(event.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            ) +
                            " · " +
                            new Date(event.createdAt).toLocaleTimeString(
                              "en-GB",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )
                          : "—"}
                      </span>
                    </div>

                    {/* Field change */}
                    {event.field && (
                      <p className="text-xs text-gray-500 mb-1">
                        <span className="font-medium text-gray-700 capitalize">
                          {event.field}
                        </span>
                        {" changed from "}
                        <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-500 font-medium text-[10px]">
                          {event.fromValue ?? "—"}
                        </span>
                        {" → "}
                        <span className="px-1.5 py-0.5 rounded bg-[#f0fdf4] text-[#4CAF50] font-medium text-[10px]">
                          {event.toValue ?? "—"}
                        </span>
                      </p>
                    )}

                    {/* Notes */}
                    {event.notes && (
                      <p className="text-[11px] text-gray-400 italic">
                        "{event.notes}"
                      </p>
                    )}

                    {/* Actor */}
                    {event.actor && (
                      <p className="text-[10px] text-gray-400 mt-1">
                        By{" "}
                        <span className="font-medium text-gray-600">
                          {[event.actor.firstName, event.actor.lastName]
                            .filter(Boolean)
                            .join(" ") || event.actor.email}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
