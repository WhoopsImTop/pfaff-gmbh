<template>
  <div class="content-margin">
    <component-renderer
      v-for="(component, index) in landing[0].components"
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

  async asyncData({ $content, app, store: { dispatch }, params }) {
    console.log(params.slug)
    const landing = await $content('seiten/' + app.i18n.locale)
      .where({ slug: params.slug })
      .fetch()

    console.log(landing)
    await dispatch('nuxtServerInit')
    return { landing }
  },

  head() {
    return {
      title: 'Pfaff GmbH - ' + this.landing.siteTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.landing.description,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.landing.keywords,
        },
        {
          property: 'og:title',
          content: this.landing.title,
        },
        {
          property: 'og:description',
          content: this.landing.description,
        },
        {
          property: 'og:image',
          content: this.landing.image,
        },
        {
          property: 'og:url',
          content: 'https://pfaffgmbh.com/' + this.landing.slug,
        },
        {
          property: 'og:type',
          content: 'website',
        },
      ],
    }
  },

  data() {
    return {}
  },
}
</script>
  