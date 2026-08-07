# TNT icons (`tnt/*`)

SVG conversion of the live TNT Fontello set used across TNT CMS sites
([fontello.css](https://tntwebsites.com/tnticons/css/fontello.css)). Replaces the
render-blocking `tntwebsites.com/.../fontello.woff` download that Lighthouse
flags (~3s font-display on mobile).

## Use with ACB Icon

```astro
import Icon from "@core-elements/icon/Icon.astro";

<Icon name="tnt/phone" size="md" />
<Icon name="tnt/calendar-1" size="md" />
<Icon name="tnt/menu" size="md" />
<Icon name="tnt/location" size="md" />
```

`icon-phone` (Fontello class) → Icon name `tnt/phone`. Full map: `fontello-map.json`.

## Codepoints matter too

`tnt-fontello-compat.css` resolves icons by **class name**, so `<i class="icon-phone">`
paints and a rule that writes the raw glyph does not:

```css
.services ul li:after { content: "\e81a"; font-family: fontello; }
```

There is no selector that can match "an element whose content is `\e81a`", so
these fail silently — the element still reserves its box, which is why they
surface as empty circles rather than as missing markup. Every entry in
`fontello-map.json` now carries its `codepoint` so a broken rule can be traced
back to the icon it meant (`\e81a` → `icon-angle-right`).

Sweep a converted site for them by looking for private-use characters in
computed `content`:

```js
for (const el of document.querySelectorAll("body *")) {
  for (const pseudo of ["::before", "::after"]) {
    const content = getComputedStyle(el, pseudo).content;
    if (/[\ue000-\uf8ff]/.test(content)) console.log(el, pseudo, content);
  }
}
```

## Counts

- **118** SVG glyphs under `src/icons/tnt/`

Prefer these over CDN Fontello on Astro/CloudCannon builds. Carried source CSS
that still references `@font-face fontello` should be stripped or remapped at
convert/emit time.
