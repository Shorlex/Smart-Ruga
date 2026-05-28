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
  const router = useRouter();
  const [status, setStatus] = useState("checking"); // "checking" | "allowed" | "denied"

  useEffect(() => {
    const token = localStorage.getItem("sr_token");
    const role = localStorage.getItem("sr_role");

    if (!token) {
      // Not logged in — redirect to login
      setStatus("denied");
      router.replace("/");
      return;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      // Logged in but wrong role — redirect to their correct dashboard
      const roleMap = {
        owner: "/dashboard/owner",
        superadmin: "/dashboard/admin",
        manager: "/dashboard/manager",
        vet: "/dashboard/vet",
        storekeeper: "/dashboard/storekeeper",
        worker: "/dashboard/worker",
        user: "/dashboard",
      };
      const correctPath = roleMap[role] ?? "/";
      setStatus("denied");
      router.replace(correctPath);
      return;
    }

    setStatus("allowed");
  }, []);

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
