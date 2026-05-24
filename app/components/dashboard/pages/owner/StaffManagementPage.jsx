"use client";

import { useState, useEffect, useCallback } from "react";
import { UserPlus, X, Loader2, Copy, Check } from "lucide-react";

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

// ── Invite Modal ──────────────────────────────────────────────────────────────

const ROLES = ["manager", "vet", "storekeeper", "worker"];

function InviteModal({ onClose }) {
  const [form, setForm] = useState({ email: "", ranchRole: "worker" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isValid = form.email && form.ranchRole;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/ranches/${getSlug()}/invites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ email: form.email, ranchRole: form.ranchRole }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? "Failed to send invite");
      }
      const json = await res.json();
      const acceptUrl = json?.data?.acceptUrl ?? "";
      // Extract token from acceptUrl query param
      const urlToken = new URL(acceptUrl).searchParams.get("token") ?? "";
      const slug = getSlug();
      const base = typeof window !== "undefined" ? window.location.origin : "";
      const link = `${base}/join?token=${urlToken}&slug=${slug}&role=${form.ranchRole}&email=${encodeURIComponent(form.email)}`;
      setInviteLink(link);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Invite New Staff</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-500">
              {error}
            </div>
          )}

          {inviteLink ? (
            <div className="space-y-4">
              <div className="bg-[#f0fdf4] border border-[#d1fae5] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#4CAF50] mb-2">
                  ✅ Invite created! Share this link:
                </p>
                <p className="text-[11px] text-gray-600 break-all font-mono bg-white rounded-lg p-2 border border-gray-200">
                  {inviteLink}
                </p>
              </div>
              <button
                onClick={copyLink}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold transition-colors ${
                  copied
                    ? "bg-[#f0fdf4] text-[#4CAF50] border border-[#4CAF50]"
                    : "bg-[#4CAF50] hover:bg-[#43a047] text-white"
                }`}
              >
                {copied ? (
                  <>
                    <Check size={13} /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={13} /> Copy Invite Link
                  </>
                )}
              </button>
              <p className="text-[11px] text-gray-400 text-center">
                An invite email has also been sent to {form.email}
              </p>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="staff@example.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Assign Role <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.ranchRole}
                  onChange={set("ranchRole")}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors appearance-none"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r} className="capitalize">
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isValid || loading}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors ${
                    isValid && !loading
                      ? "bg-[#4CAF50] hover:bg-[#43a047]"
                      : "bg-[#a5d6a7] cursor-not-allowed"
                  }`}
                >
                  {loading && <Loader2 size={12} className="animate-spin" />}
                  {loading ? "Sending..." : "Send Invite"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
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
  const isManager = getRole() === "manager";

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
              {["Name", "Role", "Email", "Status", "Actions"].map(
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
              const role = row.ranchRole ?? row.role ?? "—";
              const status = row.status ?? row.user?.status ?? "—";
              const joined =
                row.createdAt ?? row.joinedAt ?? row.user?.createdAt;
              return (
                <tr
                  key={row.memberId ?? i}
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
                  {/* <td className="py-4 px-5 text-gray-400 whitespace-nowrap">
                    {formatDate(joined)}
                  </td> */}
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

// ── Invites Table ─────────────────────────────────────────────────────────────

function InvitesTable({ invites, loading, onDelete, onResend }) {
  const [resending, setResending] = useState(null);

  const handleResend = async (invite) => {
    setResending(invite.publicId); // ← publicId
    await onResend(invite);
    setResending(null);
  };

  if (loading)
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 animate-pulse">
            <div className="h-3 bg-gray-100 rounded flex-1" />
            <div className="h-3 bg-gray-100 rounded w-24" />
            <div className="h-3 bg-gray-100 rounded w-20" />
          </div>
        ))}
      </div>
    );

  const pendingInvites = invites.filter((invite) => !invite.usedAt);

  if (pendingInvites.length === 0)
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
        <p className="text-sm text-gray-400">No pending invites.</p>
      </div>
    );

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {["Email", "Role", "Expires At", "Status", "Actions"].map(
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
            {pendingInvites.map((invite, i) => {
              const isUsed = !!invite.usedAt;
              const isExpired =
                !isUsed && new Date(invite.expiresAt) < new Date();
              const status = isUsed
                ? "accepted"
                : isExpired
                  ? "expired"
                  : "pending";
              const statusCls = {
                accepted: "bg-[#f0fdf4] text-[#4CAF50]",
                expired: "bg-red-50 text-red-500",
                pending: "bg-amber-50 text-amber-500",
              }[status];

              return (
                <tr
                  key={invite.publicId ?? i}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-5 font-medium text-gray-700">
                    {invite.email}
                  </td>
                  <td className="py-4 px-5 text-gray-500 capitalize">
                    {invite.role}
                  </td>
                  <td className="py-4 px-5 text-gray-400 whitespace-nowrap">
                    {formatDate(invite.expiresAt)}
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${statusCls}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    {!isUsed && (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleResend(invite)}
                          disabled={resending === invite.publicId} // ← publicId
                          className="text-[#4CAF50] hover:text-[#43a047] font-semibold text-xs flex items-center gap-1 transition-colors disabled:opacity-50"
                        >
                          {resending === invite.publicId ? ( // ← publicId
                            <Loader2 size={11} className="animate-spin" />
                          ) : null}
                          Resend
                        </button>
                        <button
                          onClick={() => onDelete(invite)}
                          className="text-red-400 hover:text-red-600 font-semibold text-xs transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    {isUsed && <span className="text-gray-300 text-xs">—</span>}
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function StaffManagementPage() {
  const [activeTab, setActiveTab] = useState("staff");
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(true);
  const [membersError, setMembersError] = useState("");
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState("");
  const [invites, setInvites] = useState([]);
  const [invitesLoading, setInvitesLoading] = useState(true);
  const [showInvite, setShowInvite] = useState(false);

  const fetchMembers = useCallback(async () => {
    setMembersLoading(true);
    setMembersError("");
    try {
      const res = await fetch(`${API}/ranches/${getSlug()}/members`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Failed to fetch members");
      const json = await res.json();
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

  const fetchInvites = useCallback(async () => {
    setInvitesLoading(true);
    try {
      const res = await fetch(`${API}/ranches/${getSlug()}/invites`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setInvites(json?.data?.invites ?? json?.invites ?? []);
    } catch {
      setInvites([]);
    } finally {
      setInvitesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);
  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);
  useEffect(() => {
    fetchInvites();
  }, [fetchInvites]);

  const handleRoleChange = async (member, newRole) => {
    try {
      const res = await fetch(
        `${API}/ranches/${getSlug()}/members/${member.memberId}/role`,
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
        prev.map((m) =>
          m.memberId === member.memberId ? { ...m, ranchRole: newRole } : m,
        ),
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
        `${API}/ranches/${getSlug()}/members/${member.memberId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      );
      if (!res.ok) throw new Error("Failed to remove member");
      setMembers((prev) => prev.filter((m) => m.memberId !== member.memberId));
    } catch (err) {
      alert(err.message);
    }
  };

  // Uses publicId — the actual field name returned by the API
  const handleDeleteInvite = async (invite) => {
    if (!confirm(`Cancel invite for ${invite.email}?`)) return;
    try {
      const res = await fetch(
        `${API}/ranches/${getSlug()}/invites/${invite.publicId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      );
      if (!res.ok) throw new Error("Failed to cancel invite");
      fetchInvites(); // refetch from server instead of local filter
    } catch (err) {
      alert(err.message);
    }
  };

  const handleResendInvite = async (invite) => {
    try {
      const res = await fetch(
        `${API}/ranches/${getSlug()}/invites/${invite.publicId}/resend`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      );
      if (!res.ok) throw new Error();
      alert(`Invite resent to ${invite.email}`);
    } catch {
      alert("Failed to resend invite");
    }
  };

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
          {[
            { key: "staff", label: "All Staff" },
            { key: "invites", label: "Invites" },
            { key: "worklog", label: "Work Log" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === key
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {label}
              {key === "invites" &&
                invites.filter((i) => !i.usedAt).length > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-600">
                    {invites.filter((i) => !i.usedAt).length}
                  </span>
                )}
            </button>
          ))}
        </div>

        {(activeTab === "staff" || activeTab === "invites") && (
          <button
            onClick={() => setShowInvite(true)}
            className="flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <UserPlus size={13} /> Invite New Staff
          </button>
        )}
      </div>

      {activeTab === "staff" && (
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
      )}

      {activeTab === "invites" && (
        <InvitesTable
          invites={invites}
          loading={invitesLoading}
          onDelete={handleDeleteInvite}
          onResend={handleResendInvite}
        />
      )}

      {activeTab === "worklog" && (
        <ActivityLog
          events={events}
          loading={eventsLoading}
          error={eventsError}
        />
      )}

      {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    </main>
  );
}
