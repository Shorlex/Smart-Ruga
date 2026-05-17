"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, Bell, Menu, X, ChevronRight } from "lucide-react";
import Sidebar from "./Sidebar";
import { useAuth } from "../../..//context/AuthContext";

const API = process.env.NEXT_PUBLIC_API_URL;
function getSlug() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_token") ?? "";
}

function formatTime(str) {
  if (!str) return "—";
  return (
    new Date(str).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }) +
    " · " +
    new Date(str).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

// Helper — find the right nav key by matching label keywords
function findNavKey(navItems, ...keywords) {
  for (const kw of keywords) {
    const item = navItems.find(
      (n) =>
        (n.label ?? "").toLowerCase().includes(kw.toLowerCase()) ||
        (n.key ?? "").toLowerCase().includes(kw.toLowerCase()),
    );
    if (item) return item.key ?? item.href;
  }
  return null;
}

// ── Search Overlay ────────────────────────────────────────────────────────────

function SearchOverlay({ onClose, onNavigate, navItems }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ animals: [], vaccinations: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const search = useCallback(async (q) => {
    if (!q.trim()) {
      setResults({ animals: [], vaccinations: [] });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/ranches/${getSlug()}/animals?limit=100`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      const animals = json?.data?.animals ?? json?.animals ?? [];

      const q2 = q.toLowerCase();
      const filteredAnimals = animals.filter(
        (a) =>
          (a.tagNumber ?? "").toLowerCase().includes(q2) ||
          (a.species?.name ?? "").toLowerCase().includes(q2) ||
          (a.breed ?? "").toLowerCase().includes(q2) ||
          (a.rfidTag ?? "").toLowerCase().includes(q2),
      );

      // Vaccinations: filter animals with overdue vaccinations matching query
      const filteredVax = animals.filter(
        (a) =>
          a.isOverdue &&
          ((a.tagNumber ?? "").toLowerCase().includes(q2) ||
            (a.species?.name ?? "").toLowerCase().includes(q2)),
      );

      setResults({
        animals: filteredAnimals.slice(0, 5),
        vaccinations: filteredVax.slice(0, 3),
      });
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => search(query), 350);
    return () => clearTimeout(t);
  }, [query, search]);

  const hasResults =
    results.animals.length > 0 || results.vaccinations.length > 0;

  return (
    <div className="absolute inset-0 z-40 bg-[#f5f5f5] flex flex-col">
      {/* Search bar */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-[#f5f5f5]">
        <div className="flex-1 relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search animals, breeds, tags..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
          />
        </div>
        <button onClick={onClose} className="text-gray-500 font-medium text-sm">
          Cancel
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {loading && (
          <div className="space-y-2 mt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-white rounded-xl animate-pulse" />
            ))}
          </div>
        )}

        {!loading && query && !hasResults && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">No results for "{query}"</p>
          </div>
        )}

        {!loading && !query && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">
              Type to search animals and records
            </p>
          </div>
        )}

        {/* Animals */}
        {!loading && results.animals.length > 0 && (
          <div>
            <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">
              Animals
            </p>
            <div className="space-y-2">
              {results.animals.map((a, i) => (
                <button
                  key={a.publicId ?? i}
                  onClick={() => {
                    // vet: "records", worker: "livestock" — find whichever exists
                    const key = findNavKey(
                      navItems,
                      "health",
                      "livestock",
                      "records",
                    );
                    onNavigate?.(key);
                    onClose();
                  }}
                  className="w-full bg-white rounded-xl px-4 py-3 flex items-center justify-between text-left hover:border-[#4CAF50] border border-transparent transition-colors shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {a.tagNumber ?? "—"}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {a.species?.name ?? "—"} · {a.sex ?? "—"} ·{" "}
                      {a.breed ?? "—"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                        a.healthStatus === "healthy"
                          ? "bg-[#f0fdf4] text-[#4CAF50]"
                          : a.healthStatus === "sick"
                            ? "bg-red-50 text-red-500"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {a.healthStatus ?? "—"}
                    </span>
                    <ChevronRight size={14} className="text-gray-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Overdue vaccinations */}
        {!loading && results.vaccinations.length > 0 && (
          <div>
            <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">
              Overdue Vaccinations
            </p>
            <div className="space-y-2">
              {results.vaccinations.map((a, i) => (
                <button
                  key={a.publicId ?? i}
                  onClick={() => {
                    // vet: "alerts", worker: "notifications"
                    const key = findNavKey(navItems, "alert", "notification");
                    onNavigate?.(key);
                    onClose();
                  }}
                  className="w-full bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center justify-between text-left shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {a.tagNumber ?? "—"}
                    </p>
                    <p className="text-xs text-red-400">
                      ⚠️ Vaccination overdue by {a.daysOverdue}d
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Bell Dropdown ─────────────────────────────────────────────────────────────

function BellDropdown({ onClose, onNavigate, navItems }) {
  const [alerts, setAlerts] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  useEffect(() => {
    const load = async () => {
      try {
        const [alertsRes, unreadRes] = await Promise.all([
          fetch(`${API}/ranches/${getSlug()}/alerts`, {
            headers: { Authorization: `Bearer ${getToken()}` },
          }),
          fetch(`${API}/ranches/${getSlug()}/alerts/unread-count`, {
            headers: { Authorization: `Bearer ${getToken()}` },
          }),
        ]);
        if (alertsRes.ok) {
          const json = await alertsRes.json();
          const list = json?.data?.alerts ?? json?.alerts ?? [];
          setAlerts(list.slice(0, 5));
        }
        if (unreadRes.ok) {
          const json = await unreadRes.json();
          setUnread(json?.data?.count ?? json?.count ?? 0);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  function alertIcon(alert) {
    const t = (alert.alertType ?? alert.type ?? "").toLowerCase();
    if (t.includes("health") || t.includes("sick")) return "❤️";
    if (t.includes("vaccination") || t.includes("overdue")) return "💉";
    if (t.includes("concern")) return "⚠️";
    if (t.includes("task")) return "📋";
    return "🔔";
  }

  return (
    <div
      ref={ref}
      className="absolute top-14 right-4 z-50 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-800">Notifications</p>
          {unread > 0 && (
            <span className="bg-[#4CAF50] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {unread}
            </span>
          )}
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={15} />
        </button>
      </div>

      {/* Alerts list */}
      <div className="max-h-72 overflow-y-auto">
        {loading && (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-8 h-8 bg-gray-100 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2.5 bg-gray-100 rounded w-3/4" />
                  <div className="h-2 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && alerts.length === 0 && (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-gray-400">No notifications yet</p>
          </div>
        )}

        {!loading &&
          alerts.map((alert, i) => {
            const isRead = alert.isRead === true || alert.read === true;
            return (
              <div
                key={alert.publicId ?? i}
                className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 last:border-0 ${
                  !isRead ? "bg-[#f0fdf4]/40" : ""
                }`}
              >
                <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-sm shrink-0">
                  {alertIcon(alert)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">
                    {alert.title ?? alert.message ?? "Notification"}
                  </p>
                  {alert.message && alert.title && (
                    <p className="text-[10px] text-gray-400 truncate mt-0.5">
                      {alert.message}
                    </p>
                  )}
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {formatTime(alert.createdAt)}
                  </p>
                </div>
                {!isRead && (
                  <span className="w-2 h-2 rounded-full bg-[#4CAF50] shrink-0 mt-1" />
                )}
              </div>
            );
          })}
      </div>

      {/* Footer */}
      <button
        onClick={() => {
          const key = findNavKey(navItems, "alert", "notification");
          onNavigate?.(key);
          onClose();
        }}
        className="w-full py-3 text-xs font-semibold text-[#4CAF50] hover:bg-[#f0fdf4] transition-colors border-t border-gray-100"
      >
        View All Alerts →
      </button>
    </div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────

export default function MobileShell({
  navItems = [],
  pageMap = {},
  defaultPage = "",
  user: userProp,
  onLogout,
  greeting = "",
}) {
  const auth = useAuth();

  const user = userProp ?? {
    name: auth?.user?.name ?? "User",
    email: auth?.user?.email ?? "",
    initials: auth?.user?.initials ?? "U",
  };

  const TITLES = ["dr.", "mr.", "mrs.", "ms.", "prof."];
  const nameParts = (user.name ?? "").trim().split(" ");
  const firstName =
    nameParts.find((p) => !TITLES.includes(p.toLowerCase())) ??
    nameParts[0] ??
    "there";
  const displayGreeting = greeting || `Hi ${firstName} 👋,`;

  const [activePage, setActivePage] = useState(defaultPage || navItems[0]?.key);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread count for bell badge
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `${API}/ranches/${getSlug()}/alerts/unread-count`,
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          },
        );
        if (!res.ok) return;
        const json = await res.json();
        setUnreadCount(json?.data?.count ?? json?.count ?? 0);
      } catch {}
    };
    load();
  }, []);

  const PageComponent =
    pageMap[activePage] ??
    (() => (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        {activePage} — coming soon
      </div>
    ));

  const handleNav = (href) => {
    const item = navItems.find((n) => n.href === href || n.key === href);
    if (item) setActivePage(item.key ?? item.href);
    setDrawerOpen(false);
    setSearchOpen(false);
    setBellOpen(false);
  };

  const sidebarNavItems = navItems.map((n) => ({
    label: n.label,
    icon: n.icon,
    href: n.key ?? n.href,
  }));
  const activeLabel =
    navItems.find((n) => (n.key ?? n.href) === activePage)?.label ?? "";

  return (
    <div className="min-h-screen bg-gray-200 flex items-start justify-center">
      <div className="relative w-full md:w-[480px] h-screen md:min-h-0 md:rounded-3xl md:shadow-2xl bg-[#f5f5f5] overflow-hidden flex flex-col md:max-h-[900px]">
        {/* ── Top bar ─────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 bg-[#f5f5f5] shrink-0">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Bell */}
            <button
              onClick={() => setBellOpen((v) => !v)}
              className="relative text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Page content ────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">
          <PageComponent greeting={displayGreeting} onNavigate={handleNav} />
        </div>

        {/* ── Search overlay ──────────────────────────────── */}
        {searchOpen && (
          <SearchOverlay
            onClose={() => setSearchOpen(false)}
            onNavigate={handleNav}
            navItems={navItems}
          />
        )}

        {/* ── Bell dropdown ───────────────────────────────── */}
        {bellOpen && (
          <BellDropdown
            onClose={() => setBellOpen(false)}
            onNavigate={handleNav}
            navItems={navItems}
          />
        )}

        {/* ── Drawer ──────────────────────────────────────── */}
        {drawerOpen && (
          <>
            <div
              className="absolute inset-0 bg-black/30 z-20"
              onClick={() => setDrawerOpen(false)}
            />
            <div className="absolute top-0 left-0 h-full z-30">
              <Sidebar
                activeItem={activeLabel}
                navItems={sidebarNavItems}
                user={user}
                onLogout={onLogout}
                onNavClick={(href) => handleNav(href)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
