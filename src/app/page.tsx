// "use client";

// import { useState } from "react";
// import { AgenticComposer } from "@/components/AgenticComposer";
// import { ComponentPreview } from "@/components/ComponentPreview";
// import { FileStructureViewer } from "@/components/FileStructureViewer";
// import { GenerativeComponent } from "@/components/GenerativeComponent";
// import { InteractableComponent } from "@/components/InteractableComponent";
// import { PageCanvas } from "@/components/PageCanvas";
// import { FlowEditor } from "@/components/FlowEditor";
// import { AuthWidget } from "@/components/AuthWidget";
// import { APITest } from "@/components/APITest";
// import { DeployStatus } from "@/components/DeployStatus";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// export default function Home() {
//   const [activeTab, setActiveTab] = useState("composer");

//   return (
//     <main
//       style={{
//         minHeight: "100vh",
//         padding: "16px 32px",
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         animation: "gradientShift 8s ease-in-out infinite",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "1200px",
//           margin: "0 auto",
//         }}
//       >
//         <div
//           style={{
//             background: "rgba(255, 255, 255, 0.95)",
//             borderRadius: "24px",
//             padding: "24px 40px",
//             boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
//             animation: "fadeInScale 0.6s ease-out",
//             backdropFilter: "blur(10px)",
//             border: "1px solid rgba(255, 255, 255, 0.2)",
//           }}
//         >
//           {/* Header */}
//           <div
//             style={{
//               textAlign: "center",
//               marginBottom: "40px",
//               animation: "fadeIn 0.6s ease-out",
//             }}
//           >
//             <h1
//               style={{
//                 fontSize: "48px",
//                 fontWeight: "800",
//                 background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 marginBottom: "16px",
//                 animation: "float 3s ease-in-out infinite",
//               }}
//             >
//               Tambo AI Agentic Composer
//             </h1>
//             <p
//               style={{
//                 fontSize: "20px",
//                 color: "#666",
//                 fontWeight: "500",
//                 animation: "fadeIn 0.6s ease-out 0.1s both",
//               }}
//             >
//               Transform your ideas into working React applications through AI
//               conversation
//             </p>
//             <div
//               style={{
//                 marginTop: "24px",
//                 display: "flex",
//                 justifyContent: "center",
//                 gap: "8px",
//                 animation: "fadeIn 0.6s ease-out 0.2s both",
//               }}
//             >
//               {[
//                 { text: "✨ AI-Powered", bg: "#e0e7ff", color: "#4f46e5" },
//                 { text: "⚡ Real-time", bg: "#dbeafe", color: "#2563eb" },
//                 { text: "🚀 Fast Deploy", bg: "#dcfce7", color: "#16a34a" },
//               ].map((badge, index) => (
//                 <span
//                   key={index}
//                   style={{
//                     padding: "8px 16px",
//                     backgroundColor: badge.bg,
//                     color: badge.color,
//                     borderRadius: "999px",
//                     fontSize: "14px",
//                     fontWeight: "700",
//                     transform: "translateY(0)",
//                     transition: "transform 0.2s ease",
//                     animation: "fadeIn 0.6s ease-out 0.3s both",
//                   }}
//                 >
//                   {badge.text}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Tabs */}
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(4, 1fr)",
//               gap: "12px",
//               marginBottom: "32px",
//               animation: "slideInLeft 0.6s ease-out",
//             }}
//           >
//             {[
//               { id: "composer", label: "Composer", icon: "🎨" },
//               { id: "components", label: "Components", icon: "🧩" },
//               { id: "canvas", label: "Canvas", icon: "🖼️" },
//               { id: "tools", label: "Tools", icon: "🔧" },
//             ].map((tab, index) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 style={{
//                   position: "relative",
//                   overflow: "hidden",
//                   borderRadius: "16px",
//                   padding: "16px 24px",
//                   fontWeight: "700",
//                   fontSize: "16px",
//                   border: "none",
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                   transform: "translateY(0)",
//                   animationDelay: `${index * 0.1}s`,
//                   animation: "fadeIn 0.6s ease-out both",
//                   ...(activeTab === tab.id
//                     ? {
//                         background:
//                           "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                         color: "white",
//                         boxShadow: "0 10px 20px rgba(102, 126, 234, 0.4)",
//                         textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
//                       }
//                     : {
//                         background: "white",
//                         color: "#333",
//                         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//                         border: "1px solid #e5e7eb",
//                       }),
//                 }}
//               >
//                 <span style={{ marginRight: "8px" }}>{tab.icon}</span>
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {/* Composer Tab */}
//           {activeTab === "composer" && (
//               <div
//                 style={{
//                   background: "white",
//                   borderRadius: "20px",
//                   padding: "24px",
//                   boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                   transform: "translateY(0)",
//                   transition: "transform 0.3s ease",
//                   animation: "slideInRight 0.6s ease-out 0.1s both",
//                 }}
//               >
//                 <div style={{ marginBottom: "24px" }}>
//                   <h2
//                     style={{
//                       fontSize: "24px",
//                       fontWeight: "800",
//                       color: "#111827",
//                       marginBottom: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <span style={{ marginRight: "12px", fontSize: "32px" }}>
//                       ⚡
//                     </span>
//                     Interactable Components
//                   </h2>
//                   <p
//                     style={{
//                       color: "#6b7280",
//                       fontSize: "16px",
//                     }}
//                   >
//                     Components that can be modified and enhanced through Tambo
//                     AI
//                   </p>
//                 </div>
//                 <div
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #dcfce7 0%, #dbeafe 100%)",
//                     borderRadius: "16px",
//                     padding: "16px",
//                     border: "2px dashed #93c5fd",
//                     minHeight: "200px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <InteractableComponent componentName="TestComponent" initialCode="const TestComponent = () => <div>Test</div>;" />
//                 </div>
//               </div>
//           )};

//           {/* Components Tab */}
//           {activeTab === "components" &&
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "24px",
//                 animation: "fadeInScale 0.6s ease-out",
//               }}
//             >
//               <div
//                 style={{
//                   background: "white",
//                   borderRadius: "20px",
//                   padding: "24px",
//                   boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                   transform: "translateY(0)",
//                   transition: "transform 0.3s ease",
//                   animation: "slideInLeft 0.6s ease-out",
//                 }}
//               >
//                 <div style={{ marginBottom: "24px" }}>
//                   <h2
//                     style={{
//                       fontSize: "24px",
//                       fontWeight: "800",
//                       color: "#111827",
//                       marginBottom: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <span style={{ marginRight: "12px", fontSize: "32px" }}>
//                       🔮
//                     </span>
//                     Generative Components
//                   </h2>
//                   <p
//                     style={{
//                       color: "#6b7280",
//                       fontSize: "16px",
//                     }}
//                   >
//                     AI-generated React components from natural language
//                     descriptions
//                   </p>
//                 </div>
//                 <div
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #dbeafe 0%, #f3e8ff 100%)",
//                     borderRadius: "16px",
//                     padding: "16px",
//                     border: "2px dashed #bfdbfe",
//                     minHeight: "200px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <GenerativeComponent prompt="Create a simple button component" />
//                 </div>

//               <div
//                 style={{
//                   background: "white",
//                   borderRadius: "20px",
//                   padding: "24px",
//                   boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                   transform: "translateY(0)",
//                   transition: "transform 0.3s ease",
//                   animation: "slideInRight 0.6s ease-out 0.1s both",
//                 }}
//               >
//                 <div style={{ marginBottom: "24px" }}>
//                   <h2
//                     style={{
//                       fontSize: "24px",
//                       fontWeight: "800",
//                       color: "#111827",
//                       marginBottom: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <span style={{ marginRight: "12px", fontSize: "32px" }}>
//                       ⚡
//                     </span>
//                     Interactable Components
//                   </h2>
//                   <p
//                     style={{
//                       color: "#6b7280",
//                       fontSize: "16px",
//                     }}
//                   >
//                     Components that can be modified and enhanced through Tambo
//                     AI
//                   </p>
//                 </div>
//                 <div
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #dbeafe 0%, #f3e8ff 100%)",
//                     borderRadius: "16px",
//                     padding: "16px",
//                     border: "2px dashed #bfdbfe",
//                     minHeight: "200px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <GenerativeComponent prompt="Create a simple button component" />
//                 </div>
//               </div>

//               <div
//                 style={{
//                   background: "white",
//                   borderRadius: "20px",
//                   padding: "24px",
//                   boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                   transform: "translateY(0)",
//                   transition: "transform 0.3s ease",
//                   animation: "fadeIn 0.6s ease-out 0.2s both",
//                   gridColumn: "1 / -1",
//                 }}
//               >
//                 <div style={{ marginBottom: "24px" }}>
//                   <h2
//                     style={{
//                       fontSize: "24px",
//                       fontWeight: "800",
//                       color: "#111827",
//                       marginBottom: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <span style={{ marginRight: "12px", fontSize: "32px" }}>
//                       👁️
//                     </span>
//                     Component Preview
//                   </h2>
//                   <p
//                     style={{
//                       color: "#6b7280",
//                       fontSize: "16px",
//                     }}
//                   >
//                     Live preview of generated components
//                   </p>
//                 </div>
//                 <div
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%)",
//                     borderRadius: "16px",
//                     padding: "16px",
//                     border: "2px dashed #e9d5ff",
//                     minHeight: "250px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <ComponentPreview />
//                 </div>
//               </div>
//             </div>
//           }

//           {/* Canvas Tab */}
//           {activeTab === "canvas" && (
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(3, 1fr)",
//                 gap: "24px",
//                 animation: "fadeInScale 0.6s ease-out",
//               }}
//             >
//               <div
//                 style={{
//                   background: "white",
//                   borderRadius: "20px",
//                   padding: "24px",
//                   boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                   transform: "translateY(0)",
//                   transition: "transform 0.3s ease",
//                   animation: "fadeIn 0.6s ease-out",
//                 }}
//               >
//                 <div style={{ marginBottom: "24px" }}>
//                   <h2
//                     style={{
//                       fontSize: "24px",
//                       fontWeight: "800",
//                       color: "#111827",
//                       marginBottom: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <span style={{ marginRight: "12px", fontSize: "28px" }}>
//                       🖼️
//                     </span>
//                     Page Canvas
//                   </h2>
//                   <p
//                     style={{
//                       color: "#6b7280",
//                       fontSize: "14px",
//                     }}
//                   >
//                     Visual interface builder for your application
//                   </p>
//                 </div>
//                 <div
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #fff7ed 0%, #ffe4e6 100%)",
//                     borderRadius: "16px",
//                     padding: "16px",
//                     border: "2px dashed #fed7aa",
//                     minHeight: "250px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <PageCanvas />
//                 </div>
//               </div>

//               <div
//                 style={{
//                   background: "white",
//                   borderRadius: "20px",
//                   padding: "24px",
//                   boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                   transform: "translateY(0)",
//                   transition: "transform 0.3s ease",
//                   animation: "fadeIn 0.6s ease-out 0.1s both",
//                 }}
//               >
//                 <div style={{ marginBottom: "24px" }}>
//                   <h2
//                     style={{
//                       fontSize: "24px",
//                       fontWeight: "800",
//                       color: "#111827",
//                       marginBottom: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <span style={{ marginRight: "12px", fontSize: "28px" }}>
//                       📁
//                     </span>
//                     File Structure
//                   </h2>
//                   <p
//                     style={{
//                       color: "#6b7280",
//                       fontSize: "14px",
//                     }}
//                   >
//                     Project file structure and management
//                   </p>
//                 </div>
//                 <div
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #d1fae5 0%, #ccfbf1 100%)",
//                     borderRadius: "16px",
//                     padding: "16px",
//                     border: "2px dashed #a7f3d0",
//                     minHeight: "250px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <FileStructureViewer />
//                 </div>
//               </div>

//               <div
//                 style={{
//                   background: "white",
//                   borderRadius: "20px",
//                   padding: "24px",
//                   boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                   transform: "translateY(0)",
//                   transition: "transform 0.3s ease",
//                   animation: "fadeIn 0.6s ease-out 0.2s both",
//                 }}
//               >
//                 <div style={{ marginBottom: "24px" }}>
//                   <h2
//                     style={{
//                       fontSize: "24px",
//                       fontWeight: "800",
//                       color: "#111827",
//                       marginBottom: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <span style={{ marginRight: "12px", fontSize: "28px" }}>
//                       🌊
//                     </span>
//                     Flow Editor
//                   </h2>
//                   <p
//                     style={{
//                       color: "#6b7280",
//                       fontSize: "14px",
//                     }}
//                   >
//                     Visual workflow and state management editor
//                   </p>
//                 </div>
//                 <div
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)",
//                     borderRadius: "16px",
//                     padding: "16px",
//                     border: "2px dashed #93c5fd",
//                     minHeight: "250px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <FlowEditor />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Tools Tab */}
//           {activeTab === "tools" && (
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(3, 1fr)",
//                 gap: "24px",
//                 animation: "fadeInScale 0.6s ease-out",
//               }}
//             >
//               <div
//                 style={{
//                   background: "white",
//                   borderRadius: "20px",
//                   padding: "24px",
//                   boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                   transform: "translateY(0)",
//                   transition: "transform 0.3s ease",
//                   animation: "slideInLeft 0.6s ease-out",
//                 }}
//               >
//                 <div style={{ marginBottom: "24px" }}>
//                   <h2
//                     style={{
//                       fontSize: "24px",
//                       fontWeight: "800",
//                       color: "#111827",
//                       marginBottom: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <span style={{ marginRight: "12px", fontSize: "28px" }}>
//                       🔐
//                     </span>
//                     Auth Widget
//                   </h2>
//                   <p
//                     style={{
//                       color: "#6b7280",
//                       fontSize: "14px",
//                     }}
//                   >
//                     Authentication and user management
//                   </p>
//                 </div>
//                 <div
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%)",
//                     borderRadius: "16px",
//                     padding: "16px",
//                     border: "2px dashed #e9d5ff",
//                     minHeight: "200px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <AuthWidget />
//                 </div>
//               </div>

//               <div
//                 style={{
//                   background: "white",
//                   borderRadius: "20px",
//                   padding: "24px",
//                   boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                   transform: "translateY(0)",
//                   transition: "transform 0.3s ease",
//                   animation: "fadeIn 0.6s ease-out 0.1s both",
//                 }}
//               >
//                 <div style={{ marginBottom: "24px" }}>
//                   <h2
//                     style={{
//                       fontSize: "24px",
//                       fontWeight: "800",
//                       color: "#111827",
//                       marginBottom: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <span style={{ marginRight: "12px", fontSize: "28px" }}>
//                       🔌
//                     </span>
//                     API Test
//                   </h2>
//                   <p
//                     style={{
//                       color: "#6b7280",
//                       fontSize: "14px",
//                     }}
//                   >
//                     Test and validate your API endpoints
//                   </p>
//                 </div>
//                 <div
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)",
//                     borderRadius: "16px",
//                     padding: "16px",
//                     border: "2px dashed #93c5fd",
//                     minHeight: "200px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <APITest />
//                 </div>
//               </div>

//               <div
//                 style={{
//                   background: "white",
//                   borderRadius: "20px",
//                   padding: "24px",
//                   boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                   transform: "translateY(0)",
//                   transition: "transform 0.3s ease",
//                   animation: "slideInRight 0.6s ease-out 0.2s both",
//                 }}
//               >
//                 <div style={{ marginBottom: "24px" }}>
//                   <h2
//                     style={{
//                       fontSize: "24px",
//                       fontWeight: "800",
//                       color: "#111827",
//                       marginBottom: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <span style={{ marginRight: "12px", fontSize: "28px" }}>
//                       🚀
//                     </span>
//                     Deploy Status
//                   </h2>
//                   <p
//                     style={{
//                       color: "#6b7280",
//                       fontSize: "14px",
//                     }}
//                   >
//                     Monitor deployment status and health
//                   </p>
//                 </div>
//                 <div
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)",
//                     borderRadius: "16px",
//                     padding: "16px",
//                     border: "2px dashed #a7f3d0",
//                     minHeight: "200px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <DeployStatus />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Footer */}
//           <div
//             style={{
//               marginTop: "40px",
//               textAlign: "center",
//               color: "#9ca3af",
//               fontSize: "14px",
//               animation: "fadeIn 0.6s ease-out 0.3s both",
//             }}
//           >
//             <p>Powered by Tambo AI | Built with Next.js & React</p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";

import { GenerativeComponent } from "@/components/GenerativeComponent";
import { InteractableComponent } from "@/components/InteractableComponent";
import { ComponentPreview } from "@/components/ComponentPreview";
import { PageCanvas } from "@/components/PageCanvas";
import { FileStructureViewer } from "@/components/FileStructureViewer";
import { FlowEditor } from "@/components/FlowEditor";
import { AuthWidget } from "@/components/AuthWidget";
import { APITest } from "@/components/APITest";
import { DeployStatus } from "@/components/DeployStatus";
import { EnhancedUIExamples } from "@/components/EnhancedUIExamples";

type Tab = "composer" | "components" | "canvas" | "tools";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("composer");

  return (
    <main style={styles.page}>
      <style>{animations}</style>

      <div style={styles.container}>
        <div style={styles.card}>
          {/* HEADER */}
          <header style={styles.header}>
            <h1 style={styles.title}>Tambo AI Agentic Composer</h1>
            <p style={styles.subtitle}>Build agent-based React apps via AI</p>
          </header>

          {/* TABS */}
          <nav style={styles.tabs}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...styles.tab,
                  ...(activeTab === tab.id ? styles.tabActive : {}),
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>

          {/* COMPOSER */}
          {activeTab === "composer" && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>⚡ Enhanced UI Examples</h2>
              <div style={styles.dropZone}>
                <EnhancedUIExamples />
              </div>
            </section>
          )}

          {/* COMPONENTS */}
          {activeTab === "components" && (
            <section style={styles.grid2}>
              <Card title="🔮 Generative">
                <GenerativeComponent prompt="Create a primary button" />
              </Card>

              <Card title="⚡ Interactable">
                <InteractableComponent
                  title="Editable Button"
                  description="A button component that can be edited"
                  actionType="custom"
                  prompt="Create an editable button component"
                />
              </Card>

              <div style={{ gridColumn: "1 / -1" }}>
                <Card title="👁 Component Preview">
                  <ComponentPreview name="TestComponent" />
                </Card>
              </div>
            </section>
          )}

          {/* CANVAS */}
          {activeTab === "canvas" && (
            <section style={styles.grid3}>
              <Card title="🖼 Page Canvas">
                <PageCanvas />
              </Card>
              <Card title="📁 File Structure">
                <FileStructureViewer
                  selectedFile={null}
                  onSelectFile={() => {}}
                />
              </Card>
              <Card title="🌊 Flow Editor">
                <FlowEditor />
              </Card>
            </section>
          )}

          {/* TOOLS */}
          {activeTab === "tools" && (
            <section style={styles.grid3}>
              <Card title="🔐 Auth">
                <AuthWidget
                  onLogin={async () => {}}
                  onLogout={async () => {}}
                />
              </Card>
              <Card title="🔌 API Test">
                <APITest />
              </Card>
              <Card title="🚀 Deploy Status">
                <DeployStatus onDeploy={async () => {}} />
              </Card>
            </section>
          )}

          {/* FOOTER */}
          <footer style={styles.footer}>
            Powered by Tambo AI · Next.js · React
          </footer>
        </div>
      </div>
    </main>
  );
}

/* ----------------- Card Component ----------------- */

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={styles.block}>
      <h3 style={styles.blockTitle}>{title}</h3>
      <div style={styles.blockBody}>{children}</div>
    </div>
  );
}

/* ----------------- Tabs ----------------- */

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "composer", label: "Composer", icon: "🎨" },
  { id: "components", label: "Components", icon: "🧩" },
  { id: "canvas", label: "Canvas", icon: "🖼️" },
  { id: "tools", label: "Tools", icon: "🔧" },
];

/* ----------------- Styles ----------------- */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    padding: 24,
    animation: "gradient 10s ease infinite",
  },
  container: { maxWidth: 1200, margin: "0 auto" },
  card: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: 24,
    padding: 32,
    animation: "fadeScale .6s ease",
  },
  header: { textAlign: "center", marginBottom: 32 },
  title: {
    fontSize: 44,
    fontWeight: 800,
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: { color: "#555", fontSize: 18 },

  tabs: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 12,
    marginBottom: 32,
  },
  tab: {
    padding: 16,
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  tabActive: {
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "#fff",
    boxShadow: "0 10px 20px rgba(102,126,234,.4)",
  },

  section: { marginTop: 32 },
  sectionTitle: { fontSize: 24, marginBottom: 16 },

  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 24,
  },

  block: {
    background: "#fff",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 10px 25px rgba(0,0,0,.1)",
  },
  blockTitle: { fontSize: 20, marginBottom: 12 },
  blockBody: {
    minHeight: 180,
    border: "2px dashed #c7d2fe",
    borderRadius: 16,
    padding: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  dropZone: {
    minHeight: 200,
    border: "2px dashed #93c5fd",
    borderRadius: 16,
    padding: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  footer: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 14,
    color: "#9ca3af",
  },
};

/* ----------------- Animations ----------------- */

const animations = `
@keyframes fadeScale {
  from { opacity: 0; transform: scale(.96); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;
