<template>
  <div
    ref="slider"
    class="landing-slider content-container"
    style="margin: 0 auto"
  >
    <div
      v-for="(slide, index) in slideData"
      :key="index"
      :style="sliderStyles"
      class="slide"
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
      <productSlider
        id="productSlider"
        v-if="slide.landingProducts"
        :productSlugProp="slide.landingProducts"
      />
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import productSlider from './productSlider.vue'
export default {
  components: { productSlider },
  props: ['slideData'],
  data() {
    return {
      currentSlide: 0,
      slidesToShow: 1,
      slideWidth: null,
      interval: null,
    }
  },
  computed: {
    sliderStyles() {
      return {
        transform: `translateX(-${this.currentSlide * 100}%)`,
      }
    },
  },
  beforeMount() {
    if (this.slideData.length > this.slidesToShow) {
      this.interval = setInterval(() => {
        this.nextSlide()
      }, 8000)
    }
  },
  mounted() {
    window.onblur = () => {
      clearInterval(this.interval)
    }
    window.onfocus = () => {
      if (this.slideData.length > this.slidesToShow) {
        this.interval = setInterval(() => {
          this.nextSlide()
        }, 8000)
      }
    }
    const tl = gsap.timeline()
    tl.from('.slide-title', {
      duration: 1,
      y: 100,
      opacity: 0,
      delay: 0.2,
      ease: 'power4.out',
    })
      .from(
        '#productSlider',
        {
          duration: 1,
          y: 100,
          opacity: 0,
          stagger: 0.5,
          delay: 0.2,
          ease: 'power4.out',
        },
        '-=0.5'
      )

    this.$watch('currentSlide', () => {
      tl.progress(0)
      tl.pause()
      setTimeout(() => {
        tl.restart()
      }, 800)
    })
  },
  methods: {
    highlightConnectedProduct(data, index) {
      if (!Array.isArray(data)) {
        data = [data]
      }
      const id = data[index]
      document.getElementById(id).classList.toggle('highlighted')
    },
    nextSlide() {
      if (this.currentSlide < this.slideData.length - this.slidesToShow) {
        this.currentSlide++
      } else {
        this.currentSlide = 0
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--
      }
    },
  },
}
</script>

<style>
.landing-slider {
  width: 100%;
  height: calc(100vh - 100px);
  margin-bottom: 150px;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
}

.slide {
  position: relative;
  min-width: 100%;
  transition: transform 0.7s ease-in-out;
  height: 100%;
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
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