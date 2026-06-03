"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext("");
const API = process.env.NEXT_PUBLIC_API_URL;

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const ROLE_ROUTES = {
  super_admin: "/dashboard/super_admin",
  owner: "/dashboard/owner",
  admin: "/dashboard/owner",
  manager: "/dashboard/manager",
  vet: "/dashboard/vet",
  storekeeper: "/dashboard/storekeeper",
  worker: "/dashboard/worker",
  user: "/dashboard",
};

// ── Token helpers ─────────────────────────────────────────────────────────────

function getToken() {
  return localStorage.getItem("sr_token") ?? "";
}
function getRefreshToken() {
  return localStorage.getItem("sr_refresh_token") ?? "";
}

function saveTokens(accessToken, refreshToken) {
  localStorage.setItem("sr_token", accessToken);
  if (refreshToken) localStorage.setItem("sr_refresh_token", refreshToken);
}

function clearSession() {
  ["sr_token", "sr_refresh_token", "sr_user", "sr_role", "sr_slug"].forEach(
    (k) => localStorage.removeItem(k),
  );
}

// ── Silent refresh ────────────────────────────────────────────────────────────

export async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;
  try {
    const res = await fetch(`${API}/auth/refresh`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const accessToken = json?.data?.accessToken ?? json?.accessToken ?? null;
    if (accessToken) {
      localStorage.setItem("sr_token", accessToken);
      return accessToken;
    }
    return null;
  } catch {
    return null;
  }
}

// ── Axios interceptor — auto-refresh on 401 ───────────────────────────────────

let isRefreshing = false;
let refreshQueue = []; // pending requests waiting for new token

function setupAxiosInterceptor() {
  axios.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  });

  axios.interceptors.response.use(
    (res) => res,
    async (error) => {
      const original = error.config;
      if (error.response?.status === 401 && !original._retry) {
        original._retry = true;

        if (isRefreshing) {
          // Queue this request until refresh completes
          return new Promise((resolve, reject) => {
            refreshQueue.push({ resolve, reject });
          }).then((token) => {
            original.headers["Authorization"] = `Bearer ${token}`;
            return axios(original);
          });
        }

        isRefreshing = true;
        const newToken = await refreshAccessToken();
        isRefreshing = false;

        if (newToken) {
          // Retry all queued requests with new token
          refreshQueue.forEach(({ resolve }) => resolve(newToken));
          refreshQueue = [];
          original.headers["Authorization"] = `Bearer ${newToken}`;
          return axios(original);
        } else {
          // Refresh failed — clear session and redirect to login
          refreshQueue.forEach(({ reject }) => reject(error));
          refreshQueue = [];
          clearSession();
          window.location.href = "/";
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );
}

// ── Provider ──────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const router = useRouter();

  // Setup axios interceptor once on mount
  useEffect(() => {
    setupAxiosInterceptor();
  }, []);

  // Rehydrate session from localStorage on first load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("sr_user");
      const storedRole = localStorage.getItem("sr_role");
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedRole) setRole(storedRole);
    } catch (_) {}
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const formReset = () => setFormData(initialFormData);

  const isRegisterValidForm =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.password;
  const isLoginValidForm = formData.email && formData.password;
  const passwordLength = formData.password && formData.password.length < 8;

  // ── Register ─────────────────────────────────────────────────────────────────
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

  // ── Login ────────────────────────────────────────────────────────────────────
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

      const {
        accessToken,
        refreshToken,
        user: apiUser,
        ranch,
      } = response.data.data;

      // platformRole takes precedence for super_admin
      // otherwise use ranch.role for regular staff
      const platformRole = apiUser.platformRole ?? "";
      const userRole =
        platformRole === "super_admin"
          ? "super_admin"
          : (ranch?.role ?? platformRole ?? "user");
      const ranchSlug = ranch?.slug ?? null;

      const userProfile = {
        id: apiUser.id,
        name: `${apiUser.firstName ?? ""} ${apiUser.lastName ?? ""}`.trim(),
        email: apiUser.email,
        initials:
          `${(apiUser.firstName ?? "")[0] ?? ""}${(apiUser.lastName ?? "")[0] ?? ""}`.toUpperCase(),
        ranchSlug,
        ranchName: ranch?.name ?? null,
      };

      setUser(userProfile);
      setRole(userRole);

      localStorage.setItem("sr_user", JSON.stringify(userProfile));
      localStorage.setItem("sr_role", userRole);
      if (ranchSlug) localStorage.setItem("sr_slug", ranchSlug);

      // Store both tokens
      saveTokens(accessToken, refreshToken);

      setSuccess(response.data.message || "Login successful!");
      formReset();

      const destination = ROLE_ROUTES[userRole] ?? "/dashboard";
      setTimeout(() => (window.location.href = destination), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // ── Logout ───────────────────────────────────────────────────────────────────
  const logout = () => {
    setUser(null);
    setRole(null);
    clearSession();
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        formData,
        handleChange,
        formReset,
        isLoginValidForm,
        isRegisterValidForm,
        passwordLength,
        success,
        error,
        loading,
        register,
        login,
        logout,
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
