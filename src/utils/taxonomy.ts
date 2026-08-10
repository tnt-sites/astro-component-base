import type { CollectionEntry } from "astro:content";

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
 * WordPress exports currently carry taxonomy names, not canonical term slugs.
 * Collapse case variants onto one best-effort route until ingest captures the
 * original term slug explicitly.
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
