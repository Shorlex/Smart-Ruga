"use client";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import Sidebar from "../../components/dashboard/shared/Sidebar";
import Topbar from "../../components/dashboard/shared/Topbar";
import StatCard from "../../components/dashboard/shared/StatCard";
import { LineChart, DonutChart } from "../../components/dashboard/shared/Charts";
import DataTable from "../../components/dashboard/shared/DataTable";
import AnalyticsPage from "../../components/dashboard/pages/owner/Analyticspage";
import LivestockPage from "../../components/dashboard/pages/owner/LivestckOverview";
import RequestsApprovalsPage from "../../components/dashboard/pages/owner/RequestAprrovalPage";
import StaffManagementPage from "../../components/dashboard/pages/owner/StaffManagementPage";
import NotificationsPage from "../../components/dashboard/pages/owner/NotificationsPage";
import SettingsPage from "../../components/dashboard/pages/owner/SettingsPage";
import Image from "next/image";

// ── Static data ───────────────────────────────────────────────────────────────

const pendingRequests = [
  {
    id: "#REQ-1007",
    date: "29 Aug 2025",
    type: "Inventory Refill",
    item: "Maize Feed",
    qty: "2,000 kg",
    cost: "₦250,000",
    by: "Manager Amin",
  },
  {
    id: "#REQ-1006",
    date: "27 Aug 2025",
    type: "Equipment Purchase",
    item: "Ear Tags",
    qty: "500 units",
    cost: "₦45,000",
    by: "Supervisor Kola",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function OwnerDashboard() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar
        activeItem={activeItem}
        onNavClick={(href) => {
          const map = {
            "/dashboard": "Dashboard",
            "/analytics": "Analytics & Reports",
            "/livestock": "Livestock Overview",
            "/requests": "Requests & Approvals",
            "/staff": "Staff Management",
            "/notifications": "Notifications",
            "/settings": "Settings",
          };
          if (map[href]) setActiveItem(map[href]);
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar userInitials="AH" notificationCount={1} />

        {activeItem === "Analytics & Reports" ? (
          <AnalyticsPage />
        ) : activeItem === "Livestock Overview" ? (
          <LivestockPage />
        ) : activeItem === "Requests & Approvals" ? (
          <RequestsApprovalsPage />
        ) : activeItem === "Staff Management" ? (
          <StaffManagementPage />
        ) : activeItem === "Notifications" ? (
          <NotificationsPage />
        ) : activeItem === "Settings" ? (
          <SettingsPage />
        ) : (
          <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {/* Welcome */}
            <div className="flex items-center justify-between">
              <h1 className="text-base font-bold text-gray-800">
                Welcome, Giwa Ranch
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                Ranch ID:{" "}
                <span className="font-semibold text-gray-600">RAN-45821</span>
                <button className="hover:text-[#4CAF50] transition-colors">
                  <RefreshCw size={12} />
                </button>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="lg:flex gap-4 ">
              <div className="md:flex gap-4 w-full lg:w-1/2 mb-5 lg:mb-0">
                <div className="w-full md:w-1/2 mb-4 md:mb-0 relative">
                  <StatCard title="Livestock Population" badge="7 days">
                    <div className="flex justify-between">
                      <p className="text-4xl font-bold text-gray-800 mb-2">
                        2,000
                      </p>
                      <Image
                        src={"/images/chat.png"}
                        width={50}
                        height={50}
                        alt="chat"
                      />
                    </div>
                    {/* <MiniBar heights={[40, 55, 70, 60, 80, 65, 75]} /> */}
                  </StatCard>
                </div>
                <div className="w-full md:w-1/2">
                  <StatCard
                    title="Feed Stock Avail."
                    badge="18 days left"
                    badgeColor="bg-amber-50 text-amber-500"
                  >
                    <div className="flex justify-between">
                      <p className="text-4xl font-bold text-gray-800 mb-2">
                        5,200kg
                      </p>
                      <Image
                        src={"/images/chat.png"}
                        width={50}
                        height={50}
                        alt="chat"
                      />
                    </div>
                    {/* <MiniBar heights={[80, 70, 65, 60, 55, 50, 42]} /> */}
                  </StatCard>
                </div>
              </div>
              <div className="md:flex gap-4 w-full lg:w-1/2">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <StatCard title="Equipment & Supplies" badge="30 days">
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {[
                        { label: "Ear Tags", val: 25 },
                        { label: "Cleaning Sets", val: 12 },
                      ].map(({ label, val }) => (
                        <div
                          key={label}
                          className="nth-[1]:border-r-2 border-gray-400 mr-5"
                        >
                          <p className="text-[10px] text-gray-400">{label}</p>
                          <p className="text-3xl font-bold text-gray-800">
                            {val}
                          </p>
                        </div>
                      ))}
                    </div>
                  </StatCard>
                </div>
                <div className="w-full md:w-1/2">
                  <StatCard title="Nutrition Stock" badge="30 days">
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {[
                        { label: "Vitamins", val: 8 },
                        { label: "Supplements", val: 6 },
                      ].map(({ label, val }) => (
                        <div
                          key={label}
                          className="nth-[1]:border-r-2 border-gray-400 mr-5"
                        >
                          <p className="text-[10px] text-gray-400">{label}</p>
                          <p className="text-3xl font-bold text-gray-800">
                            {val}
                          </p>
                        </div>
                      ))}
                    </div>
                  </StatCard>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="flex gap-4 flex-wrap-reverse">
              <LineChart
                title="Feed Consumption Trend"
                period="30 days"
                labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                data={[
                  180, 320, 490, 410, 550, 420, 380, 510, 460, 390, 430, 480,
                  350, 310,
                ]}
                legend={[
                  { color: "#4CAF50", label: "Avg 510 kg/day" },
                  { color: "#a5d6a7", label: "Peaked at 630 kg last week" },
                ]}
              />
              <DonutChart
                title="Reproduction Rate"
                value={73}
                color="#4CAF50"
                trackColor="#f59e0b"
                period="30 days"
                legend={[
                  { color: "#4CAF50", label: "Bull Calves – 23%" },
                  { color: "#f59e0b", label: "Heifer Calves – 50%" },
                ]}
              />

              <DonutChart
                title="Mortality Rate"
                value={30}
                label="30%"
                color="#4CAF50"
                trackColor="#f59e0b"
                period="August"
                legend={[
                  { color: "#4CAF50", label: "Pneumonia – 20" },
                  { color: "#f59e0b", label: "Injuries – 10 | Total – 30" },
                ]}
              />
              {/* <div className="flex gap-2">
              </div> */}
            </div>

            {/* Pending Requests Table */}
            <DataTable
              title="Pending Request"
              columns={[
                "Request ID",
                "Date",
                "Request Type",
                "Stock Item(s)",
                "Units / Qty",
                "Est. Cost",
                "Requested By",
              ]}
              dataKeys={["id", "date", "type", "item", "qty", "cost", "by"]}
              rows={pendingRequests}
              onApprove={(row) => console.log("Approved", row)}
              onDecline={(row) => console.log("Declined", row)}
            />
          </main>
        )}
      </div>
    </div>
  );
}
