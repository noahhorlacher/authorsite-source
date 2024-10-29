// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/image',
    'nuxt-headlessui',
    '@nuxtjs/strapi'
  ],
  headlessui: {
    prefix: 'Headless'
  },
  runtimeConfig: {
    public: {
      strapiUrl: 'http://localhost:1337',
      mediaUrl: '/media-library'
    }
  },
  ssr: true,
})