"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";

const completedTasks = [
  {
    title: "Feeding Task #021- Herd A",
    feedIssued: "120kg Maize",
    timeCompleted: "8:25 AM",
    status: "Verified by Manager",
    proof: true,
  },
  {
    title: "Feeding Task #021- Herd A",
    feedIssued: "120kg Maize",
    timeCompleted: "8:25 AM",
    status: "Verified by Manager",
    proof: true,
  },
  {
    title: "Feeding Task #021- Herd A",
    feedIssued: "120kg Maize",
    timeCompleted: "8:25 AM",
    status: "Verified by Manager",
    proof: true,
  },
  {
    title: "Feeding Task #021- Herd A",
    feedIssued: "120kg Maize",
    timeCompleted: "8:25 AM",
    status: "Verified by Manager",
    proof: true,
  },
  {
    title: "Cleaning Task #018- Lot 3",
    feedIssued: "—",
    timeCompleted: "9:10 AM",
    status: "Verified by Manager",
    proof: false,
  },
];

export default function WorkerTask() {
  return (
    <div className="px-4 pb-8 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-base font-bold text-gray-800">Completed Work Log</p>
        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
          This Month <ChevronDown size={12} />
        </button>
      </div>

      {/* Task cards */}
      <div className="space-y-4">
        {completedTasks.map((task, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3"
          >
            {/* Title row */}
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-gray-800">
                {task.title}
              </p>
              <span className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                Feed Issued: {task.feedIssued}
              </span>
            </div>

            {/* Meta row */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">
                Time Completed: {task.timeCompleted}
              </p>
              <span className="flex items-center gap-1 text-xs font-semibold text-[#4CAF50] bg-[#f0fdf4] px-2.5 py-1 rounded-full">
                ✅ {task.status}
              </span>
            </div>

            {/* Proof of work */}
            <div>
              <p className="text-xs text-gray-400 mb-2">Proof of Work:</p>
              {task.proof ? (
                <div className="w-24 h-16 rounded-xl overflow-hidden bg-amber-100 relative">
                  <Image src={"/images/proof-of-work.png"} alt={task.proof} fill />
                </div>
              ) : (
                <div className="w-24 h-16 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-xs">
                  No proof
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
