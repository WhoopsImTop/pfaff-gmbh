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
        'seiten/' + app.i18n.locale + '/kompetenzen'
      ).fetch()
      await dispatch('nuxtServerInit')
      return { landing }
    },
  
    data() {
      return {}
    },
  }
  </script>
  