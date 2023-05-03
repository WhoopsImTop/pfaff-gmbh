<template>
  <div>
    <landing-slider :slideData="landing.landingSlider" />
    <component-renderer :components="landing.contentblock" />
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

  data() {
    return {}
  },
}
</script>
