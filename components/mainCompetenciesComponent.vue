<template>
  <div>
    <h2>{{ component.headline }}</h2>
    <div class="card-container">
      <nuxt-link
        v-for="(card, index) in competencies"
        :to="'/kompetenzen/' + card.slug"
        :key="index"
        class="pf-card"
      >
        <div v-if="card.competenceImage" class="card-image">
          <img
            :src="card.competenceImage"
            :alt="card.competenceTitle"
            :title="card.competenceTitle"
            loading="lazy"
          />
        </div>
        <div class="card-content">
          <span
            v-if="card.competenceName"
            class="smallHeadline"
            style="min-height: 30px"
            >{{ card.competenceName }}</span
          >
          <h4 v-if="card.competenceTitle" style="min-height: 45px">
            {{ card.competenceTitle }}
          </h4>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['component'],

  computed: {
    competencies() {
      const filteredCompetencies = this.component.competencies.filter(
        (competence) =>
        competence !== this.$route.params.slug
      )
      return this.$store.state.kompetenzen.filter((competence) =>
        filteredCompetencies.includes(competence.slug)
      )
    },
  },
}
</script>

<style>
</style>