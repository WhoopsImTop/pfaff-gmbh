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
import {
  breadcrumbSchema,
  buildSeoHead,
  localBusinessSchema,
  organizationSchema,
} from '~/utils/seo'

export default {
  components: { componentRenderer },
  layout: 'default',

  async asyncData({ $content, app, store: { dispatch } }) {
    const landing = await $content(
      'seiten/' + app.i18n.locale + '/kontakt'
    ).fetch()
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
        ? 'Contact | Pfaff GmbH Injection Molding Waldkirch'
        : 'Kontakt Spritzguss Waldkirch | Pfaff GmbH',
      description: isEn
        ? 'Contact Pfaff GmbH in Waldkirch, Germany for injection molding, medical technology and dental components. Your partner for precision plastic parts.'
        : 'Kontaktieren Sie Pfaff GmbH in Waldkirch bei Freiburg für Spritzguss, Medizintechnik und Dentaltechnik. Ihr Partner für Präzisions-Kunststoffteile im Breisgau.',
      path: isEn ? '/en/kontakt' : '/kontakt',
      keywords: isEn
        ? 'injection molding Germany contact, Pfaff GmbH Waldkirch'
        : 'Spritzguss Waldkirch, Kunststofffertigung Freiburg, Pfaff GmbH Kontakt, Spritzgießerei Schwarzwald',
      locale: isEn ? 'en_US' : 'de_DE',
      alternateLocales: { de: '/kontakt', en: '/en/kontakt' },
    })
  },

  jsonld() {
    return [
      localBusinessSchema({ url: 'https://pfaffgmbh.com/kontakt' }),
      organizationSchema({
        name: 'Pfaff GmbH | Kontakt',
        url: 'https://pfaffgmbh.com/kontakt',
      }),
      breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: 'Kontakt', path: '/kontakt' },
      ]),
    ]
  },
}
</script>
