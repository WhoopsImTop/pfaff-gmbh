<template>
  <div class="content-margin content-container">
    <h1>{{ branche.title }}</h1>
    <p class="branche-intro">{{ branche.intro }}</p>

    <section v-if="relatedProducts.length" class="branche-section">
      <h2>Produktbeispiele</h2>
      <div class="portfolio-grid">
        <nuxt-link
          v-for="produkt in relatedProducts"
          :key="produkt.slug"
          :to="localePath('/produktbeispiele/' + produkt.slug)"
          class="portfolio-item"
        >
          <div class="portfolio-image">
            <img
              :src="produkt.productImage"
              :alt="produkt.productTitle"
              loading="lazy"
            />
          </div>
          <div class="portfolio-content">
            <h4>{{ produkt.productTitle }}</h4>
          </div>
        </nuxt-link>
      </div>
    </section>

    <section v-if="relatedCompetencies.length" class="branche-section">
      <h2>Passende Kompetenzen</h2>
      <ul class="branche-links">
        <li v-for="comp in relatedCompetencies" :key="comp.slug">
          <nuxt-link :to="localePath('/kompetenzen/' + comp.slug)">
            {{ comp.competenceName }}
          </nuxt-link>
        </li>
      </ul>
    </section>

    <section v-if="relatedArticles.length" class="branche-section">
      <h2>Fachbeiträge & News</h2>
      <ul class="branche-links">
        <li v-for="article in relatedArticles" :key="article.slug">
          <nuxt-link
            :to="
              localePath(
                '/news-medien/' + article.category + '/' + article.slug
              )
            "
          >
            {{ article.title }}
          </nuxt-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import {
  absoluteUrl,
  breadcrumbSchema,
  buildSeoHead,
  organizationSchema,
} from '~/utils/seo'

export default {
  async asyncData({ $content, app, params, store: { dispatch, state } }) {
    const branche = await $content(
      'branchen/' + app.i18n.locale + '/' + params.slug
    ).fetch()
    await dispatch('nuxtServerInit')

    const relatedProducts = state.produkte.filter((produkt) =>
      (branche.productCategories || []).some((cat) =>
        (produkt.productCategories || []).includes(cat)
      )
    )

    const relatedCompetencies = (branche.competencySlugs || [])
      .map((slug) => state.kompetenzen.find((k) => k.slug === slug))
      .filter(Boolean)

    const relatedArticles = state.news
      .filter((article) =>
        (branche.blogCategories || []).includes(article.category)
      )
      .slice(0, 6)

    return { branche, relatedProducts, relatedCompetencies, relatedArticles }
  },

  computed: {
    branchePath() {
      return `/branchen/${this.branche.slug}`
    },
  },

  head() {
    return buildSeoHead({
      title: this.branche.seoTitle || this.branche.title,
      description: this.branche.seoDescription || this.branche.intro,
      path: this.branchePath,
      keywords: `${this.branche.title}, Spritzguss, Pfaff GmbH`,
      alternateLocales: {
        de: this.branchePath,
      },
    })
  },

  jsonld() {
    return [
      organizationSchema({
        name: `Pfaff GmbH | ${this.branche.title}`,
        url: absoluteUrl(this.branchePath),
      }),
      breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: this.branche.title, path: this.branchePath },
      ]),
    ]
  },
}
</script>

<style scoped>
.branche-intro {
  font-size: 1.125rem;
  line-height: 1.7;
  margin: 1.5rem 0 2.5rem;
  max-width: 800px;
}

.branche-section {
  margin-bottom: 3rem;
}

.branche-section h2 {
  margin-bottom: 1rem;
}

.branche-links {
  list-style: none;
  padding: 0;
}

.branche-links li {
  margin-bottom: 0.5rem;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.portfolio-item {
  display: flex;
  flex-direction: column;
  box-shadow: var(--box-shadow);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}

.portfolio-item:hover {
  transform: translateY(-4px);
  text-decoration: none;
}

.portfolio-image {
  height: 200px;
  overflow: hidden;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portfolio-content {
  padding: 1rem;
}

.portfolio-content h4 {
  font-size: 1rem;
  margin: 0;
}
</style>
