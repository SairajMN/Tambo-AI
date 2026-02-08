"use client";

import React from "react";

interface ComponentPreviewProps {
  name: string;
  code?: string;
}

interface ComponentListProps {
  components: string[];
  selected: string | null;
  onSelect: (name: string) => void;
}

export function ComponentList({
  components,
  selected,
  onSelect,
}: ComponentListProps) {
  return (
    <div style={styles.listWrapper}>
      <div style={styles.listHeader}>Generated Components</div>

      {components.length === 0 && (
        <div style={styles.empty}>No components generated yet</div>
      )}

      {components.map((c) => (
        <div
          key={c}
          onClick={() => onSelect(c)}
          style={{
            ...styles.listItem,
            ...(selected === c ? styles.listItemActive : {}),
          }}
        >
          {c}
        </div>
      ))}
    </div>
  );
}

export function ComponentPreview({ name, code }: ComponentPreviewProps) {
  return (
    <div style={styles.previewWrapper}>
      <div style={styles.previewHeader}>{name}</div>

      {code ? (
        <pre style={styles.code}>
          <code>{code}</code>
        </pre>
      ) : (
        <div style={styles.empty}>No code available</div>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles: Record<string, React.CSSProperties> = {
  listWrapper: {
    marginBottom: 16,
    border: "1px solid #1e293b",
    borderRadius: 12,
    overflow: "hidden",
    background: "#020617",
    animation: "fadeIn 0.3s ease-out",
  },
  listHeader: {
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 600,
    borderBottom: "1px solid #1e293b",
    background: "#020617",
  },
  listItem: {
    padding: "10px 14px",
    cursor: "pointer",
    borderBottom: "1px solid #020617",
    color: "#cbd5f5",
    transition: "background 0.15s ease",
  },
  listItemActive: {
    background: "#1d4ed8",
    color: "#fff",
  },
  previewWrapper: {
    border: "1px solid #1e293b",
    borderRadius: 12,
    overflow: "hidden",
    background: "#020617",
    animation: "fadeIn 0.3s ease-out",
  },
  previewHeader: {
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 600,
    borderBottom: "1px solid #1e293b",
  },
  code: {
    padding: 14,
    margin: 0,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    color: "#e5e7eb",
    background: "#020617",
    maxHeight: 320,
    overflow: "auto",
  },
  empty: {
    padding: 14,
    fontSize: 13,
    color: "#64748b",
    fontStyle: "italic",
  },
};

/* ---------------- ANIMATIONS ---------------- */

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}
