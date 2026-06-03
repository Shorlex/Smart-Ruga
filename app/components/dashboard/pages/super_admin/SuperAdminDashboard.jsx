"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Building2,
  Ticket,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import DashboardHome from "./DashboardHome";
import UsersPage from "./UsersPage";
import RanchesPage from "./RanchesPage";
import TicketsPage from "./TicketsPage";
import SettingsPage from "../../shared/Settings";

// ── Nav ───────────────────────────────────────────────────────────────────────

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "users", label: "Users", icon: Users },
  { key: "ranches", label: "Ranches", icon: Building2 },
  { key: "tickets", label: "Platform Tickets", icon: Ticket },
  { key: "settings", label: "Settings", icon: Settings },
];

// ── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({
  active,
  setActive,
  collapsed,
  setCollapsed,
  user,
  onLogout,
}) {
  return (
    <aside
      className={`flex flex-col h-screen bg-[#0f172a] border-r border-white/5 transition-all duration-300 ${collapsed ? "w-16" : "w-60"} shrink-0`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-[#4CAF50] flex items-center justify-center shrink-0">
          <Shield size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-white text-xs font-bold tracking-wider uppercase">
              Smart-Ruga
            </p>
            <p className="text-[10px] text-[#4CAF50] font-semibold">
              Super Admin
            </p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-white/30 hover:text-white/70 transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <Menu size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {NAV.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
              active === key
                ? "bg-[#4CAF50]/15 text-[#4CAF50]"
                : "text-white/40 hover:text-white/70 hover:bg-white/5"
            }`}
          >
            <Icon size={16} className="shrink-0" />
            {!collapsed && (
              <span className="text-xs font-semibold">{label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-2 py-4 border-t border-white/5 space-y-1">
        {!collapsed && (
          <div className="px-3 py-2 mb-2">
            <p className="text-white text-xs font-semibold truncate">
              {user?.name ?? "Super Admin"}
            </p>
            <p className="text-white/30 text-[10px] truncate">
              {user?.email ?? ""}
            </p>
          </div>
        )}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span className="text-xs font-semibold">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

// ── Topbar ────────────────────────────────────────────────────────────────────

function Topbar({ title, user }) {
  return (
    <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-white shrink-0">
      <h1 className="text-sm font-bold text-gray-800">{title}</h1>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-[#0f172a] flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">
            {user?.initials ?? "SA"}
          </span>
        </div>
        <div className="hidden sm:block">
          <p className="text-xs font-semibold text-gray-700">
            {user?.name ?? "Super Admin"}
          </p>
          <p className="text-[10px] text-[#4CAF50] font-semibold">
            Super Admin
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────

export default function SuperAdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();

  const pageTitle = NAV.find((n) => n.key === active)?.label ?? "Dashboard";

  const pages = {
    dashboard: <DashboardHome setActive={setActive} />,
    users: <UsersPage />,
    ranches: <RanchesPage />,
    tickets: <TicketsPage />,
    settings: <SettingsPage />,
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        active={active}
        setActive={setActive}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        user={user}
        onLogout={logout}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title={pageTitle} user={user} />
        <div className="flex-1 overflow-y-auto">{pages[active]}</div>
      </div>
    </div>
  );
}
