"use client";
import RouteGuard from "../../components/RouteGuard";
import SuperAdminDashboard from "../../components/dashboard/pages/super_admin/SuperAdminDashboard";

export default function SuperAdminDashboardPage() {
  return (
    <RouteGuard allowedRoles={["super_admin"]}>
      <SuperAdminDashboard />
    </RouteGuard>
  );
}
