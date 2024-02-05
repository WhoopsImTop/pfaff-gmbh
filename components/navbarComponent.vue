<template>
  <div class="navigation-bar">
    <div
      class="content-container d-flex flex-row justify-content-between align-flex-end"
    >
      <nuxt-link to="/" style="z-index: 999"
        ><pfaff-logo :active="burgerActive"
      /></nuxt-link>
      <div
        class="link-container-background"
        :class="burgerActive ? 'burger-active' : ''"
      >
        <div class="scrollable-container">
          <div class="link-container content-container">
            <linkComponent
              v-for="link in $store.state.menu.links"
              :key="link.siteTitle"
              :component="link"
            >
            </linkComponent>
            <a
              href="https://www.linkedin.com/company/pfaff-gmbh/"
              target="_blank"
              ><img src="/linked_in_logo_blue.svg" alt="linked in" width="100"
            /></a>
          </div>
        </div>
      </div>
      <div
        class="burger"
        :class="burgerActive ? 'burger-active' : ''"
        @click="setBurgerActive"
      >
        <div class="burger-line"></div>
        <div class="burger-line"></div>
        <div class="burger-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import pfaffLogo from './pfaffLogo.vue'
export default {
  components: { pfaffLogo },
  data() {
    return {
      burgerActive: false,
    }
  },
  watch: {
    $route(to, from) {
      this.burgerActive = false
    },
  },
  methods: {
    setBurgerActive() {
      this.burgerActive = !this.burgerActive
      this.$store.commit('setBurgerActive', this.burgerActive)
    },
  },
}
</script>

<style>
.scrollable-container {
  margin: 0 auto;
  overflow-y: auto;
  max-height: 100vh;
  width: 100%;
}
</style>
