import React, { useState, useCallback } from 'react';
import { useTambo } from './TamboProvider';

interface FlowNode {
  id: string;
  name: string;
  type: 'page' | 'component' | 'action';
  position: { x: number; y: number };
  connections: string[];
}

interface FlowEditorProps {
  nodes?: FlowNode[];
  onFlowUpdate?: (nodes: FlowNode[]) => void;
  loading?: boolean;
  error?: string;
}

export const FlowEditor: React.FC<FlowEditorProps> = ({
  nodes: initialNodes = [],
  onFlowUpdate,
  loading = false,
  error
}) => {
  const { listComponents } = useTambo();
  const [nodes, setNodes] = useState<FlowNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const addNode = useCallback((type: FlowNode['type'], name: string) => {
    const newNode: FlowNode = {
      id: `node-${Date.now()}`,
      name,
      type,
      position: { x: 100, y: 100 },
      connections: []
    };
    
    const updatedNodes = [...nodes, newNode];
    setNodes(updatedNodes);
    if (onFlowUpdate) {
      onFlowUpdate(updatedNodes);
    }
  }, [nodes, onFlowUpdate]);

  const updateNodePosition = useCallback((id: string, position: { x: number; y: number }) => {
    const updatedNodes = nodes.map(node => 
      node.id === id ? { ...node, position } : node
    );
    setNodes(updatedNodes);
    if (onFlowUpdate) {
      onFlowUpdate(updatedNodes);
    }
  }, [nodes, onFlowUpdate]);

  const connectNodes = useCallback((fromId: string, toId: string) => {
    const updatedNodes = nodes.map(node => {
      if (node.id === fromId && !node.connections.includes(toId)) {
        return { ...node, connections: [...node.connections, toId] };
      }
      return node;
    });
    setNodes(updatedNodes);
    if (onFlowUpdate) {
      onFlowUpdate(updatedNodes);
    }
  }, [nodes, onFlowUpdate]);

  if (loading) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-8 w-1/3 mb-4"></div>
          <div className="bg-gray-300 h-64 w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
        <h3 className="text-red-600 font-semibold mb-2">Flow Editor Error</h3>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Flow Editor</h3>
        <div className="text-sm text-gray-500">
          {nodes.length} nodes in flow
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-3">
          <div className="space-y-2">
            <button
              onClick={() => addNode('page', 'New Page')}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              + Add Page
            </button>
            <button
              onClick={() => addNode('component', 'New Component')}
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              + Add Component
            </button>
            <button
              onClick={() => addNode('action', 'New Action')}
              className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              + Add Action
            </button>
          </div>
        </div>

        <div className="col-span-9 border border-gray-300 rounded p-4 bg-gray-50 relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {nodes.map(node => (
              node.connections.map(connectionId => {
                const targetNode = nodes.find(n => n.id === connectionId);
                if (!targetNode) return null;
                
                return (
                  <line
                    key={`${node.id}-${connectionId}`}
                    x1={node.position.x + 50}
                    y1={node.position.y + 25}
                    x2={targetNode.position.x}
                    y2={targetNode.position.y + 25}
                    stroke="#6366f1"
                    strokeWidth="2"
                    className="pointer-events-none"
                  />
                );
              })
            ))}
          </svg>

          {nodes.map(node => (
            <div
              key={node.id}
              className={`absolute p-2 border-2 rounded shadow-md cursor-move ${
                selectedNode === node.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
              }`}
              style={{
                left: node.position.x,
                top: node.position.y,
                minWidth: '120px'
              }}
              onClick={() => setSelectedNode(node.id)}
            >
              <div className={`text-xs px-2 py-1 rounded mb-1 ${
                node.type === 'page' ? 'bg-blue-100 text-blue-800' :
                node.type === 'component' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {node.type.toUpperCase()}
              </div>
              <div className="font-medium text-sm">{node.name}</div>
              {node.connections.length > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  → {node.connections.length} connections
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedNode && (
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Selected: {nodes.find(n => n.id === selectedNode)?.name}</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Connect to:
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => {
                  if (e.target.value) {
                    connectNodes(selectedNode, e.target.value);
                  }
                }}
              >
                <option value="">Select node to connect</option>
                {nodes
                  .filter(n => n.id !== selectedNode)
                  .map(n => (
                    <option key={n.id} value={n.id}>{n.name}</option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="X"
                  className="p-2 border border-gray-300 rounded"
                  onChange={(e) => updateNodePosition(selectedNode, {
                    x: parseInt(e.target.value) || 0,
                    y: nodes.find(n => n.id === selectedNode)?.position.y || 0
                  })}
                />
                <input
                  type="number"
                  placeholder="Y"
                  className="p-2 border border-gray-300 rounded"
                  onChange={(e) => updateNodePosition(selectedNode, {
                    x: nodes.find(n => n.id === selectedNode)?.position.x || 0,
                    y: parseInt(e.target.value) || 0
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};