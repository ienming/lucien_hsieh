import { googleFontConfig } from "./configs/system";

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

  modules: ['@nuxt/eslint', '@nuxtjs/google-fonts', '@nuxt/content'],
  googleFonts: googleFontConfig,
})