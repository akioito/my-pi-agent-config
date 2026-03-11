---
name: code-review
description: Conducts thorough source code reviews and quality assessments. Use when reviewing code before commits, checking code quality, analyzing implementations, looking for potential issues, or assessing security, performance, and design patterns.
---

# Code Review Skill

Conducts thorough source code reviews and quality assessments across multiple dimensions: functionality, security, performance, design, and coding standards.

## Workflow

### Phase 1: Retrieve Change Diff and Assess Scope

If a Git repository exists, **ALWAYS start by** obtaining the change diff using the following command to clearly identify review targets:

```bash
git --no-pager diff main...HEAD
```

- If `main` branch doesn't exist, try `master` or `origin/HEAD`
- When diff is obtained, use changed files and content as the review starting point
- If diff is empty, also check working tree changes: `git --no-pager diff HEAD`
- Include new files: `git --no-pager diff --stat main...HEAD`

Based on the diff information, identify files/functions needing review and assess complexity and criticality. Read related documentation to understand system architecture and dependencies.

### Phase 2: Systematic Review
Review from these perspectives (see `docs/review-checklist.md` for detailed checklists):

| Category | Focus | Severity |
|----------|-------|----------|
| Functionality & Correctness | Logic, edge cases, error handling | Critical |
| Security | Input validation, injection, auth | Critical |
| Performance | Bottlenecks, algorithms, memory | Major |
| Code Quality & Maintainability | Naming, structure, comments | Minor |
| Design & Architecture | Patterns, separation of concerns | Major |
| Coding Standards | Formatting, conventions, dead code | Minor |

### Phase 3: Cross-File Consistency
- Compare similar functions across files
- Check consistent error handling, logging, and configuration patterns
- Verify consistent data transformation and validation approaches

### Phase 4: Language-Specific Review
Apply language-specific best practices (Python/PEP8, JS/TS/ESLint, SQL optimization, etc.)

## Reporting Format

### Issue Classification
- **Critical**: Security vulnerabilities, data corruption risks, system stability issues
- **Major**: Design pattern violations, poor error handling, maintainability concerns
- **Minor**: Style inconsistencies, minor optimizations, documentation improvements

### Output Structure
1. **Change Diff Summary** (when Git exists): List of changed files, overview of changes
2. **Executive Summary**: Overall quality, issue count/severity, approval recommendation
3. **Detailed Findings**: File/line references, problem explanation, suggested fixes
4. **Positive Observations**: Well-implemented features, good practices
5. **Actionable Recommendations**: Prioritized improvement list

