"use client";

import { useState } from "react";
import { MapPin, Eye, EyeOff, RefreshCw, Copy } from "lucide-react";

// ── Shared UI primitives ──────────────────────────────────────────────────────

function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-1.5 mb-4">
      <span className="w-2 h-2 rounded-full bg-[#4CAF50]" />
      <span className="text-sm font-semibold text-[#4CAF50]">{label}</span>
    </div>
  );
}

function FieldGroup({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-semibold text-gray-700">{label}</p>
      {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
      {children}
    </div>
  );
}

function TextInput({ value, onChange, type = "text", icon, readOnly }) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full text-xs border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#4CAF50] transition-colors ${readOnly ? "bg-gray-50 text-gray-500" : "bg-white text-gray-800"} ${icon ? "pr-8" : ""}`}
      />
      {icon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
    </div>
  );
}

// Toggle between two options (Enable/Disable style)
function TogglePair({ options, value, onChange }) {
  return (
    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden w-fit">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-colors ${
            value === opt
              ? "bg-white text-gray-800 shadow-sm"
              : "bg-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          {value === opt && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
          )}
          {opt}
        </button>
      ))}
    </div>
  );
}

// Toggle among three options (Daily/Weekly/Monthly style)
function TriToggle({ options, value, onChange }) {
  return (
    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden w-fit">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-colors ${
            value === opt
              ? "bg-white text-gray-800 shadow-sm"
              : "bg-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          {value === opt && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
          )}
          {opt}
        </button>
      ))}
    </div>
  );
}

function SelectInput({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2.5 bg-white text-gray-700 focus:outline-none focus:border-[#4CAF50] appearance-none cursor-pointer"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        ▾
      </span>
    </div>
  );
}

// ── Tab 1: Account & Ranch Info ───────────────────────────────────────────────

function AccountTab() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "Adelodun Harris",
    email: "adelodharry@mail.com",
    ranch: "Ruga Ranch",
    location: "Kano State, Nigeria",
    ranchId: "RAN-45821",
    password: "••••••••",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="space-y-6">
      {/* Profile picture */}
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden shrink-0">
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
            👤
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-0.5">
            Profile Picture
          </p>
          <p className="text-[11px] text-gray-400 mb-3">PNG, JPEG under 10mb</p>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 rounded-lg bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors">
              Change Picture
            </button>
            <button className="px-4 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-medium transition-colors">
              Delete Picture
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Name + Email */}
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
        <FieldGroup label="Full Name" hint="Edit your Full name">
          <TextInput value={form.name} onChange={set("name")} />
        </FieldGroup>
        <FieldGroup
          label="Email Address"
          hint="Manage your account email address"
        >
          <TextInput value={form.email} onChange={set("email")} type="email" />
        </FieldGroup>
      </div>

      {/* Ranch info + location */}
      <div className="grid grid-cols-2 gap-6">
        <FieldGroup label="Ranch Information" hint="Edit your ranch name">
          <TextInput value={form.ranch} onChange={set("ranch")} />
        </FieldGroup>
        <FieldGroup label="Ranch Location" hint="Edit your ranch location">
          <TextInput
            value={form.location}
            onChange={set("location")}
            icon={<MapPin size={13} />}
          />
        </FieldGroup>
      </div>

      {/* Ranch ID */}
      <FieldGroup
        label="Ranch Unique ID"
        hint="Share this ID with your staff so they can register under your ranch"
      >
        <div className="flex gap-3">
          <div className="flex-1">
            <TextInput
              value={form.ranchId}
              readOnly
              icon={<Copy size={13} />}
            />
          </div>
          {/* <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors whitespace-nowrap">
            <RefreshCw size={12} /> Generate New Ranch ID
          </button> */}
        </div>
      </FieldGroup>

      {/* Password */}
      <FieldGroup label="Password" hint="Manage your account password">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={set("password")}
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2.5 pr-8 bg-white text-gray-800 focus:outline-none focus:border-[#4CAF50] transition-colors"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
          </div>
          <button className="px-4 py-2 rounded-lg bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors whitespace-nowrap">
            Change Password
          </button>
        </div>
      </FieldGroup>
    </div>
  );
}

// ── Tab 2: Users Roles ────────────────────────────────────────────────────────

const rolesConfig = [
  {
    role: "Ranch Manager Role",
    permissions: [
      {
        key: "createTasks",
        label: "Allow user to create and assign tasks",
        hint: "This gives managers the ability to create daily tasks and assign them to workers",
        default: "Enable",
      },
      {
        key: "approvePurchases",
        label: "Allow user to approve purchase requests",
        hint: "This lets managers submit and approve low-level purchase requests like tools or small feed bags.",
        default: "Enable",
      },
      {
        key: "viewFinancials",
        label: "Allow user to view financial reports",
        hint: "Managers can see revenue & expense summaries but not detailed transactions",
        default: "Enable",
      },
      {
        key: "manageUsers",
        label: "Allow user to add/remove users",
        hint: "Managers cannot invite or suspend staff members",
        default: "Disable",
      },
    ],
  },
  {
    role: "Storekeeper Role",
    permissions: [
      {
        key: "manageInventory",
        label: "Allow user to manage inventory levels",
        hint: "Storekeepers can update stock quantities, expiry dates, and issues/receipts",
        default: "Enable",
      },
      {
        key: "requestStock",
        label: "Allow user to request stock replenishment",
        hint: "This allows them to raise purchase requests when items run low.",
        default: "Enable",
      },
      {
        key: "assignTasks",
        label: "Allow user to create or assign tasks",
        hint: "Storekeepers cannot assign duties to workers",
        default: "Disable",
      },
    ],
  },
];

function UsersRolesTab() {
  const [perms, setPerms] = useState(() => {
    const init = {};
    rolesConfig.forEach(({ permissions }) =>
      permissions.forEach(({ key, default: d }) => (init[key] = d)),
    );
    return init;
  });

  return (
    <div className="space-y-6">
      {rolesConfig.map(({ role, permissions }) => (
        <div key={role}>
          <SectionLabel label={role} />
          <div className="space-y-5">
            {permissions.map(({ key, label, hint }) => (
              <div key={key} className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 mb-0.5">
                    {label}
                  </p>
                  <p className="text-[11px] text-gray-400">{hint}</p>
                </div>
                <TogglePair
                  options={["Enable", "Disable"]}
                  value={perms[key]}
                  onChange={(v) => setPerms((p) => ({ ...p, [key]: v }))}
                />
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 mt-6" />
        </div>
      ))}
    </div>
  );
}

// ── Tab 3: Reporting & Data Preferences ──────────────────────────────────────

function ReportingTab() {
  const [exportFormat, setExportFormat] = useState("PDF (default)");
  const [scheduleReport, setScheduleReport] = useState("Daily Summary");
  const [currency, setCurrency] = useState("₦ Naira (default)");
  const [numberFormat, setNumberFormat] = useState("Comma-separated [Default]");
  const [units, setUnits] = useState("Weight: Kilograms (kg)");
  const [ageDisplay, setAgeDisplay] = useState("Years & Months [Default]");

  return (
    <div className="space-y-8">
      {/* Report Format & Frequency */}
      <div>
        <SectionLabel label="Report Format & Frequency" />
        <div className="grid grid-cols-2 gap-6">
          <FieldGroup
            label="Default Export Format"
            hint="Choose your preferred file format for report downloads."
          >
            <SelectInput
              value={exportFormat}
              onChange={setExportFormat}
              options={["PDF (default)", "CSV", "Excel (.xlsx)"]}
            />
          </FieldGroup>
          <FieldGroup
            label="Scheduled Reports"
            hint="Decide how often automatic reports are generated and sent."
          >
            <TriToggle
              options={["Daily Summary", "Weekly Digest", "Monthly Report"]}
              value={scheduleReport}
              onChange={setScheduleReport}
            />
          </FieldGroup>
        </div>
      </div>

      {/* Financial Preferences */}
      <div>
        <SectionLabel label="Financial Preferences" />
        <div className="grid grid-cols-2 gap-6">
          <FieldGroup
            label="Currency Format"
            hint="Choose your ranch's primary currency"
          >
            <SelectInput
              value={currency}
              onChange={setCurrency}
              options={["₦ Naira (default)", "$ USD", "€ EUR", "£ GBP"]}
            />
          </FieldGroup>
          <FieldGroup
            label="Number Display Format"
            hint="Decide how large numbers are shown in reports."
          >
            <TogglePair
              options={["Comma-separated [Default]", "Compact (₦1.2M)"]}
              value={numberFormat}
              onChange={setNumberFormat}
            />
          </FieldGroup>
        </div>
      </div>

      {/* Livestock Data Preferences */}
      <div>
        <SectionLabel label="Livestock Data Preferences" />
        <div className="grid grid-cols-2 gap-6">
          <FieldGroup
            label="Units of Measurement"
            hint="Select preferred units for weight and volume tracking."
          >
            <SelectInput
              value={units}
              onChange={setUnits}
              options={["Weight: Kilograms (kg)", "Weight: Pounds (lbs)"]}
            />
          </FieldGroup>
          <FieldGroup
            label="Animal Age Display"
            hint="Choose how animal age is displayed."
          >
            <TogglePair
              options={["Years & Months [Default]", "Months only"]}
              value={ageDisplay}
              onChange={setAgeDisplay}
            />
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const tabs = [
  { key: "account", label: "Account and Ranch Info" },
  { key: "roles", label: "Users Roles" },
  { key: "reporting", label: "Reporting & Data Preferences" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <main className="flex-1 overflow-y-auto px-6 pt-5 pb-15 space-y-6">
      {/* Header + tab bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold text-gray-800">Settings</h1>
        <div className="hidden lg:flex items-center bg-gray-100 rounded-full p-1 gap-1">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === key
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        {activeTab === "account" && <AccountTab />}
        {activeTab === "roles" && <UsersRolesTab />}
        {activeTab === "reporting" && <ReportingTab />}
      </div>
    </main>
  );
}
