import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "zod";

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
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
  locationId: z.string().optional(),
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
  renderMode: z.enum(["legacy-static", "native-acb", "landing-static", "blog-native"]).optional(),
  sourceStylesheets: z.array(z.string()).default([]),
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
  /** WordPress category names; powers best-effort category archive routes. */
  categories: z.array(z.string()).default([]),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: blogPostSchema,
});

const landingCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/landing" }),
  // Campaigns use the normal page-section contract, but stay in a separate
  // collection so CloudCannon can distinguish them from indexable site pages.
  schema: pageSchema,
});

export const collections = {
  pages: pagesCollection,
  landing: landingCollection,
  "docs-pages": docsPagesCollection,
  "docs-components": docsComponentsCollection,
  blog: blogCollection,
};
