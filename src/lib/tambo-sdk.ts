// Tambo AI SDK Integration
// This file demonstrates how to integrate with Tambo AI services

import React from "react";

export interface TamboConfig {
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface TamboMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface TamboResponse {
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  model?: string;
  error?: string;
}

export interface TamboStreamChunk {
  content: string;
  isComplete: boolean;
  usage?: TamboResponse["usage"];
}

export class TamboSDK {
  private config: TamboConfig;
  private conversationHistory: TamboMessage[] = [];

  constructor(config: TamboConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || "https://api.tambo.ai",
      model: config.model || "tambo-llm-v1",
      temperature: config.temperature || 0.7,
      maxTokens: config.maxTokens || 2000,
      ...config,
    };
  }

  async sendMessage(
    content: string,
    onStream?: (chunk: TamboStreamChunk) => void,
  ): Promise<TamboResponse> {
    // Add user message to history
    this.conversationHistory.push({
      role: "user",
      content,
      timestamp: new Date(),
    });

    try {
      // In a real implementation, this would call the Tambo AI API
      const response = await this.mockAPICall(content, onStream);

      // Add assistant response to history
      this.conversationHistory.push({
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
      });

      return response;
    } catch (error) {
      return {
        content: "",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async streamMessage(
    content: string,
    onChunk: (chunk: TamboStreamChunk) => void,
  ): Promise<TamboResponse> {
    return this.sendMessage(content, onChunk);
  }

  getConversationHistory(): TamboMessage[] {
    return [...this.conversationHistory];
  }

  clearHistory(): void {
    this.conversationHistory = [];
  }

  private async mockAPICall(
    content: string,
    onStream?: (chunk: TamboStreamChunk) => void,
  ): Promise<TamboResponse> {
    // Mock implementation - in production this would call actual Tambo AI API
    return new Promise((resolve) => {
      const mockResponses = [
        "I understand you want to build a web application. Let me analyze your requirements and help you create a technical specification.",
        "Based on your requirements, I'll generate the necessary React components for your application.",
        "Let me create the file structure and implement the components step by step.",
        "Your application is being generated. Here's the code for your components.",
        "All components have been successfully generated. Let me validate the code and prepare it for deployment.",
      ];

      const response =
        mockResponses[Math.floor(Math.random() * mockResponses.length)];

      if (onStream) {
        // Simulate streaming response
        const chunks = response.split(" ");
        let accumulated = "";

        chunks.forEach((chunk, index) => {
          setTimeout(() => {
            accumulated += (index > 0 ? " " : "") + chunk;
            onStream({
              content: accumulated,
              isComplete: index === chunks.length - 1,
              usage: {
                prompt_tokens: 100,
                completion_tokens: chunks.length,
                total_tokens: 100 + chunks.length,
              },
            });
          }, index * 100);
        });
      }

      setTimeout(() => {
        resolve({
          content: response,
          usage: {
            prompt_tokens: 100,
            completion_tokens: response.length,
            total_tokens: 100 + response.length,
          },
          model: this.config.model,
        });
      }, 1000);
    });
  }

  // Advanced features
  async generateCode(prompt: string): Promise<string> {
    const response = await this.sendMessage(
      `Generate React code for: ${prompt}`,
    );
    return response.content;
  }

  async analyzeCode(code: string): Promise<string> {
    const response = await this.sendMessage(
      `Analyze this React code for issues: ${code}`,
    );
    return response.content;
  }

  async optimizeCode(code: string): Promise<string> {
    const response = await this.sendMessage(
      `Optimize this React code for performance: ${code}`,
    );
    return response.content;
  }

  async generateDocumentation(code: string): Promise<string> {
    const response = await this.sendMessage(
      `Generate documentation for this React component: ${code}`,
    );
    return response.content;
  }
}

// Export default instance
export const tamboSDK = new TamboSDK();

// React hooks for Tambo integration
export function useTamboChat(config?: TamboConfig) {
  const [sdk] = React.useState(() => new TamboSDK(config));
  const [messages, setMessages] = React.useState<TamboMessage[]>([]);
  const [isStreaming, setIsStreaming] = React.useState(false);

  const sendMessage = React.useCallback(
    async (content: string) => {
      setIsStreaming(true);
      const response = await sdk.sendMessage(content, (chunk) => {
        if (chunk.isComplete) {
          setIsStreaming(false);
        }
      });

      setMessages(sdk.getConversationHistory());
      return response;
    },
    [sdk],
  );

  const clearHistory = React.useCallback(() => {
    sdk.clearHistory();
    setMessages([]);
  }, [sdk]);

  return {
    messages,
    isStreaming,
    sendMessage,
    clearHistory,
    sdk,
  };
}

// Component for Tambo integration
export const TamboChat: React.FC<{
  onMessage?: (message: TamboMessage) => void;
  placeholder?: string;
}> = ({ onMessage, placeholder = "Type your message..." }) => {
  const { messages, isStreaming, sendMessage } = useTamboChat();
  const [input, setInput] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const response = await sendMessage(input);
    setInput("");
    if (onMessage) {
      onMessage({
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
      });
    }
  };

  return React.createElement(
    "div",
    { className: "border border-gray-300 rounded-lg p-4" },
    React.createElement(
      "div",
      { className: "space-y-4 mb-4 max-h-64 overflow-y-auto" },
      messages.map((msg, index) =>
        React.createElement(
          "div",
          {
            key: index,
            className: `p-2 rounded ${msg.role === "user" ? "bg-blue-100" : "bg-gray-100"}`,
          },
          React.createElement("p", { className: "text-sm" }, msg.content),
          React.createElement(
            "span",
            { className: "text-xs text-gray-500" },
            msg.timestamp.toLocaleTimeString(),
          ),
        ),
      ),
      isStreaming &&
        React.createElement(
          "div",
          { className: "flex space-x-2" },
          React.createElement("div", {
            className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce",
          }),
          React.createElement("div", {
            className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce",
            style: { animationDelay: "0.1s" },
          }),
          React.createElement("div", {
            className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce",
            style: { animationDelay: "0.2s" },
          }),
        ),
    ),
    React.createElement(
      "form",
      {
        onSubmit: handleSubmit,
        className: "flex gap-2",
      },
      React.createElement("input", {
        type: "text",
        value: input,
        onChange: (e) => setInput(e.target.value),
        placeholder: placeholder,
        className:
          "flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
      }),
      React.createElement(
        "button",
        {
          type: "submit",
          disabled: isStreaming || !input.trim(),
          className:
            "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50",
        },
        "Send",
      ),
    ),
  );
};
