<template>
  <div class="navigation-bar">
    <div
      class="content-container d-flex flex-row justify-content-between align-flex-end"
    >
      <nuxt-link to="/"><pfaff-logo /></nuxt-link>
      <div
        class="link-container"
        :class="burgerActive ? 'burger-active' : ''"
        @click="burgerActive = false"
      >
        <nuxt-link
          v-for="link in $store.state.seiten"
          :key="link.slug"
          :to="'/' + link.slug"
        >
          {{ link.siteTitle }}
        </nuxt-link>
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
}
</script>

<style>
</style>