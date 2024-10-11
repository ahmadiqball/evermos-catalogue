// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: { enabled: true },

  srcDir: 'src/',

  modules: ['@nuxt/eslint', '@pinia/nuxt'],

  imports: {
    autoImport: false,
  },

  css: ['~/designs/styles/index.css'],

  components: ['~/components/core', '~/components/icons'],

  app: {
    head: {
      title: 'Catalogue',

      templateParams: {
        separator: '|',
      },

      titleTemplate: 'Catalogue %separator %s',
    },
  },
});
