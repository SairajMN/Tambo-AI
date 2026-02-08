"use client";

import React, { useState, useRef, useEffect } from "react";
import { AgentOrchestrator } from "@/lib/agent-orchestrator";
import { ComponentList, ComponentPreview } from "./ComponentPreview";
import {
  FileStructureViewer,
  generateSampleStructure,
} from "./FileStructureViewer";

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: Date;
}

export function AgenticComposer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedComponents, setGeneratedComponents] = useState<string[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null,
  );
  const [componentCodes, setComponentCodes] = useState<Record<string, string>>(
    {},
  );
  const [projectStructure, setProjectStructure] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const orchestrator = new AgentOrchestrator();

  useEffect(() => {
    // Add welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      type: "agent",
      content:
        "Welcome to Agentic Product Composer! I'm your AI assistant for building React applications. Describe your app idea in natural language and I'll help you build it step by step.",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);

    try {
      // Process message through agent pipeline
      const result = await orchestrator.processUserInput(userMessage.content);

      // Convert AgentMessage to Message format
      const newMessages: Message[] = result.map((agentMsg) => ({
        id: agentMsg.id,
        type: agentMsg.type,
        content: agentMsg.content,
        timestamp: agentMsg.timestamp,
      }));

      setMessages((prev) => [...prev, ...newMessages.slice(prev.length)]);

      // Extract generated components for preview
      const spec = orchestrator.getCurrentSpecification();
      if (spec) {
        setGeneratedComponents(spec.components.map((c) => c.name));
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: `I encountered an error: ${error instanceof Error ? error.message : String(error)}. Please try rephrasing your request.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Conversational Interface */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Conversation
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Describe your app idea in natural language. I'll help you build it
              step by step.
            </p>

            <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe your app idea..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isProcessing}
              />
              <button
                type="submit"
                disabled={isProcessing || !inputValue.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Component Preview */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Component Preview
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Generated components will appear here in real-time.
            </p>

            {generatedComponents.length > 0 ? (
              <div className="space-y-4">
                <ComponentList
                  components={generatedComponents}
                  onComponentSelect={setSelectedComponent}
                />
                {selectedComponent && (
                  <ComponentPreview
                    componentName={selectedComponent}
                    componentCode={
                      componentCodes[selectedComponent] ||
                      "// Component code will be generated by the agent system"
                    }
                    onEdit={(newCode) => {
                      setComponentCodes((prev) => ({
                        ...prev,
                        [selectedComponent]: newCode,
                      }));
                    }}
                  />
                )}
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-48 flex items-center justify-center">
                <p className="text-gray-400 text-sm">
                  No components generated yet. Start the conversation!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
