---
name: poteto-mode
description: "Routes substantial engineering tasks through pstack playbooks with grounding, small changes, and real verification. Use for /pstack, multi-file changes, signatures used elsewhere, design choices, unknown-cause bugs, or performance issues."
license: MIT
---

# Main pstack workflow for Amp

Read [Amp execution rules](references/amp-runtime.md) first. They govern all nested workflows. The plugin recommends this workflow automatically for substantial engineering tasks; `/pstack` selects it explicitly. It does not replace Amp's system instructions.

## Route and execute

1. State the goal, scope, constraints, and observable definition of done. For a follow-up, retain the current task; for a new task, choose a fresh playbook.
2. Select a playbook below and read it. Copy its numbered steps verbatim into the available task tracker, or a short Markdown checklist if no task-list tool exists. Keep skipped steps with `skip: <reason>`. Do not invent a TodoWrite API.
3. Read the applicable principle leaves before using them. Name a principle only when it changed a decision; do not turn the reply into a list of slogans.
4. Execute the smallest coherent units. Verify each one before starting the next. Delegate only when the Amp execution rules justify it.
5. Inspect the final diff and real result. Report what is verified, what is unknown, and the actual delivery state. Do not silently turn a local change into a PR or merge.

Small mechanical changes need the short read, edit, check loop. They do not need an arena, a review panel, or a decision log. Use `figure-it-out` for a substantial bespoke run and Orchestrate only for a genuinely multi-session program.

## Workflow triggers

- Nontrivial changes, architecture decisions, or unknown runtime behavior or ownership: `pstack:how`. Historical intent or regressions: `pstack:why`.
- A meaningful design fork, a changed signature used elsewhere, or a change to ownership across function boundaries: `pstack:architect`. Compare at least two caller-first shapes, directly if delegation adds no value. A requested bakeoff: `pstack:arena`.
- Explicit parallel coverage: `pstack:swarm`. Explicit adversarial review: `pstack:interrogate`. Read-only reviews do not apply fixes.
- Bugs: reproduce before changing code and confirm the mechanism, not a plausible explanation. Use `pstack:tdd` when a cheap local regression check exists or the user asks for it.
- Performance claims: `pstack:benchmark-checklist` before trusting the number.
- Missing product driver: `pstack:create-verification-skill`. Existing driver upkeep: `pstack:maintain-verification-skill`.
- A race or invariant needing bounded exhaustive checking: `pstack:create-formal-verification-skill`. Resync existing models with `pstack:maintain-formal-verification-skill`; read TLA+ results with `pstack:statechart`. Do not introduce a formal model merely because the workflow exists.
- Requested thread catch-up: `pstack:ketchup`, or `pstack:ketchup-video` when a video is requested. Neither starts implementation or omits decisions to fit a word limit.
- Long, unattended, or multi-phase work: `pstack:show-me-your-work`. No timer or schedule is created merely by choosing a playbook.
- Prose: `pstack:unslop`. Docs, PR descriptions, and commit messages: `pstack:technical-writing`. Use plain language in the user's language.
- Before authorized delivery: inspect the diff for generated clutter and unsafe comment removal. `pstack:no-comments` is a scoped audit, not permission to refactor unrelated code.
- Automated review comments are claims to verify. Apply [skeptical triage](references/bugbot-triage.md), not blind obedience.

## Principles

Read the complete linked leaf before applying it. Preserve behavior and safety boundaries even when a principle suggests deletion.

### Core

- [Laziness protocol](../principle-laziness-protocol/SKILL.md): delete complexity and make the smallest correct change.
- [Foundational thinking](../principle-foundational-thinking/SKILL.md): choose the data shape and ownership first.
- [Redesign from first principles](../principle-redesign-from-first-principles/SKILL.md): integrate a requirement into the design rather than adding workarounds.
- [Attack the premise](../principle-attack-the-premise/SKILL.md): investigate a shared failed assumption before another fix.
- [Subtract before adding](../principle-subtract-before-you-add/SKILL.md): remove dead paths before extending them.
- [Minimize reader load](../principle-minimize-reader-load/SKILL.md): reduce layers and hidden mutable state.
- [Outcome-oriented execution](../principle-outcome-oriented-execution/SKILL.md): converge on a named target at verified boundaries.
- [Experience first](../principle-experience-first/SKILL.md): choose the consumer's outcome over implementation convenience.
- [Exhaust the design space](../principle-exhaust-the-design-space/SKILL.md): compare concrete alternatives when the choice matters.
- [Build the lever](../principle-build-the-lever/SKILL.md): use a rerunnable tool for meaningful repeated work or proof.

### Architecture

- [Model the domain](../principle-model-the-domain/SKILL.md): encode real states instead of scattered flags.
- [Boundary discipline](../principle-boundary-discipline/SKILL.md): validate external data at the edge.
- [Type system discipline](../principle-type-system-discipline/SKILL.md): make invalid states unrepresentable without speculative types.
- [Idempotent operations](../principle-make-operations-idempotent/SKILL.md): define behavior after retries and partial failure.
- [Migrate callers and delete legacy APIs](../principle-migrate-callers-then-delete-legacy-apis/SKILL.md): remove internal dual paths when compatibility permits.
- [Separate shared state](../principle-separate-before-serializing-shared-state/SKILL.md): isolate writers before adding locks.

### Verification

- [Prove it works](../principle-prove-it-works/SKILL.md): check the real artifact rather than a self-report.
- [Fix root causes](../principle-fix-root-causes/SKILL.md): verify the mechanism on the failing path.
- [Sequence verifiable units](../principle-sequence-verifiable-units/SKILL.md): check each logical increment.
- [Test behavior](../principle-test-behavior-not-implementation/SKILL.md): assert independently derived observable outcomes.
- [Explain the number](../principle-explain-the-number/SKILL.md): confirm the work ran and identify what limits it.

### Delegation and learning

- [Guard the context window](../principle-guard-the-context-window/SKILL.md): isolate bulk reading when the result can be checked from concise evidence.
- [Never block on the human](../principle-never-block-on-the-human/SKILL.md): decide reversible in-scope details, but respect approval gates.
- [Encode lessons in structure](../principle-encode-lessons-in-structure/SKILL.md): enforce recurring rules in code rather than repeating prompts.

## Playbooks

| Request | Playbook |
| --- | --- |
| Read-only question | [Investigation](playbooks/investigation.md) |
| Reproduce and fix a defect | [Bug fix](playbooks/bug-fix.md) |
| Measured slowdown | [Perf issue](playbooks/perf-issue.md) |
| Repeated metric improvement | [Hillclimb](playbooks/hillclimb.md) |
| Diagnose a live process, no fix | [Runtime forensics](playbooks/runtime-forensics.md) |
| Diagnose a supplied capture, no fix | [Trace forensics](playbooks/trace-forensics.md) |
| New or changed behavior | [Feature](playbooks/feature.md) |
| Structure change, same behavior | [Refactoring](playbooks/refactoring.md) |
| Throwaway experiment | [Prototype](playbooks/prototype.md) |
| Pixel-exact equivalence | [Visual parity](playbooks/visual-parity.md) |
| Create or edit a skill | [Authoring a skill](playbooks/authoring-a-skill.md) |
| Compare prompt or skill variants | [Eval](playbooks/eval.md) |
| PR status, review threads, or CI | [Babysit](playbooks/babysit.md) |
| Explicitly land a verified stack | [Shipping](playbooks/shipping.md) |
| One task until a checkable result | [Autonomous run](playbooks/autonomous-run.md) |
| Standing multi-session program | [Orchestrate](playbooks/orchestrate.md) |
| Independent PR queue with explicit merge authority | [Autopilot-full](playbooks/autopilot-full.md) |
| Build a stack for human landing | [Autopilot-stack](playbooks/autopilot-stack.md) |
| Resume prior work | [Session pickup](playbooks/session-pickup.md) |
| Explicit safe stop | [Pause safely](playbooks/pause-safely.md) |
| Plan only, phased changes | [Multi-phase plan](playbooks/multi-phase-plan.md) |
| Audit and approved cleanup | [Worktree cleanup](playbooks/worktree-cleanup.md) |
| Authorized code publication | [Opening a PR](playbooks/opening-a-pr.md) |

## Reply

Lead with the result for the consumer. Explain choices only when they affect review or the next action. Give executed checks and limitations without claiming certainty from summaries. Local, committed, pushed, merged, and deployed are different states. Link only artifacts actually produced or read. Use square-corner text diagrams unless Mermaid was requested.

The plugin supplies automatic routing guidance each turn. Explicit `/pstack` keeps the selected playbook active for follow-ups. `/pstack off` stops both kinds of reminder in this thread for the current plugin session, without disabling explicit named workflows or overriding user instructions. Reloads and executor restarts restore automatic routing; invoke `/pstack` again to resume an explicit playbook reminder. Human redirections always take precedence.
