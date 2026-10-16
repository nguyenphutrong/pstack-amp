---
name: how
description: "Explains runtime flow, ownership, and subsystem architecture from inspected code. Use for /pstack:how, code walkthroughs, or grounding a change. Use pstack:why for historical intent."
license: MIT
---

# How

Read [Amp execution rules](../poteto-mode/references/amp-runtime.md).

1. Pin the question and affected behavior. State a reasonable interpretation when scope is vague.
2. For a narrow question, inspect the owning code and callers directly. Use exact searches for known symbols. No explainer handoff is needed.
3. For a cross-file ownership question, use Finder for local discovery and read the decisive code. Use Librarian for authoritative external repositories. If two to four genuinely independent angles warrant parallel bounded exploration, brief Task workers with [explorer-prompt.md](references/explorer-prompt.md), scoped paths, and read-only constraints. Do not duplicate assigned reading.
4. Trace entry point, transformations, state ownership, side effects, and exit conditions. Cite paths and line ranges. Check runtime facts when the answer depends on actual behavior, not merely a static call graph.
5. Synthesize the evidence yourself using [explainer-prompt.md](references/explainer-prompt.md). Do not pass through a worker's report as proof.

Return a mental model with overview, key concepts, flow, relevant files, and sharp edges where useful. Prefer a small square-corner diagram to a dump of annotated code. Do not invent rationale from the code's shape.
