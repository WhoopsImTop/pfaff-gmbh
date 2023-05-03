<template>
  <div class="landing-slider">
    <div
      v-for="(slide, index) in slideData"
      :key="index"
      class="content-container slide"
    >
      <h1
        class="slide-title"
        :class="slide.landingTitlePosition"
        v-html="slide.landingTitle"
      ></h1>
      <img
        :src="slide.landingImage"
        :alt="slide.landingTitle"
        class="slide-image"
      />
      <productSlider :productSlugProp="slide.landingProducts" />
    </div>
  </div>
</template>

<script>
import productSlider from './productSlider.vue'
export default {
  components: { productSlider },
  props: ['slideData'],
}
</script>

<style>
.landing-slider {
  width: 100%;
  height: calc(100vh - 100px);
  margin-bottom: 150px;
}

.content-container.slide {
  position: relative;
  margin-top: 0px;
}

.slide-title {
  position: absolute;
}

img.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.top-left {
  top: 150px;
  left: 20px;
}

.top-right {
  top: 150px;
  right: 20px;
}

.bottom-left {
  bottom: 150px;
  left: 20px;
}

.bottom-right {
  bottom: 150px;
  right: 20px;
}

.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (max-width: 1000px) {
  .top-left,
  .top-right,
  .bottom-left,
  .bottom-right,
  .center {
    top: unset;
    bottom: unset;
    left: unset;
    right: unset;
  }

  .slide-title {
    position: relative;
  }

  .slide {
    padding-top: 150px;
  }

  .landing-slider {
    width: 100%;
    height: auto !important;
  }
}
</style>