---
name: setup-pstack
description: "Inspects Amp capabilities and documents an explicitly chosen pstack budget or model policy. Use for /pstack:setup-pstack or configuring pstack. No settings change or publication occurs automatically."
license: MIT
---

# Set up pstack on Amp

Read [Amp execution rules](../poteto-mode/references/amp-runtime.md).

1. Inspect the installed Amp version and discover `amp.list_agent_modes` if model selection was requested. Check actual available delegation, MCP, history, and schedule tools. Do not assume a tool or model exists from a README.
2. Explain the default. Use the current agent directly; no extra mode, premium feature, or review panel is selected. Task inherits its supported execution behavior and has no per-call model parameter.
3. If the user wants a budget policy, record simple thresholds such as direct work, bounded parallel work, or explicitly requested multi-model comparison. Ask only for a missing consequential preference. Use only available modes the user chose. Never derive Amp model names from Cursor slugs.
4. If the user asks to save it for this project, write the policy in the project's existing AGENTS.md or a document it references. Do not create an always-applied global rule file or silently edit global settings. To change actual Amp settings, use `manage_amp` after inspecting its supported operations.
5. Discover the project's verification harness. When missing, explain `pstack:create-verification-skill` as the available next workflow. Setup alone does not generate a driver, launch an agent, or publish this plugin.

Report the capabilities found, actual choices saved, and limitations. Model policy is agent guidance, not an automatic role-to-model dispatcher.
