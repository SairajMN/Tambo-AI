// MCP types and interfaces - local implementation
interface Tool {
  name: string;
  description: string;
  inputSchema: any;
  call: (request: any) => Promise<any>;
}

interface CallToolRequestSchema {
  arguments: any;
}

interface ListToolsRequestSchema {
  // Empty interface for now
}
import { TamboSDK } from "@/lib/tambo-sdk";

interface TamboIntegrationConfig {
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

interface GenerateComponentRequest {
  prompt: string;
  componentName?: string;
  temperature?: number;
  maxTokens?: number;
}

interface OptimizeComponentRequest {
  code: string;
  focus?: string[];
}

interface AnalyzeCodeRequest {
  code: string;
  focus?: string[];
}

interface GenerateDocumentationRequest {
  code: string;
  componentName?: string;
}

interface TamboResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export class TamboMCPIntegration {
  private tamboSDK: TamboSDK;
  private config: TamboIntegrationConfig;

  constructor(config: TamboIntegrationConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || "https://api.tambo.ai",
      model: config.model || "tambo-llm-v1",
      temperature: config.temperature || 0.7,
      maxTokens: config.maxTokens || 2000,
      ...config,
    };

    this.tamboSDK = new TamboSDK(this.config);
  }

  // MCP Tool: Generate React Component
  async generateComponent(
    request: GenerateComponentRequest,
  ): Promise<TamboResponse> {
    try {
      const enhancedPrompt = `
Generate a React functional component based on this description:

"${request.prompt}"

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

      const response = await this.tamboSDK.generateCode(enhancedPrompt);

      if (!response || response.trim() === "") {
        throw new Error("Empty response from Tambo AI");
      }

      const componentName =
        request.componentName || `GeneratedComponent_${Date.now()}`;
      const dependencies = this.extractDependencies(response);
      const complexity = this.analyzeComplexity(response);
      const estimatedSize = response.length;

      return {
        success: true,
        data: {
          name: componentName,
          code: response,
          dependencies,
          metadata: {
            complexity,
            estimatedSize,
            lastGenerated: new Date(),
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // MCP Tool: Optimize React Component
  async optimizeComponent(
    request: OptimizeComponentRequest,
  ): Promise<TamboResponse> {
    try {
      const optimizationPrompt = `
Optimize this React component for performance and best practices:

${request.code}

Focus on:
${request.focus ? request.focus.join("\n") : "1. Performance optimizations (memoization, lazy loading, etc.)\n2. Code quality improvements\n3. Best practices adherence\n4. Bundle size reduction\n5. Accessibility improvements"}

Return the optimized component code only.
      `;

      const optimizedCode =
        await this.tamboSDK.optimizeCode(optimizationPrompt);

      return {
        success: true,
        data: {
          optimizedCode,
          improvements: this.analyzeImprovements(request.code, optimizedCode),
        },
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // MCP Tool: Analyze Code
  async analyzeCode(request: AnalyzeCodeRequest): Promise<TamboResponse> {
    try {
      const analysisPrompt = `
Analyze this React component and provide detailed feedback:

${request.code}

Focus on:
${request.focus ? request.focus.join("\n") : "1. Code quality and best practices\n2. Performance issues\n3. Security concerns\n4. Accessibility problems\n5. TypeScript usage\n6. React patterns and conventions"}

Provide specific recommendations for improvement.
      `;

      const analysis = await this.tamboSDK.analyzeCode(analysisPrompt);

      return {
        success: true,
        data: {
          analysis,
          issues: this.extractIssues(analysis),
          recommendations: this.extractRecommendations(analysis),
        },
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // MCP Tool: Generate Documentation
  async generateDocumentation(
    request: GenerateDocumentationRequest,
  ): Promise<TamboResponse> {
    try {
      const documentationPrompt = `
Generate comprehensive documentation for this React component:

Component Name: ${request.componentName || "React Component"}
Code:
${request.code}

Please provide:
1. Component description and purpose
2. Props interface documentation
3. Usage examples
4. Best practices
5. Performance considerations
6. Accessibility guidelines

Format the documentation in Markdown.
      `;

      const documentation =
        await this.tamboSDK.generateDocumentation(documentationPrompt);

      return {
        success: true,
        data: {
          documentation,
          componentName: request.componentName,
          generatedAt: new Date(),
        },
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // MCP Tool: Interactive Component Modification
  async modifyComponent(request: {
    code: string;
    modificationType: "code" | "behavior" | "style";
    prompt: string;
  }): Promise<TamboResponse> {
    try {
      let modificationPrompt = "";

      switch (request.modificationType) {
        case "code":
          modificationPrompt = `
Modify this React component based on the following request:

Component Code:
${request.code}

Request: ${request.prompt}

Please provide the complete modified component code. Focus on:
1. Implementing the requested changes
2. Maintaining code quality and best practices
3. Ensuring the component remains functional
4. Adding appropriate TypeScript types if needed

Return only the complete component code wrapped in a code block.
          `;
          break;

        case "behavior":
          modificationPrompt = `
Improve the behavior and functionality of this React component:

Component Code:
${request.code}

Request: ${request.prompt}

Focus on:
1. Enhancing user interactions
2. Improving state management
3. Adding accessibility features
4. Optimizing performance
5. Better error handling

Return the improved component code with enhanced behavior.
          `;
          break;

        case "style":
          modificationPrompt = `
Improve the styling and visual appearance of this React component:

Component Code:
${request.code}

Request: ${request.prompt}

Focus on:
1. Modern CSS-in-JS styling
2. Responsive design
3. Accessibility considerations
4. Performance optimization
5. Consistent design patterns

Return the component code with improved styling.
          `;
          break;
      }

      const modifiedCode = await this.tamboSDK.generateCode(modificationPrompt);

      return {
        success: true,
        data: {
          modifiedCode,
          modificationType: request.modificationType,
          originalCode: request.code,
          prompt: request.prompt,
        },
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // MCP Tool: Generate Component Tests
  async generateTests(request: {
    code: string;
    componentName: string;
    testFramework?: "jest" | "vitest" | "testing-library";
  }): Promise<TamboResponse> {
    try {
      const testPrompt = `
Generate comprehensive tests for this React component:

Component Name: ${request.componentName}
Component Code:
${request.code}

Test Framework: ${request.testFramework || "jest"}

Please generate:
1. Unit tests for component functionality
2. Integration tests for user interactions
3. Accessibility tests
4. Performance tests
5. Snapshot tests if applicable

Return the complete test file code.
      `;

      const tests = await this.tamboSDK.generateCode(testPrompt);

      return {
        success: true,
        data: {
          tests,
          componentName: request.componentName,
          testFramework: request.testFramework || "jest",
        },
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Helper methods
  private extractDependencies(code: string): string[] {
    const imports = code.match(/import\s+.*?\s+from\s+['"]([^'"]+)['"]/g) || [];
    return imports
      .map((imp) => {
        const match = imp.match(/from\s+['"]([^'"]+)['"]/);
        return match ? match[1] : "";
      })
      .filter((dep) => dep && !dep.startsWith(".") && !dep.startsWith("react"));
  }

  public analyzeComplexity(code: string): "low" | "medium" | "high" {
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
  }

  private calculateComplexityMetrics(code: string) {
    return {
      linesOfCode: code.split("\n").length,
      cyclomaticComplexity: this.calculateCyclomaticComplexity(code),
      cognitiveComplexity: this.calculateCognitiveComplexity(code),
      maintainabilityIndex: this.calculateMaintainabilityIndex(code),
    };
  }

  private calculateCyclomaticComplexity(code: string): number {
    const complexityBearingElements = [
      /if\s*\(/g,
      /while\s*\(/g,
      /for\s*\(/g,
      /switch\s*\(/g,
      /case\s+/g,
      /catch\s*\(/g,
      /\?\s+/g,
      /&&/g,
      /\|\|/g,
    ];

    let complexity = 1; // Base complexity
    complexityBearingElements.forEach((regex) => {
      const matches = code.match(regex);
      if (matches) {
        complexity += matches.length;
      }
    });

    return complexity;
  }

  private calculateCognitiveComplexity(code: string): number {
    // Simplified cognitive complexity calculation
    const nestingLevels = (code.match(/\{.*?\}/g) || []).length;
    const controlFlowComplexity = this.calculateCyclomaticComplexity(code);

    return nestingLevels + controlFlowComplexity;
  }

  private calculateMaintainabilityIndex(code: string): number {
    const linesOfCode = code.split("\n").length;
    const cyclomaticComplexity = this.calculateCyclomaticComplexity(code);
    const linesOfComments = (code.match(/\/\/|\/\*|\*/g) || []).length;

    // Simplified maintainability index calculation
    const mi =
      171 -
      5.2 * Math.log(cyclomaticComplexity) -
      0.23 * linesOfCode -
      16.2 * Math.log(linesOfComments + 1);

    return Math.max(0, Math.min(100, Math.round(mi)));
  }

  private analyzeImprovements(originalCode: string, optimizedCode: string) {
    return {
      performanceImprovements: this.detectPerformanceImprovements(
        originalCode,
        optimizedCode,
      ),
      codeQualityImprovements: this.detectCodeQualityImprovements(
        originalCode,
        optimizedCode,
      ),
      sizeReduction: this.calculateSizeReduction(originalCode, optimizedCode),
    };
  }

  private extractIssues(analysis: string): string[] {
    // Extract issues from analysis text
    const issuePatterns = [
      /performance issue/gi,
      /security concern/gi,
      /accessibility problem/gi,
      /code smell/gi,
      /best practice violation/gi,
    ];

    const issues: string[] = [];
    issuePatterns.forEach((pattern) => {
      const matches = analysis.match(pattern);
      if (matches) {
        issues.push(...matches);
      }
    });

    return issues;
  }

  private extractRecommendations(analysis: string): string[] {
    // Extract recommendations from analysis text
    const recommendationLines = analysis
      .split("\n")
      .filter(
        (line) =>
          line.toLowerCase().includes("recommend") ||
          line.toLowerCase().includes("suggest") ||
          line.toLowerCase().includes("should"),
      );

    return recommendationLines.slice(0, 5); // Return top 5 recommendations
  }

  private getComplexityRecommendations(
    complexity: string,
    metrics: any,
  ): string[] {
    const recommendations: string[] = [];

    if (complexity === "high") {
      recommendations.push(
        "Consider breaking down the component into smaller, more focused components",
      );
      recommendations.push("Review and optimize state management patterns");
      recommendations.push("Implement memoization for expensive calculations");
    }

    if (metrics.cyclomaticComplexity > 10) {
      recommendations.push(
        "Reduce cyclomatic complexity by simplifying conditional logic",
      );
    }

    if (metrics.maintainabilityIndex < 60) {
      recommendations.push(
        "Improve code maintainability by adding more comments and documentation",
      );
      recommendations.push(
        "Consider refactoring complex functions into smaller, more manageable pieces",
      );
    }

    return recommendations;
  }

  private detectPerformanceImprovements(
    original: string,
    optimized: string,
  ): string[] {
    const improvements: string[] = [];

    if (optimized.includes("useMemo") && !original.includes("useMemo")) {
      improvements.push("Added memoization for expensive calculations");
    }

    if (
      optimized.includes("useCallback") &&
      !original.includes("useCallback")
    ) {
      improvements.push(
        "Added callback memoization to prevent unnecessary re-renders",
      );
    }

    if (optimized.includes("React.memo") && !original.includes("React.memo")) {
      improvements.push("Added component memoization");
    }

    return improvements;
  }

  private detectCodeQualityImprovements(
    original: string,
    optimized: string,
  ): string[] {
    const improvements: string[] = [];

    if (optimized.includes("TypeScript") && !original.includes("TypeScript")) {
      improvements.push("Added TypeScript types for better type safety");
    }

    if (optimized.includes("eslint") && !original.includes("eslint")) {
      improvements.push("Added linting rules for code consistency");
    }

    return improvements;
  }

  private calculateSizeReduction(original: string, optimized: string): number {
    const originalSize = original.length;
    const optimizedSize = optimized.length;
    return Math.round(((originalSize - optimizedSize) / originalSize) * 100);
  }
}

// MCP Server Integration
export function createTamboMCPTools(config: TamboIntegrationConfig = {}) {
  const tamboIntegration = new TamboMCPIntegration(config);

  const tools: Record<string, Tool> = {
    generate_component: {
      name: "generate_component",
      description:
        "Generate a React component from a natural language description using Tambo AI",
      inputSchema: {
        type: "object",
        properties: {
          prompt: {
            type: "string",
            description:
              "Natural language description of the component to generate",
          },
          componentName: {
            type: "string",
            description: "Optional name for the generated component",
          },
          temperature: {
            type: "number",
            description: "Creativity level (0.0 - 1.0)",
            minimum: 0,
            maximum: 1,
          },
          maxTokens: {
            type: "number",
            description: "Maximum response length",
          },
        },
        required: ["prompt"],
      },
      async call(request: CallToolRequestSchema): Promise<any> {
        const { prompt, componentName, temperature, maxTokens } =
          request.arguments;
        return await tamboIntegration.generateComponent({
          prompt,
          componentName,
          temperature,
          maxTokens,
        });
      },
    },

    optimize_component: {
      name: "optimize_component",
      description:
        "Optimize a React component for performance and best practices using Tambo AI",
      inputSchema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "The React component code to optimize",
          },
          focus: {
            type: "array",
            items: { type: "string" },
            description: "Specific areas to focus on for optimization",
          },
        },
        required: ["code"],
      },
      async call(request: CallToolRequestSchema): Promise<any> {
        const { code, focus } = request.arguments;
        return await tamboIntegration.optimizeComponent({ code, focus });
      },
    },

    analyze_code: {
      name: "analyze_code",
      description:
        "Analyze React component code for issues and provide recommendations using Tambo AI",
      inputSchema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "The React component code to analyze",
          },
          focus: {
            type: "array",
            items: { type: "string" },
            description: "Specific areas to focus on for analysis",
          },
        },
        required: ["code"],
      },
      async call(request: CallToolRequestSchema): Promise<any> {
        const { code, focus } = request.arguments;
        return await tamboIntegration.analyzeCode({ code, focus });
      },
    },

    generate_documentation: {
      name: "generate_documentation",
      description:
        "Generate comprehensive documentation for a React component using Tambo AI",
      inputSchema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "The React component code to document",
          },
          componentName: {
            type: "string",
            description: "Name of the component",
          },
        },
        required: ["code"],
      },
      async call(request: CallToolRequestSchema): Promise<any> {
        const { code, componentName } = request.arguments;
        return await tamboIntegration.generateDocumentation({
          code,
          componentName,
        });
      },
    },

    modify_component: {
      name: "modify_component",
      description:
        "Interactively modify a React component based on user requirements using Tambo AI",
      inputSchema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "The React component code to modify",
          },
          modificationType: {
            type: "string",
            enum: ["code", "behavior", "style"],
            description: "Type of modification to make",
          },
          prompt: {
            type: "string",
            description: "Description of the changes to make",
          },
        },
        required: ["code", "modificationType", "prompt"],
      },
      async call(request: CallToolRequestSchema): Promise<any> {
        const { code, modificationType, prompt } = request.arguments;
        return await tamboIntegration.modifyComponent({
          code,
          modificationType,
          prompt,
        });
      },
    },

    analyze_complexity: {
      name: "analyze_complexity",
      description:
        "Analyze the complexity of a React component and provide metrics",
      inputSchema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "The React component code to analyze",
          },
        },
        required: ["code"],
      },
      async call(request: CallToolRequestSchema): Promise<any> {
        const { code } = request.arguments;
        return await tamboIntegration.analyzeComplexity(code);
      },
    },

    generate_tests: {
      name: "generate_tests",
      description:
        "Generate comprehensive tests for a React component using Tambo AI",
      inputSchema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "The React component code to test",
          },
          componentName: {
            type: "string",
            description: "Name of the component",
          },
          testFramework: {
            type: "string",
            enum: ["jest", "vitest", "testing-library"],
            description: "Test framework to use",
          },
        },
        required: ["code", "componentName"],
      },
      async call(request: CallToolRequestSchema): Promise<any> {
        const { code, componentName, testFramework } = request.arguments;
        return await tamboIntegration.generateTests({
          code,
          componentName,
          testFramework,
        });
      },
    },
  };

  return { tools, tamboIntegration };
}
