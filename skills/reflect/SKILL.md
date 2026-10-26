---
name: reflect
description: "Reviews the current Amp conversation for durable workflow lessons and proposes concrete skill changes. Use for /pstack:reflect. Shows accepted, rejected, and backlog items; never edits or files issues without approval."
license: MIT
---

# Reflect

Read [Amp execution rules](../poteto-mode/references/amp-runtime.md).

1. Use this conversation and executed tool results as the active record. For a referenced prior thread, use `read_thread`. If the available record is incomplete, supply a labeled digest and report the limitation. Do not infer tool execution from a summary.
2. Review the judgment, tooling, and divergent lenses in `references/judgment-reviewer.md`, `references/tooling-reviewer.md`, and `references/divergent-reviewer.md`. Explicit reflection requests may use parallel bounded read-only reviewers. Otherwise apply the lenses directly when independent delegation adds no value. Record actual reviewers, not fabricated model identities.
3. Synthesize with [synthesizer.md](references/synthesizer.md). Keep Accepted / Rejected / Backlog lists and concrete evidence. Findings must concern workflows actually used or a demonstrated missed trigger, not speculative new skills.
4. Prefer structural enforcement. Move proposed instructions to Backlog when a type, lint, script, or runtime check would prevent the mistake more reliably.
5. Show all lists and each proposed edit's destination, and obtain approval before changing skills or filing external issues. Load `building-skills` before edits. Update the source of truth, never a managed plugin or skill cache. For a project override of an installed skill, propose copying its complete folder to `.agents/skills/<skill>/` and edit only the approved copy; explain that its unqualified name does not replace the plugin's qualified skill automatically. Validate touched packages and reload only the relevant skills or plugin. Reflection alone does not authorize a PR or push.
6. Report approved edits, rejected proposals, unresolved backlog, and publication state. An insight is not automatically a global rule.
