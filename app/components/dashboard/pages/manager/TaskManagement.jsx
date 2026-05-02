"use client";

import { Plus } from "lucide-react";

// ── Placeholder data ──────────────────────────────────────────────────────────

const tasks = [
  {
    id: "T-3001",
    type: "Livestock Feeding",
    description: "Feed the whole of Herd A (Morning)",
    assignedTo: "Worker Musa (012)",
    deadline: "10 Sept / 7:00 AM",
    status: "Done",
    proof: "/images/cow-proof.jpg",
  },
  {
    id: "T-3001",
    type: "Cleaning",
    description: "Clean Barn (North Side)",
    assignedTo: "Worker Raheem (014)",
    deadline: "9 Sept / 3:00 PM",
    status: "Pending",
    proof: null,
  },
  {
    id: "T-3001",
    type: "Livestock Feeding",
    description: "Feed the whole of Herd A (Morning)",
    assignedTo: "Worker Musa (012)",
    deadline: "10 Sept / 7:00 AM",
    status: "Done",
    proof: "/images/cow-proof.jpg",
  },
  {
    id: "T-3001",
    type: "Cleaning",
    description: "Clean Barn (North Side)",
    assignedTo: "Worker Raheem (014)",
    deadline: "9 Sept / 3:00 PM",
    status: "Pending",
    proof: null,
  },
  {
    id: "T-3001",
    type: "Cleaning",
    description: "Clean Barn (North Side)",
    assignedTo: "Worker Raheem (014)",
    deadline: "9 Sept / 3:00 PM",
    status: "Pending",
    proof: null,
  },
  {
    id: "T-3001",
    type: "Livestock Feeding",
    description: "Feed the whole of Herd A (Morning)",
    assignedTo: "Worker Musa (012)",
    deadline: "10 Sept / 7:00 AM",
    status: "Done",
    proof: "/images/cow-proof.jpg",
  },
  {
    id: "T-3001",
    type: "Cleaning",
    description: "Clean Barn (North Side)",
    assignedTo: "Worker Raheem (014)",
    deadline: "9 Sept / 3:00 PM",
    status: "Pending",
    proof: null,
  },
  {
    id: "T-3001",
    type: "Cleaning",
    description: "Clean Barn (North Side)",
    assignedTo: "Worker Raheem (014)",
    deadline: "9 Sept / 3:00 PM",
    status: "Pending",
    proof: null,
  },
];

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const styles = {
    Done: "bg-[#f0fdf4] text-[#4CAF50]",
    Pending: "bg-amber-50 text-amber-500",
    Overdue: "bg-red-50 text-red-500",
  };
  return (
    <span
      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${styles[status] ?? "bg-gray-100 text-gray-500"}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${status === "Done" ? "bg-[#4CAF50]" : status === "Pending" ? "bg-amber-400" : "bg-red-500"}`}
      />
      {status}
    </span>
  );
}

// ── Proof Cell ────────────────────────────────────────────────────────────────

function ProofCell({ proof }) {
  if (proof) {
    return (
      <div className="w-14 h-10 rounded-lg overflow-hidden bg-amber-100 shrink-0">
        {/* Replace with <Image> when real proof images are available from API */}
        <div className="w-full h-full bg-linear-to-br from-amber-200 to-amber-400 flex items-center justify-center text-amber-700 text-lg">
          🐄
        </div>
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-lg">
      🖼
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TaskManagementPage() {
  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold text-gray-800">Task Management</h1>
        <button className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors">
          <Plus size={13} /> Create New Task
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                {[
                  "Task ID",
                  "Task Type",
                  "Task Description",
                  "Assigned To",
                  "Deadline",
                  "Status",
                  "Proof",
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
              {tasks.map((task, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3.5 px-5 font-medium text-gray-700 whitespace-nowrap">
                    {task.id}
                  </td>
                  <td className="py-3.5 px-5 text-gray-600 whitespace-nowrap">
                    {task.type}
                  </td>
                  <td className="py-3.5 px-5 text-gray-600 max-w-[180px]">
                    {task.description}
                  </td>
                  <td className="py-3.5 px-5 text-gray-600 whitespace-nowrap">
                    {task.assignedTo}
                  </td>
                  <td className="py-3.5 px-5 text-gray-500 whitespace-nowrap">
                    {task.deadline}
                  </td>
                  <td className="py-3.5 px-5">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="py-3.5 px-5">
                    <ProofCell proof={task.proof} />
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
