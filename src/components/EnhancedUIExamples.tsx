"use client";

import * as React from "react";
import { useState } from "react";

interface ButtonProps {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "neon"
    | "glass"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface CardHeaderProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectValueProps {
  placeholder?: string;
}

interface SelectContentProps {
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

// Custom Components with Inline CSS
const Button = ({
  variant = "default",
  size = "default",
  children,
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) => {
  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    borderRadius: "8px",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    opacity: disabled ? 0.5 : 1,
    transform: "translateZ(0)",
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      ...baseStyles,
      backgroundColor: "#2563eb",
      color: "white",
      padding: "12px 16px",
      fontSize: "14px",
    },
    secondary: {
      ...baseStyles,
      backgroundColor: "#64748b",
      color: "white",
      padding: "12px 16px",
      fontSize: "14px",
    },
    outline: {
      ...baseStyles,
      backgroundColor: "transparent",
      color: "#374151",
      border: "2px solid #d1d5db",
      padding: "12px 16px",
      fontSize: "14px",
    },
    ghost: {
      ...baseStyles,
      backgroundColor: "transparent",
      color: "#374151",
      padding: "12px 16px",
      fontSize: "14px",
    },
    neon: {
      ...baseStyles,
      backgroundColor: "#0f172a",
      color: "#38bdf8",
      border: "2px solid #38bdf8",
      padding: "12px 16px",
      fontSize: "14px",
      boxShadow: "0 0 15px rgba(56, 189, 248, 0.5)",
    },
    glass: {
      ...baseStyles,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "#1f2937",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      padding: "12px 16px",
      fontSize: "14px",
      backdropFilter: "blur(10px)",
    },
    destructive: {
      ...baseStyles,
      backgroundColor: "#ef4444",
      color: "white",
      padding: "8px 12px",
      fontSize: "12px",
    },
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    default: { padding: "12px 16px", fontSize: "14px" },
    sm: { padding: "8px 12px", fontSize: "12px" },
    lg: { padding: "16px 24px", fontSize: "16px" },
    icon: {
      padding: "12px",
      fontSize: "16px",
      minWidth: "44px",
      minHeight: "44px",
    },
  };

  const styles = {
    ...variantStyles[variant],
    ...(size !== "default" ? sizeStyles[size] : {}),
  };

  return (
    <button
      style={styles}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        }
      }}
      className={className}
    >
      {children}
    </button>
  );
};

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "12px 16px",
        borderRadius: "8px",
        border: "2px solid #e5e7eb",
        fontSize: "14px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        backgroundColor: "#ffffff",
        boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.05)",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#2563eb";
        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "#e5e7eb";
        e.currentTarget.style.boxShadow = "none";
      }}
      className={className}
    />
  );
};

const Textarea = ({
  placeholder,
  value,
  onChange,
  className = "",
}: TextareaProps) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "12px 16px",
        borderRadius: "8px",
        border: "2px solid #e5e7eb",
        fontSize: "14px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        backgroundColor: "#ffffff",
        boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.05)",
        minHeight: "100px",
        resize: "vertical",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#2563eb";
        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "#e5e7eb";
        e.currentTarget.style.boxShadow = "none";
      }}
      className={className}
    />
  );
};

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        border: "1px solid #e5e7eb",
      }}
      className={className}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
      }}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children }: CardHeaderProps) => {
  return (
    <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e7eb" }}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = "" }: CardTitleProps) => {
  return (
    <h3
      style={{
        fontSize: "18px",
        fontWeight: 700,
        color: "#111827",
        margin: 0,
      }}
      className={className}
    >
      {children}
    </h3>
  );
};

const CardDescription = ({ children }: CardDescriptionProps) => {
  return (
    <p
      style={{
        fontSize: "14px",
        color: "#6b7280",
        margin: "4px 0 0 0",
      }}
    >
      {children}
    </p>
  );
};

const CardContent = ({ children, className = "" }: CardContentProps) => {
  return (
    <div style={{ padding: "16px 20px" }} className={className}>
      {children}
    </div>
  );
};

const CardFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ padding: "16px 20px", borderTop: "1px solid #e5e7eb" }}>
      {children}
    </div>
  );
};

const Select = ({ value, onValueChange, children }: SelectProps) => {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "8px",
          border: "2px solid #e5e7eb",
          fontSize: "14px",
          backgroundColor: "#ffffff",
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#2563eb";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e5e7eb";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {children}
      </select>
    </div>
  );
};

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
  onTabChange?: (value: string) => void;
  activeTab?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const Tabs = ({ value, onValueChange, children }: TabsProps) => {
  const [activeContent, setActiveContent] = useState(value);

  React.useEffect(() => {
    setActiveContent(value);
  }, [value]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          borderBottom: "2px solid #e5e7eb",
          marginBottom: "16px",
        }}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === TabsList) {
            return React.cloneElement(
              child as React.ReactElement<TabsListProps>,
              {
                onTabChange: onValueChange,
                activeTab: value,
              },
            );
          }
          return child;
        })}
      </div>
      <div>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === TabsContent) {
            const childProps = child.props as TabsContentProps;
            return React.cloneElement(
              child as React.ReactElement<TabsContentProps>,
              {
                isActive: childProps.value === activeContent,
              },
            );
          }
          return child;
        })}
      </div>
    </div>
  );
};

const TabsList = ({ children, onTabChange, activeTab }: TabsListProps) => {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsTrigger) {
          const childProps = child.props as TabsTriggerProps;
          return React.cloneElement(
            child as React.ReactElement<TabsTriggerProps>,
            {
              onClick: () => onTabChange?.(childProps.value),
              isActive: childProps.value === activeTab,
            },
          );
        }
        return child;
      })}
    </div>
  );
};

const TabsTrigger = ({
  value,
  children,
  onClick,
  isActive = false,
}: TabsTriggerProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 16px",
        border: "none",
        backgroundColor: "transparent",
        color: isActive ? "#2563eb" : "#6b7280",
        fontWeight: isActive ? 700 : 500,
        borderBottom: isActive ? "2px solid #2563eb" : "2px solid transparent",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderRadius: "4px",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = "#374151";
          e.currentTarget.style.backgroundColor = "#f3f4f6";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = "#6b7280";
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
    >
      {children}
    </button>
  );
};

const TabsContent = ({
  value,
  children,
  isActive = false,
}: TabsContentProps) => {
  if (!isActive) return null;

  return (
    <div
      style={{
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      {children}
    </div>
  );
};

export function EnhancedUIExamples() {
  const [selectedValue, setSelectedValue] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const frameworks = [
    { value: "nextjs", label: "Next.js" },
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "svelte", label: "Svelte" },
    { value: "angular", label: "Angular" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)",
        padding: "48px 0",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            animation: "fadeIn 0.6s ease-out",
          }}
        >
          <h1
            style={{
              fontSize: "40px",
              fontWeight: 800,
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0 0 16px 0",
              textShadow: "0 4px 20px rgba(37, 99, 235, 0.3)",
            }}
          >
            Enhanced UI Components
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#64748b",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Beautiful, animated components with inline CSS and smooth
            transitions
          </p>
        </div>

        {/* Buttons Section */}
        <Card
          style={{
            animation: "fadeIn 0.6s ease-out",
            animationDelay: "0.1s",
            animationFillMode: "both",
          }}
        >
          <CardHeader>
            <CardTitle>Enhanced Buttons</CardTitle>
            <CardDescription>
              Multiple button variants with hover effects and animations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="neon">Neon</Button>
              <Button variant="glass">Glass</Button>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <Button variant="destructive" size="sm">
                Destructive
              </Button>
              <Button variant="default" size="lg">
                Large Button
              </Button>
              <Button variant="default" size="icon">
                🔧
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Forms Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            animation: "fadeIn 0.6s ease-out",
            animationDelay: "0.2s",
            animationFillMode: "both",
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Enhanced Inputs</CardTitle>
              <CardDescription>
                Beautiful input fields with focus animations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Email Address
                </label>
                <Input type="email" placeholder="Enter your email" />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Password
                </label>
                <Input type="password" placeholder="Enter your password" />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Message
                </label>
                <Textarea placeholder="Type your message here..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enhanced Select</CardTitle>
              <CardDescription>
                Beautiful dropdown with smooth animations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Select Framework
                </label>
                <Select value={selectedValue} onValueChange={setSelectedValue}>
                  <option value="">Choose a framework</option>
                  {frameworks.map((framework) => (
                    <option key={framework.value} value={framework.value}>
                      {framework.label}
                    </option>
                  ))}
                </Select>
              </div>
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  Selected:{" "}
                  <span style={{ fontWeight: 600 }}>
                    {selectedValue || "None"}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Card
          style={{
            animation: "fadeIn 0.6s ease-out",
            animationDelay: "0.3s",
            animationFillMode: "both",
          }}
        >
          <CardHeader>
            <CardTitle>Enhanced Tabs</CardTitle>
            <CardDescription>
              Smooth tab transitions with animated content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    Project Overview
                  </h3>
                  <p
                    style={{
                      color: "#6b7280",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    This is the overview tab with enhanced animations and smooth
                    transitions. The content fades in when the tab is selected,
                    providing a polished user experience.
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "16px",
                    }}
                  >
                    <Card>
                      <CardContent>
                        <div
                          style={{
                            fontSize: "24px",
                            fontWeight: 800,
                            color: "#2563eb",
                            marginBottom: "4px",
                          }}
                        >
                          24
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#6b7280",
                          }}
                        >
                          Active Projects
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent>
                        <div
                          style={{
                            fontSize: "24px",
                            fontWeight: 800,
                            color: "#7c3aed",
                            marginBottom: "4px",
                          }}
                        >
                          1,234
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#6b7280",
                          }}
                        >
                          Total Users
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent>
                        <div
                          style={{
                            fontSize: "24px",
                            fontWeight: 800,
                            color: "#10b981",
                            marginBottom: "4px",
                          }}
                        >
                          98%
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#6b7280",
                          }}
                        >
                          Success Rate
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="settings">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    Settings
                  </h3>
                  <p
                    style={{
                      color: "#6b7280",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    Configure your application settings with our enhanced UI
                    components. Every interaction is smooth and animated for the
                    best user experience.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <Card>
                      <CardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "16px",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                          }}
                        >
                          <div>
                            <h4
                              style={{
                                fontWeight: 600,
                                marginBottom: "4px",
                              }}
                            >
                              Dark Mode
                            </h4>
                            <p
                              style={{
                                fontSize: "12px",
                                color: "#6b7280",
                              }}
                            >
                              Enable dark theme
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Toggle
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "16px",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                          }}
                        >
                          <div>
                            <h4
                              style={{
                                fontWeight: 600,
                                marginBottom: "4px",
                              }}
                            >
                              Notifications
                            </h4>
                            <p
                              style={{
                                fontSize: "12px",
                                color: "#6b7280",
                              }}
                            >
                              Manage notification settings
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="analytics">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    Analytics
                  </h3>
                  <p
                    style={{
                      color: "#6b7280",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    View your application analytics with beautiful charts and
                    smooth animations. Data visualization has never been this
                    elegant.
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "16px",
                    }}
                  >
                    <Card
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      <CardContent>
                        <div
                          style={{
                            fontSize: "24px",
                            fontWeight: 800,
                            marginBottom: "4px",
                          }}
                        >
                          📈
                        </div>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            marginBottom: "4px",
                          }}
                        >
                          Traffic
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#6b7280",
                          }}
                        >
                          +23% from last month
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      <CardContent>
                        <div
                          style={{
                            fontSize: "24px",
                            fontWeight: 800,
                            marginBottom: "4px",
                          }}
                        >
                          💰
                        </div>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            marginBottom: "4px",
                          }}
                        >
                          Revenue
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#6b7280",
                          }}
                        >
                          $45,230 this month
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="integrations">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    Integrations
                  </h3>
                  <p
                    style={{
                      color: "#6b7280",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    Connect your favorite tools and services with our seamless
                    integration system. Every connection is secure and
                    beautifully animated.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {["GitHub", "Slack", "Notion", "Figma", "Linear"].map(
                      (service) => (
                        <Card
                          key={service}
                          style={{
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        >
                          <CardContent>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "16px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "12px",
                                }}
                              >
                                <div
                                  style={{
                                    width: "32px",
                                    height: "32px",
                                    backgroundColor: "rgba(37, 99, 235, 0.1)",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: 800,
                                      color: "#2563eb",
                                    }}
                                  >
                                    {service[0]}
                                  </span>
                                </div>
                                <div>
                                  <div
                                    style={{
                                      fontWeight: 600,
                                    }}
                                  >
                                    {service}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      color: "#6b7280",
                                    }}
                                  >
                                    Integration active
                                  </div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Manage
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ),
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Showcase Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            animation: "fadeIn 0.6s ease-out",
            animationDelay: "0.4s",
            animationFillMode: "both",
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ fontSize: "24px" }}>🎨</span>
                <span>Design</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Beautiful animations and transitions that enhance user
                experience without being distracting.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ fontSize: "24px" }}>⚡</span>
                <span>Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Optimized for performance with smooth 60fps animations and
                efficient rendering.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ fontSize: "24px" }}>🔧</span>
                <span>Flexible</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Highly customizable components that can be adapted to any design
                system or brand.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            animation: "fadeIn 0.6s ease-out",
            animationDelay: "0.5s",
            animationFillMode: "both",
          }}
        >
          <Card
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <CardContent>
              <p
                style={{
                  color: "#6b7280",
                  lineHeight: 1.6,
                  margin: 0,
                  fontSize: "14px",
                }}
              >
                These enhanced UI components provide a modern, animated
                experience with inline CSS and smooth transitions. Perfect for
                building beautiful AI-powered applications.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Global Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
      `}</style>
    </div>
  );
}
