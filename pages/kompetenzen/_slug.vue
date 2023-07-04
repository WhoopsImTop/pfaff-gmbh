<template>
  <div>
    <div class="image-container">
      <img
        :src="seite.competenceImage"
        :alt="seite.competenceImageDescription ?? seite.competenceTitle"
      />
    </div>
    <div class="competence-single content-container">
      <div class="content competence-text-container">
        <h1>{{ seite.competenceTitle }}</h1>
        <p v-html="$md.render(seite.competenceDescription)"></p>
      </div>
    </div>
    <component-blocks
      :component="{
        title: 'Weitere Kompetenzen',
        competencies: [
          'komplettlösungen',
          'projektmanagement',
          'materialien',
          'raumfertigung',
          'kleine-auflagen',
          'maschinenpark',
        ],
      }"
    />
  </div>
</template>
  
  <script>
export default {
  async asyncData({ $content, app, store: { dispatch }, params }) {
    const seite = await $content(
      'kompetenzen/' + app.i18n.locale + '/' + params.slug
    ).fetch()
    await dispatch('nuxtServerInit')
    return { seite }
  },
}
</script>
  
<style>
.competence-single.content-container {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 50px;
}

.competence-text-container {
  grid-column: 1 / 4;
}

@media (max-width: 1000px) {
  .competence-single.content-container {
    display: flex;
    flex-direction: column;
  }
  
  .image-container {
    height: 40vh;
  }

  .image-container img {
    object-fit: cover;
  }
}
</style>