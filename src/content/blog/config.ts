import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string(),
    excerpt: z.string(),
    slug: z.string(),
  }),
});

export const collections = { blog };
