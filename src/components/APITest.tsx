import React, { useState, useCallback } from "react";
import { useTambo } from "./TamboProvider";

interface APIEndpoint {
  id: string;
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  headers: Record<string, string>;
  body?: string;
}

interface APITestProps {
  endpoints?: APIEndpoint[];
  onEndpointAdd?: (endpoint: APIEndpoint) => void;
  onEndpointUpdate?: (endpoint: APIEndpoint) => void;
  loading?: boolean;
  error?: string;
}

export const APITest: React.FC<APITestProps> = ({
  endpoints: initialEndpoints = [],
  onEndpointAdd,
  onEndpointUpdate,
  loading = false,
  error,
}) => {
  const { renderComponent } = useTambo();
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>(initialEndpoints);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, any>>({});
  const [isTesting, setIsTesting] = useState(false);

  const addEndpoint = useCallback(
    (endpoint: Omit<APIEndpoint, "id">) => {
      const newEndpoint: APIEndpoint = {
        ...endpoint,
        id: `endpoint-${Date.now()}`,
      };

      const updatedEndpoints = [...endpoints, newEndpoint];
      setEndpoints(updatedEndpoints);
      if (onEndpointAdd) {
        onEndpointAdd(newEndpoint);
      }
    },
    [endpoints, onEndpointAdd],
  );

  const updateEndpoint = useCallback(
    (id: string, updates: Partial<APIEndpoint>) => {
      const updatedEndpoints = endpoints.map((endpoint) =>
        endpoint.id === id ? { ...endpoint, ...updates } : endpoint,
      );
      setEndpoints(updatedEndpoints);
      if (onEndpointUpdate) {
        onEndpointUpdate(updatedEndpoints.find((e) => e.id === id)!);
      }
    },
    [endpoints, onEndpointUpdate],
  );

  const testEndpoint = useCallback(
    async (endpointId: string) => {
      const endpoint = endpoints.find((e) => e.id === endpointId);
      if (!endpoint) return;

      setIsTesting(true);
      try {
        // Mock API testing - in production this would make actual HTTP requests
        const mockResponse = {
          status: 200,
          statusText: "OK",
          headers: { "Content-Type": "application/json" },
          data: {
            message: "Mock response from Tambo AI API",
            timestamp: new Date().toISOString(),
          },
          duration: Math.floor(Math.random() * 1000) + 100,
        };

        setTestResults((prev) => ({
          ...prev,
          [endpointId]: {
            ...mockResponse,
            success: true,
            timestamp: new Date().toISOString(),
          },
        }));
      } catch (error) {
        setTestResults((prev) => ({
          ...prev,
          [endpointId]: {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString(),
          },
        }));
      } finally {
        setIsTesting(false);
      }
    },
    [endpoints],
  );

  if (loading) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-8 w-1/3 mb-4"></div>
          <div className="bg-gray-300 h-64 w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
        <h3 className="text-red-600 font-semibold mb-2">API Test Error</h3>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  const selectedEndpointData = endpoints.find((e) => e.id === selectedEndpoint);

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">API Test</h3>
        <div className="text-sm text-gray-500">
          {endpoints.length} endpoints configured
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <div className="space-y-3">
            <button
              onClick={() =>
                addEndpoint({
                  name: "New Endpoint",
                  method: "GET",
                  url: "/api/test",
                  headers: { "Content-Type": "application/json" },
                })
              }
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              + Add Endpoint
            </button>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {endpoints.map((endpoint) => (
                <div
                  key={endpoint.id}
                  className={`p-3 border rounded cursor-pointer ${
                    selectedEndpoint === endpoint.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setSelectedEndpoint(endpoint.id)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{endpoint.name}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        endpoint.method === "GET"
                          ? "bg-green-100 text-green-800"
                          : endpoint.method === "POST"
                            ? "bg-blue-100 text-blue-800"
                            : endpoint.method === "PUT"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {endpoint.method}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {endpoint.url}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-8">
          {selectedEndpointData ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Method
                  </label>
                  <select
                    value={selectedEndpointData.method}
                    onChange={(e) =>
                      updateEndpoint(selectedEndpoint!, {
                        method: e.target.value as APIEndpoint["method"],
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL
                  </label>
                  <input
                    type="text"
                    value={selectedEndpointData.url}
                    onChange={(e) =>
                      updateEndpoint(selectedEndpoint!, { url: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="/api/endpoint"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headers
                </label>
                <div className="space-y-2">
                  {Object.entries(selectedEndpointData.headers).map(
                    ([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={key}
                          onChange={(e) => {
                            const newHeaders = {
                              ...selectedEndpointData.headers,
                            };
                            delete newHeaders[key];
                            newHeaders[e.target.value] = value;
                            updateEndpoint(selectedEndpoint!, {
                              headers: newHeaders,
                            });
                          }}
                          className="p-2 border border-gray-300 rounded"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => {
                            const newHeaders = {
                              ...selectedEndpointData.headers,
                            };
                            newHeaders[key] = e.target.value;
                            updateEndpoint(selectedEndpoint!, {
                              headers: newHeaders,
                            });
                          }}
                          className="p-2 border border-gray-300 rounded"
                        />
                      </div>
                    ),
                  )}
                  <button
                    onClick={() => {
                      const newHeaders = {
                        ...selectedEndpointData.headers,
                        "": "",
                      };
                      updateEndpoint(selectedEndpoint!, {
                        headers: newHeaders,
                      });
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Add Header
                  </button>
                </div>
              </div>

              {(selectedEndpointData.method === "POST" ||
                selectedEndpointData.method === "PUT") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Body
                  </label>
                  <textarea
                    value={selectedEndpointData.body || ""}
                    onChange={(e) =>
                      updateEndpoint(selectedEndpoint!, {
                        body: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded font-mono text-sm"
                    rows={6}
                    placeholder='{"key": "value"}'
                  />
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => testEndpoint(selectedEndpoint!)}
                  disabled={isTesting}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                >
                  {isTesting ? "Testing..." : "Test Endpoint"}
                </button>
                <button
                  onClick={() => setSelectedEndpoint(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Clear Selection
                </button>
              </div>

              {selectedEndpoint && testResults[selectedEndpoint] && (
                <div className="border border-gray-300 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Test Results</h4>
                  <div
                    className={`p-2 rounded mb-2 ${
                      testResults[selectedEndpoint].success
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {testResults[selectedEndpoint].success
                      ? "✅ Success"
                      : "❌ Failed"}
                  </div>

                  {testResults[selectedEndpoint].success ? (
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="text-gray-600">Status:</span>{" "}
                          {testResults[selectedEndpoint].status}
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="text-gray-600">Duration:</span>{" "}
                          {testResults[selectedEndpoint].duration}ms
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="text-gray-600">Time:</span>{" "}
                          {new Date(
                            testResults[selectedEndpoint].timestamp,
                          ).toLocaleTimeString()}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Response
                        </label>
                        <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-auto max-h-32">
                          {JSON.stringify(
                            testResults[selectedEndpoint].data,
                            null,
                            2,
                          )}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="text-red-600">
                      Error: {testResults[selectedEndpoint].error}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-gray-500 mb-2">No endpoint selected</div>
              <div className="text-sm text-gray-400">
                Select an endpoint from the list to configure and test
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
