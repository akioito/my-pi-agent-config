---
description: Explain code, architecture, or concepts from high-level to deep-dive
argument-hint: "<file, symbol, or concept>"
---
Explain the following target clearly and accurately:

${@:-Explain the architecture and main entry point of this project.}

If the target is a file or symbol in the workspace, use `read` or search tools to inspect the real implementation first.

Structure your explanation:
1. **One-Liner**: What it is and what problem it solves in one concise sentence.
2. **Architecture & Flow**: Step-by-step walkthrough of how it works and how data flows through it.
3. **Design Decisions & Trade-offs**: Why it was built this way, key trade-offs, and alternative approaches.
4. **Gotchas & Edge Cases**: Non-obvious behavior, failure modes, or common pitfalls to watch out for.

Adjust the depth to match the complexity. Be concrete with code references rather than generic high-level summaries.
