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
          required
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
    <button type="submit" class="button mt-4">Kontakt aufnehmen</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
        nachname: '',
        firma: '',
        email: '',
        telefon: '',
        nachricht: '',
    }
  },
}
</script>

<style>
</style>