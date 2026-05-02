"use client";

import { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";

const livestock = [
  {
    id: "#1201",
    weight: "280 kg",
    lastVet: "18 Aug 2025",
    age: "3 years",
    nextVax: "15 Sept 2025",
    sex: "Female",
    status: "Healthy",
  },
  {
    id: "#1202",
    weight: "280 kg",
    lastVet: "18 Aug 2025",
    age: "3 years",
    nextVax: "15 Sept 2025",
    sex: "Female",
    status: "Healthy",
  },
  {
    id: "#1203",
    weight: "280 kg",
    lastVet: "18 Aug 2025",
    age: "3 years",
    nextVax: "15 Sept 2025",
    sex: "Female",
    status: "Healthy",
  },
  {
    id: "#1204",
    weight: "280 kg",
    lastVet: "18 Aug 2025",
    age: "3 years",
    nextVax: "15 Sept 2025",
    sex: "Female",
    status: "Healthy",
  },
  {
    id: "#1205",
    weight: "280 kg",
    lastVet: "18 Aug 2025",
    age: "3 years",
    nextVax: "15 Sept 2025",
    sex: "Female",
    status: "Healthy",
  },
  {
    id: "#1206",
    weight: "280 kg",
    lastVet: "18 Aug 2025",
    age: "3 years",
    nextVax: "15 Sept 2025",
    sex: "Female",
    status: "Healthy",
  },
];

const ISSUE_TYPES = [
  "Sick Animal",
  "Injury",
  "Newborn Calf",
  "Breeding Signs",
  "Others (Custom)",
];

// ── Report Issue Form ─────────────────────────────────────────────────────────

function ReportIssueForm({ animal, onBack, onSubmit }) {
  const [issueType, setIssueType] = useState("");
  const [form, setForm] = useState({
    tagId: `Cow ${animal?.id ?? ""}`,
    breed: "",
    details: "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="px-4 pb-8 space-y-5">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-600 font-medium"
      >
        <ArrowLeft size={15} /> Back
      </button>

      <div className="bg-white rounded-2xl p-4 space-y-5">
        <p className="text-base font-bold text-gray-800">Report Issue</p>

        {/* Issue Type */}
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-1">Issue Type</p>
          <p className="text-xs text-gray-400 mb-2">
            Select type of the issue below
          </p>
          <div className="flex flex-wrap gap-2">
            {ISSUE_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setIssueType(type)}
                className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                  issueType === type
                    ? "border-[#4CAF50] bg-[#f0fdf4] text-[#4CAF50]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Animal Tag ID */}
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-2">
            Animal Tag ID
          </p>
          <input
            value={form.tagId}
            onChange={set("tagId")}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#4CAF50]"
          />
        </div>

        {/* Animal Breed */}
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-2">
            Animal Breed
          </p>
          <input
            value={form.breed}
            onChange={set("breed")}
            placeholder="Enter animal's Bread....."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50]"
          />
        </div>

        {/* Details Of Issue */}
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-2">
            Details Of Issue
          </p>
          <textarea
            value={form.details}
            onChange={set("details")}
            rows={3}
            placeholder="Write short description...."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
          />
        </div>

        {/* Photo/Video Proof */}
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-2">
            Photo/Video Proof
          </p>
          <button className="w-full border-2 border-dashed border-gray-300 rounded-xl py-6 flex flex-col items-center gap-1.5 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] transition-colors bg-gray-50">
            <Upload size={22} />
            <span className="text-xs font-medium">
              Upload Photo (camera or gallery)
            </span>
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={() => onSubmit({ ...form, issueType })}
        className="w-full py-4 rounded-2xl bg-[#4CAF50] hover:bg-[#43a047] text-white font-bold text-sm tracking-wide transition-colors"
      >
        REPORT NEW ISSUE
      </button>
    </div>
  );
}

// ── Livestock Card ────────────────────────────────────────────────────────────

function LivestockCard({ animal, onReport }) {
  return (
    <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm space-y-3">
      <div className="flex items-center gap-1.5">
        <span className="text-base">🔥</span>
        <span className="text-xs font-bold text-gray-800">Cow {animal.id}</span>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
        <div>
          <p className="text-gray-400">Weight</p>
          <p className="font-semibold text-gray-800">{animal.weight}</p>
        </div>
        <div>
          <p className="text-gray-400">Last Vet Visit:</p>
          <p className="font-semibold text-gray-800">{animal.lastVet}</p>
        </div>
        <div>
          <p className="text-gray-400">Age</p>
          <p className="font-semibold text-gray-800">{animal.age}</p>
        </div>
        <div>
          <p className="text-gray-400">Next Vaccination:</p>
          <p className="font-semibold text-gray-800">{animal.nextVax}</p>
        </div>
        <div>
          <p className="text-gray-400">Sex</p>
          <p className="font-semibold text-gray-800">{animal.sex}</p>
        </div>
        <div>
          <p className="text-gray-400">Status</p>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-[#4CAF50]">
            ✅ {animal.status}
          </span>
        </div>
      </div>
      <button
        onClick={() => onReport(animal)}
        className="w-full py-2.5 rounded-full bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors"
      >
        Report New Issue
      </button>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LivestockRecords() {
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  if (selectedAnimal) {
    return (
      <ReportIssueForm
        animal={selectedAnimal}
        onBack={() => setSelectedAnimal(null)}
        onSubmit={(data) => {
          console.log("Issue reported:", data);
          setSelectedAnimal(null);
        }}
      />
    );
  }

  return (
    <div className="px-4 pb-8 space-y-4">
      <p className="text-base font-bold text-gray-800">All Livestock Updates</p>
      <div className="grid grid-cols-2 gap-3">
        {livestock.map((animal, i) => (
          <LivestockCard key={i} animal={animal} onReport={setSelectedAnimal} />
        ))}
      </div>
    </div>
  );
}
