<template>
  <div class="content-container text-container">
    <div v-if="component.contentImage" class="row">
      <div class="col-lg-6">
        <span v-if="component.smallHeadline" class="small-headline">{{
          component.smallHeadline
        }}</span>
        <h2>{{ component.contentTitle }}</h2>
        <p
          class="marketing-text"
          v-html="textRenderer(component.contentText)"
        ></p>
      </div>
      <div class="col-lg-6">
        <img
          :src="component.contentImage"
          width="100%"
          style="margin-bottom: 20px"
          alt="content image"
        />
        <p v-html="textRenderer(component.contentTextUnderImage)"></p>
      </div>
    </div>
    <div v-else>
      <span v-if="component.smallHeadline" class="small-headline">{{
        component.smallHeadline
      }}</span>
      <h2>{{ component.contentTitle }}</h2>
      <p class="marketing-text" v-html="textRenderer(component.contentText)"></p>
    </div>
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
  methods: {
    textRenderer(text) {
      try {
        return this.$md.render(text)
      } catch (e) {
        return text
      }
    },
  },
}
</script>

<style>
</style>