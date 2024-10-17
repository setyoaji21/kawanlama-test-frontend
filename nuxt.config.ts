// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    [
      '@pinia/nuxt',
      { autoImports: ['defineStore', 'acceptHMRUpdate'] },
    ],
    '@nuxt/ui'
  ],
  build: {
    transpile: [
        "@headlessui/vue",
        "@heroicons/vue",
    ],
 },
  imports: {
    dirs: ['store'],
  },
  plugins: [
    '~/plugins/api.ts'
  ],
  css: ['@/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  alias: {
    yup: 'yup',
  },
  vite: {
    optimizeDeps: {
      include: ['yup'],
    },
  },
})
