"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// ── Shared field primitives ───────────────────────────────────────────────────

function FieldGroup({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm font-semibold text-gray-800">{label}</p>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      {children}
    </div>
  );
}

function TextInput({ value, onChange, type = "text", placeholder, icon }) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors pr-10"
      />
      {icon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
    </div>
  );
}

// ── Settings Page ─────────────────────────────────────────────────────────────

/**
 * SharedSettingsPage — reusable across all roles
 * @param {Object} props
 * @param {string} props.defaultName     - Pre-filled full name
 * @param {string} props.defaultEmail    - Pre-filled email
 * @param {string} props.defaultPhone    - Pre-filled phone number
 * @param {string} props.avatarInitials  - Fallback initials if no avatar image
 */
export default function SharedSettingsPage({
  defaultName = "",
  defaultEmail = "",
  defaultPhone = "",
  avatarInitials = "??",
}) {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [phone, setPhone] = useState(defaultPhone);
  const [password, setPassword] = useState("••••••••••");
  const [showPass, setShowPass] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-5">
      <h1 className="text-base font-bold text-gray-800 mb-5">Settings</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sm:p-7 max-w-4xl space-y-7">
        {/* Section title */}
        <h2 className="text-sm font-bold text-gray-800">My Account</h2>

        {/* Profile picture */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center shrink-0 overflow-hidden border-2 border-gray-100">
            <span className="text-2xl font-bold text-amber-600">
              {avatarInitials}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-0.5">
              Profile Picture
            </p>
            <p className="text-xs text-gray-400 mb-3">PNG, JPEG under 10mb</p>
            <div className="flex gap-2 flex-wrap">
              <button className="px-4 py-2 rounded-full bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors">
                Change Picture
              </button>
              <button className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-medium transition-colors">
                Delete Picture
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100" />

        {/* Name + Email — side by side on md+, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FieldGroup label="Full Name" hint="Edit your full name">
            <TextInput value={name} onChange={(e) => setName(e.target.value)} />
          </FieldGroup>
          <FieldGroup
            label="Email Address"
            hint="Manage your account email address"
          >
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </FieldGroup>
        </div>

        {/* Phone — half width on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FieldGroup label="Phone Number" hint="Enter your phone number">
            <TextInput
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
            />
          </FieldGroup>
        </div>

        <div className="border-t border-gray-100" />

        {/* Password */}
        <FieldGroup label="Password" hint="Manage your account password">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <TextInput
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="hover:text-gray-600 transition-colors"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
              />
            </div>
            <button className="px-5 py-3 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors whitespace-nowrap">
              Change Password
            </button>
          </div>
        </FieldGroup>
      </div>
    </main>
  );
}
