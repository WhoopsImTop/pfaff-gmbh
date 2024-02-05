<template>
  <div class="article-column article-background">
    <h1 style="margin-bottom: 10px">{{ news[0].title }}</h1>
    <div class="article-informations">
      <span v-if="kategorie" class="article-information">{{
        kategorie.length > 0 ? kategorie[0].categoryTitle : ''
      }}</span>
    </div>
    <img
      v-if="news[0].image"
      :src="news[0].image"
      style="width: 100%; margin-bottom: 20px"
    />
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

    if (news[0] && news[0].category) {
      const kategorie = await $content('blogkategorien/' + app.i18n.locale)
        .where({ slug: news[0].category })
        .fetch()
      return { news, kategorie }
    } else {
      return { news }
    }
  },

  head() {
    return {
      title: this.news[0].title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.news[0].excerpt,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Pfaff, Kunststoff, Kunststoffverarbeitung, Spritzguss, Spritzgussteile',
        },
        {
          property: 'og:title',
          content: this.news[0].title,
        },
        {
          property: 'og:description',
          content: this.news[0].excerpt,
        },
        {
          property: 'og:image',
          content: 'https://pfaffgmbh.com/pfaff-historie.jpg',
        },
        {
          property: 'og:url',
          content: 'https://pfaffgmbh.com/news-medien/' + this.news[0].slug,
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
          href: 'https://pfaffgmbh.com/news-medien/' + this.news[0].slug,
        },
      ],
    }
  },

  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Pfaff GmbH | ' + this.news[0].title,
      url: 'https://pfaffgmbh.com/news-medien/' + this.news[0].slug,
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

<style></style>
