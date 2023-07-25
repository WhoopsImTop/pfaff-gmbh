export const state = () => ({
  produkte: [],
  seiten: [],
  kategorien: [],
  kompetenzen: [],
  blogKategorien: [],
  news: [],
  featuredProdukte: [],
  featuredCompetence: [], 
})

export const mutations = {
  setProdukte(state, produkte) {
    state.produkte = produkte
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
  }
}

export const actions = {
  async nuxtServerInit({ commit }, callback) {
    const produkte = await this.$content(
      'produkte/' + this.$i18n.locale
    ).fetch()
    const seiten = await this.$content('seiten/' + this.$i18n.locale).fetch()
    const kategorien = await this.$content(
      'kategorien/' + this.$i18n.locale
    ).fetch()
    const kompetenzen = await this.$content(
      'kompetenzen/' + this.$i18n.locale
    ).fetch()
    const blogKategorien = await this.$content(
      'blogkategorien/' + this.$i18n.locale
    ).fetch()
    const news = await this.$content(
      'blog/' + this.$i18n.locale
    ).fetch()
    commit('setProdukte', produkte)
    commit('setSeiten', seiten)
    commit('setKategorien', kategorien)
    commit('setKompetenzen', kompetenzen)
    commit('setBlogkategorien', blogKategorien)
    commit('setNews', news)
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
