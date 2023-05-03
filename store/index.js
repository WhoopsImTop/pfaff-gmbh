export const state = () => ({
    produkte: [],
    seiten: [],
    kategorien: []
})

export const mutations = {
    setProdukte(state, produkte) {
        state.produkte = produkte
    },
    setSeiten(state, seiten) {
        seiten.sort((a, b) => (a.menuOrder > b.menuOrder) ? 1 : -1)
        seiten = seiten.filter(seite => !seite.hideInMenu)
        state.seiten = seiten
    },
    setKategorien(state, kategorien) {
        state.kategorien = kategorien
    }
}

export const actions = {
    async nuxtServerInit({ commit }, callback) {
        const produkte = await this.$content("produkte/" + this.$i18n.locale).fetch();
        const seiten = await this.$content("seiten/" + this.$i18n.locale).fetch();
        const kategorien = await this.$content("kategorien/" + this.$i18n.locale).fetch();
        commit('setProdukte', produkte)
        commit('setSeiten', seiten)
        commit('setKategorien', kategorien)
    }
}

export const getters = {
    getProdukte: state => state.produkte,
    getSeiten: state => state.seiten,
    getKategorien: state => state.kategorien,
}