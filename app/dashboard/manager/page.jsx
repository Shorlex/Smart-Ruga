import React from "react";
import ManagerDashboard from "../../components/dashboard/pages/manager/ManagerDashboard";
import RouteGuard from "@/app/components/RouteGuard";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components


function page() {
  return (
    <RouteGuard allowedRoles={["manager"]}>
      <ManagerDashboard />
    </RouteGuard>
  );
}

export default page;
