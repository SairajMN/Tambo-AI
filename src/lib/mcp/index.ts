// MCP Tools Registry - Local implementation

import {
  authTool,
  authenticate,
  logout,
  validateSession,
  getAuthConfig,
  updateAuthConfig,
} from "./auth";
import {
  databaseTool,
  executeDatabaseOperation,
  getDatabaseStats,
  clearDatabase,
} from "./database";
import {
  fileSystemTool,
  executeFileOperation,
  getFileStats,
  clearFileSystem,
  batchWriteFiles,
} from "./filesystem";
import {
  validationTool,
  validateContent,
  getValidationStats,
  validateMultipleItems,
} from "./validation";
import {
  deploymentTool,
  deployApplication,
  getDeploymentStatus,
  listDeployments,
  cancelDeployment,
  getDeploymentLogs,
  getPlatformInfo,
  validateDeploymentConfig,
} from "./deployment";

// Export all tools and their functions
export {
  // Auth Tool
  authTool,
  authenticate,
  logout,
  validateSession,
  getAuthConfig,
  updateAuthConfig,

  // Database Tool
  databaseTool,
  executeDatabaseOperation,
  getDatabaseStats,
  clearDatabase,

  // File System Tool
  fileSystemTool,
  executeFileOperation,
  getFileStats,
  clearFileSystem,
  batchWriteFiles,

  // Validation Tool
  validationTool,
  validateContent,
  getValidationStats,
  validateMultipleItems,

  // Deployment Tool
  deploymentTool,
  deployApplication,
  getDeploymentStatus,
  listDeployments,
  cancelDeployment,
  getDeploymentLogs,
  getPlatformInfo,
  validateDeploymentConfig,
};

// Tool metadata for registration
export const MCP_TOOLS = {
  // Auth Tools
  authenticate: {
    name: "authenticate",
    description: "Authenticate user with credentials",
    inputSchema: {
      type: "object",
      properties: {
        username: { type: "string" },
        password: { type: "string" },
      },
      required: ["username", "password"],
    },
  },
  logout: {
    name: "logout",
    description: "Logout current user session",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  validateSession: {
    name: "validateSession",
    description: "Validate current user session",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  getAuthConfig: {
    name: "getAuthConfig",
    description: "Get authentication configuration",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  updateAuthConfig: {
    name: "updateAuthConfig",
    description: "Update authentication configuration",
    inputSchema: {
      type: "object",
      properties: {
        type: { type: "string" },
        providers: { type: "array" },
        customEndpoint: { type: "string" },
        requiredFields: { type: "array" },
      },
    },
  },

  // Database Tools
  executeDatabaseOperation: {
    name: "executeDatabaseOperation",
    description: "Execute database operations (CRUD)",
    inputSchema: {
      type: "object",
      properties: {
        operation: {
          type: "string",
          enum: ["create", "read", "update", "delete", "query", "clear"],
        },
        collection: { type: "string" },
        data: { type: "object" },
        query: { type: "object" },
        id: { type: "string" },
      },
      required: ["operation", "collection"],
    },
  },
  getDatabaseStats: {
    name: "getDatabaseStats",
    description: "Get database statistics",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  clearDatabase: {
    name: "clearDatabase",
    description: "Clear all database collections",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },

  // File System Tools
  executeFileOperation: {
    name: "executeFileOperation",
    description: "Execute file system operations",
    inputSchema: {
      type: "object",
      properties: {
        operation: {
          type: "string",
          enum: ["read", "write", "delete", "list", "exists", "mkdir"],
        },
        path: { type: "string" },
        content: { type: "string" },
        recursive: { type: "boolean" },
      },
      required: ["operation", "path"],
    },
  },
  getFileStats: {
    name: "getFileStats",
    description: "Get file system statistics",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  clearFileSystem: {
    name: "clearFileSystem",
    description: "Clear all files and directories",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  batchWriteFiles: {
    name: "batchWriteFiles",
    description: "Write multiple files in batch",
    inputSchema: {
      type: "object",
      properties: {
        operations: {
          type: "array",
          items: {
            type: "object",
            properties: {
              path: { type: "string" },
              content: { type: "string" },
            },
            required: ["path", "content"],
          },
        },
      },
      required: ["operations"],
    },
  },

  // Validation Tools
  validateContent: {
    name: "validateContent",
    description: "Validate content based on type",
    inputSchema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["code", "schema", "security", "performance", "accessibility"],
        },
        content: { type: "string" },
        context: { type: "object" },
      },
      required: ["type", "content"],
    },
  },
  getValidationStats: {
    name: "getValidationStats",
    description: "Get validation statistics",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  validateMultipleItems: {
    name: "validateMultipleItems",
    description: "Validate multiple items at once",
    inputSchema: {
      type: "object",
      properties: {
        requests: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: {
                type: "string",
                enum: [
                  "code",
                  "schema",
                  "security",
                  "performance",
                  "accessibility",
                ],
              },
              content: { type: "string" },
              context: { type: "object" },
            },
            required: ["type", "content"],
          },
        },
      },
      required: ["requests"],
    },
  },

  // Deployment Tools
  deployApplication: {
    name: "deployApplication",
    description: "Deploy application to specified platform",
    inputSchema: {
      type: "object",
      properties: {
        config: {
          type: "object",
          properties: {
            platform: {
              type: "string",
              enum: ["vercel", "netlify", "github-pages", "docker", "custom"],
            },
            environment: {
              type: "string",
              enum: ["development", "staging", "production"],
            },
            buildCommand: { type: "string" },
            outputDir: { type: "string" },
            customConfig: { type: "object" },
          },
          required: ["platform", "environment", "buildCommand", "outputDir"],
        },
        files: {
          type: "array",
          items: {
            type: "object",
            properties: {
              path: { type: "string" },
              content: { type: "string" },
            },
            required: ["path", "content"],
          },
        },
        dryRun: { type: "boolean" },
      },
      required: ["config", "files"],
    },
  },
  getDeploymentStatus: {
    name: "getDeploymentStatus",
    description: "Get deployment status by ID",
    inputSchema: {
      type: "object",
      properties: {
        deploymentId: { type: "string" },
      },
      required: ["deploymentId"],
    },
  },
  listDeployments: {
    name: "listDeployments",
    description: "List all deployments",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  cancelDeployment: {
    name: "cancelDeployment",
    description: "Cancel a deployment",
    inputSchema: {
      type: "object",
      properties: {
        deploymentId: { type: "string" },
      },
      required: ["deploymentId"],
    },
  },
  getDeploymentLogs: {
    name: "getDeploymentLogs",
    description: "Get deployment logs",
    inputSchema: {
      type: "object",
      properties: {
        deploymentId: { type: "string" },
      },
      required: ["deploymentId"],
    },
  },
  getPlatformInfo: {
    name: "getPlatformInfo",
    description: "Get platform information",
    inputSchema: {
      type: "object",
      properties: {
        platform: { type: "string" },
      },
      required: ["platform"],
    },
  },
  validateDeploymentConfig: {
    name: "validateDeploymentConfig",
    description: "Validate deployment configuration",
    inputSchema: {
      type: "object",
      properties: {
        config: {
          type: "object",
          properties: {
            platform: {
              type: "string",
              enum: ["vercel", "netlify", "github-pages", "docker", "custom"],
            },
            environment: {
              type: "string",
              enum: ["development", "staging", "production"],
            },
            buildCommand: { type: "string" },
            outputDir: { type: "string" },
            customConfig: { type: "object" },
          },
          required: ["platform", "environment", "buildCommand", "outputDir"],
        },
      },
      required: ["config"],
    },
  },
};

// Export tool functions for easy access
export const TOOL_FUNCTIONS = {
  authenticate,
  logout,
  validateSession,
  getAuthConfig,
  updateAuthConfig,
  executeDatabaseOperation,
  getDatabaseStats,
  clearDatabase,
  executeFileOperation,
  getFileStats,
  clearFileSystem,
  batchWriteFiles,
  validateContent,
  getValidationStats,
  validateMultipleItems,
  deployApplication,
  getDeploymentStatus,
  listDeployments,
  cancelDeployment,
  getDeploymentLogs,
  getPlatformInfo,
  validateDeploymentConfig,
};

// Export tool descriptions for agent use
export const TOOL_DESCRIPTIONS = Object.values(MCP_TOOLS).map((tool) => ({
  name: tool.name,
  description: tool.description,
}));
