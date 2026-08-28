import StorekeeperDashboard from '@/app/components/dashboard/pages/storekeeper/StorekeeperDashboard'
import RouteGuard from '@/app/components/RouteGuard'
import React from 'react'

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components


const page = () => {
  return (
    <RouteGuard allowedRoles={['storekeeper']}>
      <StorekeeperDashboard />
    </RouteGuard>
  )
}

export default page