"use client";

import {
  LayoutDashboard,
  History,
  Beef,
  Bell,
  Settings,
  PackageSearch,
} from "lucide-react";
import MobileShell from "../../shared/MobileShell";
import WorkerDashboardHome from "./WorkerDashboardHome";
import WorkerTask from "./WorkerTask";
import LivestockRecords from "./LivestockRecords";
import Notifications from "./Notifications";
import SharedSettingsPage from "../../shared/Settings";
import MyRequests from "../../shared/MyRequests";

const workerNav = [
  { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
  { label: "Task History", key: "history", icon: History },
  { label: "Livestock Records", key: "livestock", icon: Beef },
  { label: "My Requests", key: "requests", icon: PackageSearch },
  { label: "Notifications", key: "notifications", icon: Bell },
  { label: "Settings", key: "settings", icon: Settings },
];

const pageMap = {
  dashboard: WorkerDashboardHome,
  history: WorkerTask,
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
