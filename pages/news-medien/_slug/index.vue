<template>
  <div class="article-column">
    <div class="yearBlock" v-for="(entry, index) in news" :key="index">
      <h2 class="year-identifier">{{ entry.year }}</h2>
      <nuxt-link
        v-for="(article, index) in entry.children"
        :key="index"
        :to="
          '/news-medien/' +
          article.category[0].replace(/ /g, '-').toLowerCase() +
          '/' +
          article.slug
        "
        class="article"
        ><div v-if="article.image" class="article-image">
          <img :src="article.image" />
        </div>
        <div class="article-content">
          <h4 v-html="article.title"></h4>
          <div class="article-informations">
            <span class="article-information">{{ article.category[0] }}</span>
          </div>
          <p v-if="article.excerpt">
            <nuxt-content :document="{ body: article.excerpt }" />
          </p>
        </div>
      </nuxt-link>
    </div>
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
      const news = this.$store.state.news.filter((news) =>
        news.category.includes(slug)
      )
      const groupedNews = {}

      news.forEach((article) => {
        const year = new Date(article.date).getFullYear()

        if (!groupedNews[year]) {
          groupedNews[year] = {
            year,
            children: [],
          }
        }

        groupedNews[year].children.push(article)
      })

      // Konvertiere das groupedNews-Objekt in ein Array von Jahresobjekten
      const groupedNewsArray = Object.values(groupedNews)
      groupedNewsArray.sort((a, b) => b.year - a.year)

      return groupedNewsArray
    },
  },
}
</script>

<style>
</style>