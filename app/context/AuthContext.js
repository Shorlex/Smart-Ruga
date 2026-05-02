"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext("");

const API = process.env.NEXT_PUBLIC_API_URL;

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

// Maps role values to dashboard routes
const ROLE_ROUTES = {
  owner: "/dashboard/owner",
  manager: "/dashboard/manager",
  vet: "/dashboard/vet",
  storekeeper: "/dashboard/storekeeper",
  worker: "/dashboard/worker",
  admin: "/dashboard/owner", // ← treat admin as owner for now; update once backend clarifies
  user: "/dashboard", // waiting room — no role assigned yet
};

export const AuthProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const router = useRouter();

  // Rehydrate session from localStorage on first load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("sr_user");
      const storedRole = localStorage.getItem("sr_role");
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedRole) setRole(storedRole);
    } catch (_) {}
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formReset = () => setFormData(initialFormData);

  const isRegisterValidForm =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.password;

  const isLoginValidForm = formData.email && formData.password;
  const passwordLength = formData.password && formData.password.length < 8;

  // ── Register ────────────────────────────────────────────────────────────────
  const register = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (passwordLength) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API}/auth/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      setSuccess(response.data.message || "Account created successfully!");
      formReset();
      // New users always go to the waiting room until a role is assigned
      setTimeout(() => router.push("/dashboard"), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Login ───────────────────────────────────────────────────────────────────
  const login = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(`${API}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      // ── Map API response ────────────────────────────────────────────────
      // Shape: { success, message, data: { accessToken, user: {...}, ranch: { slug, role, ... } } }
      const { accessToken, user: apiUser, ranch } = response.data.data;

      // Role comes from ranch.role (not platformRole)
      // Falls back to platformRole for users not yet assigned to a ranch
      const userRole = ranch?.role ?? apiUser.platformRole ?? "user";
      const ranchSlug = ranch?.slug ?? null;

      const userProfile = {
        id: apiUser.id,
        name: `${apiUser.firstName} ${apiUser.lastName}`.trim(),
        email: apiUser.email,
        initials:
          `${apiUser.firstName?.[0] ?? ""}${apiUser.lastName?.[0] ?? ""}`.toUpperCase(),
        ranchSlug, // stored so livestock page can use it
        ranchName: ranch?.name ?? null,
      };

      // Save to state
      setUser(userProfile);
      setRole(userRole);

      // Persist to localStorage
      localStorage.setItem("sr_user", JSON.stringify(userProfile));
      localStorage.setItem("sr_role", userRole);
      localStorage.setItem("sr_token", accessToken);
      if (ranchSlug) localStorage.setItem("sr_slug", ranchSlug);
      // ─────────────────────────────────────────────────────────────────────

      setSuccess(response.data.message || "Login successful!");
      formReset();

      // "user" = no role assigned → waiting room
      // any other role → their specific dashboard
      const destination = ROLE_ROUTES[userRole] ?? "/dashboard";
      setTimeout(() => router.push(destination), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // ── Logout ──────────────────────────────────────────────────────────────────
  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("sr_user");
    localStorage.removeItem("sr_role");
    localStorage.removeItem("sr_token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        // Form state
        formData,
        handleChange,
        formReset,
        // Validation helpers
        isLoginValidForm,
        isRegisterValidForm,
        passwordLength,
        // API state
        success,
        error,
        loading,
        // Auth actions
        register,
        login,
        logout,
        // Session
        user,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
