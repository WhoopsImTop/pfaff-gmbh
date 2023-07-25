<template>
  <div class="link-item">
    <nuxt-link class="navigation-link" :to="'/' + component.siteLink">
      {{ component.siteTitle }}
    </nuxt-link>
    <div v-if="component.featuredProducts" class="productRow">
      <nuxt-link
        class="product-link"
        v-for="produkt in component.featuredProducts"
        :key="produkt.productTitle"
        :to="'/produktbeispiele/' + produkt.slug"
      >
        <div class="product-link-image">
          <img
            :src="produkt.productImage"
            :alt="produkt.productTitle"
            :title="produkt.productTitle"
            loading="lazy"
          />
        </div>
        <div class="product-link-content">
          <div>
            <h5>{{ produkt.productTitle }}</h5>
          </div>
        </div>
      </nuxt-link>
    </div>
    <div v-if="component.featuredCompetencies" class="competenciesRow">
      <nuxt-link
        class="product-link"
        v-for="competency in component.featuredCompetencies"
        :key="competency.competencyName"
        :to="'/kompetenzen/' + competency.slug"
      >
        <div class="product-link-image">
          <img
            :src="competency.competenceImage"
            :alt="competency.competenceTitle"
            :title="competency.competenceTitle"
            loading="lazy"
          />
        </div>
        <div class="product-link-content">
          <div>
            <h5>{{ competency.competenceTitle }}</h5>
          </div>
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
.productRow, .competenciesRow {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.product-link {
  display: flex;
  flex-direction: row;
  margin: 0 20px 0 0 !important;
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  max-width: 350px;
}

.product-link-image {
  width: 120px;
  display: flex;
  justify-content: flex-start;
}

.product-link-image img {
  width: 120px;
  height: 100%;
  object-fit: cover;
}

.product-link-content {
  padding: 20px;
}

.link-item {
  width: 100%;
  margin: 0;
  border-bottom: 1px solid var(--primary-light-color);
}

.navigation-link {
  width: 100%;
  display: block;
  padding: 20px 0;
  margin: 0 !important;
}
</style>