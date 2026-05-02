(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/context/AuthContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
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
// Maps role values to dashboard routes
const ROLE_ROUTES = {
    owner: "/dashboard/owner",
    manager: "/dashboard/manager",
    vet: "/dashboard/vet",
    storekeeper: "/dashboard/storekeeper",
    worker: "/dashboard/worker",
    admin: "/dashboard/owner",
    user: "/dashboard"
};
const AuthProvider = ({ children })=>{
    _s();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialFormData);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
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
    const handleChange = (e)=>{
        setFormData((prev)=>({
                ...prev,
                [e.target.name]: e.target.value
            }));
    };
    const formReset = ()=>setFormData(initialFormData);
    const isRegisterValidForm = formData.firstName && formData.lastName && formData.email && formData.password;
    const isLoginValidForm = formData.email && formData.password;
    const passwordLength = formData.password && formData.password.length < 8;
    // ── Register ────────────────────────────────────────────────────────────────
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
            // New users always go to the waiting room until a role is assigned
            setTimeout(()=>router.push("/dashboard"), 3000);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally{
            setLoading(false);
        }
    };
    // ── Login ───────────────────────────────────────────────────────────────────
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
                initials: `${apiUser.firstName?.[0] ?? ""}${apiUser.lastName?.[0] ?? ""}`.toUpperCase(),
                ranchSlug,
                ranchName: ranch?.name ?? null
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
            setTimeout(()=>router.push(destination), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        } finally{
            setLoading(false);
        }
    };
    // ── Logout ──────────────────────────────────────────────────────────────────
    const logout = ()=>{
        setUser(null);
        setRole(null);
        localStorage.removeItem("sr_user");
        localStorage.removeItem("sr_role");
        localStorage.removeItem("sr_token");
        router.push("/login");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
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
            role
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/AuthContext.js",
        lineNumber: 166,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "WizMmTtcBFbhx6RK0zVWuaM5bcM=", false, function() {
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