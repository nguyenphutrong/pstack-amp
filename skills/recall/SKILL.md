---
name: recall
description: "Rebuilds recent working context from scoped Amp threads and live Git or PR state. Use for /pstack:recall, catch me up, or where did I leave off. Does not scan private transcript directories."
license: MIT
---

# Recall

Read [Amp execution rules](../poteto-mode/references/amp-runtime.md).

1. Pin topic, workspace, and time window. Default recent to seven days, but never silently narrow a request for all history. A supplied state capsule can replace mining. A single prior thread to resume routes to Session pickup.
2. Discover `amp.find_thread` with `tool_search`. Search only the current repository and topic, then read matching threads with `read_thread`. Preserve full user-provided URLs, including selections. If history tools are unavailable, use supplied context and Git; report the missing source. Do not guess a local transcript layout.
3. Extract each thread's goal, decisions, completed and open work, corrections, and artifacts. For a named feature or bug, use `pstack:why` to sweep relevant shared records for regressions and abandoned fixes. For pure activity recall, history and live state suffice.
4. Check surfaced branches, PRs, tickets, and commits against current state. A prior summary does not prove a merge or a test run. Distinguish inferred progress from checked delivery.
5. Return a brief with a capsule of at most five bullets, one status line per thread, up to five recurring problems, and the single best next move. Use merged, open PR, in flight, verified uncommitted, reverted, or planned not started tags as supported by evidence.

Cite scoped Amp thread links and original sources. Sanitize private context before public output. Never publish a thread link externally without the user's request.
