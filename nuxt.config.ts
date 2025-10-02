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
		head: {
			titleTemplate: '%s | Lucien Hsieh',
			link: [
				{
					rel: 'icon',
					type: 'image/x-icon',
					href: '/avatar.png',
				},
			],
		},
		pageTransition: {
			name: 'page',
			mode: 'out-in',
		},
	},
	googleFonts: {
		families: {
			'Urbanist': true,
			'Cossette Titre': true,
			'Noto Sans Traditional Chinese': true,
		},
	},
	image: {
		provider: 'cloudinary',
		cloudinary: {
			baseURL: 'https://res.cloudinary.com/dxu48xzzo/image/upload/',
		},
	},
})
