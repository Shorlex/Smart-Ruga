(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/context/AuthContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "refreshAccessToken",
    ()=>refreshAccessToken,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])("");
const API = ("TURBOPACK compile-time value", "https://smartruga-api-d11b7da5a7fa.herokuapp.com/api/v1");
const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
};
const ROLE_ROUTES = {
    owner: "/dashboard/owner",
    admin: "/dashboard",
    manager: "/dashboard/manager",
    vet: "/dashboard/vet",
    storekeeper: "/dashboard/storekeeper",
    worker: "/dashboard/worker",
    user: "/dashboard"
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
    [
        "sr_token",
        "sr_refresh_token",
        "sr_user",
        "sr_role",
        "sr_slug"
    ].forEach((k)=>localStorage.removeItem(k));
}
async function refreshAccessToken() {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;
    try {
        const res = await fetch(`${API}/auth/refresh`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshToken}`
            }
        });
        if (!res.ok) return null;
        const json = await res.json();
        const accessToken = json?.data?.accessToken ?? json?.accessToken ?? null;
        if (accessToken) {
            localStorage.setItem("sr_token", accessToken);
            return accessToken;
        }
        return null;
    } catch  {
        return null;
    }
}
// ── Axios interceptor — auto-refresh on 401 ───────────────────────────────────
let isRefreshing = false;
let refreshQueue = []; // pending requests waiting for new token
function setupAxiosInterceptor() {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].interceptors.request.use({
        "setupAxiosInterceptor.use": (config)=>{
            const token = getToken();
            if (token) config.headers["Authorization"] = `Bearer ${token}`;
            return config;
        }
    }["setupAxiosInterceptor.use"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].interceptors.response.use({
        "setupAxiosInterceptor.use": (res)=>res
    }["setupAxiosInterceptor.use"], {
        "setupAxiosInterceptor.use": async (error)=>{
            const original = error.config;
            if (error.response?.status === 401 && !original._retry) {
                original._retry = true;
                if (isRefreshing) {
                    // Queue this request until refresh completes
                    return new Promise({
                        "setupAxiosInterceptor.use": (resolve, reject)=>{
                            refreshQueue.push({
                                resolve,
                                reject
                            });
                        }
                    }["setupAxiosInterceptor.use"]).then({
                        "setupAxiosInterceptor.use": (token)=>{
                            original.headers["Authorization"] = `Bearer ${token}`;
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(original);
                        }
                    }["setupAxiosInterceptor.use"]);
                }
                isRefreshing = true;
                const newToken = await refreshAccessToken();
                isRefreshing = false;
                if (newToken) {
                    // Retry all queued requests with new token
                    refreshQueue.forEach({
                        "setupAxiosInterceptor.use": ({ resolve })=>resolve(newToken)
                    }["setupAxiosInterceptor.use"]);
                    refreshQueue = [];
                    original.headers["Authorization"] = `Bearer ${newToken}`;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(original);
                } else {
                    // Refresh failed — clear session and redirect to login
                    refreshQueue.forEach({
                        "setupAxiosInterceptor.use": ({ reject })=>reject(error)
                    }["setupAxiosInterceptor.use"]);
                    refreshQueue = [];
                    clearSession();
                    window.location.href = "/";
                    return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }
    }["setupAxiosInterceptor.use"]);
}
const AuthProvider = ({ children })=>{
    _s();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialFormData);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Setup axios interceptor once on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            setupAxiosInterceptor();
        }
    }["AuthProvider.useEffect"], []);
    // Rehydrate session from localStorage on first load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            try {
                const storedUser = localStorage.getItem("sr_user");
                const storedRole = localStorage.getItem("sr_role");
                if (storedUser) setUser(JSON.parse(storedUser));
                if (storedRole) setRole(storedRole);
            } catch (_) {}
        }
    }["AuthProvider.useEffect"], []);
    const handleChange = (e)=>setFormData((prev)=>({
                ...prev,
                [e.target.name]: e.target.value
            }));
    const formReset = ()=>setFormData(initialFormData);
    const isRegisterValidForm = formData.firstName && formData.lastName && formData.email && formData.password;
    const isLoginValidForm = formData.email && formData.password;
    const passwordLength = formData.password && formData.password.length < 8;
    // ── Register ─────────────────────────────────────────────────────────────────
    const register = async (e)=>{
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${API}/auth/register`, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });
            setSuccess(response.data.message || "Account created successfully!");
            formReset();
            setTimeout(()=>router.push("/dashboard"), 3000);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally{
            setLoading(false);
        }
    };
    // ── Login ────────────────────────────────────────────────────────────────────
    const login = async (e)=>{
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${API}/auth/login`, {
                email: formData.email,
                password: formData.password
            });
            const { accessToken, refreshToken, user: apiUser, ranch } = response.data.data;
            const userRole = ranch?.role ?? apiUser.platformRole ?? "user";
            const ranchSlug = ranch?.slug ?? null;
            const userProfile = {
                id: apiUser.id,
                name: `${apiUser.firstName ?? ""} ${apiUser.lastName ?? ""}`.trim(),
                email: apiUser.email,
                initials: `${(apiUser.firstName ?? "")[0] ?? ""}${(apiUser.lastName ?? "")[0] ?? ""}`.toUpperCase(),
                ranchSlug,
                ranchName: ranch?.name ?? null
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
            setTimeout(()=>window.location.href = destination, 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        } finally{
            setLoading(false);
        }
    };
    // ── Logout ───────────────────────────────────────────────────────────────────
    const logout = ()=>{
        setUser(null);
        setRole(null);
        clearSession();
        window.location.href = "/";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
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
            role
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/AuthContext.js",
        lineNumber: 264,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "nFbgmqLTdr4v/Fb1wHYKxbu4lic=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_context_AuthContext_6b46b64b.js.map