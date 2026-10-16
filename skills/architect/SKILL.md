---
name: architect
description: "Designs caller-first interfaces and module boundaries before implementation. Use for /pstack:architect, a meaningful design fork, or a change that alters ownership. Add with checkpoint to pause after design."
license: MIT
---

# Architect

Read [Amp execution rules](../poteto-mode/references/amp-runtime.md).

1. Ground. Use `pstack:how` to trace surrounding behavior. Use `pstack:why` when historical constraints or ownership changes matter. Greenfield work can skip the existing-system trace with a reason.
2. Sketch. Write caller usage before types and signatures. Compare at least two structurally different shapes. Use [runner-prompt.md](references/runner-prompt.md), [rationale-template.md](references/rationale-template.md), and [design-red-flags.md](references/design-red-flags.md). Direct sketches are enough when extra agents add no value. For a requested competing-agent exploration, use `pstack:arena` and isolated outputs.
3. Agree. Pick the smallest interface that hides meaningful complexity. Record alternatives and reasons. Pause for sign-off only if the user asked for a checkpoint or a consequential product choice remains.
4. Implement. The sketch and rationale define the contract. Verify each logical unit. Reconcile meaningful deviations back into that contract rather than silently adding parameters and optional states.
5. Scrap. Repeated casts, special cases, leaked internals, or shared-state coordination contradicting the sketch are evidence of a bad shape. Re-ground, subtract the failed approach, and compare new shapes. Do not stack workarounds.

Deliver the caller example, design package, rationale, selected alternatives, and executed proof. If asked for design only, stop after the sketch. Do not turn a local design task into a new thread or PR.
