import OwnerDashboard from "@/app/components/dashboard/pages/owner/OwnerDashboard"
import RouteGuard from "@/app/components/RouteGuard"


const page = () => {
  return (
    <RouteGuard allowedRoles={['owner']}>
      <OwnerDashboard />
    </RouteGuard>
  )
}

export default page