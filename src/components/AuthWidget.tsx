import React, { useState, useCallback } from "react";
import { useTambo } from "./TamboProvider";

interface AuthConfig {
  type: "none" | "basic" | "oauth" | "custom";
  providers?: string[];
  customEndpoint?: string;
  requiredFields?: string[];
}

interface AuthWidgetProps {
  config?: AuthConfig;
  onConfigUpdate?: (config: AuthConfig) => void;
  loading?: boolean;
  error?: string;
}

export const AuthWidget: React.FC<AuthWidgetProps> = ({
  config: initialConfig = { type: "none" },
  onConfigUpdate,
  loading = false,
  error,
}) => {
  const { renderComponent } = useTambo();
  const [config, setConfig] = useState<AuthConfig>(initialConfig);
  const [isEditing, setIsEditing] = useState(false);

  const updateConfig = useCallback(
    (updates: Partial<AuthConfig>) => {
      const newConfig = { ...config, ...updates };
      setConfig(newConfig);
      if (onConfigUpdate) {
        onConfigUpdate(newConfig);
      }
    },
    [config, onConfigUpdate],
  );

  if (loading) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-8 w-1/4 mb-4"></div>
          <div className="bg-gray-300 h-4 w-full mb-2"></div>
          <div className="bg-gray-300 h-4 w-3/4 mb-2"></div>
          <div className="bg-gray-300 h-10 w-1/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
        <h3 className="text-red-600 font-semibold mb-2">
          Authentication Error
        </h3>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  const renderAuthPreview = () => {
    switch (config.type) {
      case "basic":
        return (
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">
                Basic Authentication
              </h4>
              <p className="text-sm text-blue-700">
                Username and password authentication with session management
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <span>• Session-based</span>
              <span>• Password hashing</span>
              <span>• CSRF protection</span>
              <span>• Remember me option</span>
            </div>
          </div>
        );

      case "oauth":
        return (
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">
                OAuth Authentication
              </h4>
              <p className="text-sm text-green-700">
                Social login with{" "}
                {config.providers?.join(", ") || "Google, GitHub"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <span>• Google OAuth</span>
              <span>• GitHub OAuth</span>
              <span>• State management</span>
              <span>• Token refresh</span>
            </div>
          </div>
        );

      case "custom":
        return (
          <div className="space-y-3">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">
                Custom Authentication
              </h4>
              <p className="text-sm text-purple-700">
                Custom endpoint: {config.customEndpoint || "Not configured"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <span>• Custom API</span>
              <span>• JWT tokens</span>
              <span>• Role-based access</span>
              <span>• Custom validation</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">
              No Authentication
            </h4>
            <p className="text-sm text-gray-600">
              Public access - no authentication required
            </p>
          </div>
        );
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Authentication</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          {isEditing ? "View" : "Configure"}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Authentication Type
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: "none", label: "None", color: "gray" },
                { value: "basic", label: "Basic", color: "blue" },
                { value: "oauth", label: "OAuth", color: "green" },
                { value: "custom", label: "Custom", color: "purple" },
              ].map((authType) => (
                <button
                  key={authType.value}
                  onClick={() =>
                    updateConfig({ type: authType.value as AuthConfig["type"] })
                  }
                  className={`p-2 text-sm rounded border-2 ${
                    config.type === authType.value
                      ? `border-${authType.color}-500 bg-${authType.color}-50 text-${authType.color}-700`
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {authType.label}
                </button>
              ))}
            </div>
          </div>

          {config.type === "oauth" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OAuth Providers
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["google", "github", "microsoft"].map((provider) => (
                  <label key={provider} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={config.providers?.includes(provider) || false}
                      onChange={(e) => {
                        const providers = config.providers || [];
                        const newProviders = e.target.checked
                          ? [...providers, provider]
                          : providers.filter((p) => p !== provider);
                        updateConfig({ providers: newProviders });
                      }}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm capitalize">{provider}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {config.type === "custom" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Endpoint
              </label>
              <input
                type="text"
                value={config.customEndpoint || ""}
                onChange={(e) =>
                  updateConfig({ customEndpoint: e.target.value })
                }
                placeholder="https://api.example.com/auth"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Fields
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["email", "username", "password", "name", "phone"].map(
                (field) => (
                  <label key={field} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={config.requiredFields?.includes(field) || false}
                      onChange={(e) => {
                        const fields = config.requiredFields || [];
                        const newFields = e.target.checked
                          ? [...fields, field]
                          : fields.filter((f) => f !== field);
                        updateConfig({ requiredFields: newFields });
                      }}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm capitalize">{field}</span>
                  </label>
                ),
              )}
            </div>
          </div>
        </div>
      ) : (
        renderAuthPreview()
      )}
    </div>
  );
};
