import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
	collections: {
		project: defineCollection({
			type: 'page',
			source: 'project/*.md',
		}),
		
		playroom: defineCollection({
			type: 'data',
			source: 'playroom/*.json',
			schema: z.object({
				title: z.string(),
				image: z.string().url(),
				caption: z.string(),
				tags: z.array(z.string()),
				date: z.string(),
			}),
		}),
	},
})
