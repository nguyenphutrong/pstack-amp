# Prompts worth copying

Swap in the real paths, skills, and done checks. Informal wording works.

## Understand

- `/pstack read <thread>. restate the underlying issue in your own words, in the user's language.`
- `/pstack:in-your-own-words <long or messy ask>`
- `/pstack:sharpen <your task>`
- `/pstack investigate why <symptom>. give me what we know, what data you used, and your best hypotheses. don't change any code yet.`
- `use /pstack:how to understand <subsystem>. then use /pstack:why to find out why it broke recently.`
- `/pstack:recall my work on <topic> from last week, then read <issue>.`
- `/pstack:teach me why you implemented it this way and not <other way>. what did you trade off?`
- `/pstack take over this branch. read the decision log, find what's done, and continue. don't redo finished work.`

## Build

- Bug: `/pstack <symptom>. repro first, then fix and verify.`
- Bug in an app: `/pstack repro this with /verify-<app>. if it repros on main, fix it and show me a video as proof.`
- Bug with a cheap test: `/pstack repro <bug> first. if there's a cheap test path, /pstack:tdd it. then fix and rerun.`
- Feature: `/pstack add <behavior>. <current output> stays byte-identical. verify both.`
- Refactor: `/pstack move <code> into one module, zero behavior change. record the current output first and prove it's unchanged after.`
- Perf: `/pstack <operation> takes <time> on <fixture>. trace it, fix the measured cause, show me before and after.`

## Design and plan

- `/pstack prototype a few options for <feature>. take screenshots or videos for me to compare.`
- `/pstack we need <feature>. /pstack:architect it first, and answer open questions with prototypes. let me review before proceeding.`
- `/pstack write a tutorial for how i would use <new package> first. then /pstack:teach me why it beats the current one.`
- `ask /pstack:arena for a second opinion on this thread and our approach.`
- `/pstack turn this design into a plan. small verifiable PRs, each with its own verification steps.`
- `/pstack plan the migration of <library> to <target>. small verifiable PRs. the result must match the original exactly, bugs included.`

## Review and ship

- `/pstack:interrogate the whole branch, but skeptically. don't change anything yet. no nitpicks unless it's a real bug or regression.` Read the dismissals too.
- `/pstack:swarm check every package under <dir> against its check script. one worker per package. one report.`
- `/pstack open the pr. small ordered commits, evidence in the description.`
- `/pstack babysit this pr. get it green.` For status only: `/pstack check on pr <number>. anything outstanding?`
- `/pstack land the stack.`

## Away and back

- `/pstack im going to bed. <goal> in a fresh worktree off <base>. done means <checks>. keep a decision log. don't ask me before committing. Continue until done within the available execution session. if you're truly stuck after a few hours, stop and write up why.`
- `/pstack:show-me-your-work catch me up on what you did last night.` Read its Attention section first.
- `/pstack full autopilot on this queue. each item is independent.`
- `/pstack autopilot these changes but stack them, don't ship. i'll land the stack.`
- `/pstack:reflect capture what we learned so the next run doesn't repeat it.` Approve only edits that change a future decision.
- `/pstack:bro` restates the last reply in plain words.
