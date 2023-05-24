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
      'seiten/' + app.i18n.locale + '/startseite'
    ).fetch()
    await dispatch('nuxtServerInit')
    return { landing }
  },

  head() {
    return {
      title: "Pfaff GmbH - Wo Kunststoff Karriere macht. - ISO zertifiziert",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "High-Tech-Kunststoff-Teile. Pfaff entwickelt mit modernen Materialien, innovativer Technik und garantieren zertifizierte Qualität unter Reinraumbedingungen.",
        },
      ],
    }
  },

  data() {
    return {}
  },
}
</script>
