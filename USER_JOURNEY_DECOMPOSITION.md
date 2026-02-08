# Agentic Product Composer - User Journey Decomposition

## Primary Scenario: "User describes a multi-page app → sees live UI → exports runnable scaffold"

### Step 0: Entry State

**Agent Intent**: Initialize clean conversational interface
**User-visible UI Component**:

- Welcome message in conversation panel
- Empty component preview area
- File structure viewer showing base project skeleton
  **Internal State Produced**:
- `messages: [{id: "welcome", type: "agent", content: "Welcome to Agentic Product Composer..."}]`
- `generatedComponents: []`
- `projectStructure: generateSampleStructure("MyApp")`
- `isProcessing: false`
  **MCP Tools**: None

### Step 1: Agent Interpretation

**Agent Intent**: Parse user's natural language description and extract app requirements
**User-visible UI Component**:

- User types in input field: "I need a task manager with drag-and-drop boards and user authentication"
- Typing indicator appears
- User message appears in conversation panel
  **Internal State Produced**:
- `messages: [..., {id: "user1", type: "user", content: "I need a task manager..."}]`
- `isProcessing: true`
- `requirements: {summary: "Task manager app", features: ["drag-and-drop boards", "user authentication"], complexity: "medium"}`
  **MCP Tools**: None

### Step 2: Clarification via UI Components

**Agent Intent**: Resolve ambiguities and gather specific requirements through structured UI
**User-visible UI Component**:

- Agent message: "I understand you want a task manager. Let me clarify some details:"
- **Architecture Selection**: Radio buttons for "Single Page App" vs "Multi-Page App"
- **Authentication Type**: Dropdown with options "No Auth", "Email/Password", "OAuth"
- **Board Types**: Checkbox list: "Kanban", "Scrum", "Custom"
- **Data Persistence**: Toggle for "Local Storage" vs "Mock API"
  **Internal State Produced**:
- `clarificationResponses: {architecture: "multi-page", auth: "email-password", boards: ["kanban"], persistence: "mock-api"}`
- `refinedRequirements: {appType: "task-manager", pages: ["login", "dashboard", "boards", "profile"], components: ["LoginForm", "Board", "TaskCard", "NavBar"]}`
  **MCP Tools**: None

### Step 3: Page Generation

**Agent Intent**: Generate complete page components based on clarified requirements
**User-visible UI Component**:

- Progress indicator: "Generating pages..."
- Component list updates in real-time as pages are created
- Preview panel shows generated page components
  **Internal State Produced**:
- `generatedComponents: ["LoginForm", "Dashboard", "KanbanBoard", "TaskCard", "NavBar", "Footer"]`
- `pageSpecifications: [
  {name: "Login", path: "/login", components: ["LoginForm", "NavBar"]},
  {name: "Dashboard", path: "/", components: ["NavBar", "Dashboard"]},
  {name: "Boards", path: "/boards", components: ["NavBar", "KanbanBoard"]},
  {name: "Profile", path: "/profile", components: ["NavBar", "ProfileForm"]}
]`
- `componentCodes: {
  "LoginForm": "export default function LoginForm() { ... }",
  "Dashboard": "export default function Dashboard() { ... }",
  ...
}`
  **MCP Tools**:
- `createFile` for each page component
- `createFile` for page routes

### Step 4: Flow Wiring

**Agent Intent**: Connect pages with navigation and state management
**User-visible UI Component**:

- File structure viewer updates with new files
- Navigation preview shows page connections
- Agent message: "Wiring navigation between pages..."
  **Internal State Produced**:
- `navigationStructure: {
  routes: ["/", "/login", "/boards", "/profile"],
  navigation: ["Home", "Boards", "Profile", "Logout"],
  protectedRoutes: ["/", "/boards", "/profile"]
}`
- `stateManagement: {
  authState: {user: null, isAuthenticated: false},
  boardState: {boards: [], selectedBoard: null},
  taskState: {tasks: [], filters: {}}
}`
- `appStructure: {
  pages: ["src/app/page.tsx", "src/app/login/page.tsx", "src/app/boards/page.tsx", "src/app/profile/page.tsx"],
  components: ["src/components/NavBar.tsx", "src/components/AuthProvider.tsx"]
}`
  **MCP Tools**:
- `createFile` for `src/components/NavBar.tsx`
- `createFile` for `src/components/AuthProvider.tsx`
- `updateFile` for `src/app/layout.tsx` (add navigation)

### Step 5: Preview Validation

**Agent Intent**: Validate generated app structure and provide interactive preview
**User-visible UI Component**:

- Live preview panel shows rendered components
- Navigation simulation allows clicking between pages
- Component inspector shows props and state
- Validation checklist: "✅ All pages generated", "✅ Navigation wired", "✅ Components functional"
  **Internal State Produced**:
- `previewState: {
  activePage: "dashboard",
  componentProps: {LoginForm: {onSubmit: "function"}, NavBar: {user: null}},
  navigationFlow: ["login → dashboard → boards → profile"]
}`
- `validationResults: {
  pages: "valid",
  components: "valid", 
  navigation: "valid",
  state: "valid"
}`
- `exportReady: true`
  **MCP Tools**: None

### Step 6: Export

**Agent Intent**: Generate complete, runnable project scaffold
**User-visible UI Component**:

- Export button appears: "Download Project"
- Progress bar: "Generating project files..."
- Success message: "Project ready! Run 'npm install && npm run dev'"
- File structure viewer shows complete project tree
  **Internal State Produced**:
- `exportPackage: {
  files: ["package.json", "tsconfig.json", "src/", "public/", "README.md"],
  dependencies: ["react", "next", "tailwindcss", "@types/react"],
  scripts: {dev: "next dev", build: "next build", start: "next start"}
}`
- `projectReady: true`
- `downloadUrl: "data:application/zip;base64,..."` (mock URL)
  **MCP Tools**:
- `createFile` for `package.json` with dependencies
- `createFile` for `tsconfig.json`
- `createFile` for `README.md`
- `createFile` for `public/` assets
- `listFiles` to verify complete structure

## State Transition Summary

```
Entry State → User Input → Clarification → Page Generation → Flow Wiring → Preview → Export
     ↓              ↓            ↓             ↓              ↓           ↓        ↓
  Clean UI → Requirements → Refined Specs → Components → Navigation → Validation → Project
```

Each step produces specific, actionable state that feeds into the next step, with clear UI feedback and MCP tool usage where appropriate.
