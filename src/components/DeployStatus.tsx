import React, { useState, useCallback } from "react";
import { useTambo } from "./TamboProvider";

interface DeploymentConfig {
  platform: "vercel" | "netlify" | "github-pages" | "docker" | "custom";
  environment: "development" | "staging" | "production";
  buildCommand: string;
  outputDir: string;
  customConfig?: Record<string, any>;
}

interface DeployStatusProps {
  config?: DeploymentConfig;
  onConfigUpdate?: (config: DeploymentConfig) => void;
  loading?: boolean;
  error?: string;
}

export const DeployStatus: React.FC<DeployStatusProps> = ({
  config: initialConfig = {
    platform: "vercel",
    environment: "development",
    buildCommand: "npm run build",
    outputDir: "out",
  },
  onConfigUpdate,
  loading = false,
  error,
}) => {
  const { renderComponent } = useTambo();
  const [config, setConfig] = useState<DeploymentConfig>(initialConfig);
  const [deploymentStatus, setDeploymentStatus] = useState<
    "idle" | "building" | "deploying" | "success" | "error"
  >("idle");
  const [deploymentLog, setDeploymentLog] = useState<string[]>([]);

  const updateConfig = useCallback(
    (updates: Partial<DeploymentConfig>) => {
      const newConfig = { ...config, ...updates };
      setConfig(newConfig);
      if (onConfigUpdate) {
        onConfigUpdate(newConfig);
      }
    },
    [config, onConfigUpdate],
  );

  const startDeployment = useCallback(async () => {
    setDeploymentStatus("building");
    setDeploymentLog(["🚀 Starting deployment process..."]);

    // Simulate build process
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setDeploymentLog((prev) => [...prev, "📦 Building application..."]);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setDeploymentLog((prev) => [...prev, "✅ Build completed successfully"]);

    setDeploymentStatus("deploying");
    setDeploymentLog((prev) => [...prev, "☁️  Deploying to cloud..."]);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setDeploymentLog((prev) => [...prev, "🌐 Configuring CDN and caching..."]);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setDeploymentStatus("success");
    setDeploymentLog((prev) => [
      ...prev,
      "🎉 Deployment successful!",
      `📍 URL: https://tambo-app-${Math.floor(Math.random() * 1000)}.vercel.app`,
    ]);
  }, []);

  const resetDeployment = useCallback(() => {
    setDeploymentStatus("idle");
    setDeploymentLog([]);
  }, []);

  if (loading) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-8 w-1/3 mb-4"></div>
          <div className="bg-gray-300 h-48 w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
        <h3 className="text-red-600 font-semibold mb-2">Deployment Error</h3>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "vercel":
        return "⚡";
      case "netlify":
        return "🔗";
      case "github-pages":
        return "🐙";
      case "docker":
        return "🐳";
      default:
        return "🌐";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "building":
        return "bg-yellow-500";
      case "deploying":
        return "bg-blue-500";
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Deployment Status</h3>
        <div className="flex items-center space-x-2">
          <span
            className={`w-3 h-3 rounded-full ${getStatusColor(deploymentStatus)}`}
          ></span>
          <span className="text-sm text-gray-600 capitalize">
            {deploymentStatus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deployment Platform
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "vercel", label: "Vercel", icon: "⚡" },
                { value: "netlify", label: "Netlify", icon: "🔗" },
                { value: "github-pages", label: "GitHub Pages", icon: "🐙" },
                { value: "docker", label: "Docker", icon: "🐳" },
              ].map((platform) => (
                <button
                  key={platform.value}
                  onClick={() =>
                    updateConfig({
                      platform: platform.value as DeploymentConfig["platform"],
                    })
                  }
                  className={`p-3 text-left border rounded-lg ${
                    config.platform === platform.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{platform.icon}</span>
                    <span className="font-medium">{platform.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Environment
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  value: "development",
                  label: "Development",
                  color: "bg-blue-100 text-blue-800",
                },
                {
                  value: "staging",
                  label: "Staging",
                  color: "bg-yellow-100 text-yellow-800",
                },
                {
                  value: "production",
                  label: "Production",
                  color: "bg-red-100 text-red-800",
                },
              ].map((env) => (
                <button
                  key={env.value}
                  onClick={() =>
                    updateConfig({
                      environment: env.value as DeploymentConfig["environment"],
                    })
                  }
                  className={`p-2 text-sm rounded ${
                    config.environment === env.value
                      ? env.color
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {env.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Build Configuration
            </label>
            <div className="space-y-2">
              <input
                type="text"
                value={config.buildCommand}
                onChange={(e) => updateConfig({ buildCommand: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded font-mono text-sm"
                placeholder="npm run build"
              />
              <input
                type="text"
                value={config.outputDir}
                onChange={(e) => updateConfig({ outputDir: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="out"
              />
            </div>
          </div>
        </div>

        <div className="col-span-8">
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Deployment Log</h4>
              <div className="text-sm text-gray-600">
                {deploymentStatus === "idle"
                  ? "Ready to deploy"
                  : "In progress..."}
              </div>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {deploymentLog.length === 0 ? (
                <div className="text-gray-500 text-sm">
                  No deployment activity yet
                </div>
              ) : (
                deploymentLog.map((log, index) => (
                  <div
                    key={index}
                    className="text-sm font-mono bg-white p-2 rounded border"
                  >
                    {log}
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 flex gap-2">
              {deploymentStatus === "idle" ? (
                <button
                  onClick={startDeployment}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  🚀 Deploy Now
                </button>
              ) : (
                <button
                  onClick={resetDeployment}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  🔄 Reset
                </button>
              )}

              {deploymentStatus === "success" && (
                <button
                  onClick={() =>
                    window.open(
                      `https://tambo-app-${Math.floor(Math.random() * 1000)}.vercel.app`,
                      "_blank",
                    )
                  }
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  🌐 View Live
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">Deployment Summary</h4>
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div className="bg-gray-50 p-3 rounded">
            <span className="text-gray-600">Platform:</span>
            <div className="font-medium flex items-center space-x-2 mt-1">
              <span>{getPlatformIcon(config.platform)}</span>
              <span>{config.platform}</span>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <span className="text-gray-600">Environment:</span>
            <div className="font-medium mt-1">{config.environment}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <span className="text-gray-600">Build Command:</span>
            <div className="font-mono text-xs mt-1">{config.buildCommand}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <span className="text-gray-600">Output Dir:</span>
            <div className="font-medium mt-1">/{config.outputDir}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
