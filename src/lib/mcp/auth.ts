// MCP Auth Tool - Local implementation

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: { username: string; role: string };
  error?: string;
}

export interface AuthConfig {
  type: "none" | "basic" | "oauth" | "custom";
  providers?: string[];
  customEndpoint?: string;
  requiredFields?: string[];
}

export class AuthTool {
  private static instance: AuthTool;
  private session: {
    user: { username: string; role: string };
    expires: number;
  } | null = null;
  private users: Map<string, string> = new Map();

  private constructor() {
    // Initialize test users
    this.users.set("admin", "admin123");
    this.users.set("user", "user123");
  }

  static getInstance(): AuthTool {
    if (!AuthTool.instance) {
      AuthTool.instance = new AuthTool();
    }
    return AuthTool.instance;
  }

  async authenticate(credentials: AuthCredentials): Promise<AuthResult> {
    console.log("AuthTool: authenticate called with", credentials);

    // Clear expired session
    if (this.session && Date.now() > this.session.expires) {
      this.session = null;
    }

    // Check if already authenticated
    if (this.session) {
      return {
        success: true,
        user: this.session.user,
      };
    }

    // Validate credentials
    const storedPassword = this.users.get(credentials.username);
    if (!storedPassword || storedPassword !== credentials.password) {
      return {
        success: false,
        error: "Invalid username or password",
      };
    }

    // Create session
    this.session = {
      user: {
        username: credentials.username,
        role: credentials.username === "admin" ? "admin" : "user",
      },
      expires: Date.now() + 30 * 60 * 1000, // 30 minutes
    };

    return {
      success: true,
      user: this.session.user,
    };
  }

  async logout(): Promise<AuthResult> {
    console.log("AuthTool: logout called");
    this.session = null;
    return {
      success: true,
    };
  }

  async validateSession(): Promise<AuthResult> {
    console.log("AuthTool: validateSession called");

    if (!this.session) {
      return {
        success: false,
        error: "No active session",
      };
    }

    if (Date.now() > this.session.expires) {
      this.session = null;
      return {
        success: false,
        error: "Session expired",
      };
    }

    return {
      success: true,
      user: this.session.user,
    };
  }

  async getAuthConfig(): Promise<{
    success: boolean;
    config?: AuthConfig;
    error?: string;
  }> {
    console.log("AuthTool: getAuthConfig called");

    // Return mock auth configuration
    const config: AuthConfig = {
      type: "basic",
      providers: ["google", "github"],
      customEndpoint: "/api/auth",
      requiredFields: ["email", "password"],
    };

    return {
      success: true,
      config,
    };
  }

  async updateAuthConfig(
    config: AuthConfig,
  ): Promise<{ success: boolean; error?: string }> {
    console.log("AuthTool: updateAuthConfig called with", config);

    // Mock implementation - in real app this would save to database
    return {
      success: true,
    };
  }
}

// Export singleton instance
export const authTool = AuthTool.getInstance();

// Export for MCP tool registration
export const authenticate = authTool.authenticate.bind(authTool);
export const logout = authTool.logout.bind(authTool);
export const validateSession = authTool.validateSession.bind(authTool);
export const getAuthConfig = authTool.getAuthConfig.bind(authTool);
export const updateAuthConfig = authTool.updateAuthConfig.bind(authTool);
