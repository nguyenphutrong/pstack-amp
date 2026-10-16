---
name: swarm
description: "Partitions explicit parallel coverage or races into isolated workers and returns one evidenced report. Use for /pstack:swarm, a coverage matrix, gauntlet, or independent exploration slices."
license: MIT
---

# Swarm

Read [Amp execution rules](../poteto-mode/references/amp-runtime.md).

1. Frame. State the done predicate and shape: coverage, race, or mixed. Declare first-pass, rank-all, or best-of before a race. Derive worker count from independent slices, not an arbitrary target.
2. Brief. Each worker gets the goal, exact slice, input revision, owned output, constraints, how to verify, and return schema. Measurement briefs include sample count, sample definition, and ordering. Git verifiers must report the exact head and base SHAs they exercised.
3. Fan out. Explicit swarm invocation requests parallel bounded work. Dispatch independent Task calls together when they can use the current environment safely. For persistent owners or separate execution environments use supported threads with isolated checkouts and exact code transfer. Do not pass unsupported background, environment, readonly, or model fields to Task.
4. Aggregate. Wait for every required slice. Reports are PASS, ISSUES, or BLOCKED with evidence and the required revisions or method. Reject a missing revision or method, allow one corrected attempt, then record a gap. Dropouts never count as passes. Apply the declared race rule.
5. Report. Inspect returned evidence and run combined validation where outputs compose. Return one result table, proven issue one-liners, gaps, dropouts, and actual execution limitations. Do not paste raw worker logs.
