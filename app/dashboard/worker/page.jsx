import RouteGuard from "@/app/components/RouteGuard";
import WorkerDashboard from "../../components/dashboard/pages/workers/WorkerDashboard";

function WorkerDashboardPage() {
  return (
    <RouteGuard allowedRoles={"worker"}>
      <WorkerDashboard />
    </RouteGuard>
  );
}

export default WorkerDashboardPage;
