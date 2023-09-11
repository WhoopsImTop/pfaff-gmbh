<template>
  <div>
    <navbar-component />
    <nuxt />
    <footer-component />
  </div>
</template>

<script>
import Lenis from '@studio-freight/lenis'
import FooterComponent from '~/components/footerComponent.vue'
import navbarComponent from '~/components/navbarComponent.vue'
export default {
  components: { navbarComponent, FooterComponent },
  data() {
    return {
      lenis: null,
    }
  },
  watch: {
    $route(to, from) {
      window.scrollTo(0, 0)
    },
  },
  mounted() {
    this.lenis = new Lenis()
    const that = this;
    function raf(time) {
      that.lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  },
  beforeDestroy() {
    this.lenis.destroy()
  },

}
</script>

<style>
</style>