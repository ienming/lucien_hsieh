export default defineNuxtConfig({
	ssr: true,
	devtools: {
		enabled: true,
	},
	css: ['@/assets/index.scss'],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
						@use "@/assets/scss/_variables.scss" as *;
						@use "@/assets/scss/_breakpoints.scss" as *;
					`,
				},
			},
		},
	},
	modules: ['@nuxt/eslint', '@nuxtjs/google-fonts', '@nuxt/image', '@nuxt/icon'],
	runtimeConfig: {
		public: {
			maintenanceMode: process.env.MAINTENANCE_MODE,
		},
	},
	app: {
		head: {
			link: [
				{
					rel: 'icon',
					type: 'image/x-icon',
					href: '/favicon.png',
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
			'Courier Prime': true,
			'IBM Plex Mono': true,
			'IBM Plex Sans': true,
			'Noto Sans Traditional Chinese': true,
		},
	},
	image: {
		cloudinary: {
			baseURL: 'https://res.cloudinary.com/dxu48xzzo/image/upload/',
		},
	},
});
