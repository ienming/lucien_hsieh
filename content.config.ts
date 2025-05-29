import { defineContentConfig, defineCollection } from '@nuxt/content';

export default defineContentConfig({
	collections: {
		project: defineCollection({
			type: 'page',
			source: 'project/*.md',
		})
	}
})
