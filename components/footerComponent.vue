<template>
  <div class="footer">
    <div class="content-container footer-content-container">
      <div class="footer-logo-container">
        <footer-pfaff-logo class="footer-pfaff-logo" />
      </div>
      <div class="footer-content">
        <p>
          <strong>Pfaff GmbH</strong> <br />
          Spinnereistraße 4-6 <br />
          D-79183 Waldkirch
        </p>
      </div>
      <div class="footer-content">
        <p>
          <strong>Produkte und Lösungen</strong><br />
          <nuxt-link to="/produktbeispiele">Produktbeispiele</nuxt-link><br />
          <nuxt-link to="/kompetenzen">Kompetenzen</nuxt-link><br />
          <nuxt-link to="/qualität">Qualität</nuxt-link>
        </p>
      </div>
      <div class="footer-content">
        <p>
          <strong>Informiert bleiben</strong><br />
          <nuxt-link to="/news-medien">News und Medien</nuxt-link><br />
          <nuxt-link to="/news-medien/stellenausschreibungen"
            >Stellenausschreibungen</nuxt-link
          ><br />
          <nuxt-link to="/news-medien/pressemitteilungen"
            >Pressemitteilungen</nuxt-link
          >
        </p>
      </div>
      <div class="footer-content">
        <p>
          <strong>Kontakt</strong><br />
          <a href="tel:0768149397-0">+(49) 7681-49397-0</a><br />
          <a href="tel:info@pfaffgmbh.com">info@pfaffgmbh.com</a>
        </p>
      </div>
    </div>
    <div class="content-container footer-row">
      <div class="footer-links">
        <nuxt-link to="/impressum">Impressum</nuxt-link>
        <nuxt-link to="/datenschutz">Datenschutzerklärung</nuxt-link>
        <nuxt-link to="/agbs">AGB's</nuxt-link>
      </div>
      <div class="copyright">© 2023 PFAFF GMBH | Designed with ❤️ by khri8</div>
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