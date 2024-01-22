<template>
  <div class="footer">
    <div class="content-container footer-content-container">
      <div class="footer-logo-container">
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
          <nuxt-link to="/qualitaet">Qualität</nuxt-link>
        </p>
      </div>
      <div class="footer-content">
        <p>
          <strong>Informiert bleiben</strong><br />
          <nuxt-link to="/news-medien">News und Medien</nuxt-link><br />
          <nuxt-link to="/news-medien/stellenausschreibungen"
            >Stellenausschreibungen</nuxt-link
          ><br />
          <nuxt-link to="/news-medien/presseartikel"
            >Presseartikel</nuxt-link
          >
        </p>
      </div>
      <div class="footer-content">
        <p>
          <strong>Kontakt</strong><br />
          <a href="tel:0768149397-0">+(49) 7681-49397-0</a><br />
          <a href="tel:info@pfaffgmbh.com">info@pfaffgmbh.com</a><br />
          <a style="margin-top: 10px" href="https://www.linkedin.com/company/pfaff-gmbh/" target="_blank"
            ><img
              src="/linked_in_logo.svg"
              width="75"
              alt="linkedin"
              style="margin: 0 2px"
          /></a>
        </p>
      </div>
    </div>
    <div class="content-container footer-row">
      <div class="footer-links">
        <nuxt-link to="/impressum">Impressum</nuxt-link>
        <nuxt-link to="/datenschutz">Datenschutzerklärung</nuxt-link>
        <nuxt-link to="/agb">AGB</nuxt-link>
        <a href="javascript:UC_UI.showSecondLayer();">Cookie-Einstellungen</a>
      </div>
      <div class="copyright">
        © 2023 PFAFF GMBH |
        <img
          src="/ideenlabor-logo-bildmarke-weiss.svg"
          height="20"
          alt="ideenlabor"
          style="margin: 0 2px 5px 2px"
        />
        <a href="https://khri8.com" title="khri8! more playgrounds." style="color: #ffffff">khri8! more playgrounds.</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const grayCircle = document.querySelector('.footer .gray-circle')
    const blueCircle = document.querySelector('.footer .dark-circle')
    const lightCircle = document.querySelector('.footer .light-circle')

    setInterval(() => {
      const date = new Date()
      const seconds = date.getSeconds()
      const minutes = date.getMinutes()
      const hours = date.getHours()

      const secondsDegrees = (seconds / 60) * 360
      const minutesDegrees = (minutes / 60) * 360
      const hoursDegrees = (hours / 12) * 360

      grayCircle.style.transform = `rotate(${secondsDegrees}deg)`
      blueCircle.style.transform = `rotate(${minutesDegrees}deg)`
      lightCircle.style.transform = `rotate(${hoursDegrees}deg)`
    }, 1000)
  },
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
  transform: scale(0.7) rotate(0deg);
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
  transform: translateX(-53%);
}

.gray-circle {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--darker-gray-color);
}

.gray-stick {
  width: 7px;
  height: 30px;
  background: var(--darker-gray-color);
  position: absolute;
  top: -130%;
  left: 50%;
  transform: translateX(-53%);
}

.light-circle {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #1d9dd9;
}

.light-stick {
  width: 7px;
  height: 30px;
  background: #1d9dd9;
  position: absolute;
  top: -220%;
  left: 50%;
  transform: translateX(-53%);
}
</style>