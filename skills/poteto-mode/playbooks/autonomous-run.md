### Autonomous run

Read the parent skill's Amp execution rules. Own one checkable exit condition, not an unbounded background loop.

1. State the exact predicate, scope, time or attempt budget when supplied, and permission boundaries before work. A build passing alone is insufficient when the goal is behavior.
2. Select the real execution mechanism. Continue directly for active work. Use a shell watcher and its returned PID for CI or runtime events, or supported thread waits for independent owners. For an explicitly requested later reminder or recurring check, load `building-schedules` and configure a supported schedule. Report offline-executor limits. Do not claim a built-in /loop exists.
3. Each iteration makes one evidence-backed change, verifies the predicate, and keeps or discards only that iteration's owned edits. Verify a unit before the next. Commit only with authorization.
4. Resolve in-scope blockers. Report unrelated bugs and proposed scope changes instead of spawning side quests. Pause at approval gates or an actual access blocker.
5. Checkpoint decisions and predicate movement with `pstack:show-me-your-work`. Preserve a durable resume note when interruption threatens state.
6. Stop at the predicate, cancellation, agreed budget, or a genuine dead end. Do not weaken the predicate or create automatic agent.end continuations to manufacture completion.

Reply with iterations, accepted and discarded attempts, evidence, final predicate state, and any pending permission or execution limit.
