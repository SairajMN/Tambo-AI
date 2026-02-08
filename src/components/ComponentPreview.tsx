import React from "react";

interface ComponentPreviewProps {
  componentName: string;
  componentCode: string;
  onEdit?: (newCode: string) => void;
}

export function ComponentPreview({
  componentName,
  componentCode,
  onEdit,
}: ComponentPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-4">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
        <h3 className="font-semibold text-gray-900">{componentName}</h3>
        <p className="text-sm text-gray-600 mt-1">Generated React Component</p>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-32">
            {/* Dynamic component rendering would go here */}
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📦</div>
              <p>Component Preview</p>
              <p className="text-sm mt-1">Real-time rendering coming soon</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Generated Code
          </h4>
          <div className="bg-gray-900 text-green-400 rounded-lg p-3 font-mono text-sm overflow-auto max-h-48">
            <pre>{componentCode}</pre>
          </div>
        </div>

        {onEdit && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Edit Component
            </h4>
            <textarea
              value={componentCode}
              onChange={(e) => onEdit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              rows={10}
              placeholder="Edit the component code here..."
            />
            <div className="mt-2 text-xs text-gray-500">
              Note: Code editing is for demonstration. In production, this would
              integrate with the agent system.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ComponentListProps {
  components: string[];
  onComponentSelect?: (componentName: string) => void;
}

export function ComponentList({
  components,
  onComponentSelect,
}: ComponentListProps) {
  if (components.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
        <div className="text-4xl mb-2">🏗️</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Components Yet
        </h3>
        <p className="text-gray-600">
          Start describing your app idea in the conversation panel to generate
          components.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Generated Components</h3>
      <div className="space-y-2">
        {components.map((component, index) => (
          <button
            key={index}
            onClick={() => onComponentSelect?.(component)}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 border border-gray-200 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">{component}</span>
              <span className="text-xs text-gray-500">React Component</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
