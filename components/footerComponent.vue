<template>
  <div class="footer">
    <div class="content-container d-flex flex-row justify-content-between align-flex-end">
      <div class="footer-logo-container">
        <footer-pfaff-logo class="footer-pfaff-logo" />
      </div>
      <div class="copyright">© 2023 PFAFF GMBH | Designed with ❤️ by khri8</div>
      <div class="footer-links">
        <nuxt-link to="/datenschutz">Datenschutzerklärung</nuxt-link>
        <nuxt-link to="/impressum">Impressum</nuxt-link>
        <nuxt-link to="/agbs">AGB's</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import footerPfaffLogo from './footerPfaffLogo.vue'
export default {
  components: { footerPfaffLogo },
}
</script>

<style>
.footer .content-container {
  margin: 0 auto;
}
</style>