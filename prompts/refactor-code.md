---
description: Refactor code to improve quality and maintainability while preserving behavior
argument-hint: "<file, function, or directory>"
---
Refactor the specified target to improve structure, readability, and maintainability without altering external behavior.

Target:
${@:-Inspect the most recently modified files or ask for a target if none is obvious.}

Workflow:
1. **Establish Baseline**:
   - Read the target code and its tests.
   - Run existing tests via `bash` to ensure a green baseline before making changes.

2. **Refactor**:
   - Apply targeted improvements directly using `edit`:
     - Reduce complexity and nesting.
     - Eliminate duplication (DRY without premature abstraction).
     - Improve naming and cohesion (Single Responsibility Principle).
     - Modernize idioms to match the rest of the codebase.

3. **Preserve Behavior & Verify**:
   - Do NOT change public API contracts or functional behavior unless explicitly requested.
   - Run the test suite and linter via `bash` to verify zero regressions.
   - Briefly summarize each structural change made and the verification results.
