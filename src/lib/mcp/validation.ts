// MCP Validation Tool - Local implementation

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface ValidationRequest {
  type: "code" | "schema" | "security" | "performance" | "accessibility";
  content: string;
  context?: any;
}

export class ValidationTool {
  private static instance: ValidationTool;

  private constructor() {}

  static getInstance(): ValidationTool {
    if (!ValidationTool.instance) {
      ValidationTool.instance = new ValidationTool();
    }
    return ValidationTool.instance;
  }

  async validate(request: ValidationRequest): Promise<ValidationResult> {
    console.log("ValidationTool: validate called with", request);

    switch (request.type) {
      case "code":
        return this.validateCode(request.content, request.context);

      case "schema":
        return this.validateSchema(request.content, request.context);

      case "security":
        return this.validateSecurity(request.content, request.context);

      case "performance":
        return this.validatePerformance(request.content, request.context);

      case "accessibility":
        return this.validateAccessibility(request.content, request.context);

      default:
        return {
          isValid: false,
          errors: [`Unknown validation type: ${request.type}`],
          warnings: [],
          suggestions: [],
        };
    }
  }

  private validateCode(content: string, context?: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Check for common code issues
    if (content.includes("console.log")) {
      warnings.push(
        "Found console.log statements - consider removing for production",
      );
    }

    if (content.includes("TODO") || content.includes("FIXME")) {
      warnings.push("Found TODO/FIXME comments - consider addressing");
    }

    if (content.length > 5000) {
      warnings.push(
        "File is quite large - consider breaking into smaller components",
      );
    }

    // Check for React-specific issues
    if (content.includes("useState") && !content.includes("import")) {
      errors.push("useState used without proper import");
    }

    if (content.includes("useEffect") && !content.includes("[]")) {
      warnings.push(
        "useEffect without dependency array - may cause performance issues",
      );
    }

    // Check for TypeScript issues
    if (content.includes(": any")) {
      warnings.push("Found 'any' type - consider using more specific types");
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
    };
  }

  private validateSchema(content: string, context?: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    try {
      const schema = JSON.parse(content);

      // Basic schema validation
      if (!(schema as any).type) {
        errors.push("Schema missing required 'type' field");
      }

      if ((schema as any).type === "object" && !(schema as any).properties) {
        warnings.push("Object schema should have properties");
      }

      if ((schema as any).type === "array" && !(schema as any).items) {
        warnings.push("Array schema should have items definition");
      }

      // Check for common schema issues
      if (schema.required && !Array.isArray(schema.required)) {
        errors.push("Required field should be an array");
      }

      if (schema.properties) {
        Object.entries(schema.properties).forEach(([key, prop]) => {
          if (typeof prop === "object" && prop !== null) {
            if (!prop.hasOwnProperty("type")) {
              warnings.push(`Property '${key}' missing type definition`);
            }
          }
        });
      }
    } catch (e) {
      errors.push(
        `Invalid JSON schema: ${e instanceof Error ? e.message : "Unknown error"}`,
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
    };
  }

  private validateSecurity(content: string, context?: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Check for security vulnerabilities
    if (content.includes("eval(")) {
      errors.push("Found eval() usage - security risk");
    }

    if (content.includes("innerHTML")) {
      warnings.push("Found innerHTML usage - potential XSS vulnerability");
      suggestions.push("Consider using textContent or proper sanitization");
    }

    if (content.includes("password") && content.includes("console.log")) {
      errors.push("Password logged to console - security risk");
    }

    if (content.includes("http://")) {
      warnings.push("Found HTTP URLs - consider using HTTPS for security");
    }

    if (content.includes("localStorage") && content.includes("password")) {
      warnings.push("Storing passwords in localStorage is insecure");
      suggestions.push("Use secure authentication methods");
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
    };
  }

  private validatePerformance(
    content: string,
    context?: any,
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Check for performance issues
    if (content.includes("for (let i = 0; i < 1000000")) {
      warnings.push("Large loop detected - consider optimization");
    }

    if (
      content.includes("Array.prototype.map") &&
      content.includes("Array.prototype.filter")
    ) {
      warnings.push("Chaining array methods may impact performance");
      suggestions.push("Consider using a single loop or useMemo");
    }

    if (content.includes("useState") && content.includes("setInterval")) {
      warnings.push("State updates in intervals may cause performance issues");
      suggestions.push("Consider using useRef for intervals");
    }

    if (content.includes("JSON.parse") && content.includes("JSON.stringify")) {
      warnings.push(
        "Frequent JSON parsing/stringifying may impact performance",
      );
      suggestions.push("Consider caching parsed data");
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
    };
  }

  private validateAccessibility(
    content: string,
    context?: any,
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Check for accessibility issues
    if (content.includes("<button>") && !content.includes("aria-")) {
      warnings.push("Button element should have aria-label or accessible text");
    }

    if (content.includes("<img") && !content.includes("alt=")) {
      errors.push("Image missing alt attribute - accessibility issue");
    }

    if (content.includes("tabindex") && content.includes('tabindex="-1"')) {
      warnings.push("Negative tabindex may affect keyboard navigation");
    }

    if (content.includes("color:") && !content.includes("background-color:")) {
      warnings.push("Consider color contrast for accessibility");
      suggestions.push("Use tools like axe or lighthouse to check contrast");
    }

    if (content.includes("onClick") && content.includes("div")) {
      warnings.push(
        "Interactive div should be a button or have proper ARIA attributes",
      );
      suggestions.push(
        "Use semantic HTML elements or add role='button' and keyboard handlers",
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
    };
  }

  // Utility methods
  async getValidationStats(): Promise<{
    success: boolean;
    stats?: any;
    error?: string;
  }> {
    return {
      success: true,
      stats: {
        supportedTypes: [
          "code",
          "schema",
          "security",
          "performance",
          "accessibility",
        ],
        totalValidations: 0,
        lastValidation: new Date().toISOString(),
      },
    };
  }

  async validateMultiple(requests: ValidationRequest[]): Promise<{
    success: boolean;
    results?: ValidationResult[];
    error?: string;  
    message?: string;
  }> {
    const results: ValidationResult[] = [];

    for (const request of requests) {
      const result = await this.validate(request);
      results.push(result);
    }

    return {
      success: true,
      results,
      message: `Validated ${results.length} items`,
    };
  }
}

// Export singleton instance
export const validationTool = ValidationTool.getInstance();

// Export for MCP tool registration
export const validateContent = validationTool.validate.bind(validationTool);
export const getValidationStats =
  validationTool.getValidationStats.bind(validationTool);
export const validateMultipleItems =
  validationTool.validateMultiple.bind(validationTool);
