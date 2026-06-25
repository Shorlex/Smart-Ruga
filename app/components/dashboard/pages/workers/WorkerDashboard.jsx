"use client";

import {
  LayoutDashboard,
  Beef,
  Bell,
  Settings,
  PackageSearch, Briefcase
} from "lucide-react";
import MobileShell from "../../shared/MobileShell";
import WorkerDashboardHome from "./WorkerDashboardHome";
import WorkerTask from "./WorkerTask";
import LivestockRecords from "./LivestockRecords";
import Notifications from "./Notifications";
import SharedSettingsPage from "../../shared/Settings";
import MyRequests from "../../shared/MyRequests";
import MyWorkPage from "../../shared/MyWork";

const workerNav = [
  { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
  { label: "My Work", key: "history", icon: Briefcase },
  { label: "Livestock Records", key: "livestock", icon: Beef },
  { label: "My Requests", key: "requests", icon: PackageSearch },
  { label: "Notifications", key: "notifications", icon: Bell },
  { label: "Settings", key: "settings", icon: Settings },
];

const pageMap = {
  dashboard: WorkerDashboardHome,
  history: MyWorkPage,
  livestock: LivestockRecords,
  requests: MyRequests,
  notifications: Notifications,
  settings: () => (
    <div className="px-4 py-4">
      <SharedSettingsPage />
    </div>
  ),
};

export default function WorkerDashboard() {
  return (
    <MobileShell
      navItems={workerNav}
      pageMap={pageMap}
      defaultPage="dashboard"
    />
  );
}
