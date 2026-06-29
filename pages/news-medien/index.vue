<template>
  <div class="article-column">
    <div v-for="(entry, index) in news" :key="index" class="yearBlock">
      <h2 class="year-identifier">{{ entry.year }}</h2>
      <nuxt-link
        v-for="(article, index) in entry.children"
        :key="index"
        :to="'/news-medien/' + article.category + '/' + article.slug"
        class="article"
      >
        <div v-if="article.image" class="article-image">
          <img :src="article.image" :alt="article.title" />
        </div>
        <div class="article-content">
          <h4 v-html="article.title"></h4>
          <div class="article-informations">
            <span class="article-information" v-if="article.category">{{
              article.category
            }}</span>
          </div>
          <div
            v-if="article.shortText"
            v-html="article.shortText ? $md.render(article.shortText) : ''"
          ></div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { buildSeoHead, organizationSchema } from '~/utils/seo'

export default {
  layout: 'news',
  async asyncData({ store: { dispatch, state } }) {
    await dispatch('nuxtServerInit')
    const news = state.news

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

    const groupedNewsArray = Object.values(groupedNews)
    groupedNewsArray.sort((a, b) => b.year - a.year)

    return {
      news: groupedNewsArray,
    }
  },

  head() {
    return buildSeoHead({
      title: 'News & Medien | Pfaff GmbH Spritzguss',
      description:
        'Aktuelle News, Fachbeiträge und Presseartikel der Pfaff GmbH: Medizintechnik, Dentaltechnik, Spritzguss und Firmenentwicklung aus Waldkirch.',
      path: '/news-medien',
      keywords:
        'Pfaff GmbH News, Spritzguss Fachbeiträge, Medizintechnik Presse, Kunststoff News Schwarzwald',
    })
  },

  jsonld() {
    return organizationSchema({
      name: 'Pfaff GmbH | News und Medien',
      url: 'https://pfaffgmbh.com/news-medien',
    })
  },
}
</script>
