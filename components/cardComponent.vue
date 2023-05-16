<template>
  <div class="content-container text-container">
    <h2>{{ component.cardsTitle }}</h2>
    <div class="card-container">
      <nuxt-link
        v-for="(card, index) in component.card"
        :to="'/' + card.cardLink"
        :key="index"
        class="pf-card"
      >
        <div v-if="card.image" class="card-image">
          <img :src="card.image" :alt="card.cardTitle" />
        </div>
        <div class="card-content">
          <h3 style="margin-top: 10px">{{ card.cardTitle }}</h3>
          <p>{{ card.cardText }}</p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['component'],
}
</script>

<style>
</style>