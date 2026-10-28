---
name: poteto-help
description: "Explains pstack installation, commands, playbooks, and limitations on Amp. Use for /pstack:poteto-help or questions about using pstack; help does not start implementation."
license: MIT
---

# pstack help for Amp

Read [Amp execution rules](../poteto-mode/references/amp-runtime.md).

Answer the question, read the relevant linked skill before recommending it, and give at most one example prompt. Help is read-only: do not start the suggested task, change settings, install anything, or publish work. Keep the user's language. If the need is unclear, ask one essential question in prose.

## Start and stop

- Without a command, the plugin reminds the agent to use pstack for multi-file work, signatures used elsewhere, design choices, unknown-cause bugs, and performance issues. Simple tasks can stay direct unless user instructions require pstack.
- `/pstack <goal and done check>` selects a playbook and reminds follow-up turns in the current plugin session.
- `/pstack:<skill> <scope>` runs one workflow, such as `/pstack:how explain the request path`. It does not enable sticky mode.
- `/pstack off` stops automatic and playbook reminders for this thread in the current plugin session. Explicit named workflows still work; `/pstack` re-enables playbook reminders. Reload or executor restart restores automatic routing, not the previous on/off state. Off does not override existing user instructions.
- The command palette has the same workflows. Canceling its input leaves the thread unchanged.
- Skills have qualified names such as `pstack:how`. Bare commands such as `/how` are not plugin aliases.

The standalone global `pstack` skill can read these workflows without installing a plugin, but cannot register palette commands or reminders. See the [README](../../README.md) for installation and [prompting](references/prompting.md) or [recipes](references/recipes.md) for task wording. Do not give Cursor setup instructions or claim that an upstream public file describes this port's runtime.

## Pick a workflow

| Goal | Skill |
| --- | --- |
| Route engineering work or write a multi-phase plan | [poteto-mode](../poteto-mode/SKILL.md) |
| Confirm the problem | [in-your-own-words](../in-your-own-words/SKILL.md) |
| Rewrite a prompt with deeper methods and an outside check, without doing the task | [sharpen](../sharpen/SKILL.md) |
| Explain behavior, intent, or tradeoffs | [how](../how/SKILL.md), [why](../why/SKILL.md), [teach](../teach/SKILL.md) |
| Catch up across threads or in this thread | [recall](../recall/SKILL.md), [ketchup](../ketchup/SKILL.md) |
| Catch up with a short silent video and all waiting decisions in text | [ketchup-video](../ketchup-video/SKILL.md) |
| Design or compare alternatives | [architect](../architect/SKILL.md), [arena](../arena/SKILL.md) |
| Review a diff or its downstream risks | [interrogate](../interrogate/SKILL.md), [blast-radius](../blast-radius/SKILL.md) |
| Explicit independent coverage | [swarm](../swarm/SKILL.md) |
| Reproduce a bug test-first | [tdd](../tdd/SKILL.md) |
| Drive the app and maintain proof recipes | [create-verification-skill](../create-verification-skill/SKILL.md), [maintain-verification-skill](../maintain-verification-skill/SKILL.md) |
| Check a race or invariant beyond individual tests | [create-formal-verification-skill](../create-formal-verification-skill/SKILL.md) |
| Resync a formal model after code changes and distinguish drift from real bugs | [maintain-formal-verification-skill](../maintain-formal-verification-skill/SKILL.md) |
| Draw checked states and bug paths from TLA+, or turn an agreed chart into a model | [statechart](../statechart/SKILL.md) |
| Validate performance numbers | [benchmark-checklist](../benchmark-checklist/SKILL.md) |
| Run a bespoke large change with an audit trail | [figure-it-out](../figure-it-out/SKILL.md), [show-me-your-work](../show-me-your-work/SKILL.md) |
| Configure capabilities or improve working conventions | [setup-pstack](../setup-pstack/SKILL.md), [automate-me](../automate-me/SKILL.md), [reflect](../reflect/SKILL.md), [correct](../correct/SKILL.md) |
| Write or simplify prose | [technical-writing](../technical-writing/SKILL.md), [unslop](../unslop/SKILL.md), [bro](../bro/SKILL.md) |

For another skill, read its frontmatter. The [main workflow](../poteto-mode/SKILL.md) lists all 23 playbooks and 24 principles. Playbooks such as Babysit, Shipping, and Session pickup are selected by the goal after `/pstack`; they are not separate registered skills.

## Limits and troubleshooting

- Work directly by default. No extra agent mode, provider slug, or cross-model panel is selected automatically. [Setup](../setup-pstack/SKILL.md) documents explicitly requested choices, not an automatic dispatcher.
- Delegates need the exact checkout and input revision. Another orb does not contain local edits. Never let concurrent writers share owned output paths.
- A passing build is not proof of the user flow. Use the project's real verification harness; missing access remains a gap.
- When no formal verification exists and the question concerns a race or invariant, explain the creation workflow. When covered code changed since the model's sync commit, explain the maintenance workflow. A model's pass covers only its stated bounds and assumptions.
- Statechart needs Node.js; checking uses TLC and Java, while PNG rendering installs pinned Pele/resvg packages on demand. Nothing installs when the plugin loads. Follow the runtime rules for scratch inputs, trusted mappings, and artifact inspection.
- PR events use supported Amp subscriptions when available. There is no bundled `/loop` replacement or always-on scheduler. Scheduled work requires an explicit request and an available executor.
- Commit, push, PR creation, merge, deployment, external messages, and deletion need the applicable authority. A workflow name does not grant it.
- Benny and `make-bot-ui` are not included because their Cursor automation and secret APIs have no bundled replacement.
