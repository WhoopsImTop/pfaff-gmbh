<template>
  <div class="content-container">
    <div class="grid">
      <div v-for="(block, index) in blocks" :key="index" class="product-card">
        <div class="product-card-image">
          <img :src="block.blockImage" :alt="block.title" />
        </div>
        <div class="product-card-content">
          <span class="product-category">{{ block.blockCategory }}</span>
          <h3 style="margin-top: 10px">{{ block.blockTitle }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blocks'],
}
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(335px, calc(100% / 3 - 10px))
  );
  grid-template-rows: auto;
  grid-gap: 10px;
  margin: 0 auto;
}

.product-card {
  display: flex;
  flex-direction: column;
  transition: .3s ease-in-out;
}

.product-card:hover {
  cursor: pointer;
  box-shadow: 0px 10px 20px var(--primary-light-color);
  transform: translateY(-3px);
  transition: .3s ease-in-out;
}

.product-card-image {
  width: 100%;
  height: auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-card-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.product-card-content {
  padding: 20px;
}

.product-category {
  color: var(--primary-color);
  font-size: 12px;
  text-transform: uppercase;
  background-color: var(--primary-light-color);
  padding: 5px;
  border-radius: 2px;
  margin-right: 5px;
}
</style>