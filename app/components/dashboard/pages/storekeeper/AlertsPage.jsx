"use client";

// ── Placeholder data ──────────────────────────────────────────────────────────

const alerts = [
  {
    id: "#AL-3040",
    datetime: "21 Sept 2025, 9:30AM",
    severity: "Critical",
    item: "Maize Feed",
    message: "Low Stock: Remaining 1,950 kg",
    triggeredBy: "Auto-System",
    status: "Open",
    action: "Restock",
  },
  {
    id: "#AL-2020",
    datetime: "21 Sept 2025, 9:30AM",
    severity: "Medium",
    item: "Antibiotics",
    message: "Expiry Alert: 40 days left",
    triggeredBy: "Auto-System",
    status: "Open",
    action: "Restock",
  },
  {
    id: "#AL-2340",
    datetime: "21 Sept 2025, 9:30AM",
    severity: "Critical",
    item: "FMD Vaccine",
    message: "Expiring in 10 days (Batch FMD-2025)",
    triggeredBy: "Auto-System",
    status: "Open",
    action: "Restock",
  },
  {
    id: "#AL-2440",
    datetime: "21 Sept 2025, 9:30AM",
    severity: "Info",
    item: "Soybeans",
    message: "New Stock Added: 500 kg",
    triggeredBy: "Auto-System",
    status: "Open",
    action: "View Log",
  },
  {
    id: "#AL-2340",
    datetime: "21 Sept 2025, 9:30AM",
    severity: "Medium",
    item: "Gloves (Vet)",
    message: "Stock running low: 20 boxes left",
    triggeredBy: "Auto-System",
    status: "Open",
    action: "Restock",
  },
  {
    id: "#AL-2100",
    datetime: "21 Sept 2025, 9:30AM",
    severity: "Critical",
    item: "FMD Vaccine",
    message: "Expiring in 10 days (Batch FMD-2025)",
    triggeredBy: "Auto-System",
    status: "Open",
    action: "Restock",
  },
  {
    id: "#AL-2000",
    datetime: "21 Sept 2025, 9:30AM",
    severity: "Info",
    item: "Supplements",
    message: "New Stock Added: 500 kg",
    triggeredBy: "Auto-System",
    status: "Open",
    action: "View Log",
  },
  {
    id: "#AL-1990",
    datetime: "21 Sept 2025, 9:30AM",
    severity: "Critical",
    item: "FMD Vaccine",
    message: "Expiring in 10 days (Batch FMD-2025)",
    triggeredBy: "Auto-System",
    status: "Open",
    action: "Restock",
  },
];

// ── Severity Badge ────────────────────────────────────────────────────────────

function SeverityBadge({ severity }) {
  const styles = {
    Critical: { bg: "bg-red-50 text-red-500", dot: "bg-red-500" },
    Medium: { bg: "bg-amber-50 text-amber-500", dot: "bg-amber-400" },
    Info: { bg: "bg-[#f0fdf4] text-[#4CAF50]", dot: "bg-[#4CAF50]" },
  };
  const s = styles[severity] ?? {
    bg: "bg-gray-100 text-gray-500",
    dot: "bg-gray-400",
  };
  return (
    <span
      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${s.bg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {severity}
    </span>
  );
}

// ── Action Button ─────────────────────────────────────────────────────────────

function ActionButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1.5 rounded-full bg-[#4CAF50] hover:bg-[#43a047] text-white text-[11px] font-semibold transition-colors whitespace-nowrap"
    >
      {label}
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AlertsPage() {
  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      <h1 className="text-base font-bold text-gray-800">All Alerts</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                {[
                  "Alerts ID",
                  "Date & Time",
                  "Severity",
                  "Item",
                  "Alert Message",
                  "Triggered By",
                  "Status",
                  "Action",
                ].map((col) => (
                  <th
                    key={col}
                    className="text-left py-3 px-5 text-gray-500 font-medium whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alerts.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-5 font-medium text-gray-700 whitespace-nowrap">
                    {row.id}
                  </td>
                  <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                    {row.datetime}
                  </td>
                  <td className="py-4 px-5">
                    <SeverityBadge severity={row.severity} />
                  </td>
                  <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                    {row.item}
                  </td>
                  <td className="py-4 px-5 text-gray-600 max-w-40">
                    {row.message}
                  </td>
                  <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                    {row.triggeredBy}
                  </td>
                  <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                    {row.status}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 text-[11px] font-medium transition-colors">
                        Dismiss
                      </button>
                      <ActionButton
                        label={row.action}
                        onClick={() => console.log(row.action, row)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
