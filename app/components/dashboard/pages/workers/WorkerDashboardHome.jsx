"use client";

import { useState } from "react";
import { X, Scan, Plus } from "lucide-react";
import Image from "next/image";

// ── Placeholder data ──────────────────────────────────────────────────────────

const initialTasks = [
  {
    id: "#TN210",
    title: "Feed Herd A With 20 Kg Soybeans",
    deadline: "8:30 AM, 20 Sept",
    assignedBy: "Manager Aminu",
    done: false,
  },
  {
    id: "#TN210",
    title: "Clean and Wash Lot 3",
    deadline: "8:30 AM, 20 Sept",
    assignedBy: "Manager Aminu",
    done: false,
  },
  {
    id: "#TN210",
    title: "Tag The 3 New Calves In Lot 3",
    deadline: "8:30 AM, 20 Sept",
    assignedBy: "Manager Aminu",
    done: false,
  },
  {
    id: "#TN210",
    title: "Feed Herd B With 20 Kg Soybeans",
    deadline: "8:30 AM, 20 Sept",
    assignedBy: "Manager Aminu",
    done: false,
  },
];

// ── Mark As Done Modal ────────────────────────────────────────────────────────

function MarkAsDoneModal({ task, onClose, onSubmit }) {
  const [proofMode, setProofMode] = useState("Scan Tag");
  const [form, setForm] = useState({
    timeCompleted: "7:15 AM",
    feedUsed: "120 Kg",
    notes: "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40">
      <div className="bg-white rounded-t-3xl p-5 space-y-4 max-h-[90%] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-gray-800">
            Complete Task – {task.id}
          </p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Time Completed */}
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-1.5">
            Time Completed
          </p>
          <input
            value={form.timeCompleted}
            onChange={set("timeCompleted")}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#4CAF50]"
          />
        </div>

        {/* Feed Used */}
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-1.5">
            Feed Used
          </p>
          <input
            value={form.feedUsed}
            onChange={set("feedUsed")}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#4CAF50]"
          />
        </div>

        {/* Completion Proof toggle */}
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-2">
            Completion Proof
          </p>
          <div className="flex rounded-full border border-gray-200 overflow-hidden w-fit mb-3">
            {["Scan Tag", "Take Photo"].map((opt) => (
              <button
                key={opt}
                onClick={() => setProofMode(opt)}
                className={`px-4 py-1.5 text-xs font-semibold transition-all ${
                  proofMode === opt
                    ? "bg-[#4CAF50] text-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {proofMode === "Scan Tag" ? (
            <button className="w-full border-2 border-dashed border-gray-300 rounded-xl py-5 flex flex-col items-center gap-1 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] transition-colors bg-gray-50">
              <Scan size={22} />
              <span className="text-xs font-medium">Scan Livestock Tag</span>
            </button>
          ) : (
            <button className="w-full border-2 border-dashed border-gray-300 rounded-xl py-5 flex flex-col items-center gap-1 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] transition-colors bg-gray-50">
              <span className="text-2xl">📷</span>
              <span className="text-xs font-medium">Take or Upload Photo</span>
            </button>
          )}
        </div>

        {/* Notes */}
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-1.5">
            Notes (Optional)
          </p>
          <textarea
            value={form.notes}
            onChange={set("notes")}
            rows={3}
            placeholder="Additional notes...."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => onSubmit(form)}
            className="flex-1 py-3.5 rounded-2xl bg-[#4CAF50] hover:bg-[#43a047] text-white font-semibold text-sm transition-colors"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-2xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Task ID footer */}
        <p className="text-center text-[10px] text-gray-400">
          Task ID: {task.id}
        </p>
      </div>
    </div>
  );
}

// ── Dashboard Homepage ────────────────────────────────────────────────────────

export default function WorkerDashboardHome({ greeting, onNavigate }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);

  const stats = [
    { label: "Completed Tasks", value: 15, icon: "/images/task-frame-1.png" },
    {
      label: "Pending Tasks",
      value: tasks.filter((t) => !t.done).length,
      icon: "/images/task-frame-2.png",
    },
    { label: "In Review", value: 3, icon: "/images/task-frame-3.png" },
    { label: "Cancelled Tasks", value: 15, icon: "/images/task-frame-4.png" },
  ];

  const handleSubmit = (form) => {
    setTasks((prev) =>
      prev.map((t) => (t === selectedTask ? { ...t, done: true } : t)),
    );
    setSelectedTask(null);
  };

  const pendingTasks = tasks.filter((t) => !t.done);

  return (
    <div className="relative flex flex-col min-h-full">
      <div className="px-4 pb-24 space-y-4">
        {/* Greeting */}
        <h1 className="text-lg font-bold text-gray-800 mt-1">{greeting}</h1>

        {/* Stat cards 2x2 */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map(({ label, value, icon }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
            >
              <p className="text-xs text-gray-400 mb-1">{label}</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-800">{value}</p>
                <Image src={icon} alt={label} width={50} height={50} />
              </div>
            </div>
          ))}
        </div>

        {/* Pending Tasks */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-800">Pending Tasks</p>
            <button
              onClick={() => onNavigate?.("history")}
              className="text-xs text-[#4CAF50] font-medium hover:underline"
            >
              See All
            </button>
          </div>

          {pendingTasks.length === 0 && (
            <div className="bg-white rounded-2xl p-6 text-center text-gray-400 text-sm border border-gray-100">
              🎉 All tasks completed!
            </div>
          )}

          <div className="space-y-3">
            {pendingTasks.map((task, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 leading-snug mb-1">
                      {task.title}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Task ID: {task.id}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Assigned By: {task.assignedBy}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <p className="text-[10px] text-gray-400 whitespace-nowrap">
                      Deadline: {task.deadline}
                    </p>
                    <button
                      onClick={() => setSelectedTask(task)}
                      className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors whitespace-nowrap"
                    >
                      ✓ Mark As Done
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report New Issue FAB */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => onNavigate?.("livestock")}
          className="flex items-center gap-2 bg-[#4CAF50] hover:bg-[#43a047] text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg transition-colors"
        >
          <Plus size={16} /> Report New Issue
        </button>
      </div>

      {/* Mark As Done Modal */}
      {selectedTask && (
        <MarkAsDoneModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
