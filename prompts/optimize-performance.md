---
description: Profile, optimize performance, and verify with benchmarks
argument-hint: "<file, function, or performance issue>"
---
Optimize performance for the following target:

${@:-Identify performance bottlenecks in the current workspace or profile recent changes.}

Approach:
1. **Analyze & Measure**:
   - Inspect the code to identify the actual algorithmic, memory, or I/O bottleneck.
   - Where feasible, run existing benchmarks or measure execution time before changes using `bash`.
   - Distinguish real hotspots from premature micro-optimizations.

2. **Optimize**:
   - Address the root inefficiency:
     - **Algorithmic**: Improve time/space complexity (e.g. O(n²) to O(n)), use appropriate data structures.
     - **I/O & Network**: Batch requests, avoid redundant disk/database roundtrips, stream large data.
     - **Memory**: Reduce unnecessary allocations, avoid memory leaks, reuse buffers.
     - **Caching**: Memoize expensive deterministic computations where appropriate.
   - Use `edit` to apply changes directly to the target file.

3. **Verify**:
   - Run the test suite via `bash` to prove functional behavior has not broken.
   - Measure or demonstrate the performance improvement.
