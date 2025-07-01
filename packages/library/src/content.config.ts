import { defineCollection, z } from "astro:content";

export const collections = {
  pages: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      content_blocks: z.array(z.record(z.any())).optional(),
    }),
  }),

  components: defineCollection({
    schema: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      name: z.string().optional(),
      spacing: z.string().optional(),
      component: z.string().optional(),
      props: z.record(z.any()).optional(),
      examples: z
        .array(
          z.object({
            name: z.string(),
            slugs: z.string(),
            size: z.string().optional(),
          })
        )
        .optional(),
    }),
  }),
};
