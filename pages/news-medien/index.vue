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
          <img :src="article.image" />
        </div>
        <div class="article-content">
          <h4 v-html="article.title"></h4>
          <div class="article-informations">
            <span class="article-information" v-if="article.category">{{
              article.category
            }}</span>
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
  async asyncData({ $content, app, store: { dispatch, state } }) {
    await dispatch('nuxtServerInit')
    // group news by year
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

    // Konvertiere das groupedNews-Objekt in ein Array von Jahresobjekten
    const groupedNewsArray = Object.values(groupedNews)
    groupedNewsArray.sort((a, b) => b.year - a.year)

    return {
      news: groupedNewsArray,
    }
  },

  head() {
    return {
      title: 'News & Medien',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Hier finden Sie alle Neuigkeiten rund um die Pfaff GmbH. Wir informieren Sie über neue Produkte, Veranstaltungen und vieles mehr.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Pfaff, Kunststoff, Kunststoffverarbeitung, Spritzguss, Spritzgussteile',
        },
        {
          property: 'og:title',
          content: 'News & Medien',
        },
        {
          property: 'og:description',
          content:
            'Hier finden Sie alle Neuigkeiten rund um die Pfaff GmbH. Wir informieren Sie über neue Produkte, Veranstaltungen und vieles mehr.',
        },
        {
          property: 'og:image',
          content: 'https://pfaffgmbh.com/pfaff-historie.jpg',
        },
        {
          property: 'og:url',
          content: 'https://pfaffgmbh.com/news-medien',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:locale',
          content: 'de_DE',
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://pfaffgmbh.com/news-medien',
        },
      ],
    }
  },

  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Pfaff GmbH | News und Medien',
      url: 'https://pfaffgmbh.com/news-medien/',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+(49) 7681-49397-0',
          contactType: 'customer service',
        },
      ],
    }
  },
}
</script>

<style>
.year-identifier {
  position: sticky;
  top: 80px;
  background-color: #fff;
  padding: 1rem;
  margin: 0;
  z-index: 2;
}
</style>
