# Agentic Product Composer - Conversational App Builder

## Overview

The Agentic Product Composer is an MVP that transforms natural language app descriptions into fully functional React applications through an interactive, agent-driven development experience. Built with React + Next.js and Tambo-style dynamic component rendering, this system demonstrates the power of Generative UI for rapid application prototyping.

## 🎯 MVP Scope

### What This MVP DOES

- **Conversational App Specification**: Users describe their desired web app in natural language (e.g., "I need a task manager with drag-and-drop boards")
- **Agent-Driven Code Generation**: Three specialized agents convert requirements into complete React application code
- **Real-time Component Preview**: Live rendering of generated components as they're created, using Tambo-style dynamic rendering
- **Interactive Component Editing**: Users can modify generated components through conversational commands
- **Complete File Structure Generation**: Creates full Next.js project with pages, components, and styling
- **Visual Component Hierarchy**: Displays generated component tree and allows exploration
- **One-Click Local Development**: Generated apps are immediately runnable with `npm run dev`

### What This MVP EXPLICITLY DOES NOT DO

- **No Authentication Systems**: No user accounts, login, or persistent user data
- **No Database Integration**: No external APIs, databases, or backend services
- **No Complex State Management**: No Redux, Zustand, or advanced state patterns
- **No Production Deployment**: No build optimization, CI/CD, or hosting setup
- **No Advanced UI Frameworks**: No Material-UI, Ant Design, or component libraries
- **No Code Review or Optimization**: No performance analysis or code quality suggestions
- **No Multi-Agent Collaboration**: No agent-to-agent communication beyond the core pipeline

## 🏗️ Architecture

### System Components

1. **UI Layer**: React + Next.js interface with Tambo-style dynamic component rendering
2. **Agent Layer**: Three specialized conversational agents
   - **Conversation Agent**: Handles user requirements and clarifies needs
   - **Specification Agent**: Converts requirements to technical specifications
   - **Code Generation Agent**: Creates React components and file structure
3. **Code Generation Layer**: Tools that convert specifications into actual React components
4. **MCP Tool Layer**: Modular tools for file operations and project management

### Key Technologies

- **Frontend**: React + Next.js (App Router)
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety
- **MCP Tools**: Model Context Protocol for file system operations
- **Agent Orchestration**: Custom framework for coordinating specialized agents

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd tambo-ai-mvp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 🎮 Usage

### Basic Workflow

1. **Start the Conversation**: Describe your app idea in natural language
2. **Agent Processing**: Watch as three specialized agents work together to understand your requirements
3. **Component Generation**: See components being generated in real-time
4. **Preview and Edit**: Explore generated components and make modifications
5. **Run Your App**: Generated applications are immediately runnable

### Example Prompts

Try these sample app descriptions:

- "I need a task manager with drag-and-drop boards"
- "Create an e-commerce product catalog with filtering"
- "Build a dashboard with charts and metrics display"
- "Make a simple blog with posts and comments"

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main page
├── components/            # React components
│   ├── AgenticComposer.tsx    # Main interface
│   ├── ComponentPreview.tsx   # Component preview panel
│   └── FileStructureViewer.tsx # Project structure visualization
├── lib/                   # Core logic
│   ├── agent-orchestrator.ts  # Agent coordination
│   └── mcp-tools.ts           # File system tools
└── types/                 # TypeScript definitions
```

## 🔧 Technical Implementation

### Agent Pipeline

1. **Conversation Agent**: Analyzes user input using keyword-based analysis (demo implementation)
2. **Specification Agent**: Generates technical specifications with component definitions
3. **Code Generation Agent**: Creates React component code and project structure

### MCP Tools

The system includes a comprehensive set of MCP (Model Context Protocol) tools for file operations:

- `createFile`: Create new files with content
- `updateFile`: Update existing files
- `readFile`: Read file contents
- `listFiles`: List directory contents

### Component Generation

The system generates:

- React functional components with TypeScript interfaces
- Props and state definitions
- Tailwind CSS styling
- Complete Next.js project structure

## 🎨 UI Features

### Conversational Interface

- Real-time message display
- Typing indicators
- Message timestamps
- Smooth scrolling

### Component Preview

- Live component list
- Code preview with syntax highlighting
- Interactive component selection
- Edit capabilities (demo mode)

### File Structure Visualization

- Hierarchical file tree
- File type icons
- Click-to-select functionality
- Project overview

## 🧪 Demo Instructions

### For Hackathon Judges

1. **Setup**: Run `npm install && npm run dev`
2. **Navigate**: Open `http://localhost:3000`
3. **Demo Prompt**: Try "I need a task manager with drag-and-drop boards"
4. **Watch**: Observe the three-agent pipeline in action
5. **Explore**: Click on generated components to see code
6. **Run**: Generated apps are immediately runnable

### Demo Narrative

"Watch as I describe a simple e-commerce product catalog in plain English, and our system generates a complete, runnable React application with product cards, filtering, and search - all through conversational interaction and real-time component preview."

## 🛠️ Development

### Adding New Agent Capabilities

1. Extend the `AgentOrchestrator` class in `src/lib/agent-orchestrator.ts`
2. Add new agent methods following the existing pattern
3. Update the `processUserInput` method to include your new agent

### Customizing Component Templates

1. Modify the `generateComponentCode` method in `AgentOrchestrator`
2. Update component generation logic in `generateComponentsSpec`
3. Add new component types to the specification system

### Extending MCP Tools

1. Add new tool functions in `src/lib/mcp-tools.ts`
2. Update the `toolSchemas` object with tool definitions
3. Implement the actual file operations

## 📋 Future Enhancements

### Post-MVP Features

- **LLM Integration**: Connect to actual LLM APIs for real conversational capabilities
- **File System Operations**: Implement actual MCP tools for file creation
- **Code Validation**: Add ESLint and TypeScript checking
- **Component Libraries**: Integrate with UI component libraries
- **State Management**: Add Redux/Zustand for complex state
- **Database Integration**: Connect to real databases
- **Authentication**: Add user accounts and persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with React + Next.js
- Uses Tailwind CSS for styling
- Inspired by Tambo-style dynamic component rendering
- MCP protocol for tool abstraction

---

**Agentic Product Composer** - Transform ideas into applications, one conversation at a time.
