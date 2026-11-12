// Builds the site's color CSS variables from src/data/colors.json, the single
// source of truth for every color editors can pick (CloudCannon: Branding →
// colors.json). Each entry whose id is var(--name) defines --name from its
// `value` (or from `sameAs`, a link to another entry's id), e.g.
// { "id": "var(--color-brand)", "value": "green" } → --color-brand: green,
// { "id": "var(--color-bg-brand)", "sameAs": "var(--color-brand)" } → --color-bg-brand: var(--color-brand).
// The same list feeds the text/background dropdowns (filtered by each entry's
// `text` / `background` flags in the inputs files). _default.pcss only holds
// tokens that aren't in any dropdown.
//
// Every page root must output colorVariablesRule() in its <head>: BaseLayout
// does, and so do the standalone pages (component library, lp-showcase,
// why-1-animation-demo). Without it the dropdown colors are undefined.
import brandingData from "@data/branding.json";
import colorsData from "@data/colors.json";

export const sanitizeCssValue = (value: string) => value.split(/[<>{}]|;/)[0].trim();

/** `--color-brand: green !important; …` for every color. */
export function colorVariablesCss(): string {
  const colorVars = new Map<string, string>();

  for (const entry of (colorsData.all ?? []) as any[]) {
    const variable = String(entry?.id ?? "").match(/^var\(\s*(--[\w-]+)\s*\)$/)?.[1];
    // "Same as" links to another color (e.g. var(--color-brand)) and wins over value.
    const sameAs = typeof entry?.sameAs === "string" ? entry.sameAs.trim() : "";
    const value = sameAs || (typeof entry?.value === "string" ? entry.value.trim() : "");

    if (variable && value && !colorVars.has(variable)) colorVars.set(variable, value);
  }

  // Legacy: before colors.json, brand colors lived in branding.json (colorBrand…)
  // and custom ones in branding.json `extraColors`. Sites that still have those
  // keep them (they win over colors.json) until the values are moved into
  // colors.json and the keys deleted from branding.json.
  const legacyBrandingColors: Record<string, string> = {
    colorBrand: "--color-brand",
    colorBrandSecondary: "--color-brand-secondary",
    colorBrandTertiary: "--color-brand-muted",
    colorBrandSubtle: "--color-brand-subtle",
    colorBrandOn: "--color-brand-on",
    colorTextOnBrand: "--color-text-on-brand",
    colorLink: "--color-link",
    colorLinkHover: "--color-link-hover",
  };

  for (const [key, variable] of Object.entries(legacyBrandingColors)) {
    const value = (brandingData as any)[key];

    if (typeof value === "string" && value.trim()) colorVars.set(variable, value.trim());
  }
  for (const e of (Array.isArray((brandingData as any).extraColors)
    ? (brandingData as any).extraColors
    : []) as any[]) {
    if (e?.variable?.trim() && e?.value?.trim()) colorVars.set(e.variable.trim(), e.value.trim());
  }

  return [...colorVars]
    .map(
      ([variable, value]) => `${sanitizeCssValue(variable)}: ${sanitizeCssValue(value)} !important;`
    )
    .join(" ");
}

/** The full `:root, [data-theme="default"] { … }` rule, for pages without BaseLayout. */
export function colorVariablesRule(): string {
  const css = colorVariablesCss();

  return css ? `:root, [data-theme="default"] { ${css} }` : "";
}
