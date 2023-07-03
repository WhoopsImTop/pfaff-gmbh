<template>
  <div>
    <div
      v-if="isMobile"
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
            v-for="(marker, i) in slide.landingProductMarkerPosition"
            :key="i"
            class="marker"
            :style="'bottom:' + marker.bottom + '%; left:' + marker.left + '%'"
            @mouseover="highlightConnectedProduct(slide.landingProducts, i)"
            @mouseout="highlightConnectedProduct(slide.landingProducts, i)"
          >
            <div class="ping-marker"></div>
            <div class="inner-cricle"></div>
          </div>
          <img :src="slide.landingImage" :alt="slide.landingTitle" />
        </div>

        <productSlider
          v-if="slide.landingProducts"
          id="productSlider"
          :productSlugProp="slide.landingProducts"
        />
      </div>
    </div>
    <div v-else ref="slider" class="landing-slider" style="margin: 0 auto">
      <div
        v-for="(slide, index) in slideData"
        :key="index"
        :style="sliderStyles"
        class="slide"
      >
        <div class="slide-content-container">
          <h1
            class="slide-title"
            :class="slide.landingTitlePosition"
            v-html="slide.landingTitle"
          ></h1>
          <productSlider
            v-if="slide.landingProducts"
            id="productSlider"
            :productSlugProp="slide.landingProducts"
          />
        </div>

        <div class="slide-image">
          <div
            v-for="(marker, i) in slide.landingProductMarkerPosition"
            :key="i"
            class="marker"
            :style="'bottom:' + marker.bottom + '%; left:' + marker.left + '%'"
            @mouseover="highlightConnectedProduct(slide.landingProducts, i)"
            @mouseout="highlightConnectedProduct(slide.landingProducts, i)"
          >
            <div class="ping-marker"></div>
            <div class="inner-cricle"></div>
          </div>
          <img :src="slide.landingImage" :alt="slide.landingTitle" />
        </div>
      </div>
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
      isMobile: false,
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
    if (window.innerWidth < 768) {
      this.isMobile = true
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
    }).from(
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
  height: calc(100% - 100px);
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

.slide-content-container {
  max-width: var(--content-max-width);
  padding: var(--content-padding);
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
  z-index: 1;
}

.slide-title {
  position: absolute;
  z-index: 2;
}

.slide-image {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  background-image: url('static/logo.svg');
  background-size: 20%;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
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
  left: 60px;
}

.top-right {
  top: 150px;
  right: 60px;
}

.bottom-left {
  bottom: 150px;
  left: 60px;
}

.bottom-right {
  bottom: 150px;
  right: 60px;
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
    padding-top: 120px;
  }

  .landing-slider {
    width: 100%;
    height: auto !important;
  }

  .slide-image {
    position: relative;
    width: 100%;
    background-image: url('static/logo.svg');
    background-size: 20%;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;
  }
}
</style>