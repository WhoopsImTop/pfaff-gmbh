<template>
  <div>
    <label for="email">Ihre E-Mail Adresse*</label>
    <b-form-input
      id="newsletter-email-input"
      v-model="email"
      type="email"
      placeholder="E-Mail Adresse eingeben"
      required
    ></b-form-input>
    <br />
    <span style="display: block; margin-bottom: 10px;"die-abgesendeten-daten-werden-nur-zum-zweck-der-bearbeitung-ihres-anliegens-verarbeitet-weitere-informationen-finden-sie-in-unserer-datenschutzerklarung-span-b-form-group-v-slot"{ ariaDescribedby }">
      <b-form-radio
        v-model="selected"
        :aria-describedby="ariaDescribedby"
        name="some-radios"
        value="no-newsletter"ich-mochte-lediglich-die-referenzen-downloaden-und-wunsche-keine-weitere-informationen-b-form-radio-b-form-radio-v-model"selected"
        :aria-describedby="ariaDescribedby"
        name="some-radios"
        value="newsletter"
        >Ich bin nach dem Download mit einer weiteren Kontaktaufnahme
        einverstanden.
      </b-form-radio>
    </b-form-group>
    <button class="button" @click="submitForm">Download starten</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      email: null,
    }
  },
  methods: {
    submitForm() {
      console.log("form Submission")
    },
  },
}
</script>

<style>
</style>