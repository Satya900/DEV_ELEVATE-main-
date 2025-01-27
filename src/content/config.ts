import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.enum(['DSA', 'Web Development', 'System Design', 'OOP', 'Machine Learning']),
    author: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([])
  })
});

export const collections = { blog };