"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  RefreshCw,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getToken() {
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

const PLATFORM_ROLES = ["user", "admin", "super_admin"];

const ROLE_STYLES = {
  super_admin: "bg-purple-50 text-purple-600",
  admin: "bg-blue-50   text-blue-600",
  user: "bg-gray-100  text-gray-500",
};

const RANCH_ROLE_STYLES = {
  owner: "bg-[#f0fdf4] text-[#4CAF50]",
  manager: "bg-blue-50   text-blue-500",
  vet: "bg-purple-50 text-purple-500",
  storekeeper: "bg-amber-50  text-amber-500",
  worker: "bg-gray-100  text-gray-500",
};

// ── User Detail Panel ─────────────────────────────────────────────────────────

function UserDetailPanel({ user, onClose, onUpdate }) {
  const [newRole, setNewRole] = useState(user.platformRole ?? "user");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || "—";
  const memberships = user.memberships ?? [];

  const handleRoleUpdate = async () => {
    if (newRole === user.platformRole) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${API}/admin/users/${user.id}/platform-role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ platformRole: newRole }),
      });
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.message ?? "Failed");
      }
      setSaved("Role updated successfully");
      onUpdate({ ...user, platformRole: newRole });
      setTimeout(() => setSaved(""), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivate = async () => {
    if (!confirm(`Deactivate ${fullName}?`)) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${API}/admin/users/${user.id}/deactivate`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.message ?? "Failed");
      }
      setSaved("User deactivated");
      onUpdate({ ...user, isActive: false });
      setTimeout(() => setSaved(""), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Permanently delete ${fullName}? This cannot be undone.`))
      return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${API}/admin/users/${user.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const json = await res.json();
      console.log("🗑️ Delete user response:", JSON.stringify(json, null, 2));
      if (!res.ok) {
        throw new Error(json.message ?? "Failed");
      }
      onUpdate(null);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full z-50 w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0f172a] flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {`${(user.firstName ?? "")[0] ?? ""}${(user.lastName ?? "")[0] ?? ""}`.toUpperCase() ||
                  "?"}
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{fullName}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 text-xs text-red-500">
              {error}
            </div>
          )}
          {saved && (
            <div className="px-4 py-3 rounded-xl bg-[#f0fdf4] text-xs text-[#4CAF50] font-semibold">
              ✅ {saved}
            </div>
          )}

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Platform Role",
                value: (user.platformRole ?? "—").replace(/_/g, " "),
              },
              { label: "Status", value: user.isActive ? "Active" : "Inactive" },
              { label: "Phone", value: user.phone ?? "—" },
              { label: "Joined", value: formatDate(user.createdAt) },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
                  {label}
                </p>
                <p className="text-xs font-semibold text-gray-700 capitalize">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Memberships */}
          <div>
            <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Ranch Memberships ({memberships.length})
            </p>
            {memberships.length === 0 ? (
              <p className="text-xs text-gray-400 italic">
                No ranch memberships
              </p>
            ) : (
              <div className="space-y-2">
                {memberships.map((m, i) => (
                  <div
                    key={m.memberId ?? i}
                    className="bg-gray-50 rounded-xl p-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold text-gray-800">
                        {m.ranchName}
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono">
                        {m.ranchSlug}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${RANCH_ROLE_STYLES[m.ranchRole] ?? "bg-gray-100 text-gray-500"}`}
                      >
                        {m.ranchRole}
                      </span>
                      <span
                        className={`text-[10px] font-semibold ${m.status === "active" ? "text-[#4CAF50]" : "text-amber-500"}`}
                      >
                        {m.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-gray-100" />

          {/* Change Platform Role */}
          <div>
            <p className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">
              Change Platform Role
            </p>
            <div className="flex gap-2 flex-wrap mb-3">
              {PLATFORM_ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setNewRole(r)}
                  className={`px-3 py-2 rounded-xl border-2 text-xs font-semibold capitalize transition-all ${
                    newRole === r
                      ? "border-[#0f172a] bg-[#0f172a] text-white"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {r.replace(/_/g, " ")}
                </button>
              ))}
            </div>
            <button
              onClick={handleRoleUpdate}
              disabled={saving || newRole === user.platformRole}
              className="w-full py-2.5 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-semibold disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
            >
              {saving && <Loader2 size={12} className="animate-spin" />}
              Update Platform Role
            </button>
          </div>

          <div className="border-t border-gray-100" />

          {/* Danger zone */}
          <div>
            <p className="text-xs font-bold text-red-500 mb-3 uppercase tracking-wide">
              Danger Zone
            </p>
            <div className="space-y-2">
              {user.isActive && (
                <button
                  onClick={handleDeactivate}
                  disabled={saving}
                  className="w-full py-2.5 rounded-xl border-2 border-amber-200 bg-amber-50 text-amber-600 text-xs font-semibold disabled:opacity-40 transition-colors hover:bg-amber-100"
                >
                  Deactivate User
                </button>
              )}
              <button
                onClick={handleDelete}
                disabled={saving}
                className="w-full py-2.5 rounded-xl border-2 border-red-200 bg-red-50 text-red-500 text-xs font-semibold disabled:opacity-40 transition-colors hover:bg-red-100"
              >
                Delete User Permanently
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Users Table ───────────────────────────────────────────────────────────────

function UsersTable({ users, loading, onSelect }) {
  if (loading)
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4 animate-pulse">
            <div className="w-8 h-8 bg-gray-100 rounded-full shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-gray-100 rounded w-1/3" />
              <div className="h-2.5 bg-gray-100 rounded w-1/2" />
            </div>
            <div className="h-3 bg-gray-100 rounded w-20" />
          </div>
        ))}
      </div>
    );

  if (users.length === 0)
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
        <p className="text-sm text-gray-400">No users found</p>
      </div>
    );

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {[
                "User",
                "Email",
                "Platform Role",
                "Ranch(es)",
                "Status",
                "Joined",
                "",
              ].map((col) => (
                <th
                  key={col}
                  className="text-left py-3 px-5 text-gray-400 font-medium whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => {
              const fullName =
                [u.firstName, u.lastName].filter(Boolean).join(" ") || "—";
              const initials =
                `${(u.firstName ?? "")[0] ?? ""}${(u.lastName ?? "")[0] ?? ""}`.toUpperCase() ||
                "?";
              const roleCls =
                ROLE_STYLES[u.platformRole ?? "user"] ??
                "bg-gray-100 text-gray-500";
              const memberships = u.memberships ?? [];
              const primaryRanch = memberships[0];

              return (
                <tr
                  key={u.id ?? i}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onSelect(u)}
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#0f172a] flex items-center justify-center shrink-0">
                        <span className="text-white text-[9px] font-bold">
                          {initials}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-800 whitespace-nowrap">
                        {fullName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                    {u.email}
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize ${roleCls}`}
                    >
                      {(u.platformRole ?? "user").replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    {memberships.length === 0 ? (
                      <span className="text-gray-300 text-[11px]">—</span>
                    ) : (
                      <div>
                        <p className="font-medium text-gray-700 whitespace-nowrap">
                          {primaryRanch?.ranchName}
                        </p>
                        {memberships.length > 1 && (
                          <p className="text-[10px] text-gray-400">
                            +{memberships.length - 1} more
                          </p>
                        )}
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-semibold capitalize ${RANCH_ROLE_STYLES[primaryRanch?.ranchRole] ?? "bg-gray-100 text-gray-500"}`}
                        >
                          {primaryRanch?.ranchRole}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`flex items-center gap-1.5 text-[11px] font-semibold ${u.isActive !== false ? "text-[#4CAF50]" : "text-red-400"}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {u.isActive !== false ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-gray-400 whitespace-nowrap">
                    {formatDate(u.createdAt)}
                  </td>
                  <td className="py-4 px-5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(u);
                      }}
                      className="flex items-center gap-1 text-[#0f172a] font-semibold hover:underline whitespace-nowrap"
                    >
                      View <ArrowRight size={11} />
                    </button>
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

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("owners"); // "owners" | "all"
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [selected, setSelected] = useState(null);

  const fetchUsers = useCallback(
    async (p = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: p, limit: 20 });
        if (search) params.append("search", search);

        const res = await fetch(`${API}/admin/users?${params}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!res.ok) throw new Error();
        const json = await res.json();
        setUsers(json?.data?.users ?? json?.users ?? []);
        const meta =
          json?.data?.pagination ??
          json?.meta?.pagination ??
          json?.pagination ??
          {};
        setPagination({
          total: Number(meta.total) || 0,
          totalPages: Number(meta.totalPages) || 1,
        });
      } catch {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    },
    [search],
  );

  useEffect(() => {
    fetchUsers(page);
  }, [fetchUsers, page]);

  const handleUpdate = (updated) => {
    if (!updated) {
      setUsers((prev) => prev.filter((u) => u.id !== selected?.id));
      setSelected(null);
    } else {
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      setSelected(updated);
    }
  };

  // Filter for owners tab — users who have at least one owner membership
  const owners = users.filter((u) =>
    (u.memberships ?? []).some((m) => m.ranchRole === "owner"),
  );
  const displayed = tab === "owners" ? owners : users;

  return (
    <div className="px-6 py-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-800">Users</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {pagination.total} total · {owners.length} owners
          </p>
        </div>
        <button
          onClick={() => fetchUsers(page)}
          className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Tabs + Search */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
          {[
            { key: "owners", label: "Ranch Owners" },
            { key: "all", label: "All Users" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                tab === key
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {label}
              {key === "owners" && owners.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f0fdf4] text-[#4CAF50]">
                  {owners.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
            fetchUsers(1);
          }}
          className="flex gap-2 flex-1"
        >
          <div className="relative flex-1 min-w-50">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-4 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#0f172a]"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#0f172a] text-white text-xs font-semibold hover:bg-[#1e293b] transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Table */}
      <UsersTable users={displayed} loading={loading} onSelect={setSelected} />

      {/* Pagination — only for all users tab */}
      {tab === "all" && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 disabled:opacity-40 hover:bg-gray-50"
          >
            <ChevronLeft size={13} /> Prev
          </button>
          <p className="text-xs text-gray-500">
            Page <span className="font-bold text-gray-800">{page}</span> of{" "}
            {pagination.totalPages}
          </p>
          <button
            onClick={() =>
              setPage((p) => Math.min(pagination.totalPages, p + 1))
            }
            disabled={page === pagination.totalPages}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 disabled:opacity-40 hover:bg-gray-50"
          >
            Next <ChevronRight size={13} />
          </button>
        </div>
      )}

      {/* Detail Panel */}
      {selected && (
        <UserDetailPanel
          user={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
