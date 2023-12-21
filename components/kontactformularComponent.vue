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
      contactFormButton: 'Kontakt aufnehmen',
    }
  },
  methods: {
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
}
</script>

<style></style>
