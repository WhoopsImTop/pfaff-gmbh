export const state = () => ({
  produkte: [],
  seiten: [],
  kategorien: [],
  kompetenzen: [],
  blogKategorien: [],
  news: [],
  featuredProdukte: [],
  featuredCompetence: [],
  menu: [],
  menuActive: false,
})

export const mutations = {
  setProdukte(state, produkte) {
    state.produkte = produkte.sort((a, b) => (a.productPosition > b.productPosition ? 1 : -1))
    state.featuredProdukte = produkte.filter((p) => p.featuredProduct)
  },
  setSeiten(state, seiten) {
    seiten.sort((a, b) => (a.menuOrder > b.menuOrder ? 1 : -1))
    seiten = seiten.filter((seite) => !seite.hideInMenu)
    state.seiten = seiten
  },
  setKategorien(state, kategorien) {
    state.kategorien = kategorien
  },
  setKompetenzen(state, kompetenzen) {
    state.kompetenzen = kompetenzen
    state.featuredCompetence = kompetenzen.filter((k) => k.featuredCompetence)
  },
  setBlogkategorien(state, blogKategorien) {
    state.blogKategorien = blogKategorien
  },
  setNews(state, news) {
    news.sort((a, b) => (a.date > b.date ? -1 : 1))
    state.news = news
  },
  setMenu(state, menu) {
    state.menu = menu[0]
  },
  setBurgerActive(state, payload) {
    state.menuActive = payload
  }
}

async function fetchWithLocaleFallback($content, basePath, locale) {
  const localized = await $content(`${basePath}/${locale}`).fetch()
  if (localized.length > 0 || locale === 'de') {
    return localized
  }
  return $content(`${basePath}/de`).fetch()
}

export const actions = {
  async nuxtServerInit({ commit, state }) {
    if (state.news.length) return

    const locale = this.$i18n.locale
    const produkte = await fetchWithLocaleFallback(
      this.$content,
      'produkte',
      locale
    )
    const seiten = await fetchWithLocaleFallback(
      this.$content,
      'seiten',
      locale
    )
    const kategorien = await fetchWithLocaleFallback(
      this.$content,
      'kategorien',
      locale
    )
    const kompetenzen = await fetchWithLocaleFallback(
      this.$content,
      'kompetenzen',
      locale
    )
    const blogKategorien = await fetchWithLocaleFallback(
      this.$content,
      'blogkategorien',
      locale
    )
    const news = await fetchWithLocaleFallback(this.$content, 'blog', locale)
    const menu = await fetchWithLocaleFallback(this.$content, 'menu', locale)
    const produkteLinks = []
    const kompetenzenLinks = []
    if (menu[0] && menu[0].links) {
      menu[0].links.forEach((entry) => {
        if (entry.featuredProducts) {
          entry.featuredProducts.forEach((slug) => {
            produkteLinks.push(produkte.find((p) => p.slug === slug))
          })
          entry.featuredProducts = produkteLinks
        } else if (entry.featuredCompetencies) {
          entry.featuredCompetencies.forEach((slug) => {
            kompetenzenLinks.push(kompetenzen.find((k) => k.slug === slug))
          })
          entry.featuredCompetencies = kompetenzenLinks
        }
      })
    }
    commit('setProdukte', produkte)
    commit('setSeiten', seiten)
    commit('setKategorien', kategorien)
    commit('setKompetenzen', kompetenzen)
    commit('setBlogkategorien', blogKategorien)
    commit('setNews', news)
    commit('setMenu', menu)
  },
}

export const getters = {
  getProdukte: (state) => state.produkte,
  getSeiten: (state) => state.seiten,
  getKategorien: (state) => state.kategorien,
  getKompetenzen: (state) => state.kompetenzen,
  getBlogKategorien: (state) => state.blogKategorien,
  getNews: (state) => state.news,
}
