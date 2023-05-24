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

    <div class="pfaff-logo">
      <div class="dark-circle">
        <div class="dark-stick"></div>
      </div>
      <div class="gray-circle">
        <div class="gray-stick"></div>
      </div>
      <div class="light-circle">
        <div class="light-stick"></div>
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

.pfaff-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.dark-circle {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--primary-color);
}

.dark-stick {
  width: 8px;
  height: 30px;
  background: var(--primary-color);
  position: absolute;
  top: -70%;
  left: 50%;
  transform: translateX(-53%)
}

.gray-circle {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--darker-gray-color);
  animation: rotate45 3s ease-in-out infinite;
}

.gray-stick {
  width: 7px;
  height: 30px;
  background: var(--darker-gray-color);
  position: absolute;
  top: -130%;
  left: 50%;
  transform: translateX(-53%)
}

.light-circle {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #588dad;
  animation: rotate90 3s ease-in-out infinite;
}

.light-stick {
  width: 7px;
  height: 30px;
  background: #588dad;
  position: absolute;
  top: -220%;
  left: 50%;
  transform: translateX(-53%)
}

@keyframes rotate45 {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes rotate90 {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>