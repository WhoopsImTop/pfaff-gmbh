<template>
  <div class="article-column article-background">
    <h1 style="margin-bottom: 10px">{{ news[0].title }}</h1>
    <div class="information-row">
      {{ kategorie[0].categoryTitle }} || {{
        new Date(news[0].date).toLocaleDateString('DE-de', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }) ||
        new Date(news[0].createdAt).toLocaleDateString('DE-de', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      }}
    </div>
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
    const kategorie = await $content('blogkategorien/' + app.i18n.locale)
      .where({ slug: news[0].category[0] })
      .fetch()
    return { news, kategorie}
  },

  head() {
    return {
      title: 'Pfaff GmbH | ' + this.news[0].title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.news[0].excerpt,
        },
      ],
    }
  },
}
</script>

<style>
.article-background {
  background-color: #ffffff;
  padding: 20px;
}

.information-row {
  margin-bottom: 20px;
}

.blog-content img {
  width: 100%;
  height: auto;
}
</style>