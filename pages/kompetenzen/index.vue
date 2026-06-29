<template>
  <div class="content-margin">
    <breadcrumbs-component :items="breadcrumbItems" />
    <component-renderer
      v-for="(component, index) in landing.components"
      :key="index"
      :component="component"
    />
  </div>
</template>

<script>
import componentRenderer from '~/components/componentRenderer.vue'
import { breadcrumbSchema, buildSeoHead, organizationSchema } from '~/utils/seo'

export default {
  components: { componentRenderer },
  name: 'IndexPage',
  layout: 'default',

  async asyncData({ $content, app, store: { dispatch } }) {
    const landing = await $content(
      'seiten/' + app.i18n.locale + '/kompetenzen'
    ).fetch()
    await dispatch('nuxtServerInit')
    return { landing }
  },

  data() {
    return {
      breadcrumbItems: [
        { name: 'Startseite', path: '/' },
        { name: 'Kompetenzen' },
      ],
    }
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
      breadcrumbSchema(this.breadcrumbItems),
    ]
  },
}
</script>
