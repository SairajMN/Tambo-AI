"use client";

import React, { useState, useRef, useEffect } from "react";
import { TamboSDK, useTamboChat } from "@/lib/tambo-sdk";

interface InteractableComponentProps {
  title?: string;
  description?: string;
  actionType?:
    | "code-generation"
    | "analysis"
    | "optimization"
    | "testing"
    | "custom";
  prompt?: string;
  onAction?: () => Promise<string> | string;
  tamboConfig?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  };
}

type Status = "idle" | "working" | "success" | "error";

export function InteractableComponent({
  title = "Interactable Component",
  description = "Trigger an action and observe the result",
  actionType = "custom",
  prompt = "",
  onAction,
  tamboConfig = {},
}: InteractableComponentProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const { sdk } = useTamboChat(tamboConfig);

  const getActionPrompt = (type: string, userPrompt: string): string => {
    const actionPrompts = {
      "code-generation": `Generate a React component based on this description: "${userPrompt}". Include proper TypeScript types, error handling, and best practices.`,
      analysis: `Analyze this code or component: "${userPrompt}". Provide detailed feedback on performance, security, and best practices.`,
      optimization: `Optimize this React component for performance: "${userPrompt}". Focus on rendering performance, state management, and bundle size.`,
      testing: `Generate comprehensive tests for this component: "${userPrompt}". Include unit tests, integration tests, and accessibility tests.`,
      custom: userPrompt,
    };
    return actionPrompts[type as keyof typeof actionPrompts] || userPrompt;
  };

  const getActionIcon = () => {
    switch (actionType) {
      case "code-generation":
        return "💻";
      case "analysis":
        return "🔍";
      case "optimization":
        return "⚡";
      case "testing":
        return "🧪";
      case "custom":
        return "⚙️";
      default:
        return "⚡";
    }
  };

  const getActionColor = () => {
    switch (actionType) {
      case "code-generation":
        return "#2563eb";
      case "analysis":
        return "#8b5cf6";
      case "optimization":
        return "#10b981";
      case "testing":
        return "#f59e0b";
      case "custom":
        return "#ef4444";
      default:
        return "#2563eb";
    }
  };

  const getActionLabel = () => {
    switch (actionType) {
      case "code-generation":
        return "Generate Code";
      case "analysis":
        return "Analyze";
      case "optimization":
        return "Optimize";
      case "testing":
        return "Test";
      case "custom":
        return "Execute";
      default:
        return "Execute";
    }
  };

  async function handleClick() {
    if (status === "working") return;

    setStatus("working");
    setResult(null);
    setError(null);
    setProgress(0);

    // Start progress animation
    progressInterval.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + 8, 90));
    }, 150);

    try {
      const actionPrompt = getActionPrompt(actionType, prompt || description);

      let output: string;

      if (onAction) {
        // Use custom action if provided
        const result = await onAction();
        output = String(result);
      } else {
        // Use Tambo AI integration
        const response = await sdk.sendMessage(actionPrompt);

        if (response.error) {
          throw new Error(response.error);
        }

        output = response.content;
      }

      setResult(output);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed");
      setStatus("error");
    } finally {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
      setProgress(100);
    }
  }

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={{ ...styles.header, borderColor: getActionColor() }}>
        <span style={styles.icon}>{getActionIcon()}</span>
        <span>{title}</span>
        <span style={styles.actionBadge}>{actionType.toUpperCase()}</span>
      </div>

      <div style={styles.body}>
        <div style={styles.description}>{description}</div>

        {status === "working" && (
          <div style={styles.workingContainer}>
            <div style={styles.workingText}>Processing with Tambo AI...</div>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${progress}%`,
                  backgroundColor: getActionColor(),
                }}
              />
            </div>
            <div style={styles.workingDots}>
              <span style={styles.dot} />
              <span style={styles.dot} />
              <span style={styles.dot} />
            </div>
          </div>
        )}

        {status === "success" && result && (
          <div style={styles.resultContainer}>
            <div style={styles.resultHeader}>
              <span style={styles.successIcon}>✅</span>
              <span>Action Completed Successfully</span>
            </div>
            <div style={styles.resultContent}>
              <pre style={styles.resultText}>{result}</pre>
            </div>
            <div style={styles.resultFooter}>
              <span style={styles.resultTimestamp}>
                Completed at {new Date().toLocaleTimeString()}
              </span>
              <button
                style={styles.shareButton}
                onClick={() => navigator.clipboard.writeText(result)}
              >
                📤 Share
              </button>
            </div>
          </div>
        )}

        {status === "error" && error && (
          <div style={styles.errorContainer}>
            <div style={styles.errorHeader}>
              <span style={styles.errorIcon}>⚠️</span>
              <span>Action Failed</span>
            </div>
            <div style={styles.errorMessage}>{error}</div>
            <div style={styles.errorActions}>
              <button style={styles.retryButton} onClick={handleClick}>
                Retry Action
              </button>
              <button
                style={styles.resetButton}
                onClick={() => {
                  setStatus("idle");
                  setError(null);
                  setResult(null);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        style={{
          ...styles.button,
          backgroundColor: getActionColor(),
          transform: status === "working" ? "scale(0.98)" : "scale(1)",
          boxShadow: `0 4px 15px ${getActionColor()}40`,
        }}
        onClick={handleClick}
        disabled={status === "working"}
      >
        {status === "working" ? (
          <span style={styles.buttonLoading}>
            <span style={styles.buttonDot} />
            <span style={styles.buttonDot} />
            <span style={styles.buttonDot} />
          </span>
        ) : (
          getActionLabel()
        )}
      </button>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    borderRadius: 16,
    border: "1px solid #1e293b",
    background: "linear-gradient(180deg, #020617 0%, #0b1229 100%)",
    overflow: "hidden",
    animation: "fadeIn 0.4s ease-out",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  header: {
    padding: "12px 16px",
    fontSize: 14,
    fontWeight: 700,
    borderBottom: "1px solid #1e293b",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)",
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
  },
  actionBadge: {
    fontSize: 10,
    padding: "2px 8px",
    borderRadius: 999,
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  body: {
    padding: 16,
    minHeight: 120,
  },
  description: {
    fontSize: 13,
    color: "#94a3b8",
    marginBottom: 12,
    lineHeight: 1.5,
  },
  workingContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 12,
    borderRadius: 12,
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    border: "1px solid #334155",
  },
  workingText: {
    fontSize: 13,
    color: "#38bdf8",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  progressBar: {
    height: 6,
    background: "#334155",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    transition: "width 0.3s ease",
    boxShadow: "0 0 10px rgba(56, 189, 248, 0.5)",
  },
  workingDots: {
    display: "flex",
    gap: 6,
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#38bdf8",
    animation: "bounce 1.4s infinite",
    display: "inline-block",
  },
  resultContainer: {
    borderRadius: 12,
    border: "1px solid #10b981",
    background: "linear-gradient(180deg, #0f172a 0%, #0b1229 100%)",
    overflow: "hidden",
  },
  resultHeader: {
    padding: "8px 12px",
    background: "rgba(16, 185, 129, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    color: "#10b981",
    borderBottom: "1px solid #10b981",
  },
  successIcon: {
    fontSize: 14,
  },
  resultContent: {
    padding: 12,
    background: "rgba(16, 185, 129, 0.05)",
  },
  resultText: {
    margin: 0,
    fontSize: 12,
    lineHeight: 1.6,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    whiteSpace: "pre-wrap",
    color: "#e5e7eb",
    maxHeight: 200,
    overflow: "auto",
  },
  resultFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    background: "rgba(16, 185, 129, 0.1)",
    borderTop: "1px solid #10b981",
  },
  resultTimestamp: {
    fontSize: 11,
    color: "#94a3b8",
  },
  shareButton: {
    padding: "6px 12px",
    borderRadius: 8,
    border: "1px solid #10b981",
    background: "transparent",
    color: "#10b981",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
  errorContainer: {
    borderRadius: 12,
    border: "1px solid #ef4444",
    background: "linear-gradient(180deg, #0f172a 0%, #0b1229 100%)",
    overflow: "hidden",
  },
  errorHeader: {
    padding: "8px 12px",
    background: "rgba(239, 68, 68, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    color: "#ef4444",
    borderBottom: "1px solid #ef4444",
  },
  errorIcon: {
    fontSize: 14,
  },
  errorMessage: {
    padding: 12,
    fontSize: 13,
    color: "#fecaca",
    lineHeight: 1.5,
    background: "rgba(239, 68, 68, 0.05)",
  },
  errorActions: {
    display: "flex",
    gap: 8,
    padding: "8px 12px",
    background: "rgba(239, 68, 68, 0.1)",
    borderTop: "1px solid #ef4444",
  },
  retryButton: {
    padding: "6px 12px",
    borderRadius: 8,
    border: "1px solid #ef4444",
    background: "transparent",
    color: "#ef4444",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
  resetButton: {
    padding: "6px 12px",
    borderRadius: 8,
    border: "1px solid #64748b",
    background: "transparent",
    color: "#64748b",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
  button: {
    width: "100%",
    padding: "12px 0",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
    transition: "all 0.2s ease",
    position: "relative",
    overflow: "hidden",
  },
  buttonLoading: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  buttonDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.8)",
    animation: "bounce 1.4s infinite",
    display: "inline-block",
  },
};

/* ---------------- ANIMATIONS ---------------- */

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
    @keyframes pulse {
      0% { opacity: .4 }
      50% { opacity: 1 }
      100% { opacity: .4 }
    }
    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: calc(200px + 100%) 0; }
    }
    ${styles.wrapper}:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.25);
    }
    ${styles.button}:hover {
      filter: brightness(1.1);
    }
    ${styles.button}:active {
      transform: scale(0.98);
    }
  `;
  document.head.appendChild(style);
}
