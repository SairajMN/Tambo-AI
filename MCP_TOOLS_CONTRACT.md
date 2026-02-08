## MCP Tools Contract Specification

Overview

This document defines the contract specifications for the four MCP (Model Context Protocol) tools required for the Agentic Product Composer MVP. These tools provide essential functionality while maintaining security, determinism, and local-first principles.

## Tool 1: mcp/auth

### Purpose

Provides authentication and authorization capabilities for the application without storing secrets or requiring external services.

### Input Schema

**Input Parameters**:

- action: Authentication action (login, logout, validate, get_session)
- credentials: User credentials object with username (3-50 chars) and password (1-100 chars)
- sessionId: Session identifier for validation operations

### Output Schema

**Output Parameters**:

- success: Boolean indicating operation success
- sessionId: Session identifier (for login operations)
- user: User object with username and role (admin/user/guest)
- message: Human-readable result message
- error: Error details if operation failed

### Side Effects

- Creates temporary session in memory (no persistent storage)
- Clears session data on logout
- No file system modifications
- No network requests

### Security Constraints

- No password storage or hashing
- Sessions expire after 30 minutes of inactivity
- All credentials validated against predefined test users only
- No sensitive data logged or persisted
- Cross-origin request blocking

---

## Tool 2: mcp/database

### Purpose

Provides local, in-memory database operations for storing application state and generated components during the session.

### Input Schema

**Input Parameters**:

- operation: Database operation (create, read, update, delete, query, clear)
- collection: Database collection (components, sessions, projects, cache)
- data: Data to insert or update
- query: Query parameters for read operations
- id: Document identifier

### Output Schema

**Output Parameters**:

- success: Boolean indicating operation success
- data: Retrieved data or operation result (array, object, or null)
- count: Number of affected records
- message: Operation result message
- error: Error details if operation failed

### Side Effects

- Stores data in memory only (no persistent storage)
- Data cleared on application restart
- No file system modifications
- No external database connections

### Security Constraints

- No SQL injection vulnerabilities (in-memory operations only)
- Data validation for all input fields
- Collection access controlled by predefined enums
- No sensitive data persistence
- Memory usage monitoring and limits

---

## Tool 3: mcp/filesystem

### Purpose

Provides file system operations for creating, reading, and managing project files and directories.

### Input Schema

**Input Parameters**:

- operation: File system operation (create, read, update, delete, list, mkdir)
- path: File or directory path relative to project root
- content: File content (for create/update operations)
- recursive: Whether to create parent directories recursively (default: false)

### Output Schema

**Output Parameters**:

- success: Boolean indicating operation success
- path: Resolved file path
- content: File content (for read operations)
- files: Directory listing with name, type (file/directory), and size
- message: Operation result message
- error: Error details if operation failed

### Side Effects

- Creates/modifies files in project directory only
- Directory creation with optional recursive flag
- File content updates with full replacement
- No system-wide file system access

### Security Constraints

- Path validation to prevent directory traversal
- File operations restricted to project directory
- Content validation for file types
- No executable file creation
- File size limits (max 10MB per file)
- Read-only access to system files

---

## Tool 4: mcp/runner

### Purpose

Executes commands and scripts in a controlled environment for testing and development.

### Input Schema

**Input Parameters**:

- command: Command to execute
- args: Command arguments array
- timeout: Command timeout in milliseconds (1000-300000, default: 60000)
- env: Environment variables object
- workingDir: Working directory for command execution

### Output Schema

**Output Parameters**:

- success: Boolean indicating command completion success
- exitCode: Command exit code
- stdout: Standard output
- stderr: Standard error output
- duration: Execution time in milliseconds
- message: Execution result message
- error: Error details if execution failed

### Side Effects

- Command execution in isolated environment
- Output capture and logging
- Process termination on timeout
- No persistent system changes

### Security Constraints

- Command whitelist for allowed operations
- No system administration commands
- Resource limits (CPU, memory, time)
- Sandboxed execution environment
- No network access for commands
- Input validation and sanitization

---

## Common Constraints

### Test Mode Only

- All tools operate in test/demo mode
- No production data handling
- Mock responses for external dependencies
- Deterministic outputs for testing

### Deterministic Outputs

- Same inputs produce same outputs
- No random or time-dependent behavior
- Predictable error messages
- Consistent response formats

### Local-First Design

- No external service dependencies
- All operations performed locally
- Offline capability maintained
- Minimal network usage

### Security Principles

- No secret storage or transmission
- Input validation and sanitization
- Access control and permissions
- Audit logging for security events
- Data minimization and privacy
