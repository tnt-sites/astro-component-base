# Astro Component Starter

A modern design system built with Astro. This starter provides a modular foundation for building fast, accessible, and maintainable websites using web fundamentals.

## Features

- 🎨 **Comprehensive Component Starter** - Pre-built components organized by purpose (building blocks, page sections, navigation)
- 🚀 **Built with Astro** - Fast, modern static site generation with minimal JavaScript
- 🎯 **Design Tokens** - CSS variables for consistent theming across your entire site
- 📱 **Fully Responsive** - Mobile-first components that work on all devices
- ♿ **Accessibility First** - Components built with ARIA attributes and semantic HTML
- 🎨 **CloudCannon Integration** - Visual content editing without touching code
- 📝 **Component Documentation** - Built-in documentation for every component
- 🎭 **Theme Support** - Light and dark theme support out of the box
- 🔧 **PostCSS Architecture** - Modern CSS with custom properties and nesting
- 🎯 **CSS Cascade Layers** - Organized style hierarchy for predictable overrides

## Prerequisites

- Node.js >= 24.0.0
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd astro-component-starter
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the site for production
- `npm run build:no-library` - Build without the component starter documentation
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run all linters (JS, CSS, YML)
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Check code formatting
- `npm run format:fix` - Auto-fix formatting issues

## Project Structure

```
src/
├── assets/              # Static assets (images, etc.)
├── component-library/   # Component starter documentation
│   ├── components/      # Documentation components
│   ├── content/         # MDX documentation files
│   ├── data/            # Navigation data
│   └── layouts/         # Documentation layouts
├── components/          # Reusable components
│   ├── building-blocks/ # Core UI components
│   │   ├── core-elements/  # Buttons, headings, text, images
│   │   ├── forms/          # Form controls
│   │   └── wrappers/       # Layout containers
│   ├── navigation/     # Navigation components
│   └── page-sections/  # Full-width page sections
├── content/            # Content collections (blog, pages)
├── data/              # Site data (navigation, SEO, etc.)
├── icons/             # SVG icon library
├── layouts/           # Page layouts
├── pages/             # Astro pages/routes
└── styles/            # Global styles
    ├── variables/     # Design tokens (colors, fonts, spacing)
    ├── base/          # Reset and base styles
    └── themes/        # Theme definitions
```

## Component Categories

### Building Blocks

Foundational UI components designed for reuse within larger structures:

- **Core Elements** - Buttons, headings, text, images, icons, lists
- **Forms** - Inputs, selects, textareas, file uploads, form wrappers
- **Wrappers** - Grids, splits, cards, accordions, carousels

### Page Sections

Pre-built, full-width sections ready to assemble complete page layouts:

- **Heroes** - Eye-catching header sections
- **Features** - Product feature showcases
- **CTAs** - Call-to-action sections
- **Info Blocks** - FAQ and informational content
- **People** - Team grids and testimonials
- **Builders** - Custom sections for flexible page construction

### Navigation

Components that facilitate movement throughout your site:

- **Main Navigation** - Primary site menus
- **Mobile Navigation** - Mobile-friendly menus
- **Side Navigation** - Sidebar navigation
- **Footer** - Site footer components
- **Navigation Bar** - Additional navigation bars

## CSS Cascade Layers

This project uses CSS Cascade Layers to organize styles into a predictable hierarchy. This ensures that component styles can be easily overridden without fighting specificity battles.

### Layer Order

Styles are organized into six layers (in order of precedence):

1. **`reset`** - CSS reset styles (normalize browser defaults)
2. **`base`** - Base typography, form elements, and HTML element styles
3. **`components`** - Reusable component styles (buttons, cards, navigation, etc.)
4. **`page-sections`** - Page section component styles (heroes, features, CTAs, etc.)
5. **`utils`** - Utility classes (e.g., `.visually-hidden`)
6. **`overrides`** - Custom overrides and page-specific styles

Later layers always win over earlier layers, regardless of specificity. This means a simple selector in the `overrides` layer will override a highly specific selector in the `components` layer.

### Using Layers in Components

When creating or modifying components:

- **Building block components** (buttons, headings, forms, etc.) should use `@layer components`
- **Page section components** (heroes, features, CTAs, etc.) should use `@layer page-sections` to have precedence over the base component styles.

## Customization

### Design Tokens

Customize your brand by editing CSS variables:

**Colors** (themes):

- `src/styles/themes/_default.pcss` - Light theme
- `src/styles/themes/_contrast.pcss` - Dark theme

**Typography**:

- `src/styles/variables/_fonts.pcss` - Font families and sizing

**Layout**:

- `src/styles/variables/_content-widths.pcss` - Max content widths
- `src/styles/variables/_spacing.pcss` - Spacing scale

**Colors**:

- `src/styles/variables/_colors.pcss` - Color palette

### Components

All components are fully customizable. Edit component files in `src/components/` to:

- Modify existing components
- Add new props for customization
- Create new components by combining building blocks

## Global Settings (Practice Info / Brand Theme / SEO & Open Graph / Integrations)

Added 2026-07-26, corrected the same day against the live `balcones-family-dental` reference site.
`src/data/practice.json`, `src/data/theme.json`, `src/data/seo.json`, and `src/data/integrations.json`
are the single source of truth for the practice's name/address/phone/hours/social/booking, brand
colors/fonts, global SEO + Open Graph + schema.org defaults, and public analytics/call-tracking/
accessibility/form IDs — edit these once (in CloudCannon's "Practice Info" / "Brand Theme" /
"SEO & Open Graph" / "Integrations" collections, under the "Site Settings" group, in that order)
rather than hunting through header/footer/schema components for a hardcoded copy.

- `src/utils/siteSettings.ts` is the adapter: `getMainNav()`/`getFooter()` merge `practice.json`'s
  facts into the shapes `mainNav.json`/`footer.json` already expect, and only override an item when
  real evidence exists (an empty `practice.json` falls through to whatever the base template
  shipped — it never blanks real content). **Every route that renders a page must call
  `getMainNav()`/`getFooter()` itself (or rely on `Page.astro`'s defaults) — never import
  `mainNav.json`/`footer.json` directly**, or the merge never happens on that route. (`src/pages/
  [...slug].astro` did exactly this until 2026-07-26; watch for the same mistake in any new route.)
- `BaseLayout.astro` derives page `<title>`/canonical/Open Graph from `seo.json` and the GA4
  bootstrap script from `integrations.json` (with an optional `PUBLIC_GA4_ID` env override for
  local testing) — there is no hardcoded analytics fallback ID anywhere in this repo.
  `callTracking`/`accessibility` are captured in `integrations.json` but not yet wired into a
  runtime script tag (same status as the reference site — no call-tracking/accessibility-widget
  injection exists anywhere yet).
- `StructuredData.astro` takes `practice`/`seo`/`canonical`(/optional `article`) props and emits a
  single `@graph` of `Organization`(or a more specific type like `Dentist`)+`WebSite`(+`Article`
  when given) — this is what makes the phone number/address consistent across every page instead
  of being independently baked into each one.
- **Per-page overrides**: a page's frontmatter `seo` object (`metaTitle`/`metaDescription`/
  `canonical`/`openGraphImage`/`openGraphImageAlt`/`robots`) takes precedence over the flat
  `title`/`description`/`image`/`canonical` fields, which take precedence over the site defaults in
  `seo.json`. A page's `h1` field overwrites whichever page section renders the visible `<h1>` (see
  `Page.astro`'s `applyPageH1`), keeping the meta title and visible heading independently editable
  without drifting apart. A page's hidden `provenance` block records WP2Astro conversion evidence
  when the page came from a WordPress conversion. `locationId` is schema-only today (no active
  multi-location switching logic yet).
- **Blog posts**: a post's frontmatter `schema` object (`type`/`authorType`/`authorName`/
  `dateModified`/`image`) overrides the Article/BlogPosting entry `StructuredData.astro` emits,
  falling back to `seo.json`'s `schema.defaultBlogType` when omitted.
- When a site is generated by WP2Astro's `convert` command, `practice.json`/`seo.json`/
  `integrations.json` are populated automatically from the source site's captured shell evidence
  (see `WP2Astro/packages/core/src/settings.ts`) — an unrecoverable fact (e.g. no phone found) is
  left blank rather than guessed, but the JSON shape is always complete (empty strings, never
  omitted keys — an omitted optional key breaks `siteSettings.ts`'s type-checking for that specific
  site, since JSON-module types are inferred from whichever fields are actually present).
  `conversion-report.json`'s `settingsDiagnostics` records what was and wasn't recovered.
- Not yet supported: multi-location practices (`locations.json`) — today every site gets exactly
  one `primaryLocation`; and per-page `seo.*` overrides are editable in CloudCannon but not yet
  auto-populated by `convert` (WP2Astro doesn't capture per-page Yoast/RankMath overrides yet).

## CloudCannon Integration

This project is configured for use with [CloudCannon](https://cloudcannon.com/), enabling visual content editing without touching code.

### Configuration Files

Each component includes CloudCannon configuration:

- `*.cloudcannon.inputs.yml` - Defines editor inputs
- `*.cloudcannon.structure-value.yml` - Defines component structures
- `*.cloudcannon.snippets.yml` - Defines editor snippets

## Documentation

The component starter includes comprehensive documentation:

- Component properties and usage
- Code examples
- Design guidelines
- Getting started guide

Visit `/component-library/` in your development server to explore the documentation.

## License

MIT

## Contributing

This is a starter template. Feel free to:

- Customize components to fit your needs
- Add new components following existing patterns
- Modify design tokens to match your brand
- Extend functionality as needed

---

Built with ❤️ using Astro
