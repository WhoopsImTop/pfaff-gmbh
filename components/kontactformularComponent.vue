<template>
  <form>
    <div class="row">
      <div class="col-lg-6">
        <label for="email">Nachname*</label>
        <b-form-input
          id="nachname-input"
          v-model="nachname"
          type="text"
          placeholder="Nachname"
          required
        ></b-form-input>
      </div>
      <div class="col-lg-6">
        <label for="email">Firma*</label>
        <b-form-input
          id="firma-input"
          v-model="firma"
          type="text"
          placeholder="Firma"
          required
        ></b-form-input>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-6">
        <label for="email">E-Mail-Adresse*</label>
        <b-form-input
          id="email-input"
          v-model="email"
          type="email"
          placeholder="Email"
          required
        ></b-form-input>
      </div>
      <div class="col-lg-6">
        <label for="email">Telefon</label>
        <b-form-input
          id="telefon-input"
          v-model="telefon"
          type="text"
          placeholder="Telefon"
        ></b-form-input>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <label for="email">Wie lautet ihre Anfrage?</label>
        <b-form-textarea
          id="nachricht-input"
          v-model="nachricht"
          placeholder="Nachricht"
          rows="4"
          required
        ></b-form-textarea>
      </div>
    </div>

    <div style="display: none">
      <input v-model="website" type="text" name="website" />
    </div>

    <div class="row mt-4">
      <div class="col-lg-6">
        <label for="captcha">Sicherheitsfrage: {{ firstNumber }} + {{ secondNumber }} = ?</label>
        <b-form-input type="text" id="captcha-input" v-model="captchaInput" required />
        <p v-if="showCaptchaError" class="text-danger">
          Bitte lösen Sie die Aufgabe korrekt.
        </p>
      </div>
    </div>

    <button @click="sendForm()" class="button mt-4">
      {{ contactFormButton }}
    </button>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      nachname: '',
      firma: '',
      email: '',
      telefon: '',
      nachricht: '',
      website: '',
      contactFormButton: 'Kontakt aufnehmen',
      firstNumber: Math.floor(Math.random() * 10) + 1,
      secondNumber: Math.floor(Math.random() * 10) + 1,
      captchaInput: '',
      showCaptchaError: false,
    }
  },
  methods: {
    emailValidation(email) {
      const re = /\S+@\S+\.\S+/
      return re.test(email)
    },
    sendForm() {
      if (
        this.nachname === '' ||
        this.firma === '' ||
        this.email === '' ||
        this.nachricht === ''
      ) {
        this.contactFormButton = 'Bitte füllen Sie alle Felder aus'
        setTimeout(() => {
          this.contactFormButton = 'Kontakt aufnehmen'
        }, 5000)
        return
      }

      if (!this.emailValidation(this.email)) {
        this.contactFormButton =
          'Bitte geben Sie eine gültige E-Mail-Adresse ein'
        setTimeout(() => {
          this.contactFormButton = 'Kontakt aufnehmen'
        }, 5000)
        return
      }

      if (
        parseInt(this.captchaInput) !==
        this.firstNumber + this.secondNumber
      ) {
        this.showCaptchaError = true
        return
      }

      if (this.website !== '') {
        return
      }

      event.preventDefault()
      const formData = new FormData()
      formData.append('name', this.nachname)
      formData.append('firm', this.firma)
      formData.append('email', this.email)
      formData.append('phone', this.telefon)
      formData.append('message', this.nachricht)

      axios
        .post('/mail.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(
          (response) => {
            console.log(response)
            this.nachname = ''
            this.firma = ''
            this.email = ''
            this.telefon = ''
            this.nachricht = ''
            this.contactFormButton = 'Vielen Dank für Ihre Anfrage'
            setTimeout(() => {
              this.contactFormButton = 'Kontakt aufnehmen'
            }, 10000)
          },
          (error) => {
            console.log(error)
            this.contactFormButton = 'Fehler beim Senden der Anfrage'
            setTimeout(() => {
              this.contactFormButton = 'Kontakt aufnehmen'
            }, 10000)
          }
        )
    },
  },
  created() {
    this.firstNumber = Math.floor(Math.random() * 10) + 1
    this.secondNumber = Math.floor(Math.random() * 10) + 1
  },
}
</script>

<style></style>
