<template>
  <div class="content-container text-container">
    <h2>{{ component.cardsTitle }}</h2>
    <div class="card-container">
      <div
        v-for="(card, index) in component.card"
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['component'],
}
</script>

<style>
.card-container {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(335px, calc(100% / 3 - 10px))
  );
  grid-template-rows: auto;
  grid-gap: 10px;
}
</style>