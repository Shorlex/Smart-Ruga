"use client";

import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;
function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sr_token") ?? "";
}

// ── UI primitives ─────────────────────────────────────────────────────────────

function FieldGroup({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm font-semibold text-gray-800">{label}</p>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      {children}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  type = "text",
  placeholder,
  readOnly,
  icon,
}) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4CAF50] transition-colors ${
          readOnly ? "bg-gray-50 text-gray-500" : "bg-white text-gray-700"
        } ${icon ? "pr-10" : ""}`}
      />
      {icon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
    </div>
  );
}

function Banner({ type, message }) {
  if (!message) return null;
  const styles = {
    success: "bg-[#f0fdf4] border-[#d1fae5] text-[#4CAF50]",
    error: "bg-red-50    border-red-100   text-red-500",
  };
  return (
    <div
      className={`px-4 py-3 rounded-xl border text-sm font-medium ${styles[type]}`}
    >
      {type === "success" ? "✅" : "⚠️"} {message}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function SharedSettingsPage() {
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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

  // ── Fetch profile ─────────────────────────────────────────────────────────

  useEffect(() => {
    const load = async () => {
      // Seed from localStorage first
      try {
        const stored = JSON.parse(localStorage.getItem("sr_user") || "{}");
        if (stored.name) {
          const parts = stored.name.trim().split(" ");
          setForm((f) => ({
            ...f,
            firstName: parts[0] ?? "",
            lastName: parts.slice(1).join(" ") ?? "",
            email: stored.email ?? "",
          }));
        }
      } catch {}

      // Fetch from API
      try {
        const res = await fetch(`${API}/user/me`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!res.ok) throw new Error();
        const json = await res.json();
        const user = json?.data?.user ?? {};
        setProfile({ ...user, memberships: json?.data?.memberships ?? [] });
        setForm({
          firstName: user.first_name ?? user.firstName ?? "",
          lastName: user.last_name ?? user.lastName ?? "",
          email: user.email ?? "",
          phone: user.phone ?? "",
          password: "",
        });
      } catch {
        // silently fall back to localStorage data
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── Save profile ──────────────────────────────────────────────────────────

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
      };
      if (form.phone) body.phone = form.phone;
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
      setForm((f) => ({ ...f, password: "" }));
      flash("success", "Profile updated successfully!");
    } catch (err) {
      flash("error", err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // ── Upload image ──────────────────────────────────────────────────────────

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
      const imageUrl = json?.data?.imageUrl ?? json?.data?.data?.imageUrl;
      if (imageUrl) setProfile((p) => ({ ...p, imageUrl }));
      flash("success", "Profile picture updated!");
    } catch (err) {
      flash("error", err.message);
    } finally {
      setImgLoading(false);
    }
  };

  // ── Delete image ──────────────────────────────────────────────────────────

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

  // ── Loading skeleton ──────────────────────────────────────────────────────

  if (loading)
    return (
      <div className="space-y-4 animate-pulse p-4">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-1/3" />
            <div className="h-7 bg-gray-200 rounded w-40" />
          </div>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-gray-200 rounded-xl" />
        ))}
      </div>
    );

  return (
    <div className="space-y-5 p-4">
      <Banner type="success" message={success} />
      <Banner type="error" message={error} />

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
          {profile?.imageUrl ? (
            <img
              src={profile.imageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl text-gray-300">
              👤
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-0.5">
            Profile Picture
          </p>
          <p className="text-xs text-gray-400 mb-2">PNG, JPEG under 10mb</p>
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
              className="px-3 py-1.5 rounded-lg bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors disabled:opacity-60 flex items-center gap-1"
            >
              {imgLoading && <Loader2 size={10} className="animate-spin" />}
              Change
            </button>
            {profile?.imageUrl && (
              <button
                onClick={handleImageDelete}
                disabled={imgLoading}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* First + Last name */}
      <div className="grid grid-cols-2 gap-3">
        <FieldGroup label="First Name">
          <TextInput
            value={form.firstName}
            onChange={set("firstName")}
            placeholder="First name"
          />
        </FieldGroup>
        <FieldGroup label="Last Name">
          <TextInput
            value={form.lastName}
            onChange={set("lastName")}
            placeholder="Last name"
          />
        </FieldGroup>
      </div>

      {/* Email */}
      <FieldGroup label="Email Address">
        <TextInput
          value={form.email}
          onChange={set("email")}
          type="email"
          placeholder="Email address"
        />
      </FieldGroup>

      {/* Phone */}
      <FieldGroup label="Phone Number">
        <TextInput
          value={form.phone}
          onChange={set("phone")}
          type="tel"
          placeholder="+234 800 000 0000"
        />
      </FieldGroup>

      {/* Password */}
      <FieldGroup
        label="New Password"
        hint="Leave blank to keep your current password"
      >
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={set("password")}
            placeholder="Enter new password"
            className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 pr-10 bg-white text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors placeholder-gray-400"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </FieldGroup>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-3 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {saving && <Loader2 size={14} className="animate-spin" />}
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
