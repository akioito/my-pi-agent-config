---
description: Diagnose and fix a bug with verification
argument-hint: "<error message, failing test, or issue description>"
---
Diagnose and fix the issue described below.

Issue description:
${@:-Diagnose and fix any failing tests or runtime errors in the current workspace.}

Follow this strict protocol:
1. **Reproduce**:
   - Locate the relevant code and test files.
   - Run the failing test or reproduce the error via `bash` (e.g. run test suite, build, or reproduction command).
   - Confirm the failure and capture the exact error output.

2. **Root Cause Analysis**:
   - Investigate the underlying cause. Do not just patch symptoms or suppress errors.

3. **Apply Fix**:
   - Use `edit` to make the minimal necessary changes.
   - Preserve existing code style, patterns, and conventions.

4. **Verify**:
   - Re-run the reproduction command and the project test suite via `bash`.
   - Confirm that the fix resolves the issue and introduces no regressions.
   - Only declare the task complete after verification passes.
