/**
 * Shared component-path -> Astro component resolution, factored out of
 * ComponentViewer/index.astro (2026-07-23) so the doc-site component viewer
 * and the WP2Astro Pattern Workbench preview route
 * (component-library/workbench-preview/[requestId].astro) can never
 * independently drift on how a component path like
 * "page-sections/heroes/hero-center" (matching capabilities.ts's `component`
 * field in the WP2Astro core package) resolves to a real .astro file.
 *
 * import.meta.glob's pattern must be a static string literal resolved
 * relative to *this* file's own location (a Vite/Astro requirement) --
 * every caller gets the same registry by calling buildComponentRegistry(),
 * not by re-writing the glob call themselves.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AstroComponent = any;

function pascalToKebab(pascal: string): string {
  return pascal
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
}

/**
 * Builds a { "page-sections/heroes/hero-center": Component } map from every
 * .astro file under src/components/. Filenames are converted PascalCase ->
 * kebab-case; when the kebab filename matches its parent folder name (the
 * library's "one component per folder" convention), the filename segment is
 * dropped so the resulting key is the folder path -- exactly the shape
 * capabilities.ts's `component` field already uses.
 */
export function buildComponentRegistry(): Record<string, AstroComponent> {
  const components: Record<string, AstroComponent> = {};
  const componentImports = import.meta.glob("../../components/**/*.astro", {
    eager: true,
  });

  Object.entries(componentImports).forEach(([filePath, mod]) => {
    const relativePath = filePath.replace("../../components/", "").replace(/\.astro$/, "");
    const parts = relativePath.split("/");
    const filename = parts[parts.length - 1];
    const kebabFilename = pascalToKebab(filename);

    if (parts.length > 1 && kebabFilename === parts[parts.length - 2]) {
      parts.pop();
      parts[parts.length - 1] = kebabFilename;
    } else {
      parts[parts.length - 1] = kebabFilename;
    }

    const componentName = parts.join("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const component = (mod as any).default;
    components[componentName] = component;
  });

  return components;
}
