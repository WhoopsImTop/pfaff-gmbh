<template>
  <div class="content-container text-container">
    <h2>{{ component.contentTitle }}</h2>
    <div class="card-container">
      <div
        v-for="(card, index) in component.cards"
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

.pf-card {
  display: flex;
  flex-direction: column;
  transition: 0.3s ease-in-out;
  background-color: var(--light-gray-color);
  border: none;
}

.card-content {
  padding: 20px 20px 50px 20px;
  position: relative;
  overflow: hidden;
  flex-grow: 1;
}

.card-content::after {
  content: '';
  display: block;
  background-image: url('/arrow.svg');
  background-repeat: no-repeat;
  background-size: 40px;
  background-position: center;
  position: absolute;
  bottom: -5px;
  left: 20px;
  width: 50px;
  height: 40px;
  transition: 0.3s ease-in-out;
}

.pf-card:hover .card-content::after {
  transform: translateY(-5px);
  transition: 0.3s ease-in-out;
}

.pf-card:hover {
  cursor: pointer;
}

.card:hover {
  cursor: pointer;
  box-shadow: 0px 10px 20px var(--primary-light-color);
  transform: translateY(-3px);
  transition: 0.3s ease-in-out;
}
</style>