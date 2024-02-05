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
      'seiten/' + app.i18n.locale + '/qualitaet'
    ).fetch()
    await dispatch('nuxtServerInit')
    return { landing }
  },

  data() {
    return {}
  },

  head() {
    return {
      title: 'Qualität',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Hervorragende Qualität bei wirtschaftlicher Produktion verstehen wir als Selbstverständlichkeit. Seit 2006 sind wir nach der ISO-Norm 9001 zertifiziert. Seit 2011 bieten wir unseren Kunden im Medizinbereich zusätzlich eine Qualitätssicherung nach ISO 13485.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Pfaff, Kunststoff, Kunststoffverarbeitung, Spritzguss, Spritzgussteile',
        },
        {
          property: 'og:title',
          content: 'Pfaff GmbH | Qualität',
        },
        {
          property: 'og:description',
          content:
            'Hervorragende Qualität bei wirtschaftlicher Produktion verstehen wir als Selbstverständlichkeit. Seit 2006 sind wir nach der ISO-Norm 9001 zertifiziert. Seit 2011 bieten wir unseren Kunden im Medizinbereich zusätzlich eine Qualitätssicherung nach ISO 13485.',
        },
        {
          property: 'og:image',
          content: 'https://pfaffgmbh.com/pfaff-historie.jpg',
        },
        {
          property: 'og:url',
          content: 'https://pfaffgmbh.com/qualität',
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
          href: 'https://pfaffgmbh.com/qualität',
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
      name: 'Pfaff GmbH | Qualität',
      url: 'https://pfaffgmbh.com/qualität',
      telephone: '+ (49) 7681 49397-0',
    }
  },
}
</script>
