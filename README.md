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
├── prompts/              # Slash command prompt templates
│   ├── README.md         # Detailed guide & argument hint documentation
│   ├── commit.md         # /commit: Japanese Conventional Commit generator
│   ├── document.md       # /document: Inline & Markdown docs generator
│   ├── explain.md        # /explain: Architecture & code walkthrough
│   ├── fix.md            # /fix: Reproduce, isolate, edit, verify bug fix
│   ├── optimize.md       # /optimize: Profile & optimize performance
│   ├── pr.md             # /pr: PR title & description generator
│   ├── refactor.md       # /refactor: Safe refactoring with test verification
│   ├── review.md         # /review: Systematic code review & diff analysis
│   ├── security.md       # /security: Threat modeling & security audits
│   └── test.md           # /test: Test generation & verification
├── themes/
│   └── my-theme.json     # Custom TUI theme
├── git/                  # Git-related configuration
├── npm/                  # Package-related configuration
├── .gitignore            # Ignores sessions, auth, caches, and local stores
└── README.md             # Repository documentation
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
| `/commit` | `[context or instructions]` | Inspect staged/unstaged git diff and generate a Conventional Commit message in Japanese. |
| `/document` | `<file or directory>` | Generate or update inline docstrings (JSDoc, Python docstrings) or project Markdown documentation. |
| `/explain` | `<file, symbol, or concept>` | Deep-dive architectural walkthrough and design rationale for files, symbols, or concepts. |
| `/fix` | `<error message, failing test, or issue>` | Reproduce bug via `bash`, isolate root cause, apply minimal fix, and verify with tests. |
| `/optimize` | `<file, function, or issue>` | Profile bottlenecks, optimize algorithmic/IO/memory complexity, and verify with tests/benchmarks. |
| `/pr` | `[base-branch]` | Auto-detect base branch (`main`/`master`), inspect commits & diffs, and generate structured PR description. |
| `/refactor` | `<file, function, or directory>` | Safe code refactoring with pre/post test verification to ensure zero behavioral regression. |
| `/review` | `[file, branch, or commit]` | Systematic multi-perspective code review (bugs, security, performance, maintainability) with severity tags. |
| `/security` | `[file, directory, or dependency]` | Threat-modeled security audit covering injection, auth, secret exposure, and dependencies. |
| `/test` | `<file or function>` | Detect project test framework, generate comprehensive test suites, and execute until all pass. |

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
