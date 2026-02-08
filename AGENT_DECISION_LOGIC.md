## Agent Decision-Making Logic

1. Agent State Shape

**State Structure**:

- **sessionId**: Unique identifier for the conversation
- **conversationPhase**: Current phase (requirements|clarification|generation|preview|complete)
- **userInput**: Latest user input text
- **requirements**: Extracted app requirements
  - appType: task-manager|e-commerce|dashboard|blog|custom
  - complexity: simple|medium|complex
  - features: Array of feature strings
  - architecture: single-page|multi-page
- **clarification**: Question/answer tracking
  - pendingQuestions: Questions awaiting user response
  - resolvedQuestions: Completed clarifications
- **specification**: Generated technical specs
  - pages: Page definitions with components
  - components: Component specifications
  - dependencies: Required packages
- **generation**: Component generation progress
  - completedComponents: Finished components
  - pendingComponents: Remaining components
  - currentComponent: Component being generated
  - generationStep: Current generation step
- **preview**: Preview and validation state
  - activeComponent: Currently previewed component
  - validationErrors: Component validation issues
  - userFeedback: User approval status
- **errorState**: Error handling state
  - hasError: Boolean error flag
  - errorCode: Error type identifier
  - errorMessage: Error description
  - recoveryOptions: Available recovery actions
- **lastAction**: Last agent action details
  - type: Action type
  - timestamp: Action timestamp
  - details: Action description

## 2. Decision Rules (If/Then)

### Phase Transition Rules

**Phase Transition Rules**:

- Requirements Phase: Extract requirements when input > 10 chars, transition to clarification when appType and complexity identified
- Clarification Phase: Transition to generation when no pending questions, resolve questions as user responds
- Generation Phase: Transition to preview when no pending components, set current component and generation step as needed
- Preview Phase: Transition to complete when no validation errors and user feedback includes "complete"

### Component Selection Rules

**Selection Priority**:

1. Dependencies first: Resolve missing dependencies before proceeding
2. Core components before decorative: Generate NavBar, Footer, Layout before specific features
3. User-specified components: Prioritize components explicitly requested by user
4. Random selection: Choose from remaining components if no other criteria apply

### Error Recovery Rules

**Error Handling**:

- Invalid specification: Set error state to SPEC_INVALID with recovery options
- Missing dependency: Set error state to MISSING_DEP with dependency generation options
- Transition to error-recovery phase for manual intervention

## 3. Clarification Strategy (UI-Based)

### Question Types and UI Components

**Question Types**:

- App Type: Radio group with Task Manager, E-commerce, Dashboard, Blog, Custom options
- Architecture: Toggle group for Single Page vs Multi Page
- Authentication: Dropdown with No Auth, Email/Password, OAuth options
- Data Persistence: Checkbox group for Local Storage, Mock API, Real API

### UI-Based Clarification Flow

**Flow Process**:

1. Render appropriate UI component based on question type (radio group, toggle, dropdown, checkbox)
2. Wait for user interaction through UI controls, not text input
3. Update state with user selection when choice is made
4. Remove question from pending list and add to resolved list
5. Trigger next decision cycle to continue processing

## 4. Error Recovery Strategy

### Error Types and Recovery

**Error Recovery Strategies**:

- SPEC_INVALID: Rollback to last valid spec, regenerate with simpler rules, or manual correction
- MISSING_DEP: Generate missing dependency, mock dependency interface, or simplify component logic
- GENERATION_TIMEOUT: Retry generation, generate simplified version, or skip and continue
- VALIDATION_FAILED: Show validation errors, suggest corrections, or regenerate with fixes

**Recovery Process**:

1. Show recovery options in UI based on error type
2. Wait for user to select recovery action
3. Execute selected recovery strategy

### Automatic Recovery Rules

**Auto-Recovery Conditions**:

- Missing dependency: Automatically generate missing component
- Auto-fixable validation errors: Apply automatic fixes
- Generation timeout (under 3 retries): Retry with simplified parameters
- Manual intervention required for other error types

## 5. When Agent Must STOP and Wait

### Stop Conditions

**When Agent Must STOP**:

1. Clarification required: Pending questions exist, wait for user selection
2. Error recovery needed: Error state exists and is not auto-recoverable
3. Preview validation: In preview phase with validation errors present
4. User explicitly requested stop: User input contains "stop" or "wait"
5. Generation complete: All components generated successfully

### Wait States and User Prompts

**Wait State Handling**:

- Clarification required: Show clarification UI with next pending question
- Error recovery required: Display recovery options for user selection
- Validation required: Show preview with validation errors for review
- User requested stop: Display paused state interface
- Generation complete: Show completion summary and export options

**Agent State**: Set to "waiting-for-user" during all wait conditions

## 6. State Transition Diagram

```
Requirements → Clarification → Generation → Preview → Complete
     ↑            ↓              ↓         ↓        ↓
     ←←←←← Error Recovery ←←←←←←←←←←←←←←←←←←←←←←←←←←←←
```

## 7. Optimization for Free/Local LLM Reliability

### State Persistence

**State Management**:

- Save state after every action to localStorage for persistence
- Restore state on restart from saved data
- Maintain conversation continuity across sessions

### Minimal Context Usage

**Context Optimization**:

- Keep only essential context in active memory (sessionId, phase, current component, generation step, error state)
- Archive full conversation history to reduce context usage
- Prioritize recent interactions over historical data

### Fallback Mechanisms

**Reliability Features**:

- Execute operations with fallback alternatives
- Log operation failures and attempt simplified alternatives
- Graceful degradation when primary operations fail
- Retry mechanisms with exponential backoff for failed operations

This decision-making logic provides explicit state transitions, UI-based clarification, robust error recovery, and clear stop conditions optimized for reliable operation with free/local LLMs.
