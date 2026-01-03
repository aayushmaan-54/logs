import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/site.config";

export const BLOG_PATH = "src/data/blog";
export const SHORT_READS_PATH = "src/data/short-reads";

const baseSchema = z.object({
  author: z.string().default(SITE.author),
  title: z.string(),
  description: z.string(),
  pubDatetime: z.date(),
  modDatetime: z.date().optional().nullable(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default(["others"]),
  slug: z.string().optional(),
  canonicalURL: z.string().optional(),
  hideEditPost: z.boolean().default(false),
  timezone: z.string().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    baseSchema.extend({
      ogImage: image().or(z.string()).optional(),
    }),
});

const short_reads = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${SHORT_READS_PATH}` }),
  schema: baseSchema,
});

export const collections = { blog, short_reads };
