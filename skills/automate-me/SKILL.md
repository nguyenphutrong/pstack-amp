---
name: automate-me
description: "Drafts or updates a personal working-style skill using repeated preferences from scoped Amp conversations. Use for /pstack:automate-me or turning working conventions into a skill. Requires approval before saving inferred preferences."
license: MIT
---

# Automate me

Read [Amp execution rules](../poteto-mode/references/amp-runtime.md). Load `building-skills` before inspecting or editing skill locations.

1. Identify whether the user wants a new working-style skill or an update. Locate the actual existing skill through supported discovery. Preserve its scope and placement; never edit a server-synced cache.
2. Gather evidence from the supplied conversations or scoped Amp history using `pstack:recall`. For an update, focus on changes since the last revision. Stay within the repository and time range. Missing history is a limitation, not permission to read other projects.
3. Find recurring preferences in response style, autonomy, grounding, delegation, code, proof, and delivery. Require multiple instances for inferred habits and preserve contradictory evidence. Explicit preferences need no invented recurrence.
4. Confirm consequential unknowns and present the proposed rules. Ask a small number of questions rather than an interview dump. This workflow's interactive request permits structured questions within the tool's limits.
5. Draft one `<handle>-mode` skill using `building-skills` and `pstack:unslop`. Reference existing workflows instead of copying them. Do not turn general good practice into dozens of personal rules.
6. Save only after approval of inferred preferences. Default a project-local artifact to `.agents/skills/<handle>-mode/SKILL.md`; use a global repository only when that scope is requested. Validate the frontmatter, reload skills, and verify discovery. Commit and publish only when authorized.

Return the draft or approved changes, evidence behind the meaningful rules, saved location, and delivery state.
