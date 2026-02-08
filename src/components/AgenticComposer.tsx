"use client";

import React, { useState, useEffect, useRef } from "react";
import { AgentOrchestrator } from "@/lib/agent-orchestrator";
import { ComponentList, ComponentPreview } from "./ComponentPreview";
import {
  FileStructureViewer,
  generateSampleStructure,
} from "./FileStructureViewer";
import { useTamboChat } from "@/lib/tambo-sdk";

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: Date;
  metadata?: {
    agentType?: "conversation" | "specification" | "code-generation";
    phase?: "requirements" | "specification" | "generation" | "error";
    status?: "processing" | "completed" | "error";
  };
}

interface AgentResult {
  summary: string;
  components: Record<string, string>;
  structure: any[];
  specification: any;
}

export function AgenticComposer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedComponents, setGeneratedComponents] = useState<string[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null,
  );
  const [componentCodes, setComponentCodes] = useState<Record<string, string>>(
    {},
  );
  const [projectStructure, setProjectStructure] = useState<any[]>(
    generateSampleStructure(),
  );
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [agentProgress, setAgentProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<string>("idle");
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { messages: tamboMessages, sendMessage } = useTamboChat();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case "requirements":
        return "💬";
      case "specification":
        return "📋";
      case "generation":
        return "⚡";
      default:
        return "🤖";
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "requirements":
        return "#38bdf8";
      case "specification":
        return "#8b5cf6";
      case "generation":
        return "#10b981";
      default:
        return "#64748b";
    }
  };

  async function handleSend() {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
      metadata: { phase: "requirements" },
    };

    setMessages((m) => [...m, userMessage]);
    setConversationHistory((prev) => [...prev, `User: ${inputValue}`]);
    setInputValue("");
    setIsProcessing(true);
    setAgentProgress(0);
    setCurrentPhase("requirements");

    try {
      // Use Tambo AI for enhanced conversation
      const tamboResponse = await sendMessage(inputValue);

      const enhancedMessage: Message = {
        id: crypto.randomUUID(),
        type: "agent",
        content: `I understand you want to build: ${inputValue}\n\nLet me analyze your requirements and create a technical specification for your project.`,
        timestamp: new Date(),
        metadata: {
          agentType: "conversation",
          phase: "requirements",
          status: "completed",
        },
      };

      setMessages((m) => [...m, enhancedMessage]);

      // Simulate agent orchestration phases
      await simulateAgentPhases(inputValue);
    } catch (err) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        type: "agent",
        content: `⚠️ Error processing request: ${err}`,
        timestamp: new Date(),
        metadata: { phase: "error", status: "error" },
      };
      setMessages((m) => [...m, errorMessage]);
    } finally {
      setIsProcessing(false);
      setAgentProgress(100);
    }
  }

  async function simulateAgentPhases(userInput: string) {
    // Phase 1: Conversation Analysis
    setCurrentPhase("requirements");
    setAgentProgress(25);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const conversationMessage: Message = {
      id: crypto.randomUUID(),
      type: "agent",
      content:
        "✅ Requirements Analysis Complete\n\nKey insights identified:\n• User intent: Building a web application\n• Complexity level: Medium\n• Technology stack: React/Next.js\n• Architecture: Component-based\n\nProceeding to specification generation...",
      timestamp: new Date(),
      metadata: {
        agentType: "conversation",
        phase: "requirements",
        status: "completed",
      },
    };

    setMessages((m) => [...m, conversationMessage]);

    // Phase 2: Specification Generation
    setCurrentPhase("specification");
    setAgentProgress(60);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const specMessage: Message = {
      id: crypto.randomUUID(),
      type: "agent",
      content:
        "📋 Technical Specification Generated\n\n**Project Name:** Web Application\n**Description:** Interactive web application with modern React components\n**Architecture:** Single-page application with component-based structure\n\n**Components Identified:**\n• Main Layout Component\n• Navigation Component\n• Content Area Component\n• Footer Component\n\n**Pages:**\n• Home Page\n• Dashboard Page\n• Settings Page\n\nStarting code generation...",
      timestamp: new Date(),
      metadata: {
        agentType: "specification",
        phase: "specification",
        status: "completed",
      },
    };

    setMessages((m) => [...m, specMessage]);

    // Phase 3: Code Generation
    setCurrentPhase("generation");
    setAgentProgress(85);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate sample components
    const sampleComponents = {
      MainLayout: `import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="text-2xl font-bold text-gray-900">
              Web App
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="text-gray-600 hover:text-gray-900">Home</a></li>
                <li><a href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a></li>
                <li><a href="/settings" className="text-gray-600 hover:text-gray-900">Settings</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Web Application. Built with React and Tambo AI.
          </p>
        </div>
      </footer>
    </div>
  );
}`,
      Dashboard: `import React, { useState } from 'react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    users: 1234,
    revenue: 45678,
    growth: 12.5
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">👤</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Users
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {metrics.users.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">💰</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Revenue
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {metrics.revenue.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">📈</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Growth Rate
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {metrics.growth}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
              Create User
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors">
              Generate Report
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors">
              View Analytics
            </button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}`,
      Settings: `import React, { useState } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    language: 'en'
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>
        
        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive email updates about your account
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('notifications')}
                  className={\`relative inline-flex h-6 w-11 items-center rounded-full transition-colors \${settings.notifications ? 'bg-blue-600' : 'bg-gray-200'}\`}
                >
                  <span className={\`inline-block h-4 w-4 transform rounded-full bg-white transition-transform \${settings.notifications ? 'translate-x-6' : 'translate-x-1'}\`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Dark Mode
                  </label>
                  <p className="text-sm text-gray-500">
                    Enable dark theme for better visibility
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('darkMode')}
                  className={\`relative inline-flex h-6 w-11 items-center rounded-full transition-colors \${settings.darkMode ? 'bg-gray-800' : 'bg-gray-200'}\`}
                >
                  <span className={\`inline-block h-4 w-4 transform rounded-full bg-white transition-transform \${settings.darkMode ? 'translate-x-6' : 'translate-x-1'}\`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Auto Save
                  </label>
                  <p className="text-sm text-gray-500">
                    Automatically save your work periodically
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('autoSave')}
                  className={\`relative inline-flex h-6 w-11 items-center rounded-full transition-colors \${settings.autoSave ? 'bg-green-600' : 'bg-gray-200'}\`}
                >
                  <span className={\`inline-block h-4 w-4 transform rounded-full bg-white transition-transform \${settings.autoSave ? 'translate-x-6' : 'translate-x-1'}\`} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Language</h2>
            <div className="flex space-x-4">
              {['en', 'es', 'fr', 'de'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setSettings(prev => ({ ...prev, language: lang }))}
                  className={\`px-4 py-2 rounded-md transition-colors \${settings.language === lang
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}\`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Danger Zone</h2>
                <p className="text-sm text-gray-500">
                  These actions cannot be undone
                </p>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    };

    setGeneratedComponents(Object.keys(sampleComponents));
    setComponentCodes(sampleComponents);
    setSelectedComponent(Object.keys(sampleComponents)[0] ?? null);

    const completionMessage: Message = {
      id: crypto.randomUUID(),
      type: "agent",
      content: `🎉 Code Generation Complete!\n\nGenerated ${Object.keys(sampleComponents).length} components successfully:\n• MainLayout - Main application layout with navigation\n• Dashboard - Analytics dashboard with metrics\n• Settings - User preferences and configuration\n\nYour project structure is ready for development. You can now:\n1. View and edit the generated components\n2. Customize the code to fit your specific needs\n3. Add additional components as required\n4. Deploy your application`,
      timestamp: new Date(),
      metadata: {
        agentType: "code-generation",
        phase: "generation",
        status: "completed",
      },
    };

    setMessages((m) => [...m, completionMessage]);
    setCurrentPhase("completed");
  }

  return (
    <div style={styles.container}>
      {/* LEFT PANEL */}
      <div style={styles.left}>
        <div style={styles.header}>
          <h2 style={styles.title}>🤖 Agentic Composer</h2>
          <div style={styles.statusBadge}>
            <span style={styles.statusIcon}>{getPhaseIcon(currentPhase)}</span>
            <span style={styles.statusText}>
              {currentPhase === "idle"
                ? "Ready"
                : currentPhase === "completed"
                  ? "Complete"
                  : currentPhase}
            </span>
          </div>
        </div>

        {isProcessing && (
          <div style={styles.progressContainer}>
            <div style={styles.progressHeader}>
              <span style={styles.progressLabel}>Agent Processing</span>
              <span style={styles.progressPercent}>{agentProgress}%</span>
            </div>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${agentProgress}%`,
                  backgroundColor: getPhaseColor(currentPhase),
                }}
              />
            </div>
            <div style={styles.progressSteps}>
              <span style={{ opacity: agentProgress >= 25 ? 1 : 0.3 }}>
                Requirements
              </span>
              <span style={{ opacity: agentProgress >= 60 ? 1 : 0.3 }}>
                Specification
              </span>
              <span style={{ opacity: agentProgress >= 85 ? 1 : 0.3 }}>
                Generation
              </span>
            </div>
          </div>
        )}

        <div style={styles.chat}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                ...styles.message,
                ...(msg.type === "user"
                  ? styles.userMessage
                  : styles.agentMessage),
                ...(msg.metadata?.status === "processing"
                  ? styles.processing
                  : {}),
              }}
            >
              {msg.metadata?.agentType && (
                <div style={styles.agentTypeBadge}>
                  {getPhaseIcon(msg.metadata.phase || "")}{" "}
                  {msg.metadata.agentType}
                </div>
              )}
              <div style={styles.messageContent}>{msg.content}</div>
              <div style={styles.timestamp}>
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div style={styles.loading}>
              <span style={styles.loadingIcon}>🤖</span>
              Agent thinking and generating components...
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={styles.inputRow}>
          <input
            className="agentic-input"
            style={styles.input}
            placeholder="Describe the component or flow you want to build..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isProcessing}
          />
          <button
            style={{
              ...styles.button,
              opacity: isProcessing ? 0.5 : 1,
              cursor: isProcessing ? "not-allowed" : "pointer",
            }}
            onClick={handleSend}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Send to Agent"}
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={styles.right}>
        <ComponentList
          components={generatedComponents}
          selected={selectedComponent}
          onSelect={setSelectedComponent}
        />

        {selectedComponent && (
          <ComponentPreview
            name={selectedComponent}
            code={componentCodes[selectedComponent]}
          />
        )}

        <FileStructureViewer
          structure={projectStructure}
          selectedFile={selectedFile}
          onSelectFile={setSelectedFile}
        />
      </div>
    </div>
  );
}

/* ---------------- STYLES & ANIMATIONS ---------------- */

const fadeIn: React.CSSProperties = {
  animation: "fadeIn 0.4s ease-out",
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    height: "100vh",
    background: "linear-gradient(180deg, #0f172a 0%, #0b1229 100%)",
    color: "#e5e7eb",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    padding: 16,
    borderRight: "1px solid #1e293b",
  },
  right: {
    padding: 16,
    overflowY: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 12px",
    borderRadius: 999,
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  statusIcon: {
    fontSize: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  progressContainer: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    border: "1px solid #334155",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#94a3b8",
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
  progressSteps: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 10,
    color: "#64748b",
  },
  chat: {
    flex: 1,
    overflowY: "auto",
    paddingRight: 8,
  },
  message: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    ...fadeIn,
    position: "relative",
  },
  userMessage: {
    background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
    alignSelf: "flex-end",
    boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.3)",
  },
  agentMessage: {
    background: "linear-gradient(180deg, #020617 0%, #0b1229 100%)",
    border: "1px solid #1e293b",
  },
  processing: {
    border: "1px solid #38bdf8",
    boxShadow: "0 0 15px rgba(56, 189, 248, 0.2)",
  },
  agentTypeBadge: {
    fontSize: 10,
    padding: "2px 6px",
    borderRadius: 999,
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    marginBottom: 6,
    display: "inline-block",
  },
  messageContent: {
    fontSize: 14,
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
  },
  timestamp: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 6,
    textAlign: "right",
  },
  loading: {
    fontStyle: "italic",
    opacity: 0.7,
    animation: "pulse 1.4s infinite",
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 8,
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    border: "1px solid #334155",
  },
  loadingIcon: {
    fontSize: 16,
  },
  inputRow: {
    display: "flex",
    gap: 8,
    marginTop: 12,
  },
  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #334155",
    background: "#020617",
    color: "#e5e7eb",
    fontSize: 14,
    transition: "all 0.2s ease",
  },
  button: {
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
};

/* Global keyframes (safe in Next.js client) */
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
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
.agentic-container {
  min-height: 100vh;
}

.agentic-input:focus {
  outline: none;
  border-color: #38bdf8;
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
}

.agentic-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.agentic-button:active:not(:disabled) {
  transform: translateY(0);
}

  `;
  document.head.appendChild(style);
}
