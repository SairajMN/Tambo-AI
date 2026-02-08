"use client";

import React, { useState } from "react";

type DeployState = "idle" | "deploying" | "success" | "error";

interface DeployStatusProps {
  onDeploy: () => Promise<void>;
}

export function DeployStatus({ onDeploy }: DeployStatusProps) {
  const [state, setState] = useState<DeployState>("idle");

  async function handleDeploy() {
    if (state === "deploying") return;

    setState("deploying");
    try {
      await onDeploy();
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>Deployment</div>

      <div style={styles.body}>
        {state === "idle" && <div style={styles.neutral}>Ready to deploy</div>}
        {state === "deploying" && (
          <div style={styles.deploying}>Deploying…</div>
        )}
        {state === "success" && (
          <div style={styles.success}>Deployment successful</div>
        )}
        {state === "error" && <div style={styles.error}>Deployment failed</div>}
      </div>

      <button
        onClick={handleDeploy}
        disabled={state === "deploying"}
        style={{
          ...styles.button,
          ...(state === "deploying" ? styles.buttonDisabled : {}),
        }}
      >
        {state === "deploying" ? "Deploying…" : "Deploy"}
      </button>
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
  neutral: {
    fontSize: 13,
    color: "#94a3b8",
  },
  deploying: {
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
  button: {
    width: "100%",
    padding: "10px 0",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 500,
    transition: "background 0.15s ease",
  },
  buttonDisabled: {
    background: "#334155",
    cursor: "not-allowed",
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
