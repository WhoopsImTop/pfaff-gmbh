<template>
    <div class="content-margin">
      <component-renderer v-for="(component, index) in landing.components" :key="index" :component="component" />
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
        'seiten/' + app.i18n.locale + '/kompetenzen'
      ).fetch()
      await dispatch('nuxtServerInit')
      return { landing }
    },
  
    head() {
      return {
        title: "Pfaff GmbH | Kompetenzen",
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: "Pfaff entwickelt mit modernen Materialien, innovativer Technik und garantieren zertifizierte Qualität unter Reinraumbedingungen.",
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
      name: 'Pfaff GmbH | Kompetenzen',
      url: 'https://pfaffgmbh.com/kompetenzen',
      telephone: '+ (49) 7681 49397-0',
    }
  },
    
    data() {
      return {}
    },
  }
  </script>
  