"use client";

import { useState } from "react";
import { AgenticComposer } from "@/components/AgenticComposer";
import { ComponentPreview } from "@/components/ComponentPreview";
import { FileStructureViewer } from "@/components/FileStructureViewer";
import { GenerativeComponent } from "@/components/GenerativeComponent";
import { InteractableComponent } from "@/components/InteractableComponent";
import { PageCanvas } from "@/components/PageCanvas";
import { FlowEditor } from "@/components/FlowEditor";
import { AuthWidget } from "@/components/AuthWidget";
import { APITest } from "@/components/APITest";
import { DeployStatus } from "@/components/DeployStatus";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [activeTab, setActiveTab] = useState("composer");

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "32px 16px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          <h1
            style={{
              fontSize: "40px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "16px",
              textShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
            }}
          >
            Tambo AI Agentic Composer
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#666",
              fontWeight: "500",
            }}
          >
            Transform your ideas into working React applications through AI
            conversation
          </p>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <button
            onClick={() => setActiveTab("composer")}
            style={{
              background: activeTab === "composer" ? "#667eea" : "#f3f4f6",
              color: activeTab === "composer" ? "white" : "#374151",
              border: "none",
              padding: "12px 16px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow:
                activeTab === "composer"
                  ? "0 4px 15px rgba(102, 126, 234, 0.4)"
                  : "none",
            }}
          >
            Composer
          </button>
          <button
            onClick={() => setActiveTab("components")}
            style={{
              background: activeTab === "components" ? "#667eea" : "#f3f4f6",
              color: activeTab === "components" ? "white" : "#374151",
              border: "none",
              padding: "12px 16px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow:
                activeTab === "components"
                  ? "0 4px 15px rgba(102, 126, 234, 0.4)"
                  : "none",
            }}
          >
            Components
          </button>
          <button
            onClick={() => setActiveTab("canvas")}
            style={{
              background: activeTab === "canvas" ? "#667eea" : "#f3f4f6",
              color: activeTab === "canvas" ? "white" : "#374151",
              border: "none",
              padding: "12px 16px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow:
                activeTab === "canvas"
                  ? "0 4px 15px rgba(102, 126, 234, 0.4)"
                  : "none",
            }}
          >
            Canvas
          </button>
          <button
            onClick={() => setActiveTab("tools")}
            style={{
              background: activeTab === "tools" ? "#667eea" : "#f3f4f6",
              color: activeTab === "tools" ? "white" : "#374151",
              border: "none",
              padding: "12px 16px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow:
                activeTab === "tools"
                  ? "0 4px 15px rgba(102, 126, 234, 0.4)"
                  : "none",
            }}
          >
            Tools
          </button>
        </div>

        {/* Composer Tab */}
        {activeTab === "composer" && (
          <div>
            <Card
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <div
                style={{
                  marginBottom: "16px",
                }}
              >
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#111827",
                    marginBottom: "8px",
                  }}
                >
                  AI Product Composer
                </h2>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "14px",
                  }}
                >
                  Describe your application requirements and let Tambo AI build
                  it for you
                </p>
              </div>
              <div
                style={{
                  minHeight: "200px",
                  background: "#f9fafb",
                  border: "1px dashed #d1d5db",
                  borderRadius: "8px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b7280",
                }}
              >
                <AgenticComposer />
              </div>
            </Card>
          </div>
        )}

        {/* Components Tab */}
        {activeTab === "components" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "24px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "24px",
              }}
            >
              <Card
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    marginBottom: "16px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "8px",
                    }}
                  >
                    Generative Components
                  </h2>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    AI-generated React components from natural language
                    descriptions
                  </p>
                </div>
                <div
                  style={{
                    minHeight: "150px",
                    background: "#f9fafb",
                    border: "1px dashed #d1d5db",
                    borderRadius: "8px",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                  }}
                >
                  <GenerativeComponent />
                </div>
              </Card>

              <Card
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    marginBottom: "16px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "8px",
                    }}
                  >
                    Interactable Components
                  </h2>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    Components that can be modified and enhanced through Tambo
                    AI
                  </p>
                </div>
                <div
                  style={{
                    minHeight: "150px",
                    background: "#f9fafb",
                    border: "1px dashed #d1d5db",
                    borderRadius: "8px",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                  }}
                >
                  <InteractableComponent />
                </div>
              </Card>
            </div>

            <Card
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <div
                style={{
                  marginBottom: "16px",
                }}
              >
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#111827",
                    marginBottom: "8px",
                  }}
                >
                  Component Preview
                </h2>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "14px",
                  }}
                >
                  Live preview of generated components
                </p>
              </div>
              <div
                style={{
                  minHeight: "200px",
                  background: "#f9fafb",
                  border: "1px dashed #d1d5db",
                  borderRadius: "8px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b7280",
                }}
              >
                <ComponentPreview />
              </div>
            </Card>
          </div>
        )}

        {/* Canvas Tab */}
        {activeTab === "canvas" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "24px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
              }}
            >
              <Card
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    marginBottom: "16px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "8px",
                    }}
                  >
                    Page Canvas
                  </h2>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    Visual interface builder for your application
                  </p>
                </div>
                <div
                  style={{
                    minHeight: "200px",
                    background: "#f9fafb",
                    border: "1px dashed #d1d5db",
                    borderRadius: "8px",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                  }}
                >
                  <PageCanvas />
                </div>
              </Card>

              <Card
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    marginBottom: "16px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "8px",
                    }}
                  >
                    File Structure
                  </h2>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    Project file structure and management
                  </p>
                </div>
                <div
                  style={{
                    minHeight: "200px",
                    background: "#f9fafb",
                    border: "1px dashed #d1d5db",
                    borderRadius: "8px",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                  }}
                >
                  <FileStructureViewer />
                </div>
              </Card>

              <Card
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    marginBottom: "16px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "8px",
                    }}
                  >
                    Flow Editor
                  </h2>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    Visual workflow and state management editor
                  </p>
                </div>
                <div
                  style={{
                    minHeight: "200px",
                    background: "#f9fafb",
                    border: "1px dashed #d1d5db",
                    borderRadius: "8px",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                  }}
                >
                  <FlowEditor />
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Tools Tab */}
        {activeTab === "tools" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "24px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
              }}
            >
              <Card
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    marginBottom: "16px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "8px",
                    }}
                  >
                    Auth Widget
                  </h2>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    Authentication and user management
                  </p>
                </div>
                <div
                  style={{
                    minHeight: "150px",
                    background: "#f9fafb",
                    border: "1px dashed #d1d5db",
                    borderRadius: "8px",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                  }}
                >
                  <AuthWidget />
                </div>
              </Card>

              <Card
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    marginBottom: "16px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "8px",
                    }}
                  >
                    API Test
                  </h2>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    Test and validate your API endpoints
                  </p>
                </div>
                <div
                  style={{
                    minHeight: "150px",
                    background: "#f9fafb",
                    border: "1px dashed #d1d5db",
                    borderRadius: "8px",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                  }}
                >
                  <APITest />
                </div>
              </Card>

              <Card
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    marginBottom: "16px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "8px",
                    }}
                  >
                    Deploy Status
                  </h2>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    Monitor deployment status and health
                  </p>
                </div>
                <div
                  style={{
                    minHeight: "150px",
                    background: "#f9fafb",
                    border: "1px dashed #d1d5db",
                    borderRadius: "8px",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                  }}
                >
                  <DeployStatus />
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
