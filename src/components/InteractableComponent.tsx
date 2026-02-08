import React, { useState, useCallback, useEffect } from "react";
import { TamboSDK } from "@/lib/tambo-sdk";

interface InteractableComponentProps {
  componentName: string;
  initialCode: string;
  onInteraction?: (interaction: string, result: string) => void;
  allowCodeModification?: boolean;
  allowBehaviorModification?: boolean;
  allowStyleModification?: boolean;
}

interface InteractionLog {
  id: string;
  type: "code" | "behavior" | "style" | "analysis";
  prompt: string;
  result: string;
  timestamp: Date;
  success: boolean;
}

export const InteractableComponent: React.FC<InteractableComponentProps> = ({
  componentName,
  initialCode,
  onInteraction,
  allowCodeModification = true,
  allowBehaviorModification = true,
  allowStyleModification = true,
}) => {
  const [currentCode, setCurrentCode] = useState(initialCode);
  const [isInteracting, setIsInteracting] = useState(false);
  const [interactionType, setInteractionType] = useState<"code" | "behavior" | "style" | "analysis">("analysis");
  const [interactionPrompt, setInteractionPrompt] = useState("");
  const [interactionResult, setInteractionResult] = useState("");
  const [interactionLog, setInteractionLog] = useState<InteractionLog[]>([]);
  const [renderedComponent, setRenderedComponent] = useState<React.ReactNode>(null);
  const [error, setError] = useState<string | null>(null);

  const tamboSDK = new TamboSDK({
    model: "tambo-llm-v1",
    temperature: 0.7,
    maxTokens: 1500,
  });

  const renderComponent = useCallback((code: string) => {
    try {
      // Simplified component rendering
      const Component = eval(`
        (function() {
          const React = arguments[0];
          const { useState, useEffect, useCallback } = React;
          
          ${code.replace(/export default /, '')}
          
          return ${componentName};
        })
      `)(React);

      const rendered = React.createElement(Component, {});
      setRenderedComponent(rendered);
      setError(null);
    } catch (err) {
      setError(`Failed to render component: ${err}`);
      setRenderedComponent(
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-800">Component cannot be rendered</p>
          <p className="text-red-600 text-sm mt-1">{String(err)}</p>
        </div>
      );
    }
  }, [componentName]);

  useEffect(() => {
    renderComponent(currentCode);
  }, [currentCode, renderComponent]);

  const handleInteraction = useCallback(async () => {
    if (!interactionPrompt.trim() || isInteracting) return;

    setIsInteracting(true);
    setError(null);

    try {
      let prompt = "";
      let result = "";

      switch (interactionType) {
        case "code":
          prompt = `
Modify this React component based on the following request:

Component: ${componentName}
Current Code:
${currentCode}

Request: ${interactionPrompt}

Please provide the complete modified component code. Focus on:
1. Implementing the requested changes
2. Maintaining code quality and best practices
3. Ensuring the component remains functional
4. Adding appropriate TypeScript types if needed

Return only the complete component code wrapped in a code block.
          `;
          result = await tamboSDK.generateCode(prompt);
          break;

        case "behavior":
          prompt = `
Improve the behavior and functionality of this React component:

Component: ${componentName}
Current Code:
${currentCode}

Request: ${interactionPrompt}

Focus on:
1. Enhancing user interactions
2. Improving state management
3. Adding accessibility features
4. Optimizing performance
5. Better error handling

Return the improved component code with enhanced behavior.
          `;
          result = await tamboSDK.optimizeCode(prompt);
          break;

        case "style":
          prompt = `
Improve the styling and visual appearance of this React component:

Component: ${componentName}
Current Code:
${currentCode}

Request: ${interactionPrompt}

Focus on:
1. Modern CSS-in-JS styling
2. Responsive design
3. Accessibility considerations
4. Performance optimization
5. Consistent design patterns

Return the component code with improved styling.
          `;
          result = await tamboSDK.analyzeCode(prompt);
          break;

        case "analysis":
          prompt = `
Analyze this React component and provide detailed feedback:

Component: ${componentName}
Current Code:
${currentCode}

Focus on:
1. Code quality and best practices
2. Performance issues
3. Security concerns
4. Accessibility problems
5. TypeScript usage
6. React patterns and conventions

Provide specific recommendations for improvement.
          `;
          result = await tamboSDK.analyzeCode(prompt);
          break;
      }

      const newInteraction: InteractionLog = {
        id: Date.now().toString(),
        type: interactionType,
        prompt: interactionPrompt,
        result,
        timestamp: new Date(),
        success: true,
      };

      setInteractionLog(prev => [newInteraction, ...prev]);
      setInteractionResult(result);

      if (interactionType !== "analysis" && result) {
        setCurrentCode(result);
        if (onInteraction) {
          onInteraction(interactionType, result);
        }
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      
      const failedInteraction: InteractionLog = {
        id: Date.now().toString(),
        type: interactionType,
        prompt: interactionPrompt,
        result: errorMessage,
        timestamp: new Date(),
        success: false,
      };

      setInteractionLog(prev => [failedInteraction, ...prev]);
      setInteractionResult(errorMessage);
    } finally {
      setIsInteracting(false);
    }
  }, [interactionPrompt, interactionType, currentCode, componentName, tamboSDK, onInteraction]);

  const exportComponent = useCallback(() => {
    const blob = new Blob([currentCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${componentName}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [currentCode, componentName]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(currentCode);
  }, [currentCode]);

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Interactable Component: {componentName}</h3>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Copy Code
          </button>
          <button
            onClick={exportComponent}
            className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Export
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-800 font-medium">Interaction Error</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Component Preview */}
        <div>
          <h4 className="font-medium mb-2">Live Preview</h4>
          <div className="bg-gray-900 rounded-lg p-4 min-h-64">
            {renderedComponent || (
              <div className="text-gray-400 text-center py-12">
                Component preview will appear here
              </div>
            )}
          </div>
        </div>

        {/* Interaction Panel */}
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Component Interaction</h4>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {allowCodeModification && (
                <button
                  onClick={() => setInteractionType("code")}
                  className={`px-3 py-2 rounded text-sm ${
                    interactionType === "code" 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  Modify Code
                </button>
              )}
              {allowBehaviorModification && (
                <button
                  onClick={() => setInteractionType("behavior")}
                  className={`px-3 py-2 rounded text-sm ${
                    interactionType === "behavior" 
                      ? "bg-green-500 text-white" 
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  Improve Behavior
                </button>
              )}
              {allowStyleModification && (
                <button
                  onClick={() => setInteractionType("style")}
                  className={`px-3 py-2 rounded text-sm ${
                    interactionType === "style" 
                      ? "bg-yellow-500 text-white" 
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  Enhance Style
                </button>
              )}
              <button
                onClick={() => setInteractionType("analysis")}
                className={`px-3 py-2 rounded text-sm ${
                  interactionType === "analysis" 
                    ? "bg-purple-500 text-white" 
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Analyze Code
              </button>
            </div>
            
            <div className="space-y-2">
              <textarea
                value={interactionPrompt}
                onChange={(e) => setInteractionPrompt(e.target.value)}
                placeholder={`Describe what you want to ${interactionType === "analysis" ? "analyze" : "change"} in this component...`}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                rows={4}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleInteraction}
                  disabled={isInteracting || !interactionPrompt.trim()}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {isInteracting ? "Processing..." : "Apply Changes"}
                </button>
                <button
                  onClick={() => setInteractionPrompt("")}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Interaction Result */}
          {interactionResult && (
            <div>
              <h4 className="font-medium mb-2">
                {interactionType === "analysis" ? "Analysis Result" : "Modified Code"}
              </h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto max-h-64">
                <pre>{interactionResult}</pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interaction History */}
      {interactionLog.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Interaction History</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {interactionLog.map((log) => (
              <div
                key={log.id}
                className={`p-3 rounded-lg border ${
                  log.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      log.type === "code" ? "bg-blue-100 text-blue-800" :
                      log.type === "behavior" ? "bg-green-100 text-green-800" :
                      log.type === "style" ? "bg-yellow-100 text-yellow-800" :
                      "bg-purple-100 text-purple-800"
                    }`}>
                      {log.type.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <span className={`text-xs ${
                    log.success ? "text-green-600" : "text-red-600"
                  }`}>
                    {log.success ? "Success" : "Failed"}
                  </span>
                </div>
                <p className="text-sm mt-1 text-gray-700">{log.prompt}</p>
                <p className="text-xs mt-1 text-gray-500">
                  Result preview: {log.result.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};