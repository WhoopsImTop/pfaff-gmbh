<template>
  <div class="article-column">
    <nuxt-link
      v-for="(article, index) in news"
      :key="index"
      :to="
        '/news-medien/' +
        article.category[0].replace(/ /g, '-').toLowerCase() +
        '/' +
        article.slug
      "
      class="article"
    >
      <div class="article-content">
        <h4 v-html="article.title"></h4>
        <div class="article-informations">
          <span class="article-information"
            >Geschrieben am:
            {{
              new Date(article.date).toLocaleDateString('DE-de') ||
              new Date(article.createdAt).toLocaleDateString('DE-de')
            }}</span
          >
          <span class="article-information">{{ article.category[0] }}</span>
        </div>
        <p v-if="article.content">
          {{
            article.content.length <= 200
              ? article.content
              : article.content.slice(0, 200) + '...'
          }}
        </p>
      </div>
      <div v-if="article.image" class="article-image">
        <img :src="article.image" />
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'news',
  async asyncData({ $content, app, store: { dispatch } }) {
    await dispatch('nuxtServerInit')
  },
  computed: {
    news() {
      let slug = this.$route.params.slug.toLowerCase().split(' ').join('-')
      slug = slug.replace(/ä/g, 'ae')
      slug = slug.replace(/ü/g, 'ue')
      slug = slug.replace(/ö/g, 'oe')
      slug = slug.replace(/ß/g, 'ss')
      return this.$store.state.news.filter((news) =>
        news.category.includes(slug)
      )
    },
  },
}
</script>

<style>
</style>