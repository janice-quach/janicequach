import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/blog' }),
  schema: z.object({
    title: z.string().optional(),
    date: z.coerce.string(),
    description: z.string().optional(),
  }),
})

export const collections = { blog }
