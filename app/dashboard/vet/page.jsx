import VetDashboard from "@/app/components/dashboard/pages/vet/VetDashboard"
import RouteGuard from "@/app/components/RouteGuard"


 function page() {
   return (
     <RouteGuard allowedRoles={['vet']}>
       <VetDashboard />
     </RouteGuard>
   )
  }

export default page