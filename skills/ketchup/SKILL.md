---
name: ketchup
description: "Summarizes what changed in this Amp thread since the user's previous message and what needs their decision. Use for /pstack:ketchup or a brief catch-up on the current task."
license: MIT
---

# Ketchup

Read [Amp execution rules](../poteto-mode/references/amp-runtime.md).

Catch the user up since their last message before this request. Notifications and worker reports are not user messages. Use this conversation and available evidence; do not scan local transcripts or claim missing history is complete. For other threads use [recall](../recall/SKILL.md).

1. Stay read-only. Check current PR, CI, and worker states touched by this task when supported tools are available. Do not change code, launch an app or job, or post anything just to illustrate the summary.
2. Separate verified results from reports and unknowns. Correct stale numbers. Local changes, committed work, open PRs, merges, and deployments are different states.
3. Open with whether any user decision is needed. Then give one short bullet per requested outcome: what changed, whether it is done, still running, failed, or not checked. Use [bro](../bro/SKILL.md)'s plain language, not its task. Keep the user's language.
4. Include outstanding user-only decisions even if raised earlier. Work you can do yourself is not an action item. Give each decision a recommendation, reason, consequence of no answer, and a link to existing detail. Do not invent a choice to fill the reply.
5. Reuse actual screenshots or recordings when useful. For relationships use a small square-corner text diagram; Mermaid only if requested. Never generate fake screenshots, invent a number, or link an artifact that does not exist. If a visible change lacks a capture, say so.

Keep the reply under 150 words excluding useful visuals, unless the user requests detail. If nothing changed and nothing waits on them, say so and stop.
