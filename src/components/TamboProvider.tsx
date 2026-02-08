"use client";

import React, { createContext, useContext, useMemo, ReactNode } from "react";

/* ---------------- TYPES ---------------- */

interface TamboContextValue {
  appName: string;
  version: string;
  debug: boolean;
}

interface TamboProviderProps {
  children: ReactNode;
  appName?: string;
  version?: string;
  debug?: boolean;
}

/* ---------------- CONTEXT ---------------- */

const TamboContext = createContext<TamboContextValue | null>(null);

/* ---------------- PROVIDER ---------------- */

export function TamboProvider({
  children,
  appName = "Tambo App",
  version = "0.1.0",
  debug = false,
}: TamboProviderProps) {
  const value = useMemo(
    () => ({
      appName,
      version,
      debug,
    }),
    [appName, version, debug],
  );

  return (
    <TamboContext.Provider value={value}>{children}</TamboContext.Provider>
  );
}

/* ---------------- HOOK ---------------- */

export function useTambo() {
  const ctx = useContext(TamboContext);

  if (!ctx) {
    throw new Error("useTambo must be used within a <TamboProvider>");
  }

  return ctx;
}
