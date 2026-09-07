---
description: Review code or git diff for bugs, security, and quality
argument-hint: "[file, branch, or commit]"
---
Perform a thorough code review.

1. **Target Identification**:
   - If an argument is provided (`${@}`), inspect that specific target (file, directory, branch, or commit).
   - If no argument is provided, inspect working changes: run `git status -s` followed by `git --no-pager diff HEAD`.
   - If the working tree is clean, inspect changes on the current branch against the default branch:
     `git --no-pager diff $(git merge-base HEAD main 2>/dev/null || git merge-base HEAD master 2>/dev/null || echo HEAD~1)...HEAD`

2. **Review Perspectives**:
   - **Bugs & Edge Cases**: Off-by-one errors, null/undefined dereferences, unhandled promise rejections, race conditions.
   - **Security**: Injection risks (SQL, command, path traversal), broken auth/authz, secret exposure, insecure deserialization.
   - **Design & Performance**: N+1 queries, unnecessary resource allocations, leaky listeners/timers, maintainability issues.

3. **Output Format**:
   - For every issue found:
     - **Severity**: 🔴 Critical | 🟡 Warning | 🔵 Info
     - **Location**: `path/to/file:line`
     - **Problem**: Clear explanation of the defect and potential failure mode.
     - **Recommendation**: Exact suggested fix or code snippet.
   - Conclude with a brief summary: total issues by severity and a clear pass/fail recommendation.
