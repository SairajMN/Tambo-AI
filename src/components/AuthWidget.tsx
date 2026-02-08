"use client";

import React, { useState } from "react";

type AuthStatus = "loggedOut" | "loggingIn" | "loggedIn" | "error";

interface AuthWidgetProps {
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
  userLabel?: string;
}

export function AuthWidget({
  onLogin,
  onLogout,
  userLabel = "Authenticated User",
}: AuthWidgetProps) {
  const [status, setStatus] = useState<AuthStatus>("loggedOut");

  async function handleLogin() {
    if (status !== "loggedOut") return;
    setStatus("loggingIn");

    try {
      await onLogin();
      setStatus("loggedIn");
    } catch {
      setStatus("error");
    }
  }

  async function handleLogout() {
    if (status !== "loggedIn") return;

    try {
      await onLogout();
      setStatus("loggedOut");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>Authentication</div>

      <div style={styles.body}>
        {status === "loggedOut" && (
          <div style={styles.state}>You are not logged in</div>
        )}

        {status === "loggingIn" && (
          <div style={styles.loading}>Signing in…</div>
        )}

        {status === "loggedIn" && <div style={styles.success}>{userLabel}</div>}

        {status === "error" && (
          <div style={styles.error}>Authentication failed</div>
        )}
      </div>

      {status !== "loggedIn" ? (
        <button style={styles.primaryButton} onClick={handleLogin}>
          Login
        </button>
      ) : (
        <button style={styles.secondaryButton} onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    borderRadius: 12,
    border: "1px solid #1e293b",
    background: "#020617",
    overflow: "hidden",
    animation: "fadeIn 0.3s ease-out",
  },
  header: {
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 600,
    borderBottom: "1px solid #1e293b",
  },
  body: {
    padding: 14,
    minHeight: 80,
  },
  state: {
    fontSize: 13,
    color: "#94a3b8",
  },
  loading: {
    fontSize: 13,
    color: "#38bdf8",
    animation: "pulse 1.4s infinite",
  },
  success: {
    fontSize: 13,
    color: "#22c55e",
    fontWeight: 500,
  },
  error: {
    fontSize: 13,
    color: "#ef4444",
  },
  primaryButton: {
    width: "100%",
    padding: "10px 0",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 500,
  },
  secondaryButton: {
    width: "100%",
    padding: "10px 0",
    border: "none",
    background: "#334155",
    color: "#fff",
    cursor: "pointer",
  },
};

/* ---------------- ANIMATIONS ---------------- */

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0% { opacity: .4 }
      50% { opacity: 1 }
      100% { opacity: .4 }
    }
  `;
  document.head.appendChild(style);
}
