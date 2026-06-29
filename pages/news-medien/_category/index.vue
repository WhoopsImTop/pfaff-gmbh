<template>
  <div class="article-column">
    <breadcrumbs-component :items="breadcrumbItems" />
    <div v-for="(entry, index) in news" :key="index" class="yearBlock">
      <h2 class="year-identifier">{{ entry.year }}</h2>
      <nuxt-link
        v-for="(article, articleIndex) in entry.children"
        :key="articleIndex"
        :to="'/news-medien/' + article.category + '/' + article.slug"
        class="article"
      >
        <div v-if="article.image" class="article-image">
          <img :src="article.image" :alt="article.title" />
        </div>
        <div class="article-content">
          <h4 v-html="article.title"></h4>
          <div class="article-informations">
            <span class="article-information">{{ categoryTitle }}</span>
          </div>
          <p v-if="article.shortText">{{ article.shortText }}</p>
          <p v-else-if="article.excerpt">{{ article.excerpt }}</p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { breadcrumbSchema, buildSeoHead, organizationSchema } from '~/utils/seo'

const CATEGORY_META = {
  'allgemeine-news': {
    title: 'Neuigkeiten | Pfaff GmbH',
    description:
      'Aktuelle Neuigkeiten der Pfaff GmbH: Events, Messeauftritte, Firmenkultur und Entwicklungen aus Waldkirch.',
    name: 'Neuigkeiten',
  },
  meilensteine: {
    title: 'Meilensteine | Pfaff GmbH Geschichte',
    description:
      'Meilensteine der Pfaff GmbH seit 1991: Firmengeschichte, Innovationen und Entwicklung als Spritzguss-Spezialist im Schwarzwald.',
    name: 'Meilensteine',
  },
  fachbeitraege: {
    title: 'Fachbeiträge | Spritzguss & Medizintechnik',
    description:
      'Fachbeiträge der Pfaff GmbH zu Spritzguss, Medizintechnik, PEEK, Dentaltechnik und Präzisions-Kunststoffteilen.',
    name: 'Fachbeiträge',
  },
  presseartikel: {
    title: 'Presseartikel | Pfaff GmbH in der Fachpresse',
    description:
      'Presseartikel und Publikationen über Pfaff GmbH in DeviceMed, KunststoffXtra und weiteren Fachmedien.',
    name: 'Presseartikel',
  },
  stellenausschreibungen: {
    title: 'Stellenausschreibungen | Karriere bei Pfaff',
    description:
      'Offene Stellen und Ausbildungsplätze bei Pfaff GmbH Waldkirch: Spritzguss, Kunststofftechnik und Verfahrensmechaniker.',
    name: 'Stellenausschreibungen',
  },
}

export default {
  layout: 'news',

  async asyncData({ store: { dispatch } }) {
    await dispatch('nuxtServerInit')
  },

  computed: {
    normalizedCategory() {
      let slug = this.$route.params.category.toLowerCase().split(' ').join('-')
      slug = slug
        .replace(/ä/g, 'ae')
        .replace(/ü/g, 'ue')
        .replace(/ö/g, 'oe')
        .replace(/ß/g, 'ss')
      return slug
    },
    categoryMeta() {
      return (
        CATEGORY_META[this.normalizedCategory] || {
          title: 'News & Medien',
          description: 'News und Medien der Pfaff GmbH.',
          name: this.$route.params.category,
        }
      )
    },
    categoryTitle() {
      return this.categoryMeta.name
    },
    categoryPath() {
      return `/news-medien/${this.normalizedCategory}`
    },
    breadcrumbItems() {
      return [
        { name: 'Startseite', path: '/' },
        { name: 'News & Medien', path: '/news-medien' },
        { name: this.categoryTitle },
      ]
    },
    news() {
      const news = this.$store.state.news.filter(
        (item) => item.category === this.normalizedCategory
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

      const groupedNewsArray = Object.values(groupedNews)
      groupedNewsArray.sort((a, b) => b.year - a.year)

      return groupedNewsArray
    },
  },

  head() {
    return buildSeoHead({
      title: this.categoryMeta.title,
      description: this.categoryMeta.description,
      path: this.categoryPath,
    })
  },

  jsonld() {
    return [
      organizationSchema({
        name: `Pfaff GmbH | ${this.categoryTitle}`,
        url: `https://pfaffgmbh.com${this.categoryPath}`,
      }),
      breadcrumbSchema(this.breadcrumbItems),
    ]
  },
}
</script>
