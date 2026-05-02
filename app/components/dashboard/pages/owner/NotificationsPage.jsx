"use client";

// ── Placeholder data ──────────────────────────────────────────────────────────

const notifications = [
  {
    category: "Inventory",
    icon: "📦",
    iconBg: "bg-amber-50",
    message: "Feed stock low alert – only 1,200 kg maize feed left.",
    reporter: "Reported by: Storekeeper (Abdul)",
    time: "29 Aug 2025 | 2:00 PM",
    action: { label: "View Stock Report", type: "primary" },
  },
  {
    category: "Health",
    icon: "❤️",
    iconBg: "bg-red-50",
    message: "Cow #1123 flagged sick – fever & cough symptoms.",
    reporter: "Reported by: Veterinarian (Dr. Musa)",
    time: "29 Aug 2025 | 2:00 PM",
    action: { label: "View Animal Record", type: "primary" },
  },
  {
    category: "Finance",
    icon: "✅",
    iconBg: "bg-green-50",
    message: "Request for ₦250,000 medicine restock.",
    reporter: "Requested by: Manager (Amin)",
    time: "29 Aug 2025 | 2:00 PM",
    action: { label: "Approved", type: "approved" },
  },
  {
    category: "Task",
    icon: "📋",
    iconBg: "bg-gray-100",
    message: "Fence repair in North Section completed.",
    reporter: "Logged by: Manager (Amin)",
    time: "29 Aug 2025 | 2:00 PM",
    action: { label: "Mark As Read", type: "outline" },
  },
  {
    category: "Health",
    icon: "❤️",
    iconBg: "bg-red-50",
    message: "Vaccination program completed – Herd A & B (320 cows).",
    reporter: "Reported by: Veterinarian (Dr. Musa)",
    time: "29 Aug 2025 | 2:00 PM",
    action: { label: "View Animal Record", type: "primary" },
  },
  {
    category: "Finance",
    icon: "✅",
    iconBg: "bg-green-50",
    message: "Feed stock low alert – only 1,200 kg maize feed left.",
    reporter: "Reported by: Storekeeper (Abdul)",
    time: "29 Aug 2025 | 2:00 PM",
    action: { label: "View Stock Report", type: "primary" },
  },
  {
    category: "Task",
    icon: "📋",
    iconBg: "bg-gray-100",
    message: "Fence repair in West Section completed.",
    reporter: "Logged by: Manager (Amin)",
    time: "29 Aug 2025 | 2:00 PM",
    action: { label: "View Stock Report", type: "primary" },
  },
];

// ── Action Button ─────────────────────────────────────────────────────────────

function ActionButton({ action, onClick }) {
  if (action.type === "approved") {
    return (
      <span className="flex items-center gap-1 text-xs font-semibold text-[#4CAF50]">
        ✅ Approved
      </span>
    );
  }
  if (action.type === "outline") {
    return (
      <button
        onClick={onClick}
        className="px-4 py-1.5 rounded-full border border-[#4CAF50] text-[#4CAF50] hover:bg-green-50 text-xs font-semibold transition-colors whitespace-nowrap"
      >
        {action.label}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="px-4 py-1.5 rounded-full bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors whitespace-nowrap"
    >
      {action.label}
    </button>
  );
}

// ── Notification Row ──────────────────────────────────────────────────────────

function NotificationRow({ notification, onAction }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
      <div className="flex items-start justify-between gap-4">
        {/* Left — icon + category + message */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`w-7 h-7 rounded-lg ${notification.iconBg} flex items-center justify-center text-sm shrink-0`}
            >
              {notification.icon}
            </span>
            <span className="text-xs font-semibold text-gray-500 border border-gray-200 rounded-full px-2.5 py-0.5">
              {notification.category}
            </span>
            <p className="text-sm font-semibold text-gray-800 truncate">
              {notification.message}
            </p>
          </div>
          <p className="text-xs text-gray-400 ml-9">{notification.reporter}</p>
        </div>

        {/* Right — time + action */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="text-[11px] text-gray-400 whitespace-nowrap">
            {notification.time}
          </span>
          <ActionButton
            action={notification.action}
            onClick={() => onAction?.(notification)}
          />
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
      <h1 className="text-base font-bold text-gray-800 mb-4">Notifications</h1>

      {notifications.map((n, i) => (
        <NotificationRow
          key={i}
          notification={n}
          onAction={(n) => console.log("Action:", n)}
        />
      ))}
    </main>
  );
}
