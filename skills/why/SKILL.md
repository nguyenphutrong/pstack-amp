---
name: why
description: "Investigates design rationale and regression history using Git and available evidence sources. Use for /pstack:why, motivation, prior decisions, postmortems, or explaining a threshold. Keeps facts separate from inference."
license: MIT
---

# Why

Read [Amp execution rules](../poteto-mode/references/amp-runtime.md) and [epistemics.md](references/epistemics.md).

1. Identify the target, symbols, file ranges, and actual question. Anchor it with `git blame`, `git log --follow -p`, commit messages, and PR descriptions where available. No repository or unauthenticated forge is a reported gap, not an assumed history source.
2. Discover connected integrations through `tool_search`, not guessed MCP directories. Build a coverage map for source control, issue tracker, long-form documents, team chat, infrastructure observability, error tracking, and product analytics. For each category record available, unavailable, searched-empty, or explicitly irrelevant with a reason.
3. Search scoped evidence. Always inspect source control when present. Use [source-playbook.md](references/source-playbook.md) and the matching `references/sources/` recipe. Defensive code also warrants [incident-postmortem.md](references/sources/incident-postmortem.md). Read-only queries only; findings do not authorize external writes.
4. For independent source investigations that justify parallel work, use bounded Task calls in one turn. Each receives [investigator-prompt.md](references/investigator-prompt.md), the code anchor, question, exact source scope, and read-only constraints. Otherwise investigate directly. Null results remain findings.
5. Verify decisive citations and synthesize using [synthesizer-prompt.md](references/synthesizer-prompt.md). Separate direct facts, reasonable inference, competing hypotheses, and unknowns. Do not weaken confidence language while editing prose.

Report the question, evidence, tradeoffs, coverage map including empty searches, and confidence. If this precedes a change, extract Preserve / Change / Avoid / Risk constraints. A plausible story is not historical evidence.
