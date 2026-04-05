import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const postSchema = z.object({
  title: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  featured: z.boolean().optional().default(false),
  summary: z.string(),
  socialImage: z.string().optional(),
  useBookFonts: z.boolean().optional().default(false),
});

const dev = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dev' }),
  schema: postSchema,
});

const machineLearning = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/machine-learning' }),
  schema: postSchema,
});

const life = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/life' }),
  schema: postSchema,
});

const violin = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/violin' }),
  schema: postSchema,
});

export const collections = {
  dev,
  'machine-learning': machineLearning,
  life,
  violin,
};
