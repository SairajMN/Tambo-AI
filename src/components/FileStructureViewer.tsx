"use client";

import React from "react";

/* ---------------- TYPES ---------------- */

export interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

/* ---------------- SAMPLE STRUCTURE ---------------- */

export function generateSampleStructure(): FileNode[] {
  return [
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "components",
          type: "folder",
          children: [
            { name: "Button.tsx", type: "file" },
            { name: "Card.tsx", type: "file" },
          ],
        },
        {
          name: "app",
          type: "folder",
          children: [{ name: "page.tsx", type: "file" }],
        },
      ],
    },
    { name: "package.json", type: "file" },
    { name: "tsconfig.json", type: "file" },
  ];
}

/* ---------------- PROPS ---------------- */

interface FileStructureViewerProps {
  structure?: FileNode[]; // ✅ optional now
  selectedFile: string | null;
  onSelectFile: (path: string) => void;
}

/* ---------------- COMPONENT ---------------- */

export function FileStructureViewer({
  structure = [], // ✅ SAFE DEFAULT
  selectedFile,
  onSelectFile,
}: FileStructureViewerProps) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>Project Structure</div>

      <div style={styles.tree}>
        {structure.length === 0 ? (
          <div style={styles.empty}>No project structure available</div>
        ) : (
          structure.map((node) =>
            renderNode(node, "", selectedFile, onSelectFile),
          )
        )}
      </div>
    </div>
  );
}

/* ---------------- RECURSIVE RENDER ---------------- */

function renderNode(
  node: FileNode,
  parentPath: string,
  selectedFile: string | null,
  onSelectFile: (path: string) => void,
) {
  const path = parentPath ? `${parentPath}/${node.name}` : node.name;
  const isSelected = selectedFile === path;

  return (
    <div key={path} style={styles.node}>
      <div
        onClick={() => node.type === "file" && onSelectFile(path)}
        style={{
          ...styles.row,
          ...(isSelected ? styles.selected : {}),
        }}
      >
        <span style={styles.icon}>{node.type === "folder" ? "📁" : "📄"}</span>
        <span>{node.name}</span>
      </div>

      {node.type === "folder" &&
        Array.isArray(node.children) &&
        node.children.length > 0 && (
          <div style={styles.children}>
            {node.children.map((child) =>
              renderNode(child, path, selectedFile, onSelectFile),
            )}
          </div>
        )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    marginTop: 16,
    borderRadius: 12,
    border: "1px solid #1e293b",
    background: "#020617",
    overflow: "hidden",
    animation: "fadeIn 0.3s ease-out",
  },
  header: {
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 600,
    borderBottom: "1px solid #1e293b",
  },
  tree: {
    padding: 10,
    fontSize: 13,
  },
  empty: {
    padding: 12,
    fontSize: 13,
    color: "#64748b",
    fontStyle: "italic",
  },
  node: {
    marginBottom: 4,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 6px",
    borderRadius: 6,
    cursor: "pointer",
    transition: "background 0.15s ease",
  },
  selected: {
    background: "#1d4ed8",
    color: "#fff",
  },
  icon: {
    width: 18,
    textAlign: "center",
  },
  children: {
    marginLeft: 16,
    borderLeft: "1px dashed #334155",
    paddingLeft: 8,
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
