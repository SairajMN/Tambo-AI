# Generative UI Component Registry for Tambo

## Component Specifications

### 1. PageCanvas

**Purpose**: Interactive preview surface for generated page layouts and components.

**Props Schema**:

```typescript
interface PageCanvasProps {
  components: ComponentSpec[];
  layout: LayoutConfig;
  theme?: ThemeConfig;
  interactions?: InteractionConfig[];
}
```

**Streamed vs Static Props**:

- **Streamed**: `components`, `layout` (updated as agent generates content)
- **Static**: `theme`, `interactions` (user-defined preferences)

**Agent vs User Control**:

- **Agent decides**: Component placement, sizing, basic styling
- **User controls**: Theme colors, interaction patterns, layout preferences

**Failure States**:

- Empty components array (show placeholder canvas)
- Invalid layout configuration (fallback to default grid)
- Component rendering errors (display error boundary with retry option)

---

### 2. FlowEditor

**Purpose**: Visual workflow builder for connecting pages and defining navigation flows.

**Props Schema**:

```typescript
interface FlowEditorProps {
  pages: PageSpec[];
  connections: ConnectionSpec[];
  startPage?: string;
  protectedRoutes?: string[];
}
```

**Streamed vs Static Props**:

- **Streamed**: `pages`, `connections` (updated as agent designs architecture)
- **Static**: `startPage`, `protectedRoutes` (user-defined routing rules)

**Agent vs User Control**:

- **Agent decides**: Page connections, flow optimization, route structure
- **User controls**: Start page selection, protected route designation

**Failure States**:

- Circular navigation loops (highlight and suggest fixes)
- Orphaned pages (visual indicators for disconnected pages)
- Missing start page (prompt user to select one)

---

### 3. AuthWidget

**Purpose**: Authentication configuration interface for setting up user login systems.

**Props Schema**:

```typescript
interface AuthWidgetProps {
  authType: "none" | "email" | "oauth" | "custom";
  providers?: AuthProvider[];
  fields?: AuthField[];
  validationRules?: ValidationRule[];
}
```

**Streamed vs Static Props**:

- **Streamed**: `authType`, `providers` (updated based on agent recommendations)
- **Static**: `fields`, `validationRules` (user-defined security requirements)

**Agent vs User Control**:

- **Agent decides**: Provider selection based on app type, default field structure
- **User controls**: Specific validation rules, custom field requirements

**Failure States**:

- Invalid provider configuration (show setup instructions)
- Missing required fields (highlight incomplete setup)
- Conflicting validation rules (display conflict resolution options)

---

### 4. APITest

**Purpose**: Interactive API endpoint testing and documentation viewer.

**Props Schema**:

```typescript
interface APITestProps {
  endpoints: EndpointSpec[];
  activeEndpoint?: string;
  testParams?: Record<string, any>;
  response?: APIResponse;
}
```

**Streamed vs Static Props**:

- **Streamed**: `endpoints`, `response` (updated as agent generates API specs)
- **Static**: `activeEndpoint`, `testParams` (user-selected testing parameters)

**Agent vs User Control**:

- **Agent decides**: Endpoint structure, default parameters, response format
- **User controls**: Test parameters, active endpoint selection

**Failure States**:

- Invalid endpoint configuration (show error details)
- Network timeout (display retry mechanism)
- Invalid response format (show raw response with parsing error)

---

### 5. DeployStatus

**Purpose**: Real-time deployment progress and status monitoring.

**Props Schema**:

```typescript
interface DeployStatusProps {
  status: "pending" | "building" | "deploying" | "success" | "error";
  progress?: number;
  logs?: DeployLog[];
  deploymentUrl?: string;
  estimatedTime?: string;
}
```

**Streamed vs Static Props**:

- Streamed: `status`, `progress`, `logs` (updated in real-time during deployment)
- Static: `deploymentUrl`, `estimatedTime` (calculated values)

**Agent vs User Control**:

- **Agent decides**: Deployment configuration, build optimization
- **User controls**: Deployment trigger, environment selection

**Failure States**:

- Build failures (display error logs with suggestions)
- Deployment timeout (show retry options)
- Invalid deployment configuration (highlight configuration issues)

---

## Cross-Component Constraints

### Serialization Requirements

- All props must be JSON-serializable
- Complex objects (functions, classes) must be converted to string representations
- Event handlers must be referenced by string keys, not function objects

### Partial Props Handling

- Components must render with minimal required props
- Missing optional props should use sensible defaults
- Error states must be gracefully handled with fallback UI

### Performance Considerations

- Props updates should be debounced for streamed data
- Component re-renders minimized through memoization
- Large data arrays (logs, endpoints) should be virtualized

### Error Recovery

- Each component must have a "safe mode" for partial data
- User actions should be preserved during error states
- Agent can push recovery instructions through props updates
