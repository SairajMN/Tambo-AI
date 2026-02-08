(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/TamboProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TamboProvider",
    ()=>TamboProvider,
    "useTambo",
    ()=>useTambo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const TamboContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createContext(null);
const useTambo = ()=>{
    _s();
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useContext(TamboContext);
    if (!context) {
        throw new Error("useTambo must be used within a TamboProvider");
    }
    return context;
};
_s(useTambo, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const TamboProvider = ({ children })=>{
    _s1();
    const [components, setComponents] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState({});
    const registerComponent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "TamboProvider.useCallback[registerComponent]": (definition)=>{
            setComponents({
                "TamboProvider.useCallback[registerComponent]": (prev)=>({
                        ...prev,
                        [definition.name]: definition
                    })
            }["TamboProvider.useCallback[registerComponent]"]);
        }
    }["TamboProvider.useCallback[registerComponent]"], []);
    const getComponent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "TamboProvider.useCallback[getComponent]": (name)=>{
            return components[name] || null;
        }
    }["TamboProvider.useCallback[getComponent]"], [
        components
    ]);
    const renderComponent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "TamboProvider.useCallback[renderComponent]": (name, props = {})=>{
            const componentDef = getComponent(name);
            if (!componentDef) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-red-500",
                    children: [
                        'Component "',
                        name,
                        '" not found'
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/TamboProvider.tsx",
                    lineNumber: 63,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            }
            const Component = componentDef.component;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
                ...componentDef.defaultProps,
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/TamboProvider.tsx",
                lineNumber: 67,
                columnNumber: 14
            }, ("TURBOPACK compile-time value", void 0));
        }
    }["TamboProvider.useCallback[renderComponent]"], [
        getComponent
    ]);
    const listComponents = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "TamboProvider.useCallback[listComponents]": ()=>{
            return Object.keys(components);
        }
    }["TamboProvider.useCallback[listComponents]"], [
        components
    ]);
    const value = {
        components,
        registerComponent,
        getComponent,
        renderComponent,
        listComponents
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TamboContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/TamboProvider.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(TamboProvider, "FCDIzPWPe20SJBWNINa54efLVoQ=");
_c = TamboProvider;
var _c;
__turbopack_context__.k.register(_c, "TamboProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_TamboProvider_tsx_33d46b66._.js.map