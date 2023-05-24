<template>
  <div class="preview-container">
    <div class="preview-text-container">
      <h2 class="preview-title">{{ components.productTitle }}</h2>
      <p class="preview-text marketing-text">
        {{ components.productDescription }}
      </p>
      <span class="quote">{{ components.productQuote }}</span>
    </div>
    <div class="preview-image-container">
      <img :src="components.productImage" :alt="components.productTitle" />
    </div>
    <div class="preview-slide-container" v-if="components.product">
      <product-slider
        :productSlugProp="components.product"
        :titlePosition="'left'"
      />
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import productSlider from './productSlider.vue'
export default {
  components: { productSlider },
  props: ['components'],
  mounted() {
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(
      '.preview-title',
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: '.preview-container',
          start: 'top 0%',
          offset: 300,
        },
      }
    )
  },
}
</script>

<style>
.preview-container {
  position: relative;
  width: 100%;
  height: 80vh;
}

.preview-image-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.preview-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-text-container {
  position: absolute;
  left: 50%;
  top: 0px;
  max-width: 600px;
  padding: 0px 20px;
  z-index: 20;
}

.preview-slide-container {
  bottom: 20px;
  margin: 0 auto;
  left: 0px;
  max-width: var(--content-max-width);
  padding: var(--content-padding);
  width: 100%;
}

.preview-slide-container .product-slider-container {
  right: unset;
}

.quote {
  font-style: italic;
}

@media (max-width: 1000px) {
  .preview-container {
    position: relative;
    width: 100%;
    height: auto;
  }

  .preview-image-container {
    position: unset;
    margin-bottom: 20px;
  }

  .preview-text-container {
    position: unset;
    max-width: unset;
  }
}
</style>