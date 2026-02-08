"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTamboChat, TamboSDK } from "@/lib/tambo-sdk";
import { TamboMCPIntegration } from "@/lib/mcp/tambo-integration";

interface EnhancedTamboIntegrationProps {
  title?: string;
  onComponentGenerated?: (component: { name: string; code: string }) => void;
}

export function EnhancedTamboIntegration({
  title = "Enhanced Tambo AI Integration",
  onComponentGenerated,
}: EnhancedTamboIntegrationProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedComponents, setGeneratedComponents] = useState<
    Array<{ name: string; code: string; metadata: any }>
  >([]);
  const [currentPhase, setCurrentPhase] = useState<
    "idle" | "analyzing" | "generating" | "optimizing" | "complete"
  >("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { messages, sendMessage, sdk } = useTamboChat();
  const tamboIntegration = useRef(new TamboMCPIntegration());

  const generateComponentWithPhases = async (userPrompt: string) => {
    setIsGenerating(true);
    setError(null);
    setProgress(0);

    try {
      // Phase 1: Requirement Analysis
      setCurrentPhase("analyzing");
      setProgress(20);

      const analysisPrompt = `Analyze this component requirement and provide detailed technical specifications: "${userPrompt}". Focus on: 1) Component architecture, 2) Props interface, 3) State management, 4) Performance considerations, 5) Accessibility requirements.`;

      const analysisResponse = await sdk.sendMessage(analysisPrompt);
      if (analysisResponse.error) throw new Error(analysisResponse.error);

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate analysis time

      // Phase 2: Component Generation
      setCurrentPhase("generating");
      setProgress(50);

      const generationPrompt = `Generate a complete React functional component based on this analysis: ${analysisResponse.content}. Include: 1) TypeScript interfaces, 2) Proper error handling, 3) Accessibility attributes, 4) Performance optimizations, 5) Inline documentation. Return the complete component code wrapped in a code block.`;

      const generationResponse = await sdk.sendMessage(generationPrompt);
      if (generationResponse.error) throw new Error(generationResponse.error);

      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate generation time

      // Phase 3: Code Optimization
      setCurrentPhase("optimizing");
      setProgress(80);

      const optimizationPrompt = `Optimize this React component for performance and best practices: ${generationResponse.content}. Focus on: 1) Rendering performance, 2) Memory usage, 3) Bundle size, 4) Code quality. Return the optimized component code.`;

      const optimizationResponse = await sdk.sendMessage(optimizationPrompt);
      if (optimizationResponse.error)
        throw new Error(optimizationResponse.error);

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate optimization time

      // Phase 4: Final Processing
      setCurrentPhase("complete");
      setProgress(100);

      const componentName = `GeneratedComponent_${Date.now()}`;
      const componentData = {
        name: componentName,
        code: optimizationResponse.content,
        metadata: {
          phase: "complete",
          timestamp: new Date(),
          complexity: "medium",
          dependencies: ["react"],
        },
      };

      setGeneratedComponents((prev) => [...prev, componentData]);
      onComponentGenerated?.(componentData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
      setCurrentPhase("idle");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    await generateComponentWithPhases(prompt);
  };

  const clearComponents = () => {
    setGeneratedComponents([]);
    setCurrentPhase("idle");
    setProgress(0);
  };

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🚀 Enhanced Tambo AI Integration</h2>
        <div style={styles.subtitle}>
          Multi-phase component generation with real Tambo AI
        </div>
      </div>

      {/* Input Section */}
      <div style={styles.inputSection}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Component Description</label>
          <textarea
            style={styles.textarea}
            placeholder="Describe the React component you want to generate... (e.g., 'A responsive dashboard widget with charts and data filtering')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
            rows={4}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button
            style={{
              ...styles.generateButton,
              opacity: isGenerating || !prompt.trim() ? 0.5 : 1,
              cursor:
                isGenerating || !prompt.trim() ? "not-allowed" : "pointer",
            }}
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? (
              <span style={styles.buttonLoading}>
                <span style={styles.buttonDot} />
                <span style={styles.buttonDot} />
                <span style={styles.buttonDot} />
                Generating...
              </span>
            ) : (
              "Generate Component"
            )}
          </button>

          <button
            style={styles.clearButton}
            onClick={clearComponents}
            disabled={isGenerating}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Progress Section */}
      {isGenerating && (
        <div style={styles.progressSection}>
          <div style={styles.progressHeader}>
            <span style={styles.phaseLabel}>{currentPhase.toUpperCase()}</span>
            <span style={styles.progressPercent}>{progress}%</span>
          </div>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progress}%`,
                backgroundColor: getPhaseColor(currentPhase),
              }}
            />
          </div>
          <div style={styles.phaseSteps}>
            <span style={{ opacity: progress >= 20 ? 1 : 0.3 }}>Analysis</span>
            <span style={{ opacity: progress >= 50 ? 1 : 0.3 }}>
              Generation
            </span>
            <span style={{ opacity: progress >= 80 ? 1 : 0.3 }}>
              Optimization
            </span>
            <span style={{ opacity: progress >= 100 ? 1 : 0.3 }}>Complete</span>
          </div>
        </div>
      )}

      {/* Error Section */}
      {error && (
        <div style={styles.errorSection}>
          <div style={styles.errorHeader}>
            <span style={styles.errorIcon}>⚠️</span>
            <span>Generation Error</span>
          </div>
          <div style={styles.errorMessage}>{error}</div>
          <button
            style={styles.retryButton}
            onClick={() => generateComponentWithPhases(prompt)}
          >
            Retry
          </button>
        </div>
      )}

      {/* Generated Components Section */}
      {generatedComponents.length > 0 && (
        <div style={styles.componentsSection}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>
              Generated Components ({generatedComponents.length})
            </h3>
            <span style={styles.componentCount}>
              {generatedComponents.length} component(s)
            </span>
          </div>

          <div style={styles.componentsGrid}>
            {generatedComponents.map((component, index) => (
              <div key={index} style={styles.componentCard}>
                <div style={styles.componentHeader}>
                  <span style={styles.componentName}>{component.name}</span>
                  <span style={styles.componentStatus}>✅ Generated</span>
                </div>

                <div style={styles.componentPreview}>
                  <pre style={styles.componentCode}>
                    {component.code.substring(0, 200)}...
                  </pre>
                </div>

                <div style={styles.componentActions}>
                  <button
                    style={styles.viewButton}
                    onClick={() => {
                      // In a real app, this would open a modal or detailed view
                      alert(`Full component code:\n\n${component.code}`);
                    }}
                  >
                    View Full Code
                  </button>
                  <button
                    style={styles.copyButton}
                    onClick={() => copyToClipboard(component.code)}
                  >
                    📋 Copy
                  </button>
                  <span style={styles.componentSize}>
                    {component.code.length} chars
                  </span>
                </div>

                <div style={styles.componentMetadata}>
                  <span style={styles.metadataItem}>
                    Complexity: {component.metadata.complexity}
                  </span>
                  <span style={styles.metadataItem}>
                    Dependencies: {component.metadata.dependencies.join(", ")}
                  </span>
                  <span style={styles.metadataItem}>
                    Generated:{" "}
                    {component.metadata.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features Section */}
      <div style={styles.featuresSection}>
        <h3 style={styles.featuresTitle}>✨ Features</h3>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>🔍</span>
            <div>
              <strong>Smart Analysis</strong>
              <p>AI-powered requirement analysis and technical specification</p>
            </div>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>⚡</span>
            <div>
              <strong>Multi-Phase Generation</strong>
              <p>Analysis → Generation → Optimization pipeline</p>
            </div>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>🎯</span>
            <div>
              <strong>Quality Assurance</strong>
              <p>Performance optimization and best practices enforcement</p>
            </div>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>🔧</span>
            <div>
              <strong>Real Tambo AI</strong>
              <p>Live integration with Tambo AI for component generation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const getPhaseColor = (phase: string) => {
  switch (phase) {
    case "analyzing":
      return "#38bdf8";
    case "generating":
      return "#10b981";
    case "optimizing":
      return "#f59e0b";
    case "complete":
      return "#8b5cf6";
    default:
      return "#64748b";
  }
};

const styles: Record<string, React.CSSProperties> = {
  container: {
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
    padding: "16px 20px",
    background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)",
    borderBottom: "1px solid #1e293b",
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 4,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#94a3b8",
    fontStyle: "italic",
  },
  inputSection: {
    padding: 20,
    borderBottom: "1px solid #1e293b",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "#94a3b8",
    marginBottom: 8,
  },
  textarea: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #334155",
    background: "#020617",
    color: "#e5e7eb",
    fontSize: 14,
    lineHeight: 1.5,
    resize: "vertical",
    transition: "all 0.2s ease",
  },
  buttonGroup: {
    display: "flex",
    gap: 12,
  },
  generateButton: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
    color: "#fff",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
    transition: "all 0.2s ease",
    boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
  },
  buttonLoading: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  buttonDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.8)",
    animation: "bounce 1.4s infinite",
    display: "inline-block",
  },
  clearButton: {
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid #334155",
    background: "#020617",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
  progressSection: {
    padding: "16px 20px",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    borderBottom: "1px solid #1e293b",
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  phaseLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: 700,
    color: "#38bdf8",
  },
  progressBar: {
    height: 8,
    background: "#334155",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressFill: {
    height: "100%",
    transition: "width 0.3s ease",
    boxShadow: "0 0 10px rgba(56, 189, 248, 0.5)",
  },
  phaseSteps: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 10,
    color: "#64748b",
  },
  errorSection: {
    padding: "16px 20px",
    background: "linear-gradient(180deg, #0f172a 0%, #0b1229 100%)",
    borderBottom: "1px solid #1e293b",
    borderLeft: "4px solid #ef4444",
  },
  errorHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  errorIcon: {
    fontSize: 16,
  },
  errorMessage: {
    fontSize: 13,
    color: "#fecaca",
    lineHeight: 1.5,
    marginBottom: 12,
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
    transition: "all 0.2s ease",
  },
  componentsSection: {
    padding: 20,
    borderBottom: "1px solid #1e293b",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    margin: 0,
  },
  componentCount: {
    fontSize: 12,
    color: "#94a3b8",
    padding: "4px 8px",
    borderRadius: 999,
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  componentsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 16,
  },
  componentCard: {
    borderRadius: 12,
    border: "1px solid #1e293b",
    background: "linear-gradient(180deg, #0f172a 0%, #0b1229 100%)",
    overflow: "hidden",
  },
  componentHeader: {
    padding: "12px 16px",
    background: "rgba(16, 185, 129, 0.1)",
    borderBottom: "1px solid #10b981",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  componentName: {
    fontSize: 14,
    fontWeight: 700,
    color: "#10b981",
  },
  componentStatus: {
    fontSize: 11,
    color: "#10b981",
    padding: "2px 8px",
    borderRadius: 999,
    background: "rgba(16, 185, 129, 0.2)",
    border: "1px solid rgba(16, 185, 129, 0.4)",
  },
  componentPreview: {
    padding: 16,
    background: "rgba(16, 185, 129, 0.05)",
    borderBottom: "1px solid #1e293b",
  },
  componentCode: {
    margin: 0,
    fontSize: 12,
    lineHeight: 1.6,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    color: "#e5e7eb",
    maxHeight: 120,
    overflow: "auto",
  },
  componentActions: {
    display: "flex",
    gap: 8,
    padding: "12px 16px",
    background: "rgba(16, 185, 129, 0.1)",
    borderTop: "1px solid #10b981",
    borderBottom: "1px solid #1e293b",
  },
  viewButton: {
    flex: 1,
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #10b981",
    background: "transparent",
    color: "#10b981",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
  copyButton: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #10b981",
    background: "transparent",
    color: "#10b981",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
  componentSize: {
    fontSize: 11,
    color: "#94a3b8",
    padding: "8px 12px",
    borderRadius: 8,
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  componentMetadata: {
    display: "flex",
    gap: 12,
    padding: "12px 16px",
    background: "rgba(16, 185, 129, 0.1)",
    borderTop: "1px solid #10b981",
    flexWrap: "wrap",
  },
  metadataItem: {
    fontSize: 11,
    color: "#94a3b8",
    padding: "4px 8px",
    borderRadius: 999,
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  featuresSection: {
    padding: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 700,
    margin: 0,
    marginBottom: 16,
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
  },
  featureCard: {
    display: "flex",
    gap: 12,
    padding: 12,
    borderRadius: 10,
    border: "1px solid #334155",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
  },
  featureIcon: {
    fontSize: 20,
    filter: "drop-shadow(0 0 8px rgba(56, 189, 248, 0.3))",
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
    ${styles.container}:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.25);
    }
    ${styles.textarea}:focus {
      outline: none;
      border-color: #38bdf8;
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
    }
    ${styles.generateButton}:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
    }
    ${styles.generateButton}:active:not(:disabled) {
      transform: translateY(0);
    }
    ${styles.clearButton}:hover:not(:disabled) {
      background: "#0b1229";
      color: "#e5e7eb";
      border-color: "#475569";
    }
    ${styles.viewButton}:hover:not(:disabled) {
      background: "rgba(16, 185, 129, 0.2)";
      color: "#fff";
    }
    ${styles.copyButton}:hover:not(:disabled) {
      background: "rgba(16, 185, 129, 0.2)";
      color: "#fff";
    }
    ${styles.retryButton}:hover:not(:disabled) {
      background: "#ef4444";
      color: "#fff";
    }
  `;
  document.head.appendChild(style);
}
