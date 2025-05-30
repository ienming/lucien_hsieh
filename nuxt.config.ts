import { imgDomain } from "./constants/system"

export default defineNuxtConfig({
	ssr: true,
	devtools: {
		enabled: true
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
	runtimeConfig: {
		public: {
			maintenanceMode: process.env.MAINTENANCE_MODE,
		},
	},
	app: {
		pageTransition: {
			name: 'page',
			mode: 'out-in',
		},
	},
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
