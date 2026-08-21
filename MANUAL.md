# astro-component-base — Manual

> Last updated: 2026-08-21 · main @ 97d4e791 (working tree)
> Latest: **Whitinsville's preservation-first ACB baseline now supports Landing campaigns on
> `main` without merging the broad `codex/header-landmark` branch.** The targeted baseline adds
> the `landing` content collection, root routes, CloudCannon collection/schema, forced shell
> suppression + `noindex`, robots metadata plumbing, and LP/PPC/PEP sitemap exclusion needed by
> Whitinsville's 10 existing landing pages. The same preservation pilot then proved category/tag
> archives are required to retain the established 206-route build, so their narrow route/schema
> support was added without taking unrelated branch changes. The page schema now also retains
> preservation metadata (`renderMode` and route-scoped `sourceStylesheets`) instead of stripping it
> during Astro collection parsing; the final isolated candidate passed 99/99 browser checks.
> Existing `main` gallery nested composition and `headingLevel` fixes remain authoritative and
> untouched. See Recent changes for the exact behavior and verification.
> Prior: **`gallery-section` rebuilt with nested Grid/Card/Image composition** instead of
> hand-rolled markup (Tim: "smile gallery and other more complex functionality components can be
> done as nested" — pointed at the Astro Component Starter's docs as "the bible" for this). Found
> two more real component-library findings while auditing for the same pattern: `tnt/testimonials-grid`
> has the identical hand-rolled-avatar problem but isn't on the live WP2Astro path (testimonial bands
> route to `people/testimonial-section` instead — see Next steps), and the starter's own docs sidebar
> lists Modal/Video Modal/Bento Box/Image Carousel wrapper components that don't exist in this repo on
> either `main` or `codex/header-landmark` yet — a real gap if a future component ever needs true
> lightbox/modal behavior (e.g. a click-to-enlarge gallery). See Recent changes.
> Prior: **`gallery-section`'s CloudCannon config didn't exist on `main` at all** (only
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
  including root-level `pages` + `landing` entries, and `blog/[...page].astro` +
  `blog/[...slug].astro`, plus paginated category/tag archive routes).
- `src/content.config.ts` — Astro content-collection Zod schemas (`pages`, `landing`, `blog`) every
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

- **2026-08-21 — `feature-grid` `variant: service-panels` is now real.** WP2Astro has emitted this variant for years (see Grid.astro `looksLikeServicePanels`) but FeatureGrid never put `variant-*` on the section and FeatureItem ignored `backgroundImage`, so converters painted a plain icon grid. Glacier Peak's 3×2 photo service cards were the first live miss. FeatureGrid now adds `variant-${variant}`; FeatureItem paints Card `backgroundImage` for service-panels, skips the extra Learn More line, and links the whole card. CloudCannon structure-value gained `imageSource` / `backgroundImage` / `linkHref`. Dest chrome still has to override dental-clean's `auto-fit minmax(220px)` or a wide viewport wraps 5+1.

- **2026-08-21 — Glacier Peak visual pass: CustomSection discards leftover `heading`/`subtext` (empty strings were leaking as boolean DOM attrs and breaking CC text regions), adds `backgroundColor: brand`, and FeatureItem now paints `imageSource` instead of dropping converter icons.** Dest-only chrome (utility bar, overlay hero, About sidebar) lives in `tnt-sites/glacier-peak-dentistry`.

- **2026-08-21 — CloudCannon Visual Editor: bump `@cloudcannon/editable-regions` 0.0.9 → 0.0.19 and add `@astrojs/react`.** Glacier Peak's first CC open showed red "Failed to render component … I is not a function" on every `pageSections` block (hero-overlay, feature-grid, cta-center, testimonial-section). Header/footer still painted because they are static HTML; Visual Editor re-renders sections via `live-editing.js`. Root cause: ACB jumped to Astro 6 beta (`e9f69aba`) while still on editable-regions 0.0.9, which (a) mocks `createAstro(astroGlobal, props, slots)` while Astro 6 calls `createAstro(props, slots)`, and (b) treats every leftover component as React (`check: () => true`) then calls it as a function. 0.0.10+ reworks the Astro integration for Vite environments; 0.0.19 also needs `@astrojs/react` for its renderer. Converted sites inherit both from `package.json`.

- **2026-08-09 — preservation metadata retained by the copied scaffold.** Added `renderMode` and
  `sourceStylesheets` to the shared page schema so self-contained Landing routes keep their
  explicit renderer and local CSS through Astro content parsing. This closed the last scaffold-side
  gap found by the Whitinsville preservation pilot. The clean 206-route `candidate-site-v9` passes
  the blocking HTML gate and all 99 desktop/tablet/mobile browser acceptance checks.

- **2026-08-09 — category/tag archive parity completed for the Whitinsville 206-route contract.**
  Added the narrow archive routes, shared taxonomy grouping helper, and `categories` blog-schema
  field from the reviewed branch implementation. A clean WP2Astro scaffold built all 206 routes:
  13 `/category/uncategorized/` pages and 2 tag routes in addition to pages, landings, posts, and
  blog pagination. The final blocking `html-gate` passed all 206 files.

- **2026-08-09 — preservation-first Landing baseline reconciled from `codex/header-landmark`
  without broad cherry-picks.** This closes the confirmed Whitinsville rebuild gap: all 10 existing
  `src/content/landing/*.md` LP/PPC pages now have a production-capable path on `main`.
  - `landing` uses the same page schema and root-level route shape as `pages`, with support for the
    converted `seo.robots` and read-only `provenance` frontmatter. CloudCannon exposes Landing as a
    separate visual-editor collection and creates files from `.cloudcannon/schemas/landing.md`.
  - The route forces `suppressNav: true`, `suppressFooter: true`, and `robots.noindex: true`
    regardless of imported frontmatter, so campaign pages cannot accidentally render shared chrome
    or become indexable. `nofollow` defaults to `true` when absent but an explicit `false` remains
    respected. `Page.astro`/`BaseLayout.astro` now carry robots through to `astro-seo`.
  - The sitemap excludes the established converted campaign route convention (`lp`, `ppc`, or
    `pep` path tokens); this covers all 10 Whitinsville slugs. A temporary `lp-baseline-check`
    fixture proved a root route builds, emits `noindex`, suppresses header/footer even when the
    fixture requests otherwise, and is absent from the generated sitemap. The fixture was removed
    after verification. `DISABLE_COMPONENT_LIBRARY=true npm run build` passed (17 pages);
    unrestricted `npm run build` remains blocked by the pre-existing component-docs remote-image
    allowlist failure. `astro check` reports 116 existing repo-wide errors, with no errors in the
    changed Landing route after explicit collection-entry typing.
  - The initial Landing-only verification did not include taxonomy routes. The subsequent
    preservation pilot added only those narrow archive dependencies after proving they account for
    15 required Whitinsville routes. No gallery/FeatureGrid/heading-level implementation was taken
    from the older branch, preserving `main`'s newer fixes (`aa855992`, `97d4e791`).

- **2026-08-08 evening — `gallery-section` rebuilt on nested Grid/Card/Image composition, following
  the Astro Component Starter's own docs guidance (`component-docs/building-a-page-section/`:
  "structured sections should reuse existing building blocks" — Tim pointed at this page directly
  as the pattern to follow for "smile gallery and other more complex functionality components").**
  Previously `GallerySection.astro` rendered its own `<div class="tnt-gallery-grid">` with raw
  `<img>`/`<figcaption>` tags and hand-written responsive-grid CSS duplicating what `wrappers/grid`
  already provides. Rebuilt to compose `Grid > GridItem > Card > Image` — the exact same idiom
  `people/team-grid/TeamGrid.astro` already uses for its own image+caption grid — so gallery images
  now get `Image`'s responsive `srcset`/CDN-provider handling instead of a plain `<img>`, and the
  grid gets the same breakpoint/min-max-width behavior every other grid section uses instead of a
  second hand-tuned copy. Followed the sibling `tnt/before-after` component's established convention
  for plain-data (non-component) array items: `editable={false}` on the per-item `Image`/caption,
  since inline click-to-edit isn't wired for `_structures`-defined array items in this base — editing
  happens through the sidebar's array editor instead (`gallery-section.cloudcannon.structure-value.yml`'s
  `_structures.galleryItems`, already correct, untouched). Public `items` prop shape
  (`{src, alt, caption}[]`) is unchanged, so no WP2Astro engine-side change was needed. Landed as
  `97d4e791` on `main`; visually re-verified via a Whitinsville rebuild (see `WP2Astro/MANUAL.md`'s
  matching entry) before promoting.
  - **Found while auditing, not yet acted on:** `tnt/testimonials-grid/TestimonialsGrid.astro` has the
    identical hand-rolled problem (raw `<img>` avatar, custom `.tnt-testimonial-card` grid CSS) and
    this base already has a ready-made `core-elements/testimonial/Testimonial.astro` element (quote +
    avatar + name/description, already built on `Image`) it could delegate to via the same
    `Grid > GridItem > Testimonial` pattern — but `testimonials-grid` isn't actually wired into
    WP2Astro's live conversion path (`vision/compose.ts` routes testimonial bands to
    `people/testimonial-section` instead, confirmed via grep), so this is a lower-priority follow-up,
    not a live-site bug. `tnt/logo-bar/LogoBar.astro` has a much milder version of the same thing (raw
    `<img>` for partner/affiliation logos in a flex row) — lower priority still since logos are
    typically small pre-optimized static assets where `Image`'s responsive-CDN machinery buys little.
  - **Real gap found in the component library, not just this codebase's usage of it:** the Astro
    Component Starter's own docs sidebar (`component-docs/`) lists **Modal, Video Modal, Bento Box,
    and Image Carousel** as available wrapper building blocks — none of the four exist in this repo's
    `src/components/building-blocks/wrappers/` on `main` OR `codex/header-landmark` (confirmed via
    `git ls-tree`). Not currently blocking anything (no live TNT/WP source pattern has needed true
    lightbox/modal-on-click behavior yet — TNT's own gallery pages use a legacy jQuery `leanModal`
    that WP2Astro's band adapter already flattens into a plain image grid, see
    `tnt-bake-to-bands.ts`'s `bandFromGalleryPage`), but worth building before the first real
    click-to-enlarge/lightbox requirement shows up in the fleet, rather than hand-rolling one per site.

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

- **HOMEWORK @work (2026-08-21) — Glacier Peak dest visual QC, not ACB work.** `service-panels`, CustomSection leftover heading/subtext discard, and `@cloudcannon/editable-regions` 0.0.19 + `@astrojs/react` ship in this wrap. Do **not** re-run convert over `tnt-sites/glacier-peak-dentistry`. Dest punch list: that repo's `MANUAL.md` Next steps (thin pages, hub H1s, Home icon tiles, rebuild then re-QC). Engine emit is already on WP2Astro `feat/tnt2astro` @ `0d09492`.

- Rebuild `tnt/testimonials-grid/TestimonialsGrid.astro` on `Grid > GridItem > core-elements/testimonial`
  the same way `gallery-section` was rebuilt this session — low priority since it's not on the live
  WP2Astro path today, but do it before wiring `testimonials-grid` into the engine for real (don't
  wire a known-hand-rolled component into the live path without fixing it first).
- Build **Modal**, **Video Modal**, **Bento Box**, and **Image Carousel** wrapper components (all four
  are documented in the Astro Component Starter's own docs but don't exist in this repo yet — see
  Recent changes) before the first real fleet requirement for click-to-enlarge/lightbox gallery
  behavior shows up, rather than hand-rolling a one-off per site.
- **Landing baseline follow-up:** the confirmed 10-page Whitinsville drop risk is closed in the
  current working tree. Before the next conversion, validate its generated campaign names still
  follow the `lp`/`ppc`/`pep` convention used by sitemap exclusion. Category/tag archive parity is
  now also present and must remain in future clean-scaffold regression builds.
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
