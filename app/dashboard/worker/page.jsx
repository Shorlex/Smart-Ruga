import RouteGuard from "@/app/components/RouteGuard";
import WorkerDashboard from "../../components/dashboard/pages/workers/WorkerDashboard";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components


function WorkerDashboardPage() {
  return (
    <RouteGuard allowedRoles={"worker"}>
      <WorkerDashboard />
    </RouteGuard>
  );
}

export default WorkerDashboardPage;
