"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

// ── Placeholder data ──────────────────────────────────────────────────────────

const initialTreatments = [
  {
    id: "#1201",
    condition: "Worm Infestations",
    treatment: "Antibiotics + Rest",
    lastCheck: "30 Aug 2025",
    nextCheck: "2 Sep 2025",
    outcome: "Ongoing",
  },
  {
    id: "#1201",
    condition: "Mastitis Disease",
    treatment: "Antibiotics + Rest",
    lastCheck: "30 Aug 2025",
    nextCheck: "2 Sep 2025",
    outcome: "Ongoing",
  },
];

const initialSchedules = [
  {
    lot: "Herd B",
    type: "FMD Vaccine",
    dueDate: "25 Sep 2025",
    status: "Pending",
  },
  {
    lot: "Herd A",
    type: "Dewormer",
    dueDate: "30 Sep 2025",
    status: "Pending",
  },
  {
    lot: "Herd C",
    type: "Brucella Vax",
    dueDate: "10 Oct 2025",
    status: "Completed",
  },
];

// ── Add Vaccination Modal ─────────────────────────────────────────────────────

function AddVaccinationModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    lot: "",
    type: "",
    dueDate: "",
    status: "Pending",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40">
      <div className="bg-white rounded-t-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-gray-800">
            Add Vaccination Schedule
          </p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>
        {[
          { label: "Livestock Lot", key: "lot", placeholder: "e.g. Herd B" },
          {
            label: "Vaccine Type",
            key: "type",
            placeholder: "e.g. FMD Vaccine",
          },
          {
            label: "Due Date",
            key: "dueDate",
            placeholder: "e.g. 25 Sep 2025",
          },
        ].map(({ label, key, placeholder }) => (
          <div key={key}>
            <p className="text-xs font-semibold text-gray-700 mb-1.5">
              {label}
            </p>
            <input
              value={form[key]}
              onChange={set(key)}
              placeholder={placeholder}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors"
            />
          </div>
        ))}
        <button
          onClick={() => {
            onAdd(form);
            onClose();
          }}
          className="w-full py-4 rounded-2xl bg-[#4CAF50] hover:bg-[#43a047] text-white font-semibold text-sm transition-colors"
        >
          Add Schedule
        </button>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TreatmentVaccination() {
  const [treatments, setTreatments] = useState(initialTreatments);
  const [schedules, setSchedules] = useState(initialSchedules);
  const [showModal, setShowModal] = useState(false);

  const markCompleted = (i) => {
    setSchedules((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, status: "Completed" } : s)),
    );
  };

  return (
    <div className="relative flex flex-col min-h-full bg-[#f5f5f5]">
      <div className="px-4 pb-8 space-y-5">
        {/* ── Active Treatment Records ── */}
        <div>
          <p className="text-base font-bold text-gray-800 mb-3">
            Active Treatment Records
          </p>
          <div className="space-y-3">
            {treatments.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🔥</span>
                    <span className="text-sm font-bold text-gray-800">
                      Cow {t.id}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const updated = [...treatments];
                      updated[i] = { ...t, outcome: "Fully Treated" };
                      setTreatments(updated);
                    }}
                    className="px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50 transition-colors"
                  >
                    Update Info
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div>
                    <p className="text-gray-400">Current Condition:</p>
                    <p className="font-semibold text-gray-800">{t.condition}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Treatment:</p>
                    <p className="font-semibold text-gray-800">{t.treatment}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Last Check-Up:</p>
                    <p className="font-semibold text-gray-800">{t.lastCheck}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Outcome:</p>
                    <p
                      className={`font-semibold ${t.outcome === "Fully Treated" ? "text-[#4CAF50]" : "text-amber-500"}`}
                    >
                      {t.outcome}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Next Check-Up:</p>
                    <p className="font-semibold text-gray-800">{t.nextCheck}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Vaccination Schedule ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-base font-bold text-gray-800">
              Vaccination Schedule
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors"
            >
              <Plus size={12} /> Add New
            </button>
          </div>
          <div className="space-y-3">
            {schedules.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3"
              >
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div>
                    <p className="text-gray-400">Livestock Lot:</p>
                    <p className="font-semibold text-gray-800">{s.lot}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Vaccination Type:</p>
                    <p className="font-semibold text-gray-800">{s.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Due Date:</p>
                    <p className="font-semibold text-gray-800">{s.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Status</p>
                    <p
                      className={`font-semibold ${s.status === "Completed" ? "text-[#4CAF50]" : "text-amber-500"}`}
                    >
                      {s.status}
                    </p>
                  </div>
                </div>
                {s.status !== "Completed" && (
                  <button
                    onClick={() => markCompleted(i)}
                    className="w-full py-3 rounded-2xl bg-[#4CAF50] hover:bg-[#43a047] text-white text-sm font-semibold transition-colors"
                  >
                    Mark Completed
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <AddVaccinationModal
          onClose={() => setShowModal(false)}
          onAdd={(v) => setSchedules((prev) => [...prev, v])}
        />
      )}
    </div>
  );
}
