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
export default {
  components: { componentRenderer },
  layout: 'default',

  async asyncData({ $content, app, store: { dispatch } }) {
    const landing = await $content(
      'seiten/' + app.i18n.locale + '/unternehmen'
    ).fetch()
    await dispatch('nuxtServerInit')
    return { landing }
  },

  data() {
    return {}
  },

  head() {
    return {
      title: 'Unternehmen',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Die Pfaff GmbH mit Sitz in Waldkirch bei Freiburg wurde 1992 von Herrn Adolf Pfaff gegründet und ist ein inhabergeführtes Unternehmen. 2018 wurde die Geschäftsführung von Tochter Corinna Pfaff übernommen.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Pfaff, Kunststoff, Kunststoffverarbeitung, Spritzguss, Spritzgussteile',
        },
        {
          property: 'og:title',
          content: 'Pfaff GmbH | Unternehmen',
        },
        {
          property: 'og:description',
          content:
            'Die Pfaff GmbH mit Sitz in Waldkirch bei Freiburg wurde 1992 von Herrn Adolf Pfaff gegründet und ist ein inhabergeführtes Unternehmen. 2018 wurde die Geschäftsführung von Tochter Corinna Pfaff übernommen.',
        },
        {
          property: 'og:image',
          content: 'https://pfaffgmbh.com/pfaff-historie.jpg',
        },
        {
          property: 'og:url',
          content: 'https://pfaffgmbh.com/unternehmen',
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
          href: 'https://pfaffgmbh.com/unternehmen',
        },
      ],
    }
  },

  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Waldkirch, Deutschland',
        postalCode: '79183',
        streetAddress: 'Spinnereistraße  4-6',
      },
      email: 'info@pfaffgmbh.com',
      member: [
        {
          '@type': 'Organization',
        },
        {
          '@type': 'Organization',
        },
      ],
      alumni: [
        {
          '@type': 'Person',
          name: 'Corinna Pfaff',
        },
        {
          '@type': 'Person',
          name: 'Andreas Buff',
        },
      ],
      name: 'Pfaff GmbH | Unternehmen',
      url: 'https://pfaffgmbh.com/unternehmen',
      telephone: '+ (49) 7681 49397-0',
    }
  },
}
</script>
