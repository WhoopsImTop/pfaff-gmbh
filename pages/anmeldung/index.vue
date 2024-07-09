<template>
  <div class="content-container">
    <div v-if="!isMailSend">
      <h1>Anmeldung Tag der offenen Türe</h1>
      <div class="row mb-4">
        <div class="col-lg-6">
          <p style="display: flex; align-items: center; margin-bottom: 10px">
            <img src="/anmeldung/calendar_event.svg" class="img-fluid mr-2" />
            Samstag, 28. September 2024
          </p>
        </div>
        <div class="col-lg-6">
          <p style="display: flex; align-items: center; margin-bottom: 10px">
            <img src="/anmeldung/clock_event.svg" class="img-fluid mr-2" />
            11:00 - 16:00 Uhr
          </p>
        </div>
      </div>
      <form>
        <div class="row">
          <div class="col-lg-6">
            <label for="email">Name*</label>
            <b-form-input
              id="name-input"
              v-model="name"
              type="text"
              placeholder="Name"
              required
            ></b-form-input>
          </div>
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
        </div>
        <div class="row mt-4">
          <div class="col-12">
            <label for="email">Anzahl der Personen*</label>
            <b-form-input
              id="personen-input"
              v-model="personenanzahl"
              type="text"
              placeholder="Anzahl der Personen"
              required
            ></b-form-input>
          </div>
        </div>

        <div style="display: none">
          <input v-model="website" type="text" name="website" />
        </div>

        <div class="row mt-4">
          <div class="col-lg-6">
            <label for="captcha"
              >Sicherheitsfrage: {{ firstNumber }} + {{ secondNumber }} =
              ?</label
            >
            <b-form-input
              id="captcha-input"
              v-model="captchaInput"
              type="text"
              required
            />
            <p v-if="showCaptchaError" class="text-danger">
              Bitte lösen Sie die Aufgabe korrekt.
            </p>
          </div>
        </div>

        <button class="button mt-4" @click="sendForm()">
          {{ contactFormButton }}
        </button>
      </form>
    </div>
    <div v-else>
      <h1>Vielen Dank für Ihre Anmeldung!</h1>
      <p>
        Wir haben Ihre Anmeldung erhalten und freuen uns, Sie am Tag der offenen
        Türe begrüssen zu dürfen.
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => {
    return {
      name: '',
      email: '',
      personenanzahl: '',
      captchaInput: '',
      website: '',
      firstNumber: 0,
      secondNumber: 0,
      showCaptchaError: false,
      isMailSend: false,
      contactFormButton: 'Anmeldung absenden',
    }
  },
  created() {
    this.firstNumber = Math.floor(Math.random() * 10) + 1
    this.secondNumber = Math.floor(Math.random() * 10) + 1
  },
  methods: {
    emailValidation(email) {
      const re = /\S+@\S+\.\S+/
      return re.test(email)
    },
    sendForm() {
      if (this.name === '' || this.email === '' || this.personenanzahl === '') {
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
      formData.append('name', this.name)
      formData.append('email', this.email)
      formData.append('personenanzahl', this.personenanzahl)

      axios
        .post('/anmeldung.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(
          (response) => {
            if (response.data.success) {
              this.name = ''
              this.email = ''
              this.personenanzahl = ''
              this.isMailSend = true
            } else {
              console.log(response)
              this.contactFormButton = 'Fehler beim Senden der Anfrage'
              setTimeout(() => {
                this.contactFormButton = 'Anmeldung absenden'
              }, 10000)
            }
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
}
</script>

<style></style>
