import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    hero: z.object({
      badge: z.string().optional(),
      title: z.string(),
      subtitle: z.string(),
      ctaText: z.string(),
      ctaLink: z.string(),
    }),
    about: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .optional(),
  }),
});

export const collections = {
  pages,
};
