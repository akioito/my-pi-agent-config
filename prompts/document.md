---
description: Generate or update project documentation or inline docstrings
argument-hint: "<file or directory>"
---
Generate or update documentation for the target:

${@:-Identify recently modified files lacking documentation or the project README.}

Workflow:
1. **Inspect Target**:
   - Read the target files to understand purpose, inputs, outputs, errors, and existing doc style.
   - Check whether the project uses JSDoc/TSDoc, Python docstrings, Go comments, or markdown files (`docs/`, `README.md`).

2. **Apply Documentation**:
   - **For inline docs**: Use `edit` to add or update docstrings directly in the source files. Document parameters, return values, exceptions, and non-obvious behavior. Do not add noise comments for self-explanatory code.
   - **For markdown docs**: Use `write` or `edit` to create or update relevant documentation files with:
     - Overview & motivation
     - API references / signatures
     - Practical usage examples
     - Configuration and defaults

3. **Verify**:
   - Ensure documentation accurately reflects the code without stale claims or broken code snippets.
