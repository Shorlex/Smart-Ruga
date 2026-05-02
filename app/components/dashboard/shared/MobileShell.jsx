"use client";

import { useState } from "react";
import { Search, Bell, LogOut, Menu, X, ChevronRight } from "lucide-react";
import Image from "next/image";

/**
 * MobileShell — shared wrapper for Vet and Worker dashboards
 *
 * @param {Object}     props
 * @param {Object[]}   props.navItems        - [{ label, icon: LucideIcon, key }]
 * @param {Object}     props.pageMap         - { [key]: ReactComponent }
 * @param {string}     props.defaultPage     - key of the default active page
 * @param {Object}     props.user            - { name, email, initials }
 * @param {Function}   props.onLogout
 * @param {string}     props.greeting        - e.g. "Hi Dr. Musa 👋,"
 */
export default function MobileShell({
  navItems = [],
  pageMap = {},
  defaultPage = "",
  user = { name: "User", email: "user@mail.com", initials: "U" },
  onLogout,
  greeting = "",
}) {
  const [activePage, setActivePage] = useState(defaultPage || navItems[0]?.key);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const PageComponent =
    pageMap[activePage] ??
    (() => (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        {activePage} — coming soon
      </div>
    ));

  const handleNav = (key) => {
    setActivePage(key);
    setDrawerOpen(false);
  };

  return (
    // Desktop: grey background, centered phone frame
    // Mobile: full screen
    <div className="min-h-screen bg-gray-200 flex items-start justify-center">
      <div className="relative w-full md:w-[480px] h-screen md:min-h-0 md:rounded-3xl md:shadow-2xl bg-[#f5f5f5] overflow-hidden flex flex-col md:max-h-[900px]">
        {/* ── Top bar ──────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 bg-[#f5f5f5] shrink-0">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Search size={20} />
            </button>
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
          </div>
        </div>

        {/* ── Page content ─────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">
          <PageComponent greeting={greeting} onNavigate={handleNav} />
        </div>

        {/* ── Side drawer overlay ───────────────────────────────── */}
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/30 z-20"
              onClick={() => setDrawerOpen(false)}
            />
            {/* Drawer */}
            <div className="absolute top-0 left-0 h-full w-64 bg-white z-30 flex flex-col shadow-xl">
              {/* Logo + close */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Image src={"/images/smartRUGA-logo.png"} alt="SmartRUGA Logo" width={150} height={50} />
                  {/* <div className="w-7 h-7 rounded-md bg-[#4CAF50] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">SR</span>
                  </div>
                  <span className="font-bold text-sm text-gray-800 tracking-wide">
                    SMART-RUGA
                  </span> */}
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Nav */}
              <nav className="flex-1 py-4 space-y-0.5 px-2">
                {navItems.map(({ label, icon: Icon, key }) => (
                  <button
                    key={key}
                    onClick={() => handleNav(key)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                      activePage === key
                        ? "bg-[#4CAF50] text-white shadow-sm"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                  >
                    <Icon size={17} className="shrink-0" />
                    {label}
                  </button>
                ))}
              </nav>

              {/* User footer */}
              <div className="border-t border-gray-100 px-4 py-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {user.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300" />
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  <LogOut size={13} /> Log Out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
