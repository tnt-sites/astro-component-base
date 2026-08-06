import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "zod";

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  // Global settings contract (2026-07-26), matching the balcones-family-dental
  // reference implementation: metaTitle/metaDescription/h1 are the primary
  // editorial fields; the nested `seo` object holds the less-frequently-used
  // canonical/social/robots overrides ("Advanced SEO & Social" in CloudCannon).
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  h1: z.string().optional(),
  seo: z
    .object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      canonical: z.string().optional(),
      openGraphImage: z.string().optional(),
      openGraphImageAlt: z.string().optional(),
      robots: z
        .object({
          noindex: z.boolean().optional(),
          nofollow: z.boolean().optional(),
        })
        .optional(),
    })
    .optional(),
  // Multi-location practices: which practice.json/locations.json location this
  // page represents. Not yet consumed by any active logic (single-location
  // sites don't need it) -- schema-only today, same as the reference site.
  locationId: z.string().optional(),
  // Read-only WP2Astro conversion evidence -- populated by `emit.ts` when the
  // page came from a WordPress conversion; absent on hand-authored pages.
  provenance: z
    .object({
      sourceUrl: z.string().optional(),
      wpId: z.number().optional(),
      capturedAt: z.string().optional(),
      contentHash: z.string().optional(),
      conversionStatus: z.string().optional(),
    })
    .optional(),
  wpId: z.number().optional(),
  headerId: z.number().optional(),
  // P0.4 (WP2Astro v4 packet, 2026-07-21): page carries its own local
  // header/footer chrome -- suppress the shared nav/footer instead of
  // rendering both. Must be declared here or Zod silently strips them
  // before Page.astro ever sees the value.
  suppressNav: z.boolean().optional(),
  suppressFooter: z.boolean().optional(),
  pageSections: z.array(z.any()),
});

const docsPageSchema = z.object({
  title: z.string(),
  contentSections: z.array(z.any()),
});

const docsComponentSchema = z.object({
  title: z.string().optional(),
  name: z.string().optional(),
  order: z.number().optional(),
  overview: z.string().optional(),
  spacing: z.string().optional().nullable(),
  component: z.string().optional(),
  component_path: z.string().optional(),
  blocks: z.union([z.record(z.string(), z.any()), z.array(z.record(z.string(), z.any()))]).optional(),
  slots: z
    .array(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        fallback_for: z.string().optional().nullable(),
        child_component: z
          .object({
            name: z.string(),
            props: z.array(z.string()).optional(),
          })
          .optional()
          .nullable(),
      })
    )
    .optional(),
  examples: z
    .union([
      z.array(
        z.object({
          title: z.string().optional(),
          slugs: z.array(z.string()),
        })
      ),
      z.null(),
    ])
    .optional()
    .transform((val: any) => {
      if (!val) return [];

      return val.map((example: any) => ({
        title:
          example.title ||
          (example.slugs?.[0]
            ? example.slugs[0].replace(/-/g, " ").charAt(0).toUpperCase() +
              example.slugs[0].replace(/-/g, " ").slice(1)
            : "Example"),
        slugs: example.slugs,
        size: example.size ?? "md",
      }));
    }),
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: pageSchema,
});

const docsPagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/component-library/content/pages" }),
  schema: docsPageSchema,
});

const docsComponentsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/component-library/content/components" }),
  schema: docsComponentSchema,
});

const blogPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  author: z.string().default("Anonymous"),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
  // WordPress category names (wp_get_post_categories, fields:'names') --
  // backs src/pages/category/[category]/[...page].astro the same way tags
  // backs src/pages/tag/[tag]/[...page].astro.
  categories: z.array(z.string()).default([]),
  // Optional per-post overrides for the Article/BlogPosting schema.org entry
  // StructuredData.astro emits -- falls back to seo.json's `schema.defaultBlogType`
  // when omitted (matches the balcones-family-dental reference implementation).
  schema: z
    .object({
      type: z.enum(["BlogPosting", "Article", "NewsArticle"]).optional(),
      authorType: z.enum(["Organization", "Person"]).optional(),
      authorName: z.string().optional(),
      dateModified: z.coerce.date().optional(),
      image: z.string().optional(),
    })
    .optional(),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: blogPostSchema,
});

const landingCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/landing" }),
  // Same shape as pages — campaigns reuse pageSections + Advanced SEO — but
  // CloudCannon defaults noindex/nofollow and editors keep them out of Pages.
  schema: pageSchema,
});

export const collections = {
  pages: pagesCollection,
  landing: landingCollection,
  "docs-pages": docsPagesCollection,
  "docs-components": docsComponentsCollection,
  blog: blogCollection,
};
