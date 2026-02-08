"use client";

import React, { useState, useRef, useEffect } from "react";
import { TamboSDK, useTamboChat } from "@/lib/tambo-sdk";

interface GenerativeComponentProps {
  title?: string;
  prompt?: string;
  componentType?: "code" | "text" | "documentation" | "analysis";
  onGenerate?: (prompt: string) => Promise<string>;
  tamboConfig?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  };
}

export function GenerativeComponent({
  title = "Generative Component",
  prompt = "Generate a React component",
  componentType = "code",
  onGenerate,
  tamboConfig = {},
}: GenerativeComponentProps) {
  const [output, setOutput] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [progress, setProgress] = useState(0);
  const [streamingText, setStreamingText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const { sdk } = useTamboChat(tamboConfig);

  const generatePrompt = (type: string, basePrompt: string): string => {
    const typePrompts = {
      code: `Generate a complete React functional component based on this description: "${basePrompt}". Include proper TypeScript types, error handling, and inline documentation. Return only the component code wrapped in a code block.`,
      text: `Generate engaging content based on this description: "${basePrompt}". Focus on clarity, structure, and user value.`,
      documentation: `Generate comprehensive documentation for this component or feature: "${basePrompt}". Include usage examples, prop descriptions, and best practices.`,
      analysis: `Analyze this code or component: "${basePrompt}". Provide detailed feedback on performance, security, and best practices.`,
    };
    return typePrompts[type as keyof typeof typePrompts] || basePrompt;
  };

  async function handleGenerate() {
    if (status === "loading") return;

    setStatus("loading");
    setOutput(null);
    setStreamingText("");
    setError(null);
    setProgress(0);

    // Start progress animation
    progressInterval.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 95));
    }, 200);

    try {
      const enhancedPrompt = generatePrompt(componentType, prompt);

      if (onGenerate) {
        // Use custom generator if provided
        const result = await onGenerate(enhancedPrompt);
        setOutput(result);
        setStatus("done");
      } else {
        // Use Tambo AI integration
        const response = await sdk.streamMessage(enhancedPrompt, (chunk) => {
          setStreamingText((prev) => prev + chunk.content);
          setProgress((prev) => Math.min(prev + 5, 100));
        });

        if (response.error) {
          throw new Error(response.error);
        }

        setOutput(response.content);
        setStatus("done");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
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

  const getComponentIcon = () => {
    switch (componentType) {
      case "code":
        return "💻";
      case "text":
        return "📝";
      case "documentation":
        return "📚";
      case "analysis":
        return "🔍";
      default:
        return "⚡";
    }
  };

  const getComponentColor = () => {
    switch (componentType) {
      case "code":
        return "#2563eb";
      case "text":
        return "#10b981";
      case "documentation":
        return "#f59e0b";
      case "analysis":
        return "#8b5cf6";
      default:
        return "#2563eb";
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={{ ...styles.header, borderColor: getComponentColor() }}>
        <span style={styles.icon}>{getComponentIcon()}</span>
        <span>{title}</span>
        <span style={styles.typeBadge}>{componentType.toUpperCase()}</span>
      </div>

      <div style={styles.body}>
        {status === "idle" && (
          <div style={styles.placeholder}>
            <div style={styles.placeholderIcon}>💡</div>
            <div>
              <strong>Ready to generate</strong>
              <br />
              <span style={styles.placeholderText}>
                Click generate to create {componentType} content using Tambo AI
              </span>
            </div>
          </div>
        )}

        {status === "loading" && (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingText}>Generating with Tambo AI...</div>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${progress}%`,
                  backgroundColor: getComponentColor(),
                }}
              />
            </div>
            <div style={styles.loadingDots}>
              <span style={styles.dot} />
              <span style={styles.dot} />
              <span style={styles.dot} />
            </div>
          </div>
        )}

        {status === "done" && output && (
          <div style={styles.outputContainer}>
            <div style={styles.outputHeader}>
              <span style={styles.successIcon}>✅</span>
              <span>Generated Successfully</span>
            </div>
            <pre style={styles.output}>
              <code>{output}</code>
            </pre>
            <div style={styles.outputFooter}>
              <span style={styles.timestamp}>
                Generated at {new Date().toLocaleTimeString()}
              </span>
              <button
                style={styles.copyButton}
                onClick={() => navigator.clipboard.writeText(output)}
              >
                📋 Copy
              </button>
            </div>
          </div>
        )}

        {status === "error" && error && (
          <div style={styles.errorContainer}>
            <div style={styles.errorHeader}>
              <span style={styles.errorIcon}>⚠️</span>
              <span>Generation Failed</span>
            </div>
            <div style={styles.errorMessage}>{error}</div>
            <button style={styles.retryButton} onClick={handleGenerate}>
              Retry
            </button>
          </div>
        )}
      </div>

      <button
        style={{
          ...styles.button,
          backgroundColor: getComponentColor(),
          transform: status === "loading" ? "scale(0.98)" : "scale(1)",
        }}
        onClick={handleGenerate}
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <span style={styles.buttonLoading}>
            <span style={styles.buttonDot} />
            <span style={styles.buttonDot} />
            <span style={styles.buttonDot} />
          </span>
        ) : (
          "Generate with Tambo AI"
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
    padding: "14px 16px",
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
  typeBadge: {
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
    minHeight: 140,
  },
  placeholder: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    border: "1px solid #334155",
  },
  placeholderIcon: {
    fontSize: 24,
    filter: "drop-shadow(0 0 8px rgba(56, 189, 248, 0.3))",
  },
  placeholderText: {
    color: "#94a3b8",
    fontSize: 12,
    lineHeight: 1.4,
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: 16,
  },
  loadingText: {
    fontSize: 14,
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
  loadingDots: {
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
  outputContainer: {
    borderRadius: 12,
    border: "1px solid #10b981",
    background: "linear-gradient(180deg, #0f172a 0%, #0b1229 100%)",
    overflow: "hidden",
  },
  outputHeader: {
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
  output: {
    margin: 0,
    padding: 16,
    fontSize: 12,
    lineHeight: 1.6,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    whiteSpace: "pre-wrap",
    color: "#e5e7eb",
    maxHeight: 300,
    overflow: "auto",
    background: "rgba(16, 185, 129, 0.05)",
  },
  outputFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    background: "rgba(16, 185, 129, 0.1)",
    borderTop: "1px solid #10b981",
  },
  timestamp: {
    fontSize: 11,
    color: "#94a3b8",
  },
  copyButton: {
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
    padding: 16,
    fontSize: 13,
    color: "#fecaca",
    lineHeight: 1.5,
    background: "rgba(239, 68, 68, 0.05)",
  },
  retryButton: {
    padding: "8px 16px",
    borderRadius: 8,
    border: "1px solid #ef4444",
    background: "transparent",
    color: "#ef4444",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    margin: "0 16px 16px 16px",
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
  `;
  document.head.appendChild(style);
}
