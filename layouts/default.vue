<template>
  <div>
    <navbar-component />
    <nuxt />
    <footer-component />
  </div>
</template>

<script>
import FooterComponent from '~/components/footerComponent.vue'
import navbarComponent from '~/components/navbarComponent.vue'
export default {
  components: { navbarComponent, FooterComponent },
}
</script>

<style>

</style>