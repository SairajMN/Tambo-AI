import React, { useState, useEffect, useCallback } from "react";
import { TamboSDK } from "@/lib/tambo-sdk";

interface GenerativeComponentProps {
  prompt: string;
  componentName?: string;
  onGenerated?: (componentName: string, code: string) => void;
  onError?: (error: string) => void;
  autoGenerate?: boolean;
  temperature?: number;
  maxTokens?: number;
}

interface GeneratedComponent {
  name: string;
  code: string;
  dependencies: string[];
  metadata: {
    complexity: "low" | "medium" | "high";
    estimatedSize: number;
    lastGenerated: Date;
  };
}

export const GenerativeComponent: React.FC<GenerativeComponentProps> = ({
  prompt,
  componentName,
  onGenerated,
  onError,
  autoGenerate = true,
  temperature = 0.7,
  maxTokens = 2000,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedComponent, setGeneratedComponent] =
    useState<GeneratedComponent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [renderedComponent, setRenderedComponent] =
    useState<React.ReactNode>(null);
  const [generationHistory, setGenerationHistory] = useState<
    GeneratedComponent[]
  >([]);

  const tamboSDK = new TamboSDK({
    model: "tambo-llm-v1",
    temperature,
    maxTokens,
  });

  const generateComponent = useCallback(
    async (promptText: string) => {
      setIsGenerating(true);
      setError(null);

      try {
        // Enhanced prompt with context
        const enhancedPrompt = `
Generate a React functional component based on this description:

"${promptText}"

Requirements:
1. Use modern React patterns (hooks, functional components)
2. Include proper TypeScript types
3. Add comprehensive error handling
4. Use semantic HTML and accessibility best practices
5. Include responsive design considerations
6. Add performance optimizations where appropriate
7. Include prop validation and default values
8. Add inline documentation for complex logic

Please provide ONLY the complete React component code wrapped in a code block.
Do not include explanations, usage examples, or additional text.
      `;

        const response = await tamboSDK.generateCode(enhancedPrompt);

        if (!response || response.trim() === "") {
          throw new Error("Empty response from Tambo AI");
        }

        const compName = componentName || `GeneratedComponent_${Date.now()}`;
        const dependencies = extractDependencies(response);
        const complexity = analyzeComplexity(response);
        const estimatedSize = response.length;

        const newComponent: GeneratedComponent = {
          name: compName,
          code: response,
          dependencies,
          metadata: {
            complexity,
            estimatedSize,
            lastGenerated: new Date(),
          },
        };

        setGeneratedComponent(newComponent);
        setGenerationHistory((prev) => [newComponent, ...prev.slice(0, 9)]); // Keep last 10 generations

        if (onGenerated) {
          onGenerated(compName, response);
        }

        // Attempt to render the component
        try {
          const rendered = renderComponentCode(response, compName);
          setRenderedComponent(rendered);
        } catch (renderError) {
          console.warn("Failed to render component:", renderError);
          setRenderedComponent(
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-800">
                Component generated but cannot be previewed due to rendering
                limitations.
              </p>
              <p className="text-sm text-yellow-600 mt-1">
                Code has been generated successfully.
              </p>
            </div>,
          );
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        if (onError) {
          onError(errorMessage);
        }
      } finally {
        setIsGenerating(false);
      }
    },
    [componentName, onGenerated, onError, tamboSDK],
  );

  const renderComponentCode = (code: string, name: string): React.ReactNode => {
    try {
      // This is a simplified renderer - in production you'd want more sophisticated sandboxing
      const Component = eval(`
        (function() {
          const React = arguments[0];
          const { useState, useEffect, useCallback } = React;
          
          ${code.replace(/export default /, "")}
          
          return ${name};
        })
      `)(React);

      return React.createElement(Component, {});
    } catch (err) {
      throw new Error(`Failed to render component: ${err}`);
    }
  };

  const extractDependencies = (code: string): string[] => {
    const imports = code.match(/import\s+.*?\s+from\s+['"]([^'"]+)['"]/g) || [];
    return imports
      .map((imp) => {
        const match = imp.match(/from\s+['"]([^'"]+)['"]/);
        return match ? match[1] : "";
      })
      .filter((dep) => dep && !dep.startsWith(".") && !dep.startsWith("react"));
  };

  const analyzeComplexity = (code: string): "low" | "medium" | "high" => {
    const lines = code.split("\n");
    const complexityIndicators = {
      hooks: (code.match(/use[A-Z]/g) || []).length,
      conditionals: (code.match(/if\s*\(/g) || []).length,
      loops: (code.match(/for\s*\(|\.map\(|\.filter\(/g) || []).length,
      async: (code.match(/async\s+function|await\s+/g) || []).length,
      state: (code.match(/useState|useReducer|useContext/g) || []).length,
    };

    const totalComplexity = Object.values(complexityIndicators).reduce(
      (sum, count) => sum + count,
      0,
    );

    if (totalComplexity <= 5) return "low";
    if (totalComplexity <= 15) return "medium";
    return "high";
  };

  const optimizeComponent = useCallback(async () => {
    if (!generatedComponent) return;

    try {
      const optimizationPrompt = `
Optimize this React component for performance and best practices:

${generatedComponent.code}

Focus on:
1. Performance optimizations (memoization, lazy loading, etc.)
2. Code quality improvements
3. Best practices adherence
4. Bundle size reduction
5. Accessibility improvements

Return the optimized component code only.
      `;

      const optimizedCode = await tamboSDK.optimizeCode(optimizedPrompt);

      const optimizedComponent: GeneratedComponent = {
        ...generatedComponent,
        code: optimizedCode,
        metadata: {
          ...generatedComponent.metadata,
          lastGenerated: new Date(),
        },
      };

      setGeneratedComponent(optimizedComponent);
      setGenerationHistory((prev) => [optimizedComponent, ...prev.slice(1)]);

      if (onGenerated) {
        onGenerated(optimizedComponent.name, optimizedCode);
      }
    } catch (err) {
      console.error("Optimization failed:", err);
    }
  }, [generatedComponent, tamboSDK, onGenerated]);

  const regenerateComponent = useCallback(() => {
    if (prompt) {
      generateComponent(prompt);
    }
  }, [prompt, generateComponent]);

  useEffect(() => {
    if (autoGenerate && prompt) {
      generateComponent(prompt);
    }
  }, [prompt, autoGenerate, generateComponent]);

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Generative Component</h3>
        <div className="flex gap-2">
          <button
            onClick={regenerateComponent}
            disabled={isGenerating}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isGenerating ? "Generating..." : "Regenerate"}
          </button>
          {generatedComponent && (
            <button
              onClick={optimizeComponent}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Optimize
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-800 font-medium">Generation Error</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      {isGenerating && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <div className="flex items-center gap-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
              <div
                className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="text-blue-800">
              Generating component with Tambo AI...
            </span>
          </div>
        </div>
      )}

      {generatedComponent && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-medium mb-2">Component Info</h4>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {generatedComponent.name}
                </p>
                <p>
                  <span className="font-medium">Complexity:</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      generatedComponent.metadata.complexity === "low"
                        ? "bg-green-100 text-green-800"
                        : generatedComponent.metadata.complexity === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {generatedComponent.metadata.complexity}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Size:</span>{" "}
                  {generatedComponent.metadata.estimatedSize} chars
                </p>
                <p>
                  <span className="font-medium">Generated:</span>{" "}
                  {generatedComponent.metadata.lastGenerated.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-medium mb-2">Dependencies</h4>
              <div className="text-sm space-y-1">
                {generatedComponent.dependencies.length > 0 ? (
                  generatedComponent.dependencies.map((dep, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{dep}</span>
                      <span className="text-gray-500">external</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No external dependencies</p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-medium mb-2">Actions</h4>
              <div className="space-y-2">
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(generatedComponent.code)
                  }
                  className="w-full p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Copy Code
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([generatedComponent.code], {
                      type: "text/javascript",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${generatedComponent.name}.tsx`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                >
                  Download Component
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Preview</h4>
              <div className="bg-gray-900 rounded-lg p-4 min-h-40">
                {renderedComponent || (
                  <div className="text-gray-400 text-center py-8">
                    Component preview will appear here
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Generated Code</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto max-h-96">
                <pre>{generatedComponent.code}</pre>
              </div>
            </div>
          </div>

          {generationHistory.length > 1 && (
            <div>
              <h4 className="font-medium mb-2">Generation History</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generationHistory.slice(1).map((gen, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded text-sm">
                    <div className="font-medium">{gen.name}</div>
                    <div className="text-gray-600">
                      {gen.metadata.lastGenerated.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {gen.metadata.estimatedSize} chars
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
