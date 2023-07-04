<template>
  <div class="content-container text-container">
    <h2>{{ component.cardsTitle }}</h2>
    <div class="card-container">
      <nuxt-link
        v-for="(card, index) in component.card"
        :to="'/' + card.cardLink"
        :key="index"
        class="pf-card"
      >
        <div v-if="card.cardImage" class="card-image">
          <img :src="card.cardImage" :alt="card.cardTitle" />
        </div>
        <div class="card-content">
          <h3 style="margin-top: 10px">{{ card.cardTitle }}</h3>
          <p>{{ card.cardText }}</p>
        </div>
      </nuxt-link>
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
      '.pf-card',
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: .3,
        delay: (index) => index * 0.25,
        scrollTrigger: {
          trigger: '.card-container',
          start: 'top 20%',
          end: 'bottom 10%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  },
}
</script>

<style>
</style>