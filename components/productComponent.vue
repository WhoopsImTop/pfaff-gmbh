<template>
  <nuxt-link
    :id="product.slug.toLowerCase()"
    :to="'produktbeispiele/' + product.slug"
    class="product"
  >
    <div
      class="product-image"
      :style="'background-image: url(' + product.productImage + ')'"
    ></div>
    <div class="product-name">
      <span class="product-slider-category">{{ getCategoryString }}</span>
      <h3 v-html="product.productTitle"></h3>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ProductComponent',
  props: ['product'],
  computed: {
    getCategoryString() {
      let categoryString = ''
      for (let i = 0; i < this.product.productCategories.length; i++) {
        if (i === 0) {
          categoryString = this.product.productCategories[i]
        } else {
          categoryString =
            categoryString + ' + ' + this.product.productCategories[i]
        }
      }
      return categoryString
    },
  },
}
</script>

<style>
.product {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
  box-shadow: var(--box-shadow);
  text-decoration: none;
  background-color: #ffffff;
  transition: all 0.3s ease-in-out;  
  border-radius: 4px;
  position: relative;
}

.highlighted {
  transform: translateY(-5px);
  transition: all 0.3s ease-in-out;
}

.product:last-child {
  margin-right: 0px;
}

.product:hover {
  text-decoration: none;
  transform: translateY(-5px);
  transition: all 0.3s ease-in-out;
}

.product-slider-category {
  color: var(--darker-gray-color);
  font-size: 15px;
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 250px;
  white-space: nowrap;
}

.product-image {
  min-width: 100px;
  width: 100px;
  height: 85px;
  background-position: center;
  background-size: cover;
}

.product-name {
  padding: 10px 20px;
  max-width: 300px;
}

.product-name h3 {
  font-size: 20px;
  margin-bottom: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 795px) {
  .product {
    margin-right: 0px;
    margin-bottom: 20px;
    max-width: 90vw;
  }

  .product-image {
    min-width: 100px;
    height: 80px;
  }

  .product-name {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pulseMarker {
    display: none;
  }

  .pulseMarker-relative {
    display: none;
  }

  .product-slider-category {
    white-space: nowrap;
    color: var(--darker-gray-color);
  }
}

@media (max-width: 1230px) {
  .pulseMarker {
    display: none;
  }

  .pulseMarker-relative {
    display: none;
  }
}
</style>