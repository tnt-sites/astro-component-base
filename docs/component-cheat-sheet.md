# Astro Component Cheat Sheet

For support devs working on TNT CloudCannon sites built from the `travis-template` starter.

1. [**General instructions**](#part-1-general-instructions): get a site, sync it, make or duplicate a component
2. [**Components**](#part-2-components): Heading, Image, Text and the other building blocks, with every option
3. [**Common CloudCannon errors**](#part-3-common-cloudcannon-errors): what the editor's error messages mean and how to fix them

---

# Part 1: General instructions

## One-time setup

You need these installed once:

- **Node.js 24 or newer:** check with `node -v`.
- **Git:** check with `git --version`.
- **Access to the site's GitHub repo** (in the `tnt-sites` organisation).

## Get a site onto your computer

CloudCannon gives you a GitHub link like this:

```
https://github.com/tnt-sites/tahquitz/tree/main
```

`git clone` can't use that link as-is. **Cut off the `/tree/main` part.** That leaves the repo link, which is what you clone:

```
https://github.com/tnt-sites/tahquitz/tree/main
└──────────── clone this ───────────┘└─ cut ──┘
```

Then, in the terminal, go to the folder where you keep your sites and run:

```bash
git clone https://github.com/tnt-sites/tahquitz
cd tahquitz
npm install
npm run dev
```

- `git clone` downloads the site into a new folder named after it (`tahquitz`).
- `cd tahquitz` moves into that folder.
- `npm install` downloads the tools the site needs. It takes a minute the first time.
- `npm run dev` starts the site on your computer.

If the link ends in something other than `/tree/main` (e.g. `/tree/staging`), that last word is the branch CloudCannon is using. Clone that branch instead:

```bash
git clone --branch staging https://github.com/tnt-sites/tahquitz
```

Open **http://localhost:4321** to see the site. The page reloads by itself when you save a file. Press `Ctrl + C` in the terminal to stop it.

You only clone once. After that, just `cd` into the folder and run `npm run dev`.

## Every time you start work: pull first

Editors change the site in CloudCannon, and CloudCannon saves those changes to GitHub. Get them before you start, or you'll be working on an old copy:

```bash
git pull
```

## Send your changes up

```bash
git status                    # see which files you changed
git add .                     # include all of them
git commit -m "What you changed"
git pull                      # grab anything new from CloudCannon first
git push                      # send to GitHub
```

CloudCannon notices the push and rebuilds the site by itself.

**Push rejected?** Someone (usually CloudCannon) saved something after your last pull. Run `git pull`, then `git push` again.

**"Merge conflict"?** You and an editor changed the same lines. Open the files git lists, keep the right version between the `<<<<<<<` and `>>>>>>>` markers, delete the markers, then `git add .`, `git commit` and `git push`.

## Pull fixes from the starter template

Sites made from the `travis-template` starter can pick up later template fixes:

```bash
git fetch template
git merge template/travis-template
```

If git says there's no remote called `template`, add it once:
`git remote add template https://github.com/tnt-sites/astro-component-base.git`

## Make a new component

```bash
npm run new:component
```

1. Type a name, e.g. `Service Badges`.
2. Pick the folder by number. Your choice decides **where editors can add it**:
   - `page-sections/...` → it shows up in the page's **Add section** menu.
   - Other folders (landing-page, pep, building-blocks) only show up in their own menus.
3. The script creates a folder with four files:

| File | What it's for |
|---|---|
| `ServiceBadges.astro` | The markup and `<style>`. This is where you build the component. |
| `service-badges.cloudcannon.inputs.yml` | The fields editors see (text box, image picker, dropdown…). |
| `service-badges.cloudcannon.structure-value.yml` | The name, icon and **starting content** when an editor adds it. Every field the component uses should be listed under `value:`. |
| `service-badges.cloudcannon.snippets.yml` | Lets it be used inside markdown content. Leave it as is. |

4. Build it in the `.astro` file and check it at http://localhost:4321.
5. Every time you add a field to the component, add it to **both** yml files: to `inputs.yml` so editors get the right control, and to `structure-value.yml` so new copies start with a value.

## Duplicate a component (copy one and change it)

Use this when a client wants "the same as X, but different on this page." Copying keeps later changes to one from leaking into the other.

1. **Copy the folder** and give it a new kebab-case name:
   `service-split/` → `service-split-alt/`
2. **Rename the files inside** to match:
   - `ServiceSplit.astro` → `ServiceSplitAlt.astro`
   - `service-split.cloudcannon.*.yml` → `service-split-alt.cloudcannon.*.yml`
3. **Update the structure-value file** (`service-split-alt.cloudcannon.structure-value.yml`):
   - `label:` → the new name editors will see
   - `_component:` → the new folder path, e.g. `page-sections/services/service-split-alt`
   - `_inputs_from_glob:` → the new inputs file path
4. **Update the snippets file** the same way (search it for the old name), or delete it if you don't need it.
5. **Rename the CSS class** in the `.astro` file (`service-split` → `service-split-alt`, in the markup and in `<style>`) so the two components' styles stay separate.
6. **Check nothing still points at the old name:** search the new folder for the old name (`service-split`) and make sure nothing is left.

The folder name and the `.astro` file name have to match (`service-split-alt/` ↔ `ServiceSplitAlt.astro`). If they don't, the block won't show up (see [Part 3](#part-3-common-cloudcannon-errors)).

**⚠️ Don't put numbers in component names.** The site matches folders to files by turning the file name back into a dashed name. The dash in front of a number gets lost on the way, so the names no longer match and the block won't show up:

| Folder | File | What the site turns the file into | Result |
|---|---|---|---|
| `service-split-alt/` | `ServiceSplitAlt.astro` | `service-split-alt` | ✅ Works |
| `service-split-2/` | `ServiceSplit2.astro` | `service-split2` (dash lost) | ❌ Block doesn't show |
| `services-3-col/` | `Services3Col.astro` | `services3-col` (dash lost) | ❌ Block doesn't show |

Name copies with words instead: `service-split-alt`, `service-split-home`, `services-three-col`. This applies to `npm run new:component` too, so type `Service Split Alt`, not `Service Split 2`.

Dashes between words are fine, and the folder needs them (`service-split/` ↔ `ServiceSplit.astro`). Leaving them out breaks the match the other way (`servicesplit/` ≠ `ServiceSplit.astro`).

## One-off changes (e.g. a badge on just one split)

The client wants a badge on **one** Service Split, not on every Service Split across the site.

**Don't** just add the badge to the component's code. The component is shared, so it would show up on **every** page that uses it.

**Instead, pick one:**

| The change is… | Do this |
|---|---|
| Small, like an extra badge, icon or line of text | **Add an optional field** (below). It only shows when an editor fills it in. |
| A different layout, or lots of changes | **Duplicate the component** ([see above](#duplicate-a-component-copy-one-and-change-it)) and use the copy on that one page. |

### Add an optional field

The example adds an optional badge to Service Split. It's done in three files in the component's folder.

**1. `service-split.cloudcannon.inputs.yml`:** add the fields editors will see:

```yaml
badgeSource:
  type: image
  comment: Optional badge shown next to the heading. Leave empty for no badge.
  options:
    paths:
      uploads: src/assets/images
      static: ""
badgeAlt:
  type: text
  comment: Alt text for the badge.
```

**2. `service-split.cloudcannon.structure-value.yml`:** add them under `value:` as **empty**, so new Service Splits start with no badge:

```yaml
value:
  _component: page-sections/services/service-split
  # ...existing fields...
  badgeSource: ""
  badgeAlt: ""
```

**3. `ServiceSplit.astro`:** read the fields, and only show the badge **if there is one**:

```astro
---
const {
  // ...existing props...
  badgeSource = "",
  badgeAlt = "",
} = Astro.props;
---

{badgeSource && (
  <figure class="service-split-badge">
    <Image source={badgeSource} alt={badgeAlt}
      widths={[120, 240]} sizes="120px"
      data-prop-src="badgeSource" data-prop-alt="badgeAlt" />
  </figure>
)}

<style>
  .service-split-badge :global(.image) { max-width: 120px; margin: 0; }
</style>
```

- `{badgeSource && ( … )}` is what makes it a one-off. Sections with no badge skip it, so they look exactly as before.
- Sizing the badge: see [Small images](#small-images-icons-badges-logos).

**4. Add the badge to the one section:** in CloudCannon, open that page, click the section and upload the badge. Or add `badgeSource:` and `badgeAlt:` to that section in the page file.

The other Service Splits on the site don't need changing. They have no badge field, so nothing shows and no error appears.

**Check which pages use a component** before you change it. Search the content for its name:

```bash
grep -rln "page-sections/services/service-split" src/content
```

## Add a list of things (cards, images, badges)

Use a **list** when editors need to add as many of something as they like: a grid of cards, a row of images, a set of badges. In CloudCannon, editors get **Add**, **Remove** and drag-to-reorder buttons for the list in the sidebar.

Every list works the same way: **a list of items, where each item is a small group of fields**. A card might have an image, a title and some text. A gallery image just has an image and its alt text.

The example below is a **Service Cards** section: a row of cards that wraps onto new lines.

### 1. Decide what one item looks like

In the page file, a Service Cards section with two cards looks like this:

```yaml
pageSections:
  - _component: page-sections/services/service-cards
    heading: Our Services
    cards:                                   # ← the list
      - imageSource: /src/assets/images/cleaning.jpg   # ← card 0
        imageAlt: Patient getting a cleaning
        title: Cleanings
        text: Gentle checkups and cleanings for the whole family.
        link: /preventive-dentistry/
      - imageSource: /src/assets/images/implant.jpg    # ← card 1
        imageAlt: Dental implant model
        title: Dental Implants
        text: A permanent fix for missing teeth.
        link: /dental-implants/
```

### 2. Add the fields editors will see

In `service-cards.cloudcannon.inputs.yml`:

```yaml
cards:
  type: array
  comment: The cards. Add, remove or drag to reorder.
cards[*].imageSource:
  type: image
  comment: Card image.
  options:
    paths:
      uploads: src/assets/images
      static: ""
cards[*].imageAlt:
  type: text
  comment: Alt text for the card image.
cards[*].title:
  type: text
  comment: Card heading.
cards[*].text:
  type: textarea
  comment: Short description.
cards[*].link:
  type: url
  comment: Page the card links to.
```

`cards[*].title` means "the `title` field on **every** card".

### 3. Give new sections some starting cards

In `service-cards.cloudcannon.structure-value.yml`, under `value:`, add two or three example cards. When an editor clicks **Add**, CloudCannon copies an existing card, so there has to be at least one to copy:

```yaml
value:
  _component: page-sections/services/service-cards
  heading: Our Services
  cards:
    - imageSource: ""
      imageAlt: ""
      title: Service name
      text: Short description of the service.
      link: ""
    - imageSource: ""
      imageAlt: ""
      title: Service name
      text: Short description of the service.
      link: ""
```

### 4. Show the cards in the component

In `ServiceCards.astro`, loop over the list with `.map`. Each card gets its index, and the index goes in every editable path:

```astro
---
import CustomSection from "@builders/custom-section/CustomSection.astro";
import Heading from "@core-elements/heading/Heading.astro";
import Image from "@core-elements/image/Image.astro";

const { heading = "", cards = [], ...rest } = Astro.props;
---

<CustomSection class="service-cards" paddingHorizontal="md" paddingVertical="3xl" maxContentWidth="2xl" {...rest}>
  <Heading text={heading} alignX="center" data-prop="heading" />

  <ul class="cards">
    {cards.map((card: any, index: number) => (
      <li>
        <a href={card.link}>
          <figure>
            <Image
              source={card.imageSource}
              alt={card.imageAlt}
              aspectRatio="landscape"
              widths={[400, 800]}
              sizes="(max-width: 768px) 100vw, 380px"
              data-prop-src={`cards.${index}.imageSource`}
              data-prop-alt={`cards.${index}.imageAlt`}
            />
          </figure>
          <article>
            <h3 data-editable="text" data-prop={`cards.${index}.title`}>{card.title}</h3>
            <p data-editable="text" data-prop={`cards.${index}.text`}>{card.text}</p>
          </article>
        </a>
      </li>
    ))}
  </ul>
</CustomSection>

<style>
  .service-cards .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    list-style: none;
    margin: 40px 0 0;
    padding: 0;
  }

  .service-cards .cards li {
    flex: 1 1 300px;   /* grow to fill the row, wrap below 300px */
    max-width: 380px;  /* about 3 per row on desktop */
    margin: 0;
  }

  .service-cards .cards a { color: inherit; display: block; text-decoration: none; }
  .service-cards figure { margin: 0; }
  .service-cards article { padding: 20px; }
  .service-cards h3 { margin: 0 0 10px; }
  .service-cards p { margin: 0; }
</style>
```

- **How the row works:** each card is at least 300px wide and at most 380px. The row fits as many as it can (about 3 on desktop, 2 on tablet, 1 on mobile) and wraps the rest onto the next line. No media queries needed.
- **The paths:** `` `cards.${index}.title` `` means "the `title` of card number `index`". Use the same index name in the `.map(...)` and in every path. See [Items in a list](#items-in-a-list-map) for a breakdown.
- Plain tags like `<h3>` and `<p>` can be editable too. They need **both** `data-editable="text"` and `data-prop`. With only `data-prop`, there's no error, but the text can't be clicked to edit.

### A simpler list: just images

Same steps, with fewer fields per item. Page file:

```yaml
images:
  - source: /src/assets/images/office-1.jpg
    alt: Our front desk
  - source: /src/assets/images/office-2.jpg
    alt: A treatment room
```

`inputs.yml`:

```yaml
images:
  type: array
  comment: Gallery images. Add, remove or drag to reorder.
images[*].source:
  type: image
  comment: The image.
  options:
    paths:
      uploads: src/assets/images
      static: ""
images[*].alt:
  type: text
  comment: Alt text for the image.
```

Component:

```astro
<ul class="gallery">
  {images.map((image: any, index: number) => (
    <li>
      <Image
        source={image.source}
        alt={image.alt}
        aspectRatio="square"
        widths={[300, 600]}
        sizes="300px"
        data-prop-src={`images.${index}.source`}
        data-prop-alt={`images.${index}.alt`}
      />
    </li>
  ))}
</ul>
```

Use the same flex CSS as the cards (`flex: 1 1 200px; max-width: 300px;` for smaller tiles). For badges or logos, use the [Small images](#small-images-icons-badges-logos) settings instead.

### Adding a list to a component that's already on pages

Sections already on pages don't have the new list yet. Add it to each one in the page file, with at least one item, so editors have something to copy when they click **Add**. Wrap the list in `{cards.length > 0 && ( … )}` so sections with nothing in it don't show an empty row.

### Copying Services Grid instead?

Services Grid builds its cards a different way: each card is its own editable block, so its paths start at the card (`imageSource`), not at the list (`services.0.imageSource`). That's more set-up (a `_structures` block and an `<editable-array-item>` wrapper). For a new list, use the simpler method above.

### Check it

1. `npm run dev`. All the cards or images show up.
2. Resize the browser: 3 across on desktop, fewer on tablet, 1 on mobile.
3. Push, then in CloudCannon click a card's title and image to edit them. In the sidebar, try **Add**, **Remove** and dragging to reorder.

## Add a new service page

The quickest way is to **copy an existing service page** and change the words and pictures. That way the new page gets the same layout as the others.

### 1. Copy a service page

**In CloudCannon:** go to **Pages**, open the menu next to an existing service page (e.g. Dental Implants) and choose **Clone**. Name the new file after the service.

**Or on your computer:** copy the file in `src/content/pages/`:

```
src/content/pages/dental-implants.md  →  src/content/pages/teeth-whitening.md
```

**The file name becomes the web address:** `teeth-whitening.md` → `yoursite.com/teeth-whitening/`. Use lowercase, with dashes instead of spaces.

### 2. Change the content

At the top of the new file (or in CloudCannon's page settings):

```yaml
title: Teeth Whitening      # ← browser tab and Google title
description: Professional teeth whitening in City, ST.   # ← Google description
```

Then go through every section and replace the copied text and images. Look out for:
- The hero's eyebrow line (e.g. `Service - City, ST`)
- Image `alt` text, which still describes the old service
- Button links that point at the old page

### 3. Link to it from the rest of the site

A new page doesn't show up in the menu by itself. Add it in these places:

| Where | How |
|---|---|
| **Main menu** | CloudCannon **Data → Main Nav** (or `src/data/mainNav.json`). Add it under **Our Services** with `name: Teeth Whitening` and `path: /teeth-whitening/`. |
| **Our Services page** | Add it to the list of services on that page. |
| **Form dropdowns** | If a contact or appointment form has a "Which service?" list, add the new service to it. |

Write links as `/teeth-whitening/`, starting and ending with a slash. Don't use `teeth-whitening.html`; that address doesn't exist.

The **sitemap page** updates itself.

### 4. Check it

1. Run `npm run dev` and open http://localhost:4321/teeth-whitening/
2. Click the new menu link to make sure it goes to the page.
3. Read through the page for leftover text from the old service.
4. Push. CloudCannon rebuilds the site, and the page goes live.

---

# Part 2: Components

Jump to: [Gotchas](#gotchas) · [Brand colors](#brand-colors-brandingjson) · [CustomSection](#customsection) · [Image](#image) · [Small images (icons, badges, logos)](#small-images-icons-badges-logos) · [Heading](#heading) · [Text](#text) · [SimpleText](#simpletext) · [Button](#button) · [ButtonGroup](#buttongroup) · [Icon](#icon) · [Wrappers (Split, Card, Carousel, Grid)](#wrappers-split-card-carousel-grid)

---

## Gotchas

- **Scoped `<style>` only reaches markup in the same file.** For markup from shared components use `:global(...)`: `:global(.image)`, `:global(img)`, `:global(.heading)`, `:global(.text)`, `:global(.button)`, `:global(.button-group)`, `:global(svg)` (icons).
- **Heading/Text/SimpleText set `text-align: start`** through `alignX`. Inside a centred parent, either pass `alignX="center"` or add `text-align: inherit; margin: 0;` in your CSS.
- **They also add `margin-top`** (`--spacing-lg`). Reset it with `margin: 0` (on `:global(.heading)` etc.) when you need tight spacing.
- **`ButtonGroup` is 100% wide.** Inside a flex row pass `width="content"`, or it collapses or overlaps.
- **Don't set a CSS property in `<style>` that a Tailwind class on the same element also sets.** Unlayered scoped CSS always wins.
- **Breakpoints:** mobile `max-width: 768px`, tablet `max-width: 1024px`, desktop `min-width: 1025px`. Tailwind `lg:` = 1025px+ on this starter.
- **Nested fields:** when a prop isn't top-level, tell the visual editor where it lives: `data-prop="hero.heading"` (Heading/Text/Button) or `data-prop-src="image.source" data-prop-alt="image.alt"` (Image).

---

## Brand colors (branding.json)

Each site's colors are set **once**, in CloudCannon's **Branding** screen (saved in `src/data/branding.json`). The site turns them into CSS variables, and components use the variables. When the client changes their green, every component updates by itself.

**Never type a hex code like `#2a7d4f` in a component.** Use the variable instead.

### Which variable each Branding field becomes

| Branding field | CSS variable | Use it for |
|---|---|---|
| `colorBrand` | `--color-brand` | Main brand color: headings, icons, accents |
| `colorBrandSecondary` | `--color-brand-secondary` | Second brand color |
| `colorBrandTertiary` | `--color-brand-muted` | Third brand color (the variable's name is different) |
| `colorBrandSubtle` | `--color-brand-subtle` | A softer brand tint |
| `colorTextOnBrand` | `--color-text-on-brand` | Text sitting **on** a brand-colored background |
| `colorLink` / `colorLinkHover` | `--color-link` / `--color-link-hover` | Links |

Other useful variables that are always there:

| Variable | Use it for |
|---|---|
| `--color-text`, `--color-text-strong`, `--color-text-muted` | Normal, darker and lighter body text |
| `--color-bg`, `--color-bg-surface`, `--color-bg-muted` | Page, card and light-grey backgrounds |
| `--color-bg-brand`, `--color-bg-brand-secondary` | Brand-colored backgrounds |
| `--color-border` | Borders and dividers |

**Seeing plain bright green, yellow, magenta, red or blue on the site?** Those are the starter's placeholder colors. The template's `branding.json` ships with `green`, `yellow` and `#ff00ff`, and empty fields fall back to red/blue/green. Set each one to the client's color on the Branding screen.

### Use them in a component's CSS

```css
.service-cards h3 { color: var(--color-brand); }
.service-cards .tag { background-color: var(--color-bg-brand); color: var(--color-text-on-brand); }
.service-cards li { border: 1px solid var(--color-border); }
```

When you put a brand color behind text, set the text to `--color-text-on-brand` so it stays readable.

### Let editors pick a color

Editors never get a free color picker. Every color option uses one of three **shared dropdown lists**, so the choices are the same everywhere:

| List | For | Options look like |
|---|---|---|
| `_select_data.brandColors` | Text, borders, icons, accents | Brand, Brand Secondary, Text, Text Muted, Link… |
| `_select_data.backgroundColors` | Backgrounds of cards, bars, buttons | None, Base, Surface, Brand, Dark, White… |
| `_select_data.sectionBackgrounds` | Only `CustomSection`'s `backgroundColor` | none, base, surface, accent, brand… |

Example: let editors choose the card title color.

**1. `inputs.yml`:** a dropdown that uses the shared list:

```yaml
titleColor:
  type: select
  comment: Color of the card titles. Leave empty for the default.
  options:
    allow_empty: true
    values: _select_data.brandColors
```

**2. `structure-value.yml`:** start it empty:

```yaml
  titleColor: ""
```

**3. The `.astro` file:** the dropdown saves a value like `var(--color-brand)`. Pass it into the CSS as a variable:

```astro
---
const { titleColor = "", ...rest } = Astro.props;
---

<CustomSection class="service-cards" style={titleColor ? `--card-title-color: ${titleColor}` : undefined} {...rest}>
  ...
</CustomSection>

<style>
  .service-cards h3 { color: var(--card-title-color, var(--color-brand)); }
</style>
```

`var(--card-title-color, var(--color-brand))` means "use the editor's pick, or the brand color if they didn't pick one".

### The client has an extra color

Say the client has a fourth color for promotions.

1. **Add it in Branding:** under **Extra Colors**, add a variable name (with the `--`), e.g. `--color-promo`, and the color.
2. **Use it in CSS with a fallback**, in case a site doesn't have it set: `color: var(--color-promo, var(--color-brand));`
3. **Want editors to be able to pick it too?** Add it to the right shared list in `cloudcannon.config.yml`, under `_select_data` → `brandColors` (or `backgroundColors`):
   ```yaml
   - id: var(--color-promo)
     name: Promo
   ```
   It then shows up in every color dropdown that uses that list.

### Contrast sections

Sections set to `colorScheme: contrast` (light text on a dark background) deliberately **don't** use the brand colors. They use neutral greys so the text stays readable. If a brand color doesn't show in one of those sections, that's why.

## CustomSection

The outer `<section>` for nearly every page section. Handles padding, max width, background colour/image, colour scheme and fonts.

```astro
import CustomSection from "@builders/custom-section/CustomSection.astro";

<CustomSection class="service-split" paddingVertical="3xl" paddingHorizontal="md" maxContentWidth="2xl">
  ...
</CustomSection>
```

| Prop | Values | Default | Notes |
|---|---|---|---|
| `label` | text | | Also becomes the section `id` (slugified) when there's no `id`. |
| `maxContentWidth` | `xs` `sm` `md` `lg` `xl` `2xl` `3xl` | none | Width of the inner `.content`. |
| `paddingHorizontal` | `none` `xs` `sm` `md` `lg` `xl` `2xl` `3xl` | none | |
| `paddingVertical` | `none` `xs` `sm` `md` `lg` `xl` `2xl` `3xl` | `4xl` | `4xl` isn't in the editor dropdown, but it's the code default. |
| `colorScheme` | `inherit` `default` `contrast` | `inherit` | Sets `data-theme`. `contrast` = light text on dark. |
| `backgroundColor` | `none` `base` `surface` `accent` `highlight` `dark` `black` | none | Adds a `bg-*` class. |
| `backgroundGradient` | CSS gradient string | | Sets `--section-bg-gradient`. |
| `backgroundImage` | `{ source, alt, positionVertical, positionHorizontal, priority }` | | Painted as `background-image` on the section (positions: `top`/`center`/`bottom`, `left`/`center`/`right`). |
| `rounded` | boolean | `false` | |
| `fontHeadings` / `fontBody` | id from `src/data/fonts.json` | | Per-section font overrides. |
| `contentSections` | array of blocks | | Editor-built content. Ignored when you pass slot content. |
| `class`, `style`, `id` | | | `style` is merged with the background/font variables, not replaced. |

---

## Image

```astro
import Image from "@core-elements/image/Image.astro";

<Image source={image.source} alt={image.alt} aspectRatio="landscape"
  data-prop-src="image.source" data-prop-alt="image.alt" />
```

| Prop | Values | Default | Notes |
|---|---|---|---|
| `source` | `/src/assets/images/...`, `/images/...` (public) or URL | | Renders nothing if empty (outside the editor). |
| `alt` | text | `""` | |
| `widths` | number array | `[400, 600, 800, 1200, 1600]` | Srcset widths. Shrink for small images (see above). |
| `sizes` | sizes string | `"(min-width: 30em) 50vw, 100vw"` | How wide the image displays. |
| `aspectRatio` | `square` (1:1) `landscape` (4:3) `portrait` (3:4) `widescreen` (16:9) `horizontal-strip` (16:5) | none | Crops with `object-fit: cover`. Leave it off for "natural". Avoid passing `"none"`. |
| `positionVertical` | `top` `center` `bottom` | `center` | Crop focus when `aspectRatio` is set. |
| `positionHorizontal` | `left` `center` `right` | `center` | |
| `rounded` | boolean | `false` | `border-radius: var(--radius-lg)`. |
| `priority` | boolean | `false` | Eager load + `fetchpriority="high"`. Use only for above-the-fold hero images. |
| `editable` | boolean | `true` | `false` turns off inline editing. |
| `data-prop-src` / `data-prop-alt` | field path | `source` / `alt` | Set for nested fields, e.g. `image.source`. |
| `class` | | | Added to the `.image` wrapper div. |

Output: `div.image > picture > (source + img)`. Local `/src/` images are converted to AVIF by Astro. CDN URLs (Cloudinary, Imgix, etc.) are resized through the CDN.

---

## Small images (icons, badges, logos)

### Why `<Image>` makes small images huge
1. **CSS:** `Image.astro` gives `.image picture` and `.image img` `width: 100%`, so the image always fills its container. A 60px logo in a 600px column renders 600px wide.
2. **Srcset:** the defaults are `widths={[400, 600, 800, 1200, 1600]}` and `sizes="(min-width: 30em) 50vw, 100vw"`, so the browser downloads a file sized for half the screen.

### The recipe
Fix both: give `<Image>` small `widths`/`sizes`, and cap the **`.image` wrapper** with `max-width` in the component's scoped style.

```astro
<figure class="badge">
  <Image
    source={badge.source}
    alt={badge.alt}
    widths={[120, 240]}
    sizes="120px"
    data-prop-src="badge.source"
    data-prop-alt="badge.alt"
  />
</figure>

<style>
  .badge :global(.image) {
    max-width: 120px;
    margin: 0 auto;
  }
</style>
```

| Setting | What to use |
|---|---|
| `widths` | `[displayWidth, displayWidth × 2]`. The 2× copy keeps it sharp on retina screens. |
| `sizes` | The width it displays at, e.g. `"120px"`. If that changes by breakpoint: `"(max-width: 1024px) 90px, 120px"`. |
| `aspectRatio` | **Leave it off.** `aspectRatio="none"` still adds the `ratio` class (`"none"` is truthy), which turns on `height: 100%` and `object-fit: cover`. |
| CSS cap | `max-width` on `:global(.image)`, **not** on `img` (the `img` stays at 100% of the wrapper). |
| Alignment | `margin: 0 auto` to centre, `margin: 0` to keep it left-aligned. |

Checked in a build: `PepBannerBenefitsExpire`'s stamp uses `widths={[220, 440]}` and outputs a srcset of only `220w, 440w`.

### Variations

**Different size on mobile:**
```css
.badge :global(.image) { max-width: 120px; margin: 0 auto; }

@media (max-width: 768px) {
  .badge :global(.image) { max-width: 80px; }
}
```

**A row of badges or logos:**
```astro
<ul class="badges block lg:flex justify-center items-center">
  {badges.map((b, i) => (
    <li>
      <Image source={b.source} alt={b.alt} widths={[150, 300]} sizes="150px"
        data-prop-src={`badges.${i}.source`} data-prop-alt={`badges.${i}.alt`} />
    </li>
  ))}
</ul>

<style>
  .badges { gap: 30px; list-style: none; margin: 0; padding: 0; }
  .badges li { margin: 0; }
  .badges :global(.image) { max-width: 150px; margin: 0 auto; }
</style>
```

**Logos of mixed shapes at a common height:** cap the height and let the width follow.
```css
.logos :global(.image) { max-width: 180px; margin: 0 auto; }
.logos :global(.image img) { max-height: 60px; width: auto; margin: 0 auto; }
```

**SVG icons and badges:**
- From `src/assets/images/…`: Astro keeps them as SVG (one file at natural size, no AVIF). `widths`/`sizes` don't matter, but you still need the CSS cap.
- From `public/` (e.g. `/images/logo.svg`): output as a plain `<img>` with no processing. Same CSS cap.

**Header/footer logo** that editors shouldn't change inline: add `editable={false}` (see `MainNav.astro`).

### Don't
- **`sizes="auto" widths={[]}`** (used by some landing-page splits). In the build this outputs an *empty* AVIF `srcset`, so the browser downloads the full-size PNG/JPG. The image still stretches to 100% too.
- **Setting `width` on `img`.** Put the cap on the `.image` wrapper.
- **Leaving out `:global()`.** The `<img>` and `.image` div come from `Image.astro`, so plain scoped CSS won't reach them.

Note: Astro never upscales. Any `widths` value larger than the source file is dropped, so `[120, 240]` on a 150px file gives just `120w`.

---

## Heading

```astro
import Heading from "@core-elements/heading/Heading.astro";

<Heading text={heading} level="h2" size="xl" alignX="center" data-prop="heading" />
```

| Prop | Values | Default | Notes |
|---|---|---|---|
| `text` | inline markdown / HTML | | `**bold**`, `<span>`, line breaks become `<br>`. A wrapping `<p>` is stripped. Slot content also works. |
| `level` | `h1` – `h6` | `h2` | The tag. |
| `size` | `xs` `sm` `md` `lg` `xl` `2xl` `3xl` `4xl` | none (tag's base size) | Visual size, independent of `level`. |
| `alignX` | `start` `center` `end` | `start` | |
| `iconName` | icon name (see [Icon](#icon)) | | |
| `iconPosition` | `before` `after` | `before` | |
| `fontFamily` | CSS font-family | | Inline style. |
| `data-prop` | field path | `text` | |
| `editable` | boolean | `true` | |

Output: `<hN class="heading size-* align-*"><span class="heading-text">…</span></hN>`

---

## Text

Rich text block: full markdown, multiple paragraphs, lists, links.

```astro
import Text from "@core-elements/text/Text.astro";

<Text text={text} data-prop="text" />
```

| Prop | Values | Default | Notes |
|---|---|---|---|
| `text` | markdown (HTML allowed) | `""` | Slot content also works. |
| `alignX` | `start` `center` `end` | `start` | |
| `data-prop` | field path | `text` | |
| `editable` | boolean | `true` | |

Output: `<div class="text align-*">…paragraphs…</div>`

---

## SimpleText

A single `<p>` with a size option. Good for eyebrows, captions, short lines.

```astro
import SimpleText from "@core-elements/simple-text/SimpleText.astro";

<SimpleText text={eyebrow} size="sm" data-prop="eyebrow" />
```

| Prop | Values | Default | Notes |
|---|---|---|---|
| `text` | inline markdown | | Line breaks become `<br>`. |
| `size` | `xs` `sm` `md` `lg` `xl` `2xl` `3xl` `4xl` | `md` | |
| `alignX` | `start` `center` `end` | `start` | |
| `data-prop` / `editable` | | `text` / `true` | |

---

## Button

Usually rendered through `ButtonGroup`, but can be used alone.

```astro
import Button from "@core-elements/button/Button.astro";

<Button text="Book Now" link="/contact/" variant="primary" size="lg" iconName="icon-calendar" />
```

| Prop | Values | Default | Notes |
|---|---|---|---|
| `text` | inline markdown | `""` | |
| `link` | URL | | Sets `href` (when `element="a"`). |
| `modalTarget` | modal id | | Turns it into a `<button>` that opens that modal. |
| `element` | `a` `button` | `a` | |
| `iconName` | icon name | | |
| `iconPosition` | `before` `after` | `before` | |
| `hideText` | boolean | `false` | Icon-only. The text becomes the `aria-label`. |
| `variant` | `primary` `secondary` `tertiary` `ghost` `text` | `primary` | |
| `size` | `sm` `md` `lg` | `md` | |
| `width` | `none` `xs` `sm` `md` `lg` `xl` | `md` | Min width. `xs` isn't in the editor dropdown. |
| `borderRadius` | `default` `none` `xs` `sm` `md` `lg` `xl` `2xl` `3xl` `4xl` `full` | `default` | |
| `borderWidth` | `default` `none` `xs` `sm` `md` | `default` | |
| `borderColor` | `default` `standard` `subtle` `strong` `brand` `transparent` | `default` | |
| `textColor` | `default` `text` `text-strong` `text-muted` `brand` `text-on-brand` `text-inverse` | `default` | |
| `uppercase` | boolean | `false` | |
| `data-prop` / `editable` | | `text` / `true` | |

---

## ButtonGroup

```astro
import ButtonGroup from "@wrappers/button-group/ButtonGroup.astro";

{buttonSections.length > 0 && <ButtonGroup buttonSections={buttonSections} alignX="center" width="content" />}
```

| Prop | Values | Default | Notes |
|---|---|---|---|
| `buttonSections` | array of Button blocks | | Or pass `<Button>`s as slot content. |
| `direction` | `row` `column` | `row` | |
| `alignX` | `start` `center` `end` | `start` | |
| `width` | `full` `content` | `full` | **Use `content` inside flex rows.** |
| `label` | text | | Becomes the `id`. |
| `editable` | boolean | `true` | |

---

## Icon

```astro
import Icon from "@core-elements/icon/Icon.astro";

<Icon name="icon-phone" size="md" />      <!-- Fontello glyph -->
<Icon name="academic-cap" size="lg" />    <!-- SVG from src/icons/ -->
```

| Prop | Values | Default | Notes |
|---|---|---|---|
| `name` | `icon-*` = Fontello glyph; anything else = `src/icons/{name}.svg` (astro-icon) | | `social/...` names get `fill: currentcolor`. |
| `size` | `none` `sm` `md` `lg` `xl` `2xl` `3xl` | `lg` | Font-size based (`md` = `--font-size-xl`, `lg` = `--font-size-2xl`, …). |
| `color` | `default` `blue` `green` `yellow` `orange` `red` `purple` `pink` `cyan` | `default` | |
| `background` | boolean | `false` | Tinted padded background. |
| `alignX` | `start` `center` `end` | | |

Style SVG icons from a parent with `:global(svg)`.

### Fontello names (`FontelloIcon.astro`)

`FontelloIcon` can also be used directly with `count` (1–10) to repeat a glyph, e.g. a 5-star row: `<FontelloIcon name="icon-star" count={5} />`.

| Group | Names |
|---|---|
| Mail | `icon-mail`, `icon-mail-alt`, `icon-comment-empty`, `icon-rss`, `icon-chat`, `icon-quote`, `icon-paper-plane-empty` |
| Users | `icon-user`, `icon-user-md` |
| Social | `icon-facebook`, `icon-facebook-squared`, `icon-facebook-official`, `icon-twitter`, `icon-yelp`, `icon-instagramm`, `icon-pinterest`, `icon-gplus-old`, `icon-gplus-squared`, `icon-gplus`, `icon-youtube`, `icon-youtube-play`, `icon-youtube-squared`, `icon-linkedin`, `icon-linkedin-squared`, `icon-foursquare`, `icon-yahoo`, `icon-wordpress`, `icon-snapchat-ghost`, `icon-google`, `icon-healthgrades`, `icon-localmed` |
| Map | `icon-location`, `icon-map`, `icon-map-marker`, `icon-map-o` |
| Phone | `icon-phone`, `icon-phone-squared`, `icon-mobile` |
| Calendar | `icon-calendar`, `icon-calendar-1`, `icon-calendar-2`, `icon-calendar-plus-o`, `icon-clock` |
| Stars | `icon-star`, `icon-star-half`, `icon-star-empty` |
| Arrows | `icon-menu`, `icon-angle-left`, `icon-angle-right`, `icon-angle-up`, `icon-angle-down`, `icon-angle-double-left`, `icon-angle-double-right`, `icon-angle-circled-left`, `icon-angle-circled-right`, `icon-left-big`, `icon-right-big`, `icon-left`, `icon-right`, `icon-left-dir`, `icon-right-dir`, `icon-up-dir`, `icon-down-dir`, `icon-left-circled`, `icon-right-circled`, `icon-up-circled`, `icon-down-circled`, `icon-left-circle`, `icon-right-circle`, `icon-up-circle`, `icon-down-circle`, `icon-right-circled2` |
| Checkmarks | `icon-ok`, `icon-ok-1`, `icon-ok-circled`, `icon-ok-circle` |
| Plus & minus | `icon-plus`, `icon-minus`, `icon-plus-squared`, `icon-plus-squared-alt`, `icon-minus-squared`, `icon-minus-squared-alt`, `icon-plus-circled`, `icon-minus-circled` |
| Home | `icon-home`, `icon-building` |
| Dental | `icon-tooth`, `icon-endo`, `icon-ortho`, `icon-perio`, `icon-toothcosmetic`, `icon-toothbrush`, `icon-toothbrush-paste` |
| Misc | `icon-tag`, `icon-search`, `icon-dollar`, `icon-circle`, `icon-dot-circled`, `icon-tnt`, `icon-stop`, `icon-pencil`, `icon-attach`, `icon-download`, `icon-picture`, `icon-camera`, `icon-camera-alt`, `icon-help-circled`, `icon-book`, `icon-doc`, `icon-docs`, `icon-doc-text`, `icon-files`, `icon-article-alt`, `icon-cd`, `icon-play`, `icon-pause`, `icon-play-circled`, `icon-play-circled2` |

---

## Wrappers (Split, Card, Carousel, Grid)

These mostly serve the editor's drag-and-drop page builder. Hand-built page sections normally use their own flex markup instead.

### Split (`@wrappers/split/Split.astro`)
| Prop | Values | Default |
|---|---|---|
| `firstColumnContentSections` / `secondColumnContentSections` | block arrays (or `slot="first"` / `slot="second"`) | `[]` |
| `distributionMode` | `half` `third-two-thirds` `two-thirds-third` `quarter-three-quarters` `three-quarters-quarter` `fixed-flexible` `flexible-fixed` | `half` |
| `fixedWidth` | px number (for the fixed modes) | |
| `minSplitWidth` | px; below this it stacks | `700` |
| `verticalAlignment` | `top` `center` `bottom` `stretch` | `top` |
| `reverse` / `reverseOrderOnMobile` | boolean | `false` / `true` |
| `gap` | `xs` – `3xl` | `lg` |

### Card (`@wrappers/card/Card.astro`)
| Prop | Values | Default |
|---|---|---|
| `contentSections`, `beforeContentSections`, `afterContentSections` | block arrays | |
| `showBeforeAfter` | boolean | `true` |
| `maxContentWidth` | `xs` – `3xl` | |
| `paddingHorizontal` / `paddingVertical` | `xs` – `2xl` | |
| `colorScheme` | `inherit` `default` `contrast` | `inherit` |
| `backgroundColor` | `none` `base` `surface` `accent` `highlight` `dark` `black` | |
| `backgroundImage` | same object as CustomSection | |
| `link` | URL (whole card clickable) | |
| `rounded` / `border` | boolean | `false` |

### Carousel (`@wrappers/carousel/Carousel.astro` + `CarouselSlide.astro`)
| Prop | Values | Default |
|---|---|---|
| `slides` | array of `{ contentSections }` | `[]` |
| `autoPlay` / `autoScroll` | boolean | `false` |
| `slideWidthPercent` | number | `100` |
| `minSlideWidth` / `maxSlideWidth` | px | `0` |
| `arrowStyle` | `default` `chevron` `circle` `arrow` | `default` |

### Grid (`@wrappers/grid/Grid.astro` + `GridItem.astro`)
| Prop | Values | Default |
|---|---|---|
| `items` | array of `{ contentSections }` | `[]` |
| `layout` | `start` `center` | `center` |
| `minItemWidth` / `maxItemWidth` | px | `200` / `320` |
| `gap` | `xs` – `3xl` | `md` |

---

# Part 3: Common CloudCannon errors

## Start here: the one idea behind most of these errors

CloudCannon needs to know **which field** each image, text or button list on the page comes from. If you don't tell it, it guesses a default name:

| Element | Field it looks for if you don't say |
|---|---|
| `<Image>` | `source` and `alt` |
| `<Heading>`, `<Text>`, `<SimpleText>`, `<Button>` | `text` |
| `<ButtonGroup>` | `buttonSections` |

If the content actually lives in a field with a different name, CloudCannon looks for the default, finds nothing, and shows an error.

**Reading the path in the error:** `pageSections.3.source` means "the 4th section on the page (counting starts at 0), field `source`".

**What to write, depending on where the content lives:**

| Where the content lives | Example in the code | What to add |
|---|---|---|
| A field called `source` / `alt` / `text` on the section | `source={source}` | Nothing, the defaults work |
| A field with another name | `text={heading}` | `data-prop="heading"` |
| A field inside a group | `text={financing.text}` | `data-prop="financing.text"` |
| A field on an item in a list | `source={award.imageSource}` inside `awards.map(...)` | `` data-prop-src={`awards.${i}.imageSource`} `` |

**Quick rule:** whatever is inside `{ }` goes in the `data-prop`. For list items, swap the item name for `list.${index}`.

### Items in a list (`.map`)

**How the path is built.** Say the page file has an Awards section with two awards:

```yaml
pageSections:
  - _component: .../hero             # ← section 0
  - _component: .../awards           # ← section 1
    awards:
      - imageSource: /award-a.png    # ← award 0
        imageAlt: Best Dentist 2025
      - imageSource: /award-b.png    # ← award 1
        imageAlt: Top Rated
```

To point at the second award's image, follow the indents down and write each step, joined with dots:

```
pageSections . 1 . awards . 1 . imageSource
     │         │     │      │       │
     │         │     │      │       └─ the field
     │         │     │      └─ 2nd award (counting starts at 0)
     │         │     └─ the list inside the section
     │         └─ 2nd section
     └─ CloudCannon adds this part for you
```

In the component you only write the part **after** the section, from the list onwards: `awards.1.imageSource`. Swap the `1` for the index so it works for every award:

```
awards.1.imageSource   →   awards.${i}.imageSource
```

**In the code:** add the index to the `.map` and use it in the path:

```astro
{awards.map((award: any, i: number) => (
  <Image
    source={award.imageSource}
    alt={award.imageAlt}
    data-prop-src={`awards.${i}.imageSource`}
    data-prop-alt={`awards.${i}.imageAlt`}
  />
))}
```

- Use the **same name** for the index in the `.map(...)` and in the path. If the map says `index` and the path says `i`, the build crashes.
- Copy field names from the component's `cloudcannon.inputs.yml` or the page file. Don't guess (`reviewerImage`, not `imageSource`).
- Use backticks `` ` `` and `{ }` for these paths, not plain quotes.

---

## "Failed to render image editable region": "src" … `undefined`

```
Image editable regions expect the "src" key to have a value of type "string"
but instead it was a value of type 'undefined'. ... the full 'data-prop-src'
path was 'pageSections.3.source'.
```

**In plain words:** an image in the 4th section is looking for a field called `source`, and there isn't one.

**Fix:** open the page file and look at how that section stores its image. Then tell the `<Image>` the same name.

#### Example 1: the field has a different name

The page file calls the image `photo`, not `source`:

```yaml
pageSections:
  - _component: page-sections/people/doctor-intro
    heading: Meet Dr. Smith
    photo: /src/assets/images/dr-smith.jpg      # ← the image
    photoAlt: Dr. Smith smiling                  # ← its alt text
```

The component uses `photo` and `photoAlt`, so it has to say so:

```astro
<!-- ❌ Before: looks for "source" and "alt", finds nothing -->
<Image source={photo} alt={photoAlt} />

<!-- ✅ After: points at "photo" and "photoAlt" -->
<Image source={photo} alt={photoAlt}
  data-prop-src="photo" data-prop-alt="photoAlt" />
```

#### Example 2: the field is inside a group

The image sits indented under `photo:`, so it's a group with `source` and `alt` inside:

```yaml
pageSections:
  - _component: page-sections/people/doctor-intro
    heading: Meet Dr. Smith
    photo:                                       # ← the group
      source: /src/assets/images/dr-smith.jpg   # ← photo.source
      alt: Dr. Smith smiling                     # ← photo.alt
```

Write the group name, a dot, then the field name:

```astro
<!-- ❌ Before: looks for "source" on the section itself -->
<Image source={photo.source} alt={photo.alt} />

<!-- ✅ After: points inside the "photo" group -->
<Image source={photo.source} alt={photo.alt}
  data-prop-src="photo.source" data-prop-alt="photo.alt" />
```

**Notice:** in both examples, `data-prop-src` is the same text as what's inside `source={ }`, and `data-prop-alt` matches what's inside `alt={ }`.

**Item in a list?** See [Items in a list](#items-in-a-list-map) above.

If the code really does use plain `source`, the section is missing that field. Add `source: ""` to the page file and to the component's `structure-value.yml`.

## "Failed to render image editable region": "alt" … `undefined`

Same as above, but for the alt text (`pageSections.3.alt`). Leaving `data-prop-alt` off doesn't help, because it still looks for `alt`.

- **There is an alt field:** point `data-prop-alt` at it, like the examples above.
- **There's no alt field** (the image is decorative, or the alt is written in the code, like `alt=""`). Don't change the shared `Image` component. Add an alt field instead:
  1. Add a text field next to the image in the component's `cloudcannon.inputs.yml`:
     ```yaml
     "reviews[*].reviewerImageAlt":
       type: text
       comment: Usually leave empty, since the reviewer's name is shown next to the photo.
     ```
  2. Add the key to **every existing item** in the page file: `reviewerImageAlt: ""` (empty is fine). CloudCannon copies existing items when an editor adds a new one, so they all need it.
  3. Point the image at it: `` alt={review.reviewerImageAlt} data-prop-alt={`reviews.${index}.reviewerImageAlt`} ``

## "Failed to render text editable region": `undefined`

```
Text editable regions expect to receive a value of type "string" but instead
received a value of type 'undefined'. ... the full 'data-prop' path was
'pageSections.2.text'.
```

**In plain words:** some text in the 3rd section is looking for a field called `text`, and there isn't one. `Heading`, `Text`, `SimpleText` and `Button` all look for `text` unless told otherwise.

**Fix:** add `data-prop` pointing at the real field:

```astro
<Heading text={heading} data-prop="heading" />
<Text text={financing.text} data-prop="financing.text" />
<Text text={dentist.bio} data-prop={`dentists.${index}.bio`} />
```

Plain HTML tags work the same way, but they also need `data-editable="text"`: `` <h3 data-editable="text" data-prop={`ways.${index}.title`}>{way.title}</h3> ``

If the code really does use plain `text`, the section is missing that field. Add `text: ""` to the page file and to the component's `structure-value.yml`.

**Text written straight into the code** (e.g. `<Button text="Call Us" />`) isn't in any field. Add `editable={false}`.

## "Failed to render array editable": `undefined`

```
Array editable regions expect to receive a value of type "array" but instead
received a value of type 'undefined'. ... the full 'data-prop' path was
'@file[src/data/home.json].content_blocks'.
```

**In plain words:** CloudCannon went looking for a list (here, `content_blocks` in `src/data/home.json`) and it isn't there.

**If the list is missing from the file:**
1. Open the file from the message. If there's no `@file[...]`, it means the page you're editing.
2. Look for the name after the dot (`content_blocks`).
3. **Not there?** Add `content_blocks: []`.
4. **There, but blank** (`content_blocks:` with nothing after it)? Add `[]`.
5. **Spelled differently** (`contentBlocks`)? Make the file and the code match. Capitals count.

**If it's a button list inside a group** (e.g. the buttons live at `financing.buttonSections`): `ButtonGroup` always looks for `buttonSections` on the section, so it can't find them. Two options:
- Turn editing off for that group: `<ButtonGroup buttonSections={financing.buttonSections} editable={false} />`
- Or, if the site's `ButtonGroup.astro` has the `propName` option (added on Tahquitz, not on the starter yet), pass the real path: `propName="financing.buttonSections"`.

Adding `= []` in the component's code does **not** fix this. CloudCannon checks the file, not the code.

## A block doesn't show up ("Component not found" in the terminal)

**In plain words:** the block's `_component` name doesn't match a folder.

**Fix:** `_component` must be the folder path, and the folder must match the file name:

```
src/components/page-sections/services/service-split/ServiceSplit.astro
→ _component: page-sections/services/service-split
```

If someone renamed or moved the folder, move it back or update `_component` everywhere it's used.

---

## Turning editing off

If something doesn't need to be edited on the page (e.g. an image inside a card link, or fixed text), turn editing off:

```astro
<Image source={card.image} alt="" editable={false} />
```

Use `editable={false}`, **not** `editable="false"`. The quoted version counts as "on", so the error stays.

## Fixed it, but the error is still there?

CloudCannon only sees your changes **after you push**. If you fixed it locally but haven't pushed, CloudCannon is still showing the old code.

## Check before handing off a site

1. In the terminal, from the site folder, list every image, text and button inside a list:
   ```bash
   grep -rn -A8 "\.map((" src/components/page-sections | grep -E "<(Image|Text|Button|ButtonGroup)"
   ```
   Each one should have a real `data-prop` path or `editable={false}`.
2. Run `npm run build` and make sure it finishes without errors.
3. Push, open the pages in CloudCannon, and click through each section to make sure no error banners show up.
