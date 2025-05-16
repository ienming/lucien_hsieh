// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables.scss" as *;'
        }
      }
    }
  },

  modules: ['@nuxt/eslint', '@nuxtjs/google-fonts', '@nuxt/content', '@nuxt/image'],
  googleFonts: {
    families: {
      Inter: true,
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