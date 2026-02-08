"use client";

import React, { useState, useRef } from "react";

interface FlowNode {
  id: string;
  x: number;
  y: number;
  label: string;
}

interface FlowEdge {
  from: string;
  to: string;
}

export function FlowEditor() {
  const [nodes, setNodes] = useState<FlowNode[]>([
    { id: "start", x: 80, y: 80, label: "Start" },
  ]);
  const [edges, setEdges] = useState<FlowEdge[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement | null>(null);

  function onMouseDown(id: string) {
    setDraggingId(id);
  }

  function onMouseUp() {
    setDraggingId(null);
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!draggingId || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();

    setNodes((prev) =>
      prev.map((n) =>
        n.id === draggingId
          ? {
              ...n,
              x: e.clientX - rect.left - 50,
              y: e.clientY - rect.top - 20,
            }
          : n,
      ),
    );
  }

  function addNode() {
    const id = `node-${crypto.randomUUID().slice(0, 6)}`;
    setNodes((n) => [...n, { id, x: 120, y: 120, label: "New Node" }]);
  }

  function connectLastTwo() {
    if (nodes.length < 2) return;
    const [a, b] = nodes.slice(-2);
    setEdges((e) => [...e, { from: a.id, to: b.id }]);
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.toolbar}>
        <button style={styles.button} onClick={addNode}>
          + Node
        </button>
        <button style={styles.button} onClick={connectLastTwo}>
          ↔ Connect
        </button>
      </div>

      <div
        ref={canvasRef}
        style={styles.canvas}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {/* EDGES */}
        <svg style={styles.svg}>
          {edges.map((e, i) => {
            const from = nodes.find((n) => n.id === e.from);
            const to = nodes.find((n) => n.id === e.to);
            if (!from || !to) return null;

            return (
              <line
                key={i}
                x1={from.x + 50}
                y1={from.y + 20}
                x2={to.x + 50}
                y2={to.y + 20}
                stroke="#38bdf8"
                strokeWidth={2}
                style={{ animation: "draw 0.4s ease-out" }}
              />
            );
          })}
        </svg>

        {/* NODES */}
        {nodes.map((node) => (
          <div
            key={node.id}
            onMouseDown={() => onMouseDown(node.id)}
            style={{
              ...styles.node,
              left: node.x,
              top: node.y,
            }}
          >
            {node.label}
          </div>
        ))}
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
    borderRadius: 12,
    overflow: "hidden",
  },
  toolbar: {
    padding: 10,
    display: "flex",
    gap: 8,
    borderBottom: "1px solid #1e293b",
    background: "#020617",
  },
  button: {
    padding: "6px 12px",
    borderRadius: 8,
    border: "1px solid #334155",
    background: "#020617",
    color: "#e5e7eb",
    cursor: "pointer",
  },
  canvas: {
    position: "relative",
    flex: 1,
    background:
      "radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0)",
    backgroundSize: "20px 20px",
  },
  svg: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  node: {
    position: "absolute",
    width: 100,
    height: 40,
    borderRadius: 10,
    background: "#0f172a",
    border: "1px solid #38bdf8",
    color: "#e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "grab",
    userSelect: "none",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  },
};

/* ---------------- ANIMATIONS ---------------- */

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes draw {
      from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
      to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
    }
  `;
  document.head.appendChild(style);
}
