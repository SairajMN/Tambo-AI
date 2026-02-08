"use client";

import React, { ReactNode } from "react";

interface PageCanvasProps {
  title?: string;
  children?: ReactNode;
}

export function PageCanvas({ title, children }: PageCanvasProps) {
  return (
    <div style={styles.wrapper}>
      {title && <div style={styles.header}>{title}</div>}

      <div style={styles.canvas}>
        {children ? (
          <div style={styles.content}>{children}</div>
        ) : (
          <div style={styles.placeholder}>
            Drop components here or generate via agent
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#020617",
    borderRadius: 14,
    border: "1px solid #1e293b",
    overflow: "hidden",
    animation: "canvasFade 0.35s ease-out",
  },
  header: {
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 600,
    color: "#e5e7eb",
    borderBottom: "1px solid #1e293b",
    background: "linear-gradient(180deg, rgba(15,23,42,.9), rgba(2,6,23,.9))",
  },
  canvas: {
    position: "relative",
    flex: 1,
    overflow: "auto",
    background:
      "radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0)",
    backgroundSize: "24px 24px",
    padding: 24,
  },
  content: {
    minHeight: "100%",
    borderRadius: 12,
    padding: 16,
    background: "rgba(2,6,23,0.6)",
    border: "1px dashed #334155",
    animation: "scaleIn 0.25s ease-out",
  },
  placeholder: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
    fontSize: 14,
    fontStyle: "italic",
    userSelect: "none",
  },
};

/* ---------------- ANIMATIONS ---------------- */

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes canvasFade {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes scaleIn {
      from { opacity: 0; transform: scale(.98); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
}
