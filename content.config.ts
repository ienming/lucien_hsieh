import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
	collections: {
		project: defineCollection({
			type: 'page',
			source: 'project/*.md',
			schema: z.object({
				title: z.string(),
				subtitle: z.string(),
				tagline: z.string(),
				year: z.string(),
				credits: z.array(z.object({
					cate: z.string(),
					to: z.string(),
				})),
				tags: z.array(z.string()),
				cover: z.string(),
				links: z.array(z.object({
					label: z.string(),
					url: z.string(),
				})),
				about: z.string(),
				intros: z.string(),
			}),
		}),
		
		// TODO: 移除
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

		facets: defineCollection({
			type: 'data',
			source: 'facets/*.json',
			schema: z.object({
				title: z.string(),
				images: z.array(z.string().url()),
				desc: z.string(),
				tags: z.array(z.string()),
				date: z.string(),
			}),
		}),
	},
})
