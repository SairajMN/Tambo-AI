"use client";

import React, { useState } from "react";

type ApiStatus = "idle" | "loading" | "success" | "error";

interface ApiResult {
  status: number;
  data: any;
}

interface APITestProps {
  endpoint?: string;
  method?: "GET" | "POST";
}

export function APITest({
  endpoint = "/api/test",
  method = "GET",
}: APITestProps) {
  const [status, setStatus] = useState<ApiStatus>("idle");
  const [result, setResult] = useState<ApiResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runTest() {
    if (status === "loading") return;

    setStatus("loading");
    setError(null);
    setResult(null);

    try {
      const res = await fetch(endpoint, { method });

      const data = await res.json();

      setResult({
        status: res.status,
        data,
      });

      setStatus("success");
    } catch (err) {
      setError("Failed to call API");
      setStatus("error");
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>API Test</div>

      <div style={styles.body}>
        <div style={styles.meta}>
          <span>Endpoint:</span>
          <code>{endpoint}</code>
        </div>

        <div style={styles.meta}>
          <span>Method:</span>
          <code>{method}</code>
        </div>

        {status === "idle" && (
          <div style={styles.neutral}>Ready to send request</div>
        )}

        {status === "loading" && (
          <div style={styles.loading}>Sending request…</div>
        )}

        {status === "error" && error && <div style={styles.error}>{error}</div>}

        {status === "success" && result && (
          <pre style={styles.response}>
            <code>
              {JSON.stringify(
                { status: result.status, data: result.data },
                null,
                2,
              )}
            </code>
          </pre>
        )}
      </div>

      <button
        onClick={runTest}
        disabled={status === "loading"}
        style={{
          ...styles.button,
          ...(status === "loading" ? styles.buttonDisabled : {}),
        }}
      >
        {status === "loading" ? "Running…" : "Run API Test"}
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
  },
  meta: {
    fontSize: 12,
    color: "#94a3b8",
    display: "flex",
    gap: 6,
    marginBottom: 6,
  },
  neutral: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 10,
  },
  loading: {
    fontSize: 13,
    color: "#38bdf8",
    animation: "pulse 1.4s infinite",
    marginTop: 10,
  },
  error: {
    fontSize: 13,
    color: "#ef4444",
    marginTop: 10,
  },
  response: {
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    background: "#0f172a",
    fontSize: 12,
    lineHeight: 1.5,
    maxHeight: 240,
    overflow: "auto",
    color: "#e5e7eb",
  },
  button: {
    width: "100%",
    padding: "10px 0",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 500,
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
