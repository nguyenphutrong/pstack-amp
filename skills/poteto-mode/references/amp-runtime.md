# Amp execution rules

These rules apply to every pstack skill, reference prompt, and playbook. They replace upstream runtime assumptions. System instructions, Amp permissions, repository guidance, and the user's current scope take precedence over pstack.

## Keep the work small

Work directly by default. Complexity alone does not justify delegation. Use Finder for behavior-level discovery in the current checkout, Librarian for external repositories, and direct reads for known files. Use Task only for independently specified parallel work, a large bounded unit that needs context isolation, or an explicit delegation request. A suggested fan-out in a playbook is not a requirement to spawn. Mark it skipped with the concrete reason and perform the work directly.

Keep implementation, fixes, and verification in the checkout holding the work. Use a separate thread only for independent ownership, another execution environment, or an explicit request. An orb starts from a remote checkout and cannot see local edits or running services. Transfer unpushed files when necessary and specify the branch, workspace, and ownership. Never start another thread merely to access the current runner.

Task is a blocking bounded subagent, not a durable background worker. Concurrent calls must be dispatched together. It has no Cursor-style model, environment, readonly, or resume parameters. Include read-only and do-not-touch constraints in the brief. Never describe prompt constraints as a security sandbox. Use available thread tools for persistent owners, messages, statuses, and waits. Do not use CLI execute commands to bypass delegation controls.

## Models and review

Use the current mode by default, without hard-coded provider slugs, premium features, or model shopping. Task does not accept a model selector. For explicitly requested multi-model work, discover `amp.list_agent_modes`; only use names available to this user and expressly selected by the user or applicable guidance. Thread creation supports `agent_mode`; it does not transfer the parent checkout. `setup-pstack` documents choices, not a runtime dispatcher.

Prefer fresh bounded reviewers for independent review when requested. A same-model independent run is not a cross-model panel. Report the actual diversity and any unavailable seats. If the requested review needs the exact local diff, do not silently review origin/main in an orb instead.

Use Oracle when explicitly requested, or for a specific unresolved, high-impact decision after direct investigation. Do not use it as a routine review gate, a code searcher, or general reassurance. If no independent reviewer is available, report the gap. Do not label a self-review independent.

## Permissions and scope

Workflow names do not authorize side effects. Commit only when authorized. Ask before push, PR creation, merge, force-push, deployment, shared-system writes, external messages, or deleting non-disposable data unless the user explicitly authorized that action. "Keep going" is not blanket publishing or deletion permission. Preserve user-owned changes, staged files, and running processes. Undo only this run's owned edits.

A playbook's final Opening a PR step means prepare a reviewable local result when publishing was not requested. Never reset, stash, rebase, or overwrite unrelated work to fit a playbook. Out-of-scope bugs become findings, not automatic side quests. Comments explaining safety constraints remain until their constraints have a proven replacement. Do not strip legal notices or correctness suppressions blindly.

## Skills and integrations

When the plugin is installed, load bundled skills by qualified name, `pstack:<name>`, using the skill tool. With the standalone Global User Skill `pstack`, read `skills/<name>/SKILL.md` relative to that package's root when the qualified skill is unavailable. Unqualified names can refer to another installed skill. Paths in a skill are relative to that skill's directory, not the user's checkout. Resolve the installed directory before running a helper; never assume `pstack/` exists in the target repo.

The plugin recognizes only leading `/pstack` and `/pstack:<name>` commands, not bare upstream aliases such as `/how`. Help, restatement, and review-only requests do not start implementation. Standalone named workflows do not enable the main workflow's sticky reminder. The reminder is in memory for this plugin session, not durable across reload or executor restart.

Treat Amp's hosted skill cache as read-only. Before running a hosted Bun helper, copy the complete `skills/poteto-mode/scripts/` directory to an approved workspace scratch directory and run it there: its bootstrap installs dependencies beside the script. Do not copy dependency directories or write runtime state into the hosted cache.

Discover MCP capabilities with `tool_search` and call them with `code_exec` when available. Don't assume Slack, Linear, browser drivers, or cursor-team-kit are installed. Load `building-skills` before creating or editing any skill. Generate project verification skills under `.agents/skills/verify-<app>/`, then use `reload_skills` and verify discovery.

Use `ask_user_choice` only when the user explicitly asks to be asked questions. Otherwise ask an essential question in prose. Match the response to the user's language.

## Evidence, history, and long runs

Verify the original behavior on the actual CLI, app, API, or storage path. A compile pass is not runtime proof. For changed visuals, render representative states, capture and inspect screenshots with `view_media`, and link an inspected artifact. For measured claims, apply `pstack:benchmark-checklist`. Keep evidence inside the workspace at its approved artifact location. Do not create or change global schedules without a request.

For GitHub PR comments, reviews, and workflow completions prefer supported event subscriptions over polling. Discover the subscription tools and bind CI monitoring to the exact head commit; only CI subscriptions take a branch. Subscriptions report findings, not permission to push, merge, or deploy. Use a bundled foreground watcher only when subscriptions cannot serve the requested check.

There is no bundled /loop or /goal replacement. For an active shell watcher, use `shell_command` and then `shell_command_status` on the returned PID, not repeated launches. For thread results, use messages or `wait_for_threads` when progress depends on them. For explicitly requested reminders or recurring monitoring, first load `building-schedules`, then discover and configure the supported schedule. A schedule does not keep an offline executor alive; state the actual execution limits. Stop on cancellation or a real blocker. Never add an unbounded agent.end continuation hook.

For prior context, discover `amp.find_thread` and scope the search to the topic, time range, and repository. Read referenced Amp threads with `read_thread`, preserving full selection URLs. Use the current conversation for this run. Do not guess transcript directories or read other projects' private logs. Distinguish a thread report from verified Git, PR, and runtime state. Incomplete transcript access is a gap, not evidence that a tool ran.
