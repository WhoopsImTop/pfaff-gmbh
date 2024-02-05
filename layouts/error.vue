<template>
  <div class="error-layout">
    <h1 v-if="error.statusCode === 404">Diese Seite wurde nicht gefunden</h1>
    <h1 v-else>Es ist ein Fehler aufgetreten</h1>
    <nuxt-link to="/">zurück zur Startseite</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
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
