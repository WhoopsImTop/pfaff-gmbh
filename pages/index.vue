<template>
  <div>
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
import { buildSeoHead, localBusinessSchema, organizationSchema } from '~/utils/seo'

export default {
  components: { componentRenderer },
  layout: 'default',

  async asyncData({ $content, app, store: { dispatch } }) {
    const landing = await fetchSeitenEntry(
      $content,
      app.i18n.locale,
      'startseite'
    )
    await dispatch('nuxtServerInit')
    return { landing }
  },

  head() {
    const isEn = this.$i18n.locale === 'en'
    return buildSeoHead({
      title: isEn
        ? 'Medical Injection Molding Germany | Pfaff GmbH'
        : 'Kunststoff-Spritzguss Waldkirch | Medizintechnik & Dental',
      description: isEn
        ? 'Precision injection molding from the Black Forest: medical technology, dental technology and high-tech plastic parts. ISO 13485 certified clean room manufacturing.'
        : 'Präzisions-Spritzguss aus dem Schwarzwald: Medizintechnik, Dentaltechnik und High-Tech-Kunststoffteile. ISO 13485 zertifiziert, Reinraumfertigung ISO 7.',
      path: isEn ? '/en' : '/',
      keywords: isEn
        ? 'medical injection molding Germany, ISO 13485 injection molding, precision plastic parts'
        : 'Spritzguss Waldkirch, Kunststoffteile Schwarzwald, Medizintechnik Spritzguss, ISO 13485 Kunststoff',
      locale: isEn ? 'en_US' : 'de_DE',
      alternateLocales: { de: '/', en: '/en' },
    })
  },

  jsonld() {
    return [organizationSchema(), localBusinessSchema()]
  },
}
</script>
