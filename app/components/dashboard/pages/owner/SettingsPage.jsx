"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Eye, EyeOff, Copy, Plus, Loader2, X } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_token") ?? "";
}
function getRole() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_role") ?? "";
}

// ── Shared UI ─────────────────────────────────────────────────────────────────

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

function TextInput({
  value,
  onChange,
  type = "text",
  icon,
  readOnly,
  placeholder,
}) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`w-full text-xs border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#4CAF50] transition-colors ${
          readOnly ? "bg-gray-50 text-gray-500" : "bg-white text-gray-800"
        } ${icon ? "pr-8" : ""}`}
      />
      {icon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
    </div>
  );
}

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

// ── Banner ────────────────────────────────────────────────────────────────────

function Banner({ type, message }) {
  if (!message) return null;
  const styles = {
    success: "bg-[#f0fdf4] border-[#d1fae5] text-[#4CAF50]",
    error: "bg-red-50 border-red-100 text-red-500",
  };
  return (
    <div
      className={`px-4 py-3 rounded-xl border text-xs font-medium ${styles[type]}`}
    >
      {type === "success" ? "✅" : "⚠️"} {message}
    </div>
  );
}

// ── Tab 1: Account & Ranch Info ───────────────────────────────────────────────

function AccountTab() {
  const fileInputRef = useRef(null);
  const isOwner = getRole() === "owner" || getRole() === "admin";

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showCreateRanch, setShowCreateRanch] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const flash = (type, msg) => {
    if (type === "success") {
      setSuccess(msg);
      setError("");
    } else {
      setError(msg);
      setSuccess("");
    }
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 4000);
  };

  // ── Fetch profile ───────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      // Seed form from localStorage immediately (data saved at login)
      try {
        const stored = JSON.parse(localStorage.getItem("sr_user") || "{}");
        if (stored.name) {
          const parts = stored.name.trim().split(" ");
          const firstName = parts[0] ?? "";
          const lastName = parts.slice(1).join(" ") ?? "";
          setForm((f) => ({
            ...f,
            firstName,
            lastName,
            email: stored.email ?? "",
          }));
        }
      } catch {}

      // Fetch from API
      try {
        const url = `${API}/user/me`;
        const token = getToken();
        console.log(
          "📡 GET",
          url,
          "| token:",
          token ? token.slice(0, 20) + "..." : "MISSING",
        );

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("📡 Profile response status:", res.status);

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          if (res.status === 404) {
            console.warn(
              "⚠️ Profile endpoint not yet available — using login data instead",
            );
          } else {
            console.error("❌ Profile fetch failed:", res.status, errBody);
          }
          setLoading(false);
          return;
        }

        const json = await res.json();
        console.log("✅ Profile raw response:", JSON.stringify(json, null, 2));

        // Actual shape: { data: { user: {...}, memberships: [...] } }
        const user = json?.data?.user ?? {};
        const memberships = json?.data?.memberships ?? [];
        const ranch = memberships[0] ?? null;

        const profileData = { ...user, ranch, memberships };
        console.log("✅ Profile mapped:", profileData);

        setProfile(profileData);
        setForm({
          firstName: user.first_name ?? user.firstName ?? "",
          lastName: user.last_name ?? user.lastName ?? "",
          email: user.email ?? "",
          phone: user.phone ?? "",
          location: ranch?.location ?? "",
          password: "",
        });
      } catch (err) {
        console.error("❌ Profile fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Has this owner created a ranch already?
  // Ranch is in profile.memberships[0] from the API
  const hasRanch = !!(
    profile?.memberships?.length > 0 || profile?.ranch?.ranchId
  );

  // ── Update profile ──────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    try {
      // API uses snake_case: first_name, last_name
      const body = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
      };
      if (form.phone) body.phone = form.phone;
      if (form.location) body.location = form.location;
      if (form.password) body.password = form.password;

      const res = await fetch(`${API}/user/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update profile");
      }
      const json = await res.json();
      const data = json?.data?.data ?? json?.data ?? json;
      setProfile((p) => ({ ...p, ...data }));
      setForm((f) => ({ ...f, password: "" }));
      flash("success", "Profile updated successfully!");
    } catch (err) {
      flash("error", err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // ── Upload image ────────────────────────────────────────────────────────────
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgLoading(true);
    try {
      const data = new FormData();
      data.append("image", file);
      const res = await fetch(`${API}/user/me/image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: data,
      });
      if (!res.ok) throw new Error("Image upload failed");
      const json = await res.json();
      const imageUrl =
        json?.data?.imageUrl ?? json?.data?.data?.imageUrl ?? json?.imageUrl;
      if (imageUrl) setProfile((p) => ({ ...p, imageUrl }));
      flash("success", "Profile picture updated!");
    } catch (err) {
      flash("error", err.message);
    } finally {
      setImgLoading(false);
    }
  };

  // ── Delete image ────────────────────────────────────────────────────────────
  const handleImageDelete = async () => {
    if (!profile?.imageUrl) return;
    setImgLoading(true);
    try {
      const res = await fetch(`${API}/user/me/image`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Failed to delete image");
      setProfile((p) => ({ ...p, imageUrl: null }));
      flash("success", "Profile picture removed.");
    } catch (err) {
      flash("error", err.message);
    } finally {
      setImgLoading(false);
    }
  };

  if (loading)
    return (
      <div className="space-y-4 animate-pulse">
        <div className="flex gap-5 items-center">
          <div className="w-20 h-20 rounded-full bg-gray-100" />
          <div className="space-y-2 flex-1">
            <div className="h-3 bg-gray-100 rounded w-1/3" />
            <div className="h-8 bg-gray-100 rounded w-48" />
          </div>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 bg-gray-100 rounded" />
        ))}
      </div>
    );

  return (
    <div className="space-y-6">
      <Banner type="success" message={success} />
      <Banner type="error" message={error} />

      {/* Create Ranch — for admin platform role users without a ranch */}
      {isOwner && (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div>
            <p className="text-xs font-bold text-gray-800">Ranch</p>
            {hasRanch ? (
              <p className="text-[11px] text-gray-500 mt-0.5">
                {profile?.memberships?.[0]?.ranchName ?? "Your ranch"} ·{" "}
                <span className="text-gray-400">
                  {profile?.memberships?.[0]?.ranchSlug}
                </span>
              </p>
            ) : (
              <p className="text-[11px] text-amber-500 mt-0.5">
                You haven't created a ranch yet
              </p>
            )}
          </div>
          <button
            onClick={() => !hasRanch && setShowCreateRanch(true)}
            disabled={hasRanch}
            title={hasRanch ? "You already have a ranch" : "Create a new ranch"}
            className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${
              hasRanch
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-[#4CAF50] hover:bg-[#43a047] text-white shadow-sm"
            }`}
          >
            <Plus size={13} />
            {hasRanch ? "Ranch Created" : "Create Ranch"}
          </button>
        </div>
      )}

      {/* Create Ranch Modal */}
      {showCreateRanch && (
        <CreateRanchModal
          onClose={() => setShowCreateRanch(false)}
          onSuccess={() => {
            setShowCreateRanch(false);
            // Mark ranch as created immediately so button disables without reload
            setProfile((prev) => ({
              ...prev,
              memberships: [
                ...(prev?.memberships ?? []),
                { ranchRole: "owner" },
              ],
            }));
            setSuccess(
              "Ranch created successfully! Please log out and log back in to access your ranch dashboard.",
            );
          }}
        />
      )}

      {/* Profile picture */}
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
          {profile?.imageUrl ? (
            <img
              src={profile.imageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
              👤
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-0.5">
            Profile Picture
          </p>
          <p className="text-[11px] text-gray-400 mb-3">PNG, JPEG under 10mb</p>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={imgLoading}
              className="px-4 py-1.5 rounded-lg bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors disabled:opacity-60 flex items-center gap-1.5"
            >
              {imgLoading ? (
                <Loader2 size={11} className="animate-spin" />
              ) : null}
              Change Picture
            </button>
            {profile?.imageUrl && (
              <button
                onClick={handleImageDelete}
                disabled={imgLoading}
                className="px-4 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-medium transition-colors disabled:opacity-60"
              >
                Delete Picture
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Name + Email */}
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
        <FieldGroup label="First Name" hint="Edit your first name">
          <TextInput
            value={form.firstName}
            onChange={set("firstName")}
            placeholder="First name"
          />
        </FieldGroup>
        <FieldGroup label="Last Name" hint="Edit your last name">
          <TextInput
            value={form.lastName}
            onChange={set("lastName")}
            placeholder="Last name"
          />
        </FieldGroup>
      </div>

      <FieldGroup
        label="Email Address"
        hint="Manage your account email address"
      >
        <TextInput
          value={form.email}
          onChange={set("email")}
          type="email"
          placeholder="Email address"
        />
      </FieldGroup>

      <FieldGroup label="Phone Number" hint="Your contact phone number">
        <TextInput
          value={form.phone}
          onChange={set("phone")}
          type="tel"
          placeholder="+234 800 000 0000"
        />
      </FieldGroup>

      {/* Ranch ID — read only, from memberships */}
      {profile?.ranch?.ranchSlug && (
        <FieldGroup
          label="Ranch ID"
          hint="Share this ID with your staff so they can register under your ranch"
        >
          <TextInput
            value={profile.ranch.ranchSlug}
            readOnly
            icon={
              <button
                onClick={() =>
                  navigator.clipboard.writeText(profile.ranch.ranchSlug)
                }
                className="hover:text-[#4CAF50] transition-colors"
                title="Copy"
              >
                <Copy size={13} />
              </button>
            }
          />
        </FieldGroup>
      )}

      {/* Password */}
      <FieldGroup
        label="New Password"
        hint="Leave blank to keep your current password"
      >
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={set("password")}
              placeholder="Enter new password"
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2.5 pr-8 bg-white text-gray-800 focus:outline-none focus:border-[#4CAF50] transition-colors placeholder-gray-400"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
          </div>
        </div>
      </FieldGroup>

      {/* Save button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 size={12} className="animate-spin" /> : null}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
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

// ── Create Ranch Modal ────────────────────────────────────────────────────────

function CreateRanchModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    locationName: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API2 = process.env.NEXT_PUBLIC_API_URL;
  const getToken2 = () => localStorage.getItem("sr_token") ?? "";
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isValid = form.name && form.slug;

  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setForm((f) => ({ ...f, name, slug }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const body = { name: form.name, slug: form.slug };
      if (form.locationName) body.locationName = form.locationName;
      if (form.address) body.address = form.address;

      const res = await fetch(`${API2}/ranches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken2()}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? "Failed to create ranch");
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Create Your Ranch</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 text-xs text-red-500">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Ranch Name <span className="text-red-400">*</span>
            </label>
            <input
              value={form.name}
              onChange={handleNameChange}
              placeholder="e.g. Greenfield Ranch"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Slug <span className="text-red-400">*</span>
            </label>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#4CAF50]">
              <span className="px-3 text-xs text-gray-400 border-r border-gray-200 py-2.5 bg-gray-100 whitespace-nowrap">
                smartruga.com/
              </span>
              <input
                value={form.slug}
                onChange={set("slug")}
                placeholder="greenfield-ranch"
                className="flex-1 px-3 py-2.5 text-xs text-gray-700 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Location
            </label>
            <input
              value={form.locationName}
              onChange={set("locationName")}
              placeholder="e.g. Kaduna, Nigeria"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Address
            </label>
            <textarea
              value={form.address}
              onChange={set("address")}
              rows={2}
              placeholder="Full address..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none transition-colors"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || loading}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors ${
                isValid && !loading
                  ? "bg-[#4CAF50] hover:bg-[#43a047]"
                  : "bg-[#a5d6a7] cursor-not-allowed"
              }`}
            >
              {loading && <Loader2 size={12} className="animate-spin" />}
              {loading ? "Creating..." : "Create Ranch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <main className="flex-1 overflow-y-auto px-6 pt-5 pb-15 space-y-6">
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

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        {activeTab === "account" && <AccountTab />}
        {activeTab === "roles" && <UsersRolesTab />}
        {activeTab === "reporting" && <ReportingTab />}
      </div>
    </main>
  );
}
