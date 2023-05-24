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
        'seiten/' + app.i18n.locale + '/qualität'
      ).fetch()
      await dispatch('nuxtServerInit')
      return { landing }
    },

    head() {
      return {
        title: "Pfaff GmbH | Qualität",
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: "Hervorragende Qualität bei wirtschaftlicher Produktion verstehen wir als Selbstverständlichkeit. Seit 2006 sind wir nach der ISO-Norm 9001 zertifiziert. Seit 2011 bieten wir unseren Kunden im Medizinbereich zusätzlich eine Qualitätssicherung nach ISO 13485.",
          },
        ],
      }
    },
  
    data() {
      return {}
    },
  }
  </script>
  