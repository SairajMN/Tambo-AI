// MCP File System Tool - Local implementation

export interface FileOperation {
  operation: "read" | "write" | "delete" | "list" | "exists" | "mkdir";
  path: string;
  content?: string;
  recursive?: boolean;
}

export interface FileOperationResult {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
}

export interface BatchWriteResult {
  success: boolean;
  results?: FileOperationResult[];
  error?: string;
  message?: string;
}

export class FileSystemTool {
  private static instance: FileSystemTool;
  private files: Map<string, string> = new Map();
  private directories: Set<string> = new Set();

  private constructor() {
    // Initialize with some sample files
    this.files.set("src/app/page.tsx", "// Sample page component");
    this.files.set("src/components/Button.tsx", "// Sample button component");
    this.directories.add("src");
    this.directories.add("src/components");
    this.directories.add("src/app");
  }

  static getInstance(): FileSystemTool {
    if (!FileSystemTool.instance) {
      FileSystemTool.instance = new FileSystemTool();
    }
    return FileSystemTool.instance;
  }

  async executeOperation(
    operation: FileOperation,
  ): Promise<FileOperationResult> {
    console.log("FileSystemTool: executeOperation called with", operation);

    switch (operation.operation) {
      case "read":
        return this.readFile(operation.path);

      case "write":
        return this.writeFile(operation.path, operation.content || "");

      case "delete":
        return this.deleteFile(operation.path);

      case "list":
        return this.listDirectory(operation.path, operation.recursive);

      case "exists":
        return this.fileExists(operation.path);

      case "mkdir":
        return this.createDirectory(operation.path);

      default:
        return {
          success: false,
          error: `Unknown operation: ${operation.operation}`,
        };
    }
  }

  private readFile(path: string): FileOperationResult {
    const content = this.files.get(path);
    if (!content) {
      return {
        success: false,
        error: `File not found: ${path}`,
      };
    }

    return {
      success: true,
      data: content,
      message: `Read ${content.length} characters from ${path}`,
    };
  }

  private writeFile(path: string, content: string): FileOperationResult {
    // Ensure directory exists
    const dir = path.substring(0, path.lastIndexOf("/"));
    if (dir && !this.directories.has(dir)) {
      this.createDirectoryInternal(dir);
    }

    this.files.set(path, content);

    return {
      success: true,
      message: `Wrote ${content.length} characters to ${path}`,
    };
  }

  private deleteFile(path: string): FileOperationResult {
    if (!this.files.has(path)) {
      return {
        success: false,
        error: `File not found: ${path}`,
      };
    }

    this.files.delete(path);

    return {
      success: true,
      message: `Deleted file: ${path}`,
    };
  }

  private listDirectory(
    path: string,
    recursive: boolean = false,
  ): FileOperationResult {
    const files: string[] = [];
    const directories: string[] = [];

    // Add current directory if it exists
    if (this.directories.has(path)) {
      directories.push(path);
    }

    // List files and directories
    for (const [filePath, content] of Array.from(this.files.entries())) {
      if (filePath.startsWith(path + "/")) {
        const relativePath = filePath.substring(path.length + 1);
        const firstSegment = relativePath.split("/")[0];

        if (!firstSegment.includes(".")) {
          // It's a directory
          const dirPath = `${path}/${firstSegment}`;
          if (!directories.includes(dirPath)) {
            directories.push(dirPath);
          }
        } else {
          // It's a file
          files.push(filePath);
        }
      } else if (filePath === path) {
        files.push(filePath);
      }
    }

    // Recursively list subdirectories if requested
    if (recursive) {
      const allDirectories = [...directories];
      for (const dir of allDirectories) {
        const result = this.listDirectory(dir, true);
        if (result.success) {
          directories.push(...(result.data?.directories || []));
          files.push(...(result.data?.files || []));
        }
      }
    }

    return {
      success: true,
      data: {
        path,
        files: files.sort(),
        directories: directories.sort(),
      },
    };
  }

  private fileExists(path: string): FileOperationResult {
    const exists = this.files.has(path) || this.directories.has(path);

    return {
      success: true,
      data: { exists, path },
      message: `${path} ${exists ? "exists" : "does not exist"}`,
    };
  }

  private createDirectory(path: string): FileOperationResult {
    if (this.directories.has(path)) {
      return {
        success: true,
        message: `Directory already exists: ${path}`,
      };
    }

    this.createDirectoryInternal(path);

    return {
      success: true,
      message: `Created directory: ${path}`,
    };
  }

  private createDirectoryInternal(path: string): void {
    // Create parent directories first
    const parts = path.split("/");
    let currentPath = "";

    for (let i = 0; i < parts.length; i++) {
      if (parts[i]) {
        currentPath += `/${parts[i]}`;
        this.directories.add(currentPath.substring(1)); // Remove leading slash
      }
    }
  }

  // Utility methods
  async getStats(): Promise<{ success: boolean; stats?: any; error?: string }> {
    const stats = {
      totalFiles: this.files.size,
      totalDirectories: this.directories.size,
      files: Array.from(this.files.keys()).sort(),
      directories: Array.from(this.directories).sort(),
    };

    return {
      success: true,
      stats,
    };
  }

  async clearAll(): Promise<{ success: boolean; message?: string }> {
    this.files.clear();
    this.directories.clear();

    return {
      success: true,
      message: "All files and directories cleared",
    };
  }

  // Batch operations
  async batchWrite(
    operations: { path: string; content: string }[],
  ): Promise<BatchWriteResult> {
    const results: FileOperationResult[] = [];

    for (const op of operations) {
      const result = await this.writeFile(op.path, op.content);
      results.push(result);

      if (!result.success) {
        return {
          success: false,
          error: `Batch write failed at ${op.path}: ${result.error}`,
          results,
        };
      }
    }

    return {
      success: true,
      results,
      message: `Successfully wrote ${results.length} files`,
    };
  }
}

// Export singleton instance
export const fileSystemTool = FileSystemTool.getInstance();

// Export for MCP tool registration
export const executeFileOperation =
  fileSystemTool.executeOperation.bind(fileSystemTool);
export const getFileStats = fileSystemTool.getStats.bind(fileSystemTool);
export const clearFileSystem = fileSystemTool.clearAll.bind(fileSystemTool);
export const batchWriteFiles = fileSystemTool.batchWrite.bind(fileSystemTool);
