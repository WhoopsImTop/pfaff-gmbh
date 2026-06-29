<template>
  <div class="content-margin">
    <component-renderer
      v-for="(component, index) in landing.components"
      :key="index"
      :component="component"
    />
  </div>
</template>

<script>
import componentRenderer from '~/components/componentRenderer.vue'
import { fetchSeitenEntry } from '~/utils/content'
import {
  breadcrumbSchema,
  buildSeoHead,
  organizationSchema,
} from '~/utils/seo'

export default {
  components: { componentRenderer },
  layout: 'default',

  async asyncData({ $content, app, store: { dispatch } }) {
    const landing = await fetchSeitenEntry($content, app.i18n.locale, 'qualitaet')
    await dispatch('nuxtServerInit')
    return { landing }
  },

  data() {
    return {}
  },

  head() {
    const isEn = this.$i18n.locale === 'en'
    return buildSeoHead({
      title: isEn
        ? 'ISO 13485 Injection Molding | Quality Management'
        : 'ISO 13485 Spritzguss | Qualitätsmanagement Medizintechnik',
      description: isEn
        ? 'ISO 9001 since 2006 and ISO 13485 for medical technology. Certified quality assurance and injection molding at Pfaff GmbH Waldkirch.'
        : 'ISO 9001 seit 2006 und ISO 13485 für Medizintechnik. Qualitätssicherung, Validierungen und zertifizierte Spritzgussfertigung bei Pfaff GmbH Waldkirch.',
      path: isEn ? '/en/qualitaet' : '/qualitaet',
      keywords: isEn
        ? 'ISO 13485 injection molding, medical device quality management'
        : 'ISO 13485 Spritzguss, ISO 9001 Kunststoff, Qualitätsmanagement Medizintechnik, Spritzguss Waldkirch',
      locale: isEn ? 'en_US' : 'de_DE',
      alternateLocales: { de: '/qualitaet', en: '/en/qualitaet' },
    })
  },

  jsonld() {
    return [
      organizationSchema({
        name: 'Pfaff GmbH | Qualität',
        url: 'https://pfaffgmbh.com/qualitaet',
      }),
      breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: 'Qualität', path: '/qualitaet' },
      ]),
    ]
  },
}
</script>
