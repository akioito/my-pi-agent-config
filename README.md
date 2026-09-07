# my-pi-agent-config

Personal configuration, prompt templates, themes, and extensions for the [Pi coding agent](https://github.com/badlogic/pi).

## Overview

This repository manages custom configurations for `~/.pi/agent`, providing:
- **Agentic Prompt Templates** (`prompts/`): Enhanced slash commands with argument hints, automatic fallback behaviors, and rigorous test/verification steps.
- **Custom Theme** (`themes/my-theme.json`): Clean, accessible TUI theme with distinct thinking-level indicators and syntax highlighting.
- **Clean Structure**: Tracked templates and themes separated from runtime caches, session histories, and credentials via `.gitignore`.

---

## Directory Structure

```text
~/.pi/agent/
├── prompts/                              # Slash command prompt templates
│   ├── README.md                         # Detailed guide & argument hint documentation
│   ├── code-review.md                    # /code-review: Systematic code review & diff analysis
│   ├── commit-message-in-japanese.md     # /commit-message-in-japanese: Japanese Conventional Commit generator
│   ├── explain-code.md                   # /explain-code: Architecture & code walkthrough
│   ├── fix-bug.md                        # /fix-bug: Reproduce, isolate, edit, verify bug fix
│   ├── generate-documentation.md         # /generate-documentation: Inline & Markdown docs generator
│   ├── generate-pr-description.md        # /generate-pr-description: PR title & description generator
│   ├── generate-tests.md                 # /generate-tests: Test generation & verification
│   ├── optimize-performance.md           # /optimize-performance: Profile & optimize performance
│   ├── refactor-code.md                  # /refactor-code: Safe refactoring with test verification
│   └── security-audit.md                 # /security-audit: Threat modeling & security audits
├── themes/
│   └── my-theme.json                     # Custom TUI theme
├── git/                                  # Git-related configuration
├── npm/                                  # Package-related configuration
├── .gitignore                            # Ignores sessions, auth, caches, and local stores
└── README.md                             # Repository documentation
```

---

## Prompt Commands Overview

All prompt templates in `prompts/` are configured with `argument-hint` frontmatter for autocomplete guidance in the Pi editor.

### Notation Convention
- `<required>`: Argument needed to target a specific entity (falls back to workspace diagnostics if omitted).
- `[optional]`: Defaults to smart context (e.g. current git diff, uncommitted changes, or main branch).

### Command List

| Command | Argument Hint | Description |
| :--- | :--- | :--- |
| `/commit-message-in-japanese` | `[context or instructions]` | Inspect staged/unstaged git diff and generate a Conventional Commit message in Japanese. |
| `/generate-documentation` | `<file or directory>` | Generate or update inline docstrings (JSDoc, Python docstrings) or project Markdown documentation. |
| `/explain-code` | `<file, symbol, or concept>` | Deep-dive architectural walkthrough and design rationale for files, symbols, or concepts. |
| `/fix-bug` | `<error message, failing test, or issue>` | Reproduce bug via `bash`, isolate root cause, apply minimal fix, and verify with tests. |
| `/optimize-performance` | `<file, function, or issue>` | Profile bottlenecks, optimize algorithmic/IO/memory complexity, and verify with tests/benchmarks. |
| `/generate-pr-description` | `[base-branch]` | Auto-detect base branch (`main`/`master`), inspect commits & diffs, and generate structured PR description. |
| `/refactor-code` | `<file, function, or directory>` | Safe code refactoring with pre/post test verification to ensure zero behavioral regression. |
| `/code-review` | `[file, branch, or commit]` | Systematic multi-perspective code review (bugs, security, performance, maintainability) with severity tags. |
| `/security-audit` | `[file, directory, or dependency]` | Threat-modeled security audit covering injection, auth, secret exposure, and dependencies. |
| `/generate-tests` | `<file or function>` | Detect project test framework, generate comprehensive test suites, and execute until all pass. |

> 📖 See [prompts/README.md](prompts/README.md) for detailed usage examples, argument quoting rules, and instructions on creating new templates.

---

## Themes

The repository includes a custom theme: `themes/my-theme.json`.

- **Highlights**:
  - Distinct background colors for tool execution states (`toolPendingBg`, `toolSuccessBg`, `toolErrorBg`).
  - Dedicated thinking-level indicators (`thinkingMinimal`, `thinkingLow`, `thinkingMedium`, `thinkingHigh`, `thinkingXhigh`).
  - VS Code-like syntax token palette for clear markdown code block rendering.
- **Activation**: Set `"theme": "my-theme"` in `settings.json`.

---

## Installation & Setup

Clone or link this repository to your Pi configuration directory:

```bash
# Clone directly into ~/.pi/agent
git clone <repository-url> ~/.pi/agent

# Or symlink specific folders
ln -s /path/to/my-pi-agent-config/prompts ~/.pi/agent/prompts
ln -s /path/to/my-pi-agent-config/themes ~/.pi/agent/themes
```
