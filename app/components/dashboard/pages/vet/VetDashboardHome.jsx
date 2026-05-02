"use client";

import { useState } from "react";
import { ChevronDown, ArrowLeft, Scan } from "lucide-react";
import Image from "next/image";

// ── Placeholder data ──────────────────────────────────────────────────────────

const quickAlerts = [
  {
    type: "Livestock Health",
    description: "Cow #1123 flagged sick",
    by: "Worker Musa",
    date: "29-08-2025",
  },
  {
    type: "Livestock Health",
    description: "Cow #1123 flagged sick",
    by: "Worker Musa",
    date: "29-08-2025",
  },
  {
    type: "Livestock Health",
    description: "Cow #1123 flagged sick",
    by: "Worker Musa",
    date: "29-08-2025",
  },
];

const caseData = [
  { label: "Fever", value: 25 },
  { label: "Mastitis", value: 18 },
  { label: "Injuries", value: 7 },
  { label: "Diarrhea", value: 6 },
  { label: "Respiratory", value: 9 },
];

// ── Record Treatment Form ─────────────────────────────────────────────────────

function RecordTreatmentForm({ onBack }) {
  const [outcome, setOutcome] = useState("Improving");
  const [form, setForm] = useState({
    tagId: "",
    breed: "",
    diagnosis: "",
    treatment: "",
    dosage: "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="flex flex-col min-h-full bg-[#f5f5f5]">
      <div className="px-5 py-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-600 font-medium mb-4"
        >
          <ArrowLeft size={15} /> Back
        </button>

        <div className="space-y-5">
          {/* Animal Tag ID */}
          <div>
            <p className="text-sm font-bold text-gray-800 mb-2">
              Animal Tag ID
            </p>
            <button className="w-full border-2 border-dashed border-gray-300 rounded-xl py-5 flex flex-col items-center gap-1 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] transition-colors bg-white">
              <Scan size={22} />
              <span className="text-xs font-medium">Scan Livestock Tag</span>
            </button>
          </div>

          {/* Animal Breed */}
          <div>
            <p className="text-sm font-bold text-gray-800 mb-2">Animal Breed</p>
            <input
              value={form.breed}
              onChange={set("breed")}
              placeholder="Enter animal's Breed....."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
            />
          </div>

          {/* Condition / Diagnosis */}
          <div>
            <p className="text-sm font-bold text-gray-800 mb-2">
              Condition / Diagnosis
            </p>
            <textarea
              value={form.diagnosis}
              onChange={set("diagnosis")}
              placeholder="Enter animal's full condition....."
              rows={3}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors resize-none"
            />
          </div>

          {/* Treatment Administered */}
          <div>
            <p className="text-sm font-bold text-gray-800 mb-2">
              Treatment Administered
            </p>
            <textarea
              value={form.treatment}
              onChange={set("treatment")}
              placeholder="Enter the treatment you administered....."
              rows={3}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors resize-none"
            />
          </div>

          {/* Dosage */}
          <div>
            <p className="text-sm font-bold text-gray-800 mb-2">Dosage</p>
            <input
              value={form.dosage}
              onChange={set("dosage")}
              placeholder="Enter the dosage for the treatment...."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
            />
          </div>

          {/* Outcome */}
          <div>
            <p className="text-sm font-bold text-gray-800 mb-1">Outcome</p>
            <p className="text-xs text-gray-400 mb-3">
              Select outcome status below
            </p>
            <div className="flex rounded-xl border border-gray-200 overflow-hidden bg-white">
              {["Ongoing", "Improving", "Fully Treated"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setOutcome(opt)}
                  className={`flex-1 py-3 text-xs font-semibold transition-all border-r last:border-r-0 border-gray-200 ${
                    outcome === opt
                      ? "bg-[#4CAF50] text-white"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button className="w-full py-4 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-white font-semibold text-sm transition-colors mt-2">
            Submit Treatment Record
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Cases Reported Bar Chart ──────────────────────────────────────────────────

function CasesBarChart({ data }) {
  const W = 300,
    H = 130;
  const maxV = Math.max(...data.map((d) => d.value));
  const barW = 28;
  const gap = (W - data.length * barW) / (data.length + 1);
  const yTicks = [0, 5, 10, 15, 20, 25, 30];

  return (
    <div className="flex gap-2">
      {/* Y-axis */}
      <div
        className="flex flex-col justify-between text-right shrink-0 pb-5"
        style={{ height: H }}
      >
        {[...yTicks].reverse().map((t) => (
          <span key={t} className="text-[9px] text-gray-400 leading-none">
            {t} Cases
          </span>
        ))}
      </div>
      {/* Bars */}
      <div className="flex-1 min-w-0">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          {yTicks.map((t) => (
            <line
              key={t}
              x1="0"
              y1={H - (t / maxV) * H}
              x2={W}
              y2={H - (t / maxV) * H}
              stroke="#f3f4f6"
              strokeWidth="1"
              strokeDasharray="4,2"
            />
          ))}
          {data.map(({ value, label }, i) => {
            const x = gap + i * (barW + gap);
            const bh = (value / maxV) * H;
            return (
              <rect
                key={i}
                x={x}
                y={H - bh}
                width={barW}
                height={bh}
                fill="#4CAF50"
                rx="4"
              />
            );
          })}
        </svg>
        <div className="flex justify-around mt-1">
          {data.map(({ label }) => (
            <span key={label} className="text-[9px] text-gray-400 text-center">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Dashboard Home ────────────────────────────────────────────────────────────

export default function VetDashboardHome({ greeting, onNavigate }) {
  const [showForm, setShowForm] = useState(false);

  if (showForm)
    return <RecordTreatmentForm onBack={() => setShowForm(false)} />;

  return (
    <div className="px-4 pb-8 space-y-4">
      {/* Greeting */}
      <h1 className="text-lg font-bold text-gray-800 mt-1">{greeting}</h1>

      {/* Livestock Health Overview */}
      <div className="rounded-2xl bg-[linear-gradient(135deg,#DCFFA2_0%,#DCFFA2_60%,#FDE7C5_100%)] border border-[#d1fae5] p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-gray-800">
            Livestock Health Overview
          </p>
          <button className="flex items-center gap-1 text-xs text-gray-400">
            This Month <ChevronDown size={11} />
          </button>
        </div>
        <div className="flex gap-5 mb-2">
          {[
            { dot: "bg-[#4CAF50]", label: "Healthy Animals" },
            { dot: "bg-red-500", label: "Sick Animal" },
            { dot: "bg-amber-400", label: "Under Treatment" },
          ].map(({ dot, label }) => (
            <div key={label} className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              <span className="text-[10px] text-gray-600">{label}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-5">
          <div>
            <p className="text-2xl font-bold text-gray-800">
              465
              <span className="text-xs font-normal text-gray-400 ml-1">
                (92%)
              </span>
            </p>
            <p className="text-[10px] text-gray-400">Healthy Animals</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              25
              <span className="text-xs font-normal text-gray-400 ml-1">
                (5%)
              </span>
            </p>
            <p className="text-[10px] text-gray-400">Sick Animal</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              10
              <span className="text-xs font-normal text-gray-400 ml-1">
                (3%)
              </span>
            </p>
            <p className="text-[10px] text-gray-400">Under Treatment</p>
          </div>
        </div>
      </div>

      {/* Newborns + Mortality */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Newborns", value: "15", icon: "/images/frame.png" },
          {
            label: "Mortality",
            value: "3",
            sub: "(0.6%)",
            icon: "/images/frame-2.png",
          },
        ].map(({ label, value, sub, icon }) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
          >
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-gray-800">
                {value}
                {sub && (
                  <span className="text-xs font-normal text-gray-400 ml-1">
                    {sub}
                  </span>
                )}
              </p>
              <Image src={icon} alt={label} width={100} height={100} />
              {/* <span className="text-2xl opacity-20">{icon}</span> */}
            </div>
          </div>
        ))}
      </div>

      {/* Cases Reported */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-gray-800">Cases Reported</p>
          <button className="flex items-center gap-1 text-xs text-gray-400">
            This Month <ChevronDown size={11} />
          </button>
        </div>
        <CasesBarChart data={caseData} />
      </div>

      {/* Quick Alerts + Record Treatment button inline */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-bold text-gray-800">Quick Alerts</p>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full transition-colors"
          >
            + Record Treatment
          </button>
        </div>

        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-50">
              {["Alert", "Description", "Reported By", "Date"].map((col) => (
                <th
                  key={col}
                  className="text-left py-2 px-3 text-gray-400 font-medium whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {quickAlerts.map((row, i) => (
              <tr key={i} className="border-b border-gray-50 last:border-0">
                <td className="py-3 px-3">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    {row.type}
                  </span>
                </td>
                <td className="py-3 px-3 text-gray-500">{row.description}</td>
                <td className="py-3 px-3 text-gray-600 whitespace-nowrap">
                  {row.by}
                </td>
                <td className="py-3 px-3 text-gray-400 whitespace-nowrap">
                  {row.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
