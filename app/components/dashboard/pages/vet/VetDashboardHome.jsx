"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronDown, ArrowLeft, Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getSlug() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_token") ?? "";
}

function formatDate(str) {
  if (!str) return "—";
  return new Date(str).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ── Record Treatment Form ─────────────────────────────────────────────────────

function RecordTreatmentForm({ onBack }) {
  const [outcome, setOutcome] = useState("Improving");
  const [form, setForm] = useState({
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
          <div>
            <p className="text-sm font-bold text-gray-800 mb-2">
              Animal Tag ID
            </p>
            <button className="w-full border-2 border-dashed border-gray-300 rounded-xl py-5 flex flex-col items-center gap-1 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] transition-colors bg-white">
              <Scan size={22} />
              <span className="text-xs font-medium">Scan Livestock Tag</span>
            </button>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800 mb-2">Animal Breed</p>
            <input
              value={form.breed}
              onChange={set("breed")}
              placeholder="Enter animal's Breed....."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50]"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800 mb-2">
              Condition / Diagnosis
            </p>
            <textarea
              value={form.diagnosis}
              onChange={set("diagnosis")}
              rows={3}
              placeholder="Enter animal's full condition....."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800 mb-2">
              Treatment Administered
            </p>
            <textarea
              value={form.treatment}
              onChange={set("treatment")}
              rows={3}
              placeholder="Enter the treatment you administered....."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800 mb-2">Dosage</p>
            <input
              value={form.dosage}
              onChange={set("dosage")}
              placeholder="Enter the dosage for the treatment...."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50]"
            />
          </div>
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
          <button className="w-full py-4 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-white font-semibold text-sm transition-colors mt-2">
            Submit Treatment Record
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Cases Bar Chart ───────────────────────────────────────────────────────────

function CasesBarChart({ data }) {
  if (!data.length)
    return (
      <p className="text-xs text-gray-400 text-center py-4">No case data yet</p>
    );

  const W = 300;
  const H = 130;
  const maxV = Math.max(...data.map((d) => d.value), 1);
  const barW = 28;
  const gap = (W - data.length * barW) / (data.length + 1);
  const yTicks = [
    0,
    Math.round(maxV * 0.25),
    Math.round(maxV * 0.5),
    Math.round(maxV * 0.75),
    maxV,
  ];

  return (
    <div className="flex gap-2">
      <div
        className="flex flex-col justify-between text-right shrink-0 pb-5"
        style={{ height: H }}
      >
        {[...yTicks].reverse().map((t, i) => (
          <span
            key={`tick-${i}`}
            className="text-[9px] text-gray-400 leading-none"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex-1 min-w-0">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          {yTicks.map((t, i) => (
            <line
              key={`line-${i}`}
              x1="0"
              y1={H - (t / maxV) * H}
              x2={W}
              y2={H - (t / maxV) * H}
              stroke="#f3f4f6"
              strokeWidth="1"
              strokeDasharray="4,2"
            />
          ))}
          {data.map(({ value }, i) => {
            const x = gap + i * (barW + gap);
            const bh = Math.max((value / maxV) * H, 2);
            return (
              <rect
                key={`bar-${i}`}
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
          {data.map(({ label }, i) => (
            <span
              key={`label-${i}`}
              className="text-[9px] text-gray-400 text-center"
            >
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
  const [animals, setAnimals] = useState([]);
  const [vaxAlerts, setVaxAlerts] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [animalsRes, alertsRes] = await Promise.all([
        fetch(`${API}/ranches/${getSlug()}/animals?limit=100`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
        fetch(`${API}/ranches/${getSlug()}/vaccinations/alerts`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
      ]);
      if (animalsRes.ok) {
        const json = await animalsRes.json();
        const list = json?.data?.animals ?? json?.animals ?? [];
        console.log(
          "✅ Animals sample healthStatus values:",
          list.slice(0, 5).map((a) => a.healthStatus),
        );
        setAnimals(list);
      }
      if (alertsRes.ok) {
        const json = await alertsRes.json();
        setVaxAlerts(json?.data ?? json);
      }
    } catch (err) {
      console.error("Vet dashboard fetch:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Derive health stats ─────────────────────────────────────────────────────
  const total = animals.length;
  const healthy = animals.filter((a) => a.healthStatus === "healthy").length;
  const sick = animals.filter((a) => a.healthStatus === "sick").length;
  const recovering = animals.filter(
    (a) => a.healthStatus === "recovering",
  ).length;
  const quarantined = animals.filter(
    (a) => a.healthStatus === "quarantined",
  ).length;

  const healthyPct = total ? Math.round((healthy / total) * 100) : 0;
  const sickPct = total ? Math.round((sick / total) * 100) : 0;
  const recoveringPct = total ? Math.round((recovering / total) * 100) : 0;

  // Bar chart from health status counts
  const caseData = [
    { label: "Healthy", value: healthy },
    { label: "Sick", value: sick },
    { label: "Recovering", value: recovering },
    { label: "Quarantined", value: quarantined },
  ].filter((d) => d.value > 0);

  // Quick alerts from vaccination overdue + dueToday
  const overdueAlerts = vaxAlerts?.overdue ?? [];
  const dueTodayAlerts = vaxAlerts?.dueToday ?? [];
  const quickAlerts = [...overdueAlerts, ...dueTodayAlerts].slice(0, 5);

  // Summary numbers
  const summary = vaxAlerts?.summary ?? {};

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
            All Time <ChevronDown size={11} />
          </button>
        </div>
        <div className="flex gap-4 mb-2 flex-wrap">
          {[
            { dot: "bg-[#4CAF50]", label: "Healthy" },
            { dot: "bg-red-500", label: "Sick" },
            { dot: "bg-blue-400", label: "Recovering" },
            { dot: "bg-purple-500", label: "Quarantined" },
          ].map(({ dot, label }) => (
            <div key={label} className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              <span className="text-[10px] text-gray-600">{label}</span>
            </div>
          ))}
        </div>
        {loading ? (
          <div className="flex gap-5 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-white/50 rounded-xl flex-1" />
            ))}
          </div>
        ) : (
          <div className="flex gap-5 flex-wrap">
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {healthy}
                <span className="text-xs font-normal text-gray-400 ml-1">
                  ({healthyPct}%)
                </span>
              </p>
              <p className="text-[10px] text-gray-400">Healthy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {sick}
                <span className="text-xs font-normal text-gray-400 ml-1">
                  ({sickPct}%)
                </span>
              </p>
              <p className="text-[10px] text-gray-400">Sick</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {recovering}
                <span className="text-xs font-normal text-gray-400 ml-1">
                  ({recoveringPct}%)
                </span>
              </p>
              <p className="text-[10px] text-gray-400">Recovering</p>
            </div>
          </div>
        )}
      </div>

      {/* Vaccination alerts summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Overdue",
            value: summary.overdueCount ?? overdueAlerts.length,
            color: "text-red-500",
          },
          {
            label: "Due Today",
            value: summary.dueTodayCount ?? dueTodayAlerts.length,
            color: "text-amber-500",
          },
          {
            label: "Total Animals",
            value: loading ? "—" : total,
            color: "text-gray-800",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center"
          >
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Cases chart */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-gray-800">
            Health Status Breakdown
          </p>
          <span className="text-xs text-gray-400">{total} animals</span>
        </div>
        {loading ? (
          <div className="h-32 bg-gray-50 rounded-xl animate-pulse" />
        ) : (
          <CasesBarChart data={caseData} />
        )}
      </div>

      {/* Quick Alerts + Record Treatment */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-bold text-gray-800">Vaccination Alerts</p>
          <button
            onClick={() => onNavigate?.("alerts")}
            className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full transition-colors"
          >
            More →
          </button>
        </div>

        {loading ? (
          <div className="p-4 space-y-2 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 bg-gray-50 rounded" />
            ))}
          </div>
        ) : quickAlerts.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-sm text-[#4CAF50] font-medium">
              🎉 No urgent vaccination alerts!
            </p>
          </div>
        ) : (
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-50">
                {["Animal", "Vaccine", "Status", "Due Date"].map((col) => (
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
                <tr
                  key={row.publicId ?? i}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="py-3 px-3">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${row.alertStatus === "overdue" ? "bg-red-500" : "bg-amber-400"}`}
                      />
                      {row.animalTagNumber ?? "—"}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-500">
                    {row.vaccineName ?? "—"}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-xs font-semibold capitalize ${row.alertStatus === "overdue" ? "text-red-500" : "text-amber-500"}`}
                    >
                      {row.alertStatus?.replace(/_/g, " ") ?? "—"}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-400 whitespace-nowrap">
                    {formatDate(row.nextDueAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
