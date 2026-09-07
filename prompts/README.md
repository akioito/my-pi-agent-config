---
description: Guide and reference for using prompt templates with argument hints
argument-hint: "[command-name]"
---
# Pi Prompt Templates Guide: Using Commands with Argument Hints

This directory contains prompt templates for [Pi coding agent](https://github.com/badlogic/pi). Prompt templates expand slash commands typed into the editor into structured, agentic instructions.

---

## Quick Start

1. Type `/` in the Pi prompt editor.
2. The autocomplete popup displays all available commands along with their **argument hints** and descriptions.
3. Select or type a command name (e.g. `/fix`), press `Space` or `Tab`, and supply the requested arguments.

```
/fix "TypeError: cannot read properties of undefined (reading 'token')"
```

---

## How Argument Hints Work

Pi supports the `argument-hint` field in template frontmatter. It appears in the autocomplete dropdown between the command name and the description to tell you what inputs the command expects:

```
→ fix       <error message, failing test, or issue description> — Diagnose and fix a bug with verification
  commit    [context or instructions]                           — Generate a concise conventional git commit message in Japanese
  review    [file, branch, or commit]                           — Review code or git diff for bugs, security, and quality
```

### Notation Convention
- **`<angle brackets>`**: **Required** argument. The command needs this context to act effectively (e.g., `<file or function>`).
- **`[square brackets]`**: **Optional** argument. If omitted, the template automatically falls back to sensible defaults (e.g. checking git diff, staged changes, or workspace status).

### Argument Quoting Rules
Pi parses template arguments using shell-style quoting:
- **Single word**: `/review src/index.ts` (passed as `$1` and `$@`)
- **Multiple words with spaces**: Wrap in quotes:
  ```bash
  /fix "TypeError: user.profile is null at line 42"
  ```
- **Multiple positional arguments**:
  ```bash
  /test src/services/auth.ts "verify JWT refresh token expiration"
  ```

---

## Complete Command Reference

| Command | Argument Hint | Type | Default Behavior (when omitted) |
| :--- | :--- | :--- | :--- |
| `/commit` | `[context or instructions]` | Optional | Inspects `git diff --cached` (or `git diff`) and generates Conventional Commit in Japanese. |
| `/document` | `<file or directory>` | Required | Identifies recently modified undocumented files or project README. |
| `/explain` | `<file, symbol, or concept>` | Required | Explains architecture and main entry points of current workspace. |
| `/fix` | `<error message, failing test, or issue description>` | Required | Diagnoses failing tests or runtime errors found in workspace. |
| `/optimize` | `<file, function, or performance issue>` | Required | Profiles recent changes or workspace bottlenecks. |
| `/pr` | `[base-branch]` | Optional | Detects default base branch (`main` or `master`) and merge base. |
| `/refactor` | `<file, function, or directory>` | Required | Prompts for target or inspects recently modified files. |
| `/review` | `[file, branch, or commit]` | Optional | Inspects working changes (`git status` / `git diff HEAD`), then branch divergence. |
| `/security` | `[file, directory, or dependency]` | Optional | Audits current workspace and recent modifications. |
| `/test` | `<file or function>` | Required | Identifies untested recently changed files. |

---

## Detailed Usage Examples

### 1. `/commit` — Conventional Git Commit Message
```bash
# Basic: Automatically reads staged or unstaged git diff
/commit

# With instructions / ticket reference:
/commit "JIRA-1234: mention the breaking schema change"
```

### 2. `/review` — Code Review
```bash
# Review uncommitted working tree changes:
/review

# Review a specific file:
/review src/server/auth.ts

# Review a branch or commit:
/review feature/oauth-login
/review HEAD~3..HEAD
```

### 3. `/fix` — Bug Diagnosis & Verification
```bash
# Pass an exact runtime error:
/fix "Error: listen EADDRINUSE: address already in use :::3000"

# Pass a failing test scenario:
/fix "auth.test.ts: token expiration test fails on leap year dates"
```

### 4. `/test` — Test Generation & Verification
```bash
# Generate tests for a specific file:
/test src/utils/formatters.ts

# Target a specific function:
/test "src/auth/jwt.ts: verify validateToken function"
```

### 5. `/refactor` — Safe Refactoring with Verification
```bash
# Refactor a messy module:
/refactor src/controllers/orderController.ts

# Target a specific method:
/refactor "processPayment method in PaymentService.ts"
```

### 6. `/explain` — Deep-Dive Code Walkthrough
```bash
# Explain a file:
/explain src/middleware/rate-limiter.ts

# Explain a complex pattern or concept in the codebase:
/explain "how the session compaction algorithm works in this repo"
```

### 7. `/document` — Inline Comments or Markdown Docs
```bash
# Add JSDoc/docstrings to a file:
/document src/api/routes.ts

# Update documentation for a module or folder:
/document docs/api/
```

### 8. `/optimize` — Performance Profiling & Optimization
```bash
# Target an expensive function or query:
/optimize "getUsersWithPosts query in UserRepository.ts"

# General optimization request for a file:
/optimize src/parser/stream-tokenizer.ts
```

### 9. `/pr` — Pull Request Description
```bash
# Target default branch (main/master auto-detected):
/pr

# Explicitly target a different base branch:
/pr develop
/pr release/v2.0
```

### 10. `/security` — Threat Modeling & Security Audit
```bash
# Audit working tree changes:
/security

# Audit a sensitive module:
/security src/auth/jwt.ts

# Audit dependencies:
/security package.json
```

---

## How to Create New Templates with Argument Hints

Create a `.md` file in `~/.pi/agent/prompts/` (e.g., `benchmark.md` becomes `/benchmark`):

```markdown
---
description: Run benchmark on target function and report timings
argument-hint: "<function_or_file> [iterations]"
---
Benchmark the following target:
Target: $1
Iterations: ${2:-1000}

Follow these steps:
1. Locate the target code.
2. Write a minimal benchmark harness.
3. Run via `bash` and report execution times before and after optimizations.
```

- `$1`, `$2`, ...: Positional arguments
- `$@` or `$ARGUMENTS`: All arguments joined
- `${1:-default}`: Fallback default if argument is omitted
