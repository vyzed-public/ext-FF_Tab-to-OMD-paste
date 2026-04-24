# Bookmark Round-Trip Format Specification

**Version:** 0.2a
**Date:** 2026-04-23
**Author:** Daniel Cunningham / Claude (Anthropic)

---

## Overview

Three tools form a bookmark round-trip ecosystem between Firefox and Obsidian:

1. **Tab-to-OMD** — Clips a Firefox tab (title, URL, selected text) into Obsidian-style markdown
2. **OMD-to-BMM** — Imports Obsidian markdown bookmarks into Firefox Bookmark Manager
3. **BMM-to-OMD** — Exports Firefox Bookmark Manager entries back into Obsidian markdown

The goal is **format stability**: after a full cycle (Tab-to-OMD → Obsidian → OMD-to-BMM → Firefox → BMM-to-OMD → Obsidian), the markdown should be identical to what went in.

---

## Background: The Round-Trip Problem

After some use of the bookmarking extension ecosystem, a format instability was discovered:

> 1. `Tab-to-OMD` was used to collect three or four bookmarks into Obsidian.
> 2. `OMD-to-BMM` was used to paste them into Firefox Bookmark Manager.
> 3. `BMM-to-OMD` was used to export them back into Obsidian.
>
> The formats had changed. Each cycle through the loop mutated the markdown —
> em-dashes became bullets, indent widths changed, nesting depth drifted.
> After 2–3 cycles the structure became unrecognizable.

The investigation concluded that two extensions needed to be updated, in this order:

1. **BMM-to-OMD** — updated first, to output the canonical format
2. **OMD-to-BMM** — updated second, to correctly parse the canonical format (including em-dash lines and Obsidian tab-indented input)

---

## Chain of Authority

| Priority | Extension | Role |
|---|---|---|
| 1 | **Tab-to-OMD** | Defines the canonical format. Its output is the ground truth. Do not change it. |
| 2 | **OMD-to-BMM** | Must correctly parse the canonical format, including em-dash bookmark lines and Obsidian tab-indented lists. Final extension to be updated in the round-trip fix. |
| 3 | **BMM-to-OMD** | Must output the canonical format so that OMD-to-BMM can correctly re-import it. First extension to be updated in the round-trip fix. |

---

## Canonical Format

Tab-to-OMD defines the canonical output format. All three tools must respect it.

### Structure

```
FolderName
- purpose text or folder name
  — [link title](url)
```

### Rules

- **Root folder line:** Plain text with no bullet — OMD-to-BMM treats this as the destination folder name, not a nested item.
- **Folder line:** `- ` (bullet + space) followed by purpose text or subfolder name
- **Bookmark line:** Two-space indent + `— ` (em-dash U+2014 + space) + standard markdown link
- **Em-dash is U+2014** (not a hyphen `-`, not an en-dash `–`)
- **Indent unit:** 2 spaces per nesting level
- **Separator:** `- ─────  separator  ─────` (bullet + U+2500 box-drawing characters, self-documenting label)
- **Trailing newline:** Single trailing `\n` after the last line for clean paste behavior

### Structural Semantics

| Markdown element | Firefox BMM mapping | Obsidian rendering |
|---|---|---|
| `FolderName` (plain text, no bullet) | Root destination folder | Plain text heading |
| `- text` (bullet) | Subfolder | Bullet point |
| `  — [title](url)` (2-space indent + em-dash) | Bookmark inside the folder above | Indented attribution line |
| `- ─────  separator  ─────` | Firefox bookmark separator | Unicode divider line |

**Critical:** The em-dash distinguishes a bookmark payload from a subfolder. A child bullet (`  - [title](url)`) would be interpreted as a subfolder by OMD-to-BMM, breaking the nesting structure.

### Complete Example

Given this Firefox bookmark structure:

```
📁 DevOps
   📁 Docker
      🔖 Docker Hub
      🔖 Portainer Docs
      ──────────
      🔖 Docker Compose Ref
   📁 WireGuard
      🔖 WG Quick Start
      🔖 WG Config Guide
   ──────────
   🔖 Ansible Getting Started
```

BMM-to-OMD exports:

```
DevOps
- Docker
  — [Docker Hub](https://hub.docker.com)
  — [Portainer Docs](https://docs.portainer.io)
  - ─────  separator  ─────
  — [Docker Compose Ref](https://docs.docker.com/compose)
- WireGuard
  — [WG Quick Start](https://www.wireguard.com/quickstart)
  — [WG Config Guide](https://www.wireguard.com/config)
- ─────  separator  ─────
— [Ansible Getting Started](https://docs.ansible.com/getting-started)
```

This pastes back into OMD-to-BMM and reconstructs the original Firefox structure identically.

---

## Tab-to-OMD Output Examples

**With selected text:**
```
- How to implement LLM-Wiki with opencode and llama.cpp, all tricks included
  — [LLM-wiki local & local LLM: part 2 | by Fabio Matricardi | Medium](https://medium.com/...)
```

**Without selected text (? placeholder):**
```
- ?
  — [LLM-wiki local & local LLM: part 2 | by Fabio Matricardi | Medium](https://medium.com/...)
```

**Multiple bookmarks pasted sequentially:**
```
- imagine we're a tiny ant living on the surface of a doughnut.
  — [The Fundamental Group](https://joeclaxton.substack.com/p/the-fundamental-group)

- PAI is a Life Operating System
  — [PAI — Magnifying Human Capabilities](https://ourpai.ai/)

- Agentic AI Infrastructure for magnifying HUMAN capabilities.
  — [danielmiessler/Personal_AI_Infrastructure](https://github.com/danielmiessler/Personal_AI_Infrastructure)
```

---

## Changes Made Per Extension

### BMM-to-OMD (`popup/markdown.js`) — Initial round of rework

| What changed | Old behavior | New behavior |
|---|---|---|
| Root folder line | `- FolderName` (bulleted) | `FolderName` (plain text, no bullet) |
| Bookmark lines | `- [title](url)` (bullet) | `— [title](url)` (U+2014 em-dash, no bullet) |
| Indent unit | 4 spaces per level | 2 spaces per level |
| Children start depth | depth 1 (under bulleted root) | depth 1 (under plain-text root) |
| Separator lines | unchanged | unchanged (`- ─────  separator  ─────`) |

### OMD-to-BMM (`popup/popup.js`) — Final round of rework

| What changed | Old behavior | New behavior |
|---|---|---|
| Em-dash line parsing | Em-dash lines fell through to folder detection | Em-dash lines are recognized as bookmark attribution lines and parsed as bookmarks |
| Tab expansion | 1 tab = 4 spaces | 1 tab = 2 spaces (matches Obsidian's tab + 2-space continuation convention) |
| Indent unit | 4-space primary, 2-space fallback | 2 spaces throughout (`Math.floor(spaces / 2)`) |
| Double-submission prevention | Create button remained active after success | Create button is replaced by a Dismiss button after successful creation |

---

## Current State (as of 2026-04-23)

| Tool | Status | Notes |
|---|---|---|
| **Tab-to-OMD** | ✅ Conforms | Defines canonical format. Unchanged. |
| **BMM-to-OMD** | ✅ Conforms | Updated to output canonical format (plain-text root, em-dash bookmarks, 2-space indent) |
| **OMD-to-BMM** | ✅ Conforms | Updated to parse em-dash lines as bookmarks, handle Obsidian tab indentation, prevent double-submission |

---

## Why This Matters

Without format stability, each round-trip cycle mutates the markdown:
- Em-dashes become bullets
- Indent widths change
- Nesting depth drifts

After 2–3 cycles the structure becomes unrecognizable. Format stability means you can freely move bookmarks between Firefox and Obsidian without degradation.
