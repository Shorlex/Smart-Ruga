"use client";

import {
  LayoutDashboard,
  ClipboardList,
  Syringe,
  AlertTriangle,
  Settings,
} from "lucide-react";
import VetDashboardHome from "./VetDashboardHome";
import AnimalHealthRecords from "./AnimalHealthRecords";
import AlertsCriticalCases from "./Alert&CriticalCases";
import MobileShell from "../../shared/MobileShell";
import SharedSettingsPage from "../../shared/Settings";

const vetNav = [
  { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
  { label: "Health & Vaccinations", key: "records", icon: ClipboardList },
  { label: "Alerts & Critical Cases", key: "alerts", icon: AlertTriangle },
  { label: "Settings", key: "settings", icon: Settings },
];

const pageMap = {
  dashboard: VetDashboardHome,
  records: AnimalHealthRecords,
  alerts: AlertsCriticalCases,
  settings: () => (
    <div className="px-4 py-4">
      <SharedSettingsPage />
    </div>
  ),
};

export default function VetDashboard() {
  return (
    <MobileShell navItems={vetNav} pageMap={pageMap} defaultPage="dashboard" />
  );
}
