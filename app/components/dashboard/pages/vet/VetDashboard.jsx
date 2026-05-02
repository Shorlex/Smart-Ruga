"use client";

import {
  LayoutDashboard,
  ClipboardList,
  Syringe,
  AlertTriangle,
  Settings,
} from "lucide-react";
import MobileShell from "../../shared/MobileShell";
import VetDashboardHome from "./VetDashboardHome";
import SharedSettingsPage from "../../shared/Settings";
import AnimalHealthRecords from "./AnimalHealthRecords";
import TreatmentVaccination from "./Treatment&Vaccination";
import AlertsCriticalCases from "./Alert&CriticalCases";



// ── Nav items ─────────────────────────────────────────────────────────────────

const vetNav = [
  { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
  { label: "Animal Health Records", key: "records", icon: ClipboardList },
  { label: "Treatment & Vaccination", key: "treatment", icon: Syringe },
  { label: "Alerts & Critical Cases", key: "alerts", icon: AlertTriangle },
  { label: "Settings", key: "settings", icon: Settings },
];

// ── Page map ──────────────────────────────────────────────────────────────────

const pageMap = {
  dashboard: VetDashboardHome,
  records: AnimalHealthRecords,
  treatment: TreatmentVaccination,
  alerts: AlertsCriticalCases,
  settings: () => (
    <div className="px-4 py-4">
      <SharedSettingsPage
        defaultName="Musa Mahmud"
        defaultEmail="limahmud@mail.com"
        defaultPhone="+234 8012 345 678"
        avatarInitials="MM"
      />
    </div>
  ),
};

// ── Shell ─────────────────────────────────────────────────────────────────────

export default function VetDashboard() {
  return (
    <MobileShell
      navItems={vetNav}
      pageMap={pageMap}
      defaultPage="dashboard"
      greeting="Hi Dr. Musa 👋,"
      user={{ name: "Musa Mahmud", email: "limahmud@mail.com", initials: "MM" }}
      onLogout={() => console.log("Logout")}
    />
  );
}
