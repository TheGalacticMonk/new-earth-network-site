import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      citySlug: z.string(),
      cityName: z.string(),
      venue: z.string(),
      address: z.string().optional(),
      date: z.coerce.date(),
      time: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      description: z.string(),
      rsvpUrl: z.string().url().optional(),
      status: z.enum(['open', 'few-spots', 'full', 'past']).default('open'),
      capacity: z.number().optional(),
    }),
});

const cities = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cities' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      region: z.string().optional(),
      country: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      summary: z.string(),
      status: z.enum(['active', 'launching']).default('active'),
      organizerName: z.string().optional(),
    }),
});

export const collections = { events, cities };
