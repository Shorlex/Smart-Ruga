"use client";

import {
  LayoutDashboard,
  ClipboardList,
  Syringe,
  AlertTriangle,
  Settings,
  PackageSearch,
  Briefcase
} from "lucide-react";
import MobileShell from "../../shared/MobileShell";
import SharedSettingsPage from "../../shared/Settings";
import MyRequests from "../../shared/MyRequests";
import VetDashboardHome from "./VetDashboardHome";
import AnimalHealthRecords from "./AnimalHealthRecords";
import AlertsCriticalCases from "./Alert&CriticalCases";
import MyWorkPage from "../../shared/MyWork";

const vetNav = [
  { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
  { label: "My Work", key: "work", icon: Briefcase },
  { label: "Health & Vaccinations", key: "records", icon: ClipboardList },
  { label: "Alerts & Critical Cases", key: "alerts", icon: AlertTriangle },
  { label: "My Requests", key: "requests", icon: PackageSearch },
  { label: "Settings", key: "settings", icon: Settings },
];

const pageMap = {
  dashboard: VetDashboardHome,
  work: MyWorkPage,
  records: AnimalHealthRecords,
  alerts: AlertsCriticalCases,
  requests: MyRequests,
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
