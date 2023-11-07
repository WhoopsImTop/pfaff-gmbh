<template>
  <div class="link-item">
    <nuxt-link class="navigation-link" :to="'/' + component.siteLink">
      {{ component.siteTitle }}
    </nuxt-link>
    <div v-if="component.featuredProducts" class="productRow">
      <nuxt-link
        v-for="produkt in component.featuredProducts"
        :key="produkt.productTitle"
        class="product-link"
        :to="'/produktbeispiele/' + produkt.slug"
      >
        <div class="product-link-image">
          <img
            :src="produkt.productImage"
            :alt="produkt.productTitle"
            :title="produkt.productTitle"
          />
        </div>
        <div class="product-link-content">
          <div>
            <h6>{{ produkt.productTitle }}</h6>
          </div>
        </div>
      </nuxt-link>
      <nuxt-link class="showAll" to="/produktbeispiele">Alle anzeigen</nuxt-link>
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
            :alt="competency.competenceName"
            :title="competency.competenceName"
          />
        </div>
        <div class="product-link-content">
          <div>
            <h6>{{ competency.competenceName }}</h6>
          </div>
        </div>
      </nuxt-link>

      <nuxt-link class="showAll" to="/kompetenzen">Alle anzeigen</nuxt-link>
    </div>
    <div v-if="component.cards" class="productRow">
      <nuxt-link
        class="product-link"
        v-for="produkt in component.cards.card"
        :key="produkt.cardTitle"
        :to="'/' + produkt.cardLink"
      >
        <div class="product-link-image">
          <img
            :src="produkt.cardImage"
            :alt="produkt.cardTitle"
            :title="produkt.cardTitle"
          />
        </div>
        <div class="product-link-content">
          <div>
            <h6>{{ produkt.cardTitle }}</h6>
          </div>
        </div>
      </nuxt-link>
      <nuxt-link class="showAll" to="/news-medien">Alle anzeigen</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['component'],
}
</script>

<style>
.productRow,
.competenciesRow {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding: 0 0 20px 0;
  justify-items: center;
  align-items: center;
}

.product-link {
  display: flex;
  flex-direction: row;
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  margin: 0 !important;
  width: 100%;
  height: 100%;
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
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

.showAll {
  font-size: 16px !important;
}

.showAll:hover {
  color: var(--primary-red-color) !important;
}

@media (max-width: 1440px) {
  .productRow,
  .competenciesRow {
    display: none;
  }
}
</style>