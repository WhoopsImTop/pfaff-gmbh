<template>
  <div class="error-layout">
    <h1 v-if="error.statusCode === 404">Diese Seite wurde nicht gefunden</h1>
    <h1 v-else>Es ist ein Fehler aufgetreten</h1>
    <nuxt-link to="/">zurück zur Startseite</nuxt-link>
  </div>
</template>

<script>
import { buildSeoHead } from '~/utils/seo'

export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },

  head() {
    const is404 = this.error.statusCode === 404
    return buildSeoHead({
      title: is404 ? 'Seite nicht gefunden' : 'Fehler',
      description: is404
        ? 'Die angeforderte Seite wurde nicht gefunden.'
        : 'Es ist ein Fehler aufgetreten.',
      path: this.$route.path,
      noindex: true,
    })
  },
}
</script>

<style>
.error-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
</style>
