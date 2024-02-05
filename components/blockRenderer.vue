<template>
  <div class="content-container">
    <h2 v-if="title">{{ title }}</h2>
    <div class="grid">
      <nuxt-link
        v-for="(block, index) in blocks"
        :key="index"
        class="product-card"
        :to="block.blockLink ? block.blockLink : block.blockLinkCompetencies"
      >
        <div class="product-card-image">
          <img
            :src="block.blockImage"
            :alt="block.blockTitle"
            :title="block.blockTitle"
          />
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
export default {
  props: {
    blocks: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  mounted() {
    window.gsap.registerPlugin(window.ScrollTrigger)
    window.gsap.fromTo(
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
        },
      }
    )
  },
}
</script>

<style></style>
