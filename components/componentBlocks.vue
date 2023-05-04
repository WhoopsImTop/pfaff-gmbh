<template>
  <div class="content-container">
    <h2 v-if="component.title">{{ component.title }}</h2>
    <div class="card-container">
      <nuxt-link :to="'kompetenzen/' + card.slug" v-for="(card, index) in kompetenzen" :key="index" class="pf-card">
        <div v-if="card.competenceImage" class="card-image">
          <img :src="card.competenceImage" :alt="card.competenceName" />
        </div>
        <div class="card-content">
          <span class="product-category">{{ card.competenceName }}</span>
          <h4 style="margin-top: 10px">{{ card.competenceTitle }}</h4>
          <!-- <p>{{ card.competenceDescription.slice(0, 50) }}</p> -->
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['component'],
  data: () => {
    return {
      kompetenzen: [],
    }
  },
  mounted() {
    for (let i = 0; i < this.$store.state.kompetenzen.length; i++) {
      for (let j = 0; j < this.component.competencies.length; j++) {
        if (
          this.$store.state.kompetenzen[i].slug ===
          this.component.competencies[j]
        ) {
          this.kompetenzen.push(this.$store.state.kompetenzen[i])
        }
      }
    }
  },
}
</script>

<style>
</style>