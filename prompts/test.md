---
description: Generate and verify tests for specified code
argument-hint: "<file or function>"
---
Write comprehensive, reliable tests for the specified target.

Target:
${@:-Identify untested or under-tested recently changed files in the project.}

Requirements:
1. **Detect Project Conventions**:
   - Identify the test framework and runner used in the project (e.g., Vitest, Jest, pytest, Go test, cargo test).
   - Match existing test file structure, naming conventions (e.g., `*.test.ts`, `*_test.go`), and assertion styles.

2. **Coverage Scope**:
   - Happy paths and primary workflows.
   - Edge cases: boundary values, empty inputs, null/undefined, large payloads.
   - Error cases: expected exceptions, network/IO failures, invalid arguments.
   - Avoid trivial tests or over-mocking internal implementation details. Test behaviors, not private variables.

3. **Implement & Run**:
   - Write or update test files using `write` or `edit`.
   - **Execute the newly created tests via `bash`**.
   - If any test fails, diagnose whether the test or the source code is wrong, adjust, and re-run until all tests pass.
