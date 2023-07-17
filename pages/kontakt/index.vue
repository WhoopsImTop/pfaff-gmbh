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
      'seiten/' + app.i18n.locale + '/kontakt'
    ).fetch()
    await dispatch('nuxtServerInit')
    return { landing }
  },

  head() {
    return {
      title: 'Pfaff GmbH | Kontakt',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Sie haben Fragen zu unseren Produkten oder Dienstleistungen? Wir freuen uns auf Ihre Kontaktaufnahme.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Pfaff, Kunststoff, Kunststoffverarbeitung, Spritzguss, Spritzgussteile',
        },
        {
          property: 'og:title',
          content: 'Pfaff GmbH | Kontakt',
        },
        {
          property: 'og:description',
          content:
            'Sie haben Fragen zu unseren Produkten oder Dienstleistungen? Wir freuen uns auf Ihre Kontaktaufnahme.',
        },
        {
          property: 'og:image',
          content: 'https://pfaffgmbh.com/pfaff-historie.jpg',
        },
        {
          property: 'og:url',
          content: 'https://pfaffgmbh.com/kontakt',
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
          href: 'https://pfaffgmbh.com/kontakt',
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
        streetAddress: "Spinnereistraße  4-6",
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
      name: 'Pfaff GmbH | Kontakt',
      url: 'https://pfaffgmbh.com/kontakt',
      telephone: '+ (49) 7681 49397-0',
    }
  },

  data() {
    return {}
  },
}
</script>
  