<template>
  <div :class="inComponent ? 'content-margin' : 'content-container'">
    <h2 v-if="component.title">{{ component.title }}</h2>
    <div class="card-container">
      <nuxt-link :to="'/kompetenzen/' + card.slug" v-for="(card, index) in kompetenzen" :key="index" class="pf-card">
        <div v-if="card.competenceImage" class="card-image">
          <img :src="card.competenceImage" :alt="card.competenceName" :title="card.competenceName" loading="lazy" />
        </div>
        <div class="card-content">
          <span class="product-category">{{ card.competenceName }}</span>
          <h4 style="margin-top: 10px">{{ card.competenceTitle }}</h4>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['component', 'inComponent'],

  computed: {
    kompetenzen() {
      const slugs = this.component.competencies || []
      return this.$store.state.kompetenzen
        .filter((kompetenz) => slugs.includes(kompetenz.slug))
        .sort((a, b) => slugs.indexOf(a.slug) - slugs.indexOf(b.slug))
    },
  },
}
</script>
