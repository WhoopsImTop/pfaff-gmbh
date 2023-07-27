<template>
  <div>
    <div class="small-card-container">
      <nuxt-link
        :to="'kompetenzen/' + card.slug"
        v-for="(card, index) in kompetenzen"
        :key="index"
        class="pf-card-sm"
      >
        <div v-if="card.competenceImage" class="small-card-image">
          <img :src="card.competenceImage" :alt="card.competenceName" :title="card.competenceName" loading="lazy" />
        </div>
        <div class="card-content">
          <span class="product-category">{{ card.competenceName }}</span>
          <h4 style="margin-top: 20px">{{ card.competenceTitle }}</h4>
          <p v-if="component.showText" >{{ card.shortText }}</p> 
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
    this.kompetenzen.sort((a, b) => {
      return (
        this.component.competencies.indexOf(a.slug) -
        this.component.competencies.indexOf(b.slug)
      )
    })
  },
}
</script>

<style>
.pf-card-sm {
  box-shadow: var(--box-shadow);
  transition: all 0.3s ease-in-out;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
}

.pf-card-sm:hover {
  text-decoration: none;
  transform: translateY(-5px);
  box-shadow: 0px 10px 15px var(--primary-light-color);
}

.small-card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(255px, calc(50% - 10px)));
  grid-gap: 20px;
}

.small-card-image {
  width: 100%;
  height: 350px;
}

.small-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 900px) {
  .small-card-container {
    grid-template-columns: 1fr;
  }  
}
</style>