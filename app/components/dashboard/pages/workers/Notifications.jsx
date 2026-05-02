"use client";

const notifications = [
  {
    title: "Your Task Has Been Verified!",
    info: "Task Info ~ Feeding herd A",
    time: "12:30 PM",
    date: "22-09-2024",
  },
  {
    title: "Your Task Has Been Verified!",
    info: "Task Info ~ Feeding herd A",
    time: "12:30 PM",
    date: "22-09-2024",
  },
  {
    title: "Your Task Has Been Verified!",
    info: "Task Info ~ Feeding herd A",
    time: "12:30 PM",
    date: "22-09-2024",
  },
  {
    title: "Your Task Has Been Verified!",
    info: "Task Info ~ Feeding herd A",
    time: "12:30 PM",
    date: "22-09-2024",
  },
  {
    title: "Your Task Has Been Verified!",
    info: "Task Info ~ Feeding herd A",
    time: "12:30 PM",
    date: "22-09-2024",
  },
  {
    title: "Your Task Has Been Verified!",
    info: "Task Info ~ Feeding herd A",
    time: "12:30 PM",
    date: "22-09-2024",
  },
];

export default function Notifications() {
  return (
    <div className="px-4 pb-8 space-y-2">
      <p className="text-base font-bold text-gray-800 mb-4">Notifications</p>
      {notifications.map((n, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3"
        >
          {/* Icon */}
          <div className="w-9 h-9 rounded-full bg-[#f0fdf4] border border-[#d1fae5] flex items-center justify-center shrink-0">
            <span className="text-sm">✅</span>
          </div>
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {n.title}
            </p>
            <p className="text-xs text-gray-400 truncate">{n.info}</p>
          </div>
          {/* Time + date */}
          <div className="text-right shrink-0">
            <p className="text-xs font-medium text-gray-600">{n.time}</p>
            <p className="text-[10px] text-gray-400">{n.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
