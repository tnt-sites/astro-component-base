# astro-component-base — Manual

> Last updated: 2026-08-05 · main @ 20e06586 (+ uncommitted headingLevel/prop-leak fixes below) ·
> [tnt-sites/astro-component-base](https://github.com/tnt-sites/astro-component-base) — Latest:
> found and fixed 3 real component-library bugs while proving out `WP2Astro`'s new TNT2Astro
> conversion module end-to-end against a real site (sound-dentistry). All three are general
> correctness fixes, not TNT2Astro-specific — they benefit every WP2Astro/TNT2Astro site built on
> this base, past and future. See Recent changes for detail; see `WP2Astro/MANUAL.md`'s matching
> 2026-08-05 entry for the full TNT2Astro story these fixes were found inside of.
>
> **Not yet in `.cursor/rules/repo-sync.mdc`'s managed-repo list** — this repo lives at
> `C:\tnt-sites\astro-component-base` (sibling to `do-agents`/`tnt-agents`, like `site-rescues`),
> is its own git repo (`tnt-sites/astro-component-base`), and gets real code changes (not just
> per-client data), but isn't part of the fleet's pull-all/sync-all routine today. Worth deciding
> whether to add it, the same way `site-rescues`/`WP2Astro-codex` were added when the gap was
> noticed.

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
  - **Not yet committed** — these are uncommitted working-tree changes as of this entry. Commit +
    push before merging `WP2Astro`'s `feat/tnt2astro` branch, since its E2E proof depends on these.

## Next steps

- Commit + push the 3 fixes above (see Recent changes) before `WP2Astro`'s `feat/tnt2astro` merges.
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
