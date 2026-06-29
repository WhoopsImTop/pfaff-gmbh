<template>
  <div class="article-column article-background">
    <breadcrumbs-component :items="breadcrumbItems" />
    <h1 style="margin-bottom: 10px">{{ news[0].title }}</h1>
    <div class="article-informations">
      <span v-if="kategorie" class="article-information">{{
        kategorie.length > 0 ? kategorie[0].categoryTitle : ''
      }}</span>
    </div>
    <img
      v-if="news[0].image"
      :src="news[0].image"
      :alt="news[0].title"
      style="width: 100%; margin-bottom: 20px"
    />
    <nuxt-content class="blog-content" :document="news[0]" />
  </div>
</template>

<script>
import {
  absoluteUrl,
  articleSchema,
  breadcrumbSchema,
  buildSeoHead,
  jobPostingSchema,
  resolveDescription,
} from '~/utils/seo'

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

  computed: {
    articlePath() {
      return `/news-medien/${this.news[0].category}/${this.news[0].slug}`
    },
    articleDescription() {
      return resolveDescription(
        this.news[0].excerpt,
        this.news[0].shortText,
        this.news[0].title
      )
    },
    breadcrumbItems() {
      const categoryTitle =
        this.kategorie && this.kategorie.length > 0
          ? this.kategorie[0].categoryTitle
          : 'News'
      return [
        { name: 'Startseite', path: '/' },
        { name: 'News & Medien', path: '/news-medien' },
        { name: categoryTitle, path: `/news-medien/${this.news[0].category}` },
      ]
    },
    isJobPosting() {
      return this.news[0].category === 'stellenausschreibungen'
    },
  },

  head() {
    return buildSeoHead({
      title: this.news[0].title,
      description: this.articleDescription,
      path: this.articlePath,
      image: this.news[0].image,
      type: 'article',
    })
  },

  jsonld() {
    const url = absoluteUrl(this.articlePath)
    const schemas = [
      articleSchema({
        title: this.news[0].title,
        description: this.articleDescription,
        url,
        image: this.news[0].image,
        datePublished: this.news[0].date,
      }),
      breadcrumbSchema([
        ...this.breadcrumbItems,
        { name: this.news[0].title, path: this.articlePath },
      ]),
    ]

    if (this.isJobPosting) {
      schemas.push(
        jobPostingSchema({
          title: this.news[0].title,
          description: this.articleDescription,
          url,
          datePosted: this.news[0].date,
        })
      )
    }

    return schemas
  },
}
</script>

<style>
.blog-content iframe {
  width: 100%;
  min-height: 500px;
}
</style>
