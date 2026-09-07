---
description: Generate a concise conventional git commit message in Japanese
argument-hint: "[context or instructions]"
---
Inspect the changes to be committed:
1. First, check staged changes: `git --no-pager diff --cached`
2. If nothing is staged, check unstaged changes: `git --no-pager diff` and note that changes are not yet staged.
3. Check `git status -s` for an overview of touched, added, or untracked files.

Generate a commit message following the Conventional Commits specification:
- Format: `<type>(<optional scope>): <subject>` (e.g., `feat(auth): ログイン機能を追加`)
- Subject in Japanese: concise, imperative mood, under 50 characters, no trailing period.
- Body (if change is complex): bullet points in Japanese explaining *why* and *what changed*, not mechanical line-by-line repeats.
- If extra context is provided below, incorporate it:

${@:-No additional context provided.}
