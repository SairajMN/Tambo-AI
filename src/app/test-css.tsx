"use client";

export default function TestCSS() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "16px",
          }}
        >
          CSS Test - Inline Styles
        </h1>
        <p
          style={{
            color: "#666",
            marginBottom: "24px",
            fontSize: "16px",
          }}
        >
          If you can see this with gradient background and glass effect, CSS is
          working!
        </p>
        <button
          style={{
            background: "#3b82f6",
            color: "white",
            fontWeight: "600",
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
            transition: "all 0.2s ease",
            fontSize: "16px",
          }}
        >
          Test Button
        </button>
      </div>
    </div>
  );
}
