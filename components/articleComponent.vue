<template>
  <div class="content-container text-container">
    <h2>{{ component.title }}</h2>
    <div class="card-container">
      <nuxt-link
        v-for="(card, index) in cards"
        :key="index"
        class="pf-card"
        :to="'/news-medien/' + card.category + '/' + card.slug"
      >
        <div class="card-content">
          <span class="article-date">{{
            translateStatus(card.category[0])
          }}</span>
          <h3 v-html="card.title"></h3>
          <nuxt-content :document="card" />
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['component'],
  data() {
    return {
      cards: [],
    }
  },
  methods: {
    translateStatus(status) {
      return status
        .replace(/-/g, ' ')
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
    },
  },
  created() {
    this.cards = this.$store.state.news.slice(0, 3)
  },
}
</script>

<style>
.article-date {
  font-size: 14px;
  padding: 5px 10px;
  background-color: var(--primary-light-color);
  color: var(--primary-color);
  border-radius: 2px;
  display: inline-block;
  margin-bottom: 10px;
}
</style>