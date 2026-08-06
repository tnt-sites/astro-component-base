# astro-component-base — Manual

> Last updated: 2026-08-06 · main @ (see git)
> Latest: **TNT Fontello → SVG icon kit is the fidelity convert dependency.**
> WP2Astro / TNT2Astro `installTntIconKit` copies `src/icons/tnt/*` + subsets
> `src/styles/tnt-fontello-compat.css` into every converted site. Pull + push
> this repo with the fleet (`pull-all` / `sync-all`); do not treat it as optional
> when working Holger-class fidelity sites.

## What it is

Shared Astro + CloudCannon **component library** (`tnt-sites` org). The 2Astro
engine copy-scaffolds this repo into every generated site — it is **not** an
npm dependency. Per-client promoted sites under `tnt-sites/*` are output; this
repo is the shared **source**.

## Run & deploy

- Edited locally at `C:\tnt-sites\astro-component-base`
- Managed in do-agents roster (pull-all / sync-all)
- CloudCannon sites scaffold from this tree; icon kit paths must stay stable

## Architecture

- `src/icons/tnt/` — SVG glyphs matching historical Fontello `icon-*` names
- `src/styles/tnt-fontello-compat.css` — mask-image rules for carried
  `<i class="icon-phone">` markup (full sheet ~190 KB; convert **subsets**
  per site to used icons + runtime icons like `icon-menu` / `icon-down-dir`)
- Page sections / navigation / building-blocks — CloudCannon-editable Astro

## Current state

Icon kit is live and consumed by all six staged TNT fidelity sites. Empty
circles / black hamburger boxes almost always mean: ACB not pulled, kit path
wrong, or subset missed a runtime-injected class (`TNT_RUNTIME_ICONS` in
WP2Astro `emit-tnt-fidelity.ts`).

## Recent changes

- **2026-08-06** — Documented as a hard dependency of TNT fidelity convert/regen
  and wired into do-agents "let's get started" / "that's a wrap" orientation
  (pull-trigger + sync-trigger). Kit itself landed earlier on
  `codex/header-landmark` / main as Fontello → SVG replacement.

## Next steps — homework for work agent

- Keep `tnt-fontello-compat.css` + `src/icons/tnt` in sync across machines before
  any `regen-tnt-fidelity` / convert run.
- If a new runtime-injected icon is added in WP2Astro behaviors, add the glyph
  here **and** list the class in `TNT_RUNTIME_ICONS`.
- Do not delete unused glyphs from the full compat sheet without checking
  subsetter + Holger/Riverside fixed-tabs icons.

## Integrations

- **WP2Astro** `installTntIconKit(outDir, iconKitRoot)` — default root
  `C:\tnt-sites\astro-component-base` or `TNT_ACB_ROOT`
- **do-agents** repo-sync / pull-all / sync-all

## Deeper docs

- WP2Astro `MANUAL.md` (fidelity icon + meanmenu sections)
- do-agents canvases `do-agents-family` Tasks (WP2Astro area)
