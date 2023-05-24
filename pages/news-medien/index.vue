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
      <div class="article-content">
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
        <h4 v-html="article.title"></h4>

        <p>{{ article.excerpt }}</p>
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
      ],
    }
  },
}
</script>

<style>
</style>