import React from "react";
import ManagerDashboard from "../../components/dashboard/pages/manager/ManagerDashboard";
import RouteGuard from "@/app/components/RouteGuard";

function page() {
  return (
    <RouteGuard allowedRoles={["manager"]}>
      <ManagerDashboard />
    </RouteGuard>
  );
}

export default page;
