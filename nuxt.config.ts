// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/image',
    'nuxt-headlessui',
    'nuxt-directus',
  ],
  headlessui: {
    prefix: 'Headless'
  },
  runtimeConfig: {
    public: {
      directus: {
        url: 'http://localhost:8055/',
      },
    }
  },
  ssr: true,
})