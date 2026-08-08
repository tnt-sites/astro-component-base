# astro-component-base — Manual

> Last updated: 2026-08-08 · main @ aa855992
> Latest: **`gallery-section`'s CloudCannon config didn't exist on `main` at all** (only
> `GallerySection.astro` itself — no `.cloudcannon.inputs.yml`/`.structure-value.yml`), so it wasn't
> actually editable in CloudCannon here even though the component worked. Found via WP2Astro's
> Phase 2 TNT band adapter, which started emitting real `tnt/gallery-section` sections and hit a
> page (`all-cases.html`) whose only content is one of these bands with no other page heading —
> exposed that `main`'s `headingLevel` fix (below, `b7bce05d`) never got a matching CloudCannon
> schema field for 3 of the 4 components it touched. Added the config files/fields; see Recent
> changes. **Also found real branch divergence, not yet resolved:** `main`'s own `b7bce05d` fix
> never made it onto `codex/header-landmark` (that branch predates it and nobody's cherry-picked it
> over), so the actual promoted Whitinsville site — built from a `codex/header-landmark`-based
> checkout, since `main` is still missing that branch's `landing` content collection the site
> depends on — still had the original, un-fixed `<Heading level="h2">` hardcoding in these 4
> components. Fixed on a local scratch branch for that specific build; `main` and
> `codex/header-landmark` still need a real merge. See Next steps.
> Prior: **found and fixed 3 real component-library bugs while proving out `WP2Astro`'s new
> TNT2Astro conversion module end-to-end against a real site (sound-dentistry), 2026-08-05,
> `b7bce05d`** ·
> [tnt-sites/astro-component-base](https://github.com/tnt-sites/astro-component-base) — Latest:
> found and fixed 3 real component-library bugs while proving out `WP2Astro`'s new TNT2Astro
> conversion module end-to-end against a real site (sound-dentistry). All three are general
> correctness fixes, not TNT2Astro-specific — they benefit every WP2Astro/TNT2Astro site built on
> this base, past and future. See Recent changes for detail; see `WP2Astro/MANUAL.md`'s matching
> 2026-08-05 entry for the full TNT2Astro story these fixes were found inside of.
>
> **Added to `.cursor/rules/repo-sync.mdc`'s managed-repo list (2026-08-05, 24 repos total)** —
> this repo lives at `C:\tnt-sites\astro-component-base` (sibling to `do-agents`/`tnt-agents`,
> like `site-rescues`), is its own git repo (`tnt-sites/astro-component-base`), and gets real code
> changes (not just per-client data), so it's now part of the fleet's pull-all/sync-all routine —
> the same gap-closing move `site-rescues`/`WP2Astro-codex` got when they were noticed missing.

## What it is

A shared, forkable Astro + CloudCannon component library ("2Astro" platform's destination side).
`WP2Astro`/`TNT2Astro` conversions **copy-scaffold** this repo into each generated site
(`scaffold.ts`'s `scaffoldFromBase`) rather than depending on it as an npm package — each converted
site is a snapshot at convert time. Organized as building blocks (core elements, wrappers, forms,
navigation) composed into page-sections (heroes, CTAs, features, info-blocks, people, a `tnt/`
subfolder of dental-practice-specific sections) that a converted site's Markdown/MDX content
references by `_component` path. CloudCannon's visual editor reads the same `data-prop`/
`data-editable` conventions these components emit.

## Run & deploy

- `npm run dev` — local dev server at `http://localhost:4321` (component documentation/starter
  pages).
- `npm run build` — production build (also what a converted site's own `npm run build` effectively
  runs, since the converted site IS a copy of this tree).
- Not deployed on its own — every real deployment is a per-client converted site (e.g.
  `tnt-sites/chapel-hills-dental`) that copy-scaffolded from this repo at convert time.

## Architecture

- `src/components/building-blocks/` — core-elements (Heading, Text, Image, Button, ...), wrappers
  (Grid, Split, ButtonGroup, Accordion, Card, ...), forms.
- `src/components/page-sections/` — heroes, ctas, features, info-blocks, navigation
  (header/footer), people, builders (CustomSection), and a `tnt/` subfolder of dental-practice
  sections (testimonials-grid, pricing-section, logo-bar, gallery-section, before-after, ...).
- `src/pages/` — the actual route files a converted site gets (`[...slug].astro` catch-all,
  `blog/[...page].astro` + `blog/[...slug].astro`, `category/`/`tag/` archive routes).
- `src/content.config.ts` — Astro content-collection Zod schemas (`pages`, `blog`) every
  converted site's Markdown/MDX frontmatter must satisfy.
- **`headingLevel` prop convention**: `WP2Astro/packages/core/src/convert.ts`'s
  `assignPageHeadingOwnership()` resets every emitted section's heading to `h2`, then promotes
  exactly the one section owning the source page's real `<h1>` to `headingLevel: 'h1'` — components
  are expected to read this prop and render the `<Heading level={headingLevel}>` accordingly (hero
  components default `h1`, everything else defaults `h2`).

## Current state

Actively maintained alongside `WP2Astro`. No automated test suite in this repo itself — correctness
is proven by real conversion runs (`html-gate`, `a11y-gate`, `qc-audit` in `WP2Astro`/
`WP2Astro-beta`) and manual CloudCannon editor spot-checks on promoted sites.

## Recent changes

- **2026-08-08 — `gallery-section` CloudCannon config completed + `headingLevel` fixed on the
  `codex/header-landmark` lineage that actually ships.** Two related but distinct findings from
  WP2Astro's Phase 2 TNT band adapter going live (composing real pages instead of a raw HTML blob):
  1. **`main`-side gap**: `gallery-section` had `GallerySection.astro` but zero CloudCannon config
     (`.cloudcannon.inputs.yml`/`.structure-value.yml` didn't exist on `main` at all — only on
     `codex/header-landmark`, via its own `a0b83800 Add missing CloudCannon schema files for
     page-sections/tnt/gallery-section`, never cherry-picked over). Added both files, plus a
     `headingLevel` select field (`before-after`/`cta-form`'s *existing* yml files were also missing
     that field even though `b7bce05d` already fixed their component logic below). Landed as
     `aa855992` on `main` — pure schema addition, `GallerySection.astro`/`FaqSection.astro`/
     `BeforeAfter.astro`/`CtaForm.astro` themselves needed **no** code change on `main` (already
     fixed by `b7bce05d`, confirmed: cherry-picking the fix commit onto `main` produced a 0-diff
     no-op for all four `.astro` files).
  2. **`codex/header-landmark`-side real bug**: that branch predates `b7bce05d` and nobody's
     cherry-picked it over, so `GallerySection.astro`/`FaqSection.astro`/`BeforeAfter.astro`/
     `CtaForm.astro` on that lineage still hardcoded `<Heading level="h2">` for real. This matters
     because the **actual promoted Whitinsville site is built from a `codex/header-landmark`-based
     checkout** (it needs that branch's `landing` content collection, which `main` still lacks — see
     Next steps), so `all-cases.html`'s only content (a `gallery-section` band with no other page
     heading) was genuinely losing its `<h1>` in the real shipped build, not just hypothetically.
     Applied the same `headingLevel` prop-threading fix to those 4 files on a local scratch branch
     (`codex/header-landmark` + this fix, never pushed) to build and promote Whitinsville correctly;
     `main` and `codex/header-landmark` still need this reconciled for real (see Next steps).
  `astro check` clean on `main` after the schema addition (same 118 pre-existing unrelated
  `[...slug].astro` doc-page errors, nothing new).

- **2026-08-05 — 3 real component bugs found via TNT2Astro's first real end-to-end conversion run
  (sound-dentistry).** All are pre-existing, general bugs (not TNT2Astro-specific) that happened to
  become highly visible because TNT CMS pages exercise these code paths on almost every page;
  they equally affect any WordPress site converted through WP2Astro.
  1. **`headingLevel` prop silently ignored by 14 of ~16 components that accept a `heading`
     prop.** `convert.ts`'s `assignPageHeadingOwnership()` is a real, tested, already-relied-upon
     mechanism, but most components hardcoded `<Heading level="h2">` (or `"h1"` for the 3 hero
     components) and never read the `headingLevel` prop passed in at all — so a page whose real
     `<h1>` landed on a `feature-grid`/`feature-split`/etc. section instead of a hero silently
     rendered as `<h2>`, and every page had zero real `<h1>` anywhere. Fixed by threading
     `headingLevel` (default `"h2"`, or `"h1"` for the 3 hero components, preserving prior default
     behavior when the prop isn't explicitly passed) into the actual `<Heading level={headingLevel}>`
     call in: `feature-split/FeatureSplit.astro`, `feature-grid/FeatureGrid.astro`,
     `ctas/cta-center/CtaCenter.astro`, `ctas/cta-split/CtaSplit.astro`, `ctas/cta-form/CtaForm.astro`,
     `info-blocks/faq-section/FaqSection.astro`, `people/team-grid/TeamGrid.astro`,
     `tnt/testimonials-grid/TestimonialsGrid.astro`, `tnt/pricing-section/PricingSection.astro`,
     `tnt/logo-bar/LogoBar.astro`, `tnt/gallery-section/GallerySection.astro`,
     `tnt/before-after/BeforeAfter.astro`, `heroes/hero-split/HeroSplit.astro`,
     `heroes/hero-center/HeroCenter.astro`, `heroes/hero-overlay/HeroOverlay.astro`. (Left
     `tnt/heroes/hero-split-seo/HeroSplitSeo.astro` untouched — its `eyebrow=h1`/`heading=h2` split
     is an intentional local-SEO design documented in its own file header, not a bug.) Reduced
     sound-dentistry's `html-gate` missing-H1 count from 45/89 pages to 5/89 (the remaining 5 were
     the separate blog-listing bug below).
  2. **Blog listing page (`src/pages/blog/[...page].astro`) had zero `<h1>` when no dedicated
     "blog" page exists in the `pages` content collection.** The template only ever gets a
     heading/hero from `blogPage?.data?.pageSections` (a real WordPress page with slug "blog"); a
     site whose blog is entirely a mounted external export (e.g. TNT2Astro's native WordPress WXR
     `/blog` mount, which has no matching local TNT CMS page) had no fallback at all. Added a plain
     `<Heading level="h1">{pageTitle}</Heading>` fallback when `heroSections` is empty.
  3. **`feature-grid` and `testimonial-section` leaked unconsumed object/array props into the DOM
     as literal `columns="[object Object]"` / `items="[object Object],..."` HTML attributes** — same
     failure class as the `Footer.astro` fix from an earlier session (`...htmlAttributes` spread
     picking up props the component doesn't actually consume). `FeatureGrid.astro`'s
     `variant`/`gap`/`minItemWidth`/`maxItemWidth`/`columns` (real props the vision-pipeline's
     "source-rows" recipe emits, not yet wired into this component's own hardcoded `<Grid>` layout)
     and `TestimonialSection.astro`'s `heading`/`items` (a real, already-documented gap — see
     `WP2Astro/packages/core/src/capabilities.ts`'s 2026-07-27 note: multi-review data should route
     to `testimonial-carousel` instead, a human decision in Pattern Workbench, not this component)
     are now explicitly destructured out so an unconsumed value never reaches `...htmlAttributes`.
     Found on 22+ of sound-dentistry's 89 built pages; `html-gate`'s `[object Object]` count went
     from 26 to 0.
  - **Committed + pushed (2026-08-05, `b7bce05d`)** — rebased cleanly onto an upstream
    `@astrojs/sitemap` pin-bump (`0e6cb54a`, Tim's independent fix for the same Astro-6-beta
    compatibility issue found via a real CloudCannon build crash) that had landed on `main` in the
    meantime; kept upstream's `^3.7.3` range over this session's exact-pinned `3.7.3` and
    regenerated `package-lock.json` via `npm install --package-lock-only` rather than hand-merging
    the lockfile conflict. `WP2Astro`'s `feat/tnt2astro` branch can merge without waiting on this.

## Next steps

- **CONFIRMED LIVE RISK (2026-08-08) — the `main`/`codex/header-landmark` divergence documented
  below is not hypothetical: the currently-promoted `whitinsville-family-dentistry` site already
  depends on `codex/header-landmark`'s unmerged `landing` content collection for 10 real LP/PPC
  pages** (`lp-fb-implants*`/`lp-implants*`/`ppc-implant-dentist*`). Rebuilding it from `main` alone
  silently drops all 10 (confirmed: 206 pages → 181 by diffing both builds). Do the same
  commit-by-commit safe-tier review this MANUAL already used for the icon kit / FeatureGrid / etc.
  for at least `a1171ae1` (Landing collection) and `9b8c37de` (category/tag archive routes) —
  ideally before the next TNT2Astro run of ANY site with LP pages, not just Whitinsville. Until it
  lands, check any promoted site for a live `src/content/landing/` directory before regenerating it
  from `main`, and use a scratch branch based on `codex/header-landmark` instead if one exists.
  `gallery-section`'s CloudCannon config gap (this session's other finding) is done — see Recent
  changes — but confirm the same "already fixed on main but check codex/header-landmark's own
  component code" pattern doesn't apply to any other `main`-only fix before assuming a
  `codex/header-landmark`-based build has it too.
- **NEW (2026-08-07, latest) — the TNT Fontello SVG icon kit that fixes the empty-gold-circle bug
  lives on `origin/codex/header-landmark`, NOT on `main` — engine is not actually ready for a fresh
  TNT2Astro run yet.** This morning's Easton/Sound WCAG session reported the icon-glyph bug fixed
  (`fontello-map.json` now carries codepoints) — true only for the two hand-patched live sites.
  Verified directly: `main` has no `src/icons/tnt/` folder and no `tnt-fontello-compat.css` at all;
  `emit-tnt-fidelity.ts`'s `installTntIconKit()` (which every TNT fidelity convert calls) silently
  no-ops when these are missing, so a brand-new conversion today ships every source icon class (nav
  chevrons, `#fixed-tabs`, mobile Menu glyph) as an empty box — the exact bug from this morning,
  just now correctly caught by `a11y-gate`'s new glyph detector instead of shipping silently.
  `git log --all` found the actual fix on `origin/codex/header-landmark`
  (`a6fc4ac6 feat(icons): add TNT Fontello as SVG kit`), but that branch is **27 commits / 225
  files ahead of `main`** — also carries a Landing/PPC content collection, WP category/tag taxonomy
  archive routes, testimonial-carousel a11y fixes, a settings contract, blog-listing H1 fixes, and
  a sitemap crash fix, all unreleased. `emit-tnt-fidelity.test.ts`'s `phone.svg` assertion now fails
  on `main` for exactly this reason (325/326 core tests pass). **Needs a decision on how much of
  that branch to merge** (whole branch vs. cherry-pick just the icon kit + compat CSS) before the
  next TNT2Astro run — see matching note in `AGENT-HANDOFF.md`.
  **UPDATE same session: cherry-picked the safe half.** Pulled just the pure-addition files from
  `a6fc4ac6` (all `src/icons/tnt/*.svg`, `fontello-map.json`, `tnt-fontello-compat.css`, README —
  121 files) straight onto `main`, skipping that commit's `Icon.astro`/docs `index.md` changes
  since those depend on `ff0ecb17` (icon-name-resolution hardening), which is still unmerged and
  not required by the automated TNT fidelity path — `installTntIconKit()` only ever needs the
  static assets, not the `<Icon>` component's name-resolution logic (that's for hand-authored
  CloudCallon content, a separate use case). Verified: `emit-tnt-fidelity.test.ts`'s `phone.svg`
  assertion — the one real failure found this session — now passes; full core suite is 326/326.
  Troubleshooting tip carried over from the codex branch's own docs: if empty circles/black
  hamburger boxes ever reappear, check (1) ACB not pulled, (2) `iconKitRoot`/`TNT_ACB_ROOT` path
  wrong, or (3) a new runtime-injected icon class missing from `TNT_RUNTIME_ICONS` in WP2Astro's
  `emit-tnt-fidelity.ts` (already present on `main`, so already covered).   The rest of
  `codex/header-landmark` (Icon.astro hardening, Landing/PPC collection, WP taxonomy routes,
  testimonial-carousel a11y fixes, settings contract, blog H1 fixes, sitemap crash fix — 25 more
  commits) is still unmerged and needs its own review pass — see `AGENT-HANDOFF.md`.
  **UPDATE (same morning) — did a full commit-by-commit review, merged the safe/standalone
  tier.** Cherry-picked 5 more commits onto `main`, resolving 3 real content conflicts by hand
  (all were additive — main and codex had each independently extended the same file, no
  competing logic to reconcile):
  - `ff0ecb17` — Icon component hardening (unmapped icon names degrade to a fallback icon
    instead of crashing the build)
  - `bfb0ebb7` — mobile HeroSplit overflow fix (a real, documented bug: `variant-full-bleed`
    kept a 2-column grid-template at mobile widths, causing ~3x-viewport horizontal overflow)
    + video provider/legacy prop hardening
  - `43c78b15` + `d7c86800` — FeatureGrid's `variant`/`gap`/`minItemWidth`/`maxItemWidth`/
    `columns` props are now actually wired into `<Grid>` instead of just being destructured
    to prevent a DOM leak — **this was the exact gap already logged above** ("recognized but
    not yet wired up"), now closed. Also adds an `inline-heading` variant.
  - `dd4d08ce` — page landmark fix (`BaseLayout`/`Page`)
  - Verified: `astro-component-base` itself builds clean (68 pages, 0 errors), WP2Astro core
    suite still 326/326 after rebuilding against the updated checkout.
  - **Skipped 3 I'd originally flagged as "safe"** after actually attempting them and finding
    real hidden dependencies on unmerged Tier-3 feature commits: `53784398` (blog H1 detection)
    needs `ec00c16e`'s `heroOwnsH1` variable, which doesn't exist without the whole
    utility-header feature; `7143ac2b` + `3ff8002e` (TestimonialCarousel a11y fixes) need
    `62ab6193`'s TestimonialCarousel component, which doesn't exist on `main` at all yet. All
    three go back on the table once/if that Tier-3 work gets reviewed and merged.
- **NEW (2026-08-06) — mobile nav toggle + `#fixed-tabs` have zero CSS/HTML fallback; visibility is
  100% dependent on a late-executing runtime script finishing.** Found chasing a real bug: Holger's
  hamburger + sticky bottom bar intermittently don't render in real Chrome (both normal + Incognito)
  under throttled/Slow-4G-class connections, while lighter sites in the fleet don't hit it. The
  nav-builder script (shared, byte-identical across all six live TNT2Astro sites — not a Holger-only
  bug) constructs `.mean-bar`/`.meanmenu-reveal` purely via JS after full HTML parse, gated behind
  `matchMedia`; there's no static markup or CSS that makes the toggle visible/functional before that
  script runs. Holger's deeper nav tree (18% bigger HTML, ~24% more `<li>`/`<a>`) is what currently
  tips it over the threshold, but the underlying fragility (no graceful degrade path) applies to any
  site with a big enough nav on a slow enough connection. **Fix direction:** the mobile toggle button
  and `#fixed-tabs` bar should be visible/correctly styled/positioned from static HTML + CSS alone
  (no JS required to become visible); JS should only attach open/close *behavior* on top of
  already-rendered markup, not construct the visible structure from scratch. See matching entries in
  `WP2Astro/MANUAL.md`'s 2026-08-06 afternoon Next steps and `do-agents-family` hub canvas Tasks tab.
- `FeatureGrid.astro`'s `variant`/`gap`/`minItemWidth`/`maxItemWidth`/`columns` props are now safely
  destructured (no more DOM leak) but still not actually wired into real layout behavior — the
  vision pipeline's "source-rows" recipe emits richer layout intent than this component currently
  honors. Worth a real look if a future conversion's feature-grid layout looks visually wrong
  compared to source (single-column dense list vs. a real responsive grid).
- `TestimonialSection.astro` vs. `testimonial-carousel` — component-selection currently defaults to
  the single-quote `testimonial-section` even when the source data is clearly multi-item
  (`items[]` + `heading`); per `capabilities.ts`'s existing note, `rankCapabilities` is meant to
  offer both and let a human pick `testimonial-carousel` in Pattern Workbench for that case,
  but an ungated/non-interactive convert run (like `_e2e_tnt2astro_test.py`'s `allow_ungated=True`)
  never gets that human decision, so it silently keeps the wrong default. Worth deciding whether the
  non-interactive default should prefer `testimonial-carousel` when `items.length > 1`.
- Consider whether this repo should join `do-agents`' managed repo-sync list (see the header note
  above) — right now it's easy for a session to make real code changes here and have them sit
  uncommitted/unsynced with no cross-machine visibility, the same failure mode `site-rescues` and
  `WP2Astro-codex` were added to fix.

## Integrations

- Consumed by `WP2Astro`/`WP2Astro-beta` (`scaffold.ts`'s `scaffoldFromBase`) for every converted
  site, WordPress or TNT CMS sourced.
- CloudCannon visual editor reads this repo's `data-prop`/`data-editable` conventions in every
  promoted site.

## Deeper docs

- `README.md` (this repo) — install/dev/build commands, project structure overview.
- `WP2Astro/MANUAL.md` — the conversion pipeline that scaffolds and populates this base.
- `WP2Astro/packages/core/src/capabilities.ts` — the component-catalog/capability contract this
  base's components are matched against during conversion.
