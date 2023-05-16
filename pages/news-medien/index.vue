<template>
  <div class="article-column">
    <div
      v-for="(article, index) in $store.state.news"
      :key="index"
      class="article"
    >
      <div v-if="article.image" class="article-image">
        <img :src="article.image" />
      </div>
      <div class="article-content">
        <h4 v-html="article.title"></h4>
        <span class="smallHeadline" style="display: flex; align-items: center"
          >Geschrieben am:
          {{
            new Date(article.date).toLocaleDateString('DE-de') ||
            new Date(article.createdAt).toLocaleDateString('DE-de')
          }}
          || {{ article.category[0] }}</span
        >
        <p>{{ article.excerpt }}</p>
        <nuxt-link
          :to="
            '/news-medien/' +
            article.category[0].replace(/ /g, '-').toLowerCase() +
            '/' +
            article.slug
          "
        >
          <button class="button">Mehr lesen</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'news',
  async asyncData({ $content, app, store: { dispatch } }) {
    await dispatch('nuxtServerInit')
  },
}
</script>

<style>
.article-column {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.article {
  padding: 20px;
  background-color: #ffffff;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.article-image {
  background-color: #efefef;
  min-width: 200px;
  width: 200px;
  height: 100%;
  margin-right: 20px;
  display: flex;
  align-content: center;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.article-content h4 {
  margin: 0;
}

.content-preview img {
  display: none;
}
</style>