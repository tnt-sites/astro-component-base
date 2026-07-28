import type { CollectionEntry } from "astro:content";

/**
 * Same technique as the `slugifyLabel` helper already duplicated across
 * several building-blocks wrappers (Card, Grid, Split, etc.) -- kept as one
 * shared copy here since the two taxonomy archive route files
 * (src/pages/category/ and src/pages/tag/) need byte-identical behavior to
 * stay consistent with each other, not just internally consistent per file.
 */
export function slugifyTerm(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface TermGroup {
  slug: string;
  label: string;
  posts: CollectionEntry<"blog">[];
}

/**
 * Groups a blog collection's posts by a taxonomy field ("categories" or
 * "tags"), keyed by a slugified term so two differently-cased spellings of
 * the same WordPress term (e.g. "General Dentistry" vs "general dentistry")
 * collapse into one archive route instead of two near-duplicate ones.
 *
 * WP2Astro's exporter captures category/tag NAMES only
 * (`wp_get_post_categories`/`wp_get_post_tags` with `fields: 'names'`) --
 * the conversion pipeline never sees WordPress's own term slugs, so this is
 * a best-effort slugification of the display name, not a byte-identical
 * reproduction of the original `/category/<slug>/` URL. Good enough to give
 * every WordPress category/tag archive a working equivalent route; a future
 * exporter change to also capture real term slugs would let this match
 * WordPress exactly.
 */
export function groupPostsByTerm(
  posts: CollectionEntry<"blog">[],
  field: "categories" | "tags",
): TermGroup[] {
  const groups = new Map<string, TermGroup>();
  for (const post of posts) {
    const terms = (post.data[field] as string[] | undefined) || [];
    for (const rawTerm of terms) {
      const label = rawTerm.trim();
      if (!label) continue;
      const slug = slugifyTerm(label);
      if (!slug) continue;
      let group = groups.get(slug);
      if (!group) {
        group = { slug, label, posts: [] };
        groups.set(slug, group);
      }
      group.posts.push(post);
    }
  }
  return [...groups.values()]
    .map((group) => ({
      ...group,
      posts: group.posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
