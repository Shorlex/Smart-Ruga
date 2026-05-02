"use client";

import { useState } from "react";
import { ArrowLeft, Search, X } from "lucide-react";

// ── Placeholder data ──────────────────────────────────────────────────────────

const animals = [
  {
    id: "#1201",
    weight: "280 kg",
    status: "Healthy",
    age: "3 years",
    lastCheck: "18 Aug 2025",
    sex: "Female",
    nextVax: "15 Sept 2025",
    breed: "White Fulani",
    liveWeight: "250Kg",
    health: {
      diagnosis: "Worm Infestations",
      lastTreatment: "Antibiotics (30 Aug)",
      nextCheckUp: "2 Sep 2025",
      assignedVet: "Dr. Musa",
    },
    history: [
      {
        date: "30 Aug 2025",
        condition: "Fever & Cough",
        treatment: "Antibiotics 5ml injection",
        outcome: "Ongoing",
        notes: '"Hydration encouraged"',
        vet: "Dr. Musa",
      },
      {
        date: "15 Jun 2025",
        condition: "Worm Infestation",
        treatment: "Dewormer injection",
        outcome: "Resolved",
        notes: '"Monitor feed intake"',
        vet: "Dr. Musa",
      },
    ],
  },
  {
    id: "#1202",
    weight: "280 kg",
    status: "Healthy",
    age: "3 years",
    lastCheck: "18 Aug 2025",
    sex: "Female",
    nextVax: "15 Sept 2025",
    breed: "Bunaji",
    liveWeight: "260Kg",
    health: {
      diagnosis: "Mastitis Disease",
      lastTreatment: "Antibiotics (28 Aug)",
      nextCheckUp: "5 Sep 2025",
      assignedVet: "Dr. Musa",
    },
    history: [],
  },
  {
    id: "#1203",
    weight: "280 kg",
    status: "Healthy",
    age: "3 years",
    lastCheck: "18 Aug 2025",
    sex: "Female",
    nextVax: "15 Sept 2025",
    breed: "White Fulani",
    liveWeight: "255Kg",
    health: {
      diagnosis: "Healthy",
      lastTreatment: "—",
      nextCheckUp: "20 Sep 2025",
      assignedVet: "Dr. Musa",
    },
    history: [],
  },
  {
    id: "#1204",
    weight: "280 kg",
    status: "Healthy",
    age: "3 years",
    lastCheck: "18 Aug 2025",
    sex: "Female",
    nextVax: "15 Sept 2025",
    breed: "White Fulani",
    liveWeight: "248Kg",
    health: {
      diagnosis: "Healthy",
      lastTreatment: "—",
      nextCheckUp: "20 Sep 2025",
      assignedVet: "Dr. Musa",
    },
    history: [],
  },
  {
    id: "#1205",
    weight: "280 kg",
    status: "Healthy",
    age: "3 years",
    lastCheck: "18 Aug 2025",
    sex: "Female",
    nextVax: "15 Sept 2025",
    breed: "White Fulani",
    liveWeight: "252Kg",
    health: {
      diagnosis: "Healthy",
      lastTreatment: "—",
      nextCheckUp: "20 Sep 2025",
      assignedVet: "Dr. Musa",
    },
    history: [],
  },
  {
    id: "#1206",
    weight: "280 kg",
    status: "Healthy",
    age: "3 years",
    lastCheck: "18 Aug 2025",
    sex: "Female",
    nextVax: "15 Sept 2025",
    breed: "Bunaji",
    liveWeight: "258Kg",
    health: {
      diagnosis: "Healthy",
      lastTreatment: "—",
      nextCheckUp: "20 Sep 2025",
      assignedVet: "Dr. Musa",
    },
    history: [],
  },
];

// ── Update Health Info Modal ──────────────────────────────────────────────────

function UpdateHealthModal({ animal, onClose, onSave }) {
  const [form, setForm] = useState({
    diagnosis: animal.health.diagnosis,
    lastTreatment: animal.health.lastTreatment,
    nextCheckUp: animal.health.nextCheckUp,
    assignedVet: animal.health.assignedVet,
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40">
      <div className="bg-white rounded-t-3xl p-5 space-y-4 max-h-[85%] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-gray-800">
            Update Health Information
          </p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {[
          { label: "Latest Diagnosis", key: "diagnosis" },
          { label: "Last Treatment", key: "lastTreatment" },
          { label: "Next Check Up", key: "nextCheckUp" },
          { label: "Assigned Vet", key: "assignedVet" },
        ].map(({ label, key }) => (
          <div key={key}>
            <p className="text-xs font-semibold text-gray-700 mb-1.5">
              {label}
            </p>
            <input
              value={form[key]}
              onChange={set(key)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors"
            />
          </div>
        ))}

        <button
          onClick={() => onSave(form)}
          className="w-full py-4 rounded-2xl bg-[#4CAF50] hover:bg-[#43a047] text-white font-semibold text-sm transition-colors"
        >
          Update Info
        </button>
      </div>
    </div>
  );
}

// ── Animal Detail View ────────────────────────────────────────────────────────

function AnimalDetail({ animal, onBack }) {
  const [showModal, setShowModal] = useState(false);
  const [health, setHealth] = useState(animal.health);

  const handleSave = (updated) => {
    setHealth(updated);
    setShowModal(false);
  };

  return (
    <div className="relative flex flex-col min-h-full bg-[#f5f5f5]">
      <div className="px-4 py-4 space-y-4">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-600 font-medium"
        >
          <ArrowLeft size={15} /> Back
        </button>

        {/* Livestock Info */}
        <div className="bg-white rounded-2xl p-4 space-y-3">
          <p className="text-sm font-bold text-gray-800">
            Livestock Information
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
            <div>
              <p className="text-gray-400">Livestock Tag ID:</p>
              <p className="font-semibold text-gray-800">{animal.id}</p>
            </div>
            <div>
              <p className="text-gray-400">Age:</p>
              <p className="font-semibold text-gray-800">
                {animal.age}, 3 months
              </p>
            </div>
            <div>
              <p className="text-gray-400">Livestock Breed:</p>
              <p className="font-semibold text-gray-800">{animal.breed}</p>
            </div>
            <div>
              <p className="text-gray-400">Sex:</p>
              <p className="font-semibold text-gray-800">{animal.sex}</p>
            </div>
            <div>
              <p className="text-gray-400">Livestock Weight:</p>
              <p className="font-semibold text-gray-800">{animal.liveWeight}</p>
            </div>
          </div>
        </div>

        {/* Health Info */}
        <div className="bg-white rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-gray-800">
              Health Information
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-3 py-1.5 rounded-full bg-[#4CAF50] text-white text-xs font-semibold hover:bg-[#43a047] transition-colors"
            >
              Update Info
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
            <div>
              <p className="text-gray-400">Latest Diagnosis:</p>
              <p className="font-semibold text-gray-800">{health.diagnosis}</p>
            </div>
            <div>
              <p className="text-gray-400">Last Treatment:</p>
              <p className="font-semibold text-gray-800">
                {health.lastTreatment}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Next Check-Up:</p>
              <p className="font-semibold text-gray-800">
                {health.nextCheckUp}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Assigned Vet:</p>
              <p className="font-semibold text-gray-800">
                {health.assignedVet}
              </p>
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="bg-white rounded-2xl p-4 space-y-4">
          <p className="text-sm font-bold text-gray-800">Medical History</p>
          {animal.history.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-4">
              No history recorded yet.
            </p>
          )}
          {animal.history.map((h, i) => (
            <div
              key={i}
              className="space-y-2 pb-4 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">📅</span>
                <p className="text-xs font-bold text-gray-700">{h.date}</p>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div>
                  <p className="text-gray-400">Condition:</p>
                  <p className="font-semibold text-gray-800">{h.condition}</p>
                </div>
                <div>
                  <p className="text-gray-400">Treatment:</p>
                  <p className="font-semibold text-gray-800">{h.treatment}</p>
                </div>
                <div>
                  <p className="text-gray-400">Outcome:</p>
                  <p className="font-semibold text-gray-800">{h.outcome}</p>
                </div>
              </div>
              <div className="bg-[#f0fdf4] rounded-xl p-3 text-xs text-gray-600">
                <p className="text-gray-400 mb-0.5">Notes:</p>
                <p className="italic text-gray-700">{h.notes}</p>
                <p className="text-[#4CAF50] font-medium mt-1">~ {h.vet}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Update modal */}
      {showModal && (
        <UpdateHealthModal
          animal={{ ...animal, health }}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

// ── Animal Card ───────────────────────────────────────────────────────────────

function AnimalCard({ animal, onViewDetails }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-lg">🔥</span>
        <span className="text-sm font-bold text-gray-800">Cow {animal.id}</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <div>
          <p className="text-gray-400">Weight</p>
          <p className="font-semibold text-gray-800">{animal.weight}</p>
        </div>
        <div>
          <p className="text-gray-400">Status</p>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#4CAF50]">
            ✅ {animal.status}
          </span>
        </div>
        <div>
          <p className="text-gray-400">Age</p>
          <p className="font-semibold text-gray-800">{animal.age}</p>
        </div>
        <div>
          <p className="text-gray-400">Last Check:</p>
          <p className="font-semibold text-gray-800">{animal.lastCheck}</p>
        </div>
        <div>
          <p className="text-gray-400">Sex</p>
          <p className="font-semibold text-gray-800">{animal.sex}</p>
        </div>
        <div>
          <p className="text-gray-400">Next Vaccination:</p>
          <p className="font-semibold text-gray-800">{animal.nextVax}</p>
        </div>
      </div>
      <button
        onClick={() => onViewDetails(animal)}
        className="w-full py-2.5 rounded-full bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors"
      >
        View Details
      </button>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AnimalHealthRecords() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  if (selected)
    return <AnimalDetail animal={selected} onBack={() => setSelected(null)} />;

  const filtered = animals.filter(
    (a) =>
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.breed?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="px-4 pb-8 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Livestock records....."
          className="w-full pl-9 pr-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
        />
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((animal, i) => (
          <AnimalCard key={i} animal={animal} onViewDetails={setSelected} />
        ))}
      </div>
    </div>
  );
}
