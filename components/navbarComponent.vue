<template>
  <div class="navigation-bar">
    <div class="content-container d-flex flex-row justify-content-between align-flex-end">
      <pfaff-logo />
      <div class="link-container" :class="burgerActive ? 'burger-active' : ''">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/about">About</nuxt-link>
        <nuxt-link to="/contact">Contact</nuxt-link>
      </div>
      <div class="burger" :class="burgerActive ? 'burger-active' : ''" @click="burgerActive = !burgerActive">
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
            burgerActive: false
        }
    }
}
</script>

<style>
</style>