"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";

// ── Placeholder data ──────────────────────────────────────────────────────────

const staffList = [
  {
    name: "Amin Danladi",
    role: "Ranch Manager",
    staffId: "#021",
    status: "Active",
    lastLogin: "30 Aug 2025, 8:15 AM",
    contact: "09152875444",
  },
  {
    name: "Grace Daniels",
    role: "Store Keeper",
    staffId: "#026",
    status: "Active",
    lastLogin: "29 Aug 2025, 1:25 PM",
    contact: "grace@demo.com",
  },
  {
    name: "Dr. Musa Halim",
    role: "Veterinarian",
    staffId: "#036",
    status: "Active",
    lastLogin: "26 Aug 2025, 8:15 AM",
    contact: "08032875464",
  },
  {
    name: "Abdul Hassan",
    role: "Worker-Herder",
    staffId: "#039",
    status: "Active",
    lastLogin: "30 Aug 2025, 8:15 AM",
    contact: "09152875444",
  },
  {
    name: "Aliyu Muiz",
    role: "Worker-Herder",
    staffId: "#039",
    status: "Suspended",
    lastLogin: "30 Aug 2025, 8:15 AM",
    contact: "09152875444",
  },
  {
    name: "James Micheal",
    role: "Worker-Herder",
    staffId: "#039",
    status: "Active",
    lastLogin: "30 Aug 2025, 8:15 AM",
    contact: "09152875444",
  },
  {
    name: "Kaleel Abu",
    role: "Worker-Herder",
    staffId: "#039",
    status: "Active",
    lastLogin: "30 Aug 2025, 8:15 AM",
    contact: "09152875444",
  },
  {
    name: "Abubakar Karl",
    role: "Worker-Herder",
    staffId: "#039",
    status: "Active",
    lastLogin: "30 Aug 2025, 8:15 AM",
    contact: "09152875444",
  },
];

const workLogs = [
  {
    name: "Amin Danladi",
    role: "Ranch Manager",
    checkIn: "07:00 AM",
    tasksCompleted: "12/12",
    completion: "100%",
    issues: 0,
    status: "Active",
  },
  {
    name: "Grace Daniels",
    role: "Store Keeper",
    checkIn: "07:10 AM",
    tasksCompleted: "8/12",
    completion: "80%",
    issues: 1,
    status: "Active",
  },
  {
    name: "Dr. Musa Halim",
    role: "Veterinarian",
    checkIn: "12:00 PM",
    tasksCompleted: "4/4",
    completion: "100%",
    issues: 3,
    status: "Active",
  },
  {
    name: "Abdul Hassan",
    role: "Worker-Herder",
    checkIn: "07:00 AM",
    tasksCompleted: "12/12",
    completion: "100%",
    issues: 0,
    status: "Active",
  },
  {
    name: "Aliyu Muiz",
    role: "Worker-Herder",
    checkIn: "07:00 AM",
    tasksCompleted: "12/12",
    completion: "100%",
    issues: 0,
    status: "Active",
  },
  {
    name: "James Micheal",
    role: "Worker-Herder",
    checkIn: "--------",
    tasksCompleted: "---",
    completion: "0%",
    issues: 0,
    status: "Absent",
  },
  {
    name: "Kaleel Abu",
    role: "Worker-Herder",
    checkIn: "07:00 AM",
    tasksCompleted: "12/12",
    completion: "100%",
    issues: 0,
    status: "Active",
  },
  {
    name: "Abubakar Karl",
    role: "Worker-Herder",
    checkIn: "07:00 AM",
    tasksCompleted: "12/12",
    completion: "100%",
    issues: 0,
    status: "Active",
  },
];

// ── Badges ────────────────────────────────────────────────────────────────────

function StaffStatusBadge({ status }) {
  const styles = {
    Active: "text-[#4CAF50]",
    Suspended: "text-orange-500",
    Absent: "text-red-500",
  };
  const icons = { Active: "🟢", Suspended: "🔒", Absent: "🔴" };

  return (
    <span
      className={`flex items-center gap-1 text-xs font-semibold ${styles[status] ?? "text-gray-500"}`}
    >
      <span className="text-[11px]">{icons[status]}</span> {status}
    </span>
  );
}

// ── All Staffs Table ──────────────────────────────────────────────────────────

function StaffListTable({ rows, onEdit, onSuspend, onReinstate }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {[
                "Name",
                "Role",
                "Staff ID",
                "Status",
                "Last Login",
                "Phone/Email",
                "Actions",
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
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-5 font-medium text-gray-800 whitespace-nowrap">
                  {row.name}
                </td>
                <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                  {row.role}
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.staffId}
                </td>
                <td className="py-4 px-5">
                  <StaffStatusBadge status={row.status} />
                </td>
                <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                  {row.lastLogin}
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.contact}
                </td>
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit?.(row)}
                      className="px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 text-[11px] font-medium transition-colors"
                    >
                      Edit
                    </button>
                    {row.status === "Suspended" ? (
                      <button
                        onClick={() => onReinstate?.(row)}
                        className="px-4 py-1.5 rounded-full bg-[#4CAF50] text-white hover:bg-[#43a047] text-[11px] font-medium transition-colors"
                      >
                        Reinstate
                      </button>
                    ) : (
                      <button
                        onClick={() => onSuspend?.(row)}
                        className="px-4 py-1.5 rounded-full bg-orange-500 text-white hover:bg-orange-600 text-[11px] font-medium transition-colors"
                      >
                        Suspend
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Daily Work Log Table ──────────────────────────────────────────────────────

function WorkLogTable({ rows, onView }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {[
                "Name",
                "Role",
                "Check-In Today",
                "Tasks Completed",
                "Completion %",
                "Issues Logged",
                "Status",
                "Actions",
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
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-5 font-medium text-gray-800 whitespace-nowrap">
                  {row.name}
                </td>
                <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                  {row.role}
                </td>
                <td
                  className={`py-4 px-5 whitespace-nowrap ${row.status === "Absent" ? "text-gray-300" : "text-gray-600"}`}
                >
                  {row.checkIn}
                </td>
                <td
                  className={`py-4 px-5 whitespace-nowrap ${row.status === "Absent" ? "text-gray-300" : "text-gray-600"}`}
                >
                  {row.tasksCompleted}
                </td>
                <td className="py-4 px-5 whitespace-nowrap">
                  <span
                    className={`font-semibold ${row.completion === "0%" ? "text-red-400" : "text-gray-700"}`}
                  >
                    {row.completion}
                  </span>
                </td>
                <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                  {row.issues}
                </td>
                <td className="py-4 px-5">
                  <StaffStatusBadge status={row.status} />
                </td>
                <td className="py-4 px-5">
                  <button
                    onClick={() => onView?.(row)}
                    className="px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 text-[11px] font-medium transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function StaffManagementPage() {
  const [activeTab, setActiveTab] = useState("staff");

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Tab bar + action row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
          <button
            onClick={() => setActiveTab("staff")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "staff"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            All Staffs List
          </button>
          <button
            onClick={() => setActiveTab("worklog")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "worklog"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Daily Work Log
          </button>
        </div>

        {activeTab === "staff" && (
          <button className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors">
            <UserPlus size={13} />
            Invite New Staff
          </button>
        )}
      </div>

      {/* Content */}
      {activeTab === "staff" ? (
        <StaffListTable
          rows={staffList}
          onEdit={(row) => console.log("Edit", row)}
          onSuspend={(row) => console.log("Suspend", row)}
          onReinstate={(row) => console.log("Reinstate", row)}
        />
      ) : (
        <WorkLogTable
          rows={workLogs}
          onView={(row) => console.log("View", row)}
        />
      )}
    </main>
  );
}
