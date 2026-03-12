import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
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
