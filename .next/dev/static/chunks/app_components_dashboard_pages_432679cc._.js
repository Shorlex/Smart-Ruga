(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkerDashboardHome
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scan$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scan.js [app-client] (ecmascript) <export default as Scan>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const API = ("TURBOPACK compile-time value", "https://smartruga-api-d11b7da5a7fa.herokuapp.com/api/v1");
function getSlug() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem("sr_token") ?? "";
}
function formatDate(str) {
    if (!str) return "—";
    return new Date(str).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}
// ── Mark As Done Modal ────────────────────────────────────────────────────────
function MarkAsDoneModal({ task, onClose, onSuccess }) {
    _s();
    const [proofMode, setProofMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Scan Tag");
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        timeCompleted: "",
        feedUsed: "",
        notes: ""
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const set = (k)=>(e)=>setForm((f)=>({
                    ...f,
                    [k]: e.target.value
                }));
    const handleSubmit = async ()=>{
        setError("");
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("proofType", proofMode === "Scan Tag" ? "scan" : "image");
            if (form.notes) formData.append("notes", form.notes);
            const res = await fetch(`${API}/ranches/${getSlug()}/tasks/${task.publicId}/submissions`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
                body: formData
            });
            if (!res.ok) {
                const err = await res.json();
                console.error("❌ Task submission error:", JSON.stringify(err, null, 2));
                throw new Error(err.message ?? "Failed to submit task");
            }
            onSuccess(task.publicId);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 z-40 flex flex-col justify-end bg-black/40",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-t-3xl p-5 space-y-4 max-h-[90%] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-bold text-gray-800",
                            children: "Complete Task"
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-gray-400",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-gray-500 -mt-2 truncate",
                    children: task.title
                }, void 0, false, {
                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-2.5 rounded-xl bg-red-50 text-xs text-red-500",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                    lineNumber: 83,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-semibold text-gray-700 mb-1.5",
                            children: "Time Completed"
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "datetime-local",
                            value: form.timeCompleted,
                            onChange: set("timeCompleted"),
                            className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#4CAF50]"
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-semibold text-gray-700 mb-1.5",
                            children: "Feed Used (optional)"
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: form.feedUsed,
                            onChange: set("feedUsed"),
                            placeholder: "e.g. 120 Kg Maize",
                            className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50]"
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-semibold text-gray-700 mb-2",
                            children: "Completion Proof"
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex rounded-full border border-gray-200 overflow-hidden w-fit mb-3",
                            children: [
                                "Scan Tag",
                                "Take Photo"
                            ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setProofMode(opt),
                                    className: `px-4 py-1.5 text-xs font-semibold transition-all ${proofMode === opt ? "bg-[#4CAF50] text-white" : "text-gray-500 hover:bg-gray-50"}`,
                                    children: opt
                                }, opt, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this),
                        proofMode === "Scan Tag" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "w-full border-2 border-dashed border-gray-300 rounded-xl py-5 flex flex-col items-center gap-1 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] bg-gray-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scan$3e$__["Scan"], {
                                    size: 22
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                    lineNumber: 134,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-medium",
                                    children: "Scan Livestock Tag"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                    lineNumber: 135,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                            lineNumber: 133,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "w-full border-2 border-dashed border-gray-300 rounded-xl py-5 flex flex-col items-center gap-1 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] bg-gray-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-2xl",
                                    children: "📷"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-medium",
                                    children: "Take or Upload Photo"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-semibold text-gray-700 mb-1.5",
                            children: "Notes (Optional)"
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: form.notes,
                            onChange: set("notes"),
                            rows: 3,
                            placeholder: "Additional notes....",
                            className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSubmit,
                            disabled: loading,
                            className: "flex-1 py-3.5 rounded-2xl bg-[#4CAF50] hover:bg-[#43a047] text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60",
                            children: [
                                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    size: 13,
                                    className: "animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                    lineNumber: 164,
                                    columnNumber: 25
                                }, this),
                                loading ? "Submitting..." : "Submit"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "flex-1 py-3.5 rounded-2xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
            lineNumber: 73,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_s(MarkAsDoneModal, "zbg42sV7v3XenLh9hk4qZ70WYYs=");
_c = MarkAsDoneModal;
function WorkerDashboardHome({ greeting, onNavigate }) {
    _s1();
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [selectedTask, setSelectedTask] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchTasks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkerDashboardHome.useCallback[fetchTasks]": async ()=>{
            setLoading(true);
            try {
                const res = await fetch(`${API}/ranches/${getSlug()}/tasks`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                });
                if (!res.ok) throw new Error();
                const json = await res.json();
                const list = json?.data?.tasks ?? json?.tasks ?? (Array.isArray(json?.data) ? json.data : []);
                setTasks(list);
            } catch  {
                setTasks([]);
            } finally{
                setLoading(false);
            }
        }
    }["WorkerDashboardHome.useCallback[fetchTasks]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkerDashboardHome.useEffect": ()=>{
            fetchTasks();
        }
    }["WorkerDashboardHome.useEffect"], [
        fetchTasks
    ]);
    // Mark task as in_review after submission (pending manager approval)
    const handleMarkDone = (publicId)=>{
        setTasks((prev)=>prev.map((t)=>t.publicId === publicId ? {
                    ...t,
                    status: "in_review"
                } : t));
    };
    const completed = tasks.filter((t)=>[
            "completed",
            "done"
        ].includes((t.status ?? "").toLowerCase())).length;
    const pending = tasks.filter((t)=>(t.status ?? "").toLowerCase() === "pending").length;
    const inReview = tasks.filter((t)=>(t.status ?? "").toLowerCase() === "in_review").length;
    const overdue = tasks.filter((t)=>t.isOverdue && ![
            "completed",
            "done",
            "in_review"
        ].includes((t.status ?? "").toLowerCase())).length;
    const stats = [
        {
            label: "Completed",
            value: completed,
            icon: "✅"
        },
        {
            label: "Pending",
            value: pending,
            icon: "⏳"
        },
        {
            label: "In Review",
            value: inReview,
            icon: "🔍"
        },
        {
            label: "Overdue",
            value: overdue,
            icon: "🔴"
        }
    ];
    // Show only pending tasks on dashboard (in_review removed from pending list)
    const pendingTasks = tasks.filter((t)=>(t.status ?? "").toLowerCase() === "pending").slice(0, 5);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex flex-col min-h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 pb-24 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-lg font-bold text-gray-800 mt-1",
                        children: greeting
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                            1,
                            2,
                            3,
                            4
                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl p-4 border border-gray-100 shadow-sm animate-pulse",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-3 bg-gray-100 rounded w-2/3 mb-3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                        lineNumber: 262,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-7 bg-gray-100 rounded w-1/3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                        lineNumber: 263,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                lineNumber: 258,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                        lineNumber: 256,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: stats.map(({ label, value, icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl p-4 border border-gray-100 shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-400 mb-1",
                                        children: label
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                        lineNumber: 274,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-end justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold text-gray-800",
                                                children: value
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                                lineNumber: 276,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl opacity-20",
                                                children: icon
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                                lineNumber: 277,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                        lineNumber: 275,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, label, true, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                lineNumber: 270,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                        lineNumber: 268,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-bold text-gray-800",
                                        children: "Pending Tasks"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onNavigate?.("history"),
                                        className: "text-xs text-[#4CAF50] font-medium hover:underline",
                                        children: "See All"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                        lineNumber: 288,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this),
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    1,
                                    2
                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded-2xl p-4 border border-gray-100 animate-pulse space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-3 bg-gray-100 rounded w-3/4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                                lineNumber: 303,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-2.5 bg-gray-100 rounded w-1/2"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                                lineNumber: 304,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                        lineNumber: 299,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                lineNumber: 297,
                                columnNumber: 13
                            }, this),
                            !loading && pendingTasks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl p-6 text-center text-gray-400 text-sm border border-gray-100",
                                children: "🎉 No pending tasks!"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                lineNumber: 311,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: !loading && pendingTasks.map((task, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `bg-white rounded-2xl p-4 border shadow-sm ${task.isOverdue ? "border-l-4 border-l-red-400 border-gray-100" : "border-gray-100"}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start justify-between gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-semibold text-gray-800 leading-snug mb-1",
                                                            children: task.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                                            lineNumber: 329,
                                                            columnNumber: 23
                                                        }, this),
                                                        task.assignedBy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] text-gray-400",
                                                            children: [
                                                                "By:",
                                                                " ",
                                                                [
                                                                    task.assignedBy.firstName,
                                                                    task.assignedBy.lastName
                                                                ].filter(Boolean).join(" ") || task.assignedBy.email || "—"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                                            lineNumber: 333,
                                                            columnNumber: 25
                                                        }, this),
                                                        task.isOverdue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] text-red-400 font-semibold mt-0.5",
                                                            children: [
                                                                "⚠️ Overdue by ",
                                                                task.daysOverdue,
                                                                " day",
                                                                task.daysOverdue !== 1 ? "s" : ""
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                                            lineNumber: 343,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                                    lineNumber: 328,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col items-end gap-2 shrink-0",
                                                    children: [
                                                        task.dueDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] text-gray-400 whitespace-nowrap",
                                                            children: formatDate(task.dueDate)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                                            lineNumber: 351,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setSelectedTask(task),
                                                            className: "flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors whitespace-nowrap",
                                                            children: "✓ Mark As Done"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                                            lineNumber: 355,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                                    lineNumber: 349,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                            lineNumber: 327,
                                            columnNumber: 19
                                        }, this)
                                    }, task.publicId ?? i, false, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                        lineNumber: 319,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                                lineNumber: 316,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                lineNumber: 250,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 right-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onNavigate?.("livestock"),
                    className: "flex items-center gap-2 bg-[#4CAF50] hover:bg-[#43a047] text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                            lineNumber: 375,
                            columnNumber: 11
                        }, this),
                        " Report New Issue"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                    lineNumber: 371,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                lineNumber: 370,
                columnNumber: 7
            }, this),
            selectedTask && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MarkAsDoneModal, {
                task: selectedTask,
                onClose: ()=>setSelectedTask(null),
                onSuccess: (publicId)=>{
                    handleMarkDone(publicId);
                    setSelectedTask(null);
                }
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
                lineNumber: 381,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx",
        lineNumber: 249,
        columnNumber: 5
    }, this);
}
_s1(WorkerDashboardHome, "Yfp9OdORUbIB+++mp5a0/EFM3Ds=");
_c1 = WorkerDashboardHome;
var _c, _c1;
__turbopack_context__.k.register(_c, "MarkAsDoneModal");
__turbopack_context__.k.register(_c1, "WorkerDashboardHome");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/dashboard/pages/workers/WorkerTask.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkerTaskHistoryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scan$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scan.js [app-client] (ecmascript) <export default as Scan>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const API = ("TURBOPACK compile-time value", "https://smartruga-api-d11b7da5a7fa.herokuapp.com/api/v1");
function getSlug() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem("sr_token") ?? "";
}
function formatDate(str) {
    if (!str) return "—";
    return new Date(str).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }) + " · " + new Date(str).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
    });
}
// ── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status, isOverdue }) {
    const s = (status ?? "").toLowerCase();
    if (isOverdue && s === "pending") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-50 text-red-500",
            children: "🔴 Overdue"
        }, void 0, false, {
            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
            lineNumber: 38,
            columnNumber: 7
        }, this);
    }
    const map = {
        pending: {
            cls: "bg-amber-50  text-amber-500",
            icon: "⏳"
        },
        in_progress: {
            cls: "bg-blue-50   text-blue-500",
            icon: "🔄"
        },
        in_review: {
            cls: "bg-purple-50 text-purple-500",
            icon: "🔍"
        },
        completed: {
            cls: "bg-[#f0fdf4] text-[#4CAF50]",
            icon: "✅"
        },
        cancelled: {
            cls: "bg-gray-100  text-gray-400",
            icon: "❌"
        }
    };
    const { cls, icon } = map[s] ?? {
        cls: "bg-gray-100 text-gray-500",
        icon: "•"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize whitespace-nowrap ${cls}`,
        children: [
            icon,
            " ",
            status?.replace(/_/g, " ") ?? "—"
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c = StatusBadge;
// ── Mark As Done Modal ────────────────────────────────────────────────────────
function MarkAsDoneModal({ task, onClose, onSuccess }) {
    _s();
    const [proofMode, setProofMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Scan Tag");
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        timeCompleted: "",
        feedUsed: "",
        notes: ""
    });
    const [image, setImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const set = (k)=>(e)=>setForm((f)=>({
                    ...f,
                    [k]: e.target.value
                }));
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("proofType", "image");
            if (form.notes) formData.append("notes", form.notes);
            const res = await fetch(`${API}/ranches/${getSlug()}/tasks/${task.publicId}/submissions`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
                body: formData
            });
            if (!res.ok) {
                const err = await res.json();
                console.error("❌ Task submission error:", JSON.stringify(err, null, 2));
                throw new Error(err.message ?? "Failed to submit task");
            }
            onSuccess(task.publicId);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 z-40 flex flex-col justify-end bg-black/40",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-t-3xl p-5 space-y-4 max-h-[90%] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-bold text-gray-800",
                            children: "Complete Task"
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-gray-400",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-gray-400 -mt-2",
                    children: task.title
                }, void 0, false, {
                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-2.5 rounded-xl bg-red-50 text-xs text-red-500",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                    lineNumber: 126,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold text-gray-700 mb-1.5",
                                    children: "Time Completed"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                    lineNumber: 134,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "datetime-local",
                                    value: form.timeCompleted,
                                    onChange: set("timeCompleted"),
                                    className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50]"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                            lineNumber: 133,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold text-gray-700 mb-1.5",
                                    children: "Feed Used (optional)"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: form.feedUsed,
                                    onChange: set("feedUsed"),
                                    placeholder: "e.g. 120 Kg Maize",
                                    className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50]"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                    lineNumber: 150,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold text-gray-700 mb-2",
                                    children: "Completion Proof"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex rounded-full border border-gray-200 overflow-hidden w-fit mb-3",
                                    children: [
                                        "Scan Tag",
                                        "Take Photo"
                                    ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setProofMode(opt),
                                            className: `px-4 py-1.5 text-xs font-semibold transition-all ${proofMode === opt ? "bg-[#4CAF50] text-white" : "text-gray-500"}`,
                                            children: opt
                                        }, opt, false, {
                                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                            lineNumber: 165,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this),
                                proofMode === "Scan Tag" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "w-full border-2 border-dashed border-gray-300 rounded-xl py-5 flex flex-col items-center gap-1 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] bg-gray-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scan$3e$__["Scan"], {
                                            size: 22
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                            lineNumber: 184,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-medium",
                                            children: "Scan Livestock Tag"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                            lineNumber: 185,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                    lineNumber: 180,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "w-full border-2 border-dashed border-gray-300 rounded-xl py-5 flex flex-col items-center gap-1 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] bg-gray-50 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                            size: 22
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                            lineNumber: 189,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-medium",
                                            children: image ? image.name : "Upload proof photo"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                            lineNumber: 190,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            accept: "image/*",
                                            className: "hidden",
                                            onChange: (e)=>setImage(e.target.files?.[0] ?? null)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                            lineNumber: 193,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                    lineNumber: 188,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold text-gray-700 mb-1.5",
                                    children: "Notes (Optional)"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                    lineNumber: 205,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: form.notes,
                                    onChange: set("notes"),
                                    rows: 2,
                                    placeholder: "Additional notes...",
                                    className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                            lineNumber: 204,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    className: "flex-1 py-3.5 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-600",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: loading,
                                    className: "flex-1 py-3.5 rounded-2xl bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-60",
                                    children: [
                                        loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            size: 12,
                                            className: "animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                            lineNumber: 230,
                                            columnNumber: 27
                                        }, this),
                                        loading ? "Submitting..." : "Submit"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
            lineNumber: 116,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
_s(MarkAsDoneModal, "BasPSgDA9u+fWALx1w+l1T8nin8=");
_c1 = MarkAsDoneModal;
// ── Task Card ─────────────────────────────────────────────────────────────────
function TaskCard({ task, onMarkDone }) {
    const isDone = [
        "completed",
        "done"
    ].includes((task.status ?? "").toLowerCase());
    const isCancelled = task.status?.toLowerCase() === "cancelled";
    const isInReview = task.status?.toLowerCase() === "in_review";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-white rounded-2xl border shadow-sm p-4 space-y-3 ${isDone ? "border-gray-100 opacity-75" : "border-gray-100"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-gray-800 leading-snug",
                                children: task.title ?? "—"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this),
                            task.description && task.title !== task.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-gray-400 mt-0.5 truncate",
                                children: task.description
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                lineNumber: 262,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                        status: task.status,
                        isOverdue: task.isOverdue
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                        lineNumber: 267,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                lineNumber: 256,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2 text-xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400",
                                children: "Assigned By"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                lineNumber: 273,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold text-gray-700",
                                children: task.assignedBy?.name ?? task.assignedBy?.email ?? "—"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                lineNumber: 274,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                        lineNumber: 272,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400",
                                children: "Deadline"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `font-semibold ${task.isOverdue ? "text-red-500" : "text-gray-700"}`,
                                children: [
                                    task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    }) : "—",
                                    task.isOverdue && ` (${task.daysOverdue}d late)`
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                lineNumber: 280,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                lineNumber: 271,
                columnNumber: 7
            }, this),
            isDone && task.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] text-gray-400 mb-1",
                        children: "Proof of Work"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                        lineNumber: 298,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: task.imageUrl,
                        alt: "Proof",
                        className: "h-20 w-auto rounded-xl object-cover border border-gray-100"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                        lineNumber: 299,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                lineNumber: 297,
                columnNumber: 9
            }, this),
            !isDone && !isCancelled && !isInReview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onMarkDone(task),
                className: "w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        size: 13
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                        lineNumber: 313,
                        columnNumber: 11
                    }, this),
                    " Mark As Done"
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                lineNumber: 309,
                columnNumber: 9
            }, this),
            isInReview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-1.5 text-xs font-semibold text-purple-500 bg-purple-50 py-2 rounded-full",
                children: "🔍 Submitted · Pending Review"
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                lineNumber: 317,
                columnNumber: 9
            }, this),
            isDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-1.5 text-xs font-semibold text-[#4CAF50] bg-[#f0fdf4] py-2 rounded-full",
                children: "✅ Completed"
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                lineNumber: 324,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
        lineNumber: 250,
        columnNumber: 5
    }, this);
}
_c2 = TaskCard;
// ── Page ──────────────────────────────────────────────────────────────────────
const FILTERS = [
    {
        key: "all",
        label: "All"
    },
    {
        key: "pending",
        label: "Pending"
    },
    {
        key: "in_review",
        label: "In Review"
    },
    {
        key: "completed",
        label: "Completed"
    },
    {
        key: "overdue",
        label: "Overdue"
    }
];
function WorkerTaskHistoryPage() {
    _s1();
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [activeTask, setActiveTask] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // task being marked done
    const fetchTasks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkerTaskHistoryPage.useCallback[fetchTasks]": async ()=>{
            setLoading(true);
            setError("");
            try {
                const res = await fetch(`${API}/ranches/${getSlug()}/tasks`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                });
                if (!res.ok) throw new Error(`Failed to fetch tasks (${res.status})`);
                const json = await res.json();
                console.log("✅ Worker tasks:", json);
                const list = json?.data?.tasks ?? json?.tasks ?? (Array.isArray(json?.data) ? json.data : []);
                setTasks(list);
            } catch (err) {
                setError(err.message);
            } finally{
                setLoading(false);
            }
        }
    }["WorkerTaskHistoryPage.useCallback[fetchTasks]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkerTaskHistoryPage.useEffect": ()=>{
            fetchTasks();
        }
    }["WorkerTaskHistoryPage.useEffect"], [
        fetchTasks
    ]);
    // Optimistically mark task as completed
    const handleMarkDone = (taskPublicId)=>{
        setTasks((prev)=>prev.map((t)=>t.publicId === taskPublicId ? {
                    ...t,
                    status: "in_review"
                } : t));
    };
    // Filter tasks
    const filtered = tasks.filter((t)=>{
        if (filter === "all") return true;
        if (filter === "overdue") return t.isOverdue && ![
            "completed",
            "done",
            "in_review"
        ].includes((t.status ?? "").toLowerCase());
        if (filter === "pending") return (t.status ?? "").toLowerCase() === "pending";
        if (filter === "in_review") return (t.status ?? "").toLowerCase() === "in_review";
        if (filter === "completed") return [
            "completed",
            "done"
        ].includes((t.status ?? "").toLowerCase());
        return true;
    });
    const counts = {
        all: tasks.length,
        pending: tasks.filter((t)=>(t.status ?? "").toLowerCase() === "pending").length,
        in_review: tasks.filter((t)=>(t.status ?? "").toLowerCase() === "in_review").length,
        completed: tasks.filter((t)=>[
                "completed",
                "done"
            ].includes((t.status ?? "").toLowerCase())).length,
        overdue: tasks.filter((t)=>t.isOverdue && ![
                "completed",
                "done",
                "in_review"
            ].includes((t.status ?? "").toLowerCase())).length
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex flex-col min-h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 pb-24 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-base font-bold text-gray-800",
                                        children: "My Tasks"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                        lineNumber: 428,
                                        columnNumber: 13
                                    }, this),
                                    !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-400 mt-0.5",
                                        children: [
                                            filtered.length,
                                            " of ",
                                            tasks.length,
                                            " tasks"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                        lineNumber: 430,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                lineNumber: 427,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: fetchTasks,
                                className: "p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    size: 14,
                                    className: loading ? "animate-spin" : ""
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                    lineNumber: 439,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                lineNumber: 435,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                        lineNumber: 426,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 overflow-x-auto pb-1",
                        children: FILTERS.map(({ key, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setFilter(key),
                                className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${filter === key ? "bg-[#4CAF50] text-white" : "bg-white border border-gray-200 text-gray-500"}`,
                                children: [
                                    label,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-[10px] px-1.5 py-0.5 rounded-full font-bold ${filter === key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`,
                                        children: counts[key]
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                        lineNumber: 456,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, key, true, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                lineNumber: 446,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                        lineNumber: 444,
                        columnNumber: 9
                    }, this),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            1,
                            2,
                            3
                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl border border-gray-100 p-4 animate-pulse space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-3 bg-gray-100 rounded w-2/3"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                                lineNumber: 478,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-5 bg-gray-100 rounded w-20"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                                lineNumber: 479,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                        lineNumber: 477,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-8 bg-gray-100 rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                                lineNumber: 482,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-8 bg-gray-100 rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                                lineNumber: 483,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                        lineNumber: 481,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                lineNumber: 473,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                        lineNumber: 471,
                        columnNumber: 11
                    }, this),
                    !loading && error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl border border-gray-100 p-6 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-500 mb-2",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                lineNumber: 493,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: fetchTasks,
                                className: "text-xs text-[#4CAF50] hover:underline",
                                children: "Try again"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                                lineNumber: 494,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                        lineNumber: 492,
                        columnNumber: 11
                    }, this),
                    !loading && !error && filtered.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl border border-gray-100 p-6 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-400",
                            children: filter === "all" ? "No tasks assigned yet." : `No ${filter} tasks.`
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                            lineNumber: 506,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                        lineNumber: 505,
                        columnNumber: 11
                    }, this),
                    !loading && !error && filtered.map((task, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TaskCard, {
                            task: task,
                            onMarkDone: setActiveTask
                        }, task.publicId ?? i, false, {
                            fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                            lineNumber: 518,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                lineNumber: 424,
                columnNumber: 7
            }, this),
            activeTask && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MarkAsDoneModal, {
                task: activeTask,
                onClose: ()=>setActiveTask(null),
                onSuccess: (publicId)=>{
                    handleMarkDone(publicId);
                    setActiveTask(null);
                }
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
                lineNumber: 528,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/dashboard/pages/workers/WorkerTask.jsx",
        lineNumber: 423,
        columnNumber: 5
    }, this);
}
_s1(WorkerTaskHistoryPage, "IBLRaG5G0vc0BahcDMmiY8qgToM=");
_c3 = WorkerTaskHistoryPage;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "StatusBadge");
__turbopack_context__.k.register(_c1, "MarkAsDoneModal");
__turbopack_context__.k.register(_c2, "TaskCard");
__turbopack_context__.k.register(_c3, "WorkerTaskHistoryPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CowDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const API = ("TURBOPACK compile-time value", "https://smartruga-api-d11b7da5a7fa.herokuapp.com/api/v1");
function getSlug() {
    const slug = localStorage.getItem("sr_slug");
    if (slug) return slug;
    try {
        return JSON.parse(localStorage.getItem("sr_user") || "{}").ranchSlug ?? null;
    } catch  {
        return null;
    }
}
function getToken() {
    return localStorage.getItem("sr_token") ?? "";
}
function calcAge(dob) {
    if (!dob) return "—";
    const diff = Date.now() - new Date(dob).getTime();
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(diff % (1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24 * 30));
    if (years > 0) return `${years} yr${years > 1 ? "s" : ""}${months > 0 ? `, ${months} mo` : ""}`;
    return `${months} month${months !== 1 ? "s" : ""}`;
}
// ── Inline editable field ─────────────────────────────────────────────────────
function Field({ label, value, fieldKey, editing, editValues, onChange, type = "text", options, readOnly }) {
    if (!editing || readOnly) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[10px] text-gray-400 mb-0.5",
                    children: label
                }, void 0, false, {
                    fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs font-semibold text-gray-800",
                    children: value ?? "—"
                }, void 0, false, {
                    fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
            lineNumber: 57,
            columnNumber: 7
        }, this);
    }
    if (options) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[10px] text-gray-400 mb-0.5",
                    children: label
                }, void 0, false, {
                    fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: editValues[fieldKey] ?? "",
                    onChange: (e)=>onChange(fieldKey, e.target.value),
                    className: "w-full bg-gray-50 border border-[#4CAF50] rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none appearance-none",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "",
                            children: "Select..."
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: o.value,
                                children: o.label
                            }, o.value, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
            lineNumber: 65,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] text-gray-400 mb-0.5",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: type,
                value: editValues[fieldKey] ?? "",
                onChange: (e)=>onChange(fieldKey, e.target.value),
                className: "w-full bg-gray-50 border border-[#4CAF50] rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none"
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                lineNumber: 85,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_c = Field;
// ── Section card with edit/save/cancel ───────────────────────────────────────
function InfoCard({ title, editing, onEdit, onSave, onCancel, saving, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-xl border border-gray-100 shadow-sm p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-bold text-gray-800",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    !editing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onEdit,
                        className: "flex items-center gap-1.5 text-xs text-[#4CAF50] font-medium hover:underline",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                size: 11
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this),
                            " Edit"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onCancel,
                                className: "flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 font-medium",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this),
                                    " Cancel"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onSave,
                                disabled: saving,
                                className: "flex items-center gap-1 text-xs text-white bg-[#4CAF50] hover:bg-[#43a047] px-3 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-60",
                                children: [
                                    saving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        size: 11,
                                        className: "animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                        lineNumber: 131,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        size: 11
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                        lineNumber: 133,
                                        columnNumber: 17
                                    }, this),
                                    saving ? "Saving..." : "Save"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_c1 = InfoCard;
// ── Status badge ──────────────────────────────────────────────────────────────
function Badge({ value, greenValue }) {
    const isGreen = value === greenValue;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `flex items-center gap-1 text-xs font-semibold capitalize ${isGreen ? "text-[#4CAF50]" : "text-amber-500"}`,
        children: [
            isGreen ? "✅" : "⚠️",
            " ",
            value ?? "—"
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
_c2 = Badge;
function CowDetailPage({ cow: initialCow, onBack }) {
    _s();
    const [animal, setAnimal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [fetchError, setFetchError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingSection, setEditingSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editValues, setEditValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveError, setSaveError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [saveSuccess, setSaveSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [activity, setActivity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activityLoading, setActivityLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // ── Fetch single animal ───────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CowDetailPage.useEffect": ()=>{
            const load = {
                "CowDetailPage.useEffect.load": async ()=>{
                    setLoading(true);
                    setFetchError("");
                    try {
                        const slug = getSlug();
                        const res = await fetch(`${API}/ranches/${slug}/animals/${initialCow.id}`, {
                            headers: {
                                Authorization: `Bearer ${getToken()}`
                            }
                        });
                        if (!res.ok) throw new Error("Failed to load animal record");
                        const json = await res.json();
                        // Handle: { data: { animals: [{}] } } or { data: { animal: {} } } or { data: {} }
                        const data = json?.data?.animals?.[0] ?? json?.data?.animal ?? json?.data ?? initialCow;
                        setAnimal(data);
                        // Fetch activity log for this animal
                        try {
                            const actRes = await fetch(`${API}/ranches/${slug}/animals/${initialCow.id}/activity`, {
                                headers: {
                                    Authorization: `Bearer ${getToken()}`
                                }
                            });
                            if (actRes.ok) {
                                const actJson = await actRes.json();
                                setActivity(actJson?.events ?? actJson?.data?.events ?? []);
                            }
                        } catch  {
                        /* activity is non-critical, fail silently */ }
                        setActivityLoading(false);
                    } catch (err) {
                        setFetchError(err.message);
                        setAnimal(initialCow); // fallback to card data
                    } finally{
                        setLoading(false);
                    }
                }
            }["CowDetailPage.useEffect.load"];
            load();
        }
    }["CowDetailPage.useEffect"], [
        initialCow
    ]);
    // ── Inline edit helpers ───────────────────────────────────────────────────
    const startEdit = (section)=>{
        setEditingSection(section);
        setSaveError("");
        setSaveSuccess("");
        setEditValues({
            tagNumber: animal.tagNumber ?? "",
            rfidTag: animal.rfidTag ?? "",
            sex: animal.sex ?? "",
            breed: animal.breed ?? "",
            weight: animal.weight ?? "",
            dateOfBirth: animal.dateOfBirth ? animal.dateOfBirth.slice(0, 10) : "",
            status: animal.status ?? "",
            healthStatus: animal.healthStatus ?? ""
        });
    };
    const cancelEdit = ()=>{
        setEditingSection(null);
        setSaveError("");
    };
    const handleChange = (key, val)=>setEditValues((v)=>({
                ...v,
                [key]: val
            }));
    // ── PATCH animal ──────────────────────────────────────────────────────────
    const handleSave = async ()=>{
        setSaving(true);
        setSaveError("");
        try {
            const slug = getSlug();
            const fields = editingSection === "basic" ? [
                "tagNumber",
                "rfidTag",
                "sex",
                "breed",
                "weight",
                "dateOfBirth"
            ] : [
                "status",
                "healthStatus"
            ];
            // Only send fields that actually changed
            const body = {};
            fields.forEach((k)=>{
                const newVal = editValues[k];
                const oldVal = animal[k] ?? "";
                if (newVal !== "" && String(newVal) !== String(oldVal)) {
                    body[k] = k === "weight" ? Number(newVal) : newVal;
                }
            });
            if (Object.keys(body).length === 0) {
                cancelEdit();
                return;
            }
            const res = await fetch(`${API}/ranches/${slug}/animals/${animal.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify(body)
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to update animal");
            }
            const json = await res.json();
            const updated = json?.data?.animal ?? json?.data ?? {
                ...animal,
                ...body
            };
            setAnimal(updated);
            setEditingSection(null);
            setSaveSuccess("Record updated successfully!");
            setTimeout(()=>setSaveSuccess(""), 3000);
        } catch (err) {
            setSaveError(err.message || "Something went wrong");
        } finally{
            setSaving(false);
        }
    };
    // ── Loading skeleton ──────────────────────────────────────────────────────
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex-1 overflow-y-auto px-6 py-5 space-y-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onBack,
                    className: "flex items-center gap-1.5 text-sm text-gray-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            size: 15
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                            lineNumber: 311,
                            columnNumber: 11
                        }, this),
                        " Back"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                    lineNumber: 307,
                    columnNumber: 9
                }, this),
                [
                    1,
                    2
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-xl border border-gray-100 p-5 animate-pulse space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-3 bg-gray-100 rounded w-1/4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                lineNumber: 318,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-4",
                                children: [
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                    6
                                ].map((j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-8 bg-gray-100 rounded"
                                    }, j, false, {
                                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                        lineNumber: 321,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                lineNumber: 319,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                        lineNumber: 314,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
            lineNumber: 306,
            columnNumber: 7
        }, this);
    }
    const a = animal;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex-1 overflow-y-auto px-6 py-5 space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            size: 15
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                            lineNumber: 340,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                        lineNumber: 336,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-base font-bold text-gray-800",
                                children: [
                                    a.tagNumber ?? a.publicId?.slice(0, 8),
                                    " —",
                                    " ",
                                    a.species?.name ?? "Animal"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                lineNumber: 343,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-gray-400",
                                children: [
                                    "ID: ",
                                    a.publicId
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                lineNumber: 347,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this),
                    a.qrUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: a.qrUrl,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "ml-auto flex items-center gap-1 text-xs text-[#4CAF50] border border-[#4CAF50] px-3 py-1.5 rounded-lg hover:bg-[#f0fdf4] transition-colors",
                        children: [
                            "View QR ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                size: 11
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                lineNumber: 356,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                        lineNumber: 350,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                lineNumber: 335,
                columnNumber: 7
            }, this),
            saveSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-3 rounded-xl bg-[#f0fdf4] border border-[#d1fae5] text-xs text-[#4CAF50] font-medium",
                children: [
                    "✅ ",
                    saveSuccess
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                lineNumber: 363,
                columnNumber: 9
            }, this),
            (saveError || fetchError) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-500",
                children: saveError || `⚠️ Showing partial data — ${fetchError}`
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                lineNumber: 368,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoCard, {
                title: "Basic Information",
                editing: editingSection === "basic",
                onEdit: ()=>startEdit("basic"),
                onSave: handleSave,
                onCancel: cancelEdit,
                saving: saving,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                            label: "Tag Number",
                            fieldKey: "tagNumber",
                            value: a.tagNumber,
                            editing: editingSection === "basic",
                            editValues: editValues,
                            onChange: handleChange
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                            lineNumber: 383,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                            label: "Species",
                            fieldKey: "species",
                            value: a.species?.name,
                            readOnly: true,
                            editing: editingSection === "basic",
                            editValues: editValues,
                            onChange: handleChange
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                            lineNumber: 391,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                            label: "Sex",
                            fieldKey: "sex",
                            value: a.sex,
                            editing: editingSection === "basic",
                            editValues: editValues,
                            onChange: handleChange,
                            options: [
                                {
                                    value: "male",
                                    label: "Male"
                                },
                                {
                                    value: "female",
                                    label: "Female"
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                            lineNumber: 400,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                            label: "Breed",
                            fieldKey: "breed",
                            value: a.breed,
                            editing: editingSection === "basic",
                            editValues: editValues,
                            onChange: handleChange
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                            lineNumber: 412,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                            label: "Weight (kg)",
                            fieldKey: "weight",
                            value: a.weight ? `${a.weight} kg` : null,
                            editing: editingSection === "basic",
                            editValues: editValues,
                            onChange: handleChange,
                            type: "number"
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                            lineNumber: 420,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                            label: "Date of Birth",
                            fieldKey: "dateOfBirth",
                            value: a.dateOfBirth ? new Date(a.dateOfBirth).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            }) : null,
                            editing: editingSection === "basic",
                            editValues: editValues,
                            onChange: handleChange,
                            type: "date"
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                            lineNumber: 429,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                            label: "Age",
                            fieldKey: "age",
                            value: calcAge(a.dateOfBirth),
                            readOnly: true,
                            editing: editingSection === "basic",
                            editValues: editValues,
                            onChange: handleChange
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                            lineNumber: 446,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                            label: "RFID Tag",
                            fieldKey: "rfidTag",
                            value: a.rfidTag,
                            editing: editingSection === "basic",
                            editValues: editValues,
                            onChange: handleChange
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                            lineNumber: 455,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                    lineNumber: 382,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                lineNumber: 374,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoCard, {
                title: "Health & Status",
                editing: editingSection === "health",
                onEdit: ()=>startEdit("health"),
                onSave: handleSave,
                onCancel: cancelEdit,
                saving: saving,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4",
                        children: editingSection === "health" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    label: "Health Status",
                                    fieldKey: "healthStatus",
                                    value: a.healthStatus,
                                    editing: true,
                                    editValues: editValues,
                                    onChange: handleChange,
                                    options: [
                                        {
                                            value: "healthy",
                                            label: "Healthy"
                                        },
                                        {
                                            value: "sick",
                                            label: "Sick"
                                        },
                                        {
                                            value: "under_treatment",
                                            label: "Under Treatment"
                                        }
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                    lineNumber: 478,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    label: "Status",
                                    fieldKey: "status",
                                    value: a.status,
                                    editing: true,
                                    editValues: editValues,
                                    onChange: handleChange,
                                    options: [
                                        {
                                            value: "active",
                                            label: "Active"
                                        },
                                        {
                                            value: "inactive",
                                            label: "Inactive"
                                        }
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                    lineNumber: 491,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-gray-400 mb-0.5",
                                            children: "Health Status"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                            lineNumber: 507,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                            value: a.healthStatus,
                                            greenValue: "healthy"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                            lineNumber: 510,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                    lineNumber: 506,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-gray-400 mb-0.5",
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                            lineNumber: 513,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                            value: a.status,
                                            greenValue: "active"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                            lineNumber: 514,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                    lineNumber: 512,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                        lineNumber: 475,
                        columnNumber: 9
                    }, this),
                    a.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-gray-400 mb-1.5",
                                children: "Animal Photo"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                lineNumber: 523,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: a.imageUrl,
                                alt: "Animal",
                                className: "h-36 w-auto rounded-xl object-cover border border-gray-100"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                lineNumber: 524,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                        lineNumber: 522,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                lineNumber: 467,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl border border-gray-100 shadow-sm p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-bold text-gray-800 mb-4",
                        children: "Activity Log"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                        lineNumber: 535,
                        columnNumber: 9
                    }, this),
                    activityLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            1,
                            2,
                            3
                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 animate-pulse",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-7 h-7 rounded-full bg-gray-100 shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                        lineNumber: 541,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-2.5 bg-gray-100 rounded w-1/2"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                                lineNumber: 543,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-2 bg-gray-100 rounded w-3/4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                                lineNumber: 544,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                        lineNumber: 542,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                lineNumber: 540,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                        lineNumber: 538,
                        columnNumber: 11
                    }, this),
                    !activityLoading && activity.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-400 text-center py-6",
                        children: "No activity recorded yet."
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                        lineNumber: 552,
                        columnNumber: 11
                    }, this),
                    !activityLoading && activity.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-3 top-0 bottom-0 w-px bg-gray-100"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                lineNumber: 560,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-5",
                                children: activity.map((event, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4 relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-7 h-7 rounded-full bg-[#f0fdf4] border-2 border-[#4CAF50] flex items-center justify-center shrink-0 z-10",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-2 h-2 rounded-full bg-[#4CAF50]"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                                    lineNumber: 567,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                                lineNumber: 566,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0 pb-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between gap-2 mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-semibold text-gray-700 capitalize",
                                                                children: event.eventType?.replace(/_/g, " ") ?? "Event"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                                                lineNumber: 574,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] text-gray-400 whitespace-nowrap shrink-0",
                                                                children: event.createdAt ? new Date(event.createdAt).toLocaleDateString("en-GB", {
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                    year: "numeric"
                                                                }) + " · " + new Date(event.createdAt).toLocaleTimeString("en-GB", {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit"
                                                                }) : "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                                                lineNumber: 577,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                                        lineNumber: 573,
                                                        columnNumber: 21
                                                    }, this),
                                                    event.field && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-500 mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium text-gray-700 capitalize",
                                                                children: event.field
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                                                lineNumber: 602,
                                                                columnNumber: 25
                                                            }, this),
                                                            " changed from ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-1.5 py-0.5 rounded bg-red-50 text-red-500 font-medium text-[10px]",
                                                                children: event.fromValue ?? "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                                                lineNumber: 606,
                                                                columnNumber: 25
                                                            }, this),
                                                            " → ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-1.5 py-0.5 rounded bg-[#f0fdf4] text-[#4CAF50] font-medium text-[10px]",
                                                                children: event.toValue ?? "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                                                lineNumber: 610,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                                        lineNumber: 601,
                                                        columnNumber: 23
                                                    }, this),
                                                    event.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] text-gray-400 italic",
                                                        children: [
                                                            '"',
                                                            event.notes,
                                                            '"'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                                        lineNumber: 618,
                                                        columnNumber: 23
                                                    }, this),
                                                    event.actor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-gray-400 mt-1",
                                                        children: [
                                                            "By",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium text-gray-600",
                                                                children: [
                                                                    event.actor.firstName,
                                                                    event.actor.lastName
                                                                ].filter(Boolean).join(" ") || event.actor.email
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                                                lineNumber: 627,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                                        lineNumber: 625,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                                lineNumber: 571,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, event.id ?? i, true, {
                                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                        lineNumber: 564,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                                lineNumber: 562,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                        lineNumber: 558,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
                lineNumber: 534,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx",
        lineNumber: 333,
        columnNumber: 5
    }, this);
}
_s(CowDetailPage, "tWopSr2xlimeu/kXgnq67v4QiLc=");
_c3 = CowDetailPage;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Field");
__turbopack_context__.k.register(_c1, "InfoCard");
__turbopack_context__.k.register(_c2, "Badge");
__turbopack_context__.k.register(_c3, "CowDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LivestockPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dashboard$2f$pages$2f$owner$2f$CowDetailsPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/dashboard/pages/owner/CowDetailsPage.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const API = ("TURBOPACK compile-time value", "https://smartruga-api-d11b7da5a7fa.herokuapp.com/api/v1");
// ── Helpers ───────────────────────────────────────────────────────────────────
function getSlug() {
    // Stored separately after login for easy access
    const slug = localStorage.getItem("sr_slug");
    if (slug) return slug;
    // Fallback: try reading from sr_user object
    try {
        const user = JSON.parse(localStorage.getItem("sr_user") || "{}");
        return user.ranchSlug ?? null;
    } catch  {
        return null;
    }
}
function getToken() {
    return localStorage.getItem("sr_token") ?? "";
}
function calcAge(dateOfBirth) {
    if (!dateOfBirth) return "—";
    const diff = Date.now() - new Date(dateOfBirth).getTime();
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(diff % (1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24 * 30));
    if (years > 0) return `${years} yr${years > 1 ? "s" : ""}${months > 0 ? `, ${months} mo` : ""}`;
    return `${months} month${months !== 1 ? "s" : ""}`;
}
// ── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
    const isActive = status === "active";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `flex items-center gap-1 text-xs font-semibold ${isActive ? "text-[#4CAF50]" : "text-amber-500"}`,
        children: [
            isActive ? "✅" : "⚠️",
            " ",
            status
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c = StatusBadge;
// ── Add Animal Modal ──────────────────────────────────────────────────────────
function AddAnimalModal({ onClose, onSuccess }) {
    _s();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        speciesId: "",
        tagNumber: "",
        rfidTag: "",
        sex: "",
        dateOfBirth: "",
        breed: "",
        weight: ""
    });
    const [image, setImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [species, setSpecies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [speciesLoading, setSpeciesLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const set = (k)=>(e)=>setForm((f)=>({
                    ...f,
                    [k]: e.target.value
                }));
    // Fetch species list on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AddAnimalModal.useEffect": ()=>{
            const fetchSpecies = {
                "AddAnimalModal.useEffect.fetchSpecies": async ()=>{
                    try {
                        const res = await fetch(`${API}/species`, {
                            headers: {
                                Authorization: `Bearer ${getToken()}`
                            }
                        });
                        if (!res.ok) throw new Error(`Species fetch failed: ${res.status}`);
                        const data = await res.json();
                        console.log("✅ Species API raw response:", data);
                        // Actual shape: { success, message, data: { species: [...] } }
                        let list = [];
                        if (Array.isArray(data)) list = data;
                        else if (Array.isArray(data?.data?.species)) list = data.data.species;
                        else if (Array.isArray(data?.data)) list = data.data;
                        else if (Array.isArray(data?.species)) list = data.species;
                        console.log("✅ Species list parsed:", list);
                        setSpecies(list);
                    } catch (err) {
                        console.error("❌ Species fetch error:", err.message);
                        setSpecies([]);
                    } finally{
                        setSpeciesLoading(false);
                    }
                }
            }["AddAnimalModal.useEffect.fetchSpecies"];
            fetchSpecies();
        }
    }["AddAnimalModal.useEffect"], []);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const slug = getSlug();
            const data = new FormData();
            data.append("speciesId", form.speciesId);
            data.append("sex", form.sex);
            if (form.tagNumber) data.append("tagNumber", form.tagNumber);
            if (form.rfidTag) data.append("rfidTag", form.rfidTag);
            if (form.dateOfBirth) data.append("dateOfBirth", form.dateOfBirth);
            if (form.breed) data.append("breed", form.breed);
            if (form.weight) data.append("weight", Number(form.weight));
            if (image) data.append("image", image);
            const res = await fetch(`${API}/ranches/${slug}/animals`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
                body: data
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to add animal");
            }
            onSuccess();
            onClose();
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally{
            setLoading(false);
        }
    };
    const isValid = form.speciesId && form.sex;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-6 py-4 border-b border-gray-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-sm font-bold text-gray-800",
                            children: "Add New Animal"
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-gray-400 hover:text-gray-600 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "px-6 py-5 space-y-4",
                    children: [
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-500",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 169,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-semibold text-gray-700 mb-1.5",
                                            children: [
                                                "Species ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-400",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                                    lineNumber: 178,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 177,
                                            columnNumber: 15
                                        }, this),
                                        speciesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-400 animate-pulse",
                                            children: "Loading species..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 181,
                                            columnNumber: 17
                                        }, this) : species.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: form.speciesId,
                                            onChange: set("speciesId"),
                                            className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors appearance-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select species"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                                    lineNumber: 190,
                                                    columnNumber: 19
                                                }, this),
                                                species.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: s.id,
                                                        children: [
                                                            s.name,
                                                            " ",
                                                            s.code ? `(${s.code})` : ""
                                                        ]
                                                    }, s.id, true, {
                                                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                                        lineNumber: 192,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 185,
                                            columnNumber: 17
                                        }, this) : // Fallback: manual UUID input if species endpoint not available
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: form.speciesId,
                                            onChange: set("speciesId"),
                                            placeholder: "Species UUID",
                                            className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 199,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 176,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-semibold text-gray-700 mb-1.5",
                                            children: "Tag Number"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 208,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: form.tagNumber,
                                            onChange: set("tagNumber"),
                                            placeholder: "e.g. #1201",
                                            className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 211,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-semibold text-gray-700 mb-1.5",
                                            children: "RFID Tag"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 223,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: form.rfidTag,
                                            onChange: set("rfidTag"),
                                            placeholder: "RFID code",
                                            className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 226,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-semibold text-gray-700 mb-1.5",
                                            children: [
                                                "Sex ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-400",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                                    lineNumber: 235,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 234,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: form.sex,
                                            onChange: set("sex"),
                                            className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors appearance-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select sex"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                                    lineNumber: 242,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "male",
                                                    children: "Male"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                                    lineNumber: 243,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "female",
                                                    children: "Female"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                                    lineNumber: 244,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 237,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 221,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-semibold text-gray-700 mb-1.5",
                                            children: "Date of Birth"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 252,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            value: form.dateOfBirth,
                                            onChange: set("dateOfBirth"),
                                            className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 255,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 251,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-semibold text-gray-700 mb-1.5",
                                            children: "Breed"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 263,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: form.breed,
                                            onChange: set("breed"),
                                            placeholder: "e.g. White Fulani",
                                            className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 266,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 262,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 250,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-xs font-semibold text-gray-700 mb-1.5",
                                    children: "Weight (kg)"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 277,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    value: form.weight,
                                    onChange: set("weight"),
                                    placeholder: "e.g. 280",
                                    className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 280,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 276,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-xs font-semibold text-gray-700 mb-1.5",
                                    children: "Animal Photo"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 291,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "w-full border-2 border-dashed border-gray-200 rounded-xl py-5 flex flex-col items-center gap-1.5 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] transition-colors cursor-pointer bg-gray-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 295,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-medium",
                                            children: image ? image.name : "Click to upload photo"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 296,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            accept: "image/*",
                                            className: "hidden",
                                            onChange: (e)=>setImage(e.target.files?.[0] ?? null)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 299,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 294,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 290,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    className: "flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 310,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: !isValid || loading,
                                    className: `flex-1 py-2.5 rounded-xl text-xs font-semibold text-white transition-colors ${isValid && !loading ? "bg-[#4CAF50] hover:bg-[#43a047]" : "bg-[#a5d6a7] cursor-not-allowed"}`,
                                    children: loading ? "Adding..." : "Add Animal"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 317,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 309,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                    lineNumber: 167,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
            lineNumber: 155,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
_s(AddAnimalModal, "TV3UohZcaQGEGJJFE2Z1iV+NTus=");
_c1 = AddAnimalModal;
// ── Filter Panel ──────────────────────────────────────────────────────────────
const EMPTY_FILTERS = {
    healthStatus: "",
    status: "",
    sex: "",
    species: ""
};
function FilterPanel({ filters, onChange, onApply, onClear, speciesList }) {
    _s1();
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(filters);
    const set = (k)=>(e)=>setDraft((f)=>({
                    ...f,
                    [k]: e.target.value
                }));
    const activeCount = Object.values(filters).filter(Boolean).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute right-0 top-10 z-30 w-72 bg-white rounded-xl border border-gray-200 shadow-xl p-4 space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-bold text-gray-800",
                        children: "Filter Animals"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 348,
                        columnNumber: 9
                    }, this),
                    activeCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setDraft(EMPTY_FILTERS);
                            onClear();
                        },
                        className: "text-[10px] text-red-400 hover:text-red-600 font-medium",
                        children: "Clear all"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 350,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 347,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-[10px] font-semibold text-gray-500 mb-1",
                        children: "Health Status"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 364,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: draft.healthStatus,
                        onChange: set("healthStatus"),
                        className: "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] appearance-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "All"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 372,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "healthy",
                                children: "Healthy"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 373,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "sick",
                                children: "Sick"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 374,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "under_treatment",
                                children: "Under Treatment"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 375,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 367,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 363,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-[10px] font-semibold text-gray-500 mb-1",
                        children: "Status"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 381,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: draft.status,
                        onChange: set("status"),
                        className: "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] appearance-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "All"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 389,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "active",
                                children: "Active"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 390,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "inactive",
                                children: "Inactive"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 391,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 384,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 380,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-[10px] font-semibold text-gray-500 mb-1",
                        children: "Sex"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 397,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: draft.sex,
                        onChange: set("sex"),
                        className: "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] appearance-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "All"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 405,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "male",
                                children: "Male"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 406,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "female",
                                children: "Female"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 407,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 396,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-[10px] font-semibold text-gray-500 mb-1",
                        children: "Species"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 413,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: draft.species,
                        onChange: set("species"),
                        className: "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50] appearance-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "All"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 421,
                                columnNumber: 11
                            }, this),
                            speciesList.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: s.id,
                                    children: s.name
                                }, s.id, false, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 423,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 416,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 412,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onApply(draft),
                className: "w-full py-2 rounded-lg bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition-colors",
                children: "Apply Filters"
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 431,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
        lineNumber: 346,
        columnNumber: 5
    }, this);
}
_s1(FilterPanel, "2IryEPyZ9y5thH9CIUb8kN8Fjw4=");
_c2 = FilterPanel;
// ── Report Issue Modal ────────────────────────────────────────────────────────
function ReportIssueModal({ animal, onClose, onSuccess }) {
    _s2();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: `Health concern — ${animal.tagNumber ?? animal.publicId?.slice(0, 8)}`,
        description: "",
        priority: "medium"
    });
    const [image, setImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const set = (k)=>(e)=>setForm((f)=>({
                    ...f,
                    [k]: e.target.value
                }));
    const isValid = form.title && form.description;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = new FormData();
            data.append("title", form.title);
            data.append("description", form.description);
            data.append("category", "health");
            data.append("priority", form.priority);
            data.append("entityType", "animal");
            data.append("entityPublicId", animal.publicId ?? "");
            if (image) data.append("image", image);
            const res = await fetch(`${API}/ranches/${getSlug()}/concerns`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
                body: data
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message ?? "Failed to report issue");
            }
            onSuccess?.();
            onClose();
        } catch (err) {
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-6 py-4 border-b border-gray-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-bold text-gray-800",
                                    children: "Report Animal Issue"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 493,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-400 mt-0.5",
                                    children: [
                                        animal.tagNumber ?? "—",
                                        " · ",
                                        animal.species?.name ?? "—",
                                        " ·",
                                        " ",
                                        animal.healthStatus ?? "—"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 496,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 492,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-gray-400 hover:text-gray-600",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 505,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 501,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                    lineNumber: 491,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "px-6 py-5 space-y-4",
                    children: [
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3 rounded-xl bg-red-50 text-xs text-red-500",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 511,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[#f0fdf4] border border-[#d1fae5] rounded-xl px-4 py-3 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-semibold text-[#4CAF50] mb-1",
                                    children: "Reporting for:"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 518,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-2 text-gray-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-400",
                                                    children: "Tag"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                                    lineNumber: 521,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium",
                                                    children: animal.tagNumber ?? "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                                    lineNumber: 522,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 520,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-400",
                                                    children: "Species"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                                    lineNumber: 525,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium capitalize",
                                                    children: animal.species?.name ?? "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                                    lineNumber: 526,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 524,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-400",
                                                    children: "Health"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                                    lineNumber: 531,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium capitalize",
                                                    children: animal.healthStatus ?? "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                                    lineNumber: 532,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 530,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 519,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 517,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-xs font-semibold text-gray-700 mb-1.5",
                                    children: [
                                        "Title ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-400",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 542,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 541,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: form.title,
                                    onChange: set("title"),
                                    className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4CAF50]"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 544,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 540,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-xs font-semibold text-gray-700 mb-1.5",
                                    children: [
                                        "Description ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-400",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 554,
                                            columnNumber: 27
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 553,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: form.description,
                                    onChange: set("description"),
                                    rows: 3,
                                    placeholder: "Describe the issue in detail — symptoms, behaviour, anything unusual...",
                                    className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] resize-none"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 556,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 552,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-xs font-semibold text-gray-700 mb-2",
                                    children: "Priority"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 567,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        "low",
                                        "medium",
                                        "high",
                                        "urgent"
                                    ].map((p)=>{
                                        const cls = {
                                            low: "text-gray-500 border-gray-200",
                                            medium: "text-amber-500 border-amber-200",
                                            high: "text-orange-500 border-orange-200",
                                            urgent: "text-red-500 border-red-200"
                                        }[p];
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setForm((f)=>({
                                                        ...f,
                                                        priority: p
                                                    })),
                                            className: `flex-1 py-2 rounded-xl border text-xs font-semibold capitalize transition-all ${form.priority === p ? `${cls} bg-opacity-10 ring-2 ring-current` : "border-gray-200 text-gray-400"}`,
                                            children: p
                                        }, p, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 579,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 570,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 566,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-xs font-semibold text-gray-700 mb-1.5",
                                    children: "Attach Photo (optional)"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 598,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "w-full border-2 border-dashed border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 text-gray-400 hover:border-[#4CAF50] hover:text-[#4CAF50] cursor-pointer bg-gray-50 text-xs font-medium",
                                    children: [
                                        "📷 ",
                                        image ? image.name : "Click to attach photo",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            accept: "image/*",
                                            className: "hidden",
                                            onChange: (e)=>setImage(e.target.files?.[0] ?? null)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 603,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 601,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 597,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 pt-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    className: "flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 613,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: !isValid || loading,
                                    className: `flex-1 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 ${isValid && !loading ? "bg-[#4CAF50] hover:bg-[#43a047]" : "bg-[#a5d6a7] cursor-not-allowed"}`,
                                    children: [
                                        loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            size: 12,
                                            className: "animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                            lineNumber: 629,
                                            columnNumber: 27
                                        }, this),
                                        loading ? "Submitting..." : "Submit Report"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                    lineNumber: 620,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                            lineNumber: 612,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                    lineNumber: 509,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
            lineNumber: 490,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
        lineNumber: 489,
        columnNumber: 5
    }, this);
}
_s2(ReportIssueModal, "pSvgKXvRk7zuzHaXeqdlQy2HGvY=");
_c3 = ReportIssueModal;
// ── Livestock Card ────────────────────────────────────────────────────────────
function LivestockCard({ animal, onClick, onReportIssue }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onClick,
        className: "bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3 cursor-pointer hover:border-[#4CAF50] hover:shadow-md transition-all",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-7 h-7 bg-[#f9f9f9] rounded flex justify-center items-center text-base",
                        children: "🐄"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 649,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-bold text-gray-800",
                        children: animal.tagNumber ?? animal.publicId?.slice(0, 8) ?? "—"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 652,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-auto text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full capitalize",
                        children: animal.species?.name ?? "—"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 655,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 648,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-x-4 gap-y-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-gray-400",
                                children: "Sex"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 663,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold text-gray-800 capitalize",
                                children: animal.sex ?? "—"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 664,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 662,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-gray-400",
                                children: "Health Status"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 669,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `flex items-center gap-1 text-xs font-semibold capitalize ${animal.healthStatus === "healthy" ? "text-[#4CAF50]" : "text-amber-500"}`,
                                children: [
                                    animal.healthStatus === "healthy" ? "✅" : "⚠️",
                                    " ",
                                    animal.healthStatus ?? "—"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 670,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 668,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-gray-400",
                                children: "Breed"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 682,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold text-gray-800",
                                children: animal.breed ?? "—"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 683,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 681,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-gray-400",
                                children: "Weight"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 688,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold text-gray-800",
                                children: animal.weight ? `${animal.weight} kg` : "—"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 689,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 687,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-gray-400",
                                children: "Age"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 694,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold text-gray-800",
                                children: calcAge(animal.dateOfBirth)
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 695,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 693,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-gray-400",
                                children: "Status"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 700,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold text-gray-800 capitalize",
                                children: animal.status ?? "—"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 701,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 699,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 661,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between pt-1 border-t border-gray-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] text-gray-400 truncate max-w-[60%]",
                        children: [
                            "RFID:",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-600 font-medium",
                                children: animal.rfidTag ?? "—"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 711,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 709,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.stopPropagation();
                            onReportIssue?.(animal);
                        },
                        className: "flex items-center gap-1 text-xs font-semibold text-[#4CAF50] hover:text-[#43a047] transition-colors",
                        children: [
                            "Report Issue ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                size: 12
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 722,
                                columnNumber: 24
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 715,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 708,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
        lineNumber: 643,
        columnNumber: 5
    }, this);
}
_c4 = LivestockCard;
// ── Pagination ────────────────────────────────────────────────────────────────
function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onPageChange(page - 1),
                disabled: page === 1,
                className: "p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                    lineNumber: 740,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 735,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-gray-500",
                children: [
                    "Page ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold text-gray-800",
                        children: page
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 743,
                        columnNumber: 14
                    }, this),
                    " of",
                    " ",
                    totalPages
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 742,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onPageChange(page + 1),
                disabled: page === totalPages,
                className: "p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                    lineNumber: 751,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 746,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
        lineNumber: 734,
        columnNumber: 5
    }, this);
}
_c5 = Pagination;
function LivestockPage({ canAdd = true, mobileCols = false }) {
    _s3();
    const [animals, setAnimals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pagination, setPagination] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        page: 1,
        limit: 50,
        total: 0,
        totalPages: 1
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedCow, setSelectedCow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reportAnimal, setReportAnimal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [showFilter, setShowFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(EMPTY_FILTERS);
    const [speciesList, setSpeciesList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Fetch species once for the filter dropdown
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LivestockPage.useEffect": ()=>{
            const load = {
                "LivestockPage.useEffect.load": async ()=>{
                    try {
                        const res = await fetch(`${API}/species`, {
                            headers: {
                                Authorization: `Bearer ${getToken()}`
                            }
                        });
                        if (!res.ok) return;
                        const data = await res.json();
                        setSpeciesList(data?.data?.species ?? []);
                    } catch  {}
                }
            }["LivestockPage.useEffect.load"];
            load();
        }
    }["LivestockPage.useEffect"], []);
    // Derived: apply filters locally
    const filteredAnimals = animals.filter((a)=>{
        if (filters.healthStatus && a.healthStatus !== filters.healthStatus) return false;
        if (filters.status && a.status !== filters.status) return false;
        if (filters.sex && a.sex !== filters.sex) return false;
        if (filters.species && a.species?.id !== filters.species) return false;
        return true;
    });
    const activeFilterCount = Object.values(filters).filter(Boolean).length;
    const fetchAnimals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LivestockPage.useCallback[fetchAnimals]": async (p = 1)=>{
            setLoading(true);
            setError("");
            try {
                const slug = getSlug();
                if (!slug) throw new Error("Ranch not found. Please log out and log in again.");
                const res = await fetch(`${API}/ranches/${slug}/animals?page=${p}&limit=50`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                });
                if (!res.ok) throw new Error("Failed to fetch animals");
                const json = await res.json();
                console.log("✅ Animals API raw response keys:", Object.keys(json));
                console.log("✅ Animals data keys:", json?.data ? Object.keys(json.data) : "no data key");
                console.log("✅ Animals pagination:", json?.data?.pagination ?? json?.data?.meta ?? json?.pagination ?? json?.meta ?? "NOT FOUND");
                let list = [];
                let meta = {
                    page: p,
                    limit: 50,
                    total: 0,
                    totalPages: 1
                };
                if (Array.isArray(json?.data?.animals)) {
                    list = json.data.animals;
                    // Actual shape: { data: { animals: [] }, meta: { pagination: {}, filters: {} } }
                    meta = json?.meta?.pagination ?? json.data?.pagination ?? json.data?.meta ?? json?.pagination ?? {
                        ...meta,
                        total: list.length
                    };
                } else if (Array.isArray(json?.animals)) {
                    list = json.animals;
                    meta = json?.meta?.pagination ?? json?.pagination ?? {
                        ...meta,
                        total: list.length
                    };
                } else if (Array.isArray(json?.data)) {
                    list = json.data;
                    meta = json?.meta?.pagination ?? json?.pagination ?? {
                        ...meta,
                        total: list.length
                    };
                }
                // Normalise field names — API may use totalCount, count, etc.
                meta = {
                    page: meta.page ?? meta.currentPage ?? p,
                    limit: meta.limit ?? meta.pageSize ?? 50,
                    total: meta.total ?? meta.totalCount ?? meta.count ?? list.length,
                    totalPages: meta.totalPages ?? meta.pages ?? Math.ceil((meta.total ?? list.length) / (meta.limit ?? 50))
                };
                console.log("✅ Animals parsed:", list.length, "| total:", meta.total, "| pages:", meta.totalPages);
                setAnimals(list);
                setPagination(meta);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally{
                setLoading(false);
            }
        }
    }["LivestockPage.useCallback[fetchAnimals]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LivestockPage.useEffect": ()=>{
            fetchAnimals(page);
        }
    }["LivestockPage.useEffect"], [
        page,
        fetchAnimals
    ]);
    const handlePageChange = (newPage)=>{
        setPage(newPage);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    if (selectedCow) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dashboard$2f$pages$2f$owner$2f$CowDetailsPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            cow: selectedCow,
            onBack: ()=>setSelectedCow(null)
        }, void 0, false, {
            fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
            lineNumber: 892,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex-1 overflow-y-auto px-6 py-5 space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-base font-bold text-gray-800",
                                children: "Livestock Overview"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 901,
                                columnNumber: 11
                            }, this),
                            !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mt-0.5",
                                children: [
                                    activeFilterCount > 0 ? `${filteredAnimals.length} filtered` : `${animals.length} of ${pagination.total > 0 ? pagination.total : animals.length} animals`,
                                    activeFilterCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#4CAF50] font-medium",
                                        children: [
                                            " ",
                                            "· ",
                                            activeFilterCount,
                                            " filter",
                                            activeFilterCount > 1 ? "s" : "",
                                            " ",
                                            "active"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                        lineNumber: 910,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 905,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 900,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowFilter((v)=>!v),
                                        className: `flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg border transition-colors ${activeFilterCount > 0 ? "border-[#4CAF50] text-[#4CAF50] bg-[#f0fdf4]" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`,
                                        children: [
                                            "Filter",
                                            activeFilterCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-4 h-4 rounded-full bg-[#4CAF50] text-white text-[9px] flex items-center justify-center font-bold",
                                                children: activeFilterCount
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                                lineNumber: 932,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                size: 13,
                                                className: showFilter ? "rotate-180 transition-transform" : "transition-transform"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                                lineNumber: 936,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                        lineNumber: 922,
                                        columnNumber: 13
                                    }, this),
                                    showFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterPanel, {
                                        filters: filters,
                                        speciesList: speciesList,
                                        onApply: (draft)=>{
                                            setFilters(draft);
                                            setShowFilter(false);
                                        },
                                        onClear: ()=>setFilters(EMPTY_FILTERS)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                        lineNumber: 947,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 921,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors",
                                children: [
                                    "Export as ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        size: 13
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                        lineNumber: 960,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 959,
                                columnNumber: 11
                            }, this),
                            canAdd && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowModal(true),
                                className: "flex items-center gap-1.5 bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 13
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                        lineNumber: 967,
                                        columnNumber: 15
                                    }, this),
                                    " Add Animal"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 963,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 919,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 899,
                columnNumber: 7
            }, this),
            showFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-20",
                onClick: ()=>setShowFilter(false)
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 975,
                columnNumber: 9
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4",
                children: Array.from({
                    length: 8
                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-xl border border-gray-100 p-4 h-48 animate-pulse",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-3 bg-gray-100 rounded w-2/3 mb-3"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 989,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-2",
                                children: Array.from({
                                    length: 4
                                }).map((_, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-8 bg-gray-100 rounded"
                                    }, j, false, {
                                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                        lineNumber: 992,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 990,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 985,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 983,
                columnNumber: 9
            }, this),
            !loading && error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center py-16 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-red-500",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 1003,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>fetchAnimals(page),
                        className: "text-xs text-[#4CAF50] font-medium hover:underline",
                        children: "Try again"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 1004,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 1002,
                columnNumber: 9
            }, this),
            !loading && !error && filteredAnimals.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center py-16 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-5xl",
                        children: "🐄"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 1016,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500",
                        children: activeFilterCount > 0 ? "No animals match the selected filters." : "No animals found in this ranch."
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 1017,
                        columnNumber: 11
                    }, this),
                    activeFilterCount > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilters(EMPTY_FILTERS),
                        className: "text-xs text-[#4CAF50] font-medium hover:underline",
                        children: "Clear filters"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 1023,
                        columnNumber: 13
                    }, this) : canAdd && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowModal(true),
                        className: "flex items-center gap-1.5 bg-[#4CAF50] text-white text-xs font-semibold px-4 py-2 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 1035,
                                columnNumber: 17
                            }, this),
                            " Add First Animal"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 1031,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 1015,
                columnNumber: 9
            }, this),
            !loading && !error && filteredAnimals.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: mobileCols ? "grid grid-cols-1 gap-5" : "grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5",
                        children: filteredAnimals.map((animal, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LivestockCard, {
                                animal: animal,
                                onClick: ()=>setSelectedCow(animal),
                                onReportIssue: (a)=>setReportAnimal(a)
                            }, animal.publicId ?? i, false, {
                                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                                lineNumber: 1053,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 1045,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pagination, {
                        page: pagination.page,
                        totalPages: pagination.totalPages,
                        onPageChange: handlePageChange
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                        lineNumber: 1061,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AddAnimalModal, {
                onClose: ()=>setShowModal(false),
                onSuccess: ()=>fetchAnimals(page)
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 1071,
                columnNumber: 9
            }, this),
            reportAnimal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReportIssueModal, {
                animal: reportAnimal,
                onClose: ()=>setReportAnimal(null),
                onSuccess: ()=>setReportAnimal(null)
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
                lineNumber: 1078,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx",
        lineNumber: 897,
        columnNumber: 5
    }, this);
}
_s3(LivestockPage, "nHO9bI6dUjL13y/1lLwYWBJ5TZI=");
_c6 = LivestockPage;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "StatusBadge");
__turbopack_context__.k.register(_c1, "AddAnimalModal");
__turbopack_context__.k.register(_c2, "FilterPanel");
__turbopack_context__.k.register(_c3, "ReportIssueModal");
__turbopack_context__.k.register(_c4, "LivestockCard");
__turbopack_context__.k.register(_c5, "Pagination");
__turbopack_context__.k.register(_c6, "LivestockPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/dashboard/pages/workers/LivestockRecords.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LivestockRecords
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dashboard$2f$pages$2f$owner$2f$LivestckOverview$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/dashboard/pages/owner/LivestckOverview.jsx [app-client] (ecmascript)");
"use client";
;
;
function LivestockRecords() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dashboard$2f$pages$2f$owner$2f$LivestckOverview$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        canAdd: false,
        mobileCols: true
    }, void 0, false, {
        fileName: "[project]/app/components/dashboard/pages/workers/LivestockRecords.jsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
_c = LivestockRecords;
var _c;
__turbopack_context__.k.register(_c, "LivestockRecords");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/dashboard/pages/workers/Notifications.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkerNotificationsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check-check.js [app-client] (ecmascript) <export default as CheckCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-check-big.js [app-client] (ecmascript) <export default as CheckSquare>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const API = ("TURBOPACK compile-time value", "https://smartruga-api-d11b7da5a7fa.herokuapp.com/api/v1");
function getSlug() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem("sr_slug") ?? "";
}
function getToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem("sr_token") ?? "";
}
function formatTime(str) {
    if (!str) return "—";
    const d = new Date(str);
    return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }) + " | " + d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
    });
}
function alertIcon(alert) {
    const t = (alert.alertType ?? alert.type ?? "").toLowerCase();
    if (t.includes("task")) return {
        icon: "✅",
        bg: "bg-[#f0fdf4]"
    };
    if (t.includes("health")) return {
        icon: "❤️",
        bg: "bg-red-50"
    };
    if (t.includes("concern")) return {
        icon: "⚠️",
        bg: "bg-orange-50"
    };
    if (t.includes("vaccination")) return {
        icon: "💉",
        bg: "bg-blue-50"
    };
    return {
        icon: "🔔",
        bg: "bg-gray-100"
    };
}
function isRead(alert) {
    return alert.isRead === true || alert.read === true || !!alert.readAt;
}
function WorkerNotificationsPage() {
    _s();
    const [alerts, setAlerts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [marking, setMarking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchAlerts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkerNotificationsPage.useCallback[fetchAlerts]": async ()=>{
            setLoading(true);
            setError("");
            try {
                const res = await fetch(`${API}/ranches/${getSlug()}/alerts`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                });
                if (!res.ok) throw new Error("Failed to fetch notifications");
                const json = await res.json();
                const list = json?.data?.alerts ?? json?.alerts ?? (Array.isArray(json?.data) ? json.data : []);
                setAlerts(list.map({
                    "WorkerNotificationsPage.useCallback[fetchAlerts]": (a, i)=>({
                            ...a,
                            _key: a.publicId ?? `alert-${i}`
                        })
                }["WorkerNotificationsPage.useCallback[fetchAlerts]"]));
                setSelected(new Set());
            } catch (err) {
                setError(err.message);
            } finally{
                setLoading(false);
            }
        }
    }["WorkerNotificationsPage.useCallback[fetchAlerts]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkerNotificationsPage.useEffect": ()=>{
            fetchAlerts();
        }
    }["WorkerNotificationsPage.useEffect"], [
        fetchAlerts
    ]);
    const toggleSelect = (id)=>{
        if (!id) return;
        setSelected((prev)=>{
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };
    const markOneRead = async (alertId)=>{
        if (!alertId || marking) return;
        setMarking(true);
        try {
            await fetch(`${API}/ranches/${getSlug()}/alerts/${alertId}/read`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            setAlerts((prev)=>prev.map((a)=>a.publicId === alertId ? {
                        ...a,
                        isRead: true
                    } : a));
            setSelected((prev)=>{
                const n = new Set(prev);
                n.delete(alertId);
                return n;
            });
        } catch  {
            fetchAlerts();
        } finally{
            setMarking(false);
        }
    };
    const markSelectedRead = async ()=>{
        const ids = [
            ...selected
        ].filter(Boolean);
        if (!ids.length || marking) return;
        setMarking(true);
        try {
            await fetch(`${API}/ranches/${getSlug()}/alerts/read`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    alertIds: ids
                })
            });
            setAlerts((prev)=>prev.map((a)=>ids.includes(a.publicId) ? {
                        ...a,
                        isRead: true
                    } : a));
            setSelected(new Set());
        } catch  {
            fetchAlerts();
        } finally{
            setMarking(false);
        }
    };
    const markAllRead = async ()=>{
        if (marking) return;
        setMarking(true);
        try {
            await fetch(`${API}/ranches/${getSlug()}/alerts/read-all`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            setAlerts((prev)=>prev.map((a)=>({
                        ...a,
                        isRead: true
                    })));
            setSelected(new Set());
        } catch  {
            fetchAlerts();
        } finally{
            setMarking(false);
        }
    };
    const unreadAlerts = alerts.filter((a)=>!isRead(a));
    const unreadCount = unreadAlerts.length;
    const unreadIds = unreadAlerts.map((a)=>a.publicId).filter(Boolean);
    const allUnreadSelected = unreadIds.length > 0 && unreadIds.every((id)=>selected.has(id));
    const selectedCount = selected.size;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-4 pb-8 space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-base font-bold text-gray-800",
                                children: "Notifications"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[#4CAF50] font-medium mt-0.5",
                                children: [
                                    unreadCount,
                                    " unread"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                lineNumber: 167,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            selectedCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: markSelectedRead,
                                disabled: marking,
                                className: "flex items-center gap-1 text-xs text-white bg-[#4CAF50] px-3 py-1.5 rounded-full font-semibold disabled:opacity-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        size: 11
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                        lineNumber: 179,
                                        columnNumber: 15
                                    }, this),
                                    " Mark ",
                                    selectedCount,
                                    " Read"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                lineNumber: 174,
                                columnNumber: 13
                            }, this),
                            unreadCount > 0 && selectedCount === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: markAllRead,
                                disabled: marking,
                                className: "flex items-center gap-1 text-xs text-[#4CAF50] border border-[#4CAF50] px-3 py-1.5 rounded-full font-semibold disabled:opacity-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__["CheckCheck"], {
                                        size: 11
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                        lineNumber: 188,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    marking ? "Marking..." : "All Read"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            !loading && unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setSelected(allUnreadSelected ? new Set() : new Set(unreadIds)),
                className: "flex items-center gap-1.5 text-xs text-gray-500 font-medium",
                children: [
                    allUnreadSelected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"], {
                        size: 14,
                        className: "text-[#4CAF50]"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                        lineNumber: 203,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                        size: 14
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                        lineNumber: 205,
                        columnNumber: 13
                    }, this),
                    allUnreadSelected ? "Deselect all" : `Select all unread (${unreadCount})`
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                lineNumber: 196,
                columnNumber: 9
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    1,
                    2,
                    3
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl px-4 py-3 animate-pulse flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-9 h-9 bg-gray-100 rounded-full shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                lineNumber: 221,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-3 bg-gray-100 rounded w-2/3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                        lineNumber: 223,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-2.5 bg-gray-100 rounded w-1/2"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                        lineNumber: 224,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                lineNumber: 222,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                        lineNumber: 217,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                lineNumber: 215,
                columnNumber: 9
            }, this),
            !loading && error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-6 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-red-500 mb-2",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                        lineNumber: 234,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: fetchAlerts,
                        className: "text-xs text-[#4CAF50]",
                        children: "Try again"
                    }, void 0, false, {
                        fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                        lineNumber: 235,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                lineNumber: 233,
                columnNumber: 9
            }, this),
            !loading && !error && alerts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-6 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-400",
                    children: "No notifications yet."
                }, void 0, false, {
                    fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                    lineNumber: 244,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                lineNumber: 243,
                columnNumber: 9
            }, this),
            !loading && !error && alerts.map((alert)=>{
                const { icon, bg } = alertIcon(alert);
                const read = isRead(alert);
                const sel = selected.has(alert.publicId);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `bg-white rounded-2xl border shadow-sm px-4 py-3 transition-all ${read ? "border-gray-100 opacity-80" : "border-l-4 border-l-[#4CAF50] border-gray-100"} ${sel ? "ring-2 ring-[#4CAF50]/30" : ""}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3",
                        children: [
                            !read ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>toggleSelect(alert.publicId),
                                className: "mt-0.5 shrink-0 text-gray-300 hover:text-[#4CAF50] transition-colors",
                                children: sel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"], {
                                    size: 15,
                                    className: "text-[#4CAF50]"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                    lineNumber: 272,
                                    columnNumber: 23
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                    size: 15
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                    lineNumber: 274,
                                    columnNumber: 23
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                lineNumber: 267,
                                columnNumber: 19
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-4 shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                lineNumber: 278,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-9 h-9 rounded-full ${bg} flex items-center justify-center shrink-0`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm",
                                    children: icon
                                }, void 0, false, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                    lineNumber: 285,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                lineNumber: 282,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-semibold text-gray-800 truncate",
                                                    children: alert.title ?? alert.message ?? "Notification"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                                    lineNumber: 292,
                                                    columnNumber: 23
                                                }, this),
                                                alert.message && alert.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-400 truncate mt-0.5",
                                                    children: alert.message
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                                    lineNumber: 296,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-gray-400 mt-1",
                                                    children: formatTime(alert.createdAt)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                                    lineNumber: 300,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                            lineNumber: 291,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col items-end gap-1.5 shrink-0",
                                            children: [
                                                !read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-2 h-2 rounded-full bg-[#4CAF50]"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                                    lineNumber: 306,
                                                    columnNumber: 25
                                                }, this),
                                                !read && alert.publicId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>markOneRead(alert.publicId),
                                                    className: "text-[10px] text-[#4CAF50] border border-[#4CAF50] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap",
                                                    children: "Mark Read"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                                    lineNumber: 309,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                            lineNumber: 304,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                    lineNumber: 290,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                                lineNumber: 289,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                        lineNumber: 264,
                        columnNumber: 15
                    }, this)
                }, alert._key, false, {
                    fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
                    lineNumber: 256,
                    columnNumber: 13
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/dashboard/pages/workers/Notifications.jsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
_s(WorkerNotificationsPage, "Jvu1ZBc4Dt6od8Ur30QdpgO73RI=");
_c = WorkerNotificationsPage;
var _c;
__turbopack_context__.k.register(_c, "WorkerNotificationsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/dashboard/pages/workers/WorkerDashboard.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkerDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$beef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Beef$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/beef.js [app-client] (ecmascript) <export default as Beef>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2d$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PackageSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package-search.js [app-client] (ecmascript) <export default as PackageSearch>");
(()=>{
    const e = new Error("Cannot find module '../shared/MobileShell'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dashboard$2f$pages$2f$workers$2f$WorkerDashboardHome$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/dashboard/pages/workers/WorkerDashboardHome.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dashboard$2f$pages$2f$workers$2f$WorkerTask$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/dashboard/pages/workers/WorkerTask.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dashboard$2f$pages$2f$workers$2f$LivestockRecords$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/dashboard/pages/workers/LivestockRecords.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dashboard$2f$pages$2f$workers$2f$Notifications$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/dashboard/pages/workers/Notifications.jsx [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../shared/Settings'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../shared/MyRequestsPage'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
"use client";
;
;
;
;
;
;
;
;
;
const workerNav = [
    {
        label: "Dashboard",
        key: "dashboard",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
    },
    {
        label: "Task History",
        key: "history",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"]
    },
    {
        label: "Livestock Records",
        key: "livestock",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$beef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Beef$3e$__["Beef"]
    },
    {
        label: "My Requests",
        key: "requests",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2d$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PackageSearch$3e$__["PackageSearch"]
    },
    {
        label: "Notifications",
        key: "notifications",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"]
    },
    {
        label: "Settings",
        key: "settings",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"]
    }
];
const pageMap = {
    dashboard: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dashboard$2f$pages$2f$workers$2f$WorkerDashboardHome$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    history: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dashboard$2f$pages$2f$workers$2f$WorkerTask$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    livestock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dashboard$2f$pages$2f$workers$2f$LivestockRecords$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    requests: MyRequestsPage,
    notifications: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$dashboard$2f$pages$2f$workers$2f$Notifications$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    settings: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-4 py-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SharedSettingsPage, {}, void 0, false, {
                fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboard.jsx",
                lineNumber: 36,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboard.jsx",
            lineNumber: 35,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
};
function WorkerDashboard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileShell, {
        navItems: workerNav,
        pageMap: pageMap,
        defaultPage: "dashboard"
    }, void 0, false, {
        fileName: "[project]/app/components/dashboard/pages/workers/WorkerDashboard.jsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c = WorkerDashboard;
var _c;
__turbopack_context__.k.register(_c, "WorkerDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_dashboard_pages_432679cc._.js.map