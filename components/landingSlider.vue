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
      <div class="slide-image">
        <div
          v-for="(marker, index) in slide.landingProductMarkerPosition"
          :key="index"
          class="marker"
          :style="'bottom:' + marker.bottom + '%; left:' + marker.left + '%'"
          @mouseover="highlightConnectedProduct(slide.landingProducts, index)"
          @mouseout="highlightConnectedProduct(slide.landingProducts, index)"
        >
          <div class="ping-marker"></div>
          <div class="inner-cricle"></div>
        </div>
        <img :src="slide.landingImage" :alt="slide.landingTitle" />
      </div>
      <productSlider v-if="slide.landingProducts" :productSlugProp="slide.landingProducts" />
    </div>
  </div>
</template>

<script>
import productSlider from './productSlider.vue'
export default {
  components: { productSlider },
  props: ['slideData'],
  methods: {
    highlightConnectedProduct(data, index) {
      if(!Array.isArray(data)) {
        data = [data]
      }
      const id = data[index]
      document.getElementById(id).classList.toggle('highlighted')
    },
  },
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
  z-index: 2;
}

.slide-image {
  position: relative;
}

.slide-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.marker {
  background: var(--primary-light-color);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  z-index: 2;
}

.ping-marker {
  background: var(--primary-color);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: absolute;
  z-index: 2;
  bottom: 7.5px;
  left: 7.5px;
  animation: ping 2s infinite cubic-bezier(0, 0, 0.2, 1);
}

.inner-cricle {
  background: var(--primary-color);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: absolute;
  z-index: 2;
  bottom: 7.5px;
  left: 7.5px;
}

@keyframes ping {
  0% {
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.top-left {
  top: 150px;
  left: 50px;
}

.top-right {
  top: 150px;
  right: 50px;
}

.bottom-left {
  bottom: 150px;
  left: 50px;
}

.bottom-right {
  bottom: 150px;
  right: 50px;
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