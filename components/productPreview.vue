<template>
  <div class="preview-container">
    <div class="preview-text-container">
      <h2 class="preview-title">{{ components.productTitle }}</h2>
      <p class="preview-text marketing-text">
        {{ components.productDescription }}
      </p>
      <span class="quote">{{ components.productQuote }}</span
      ><br /><br />
      <nuxt-link
        v-if="components.productCtaLink"
        :to="components.productCtaLink"
        class="button"
        >{{ components.productCtaText }}</nuxt-link
      >
    </div>
    <div
      class="preview-image-container"
      :style="'background-image: url(' + productImage + ');'"
    >
      <div
        class="pulseMarker-relative"
        :style="
          'bottom:' +
          components.productImageMarkerPosition.bottom +
          '%; left:' +
          components.productImageMarkerPosition.left +
          '%'
        "
      >
        <div class="marker-inner"></div>
        <div class="marker-outer"></div>
      </div>
    </div>
    <div class="preview-slide-container" v-if="components.product">
      <product-slider
        :productSlugProp="components.product"
        :titlePosition="'right'"
      />
    </div>
  </div>
</template>

<script>
import productSlider from './productSlider.vue'
export default {
  components: { productSlider },
  props: ['components'],

  computed: {
    productImage() {
      if(window.innerWidth < 1000) {
        return this.components.productMobileImage ? this.components.productMobileImage : this.components.productImage
      } else {
        return this.components.productImage
      }
    },
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
  width: 100%;
  background-size: cover;
  background-position: left;
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
    height: unset !important;
    min-height: unset;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .preview-text-container {
    position: unset;
    max-width: unset;
  }

  .preview-image-container {
    min-height: 300px;
  }
}

@media (min-width: 1000px) and (max-width: 1024px) {
  .preview-container {
    position: relative;
    width: 100%;
    height: auto;
  }

  .preview-image-container {
    position: unset;
    margin-bottom: 20px;
    height: unset !important;
    min-height: unset;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .preview-text-container {
    position: unset;
    max-width: unset;
    padding: 0 50px;
  }

  .preview-image-container {
    min-height: 400px;
  }

  .preview-container .preview-slide-container .product-slider-container {
    position: relative;
    bottom: 0px;
    left: 0px;
  }
}

@media (min-width: 1025px) and (max-width: 1230px) {
  .preview-container {
    position: relative;
    width: 100%;
    height: auto;
    top: 50px;
  }

  .preview-image-container {
    position: unset;
    margin-bottom: 20px;
    height: 100vh;
    min-height: 400px;
  }

  .preview-text-container {
    top: -100px;
  }

  .pulseMarker-relative {
    display: none;
  }
}
</style>