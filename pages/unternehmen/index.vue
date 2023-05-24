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
        'seiten/' + app.i18n.locale + '/unternehmen'
      ).fetch()
      await dispatch('nuxtServerInit')
      return { landing }
    },

    head() {
      return {
        title: "Pfaff GmbH | Unternehmen",
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: "Die Pfaff GmbH mit Sitz in Waldkirch bei Freiburg wurde 1992 von Herrn Adolf Pfaff gegründet und ist ein inhabergeführtes Unternehmen. 2018 wurde die Geschäftsführung von Tochter Corinna Pfaff übernommen.",
          },
        ],
      }
    },
  
    data() {
      return {}
    },
  }
  </script>
  