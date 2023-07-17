<template>
  <div class="article-column">
    <nuxt-link
      v-for="(article, index) in $store.state.news"
      :key="index"
      :to="
        '/news-medien/' +
        article.category[0].replace(/ /g, '-').toLowerCase() +
        '/' +
        article.slug
      "
      class="article"
    >
      <div v-if="article.image" class="article-image">
        <img :src="article.image" />
      </div>
      <div class="article-content">
        <h4 v-html="article.title"></h4>
        <div class="article-informations">
          <span class="article-information">{{ article.category[0] }}</span>
        </div>
        <p v-if="article.content">{{ article.content.length <= 200 ? article.content : article.content.slice(0, 200) + '...' }}</p>
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

  head() {
    return {
      title: 'Pfaff GmbH | News & Medien',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Hier finden Sie alle Neuigkeiten rund um die Pfaff GmbH. Wir informieren Sie über neue Produkte, Veranstaltungen und vieles mehr.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Pfaff, Kunststoff, Kunststoffverarbeitung, Spritzguss, Spritzgussteile',
        },
        {
          property: 'og:title',
          content: 'Pfaff GmbH | News & Medien',
        },
        {
          property: 'og:description',
          content: 'Hier finden Sie alle Neuigkeiten rund um die Pfaff GmbH. Wir informieren Sie über neue Produkte, Veranstaltungen und vieles mehr.',
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
</style>