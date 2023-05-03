<template>
  <div>
    <div class="image-container">
      <img :src="seite.productImage" :alt="seite.productTitle" />
    </div>
    <div class="portfolio-single content-container text-container">
      <div class="portfolio-items-categories">
        <span
          v-for="(category, index) in seite.productCategories"
          :key="index"
          class="product-category"
          >{{ category }}</span
        >
      </div>
      <h1>{{ seite.productTitle }}</h1>
      <p>{{ seite.productDescription }}</p>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, app, store: { dispatch }, params }) {
    const seite = await $content(
      'produkte/' + app.i18n.locale + '/' + params.slug
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

.portfolio-single.content-container {
  margin-top: 50px;
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