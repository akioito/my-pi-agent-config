---
description: Generate a comprehensive pull request title and description from git changes
argument-hint: "[base-branch]"
---
Generate a pull request title and description based on the branch changes.

1. **Inspect Changes via `bash`**:
   - Determine the base branch: use "${1}" if provided, otherwise detect via `git rev-parse --verify main 2>/dev/null && echo main || echo master`.
   - Find the merge base: `BASE_SHA=$(git merge-base HEAD ${1:-main})` (fallback to master if main doesn't exist).
   - Inspect commits: `git --no-pager log --oneline $BASE_SHA..HEAD`
   - Inspect diff stats and key changes: `git --no-pager diff --stat $BASE_SHA..HEAD` and read critical diffs.

2. **Generate Output**:
   - **PR Title**: Conventional Commits format (e.g., `feat(api): add webhook retry logic`).
   - **Description Body**:
     ## Summary
     Concise 2-3 sentence overview of what changed and why.

     ## Changes
     Grouped bullet points of key changes and architectural decisions.

     ## Motivation & Context
     Problem solved or feature enabled, linking any issue tickets.

     ## Testing Done
     Specific commands, automated tests, or manual scenarios verified.

     ## Checklist
     - [ ] Tests added/updated and passing
     - [ ] Documentation updated
     - [ ] No breaking changes (or migration path documented)
