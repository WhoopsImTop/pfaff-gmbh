<template>
  <div class="content-container">
    <div class="grid">
      <nuxt-link v-for="(block, index) in blocks" :key="index" class="product-card" :to="block.blockLink">
        <div class="product-card-image">
          <img :src="block.blockImage" :alt="block.blockTitle" />
        </div>
        <div class="product-card-content">
          <span class="product-category">{{ block.blockCategory }}</span>
          <h3 style="margin-top: 10px">{{ block.blockTitle }}</h3>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
export default {
  props: ['blocks'],
  mounted() {
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(
      '.product-card',
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        delay: (index) => index * 0.25,
        scrollTrigger: {
          trigger: '.product-card',
          start: 'top 80%',
          end: 'bottom 10%',
        },
      }
    )
  },
}
</script>

<style>
</style>