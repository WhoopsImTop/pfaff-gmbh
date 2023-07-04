<template>
  <div class="content-container text-container">
    <h2>{{ component.contentTitle }}</h2>
    <p class="marketing-text" v-html="$md.render(component.contentText)"></p>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
export default {
  props: ['component'],
  mounted() {
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(
      '.text-container',
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.text-container',
          start: 'top 80%',
        },
      }
    )
  },
}
</script>

<style>
</style>