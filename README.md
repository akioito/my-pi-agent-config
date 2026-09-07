# my-pi-agent-config

Personal configuration, extensions, themes, and prompt templates for the [Pi coding agent](https://github.com/badlogic/pi).

## Directory Structure

- `prompts/` — Agentic prompt templates with argument hints. See [prompts/README.md](prompts/README.md) for full usage instructions.
- `extensions/` — Custom Pi extensions.
- `themes/` — Custom TUI themes.
- `settings.json` — Global Pi agent settings.

## Prompt Commands Overview

| Command | Argument Hint | Description |
| :--- | :--- | :--- |
| `/commit` | `[context or instructions]` | Generate conventional commit message in Japanese from git diff |
| `/document` | `<file or directory>` | Generate inline docstrings or markdown documentation |
| `/explain` | `<file, symbol, or concept>` | Deep-dive code walkthrough and architectural explanation |
| `/fix` | `<error message, failing test, or issue>` | Reproduce, isolate root cause, minimal edit, and verify via tests |
| `/optimize` | `<file, function, or issue>` | Profile bottlenecks, optimize code, and verify with tests/benchmarks |
| `/pr` | `[base-branch]` | Inspect branch changes and generate PR title and description |
| `/refactor` | `<file, function, or directory>` | Safe refactoring with pre/post test verification |
| `/review` | `[file, branch, or commit]` | Thorough code review with severity levels and suggested diffs |
| `/security` | `[file, directory, or dependency]` | Security audit with threat modeling and dependency audits |
| `/test` | `<file or function>` | Detect test framework, generate tests, and execute until passing |

See [prompts/README.md](prompts/README.md) for detailed examples and guidelines.
