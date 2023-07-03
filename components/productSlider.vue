<template>
  <div class="product-slider-container">
    <h5 v-if="displayHeading == true" class="" :class="titlePosition" >{{$i18n.locale == 'de' ? 'Gezeigte Produkte' : 'shown Products' }}</h5>
    <div class="product-slider">
      <product-component
        v-for="product in products"
        :key="product.slug"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import productComponent from './productComponent.vue'
export default {
  components: { productComponent },
  props: ['productSlugProp', 'showTitle', 'titlePosition'],
  data() {
    return {
      productSlug: this.productSlugProp,
      displayHeading: this.showTitle ?? true,
      products: [],
    }
  },
  beforeMount() {
    if (typeof this.productSlug === 'string') {
      for (let i = 0; i < this.$store.state.produkte.length; i++) {
          if (this.$store.state.produkte[i].slug === this.productSlug) {
            this.products.push(this.$store.state.produkte[i])
        }
      }
    } else {
      for (let i = 0; i < this.$store.state.produkte.length; i++) {
        for (let y = 0; y < this.productSlug.length; y++) {
          if (this.$store.state.produkte[i].slug === this.productSlug[y]) {
            this.products.push(this.$store.state.produkte[i])
          }
        }
      }
    }
  },
  mounted() {
  },
}
</script>

<style>
.product-slider-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 50px;
  right: 50px;
}

.product-slider {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.small-title {
  display: none;
}

.small-title.left {
  text-align: left !important;
  background-color: var(--primary-light-color);
  padding: 5px;
  width: max-content;
  border-radius: 2px;
}

@media (max-width: 1000px) {
  .product-slider-container {
    position: relative;
    bottom: 0px;
    right: 0px;
  }

  .small-title {
    text-align: left;
    display: block;
  }
}
</style>