<template>
  <div class="article-column">
    <div v-for="(entry, index) in news" :key="index" class="yearBlock" >
      <h2 class="year-identifier">{{ entry.year }}</h2>
      <nuxt-link
        v-for="(article, index) in entry.children"
        :key="index"
        :to="
          '/news-medien/' +
          article.category.replace(/ /g, '-').toLowerCase() +
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
            <span class="article-information">{{ article.category }}</span>
          </div>
          <p v-if="article.shortText">{{ article.shortText }}</p>
          <p v-else>
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
  head() {
    return {
      title: 'News & Medien',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'News & Medien',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'News & Medien',
        },
        {
          property: 'og:title',
          content: 'News & Medien',
        },
        {
          property: 'og:description',
          content: 'News & Medien',
        },
        {
          property: 'og:image',
          content: 'https://pfaffgmbh.com/news-medien.jpg',
        },
        {
          property: 'og:url',
          content: 'https://pfaffgmbh.com/news-medien',
        },
        {
          property: 'og:type',
          content: 'website',
        },
      ],
    }
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