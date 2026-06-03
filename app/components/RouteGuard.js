"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

/**
 * RouteGuard — wraps a dashboard page and redirects to "/" if:
 * 1. No token in localStorage (not logged in)
 * 2. User's role doesn't match the required role(s) for this route
 *
 * Usage:
 * <RouteGuard allowedRoles={["owner", "admin"]}>
 *   <OwnerDashboard />
 * </RouteGuard>
 */
export default function RouteGuard({ allowedRoles = [], children }) {
  const router  = useRouter();
  const [status, setStatus] = useState("checking"); // "checking" | "allowed" | "denied"

  useEffect(() => {
    const token = localStorage.getItem("sr_token");
    const role  = localStorage.getItem("sr_role") ?? "";

    const roleMap = {
      super_admin: "/dashboard/super_admin",
      owner: "/dashboard/owner",
      admin: "/dashboard/owner",
      manager: "/dashboard/manager",
      vet: "/dashboard/vet",
      storekeeper: "/dashboard/storekeeper",
      worker: "/dashboard/worker",
      user: "/dashboard",
    };

    if (!token) {
      setStatus("denied");
      router.replace("/");
    } else if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      setStatus("denied");
      router.replace(roleMap[role] ?? "/");
    } else {
      setStatus("allowed");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="animate-spin text-[#4CAF50]" />
          <p className="text-sm text-gray-400">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <p className="text-2xl">🔒</p>
          <p className="text-sm font-semibold text-gray-700">Redirecting...</p>
        </div>
      </div>
    );
  }

  return children;
}