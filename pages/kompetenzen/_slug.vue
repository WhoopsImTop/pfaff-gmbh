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
.image-container {
  width: 100%;
  height: 70vh;
  overflow: hidden;
  position: relative;
  margin-top: 80px;
}

.competence-single.content-container {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 50px;
}

.competence-text-container {
  grid-column: 1 / 4;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

@media (max-width: 1000px) {
  .image-container {
    height: 40vh;
  }

  .image-container img {
    object-fit: cover;
  }
}
</style>