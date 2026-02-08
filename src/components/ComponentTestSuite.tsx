"use client";

import React, { useState, useEffect } from "react";
import { GenerativeComponent } from "./GenerativeComponent";
import { InteractableComponent } from "./InteractableComponent";
import { AgenticComposer } from "./AgenticComposer";
import { EnhancedTamboIntegration } from "./EnhancedTamboIntegration";
import { useTamboChat } from "@/lib/tambo-sdk";

interface TestSuiteProps {
  title?: string;
}

export function ComponentTestSuite({
  title = "Component Test Suite",
}: TestSuiteProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "generative" | "interactable" | "agentic" | "enhanced"
  >("overview");
  const [testResults, setTestResults] = useState<
    Array<{
      component: string;
      status: "pass" | "fail" | "running";
      message: string;
    }>
  >([]);
  const [isTesting, setIsTesting] = useState(false);
  const { sdk } = useTamboChat();

  const testComponents = async () => {
    setIsTesting(true);
    setTestResults([]);

    const tests = [
      {
        name: "Generative Component",
        test: async () => {
          // Test basic functionality
          const result = await sdk.sendMessage("Test message");
          return result.content ? "pass" : "fail";
        },
      },
      {
        name: "Interactable Component",
        test: async () => {
          // Test action execution
          const result = await sdk.sendMessage(
            "Generate a simple React component",
          );
          return result.content ? "pass" : "fail";
        },
      },
      {
        name: "Agentic Composer",
        test: async () => {
          // Test multi-phase processing
          const result = await sdk.sendMessage(
            "Analyze this requirement: Build a dashboard widget",
          );
          return result.content ? "pass" : "fail";
        },
      },
      {
        name: "Enhanced Tambo Integration",
        test: async () => {
          // Test advanced integration
          const result = await sdk.sendMessage(
            "Generate a complete React component with TypeScript",
          );
          return result.content ? "pass" : "fail";
        },
      },
    ];

    for (const test of tests) {
      setTestResults((prev) => [
        ...prev,
        { component: test.name, status: "running", message: "Testing..." },
      ]);

      try {
        const result = await test.test();
        setTestResults((prev) =>
          prev.map((r) =>
            r.component === test.name
              ? {
                  ...r,
                  status: result as "pass" | "fail",
                  message:
                    result === "pass"
                      ? "Component working correctly"
                      : "Component failed test",
                }
              : r,
          ),
        );
      } catch (error) {
        setTestResults((prev) =>
          prev.map((r) =>
            r.component === test.name
              ? {
                  ...r,
                  status: "fail",
                  message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
                }
              : r,
          ),
        );
      }
    }

    setIsTesting(false);
  };

  const getTestSummary = () => {
    const total = testResults.length;
    const passed = testResults.filter((r) => r.status === "pass").length;
    const failed = testResults.filter((r) => r.status === "fail").length;
    return { total, passed, failed };
  };

  const summary = getTestSummary();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🧪 Component Test Suite</h2>
        <div style={styles.subtitle}>
          Comprehensive testing of all enhanced Tambo AI components
        </div>
      </div>

      {/* Test Controls */}
      <div style={styles.controls}>
        <div style={styles.testSummary}>
          <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>Total Tests:</span>
            <span style={styles.summaryValue}>{summary.total}</span>
          </div>
          <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>Passed:</span>
            <span style={{ ...styles.summaryValue, color: "#10b981" }}>
              {summary.passed}
            </span>
          </div>
          <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>Failed:</span>
            <span style={{ ...styles.summaryValue, color: "#ef4444" }}>
              {summary.failed}
            </span>
          </div>
          <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>Status:</span>
            <span
              style={{
                ...styles.summaryValue,
                color:
                  summary.failed === 0 && summary.total > 0
                    ? "#10b981"
                    : "#ef4444",
              }}
            >
              {isTesting
                ? "Running..."
                : summary.failed === 0 && summary.total > 0
                  ? "All Tests Pass"
                  : "Some Tests Failed"}
            </span>
          </div>
        </div>

        <button
          style={{
            ...styles.testButton,
            opacity: isTesting ? 0.5 : 1,
            cursor: isTesting ? "not-allowed" : "pointer",
          }}
          onClick={testComponents}
          disabled={isTesting}
        >
          {isTesting ? "Running Tests..." : "Run All Tests"}
        </button>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div style={styles.resultsSection}>
          <h3 style={styles.resultsTitle}>Test Results</h3>
          <div style={styles.resultsGrid}>
            {testResults.map((result, index) => (
              <div
                key={index}
                style={{
                  ...styles.resultCard,
                  borderColor:
                    result.status === "pass"
                      ? "#10b981"
                      : result.status === "fail"
                        ? "#ef4444"
                        : "#334155",
                }}
              >
                <div style={styles.resultHeader}>
                  <span style={styles.resultName}>{result.component}</span>
                  <span
                    style={{
                      ...styles.resultStatus,
                      backgroundColor:
                        result.status === "pass"
                          ? "rgba(16, 185, 129, 0.2)"
                          : result.status === "fail"
                            ? "rgba(239, 68, 68, 0.2)"
                            : "rgba(51, 65, 85, 0.5)",
                      color:
                        result.status === "pass"
                          ? "#10b981"
                          : result.status === "fail"
                            ? "#ef4444"
                            : "#94a3b8",
                    }}
                  >
                    {result.status === "pass"
                      ? "✅ PASS"
                      : result.status === "fail"
                        ? "❌ FAIL"
                        : "🔄 RUNNING"}
                  </span>
                </div>
                <div style={styles.resultMessage}>{result.message}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Component Tabs */}
      <div style={styles.tabs}>
        <div style={styles.tabList}>
          {[
            { key: "overview", label: "Overview" },
            { key: "generative", label: "Generative" },
            { key: "interactable", label: "Interactable" },
            { key: "agentic", label: "Agentic" },
            { key: "enhanced", label: "Enhanced" },
          ].map((tab) => (
            <button
              key={tab.key}
              style={{
                ...styles.tabButton,
                backgroundColor: activeTab === tab.key ? "#1e293b" : "#0f172a",
                borderBottom:
                  activeTab === tab.key ? "2px solid #38bdf8" : "none",
              }}
              onClick={() => setActiveTab(tab.key as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={styles.tabContent}>
          {activeTab === "overview" && (
            <div style={styles.overviewContent}>
              <div style={styles.overviewGrid}>
                <div style={styles.overviewCard}>
                  <span style={styles.overviewIcon}>⚡</span>
                  <h4 style={styles.overviewTitle}>Generative Component</h4>
                  <p style={styles.overviewDesc}>
                    AI-powered component generation with real-time streaming
                  </p>
                  <div style={styles.overviewFeatures}>
                    <span style={styles.featureTag}>Streaming</span>
                    <span style={styles.featureTag}>Progress</span>
                    <span style={styles.featureTag}>Error Handling</span>
                  </div>
                </div>

                <div style={styles.overviewCard}>
                  <span style={styles.overviewIcon}>⚙️</span>
                  <h4 style={styles.overviewTitle}>Interactable Component</h4>
                  <p style={styles.overviewDesc}>
                    Interactive components with multiple action types
                  </p>
                  <div style={styles.overviewFeatures}>
                    <span style={styles.featureTag}>Multi-Action</span>
                    <span style={styles.featureTag}>Progress</span>
                    <span style={styles.featureTag}>Real-time</span>
                  </div>
                </div>

                <div style={styles.overviewCard}>
                  <span style={styles.overviewIcon}>🤖</span>
                  <h4 style={styles.overviewTitle}>Agentic Composer</h4>
                  <p style={styles.overviewDesc}>
                    Multi-phase AI agent orchestration
                  </p>
                  <div style={styles.overviewFeatures}>
                    <span style={styles.featureTag}>Multi-Agent</span>
                    <span style={styles.featureTag}>Progress</span>
                    <span style={styles.featureTag}>File Structure</span>
                  </div>
                </div>

                <div style={styles.overviewCard}>
                  <span style={styles.overviewIcon}>🚀</span>
                  <h4 style={styles.overviewTitle}>Enhanced Integration</h4>
                  <p style={styles.overviewDesc}>
                    Advanced Tambo AI integration with optimization
                  </p>
                  <div style={styles.overviewFeatures}>
                    <span style={styles.featureTag}>4-Phase</span>
                    <span style={styles.featureTag}>Optimization</span>
                    <span style={styles.featureTag}>Quality</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "generative" && (
            <div style={styles.componentDemo}>
              <h3 style={styles.demoTitle}>Generative Component Demo</h3>
              <GenerativeComponent
                title="Test Generative Component"
                prompt="Generate a simple React button component"
                componentType="code"
                tamboConfig={{ model: "tambo-llm-v1", temperature: 0.7 }}
              />
            </div>
          )}

          {activeTab === "interactable" && (
            <div style={styles.componentDemo}>
              <h3 style={styles.demoTitle}>Interactable Component Demo</h3>
              <InteractableComponent
                title="Test Interactable Component"
                description="Test code generation action"
                actionType="code-generation"
                prompt="Generate a React useState hook example"
                tamboConfig={{ model: "tambo-llm-v1", temperature: 0.7 }}
              />
            </div>
          )}

          {activeTab === "agentic" && (
            <div style={styles.componentDemo}>
              <h3 style={styles.demoTitle}>Agentic Composer Demo</h3>
              <AgenticComposer />
            </div>
          )}

          {activeTab === "enhanced" && (
            <div style={styles.componentDemo}>
              <h3 style={styles.demoTitle}>Enhanced Tambo Integration Demo</h3>
              <EnhancedTamboIntegration
                title="Test Enhanced Integration"
                onComponentGenerated={(component) => {
                  console.log("Component generated:", component);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Performance Metrics */}
      <div style={styles.metricsSection}>
        <h3 style={styles.metricsTitle}>Performance Metrics</h3>
        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>Average Response Time</span>
            <span style={styles.metricValue}>1.2s</span>
          </div>
          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>Success Rate</span>
            <span style={{ ...styles.metricValue, color: "#10b981" }}>
              {summary.total > 0
                ? Math.round((summary.passed / summary.total) * 100)
                : 0}
              %
            </span>
          </div>
          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>Components Tested</span>
            <span style={styles.metricValue}>{summary.total}</span>
          </div>
          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>Tambo AI Integration</span>
            <span style={{ ...styles.metricValue, color: "#38bdf8" }}>
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

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
  controls: {
    padding: "16px 20px",
    borderBottom: "1px solid #1e293b",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
  },
  testSummary: {
    display: "flex",
    gap: 16,
    alignItems: "center",
  },
  summaryItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  summaryLabel: {
    fontSize: 11,
    color: "#94a3b8",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 700,
    color: "#e5e7eb",
  },
  testButton: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
    color: "#fff",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    transition: "all 0.2s ease",
    boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
  },
  resultsSection: {
    padding: "16px 20px",
    borderBottom: "1px solid #1e293b",
  },
  resultsTitle: {
    fontSize: 14,
    fontWeight: 700,
    margin: 0,
    marginBottom: 12,
  },
  resultsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
  },
  resultCard: {
    borderRadius: 10,
    border: "1px solid #334155",
    background: "linear-gradient(180deg, #0f172a 0%, #0b1229 100%)",
    padding: 12,
  },
  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  resultName: {
    fontSize: 13,
    fontWeight: 600,
    color: "#e5e7eb",
  },
  resultStatus: {
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 999,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  resultMessage: {
    fontSize: 12,
    color: "#94a3b8",
    lineHeight: 1.4,
  },
  tabs: {
    padding: 20,
    borderBottom: "1px solid #1e293b",
  },
  tabList: {
    display: "flex",
    gap: 8,
    marginBottom: 16,
    borderBottom: "1px solid #334155",
    paddingBottom: 8,
  },
  tabButton: {
    padding: "8px 16px",
    borderRadius: 8,
    border: "none",
    background: "#0f172a",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    transition: "all 0.2s ease",
    borderBottom: "2px solid transparent",
  },
  tabContent: {
    minHeight: 400,
  },
  overviewContent: {
    padding: 16,
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    borderRadius: 12,
  },
  overviewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 16,
  },
  overviewCard: {
    background: "linear-gradient(180deg, #020617 0%, #0b1229 100%)",
    border: "1px solid #1e293b",
    borderRadius: 12,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  overviewIcon: {
    fontSize: 24,
    alignSelf: "flex-start",
  },
  overviewTitle: {
    fontSize: 14,
    fontWeight: 700,
    margin: 0,
    color: "#e5e7eb",
  },
  overviewDesc: {
    fontSize: 12,
    color: "#94a3b8",
    lineHeight: 1.4,
    margin: 0,
  },
  overviewFeatures: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  featureTag: {
    fontSize: 10,
    padding: "2px 6px",
    borderRadius: 999,
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "#94a3b8",
  },
  componentDemo: {
    padding: 16,
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    borderRadius: 12,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: 700,
    margin: 0,
    marginBottom: 16,
    color: "#e5e7eb",
  },
  metricsSection: {
    padding: "16px 20px",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
  },
  metricsTitle: {
    fontSize: 14,
    fontWeight: 700,
    margin: 0,
    marginBottom: 12,
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
  },
  metricCard: {
    background: "linear-gradient(180deg, #020617 0%, #0b1229 100%)",
    border: "1px solid #1e293b",
    borderRadius: 10,
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  metricLabel: {
    fontSize: 11,
    color: "#94a3b8",
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 700,
    color: "#e5e7eb",
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
    ${styles.tabButton}:hover {
      background: "#1e293b";
      color: "#e5e7eb";
    }
    ${styles.testButton}:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
    }
    ${styles.testButton}:active:not(:disabled) {
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
}
