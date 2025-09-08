import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
	collections: {
		project: defineCollection({
			type: 'page',
			source: 'project/*.md',
			schema: z.object({
				draft: z.boolean(),
				password: z.string(),
				title: z.string(),
				subtitle: z.string(),
				tagline: z.string(),
				year: z.string(),
				credits: z.array(z.object({
					cate: z.string(),
					to: z.string(),
				})),
				type: z.string(),
				tags: z.array(z.string()),
				libraries: z.string(),
				cover: z.string(),
				links: z.array(z.object({
					label: z.string(),
					url: z.string(),
				})),
				about: z.string(),
				intros: z.string(),
			}),
		}),

		fragments: defineCollection({
			type: 'data',
			source: 'fragments/*.json',
			schema: z.object({
				title: z.string(),
				images: z.array(z.object({
					title: z.string(),
					desc: z.string(),
					url: z.string().url(),
				})),
				desc: z.string(),
				tags: z.array(z.string()),
				date: z.string(),
			}),
		}),
	},
})
