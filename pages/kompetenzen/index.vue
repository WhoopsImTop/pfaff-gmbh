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
  name: 'IndexPage',
  layout: 'default',

  async asyncData({ $content, app, store: { dispatch } }) {
    const landing = await fetchSeitenEntry(
      $content,
      app.i18n.locale,
      'kompetenzen'
    )
    await dispatch('nuxtServerInit')
    return { landing }
  },

  head() {
    return buildSeoHead({
      title: 'Kernkompetenzen Spritzguss | Reinraum & Mehrkomponenten',
      description:
        'Spritzguss-Kompetenzen von Pfaff: Reinraumfertigung ISO 7, Mehrkomponententechnik, Mikrospritzguss, Insertteile und optische Teile für Medizintechnik.',
      path: '/kompetenzen',
      keywords:
        'Reinraum Spritzguss, Mehrkomponentenspritzguss, Mikrospritzguss, Insert-Molding, optische Spritzgussteile',
    })
  },

  jsonld() {
    return [
      organizationSchema({
        name: 'Pfaff GmbH | Kompetenzen',
        url: 'https://pfaffgmbh.com/kompetenzen',
      }),
      breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: 'Kompetenzen', path: '/kompetenzen' },
      ]),
    ]
  },
}
</script>
