<template>
  <div class="article-column article-background">
    <h1 style="margin-bottom: 10px">{{ news[0].title }}</h1>
    <div class="article-informations">
      <span class="article-information" v-if="kategorie[0]">{{
        kategorie[0] ? kategorie[0].categoryTitle : ''
      }}</span>
    </div>
    <nuxt-content class="blog-content" :document="news[0]" />
  </div>
</template>

<script>
export default {
  layout: 'news',
  async asyncData({ $content, app, params, store: { dispatch } }) {
    await dispatch('nuxtServerInit')
    const news = await $content('blog/' + app.i18n.locale)
      .where({ slug: params.slug })
      .fetch()
    const kategorie = await $content('blogkategorien/' + app.i18n.locale)
      .where({ slug: news[0].category[0] })
      .fetch()
    return { news, kategorie }
  },

  head() {
    return {
      title: 'Pfaff GmbH | ' + this.news[0].title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.news[0].excerpt,
        },
      ],
    }
  },
}
</script>

<style>
</style>