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

## Counts

- **118** SVG glyphs under `src/icons/tnt/`

Prefer these over CDN Fontello on Astro/CloudCannon builds. Carried source CSS
that still references `@font-face fontello` should be stripped or remapped at
convert/emit time.
