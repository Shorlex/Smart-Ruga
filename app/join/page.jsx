"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import HomePageImage from "../components/home/HomePageImage";
import Image from "next/image";

const API = process.env.NEXT_PUBLIC_API_URL;

function JoinPageContent() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token") ?? "";
  const slug = params.get("slug") ?? "";
  const role = params.get("role") ?? "";
  const email = params.get("email") ?? "";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: email,
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("form"); // "form" | "success" | "error"
  const [statusMsg, setStatusMsg] = useState("");
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isValid =
    form.firstName && form.lastName && form.email && form.password;

  // ── Invalid link guard ──────────────────────────────────────────────────────

  if (!token || token.length < 20 || !slug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-3 px-6">
          <p className="text-2xl">🔗</p>
          <p className="text-base font-bold text-gray-800">
            Invalid Invite Link
          </p>
          <p className="text-sm text-gray-500">
            This invite link is missing required information.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2.5 bg-[#4CAF50] text-white text-sm font-semibold rounded-xl"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // ── Submit handler — Step 1: Register, Step 2: Accept invite ───────────────

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ── Step 1: Register ──────────────────────────────────────────────────
      setStatusMsg("Creating your account...");
      const registerRes = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        }),
      });

      if (!registerRes.ok) {
        const err = await registerRes.json();
        throw new Error(err.message ?? "Registration failed");
      }

      const registerJson = await registerRes.json();
      const newUser = registerJson?.data?.user ?? registerJson?.user ?? {};
      const accessToken =
        registerJson?.data?.accessToken ?? registerJson?.accessToken ?? "";

      if (!accessToken)
        throw new Error("Registration succeeded but no token received");

      // ── Step 2: Accept invite with new user's token ───────────────────────
      setStatusMsg("Linking you to the ranch...");
      const acceptRes = await fetch(`${API}/invites/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ token }),
      });

      if (!acceptRes.ok) {
        const err = await acceptRes.json();
        // Even if accept fails, account was created — tell user to contact admin
        console.error("❌ Invite accept failed:", JSON.stringify(err, null, 2));
        throw new Error(
          err.message ??
            "Account created but failed to link to ranch. Please contact your ranch admin.",
        );
      }

      const acceptJson = await acceptRes.json();
      console.log("✅ Invite accepted:", acceptJson);

      // ── Step 3: Store session and redirect ────────────────────────────────
      const firstName =
        newUser.firstName ?? newUser.first_name ?? form.firstName;
      const lastName = newUser.lastName ?? newUser.last_name ?? form.lastName;
      const userProfile = {
        name: `${firstName} ${lastName}`.trim(),
        email: newUser.email ?? form.email,
        initials: `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase(),
        ranchSlug: slug,
      };

      localStorage.setItem("sr_token", accessToken);
      localStorage.setItem("sr_user", JSON.stringify(userProfile));
      localStorage.setItem("sr_slug", slug);
      localStorage.setItem("sr_role", role);

      setStep("success");

      // Hard redirect so AuthContext re-reads localStorage with correct role
      const roleMap = {
        vet: "/dashboard/vet",
        worker: "/dashboard/worker",
        storekeeper: "/dashboard/storekeeper",
        manager: "/dashboard/manager",
        owner: "/dashboard/owner",
      };
      setTimeout(() => {
        window.location.href = roleMap[role] ?? "/dashboard";
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setStatusMsg("");
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4 px-6 max-w-sm">
          <CheckCircle size={56} className="text-[#4CAF50] mx-auto" />
          <p className="text-xl font-bold text-gray-800">
            Joined Successfully!
          </p>
          <p className="text-sm text-gray-500">
            You've joined{" "}
            <strong className="capitalize">{slug.replace(/-/g, " ")}</strong> as{" "}
            <strong className="capitalize">{role}</strong>. Redirecting to your
            dashboard...
          </p>
          <Loader2 size={20} className="animate-spin text-[#4CAF50] mx-auto" />
        </div>
      </div>
    );
  }

  // ── Registration form ───────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[52%] relative rounded-r-3xl overflow-hidden">
        {/* <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('/images/ranch-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-10 left-8 right-8">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl px-6 py-5 text-center border border-white/10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-2xl">🌿</span>
              <p className="text-white font-bold text-xl">
                Smarter <span className="text-[#4CAF50]">Ranching</span>,
                Greater <span className="text-[#4CAF50]">Yields</span>
              </p>
              <span className="text-2xl">🌿</span>
            </div>
            <p className="text-white/70 text-sm">
              Streamline operations, safeguard livestock health, and maximize
              profitability.
            </p>
          </div>
        </div> */}
        <HomePageImage />
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 bg-white overflow-y-auto">
        <div className="w-full max-w-lg mx-auto space-y-6">
          {/* Logo */}
          <div className=" mb-10">
            <Image
              src={"/images/SmartRUGA-Logo.png"}
              width={150}
              height={70}
              alt="main-logo"
            />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              You've been invited!
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Complete your registration to join{" "}
              <strong className="text-gray-700 capitalize">
                {slug.replace(/-/g, " ")}
              </strong>
            </p>
          </div>

          {/* Invite details card */}
          <div className="bg-[#f0fdf4] border border-[#d1fae5] rounded-xl px-5 py-4">
            <p className="text-xs font-bold text-[#4CAF50] mb-3">
              Invite Details
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-gray-400">Ranch</p>
                <p className="font-semibold text-gray-800 capitalize">
                  {slug.replace(/-/g, " ")}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Your Role</p>
                <p className="font-semibold text-gray-800 capitalize">{role}</p>
              </div>
              {email && (
                <div className="col-span-2">
                  <p className="text-gray-400">Invited Email</p>
                  <p className="font-semibold text-gray-800">{email}</p>
                </div>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-500">
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.firstName}
                  onChange={set("firstName")}
                  placeholder="First name"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.lastName}
                  onChange={set("lastName")}
                  placeholder="Last name"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="Email address"
                readOnly={!!email}
                className={`w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors ${
                  email ? "bg-gray-50 text-gray-500" : "bg-white"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  placeholder="Min. 8 characters"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid || loading}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                isValid && !loading
                  ? "bg-[#4CAF50] hover:bg-[#43a047] text-white"
                  : "bg-[#a5d6a7] text-white cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  {statusMsg || "Please wait..."}
                </>
              ) : (
                "Join Ranch"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() =>
                router.push(
                  `/login?redirect=/join?token=${token}&slug=${slug}&role=${role}&email=${encodeURIComponent(email)}`,
                )
              }
              className="text-[#4CAF50] font-semibold hover:underline"
            >
              Log in instead
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-[#4CAF50]" />
        </div>
      }
    >
      <JoinPageContent />
    </Suspense>
  );
}
