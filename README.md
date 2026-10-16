# pstack for Amp

Unofficial Amp adaptation of Lauren Tan's MIT-licensed pstack **v0.15.25**.
Includes **53 skills** (29 workflows and 24 principles), **23 playbooks**, and
30 command-palette entries including Off. See [NOTICE.md](NOTICE.md) for provenance
and intentional differences from Cursor.

## Use

```text
/pstack Investigate why checkout times out. Reproduce first; do not change code yet.
/pstack:architect Design the import API with a checkpoint before implementation.
/pstack:interrogate Review the current diff. Report findings; do not apply fixes.
/pstack:poteto-help Which workflow should I use?
/pstack off
```

The plugin handles only a command at the beginning of a message. Bare aliases
such as `/how`, quoted commands, and commands inside code fences do not activate
it. `/pstack` opts into a per-thread reminder; a named workflow is one-shot.
The reminder survives follow-up turns in the same running plugin, not plugin
reloads or executor restarts. Invoke `/pstack` again after either. Off disables
the reminder, not this thread's previous messages or Amp's normal instructions.

The command palette provides the same non-principle workflows. Enter a goal or
scope to run one; canceling or submitting blank input does nothing. Start a
thread before using palette commands. The [main skill](skills/poteto-mode/SKILL.md)
lists playbooks; [help](skills/poteto-help/SKILL.md) explains the workflows.

## Install

This repository's root is the plugin package. For a project-specific installation,
run this from the target project's root, then load
`.amp/plugins/pstack/index.ts` with `load_plugin`:

```sh
git clone https://github.com/nguyenphutrong/pstack-amp.git .amp/plugins/pstack
```

For persistent personal use, copy the package contents (excluding `.git/`) into
a `pstack/` directory at the root of your **Amp User Plugins repository**.
Find it with `amp plugins repositories`.
Review and commit only this package, then push only with the owner's approval.
New threads load published plugins automatically; use `reload_plugins` in an
existing thread. A local clone alone does not publish or activate a global plugin.

Do not install both copies. Preserve LICENSE, NOTICE.md, and bundled resources.
Verify discovery with `amp skill info pstack:how`. The standalone global `pstack`
skill can coexist; it should prefer qualified plugin skills when available.

To roll back a published version, restore the previous package in the source
repository and publish that reviewed change with approval, then reload. Do not
edit Amp's generated global plugin or skill caches.

## Runtime boundaries

- No custom agent mode, model defaults, MCP server, or new orchestration service.
- Work directly by default. Task is bounded; another thread or orb does not
  automatically receive the current checkout, edits, or running services.
- No automatic commit, push, PR creation, merge, deployment, or external writes.
- No automatic continuations or `/loop` emulation. PR event subscriptions are
  preferred; schedules require an explicit request and an available executor.
- Missing integrations or independent reviewers are reported, not simulated.
- Benny, `make-bot-ui`, Cursor agent manifests, `check-plan.mjs`, and
  `worktree-audit.sh` are intentionally excluded. All other upstream skills are
  included; host-coupled behavior follows the [Amp runtime rules](skills/poteto-mode/references/amp-runtime.md).
- Helpers run only on demand. Copy the complete `skills/poteto-mode/scripts/`
  directory to workspace scratch before executing hosted Bun helpers: their
  bootstrap installs dependencies beside the script. Never write into the
  read-only managed cache. Helper tools require Bun; GitHub watching also needs
  authenticated `gh`. Stack-frontier calculation reads the PR base chain through
  `gh` or the optional Origin CLI, plus local branch heads. Graphite is not required.

## Verify

From this directory:

```sh
bun tools/check.mjs
```

The self-check exercises routing, isolation, off, reload, palette output, skill
metadata, and local resource links. To check Amp's actual plugin host without
publishing, copy this package to `.amp/plugins/pstack/` in a disposable project,
then run `amp plugins list` and `amp skill info pstack:how` from that project.
Confirm the plugin is active, its commands are listed, and the qualified skill
resolves. Remove the disposable project afterward. These checks do not prove
an LLM will follow every workflow correctly. Do not invoke a publishing workflow
merely to test loading.

For retained upstream helper checks, copy `skills/poteto-mode/scripts/` to a
temporary directory, run `bun install --frozen-lockfile`, `bun run test`, and
`bun run typecheck` there, then remove only that temporary copy.

## Update upstream

Check out the revision pinned in `tools/import-upstream.ts` in a clean
`cursor/plugins` clone, then run:

```sh
bun tools/import-upstream.ts /path/to/cursor-plugins
bun tools/check.mjs
```

The importer leaves Amp-owned files intact, rewrites portable command/path
references, and excludes host-specific scripts. Repeating an import at the same
pin must produce identical files. To advance the pin, review the upstream diff,
manually reconcile the Amp-owned files listed in the importer, update NOTICE.md
and this inventory, and rerun the checks. This is a reviewed import, not an
automatic updater: it does not prune old files or infer a migration for new
Cursor APIs. Never run upstream scripts as part of importing.
