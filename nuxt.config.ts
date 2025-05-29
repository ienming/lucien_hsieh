import { imgDomain } from "./constants/system"

export default defineNuxtConfig({
	ssr: true,
	devtools: {
		enabled: true
	},
	app: {
		pageTransition: {
			name: 'page',
			mode: 'out-in',
		},
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/index.scss" as *;'
				}
			}
		}
	},
	modules: [
		'@nuxt/eslint',
		'@nuxtjs/google-fonts',
		'@nuxt/content',
		'@nuxt/image',
		'@nuxt/icon',
	],
	googleFonts: {
		families: {
			Inter: true,
			'Noto Sans Traditional Chinese': true,
		},
	},
	image: {
		domains: [imgDomain],
	},
})