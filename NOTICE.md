# Sources and deliberate changes

This is an unofficial Amp adaptation, not a Cursor or Amp product.

The canonical source is Lauren Tan's MIT-licensed pstack v0.15.32 at [cursor/plugins revision 99b609a](https://github.com/cursor/plugins/commit/99b609a72323b70204eab407c622f436e858e112). This adaptation builds on the existing Amp skill based on v0.15.9 and the first plugin port of v0.15.25. The bundled LICENSE preserves the original copyright and permission notice. Principle leaves, platform-neutral workflows, reference prompts, decision log helper, PR watcher, orchestration store, and statechart scripts derive from the pinned source. Amp-owned files retain their adapted behavior and are reviewed separately rather than overwritten by an upstream import.

The [Flavio Copes walkthrough](https://flaviocopes.com/pstack/) explains the intended user workflows. It is a reading reference, not the authoritative inventory; counts here come from the pinned source tree.

[michael-denyer/pstack-claude](https://github.com/michael-denyer/pstack-claude/tree/c1123fe2aaf7963a777f2a4171bf829116873064) was inspected as a portability reference. This port does not copy its source or bundled cursor-team-kit additions. We independently adopt the ideas of explicit runtime adaptation, source pins, isolated writers, and revision-bound delivery proof.

## Amp-owned behavior

The TypeScript entry point explicitly registers all 57 skills and adds 33 workflow palette commands plus an off command. It routes only leading `/pstack` and `/pstack:<skill>` commands, preserves the user's scope, and keeps a session-local poteto-mode reminder per thread. Bare commands such as `/how` are not aliases. It does not register a custom model mode, custom subagent, autonomous continuation hook, or global startup mandate.

Sixteen skill entry files, fifteen playbooks, and five reference prompts are maintained for Amp. `tools/import-upstream.ts` lists these Amp-owned exclusions and the deterministic changes for imported resources. It checks the pinned revision and clean upstream worktree before importing. The shared Amp execution rules override inherited runtime and permission assumptions for every workflow and reference prompt.

Changes from upstream policy are intentional:

- Direct work is the default, with risk-shaped grounding, design, review, and verification. Mandatory delegation is replaced by Amp's actual tool contracts.
- No fictional Task parameters or provider-slug defaults. Explicitly chosen available modes may be used only where the execution environment fits.
- Published actions, data deletion, and external messages require scoped authority. A workflow name or broad persistence request does not grant it.
- No destructive worktree reset, transcript-based cleanup verdict, mandatory ten-lane plan, or automatic backlog filing.
- Safety constraint comments remain until a replacement is approved and proven.
- Independent safety proof is separate from CI readiness. Shipping uses current revision checks and a match-head merge condition.
- Transcript discovery, integrations, scheduling, and skill authoring use supported Amp capabilities and disclose gaps.
- The v0.15.32 sync includes both formal-verification skills, statechart, ketchup-video, prompt-only sharpen, complete ketchup decisions, and the PR-helper fixes. Setup, help, reflection destinations, and artifact delivery retain Amp-native behavior. Statechart scripts are imported unchanged; tools install only when invoked, never during plugin initialization.

## Exclusions

`make-bot-ui` and the dormant Benny automation pack require Cursor-specific automation and secret-handoff APIs. They are not shipped or silently emulated. Cursor agent manifests are replaced by native bounded delegation instructions; there are no inert agent manifest files.

The unsafe editor-specific `worktree-audit.sh` and the rigid `check-plan.mjs` are not shipped. Their responsibilities are in the Amp-owned cleanup and multi-phase-plan playbooks. All retained scripts are loaded on demand, never run during plugin initialization.

## Distribution

Copy the whole `pstack/` directory, including this notice, LICENSE, skills, and resources. The plugin entry needs no runtime npm dependency. Bun helpers retain their separate package manifest and lockfile. Global publication happens only through the appropriate Amp personal or workspace repository after an authorized push.
