"use client";

import { LayoutDashboard, History, Beef, Bell, Settings } from "lucide-react";
import MobileShell from "../../shared/MobileShell";
import WorkerDashboardHome from "./WorkerDashboardHome";
import WorkerTask from "./WorkerTask";
import LivestockRecords from "./LivestockRecords";
import Notifications from "./Notifications";
import SharedSettingsPage from "../../shared/Settings";

const workerNav = [
  { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
  { label: "Task History", key: "history", icon: History },
  { label: "Livestock Records", key: "livestock", icon: Beef },
  { label: "Notifications", key: "notifications", icon: Bell },
  { label: "Settings", key: "settings", icon: Settings },
];

const pageMap = {
  dashboard: WorkerDashboardHome,
  history: WorkerTask,
  livestock: LivestockRecords,
  notifications: Notifications,
  settings: () => (
    <div className="px-4 py-4">
      <SharedSettingsPage
        defaultName="Aliyu Abdullahi"
        defaultEmail="aliabdullahi@mail.com"
        defaultPhone="+234 8033 456 789"
        avatarInitials="AA"
      />
    </div>
  ),
};

export default function WorkerDashboard() {
  return (
    <MobileShell
      navItems={workerNav}
      pageMap={pageMap}
      defaultPage="dashboard"
      greeting="Hi Aliyu 👋,"
      user={{
        name: "Aliyu Abdullahi",
        email: "aliabdullahi@mail.com",
        initials: "AA",
      }}
      onLogout={() => console.log("Logout")}
    />
  );
}
