import StorekeeperDashboard from '@/app/components/dashboard/pages/storekeeper/StorekeeperDashboard'
import RouteGuard from '@/app/components/RouteGuard'
import React from 'react'

const page = () => {
  return (
    <RouteGuard allowedRoles={['storekeeper']}>
      <StorekeeperDashboard />
    </RouteGuard>
  )
}

export default page