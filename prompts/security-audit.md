---
description: Perform a security audit on code, dependencies, and configurations
argument-hint: "[file, directory, or dependency]"
---
Perform a security audit on the specified target:

${@:-the current workspace and recent changes}

Audit Steps:
1. **Context & Threat Model**:
   - Inspect the target code and understand its runtime environment (backend, frontend, CLI, public API, internal worker).
   - Tailor checks to realistic attack surfaces rather than generic checklists.

2. **Vulnerability Assessment**:
   - **Injection**: SQL, NoSQL, OS command, path traversal, template injection, XSS.
   - **Auth & Access Control**: Authentication bypass, broken session management, missing authorization/IDOR, privilege escalation.
   - **Data Exposure & Secrets**: Hardcoded API keys, unmasked PII in logs, insecure transmission or storage.
   - **Dependencies & Config**: Run package audit commands if applicable (`npm audit`, `pip-audit`, `cargo audit`, etc.) via `bash`. Check insecure default configs or debug flags enabled in production.

3. **Reporting Format**:
   For each verified vulnerability:
   - **Severity**: 🔴 Critical | 🟠 High | 🟡 Medium | 🔵 Low
   - **Location**: `path/to/file:line`
   - **Vulnerability**: Clear description of the vulnerability and attack vector.
   - **Proof / Scenario**: How it can be triggered or exploited.
   - **Remediation**: Exact code or configuration fix to resolve it.

If no security vulnerabilities are found, explicitly state what was reviewed and verified safe.
