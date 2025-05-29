import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
	collections: {
		project: defineCollection({
			type: 'page',
			source: 'project/*.md',
			schema: z.object({
				date: z.string()
			})
		})
	}
})
