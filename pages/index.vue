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
export default {
  components: { componentRenderer },
  name: 'IndexPage',
  layout: 'default',

  async asyncData({ $content, app, store: { dispatch } }) {
    const landing = await $content(
      'seiten/' + app.i18n.locale + '/startseite'
    ).fetch()
    await dispatch('nuxtServerInit')
    return { landing }
  },

  head() {
    return {
      title: 'Pfaff GmbH - Wo Kunststoff Karriere macht. - ISO zertifiziert',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'High-Tech-Kunststoff-Teile. Pfaff entwickelt mit modernen Materialien, innovativer Technik und garantieren zertifizierte Qualität unter Reinraumbedingungen.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Pfaff, Kunststoff, Kunststoffverarbeitung, Spritzguss, Spritzgussteile',
        },
        {
          property: 'og:title',
          content:
            'Pfaff GmbH - Wo Kunststoff Karriere macht. - ISO zertifiziert',
        },
        {
          property: 'og:description',
          content:
            'High-Tech-Kunststoff-Teile. Pfaff entwickelt mit modernen Materialien, innovativer Technik und garantieren zertifizierte Qualität unter Reinraumbedingungen.',
        },
        {
          property: 'og:image',
          content: 'https://www.pfaff-gmbh.netlify.app/og-image.png',
        },
        {
          property: 'og:url',
          content: 'https://www.pfaff-gmbh.netlify.app/',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:locale',
          content: 'de_DE',
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://www.pfaff-gmbh.netlify.app/',
        },
      ],
    }
  },

  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Pfaff GmbH',
      url: 'https://www.pfaff-gmbh.netlify.app/',
      logo: 'https://www.pfaff-gmbh.netlify.app/logo.svg',
      sameAs: [
        'https://www.instagram.com/pfaffgmbh/',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+(49) 7681-49397-0',
          contactType: 'customer service',
        },
      ],
    }
  },

  data() {
    return {}
  },
}
</script>
