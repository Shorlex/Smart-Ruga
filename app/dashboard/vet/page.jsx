import VetDashboard from "@/app/components/dashboard/pages/vet/VetDashboard"
import RouteGuard from "@/app/components/RouteGuard"


// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components



function page() {
  return (
    <RouteGuard allowedRoles={['vet']}>
      <VetDashboard />
    </RouteGuard>
  )
 }

export default page