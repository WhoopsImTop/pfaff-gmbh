export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Schwarzwälder Präzision',
    titleTemplate: '%s | Pfaff GmbH - Wo Kunststoff Karriere macht.',
    htmlAttrs: {
      lang: 'de',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Die Pfaff GmbH entwickelt mit modernen Materialien, innovativer Technik und garantieren zertifizierte Qualität unter Reinraumbedingungen Kunststoffteile in Waldkirch, Schwarzwald.',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'Pfaff GmbH, Kunststoffteile aus dem Schwarzwald, Schwarzwälder präzisions Kunststoffteile, Spritzguss Waldkirch, Pfaff GmbH Waldkirch, Kunststoffteile Waldkirch, Kunststoff Prototypen in kleinauflage, Medizinische Kunstoffteile bestellen',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'preconnect', href: '//app.eu.usercentrics.eu' },
      { rel: 'preconnect', href: '//api.eu.usercentrics.eu' },
      { rel: 'preconnect', href: '//sdp.eu.usercentrics.eu' },
      {
        rel: 'preload',
        href: '//app.eu.usercentrics.eu/browser-ui/latest/loader.js',
        as: 'script',
      },
      {
        rel: 'preload',
        href: '//sdp.eu.usercentrics.eu/latest/uc-block.bundle.js',
        as: 'script',
      },
      { rel: 'icon', type: 'image/svg', href: '/favicon.svg' },
    ],

    script: [
      {
        id: 'usercentrics-cmp',
        async: true,
        'data-eu-mode': true,
        'data-settings-id': 'KCO4YTbBW',
        src: 'https://app.eu.usercentrics.eu/browser-ui/latest/loader.js',
      },
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-9LBLH36M5N',
      },
      {
        type: 'text/plain',
        'data-usercentrics': 'Google Analytics',
        async: true,
        src: '//www.googletagmanager.com/gtag/js?id=G-337657559',
      },
      {
        type: 'text/plain',
        'data-usercentrics': 'Google Analytics',
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', 'G-337657559');
        `,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/font',
    '~/assets/main',
    '~/assets/main_mobile',
    '~/assets/tablet',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  i18n: {
    locales: ['de'],
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    vueI18nLoader: true,
    skipSettingLocaleOnNavigate: true,
  },

  'nuxt-compress': {
    gzip: {
      threshold: 8192,
    },
    brotli: {
      threshold: 8192,
    },
  },

  markdownit: {
    runtime: true, // Support `$md()`
    preset: 'default',
    linkify: true,
    breaks: true,
    html: true,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/markdownit',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
  ],

  plugins: [
    { src: '~/plugins/jsonld', mode: 'client' },
    { src: '~/plugins/gsap.client.js', mode: 'client' },
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    path: 'content',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    middleware: 'redirect',
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://pfaffgmbh.com',
    gzip: true,
    exclude: ['/admin/**'],
    routes: async () => {
      const { $content } = require('@nuxt/content');

      // Erstelle eine Liste aller Kategorien
      const categories = ['blog', 'kompetenzen', 'produkte'];

      // Initialisiere ein leeres Array für alle dynamischen Pfade
      let dynamicRoutes = [];

      // Durchlaufe jede Kategorie und sammle die dynamischen Pfade
      for (const category of categories) {
        const categoryRoutes = await $content(`${category}/de`).fetch();
        dynamicRoutes = dynamicRoutes.concat(categoryRoutes.map((page) => `/${category}/de${page.path}`));
      }

      return dynamicRoutes;
    },
  },

  generate: {
    fallback: true,
  },
}
