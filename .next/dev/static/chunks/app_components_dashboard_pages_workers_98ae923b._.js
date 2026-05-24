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
(()=>{
    const e = new Error("Cannot find module './WorkerLivestockRecordsPage'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module './NotificationsPage'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../shared/SharedSettingsPage'");
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
    livestock: WorkerLivestockRecordsPage,
    requests: MyRequestsPage,
    notifications: WorkerNotificationsPage,
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

//# sourceMappingURL=app_components_dashboard_pages_workers_98ae923b._.js.map