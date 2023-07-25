<template>
  <div class="navigation-bar">
    <div
      class="content-container d-flex flex-row justify-content-between align-flex-end"
    >
      <nuxt-link to="/" style="z-index: 999"><pfaff-logo :active="burgerActive" /></nuxt-link>
      <div
        class="link-container-background"
        :class="burgerActive ? 'burger-active' : ''"
      >
        <div class="link-container content-container">
          <nuxt-link
            v-for="link in $store.state.seiten"
            :key="link.slug"
            :to="'/' + link.slug"
          >
            {{ link.siteTitle }}
          </nuxt-link>
        </div>
      </div>
      <div
        class="burger"
        :class="burgerActive ? 'burger-active' : ''"
        @click="burgerActive = !burgerActive"
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
}
</script>

<style>
</style>