<template>
  <div class="content-container">
    <h1>Impressum</h1>
    <div style="word-wrap: break-word">
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        Pfaff GmbH<br />
        Spinnereistraße 4-6<br />
        79183 Waldkirch
      </p>

      <p>
        Handelsregister: HRB 280289<br />
        Registergericht: Amtsgericht Freiburg
      </p>

      <p>
        <strong>Vertreten durch:</strong><br />
        Corinna Pfaff
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: +49 (0) 7681 49397-0<br />
        Telefax: +49 (0) 7681 49397-29<br />
        E-Mail: info@pfaffgmbh.com
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
        DE 141940185
      </p>

      <h2>Redaktionell verantwortlich</h2>
      <p>Pfaff GmbH</p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
          >https://ec.europa.eu/consumers/odr/</a
        >.<br />
        Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>

      <h2>
        Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle
      </h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Impressum',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Impressum der Pfaff GmbH in Waldkirch',
        },
      ],
    }
  },
}
</script>

<style></style>
