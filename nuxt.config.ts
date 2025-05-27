import { imgDomain } from "./constants/system"

export default defineNuxtConfig({
	ssr: true,
	nitro: {
		preset: 'static',
	},
	devtools: {
		enabled: true
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/scss/_variables.scss" as *;'
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