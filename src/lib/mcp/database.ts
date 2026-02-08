// MCP Database Tool - Local in-memory implementation

export interface DatabaseOperation {
  operation: "create" | "read" | "update" | "delete" | "query" | "clear";
  collection: string;
  data?: any;
  query?: any;
  id?: string;
}

export interface DatabaseResult {
  success: boolean;
  data?: any;
  count?: number;
  message?: string;
  error?: string;
}

export class DatabaseTool {
  private static instance: DatabaseTool;
  private database: Map<string, Map<string, any>> = new Map();
  private idCounter: Map<string, number> = new Map();

  private constructor() {
    // Initialize collections
    this.database.set("components", new Map());
    this.database.set("sessions", new Map());
    this.database.set("projects", new Map());
    this.database.set("cache", new Map());
  }

  static getInstance(): DatabaseTool {
    if (!DatabaseTool.instance) {
      DatabaseTool.instance = new DatabaseTool();
    }
    return DatabaseTool.instance;
  }

  async executeOperation(
    operation: DatabaseOperation,
  ): Promise<DatabaseResult> {
    console.log("DatabaseTool: executeOperation called with", operation);

    const collection = this.getCollection(operation.collection);
    if (!collection) {
      return {
        success: false,
        error: `Collection '${operation.collection}' not found`,
      };
    }

    switch (operation.operation) {
      case "create":
        return this.create(collection, operation.data);

      case "read":
        return this.read(collection, operation.id);

      case "update":
        return this.update(collection, operation.id!, operation.data);

      case "delete":
        return this.delete(collection, operation.id!);

      case "query":
        return this.query(collection, operation.query);

      case "clear":
        return this.clear(collection);

      default:
        return {
          success: false,
          error: `Unknown operation: ${operation.operation}`,
        };
    }
  }

  private getCollection(name: string): Map<string, any> | null {
    return this.database.get(name) || null;
  }

  private create(collection: Map<string, any>, data: any): DatabaseResult {
    if (!data) {
      return {
        success: false,
        error: "No data provided for creation",
      };
    }

    // Generate ID
    const id = this.generateId(collection);
    const timestamp = new Date().toISOString();

    const record = {
      id,
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    collection.set(id, record);

    return {
      success: true,
      data: record,
      message: `Record created with ID: ${id}`,
    };
  }

  private read(collection: Map<string, any>, id?: string): DatabaseResult {
    if (!id) {
      // Return all records
      const records = Array.from(collection.values());
      return {
        success: true,
        data: records,
        count: records.length,
      };
    }

    const record = collection.get(id);
    if (!record) {
      return {
        success: false,
        error: `Record with ID '${id}' not found`,
      };
    }

    return {
      success: true,
      data: record,
    };
  }

  private update(
    collection: Map<string, any>,
    id: string,
    data: any,
  ): DatabaseResult {
    const existing = collection.get(id);
    if (!existing) {
      return {
        success: false,
        error: `Record with ID '${id}' not found`,
      };
    }

    const timestamp = new Date().toISOString();
    const updated = {
      ...existing,
      ...data,
      updatedAt: timestamp,
    };

    collection.set(id, updated);

    return {
      success: true,
      data: updated,
      message: `Record ${id} updated`,
    };
  }

  private delete(collection: Map<string, any>, id: string): DatabaseResult {
    const existing = collection.get(id);
    if (!existing) {
      return {
        success: false,
        error: `Record with ID '${id}' not found`,
      };
    }

    collection.delete(id);

    return {
      success: true,
      message: `Record ${id} deleted`,
    };
  }

  private query(collection: Map<string, any>, query: any): DatabaseResult {
    if (!query) {
      return this.read(collection);
    }

    const results = Array.from(collection.values()).filter((record) => {
      return this.matchesQuery(record, query);
    });

    return {
      success: true,
      data: results,
      count: results.length,
    };
  }

  private clear(collection: Map<string, any>): DatabaseResult {
    const count = collection.size;
    collection.clear();

    return {
      success: true,
      count,
      message: `${count} records cleared`,
    };
  }

  private generateId(collection: Map<string, any>): string {
    const collectionName =
      Array.from(this.database.entries()).find(
        ([_, map]) => map === collection,
      )?.[0] || "unknown";

    const counter = this.idCounter.get(collectionName) || 0;
    this.idCounter.set(collectionName, counter + 1);

    return `${collectionName}_${counter + 1}`;
  }

  private matchesQuery(record: any, query: any): boolean {
    return Object.entries(query).every(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        // Handle nested queries
        return this.matchesQuery(record[key], value);
      }
      return record[key] === value;
    });
  }

  // Utility methods
  async getStats(): Promise<{ success: boolean; stats?: any; error?: string }> {
    const stats: any = {};

    for (const [collectionName, collection] of Array.from(
      this.database.entries(),
    )) {
      stats[collectionName] = {
        count: collection.size,
        keys: Array.from(collection.keys()),
      };
    }

    return {
      success: true,
      stats,
    };
  }

  async clearAll(): Promise<{ success: boolean; message?: string }> {
    for (const collection of Array.from(this.database.values())) {
      collection.clear();
    }
    this.idCounter.clear();

    return {
      success: true,
      message: "All collections cleared",
    };
  }
}

// Export singleton instance
export const databaseTool = DatabaseTool.getInstance();

// Export for MCP tool registration
export const executeDatabaseOperation =
  databaseTool.executeOperation.bind(databaseTool);
export const getDatabaseStats = databaseTool.getStats.bind(databaseTool);
export const clearDatabase = databaseTool.clearAll.bind(databaseTool);
