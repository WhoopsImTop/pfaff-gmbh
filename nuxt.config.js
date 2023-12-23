export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Pfaff GmbH - Wo Kunststoff Karriere macht. - ISO zertifiziert',
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
          'High-Tech-Kunststoff-Teile. Pfaff entwickelt mit modernen Materialien, innovativer Technik und garantieren zertifizierte Qualität unter Reinraumbedingungen.',
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
        type: 'application/javascript',
        src: 'https://sdp.eu.usercentrics.eu/latest/uc-block.bundle.js',
      },
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
    locales: ['de', 'en'],
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
  ],

  plugins: ['~/plugins/jsonld'],

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

  generate: {
    fallback: true,
    routes: [
      '/',
      '/impressum',
      '/datenschutz',
      '/agbs',
      '/produktbeispiele',
      '/kompetenzen',
      '/qualität',
      '/news-medien',
      '/news-medien/allgemeine-news',
      '/news-medien/fachbeiträge',
      '/news-medien/meilensteine',
      '/news-medien/presseartikel',
      '/news-medien/stellenausschreibungen',
      'news-medien/allgemeine-news/in-der-jugend-liegt-die-zukunft',
      'news-medien/stellenausschreibungen/azubi-oder-mitarbeiter-werden',
      'news-medien/allgemeine-news/girls-day-2023-wir-machen-mit',
      'news-medien/stellenausschreibungen/stellenausschreibung-projektmanagement',
      'news-medien/stellenausschreibungen/ausbildungsplatz-verfahrensmechanikerin',
      'news-medien/presseartikel/kraft-and-energie-tanken-furs-business',
      'news-medien/presseartikel/pfaff-around-the-world',
      'news-medien/allgemeine-news/treue-seelen-bei-pfaff',
      'news-medien/presseartikel/genormte-individualitaet',
      'news-medien/fachbeitraege/ein-normenkonformes-medizinprodukt-viel-mehr-als-ein-trinkbecher',
      'news-medien/allgemeine-news/pfaff-bei-der-i-e-messe-2019',
      'news-medien/allgemeine-news/supporten-sie-sippa',
      'news-medien/meilensteine/fabrikhalle-erhaelt-einen-anbau-2018',
      'news-medien/allgemeine-news/fasnet-kummt-nicht-ohne-spenden-aus',
      'news-medien/fachbeitr%C3%A4ge/kunststoffxtra-auf-den-punkt',
      'news-medien/allgemeine-news/die-pfaff-gmbh-bei-den-3d-tagen-in-st-georgen-im-schwarzwald',
      'news-medien/presseartikel/med-engineering-optische-und-taktile-messung-von-praezisionsteilen',
      'news-medien/allgemeine-news/i-e-messe-2017',
      'news-medien/allgemeine-news/auch-2017-bilden-wir-wieder-aus',
      'news-medien/allgemeine-news/i-e-2017-review',
      'news-medien/presseartikel/netzwerk-suedbaden-umfrage-an-unternehmerinnen',
      'news-medien/presseartikel/die-aussichten-der-geschaeftsfuehrerin-corinna-pfaff-fuer-2017',
      'news-medien/fachbeitraege/kunststoffxtra-qualitaetskontroller-reicht-nicht',
      'news-medien/fachbeitr%C3%A4ge/devicemed-pfaffs-peek-rosenbohrer',
      'news-medien/meilensteine/neue-bueroraeume-zum-25-jaehrigen',
      'news-medien/presseartikel/ausbildungslotsen-der-wabe-begleiten-schueler-bei-betriebsbesichtigungen',
      'news-medien/allgemeine-news/25-jahr-feier',
      'news-medien/presseartikel/statement-der-geschaftsfuhrerin-corinna-pfaff-im-netzwerk-sudbaden',
      'news-medien/meilensteine/das-unternehmen-wachst-2016',
      'news-medien/allgemeine-news/weihnachtsspende-fuer-drive-to-help',
      'news-medien/fachbeitraege/medizin-andamp-technik-ersatz-klingt-zu-einfach',
      'news-medien/fachbeitraege/kunststoffxtra-optische-und-taktile-messung-von-prazisionsteilen',
      'news-medien/fachbeitraege/kunststoff-magazin-2k-kunststoffteile-fuer-die-medizintechnik',
      'news-medien/fachbeitraege/devicemed-peek-definiert-die-grenze-fur-selbstlimierende-instrumente',
      'news-medien/presseartikel/k-profi-kleine-groesse-zum-groessen-plus-ausbauen',
      'news-medien/allgemeine-news/betriebsausflug-2016',
      'news-medien/fachbeitraege/medengineering-medizintechnik-aus-den-fokusregionen-deutschland',
      'news-medien/allgemeine-news/teambuilding-bei-der-weber-grill-akademie',
      'news-medien/allgemeine-news/20-jahre-helga-schneider',
      'news-medien/presseartikel/pfaff-gmbh-im-netzwerk-sudbaden',
      'news-medien/allgemeine-news/munsterbauwettbewerb-2013',
      'news-medien/meilensteine/erwerb-eines-grundstucks-2013',
      'news-medien/presseartikel/kanule-wurzelstift-und-hahnbank-20-jahre-prazision',
      'news-medien/meilensteine/20-jaehriges-bestehen',
      'news-medien/fachbeitraege/arburg-today-keine-angst-vorm-bohren',
      'news-medien/meilensteine/zertifizierung-nach-der-qualitatsmanagement-norm-fur-medizin%C2%ADprodukte-2011',
      'news-medien/meilensteine/erweiterung-des-portfolios-2010',
      'news-medien/fachbeitraege/biookonomie-kunststoff-in-klinischer-bestform',
      'news-medien/meilensteine/corinna-pfaff-tritt-in-das-familienunternehmen-als-geschaftsfuhrerin-ein-2007',
      'news-medien/presseartikel/preise-die-belohnen-und-ermuntern',
      'news-medien/meilensteine/meilensteine-2006',
      'news-medien/meilensteine/freiburger-innovationspreis-2004',
      'news-medien/meilensteine/erste-teilnahme-an-der-ie-messe-2003',
      'news-medien/meilensteine/pfaff-gmbh-wird-zum-ausbildungsbetrieb-2001',
      'news-medien/meilensteine/fire-of-creation-award-1997',
      'news-medien/meilensteine/entwicklungsauftrag-fur-das-gehause-einer-elektrischen-zahnburste-1996',
      'news-medien/meilensteine/erweiterung-des-produktportfolios-1995',
      'news-medien/meilensteine/grundung-der-pfaff-gmbh-1992',
      '/kontakt',
    ],
  },
}
