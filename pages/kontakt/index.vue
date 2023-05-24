<template>
    <div>
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
        'seiten/' + app.i18n.locale + '/kontakt'
      ).fetch()
      await dispatch('nuxtServerInit')
      return { landing }
    },

    head() {
      return {
        title: "Pfaff GmbH | Kontakt",
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: "Sie haben Fragen zu unseren Produkten oder Dienstleistungen? Wir freuen uns auf Ihre Kontaktaufnahme.",
          },
        ],
      }
    },
  
    data() {
      return {}
    },
  }
  </script>
  