import OwnerDashboard from "@/app/components/dashboard/pages/owner/OwnerDashboard"
import RouteGuard from "@/app/components/RouteGuard"


// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components



const page = () => {
  return (
    <RouteGuard allowedRoles={['owner', 'admin']}>
      <OwnerDashboard />
    </RouteGuard>
  )
}

export default page