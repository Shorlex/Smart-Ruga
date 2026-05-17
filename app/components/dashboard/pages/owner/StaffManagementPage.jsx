"use client";

import { useState, useEffect, useCallback } from "react";
import { UserPlus } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

function getSlug() {
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
  return localStorage.getItem("sr_token") ?? "";
}
function getRole() {
  return localStorage.getItem("sr_role") ?? "";
}

function formatDate(str) {
  if (!str) return "—";
  return (
    new Date(str).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    " · " +
    new Date(str).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

function actorName(actor) {
  if (!actor) return "System";
  const name = [actor.firstName, actor.lastName].filter(Boolean).join(" ");
  return name || actor.email || "Unknown";
}

// ── Status Badge ──────────────────────────────────────────────────────────────

function StaffStatusBadge({ status }) {
  const s = (status ?? "").toLowerCase();
  const styles = {
    active: "text-[#4CAF50]",
    inactive: "text-orange-500",
    suspended: "text-orange-500",
    pending: "text-amber-500",
  };
  const icons = {
    active: "🟢",
    inactive: "🔒",
    suspended: "🔒",
    pending: "🟡",
  };
  return (
    <span
      className={`flex items-center gap-1 text-xs font-semibold ${styles[s] ?? "text-gray-500"}`}
    >
      <span className="text-[11px]">{icons[s] ?? "⚪"}</span>
      <span className="capitalize">{status ?? "—"}</span>
    </span>
  );
}

// ── Members Table ─────────────────────────────────────────────────────────────

function StaffListTable({ rows, loading, error, onRoleChange, onDelete }) {
  const userRole = getRole();
  const isManager = userRole === "manager";

  if (loading)
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-4 animate-pulse">
            <div className="h-3 bg-gray-100 rounded flex-1" />
            <div className="h-3 bg-gray-100 rounded w-24" />
            <div className="h-3 bg-gray-100 rounded w-16" />
          </div>
        ))}
      </div>
    );

  if (error)
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );

  if (rows.length === 0)
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
        <p className="text-sm text-gray-400">No staff members found.</p>
      </div>
    );

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {["Name", "Role", "Email", "Status", "Joined", "Actions"].map(
                (col) => (
                  <th
                    key={col}
                    className="text-left py-3 px-5 text-gray-500 font-medium whitespace-nowrap"
                  >
                    {col}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const firstName = row.user?.firstName ?? row.firstName ?? "";
              const lastName = row.user?.lastName ?? row.lastName ?? "";
              const fullName =
                [firstName, lastName].filter(Boolean).join(" ") || "—";
              const email = row.user?.email ?? row.email ?? "—";
              const role = row.role ?? row.ranchRole ?? "—";
              const status = row.status ?? row.user?.status ?? "—";
              const joined =
                row.createdAt ??
                row.joinedAt ??
                row.created_at ??
                row.joined_at ??
                row.user?.createdAt ??
                row.user?.created_at;

              return (
                <tr
                  key={row.id ?? i}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-5 font-medium text-gray-800 whitespace-nowrap">
                    {fullName}
                  </td>
                  <td className="py-4 px-5 text-gray-500 whitespace-nowrap capitalize">
                    {role}
                  </td>
                  <td className="py-4 px-5 text-gray-600 whitespace-nowrap">
                    {email}
                  </td>
                  <td className="py-4 px-5">
                    <StaffStatusBadge status={status} />
                  </td>
                  <td className="py-4 px-5 text-gray-400 whitespace-nowrap">
                    {formatDate(joined)}
                  </td>
                  <td className="py-4 px-5">
                    {isManager ? (
                      <div className="flex items-center gap-2">
                        <select
                          defaultValue={role}
                          onChange={(e) => onRoleChange?.(row, e.target.value)}
                          className="border border-gray-200 rounded-lg px-2 py-1 text-[11px] text-gray-600 focus:outline-none focus:border-[#4CAF50] bg-white appearance-none"
                        >
                          {[
                            "owner",
                            "manager",
                            "vet",
                            "storekeeper",
                            "worker",
                          ].map((r) => (
                            <option key={r} value={r} className="capitalize">
                              {r}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => onDelete?.(row)}
                          className="px-3 py-1.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100 text-[11px] font-medium transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-gray-400 italic">
                        View only
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Ranch Activity Log ────────────────────────────────────────────────────────

const EVENT_COLORS = {
  animal_update: {
    dot: "bg-[#4CAF50]",
    ring: "border-[#4CAF50]",
    bg: "bg-[#f0fdf4]",
  },
  animal_created: {
    dot: "bg-blue-500",
    ring: "border-blue-500",
    bg: "bg-blue-50",
  },
  member_added: {
    dot: "bg-purple-500",
    ring: "border-purple-500",
    bg: "bg-purple-50",
  },
  default: { dot: "bg-gray-400", ring: "border-gray-300", bg: "bg-gray-50" },
};

function ActivityLog({ events, loading, error }) {
  if (loading)
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 animate-pulse">
            <div className="w-7 h-7 rounded-full bg-gray-100 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-2.5 bg-gray-100 rounded w-1/3" />
              <div className="h-2 bg-gray-100 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );

  if (error)
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );

  if (events.length === 0)
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
        <p className="text-sm text-gray-400">No ranch activity recorded yet.</p>
      </div>
    );

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-100" />
        <div className="space-y-5">
          {events.map((event, i) => {
            const colors =
              EVENT_COLORS[event.eventType] ?? EVENT_COLORS.default;
            return (
              <div key={event.id ?? i} className="flex gap-4 relative">
                <div
                  className={`w-7 h-7 rounded-full ${colors.bg} border-2 ${colors.ring} flex items-center justify-center shrink-0 z-10`}
                >
                  <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                </div>
                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-700 capitalize">
                      {event.eventType?.replace(/_/g, " ") ?? "Event"}
                    </span>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">
                      {formatDate(event.createdAt)}
                    </span>
                  </div>
                  {event.animal?.tagNumber && (
                    <p className="text-[11px] text-gray-500 mb-1">
                      Animal:{" "}
                      <span className="font-medium text-gray-700">
                        {event.animal.tagNumber}
                      </span>
                    </p>
                  )}
                  {event.field && (
                    <p className="text-xs text-gray-500 mb-1">
                      <span className="font-medium text-gray-700 capitalize">
                        {event.field}
                      </span>
                      {" changed from "}
                      <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-500 font-medium text-[10px]">
                        {event.fromValue ?? "—"}
                      </span>
                      {" → "}
                      <span className="px-1.5 py-0.5 rounded bg-[#f0fdf4] text-[#4CAF50] font-medium text-[10px]">
                        {event.toValue ?? "—"}
                      </span>
                    </p>
                  )}
                  {event.notes && (
                    <p className="text-[11px] text-gray-400 italic mb-1">
                      "{event.notes}"
                    </p>
                  )}
                  <p className="text-[10px] text-gray-400">
                    By{" "}
                    <span className="font-medium text-gray-600">
                      {actorName(event.actor)}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function StaffManagementPage() {
  const [activeTab, setActiveTab] = useState("staff");
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(true);
  const [membersError, setMembersError] = useState("");
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState("");

  const fetchMembers = useCallback(async () => {
    setMembersLoading(true);
    setMembersError("");
    try {
      const res = await fetch(`${API}/ranches/${getSlug()}/members`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Failed to fetch members");
      const json = await res.json();
      console.log("✅ Members response:", json);
      const list =
        json?.data?.data?.members ??
        json?.data?.members ??
        json?.members ??
        (Array.isArray(json?.data) ? json.data : []);
      setMembers(list);
    } catch (err) {
      setMembersError(err.message);
    } finally {
      setMembersLoading(false);
    }
  }, []);

  const fetchActivity = useCallback(async () => {
    setEventsLoading(true);
    setEventsError("");
    try {
      const res = await fetch(`${API}/ranches/${getSlug()}/activity`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Failed to fetch activity");
      const json = await res.json();
      console.log("✅ Activity response:", json);
      const list =
        json?.data?.events ??
        json?.events ??
        (Array.isArray(json?.data) ? json.data : []);
      setEvents(list);
    } catch (err) {
      setEventsError(err.message);
    } finally {
      setEventsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);
  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  const handleRoleChange = async (member, newRole) => {
    try {
      const res = await fetch(
        `${API}/ranches/${getSlug()}/members/${member.id}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ role: newRole }),
        },
      );
      if (!res.ok) throw new Error("Failed to update role");
      setMembers((prev) =>
        prev.map((m) => (m.id === member.id ? { ...m, role: newRole } : m)),
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (member) => {
    const name =
      [member.user?.firstName, member.user?.lastName]
        .filter(Boolean)
        .join(" ") || "this member";
    if (!confirm(`Remove ${name} from the ranch?`)) return;
    try {
      const res = await fetch(
        `${API}/ranches/${getSlug()}/members/${member.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      );
      if (!res.ok) throw new Error("Failed to remove member");
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
          {["staff", "worklog"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === tab
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab === "staff" ? "All Staffs List" : "Daily Work Log"}
            </button>
          ))}
        </div>
        {getRole() === "manager" && activeTab === "staff" && (
          <button className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors">
            <UserPlus size={13} /> Invite New Staff
          </button>
        )}
      </div>

      {activeTab === "staff" ? (
        <>
          {!membersLoading && !membersError && (
            <p className="text-xs text-gray-400">
              {members.length} member{members.length !== 1 ? "s" : ""}
            </p>
          )}
          <StaffListTable
            rows={members}
            loading={membersLoading}
            error={membersError}
            onRoleChange={handleRoleChange}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <ActivityLog
          events={events}
          loading={eventsLoading}
          error={eventsError}
        />
      )}
    </main>
  );
}
