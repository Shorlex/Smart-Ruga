"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard, BarChart2, List, ClipboardCheck,
  Users, Bell, Settings, LogOut, ChevronRight, PanelLeftClose, PanelLeftOpen,
} from "lucide-react";
import Image from "next/image";

const defaultNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Analytics & Reports", icon: BarChart2, href: "/analytics" },
  { label: "Livestock Overview", icon: List, href: "/livestock" },
  { label: "Requests & Approvals", icon: ClipboardCheck, href: "/requests" },
  { label: "Staff Management", icon: Users, href: "/staff" },
  { label: "Notifications", icon: Bell, href: "/notifications" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

/**
 * Sidebar
 * @param {Object}   props
 * @param {string}   props.activeItem  - Label of the active nav item
 * @param {Array}    props.navItems    - Override default nav items
 * @param {Object}   props.user        - { name, email, initials }
 * @param {Function} props.onNavClick
 * @param {Function} props.onLogout
 */
export default function Sidebar({
  activeItem = "Dashboard",
  navItems = defaultNavItems,
  user = { name: "Adelodun Harris", email: "adelodharry@mail.com", initials: "AH" },
  onNavClick,
  onLogout,
}) {
  const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

  // Desktop: start expanded. Mobile: start collapsed.
  const [collapsed, setCollapsed] = useState(() => isMobile());

  // Re-evaluate on resize so switching between breakpoints snaps correctly
  useEffect(() => {
    const handler = () => {
      if (!isMobile()) return; // don't auto-collapse on desktop resize
      setCollapsed(true);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const mobile = isMobile();

  // On mobile, close the drawer after a nav item is clicked
  const handleNavClick = (href) => {
    onNavClick?.(href);
    if (isMobile()) setCollapsed(true);
  };

  // ── Shared inner panel ────────────────────────────────────────────────────

  const panel = (
    <aside className={`flex flex-col bg-white h-full transition-all duration-300 ${collapsed ? "w-14" : "w-44"}`}>
      {/* Logo + collapse toggle */}
      <div className={`flex items-center border-b border-gray-100 py-5 ${collapsed ? "justify-center px-3" : "justify-between px-4"}`}>
        <div className="flex items-center gap-2 min-w-0">
          {/* <div className="w-7 h-7 rounded-md bg-[#4CAF50] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">SR</span>
          </div> */}
          <Image src={"/images/icon.png"} width={25} height={20} alt="icon" />
          {!collapsed && (
            // <span className="font-bold text-sm text-gray-800 tracking-wide truncate">SMART-RUGA</span>
            <Image src={"/images/smartRUGA.png"} width={90} height={20} alt="smartRUGA" className="mt-3 -ml-2" />
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="text-gray-400 hover:text-gray-600 transition-colors mt-3"
            title="Collapse sidebar"
          >
            <PanelLeftClose size={15} />
          </button>
        )}
      </div>

      {/* Expand button (collapsed state) */}
      {collapsed && (
        <div className="flex justify-center py-2 border-b border-gray-100">
          <button
            onClick={() => setCollapsed(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Expand sidebar"
          >
            <PanelLeftOpen size={15} />
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 px-2">
        {navItems.map(({ label, icon: Icon, href }) => (
          <button
            key={label}
            onClick={() => handleNavClick(href)}
            title={collapsed ? label : undefined}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg text-left text-xs font-medium transition-all ${
              collapsed ? "justify-center" : "gap-2.5"
            } ${
              activeItem === label
                ? "bg-[#4CAF50] text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            <Icon size={15} className="shrink-0" />
            {!collapsed && label}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-gray-100 px-3 py-3">
        <div className={`flex items-center ${collapsed ? "justify-center" : "gap-2"}`}>
          <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {user.initials}
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{user.name}</p>
                <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
              </div>
              <ChevronRight size={12} className="text-gray-300" />
            </>
          )}
        </div>
        <button
          onClick={onLogout}
          title={collapsed ? "Log Out" : undefined}
          className={`mt-3 flex items-center text-[11px] text-gray-400 hover:text-red-500 transition-colors ${
            collapsed ? "justify-center w-full" : "gap-1.5"
          }`}
        >
          <LogOut size={12} />
          {!collapsed && "Log Out"}
        </button>
      </div>
    </aside>
  );

  // ── Mobile: overlay drawer ────────────────────────────────────────────────
  if (mobile) {
    return (
      <>
        {/* Backdrop — only visible when drawer is open */}
        {!collapsed && (
          <div
            className="fixed inset-0 bg-black/30 z-20 md:hidden"
            onClick={() => setCollapsed(true)}
          />
        )}

        {/* Drawer — fixed on mobile, slides in/out */}
        <div className={`fixed top-0 left-0 h-screen z-30 border-r border-gray-100 shadow-lg md:hidden transition-all duration-300 ${collapsed ? "w-14" : "w-44"}`}>
          {panel}
        </div>

        {/* Spacer so content doesn't go under the collapsed icon bar */}
        <div className="w-14 shrink-0" />
      </>
    );
  }

  // ── Desktop: inline sidebar ───────────────────────────────────────────────
  return (
    <div className={`shrink-0 h-screen sticky top-0 border-r border-gray-100 transition-all duration-300 ${collapsed ? "w-14" : "w-44"}`}>
      {panel}
    </div>
  );
}