<template>
  <div class="content-margin content-container">
    <h1>Karriere bei Pfaff GmbH</h1>
    <p class="karriere-intro">
      Werden Sie Teil unseres Familienunternehmens in Waldkirch. Wir bieten
      Ausbildungsplätze im Bereich Kunststofftechnik, Verfahrensmechaniker und
      spannende Karrieremöglichkeiten im Präzisions-Spritzguss.
    </p>

    <section class="karriere-section">
      <h2>Offene Stellen</h2>
      <div v-if="jobs.length === 0">
        <p>
          Aktuell keine offenen Stellen. Senden Sie uns gerne eine
          <nuxt-link :to="localePath('/kontakt')">Initiativbewerbung</nuxt-link>.
        </p>
      </div>
      <div v-else class="job-list">
        <article v-for="job in jobs" :key="job.slug" class="job-card">
          <h3>
            <nuxt-link
              :to="
                localePath(
                  '/news-medien/stellenausschreibungen/' + job.slug
                )
              "
            >
              {{ job.title }}
            </nuxt-link>
          </h3>
          <p v-if="job.excerpt">{{ job.excerpt }}</p>
          <time :datetime="job.date">{{ formatDate(job.date) }}</time>
        </article>
      </div>
    </section>

    <section class="karriere-section">
      <h2>Ausbildung</h2>
      <p>
        Als zertifizierter Ausbildungsbetrieb bilden wir Verfahrensmechaniker
        für Kunststoff- und Kautschuktechnik aus. Erfahren Sie mehr in unseren
        <nuxt-link :to="localePath('/news-medien/stellenausschreibungen')">
          Stellenausschreibungen
        </nuxt-link>.
      </p>
    </section>
  </div>
</template>

<script>
import {
  absoluteUrl,
  breadcrumbSchema,
  buildSeoHead,
  jobPostingSchema,
  localBusinessSchema,
} from '~/utils/seo'

export default {
  async asyncData({ store: { dispatch, state } }) {
    await dispatch('nuxtServerInit')
    const jobs = state.news.filter(
      (article) => article.category === 'stellenausschreibungen'
    )
    return { jobs }
  },

  data() {
    return {}
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },

  head() {
    const isEn = this.$i18n.locale === 'en'
    return buildSeoHead({
      title: isEn
        ? 'Careers at Pfaff GmbH | Injection Molding Jobs'
        : 'Karriere & Ausbildung | Jobs Spritzguss Waldkirch',
      description: isEn
        ? 'Careers at Pfaff GmbH Waldkirch: job openings, plastics technology apprenticeships and precision injection molding positions in the Black Forest.'
        : 'Karriere bei Pfaff GmbH Waldkirch: Stellenangebote, Ausbildung Kunststofftechnik und Jobs im Präzisions-Spritzguss im Schwarzwald.',
      path: isEn ? '/en/karriere' : '/karriere',
      keywords: isEn
        ? 'injection molding jobs Germany, plastics apprenticeship Waldkirch'
        : 'Jobs Spritzguss Schwarzwald, Ausbildung Kunststofftechnik Waldkirch, Pfaff GmbH Karriere',
      locale: isEn ? 'en_US' : 'de_DE',
      alternateLocales: { de: '/karriere', en: '/en/karriere' },
    })
  },

  jsonld() {
    const schemas = [
      localBusinessSchema({ url: 'https://pfaffgmbh.com/karriere' }),
      breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: 'Karriere', path: '/karriere' },
      ]),
    ]

    this.jobs.forEach((job) => {
      schemas.push(
        jobPostingSchema({
          title: job.title,
          description: job.excerpt || job.shortText || job.title,
          url: absoluteUrl(
            `/news-medien/stellenausschreibungen/${job.slug}`
          ),
          datePosted: job.date,
        })
      )
    })

    return schemas
  },
}
</script>

<style scoped>
.karriere-intro {
  font-size: 1.125rem;
  line-height: 1.7;
  margin: 1.5rem 0 2.5rem;
  max-width: 800px;
}

.karriere-section {
  margin-bottom: 3rem;
}

.job-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.job-card {
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
}

.job-card h3 {
  margin-top: 0;
}

.job-card time {
  color: #666;
  font-size: 0.875rem;
}
</style>
