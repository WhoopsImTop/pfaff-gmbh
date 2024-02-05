<template>
  <div class="content-container text-container">
    <div v-if="component.contentImage" class="row">
      <div class="col-lg-6">
        <span v-if="component.smallHeadline" class="small-headline">{{
          component.smallHeadline
        }}</span>
        <h2>{{ component.contentTitle }}</h2>
        <div
          class="marketing-text"
          v-html="textRenderer(component.contentText)"
        ></div>
      </div>
      <div class="col-lg-6">
        <img
          :src="component.contentImage"
          width="100%"
          style="margin-bottom: 20px"
          alt="content image"
        />
        <div v-if="component.contentTextUnderImage" v-html="textRenderer(component.contentTextUnderImage)"></div>
      </div>
    </div>
    <div v-else>
      <span v-if="component.smallHeadline" class="small-headline">{{
        component.smallHeadline
      }}</span>
      <h2>{{ component.contentTitle }}</h2>
      <div class="marketing-text" v-html="textRenderer(component.contentText)"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['component'],
  mounted() {
    window.gsap.registerPlugin(window.ScrollTrigger)
    window.gsap.fromTo(
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