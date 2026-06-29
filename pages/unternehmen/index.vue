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
import { breadcrumbSchema, buildSeoHead, organizationSchema } from '~/utils/seo'

export default {
  components: { componentRenderer },
  layout: 'default',

  async asyncData({ $content, app, store: { dispatch } }) {
    const landing = await fetchSeitenEntry(
      $content,
      app.i18n.locale,
      'unternehmen'
    )
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
        ? 'About Pfaff GmbH | Family-Owned Injection Molding'
        : 'Unternehmen | Familienbetrieb Spritzguss Schwarzwald',
      description: isEn
        ? 'Pfaff GmbH Waldkirch: family-owned precision injection molding since 1991. ISO 9001 and ISO 13485 certified. Made in Germany for medical and dental technology.'
        : 'Pfaff GmbH Waldkirch: Familienunternehmen für Präzisions-Spritzguss seit 1991. ISO 9001 und ISO 13485 zertifiziert. Made in Germany für Medizin- und Dentaltechnik.',
      path: isEn ? '/en/unternehmen' : '/unternehmen',
      keywords: isEn
        ? 'injection molding company Germany, Pfaff GmbH, medical plastic manufacturer'
        : 'Pfaff GmbH Waldkirch, Spritzgießerei Baden-Württemberg, Familienunternehmen Kunststoff, Kunststoffverarbeitung Schwarzwald',
      locale: isEn ? 'en_US' : 'de_DE',
      alternateLocales: { de: '/unternehmen', en: '/en/unternehmen' },
    })
  },

  jsonld() {
    return [
      organizationSchema({
        name: 'Pfaff GmbH | Unternehmen',
        url: 'https://pfaffgmbh.com/unternehmen',
      }),
      breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: 'Unternehmen', path: '/unternehmen' },
      ]),
    ]
  },
}
</script>
