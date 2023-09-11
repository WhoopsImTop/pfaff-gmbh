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
          <span class="article-date">{{ translateStatus(card.category) }}</span>
          <h3 v-html="card.title"></h3>
          <p v-if="card.shortText">{{ card.shortText }}</p>
          <p v-else>
            <nuxt-content :document="{ body: card.excerpt }" />
          </p>
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
    let cards = [...this.$store.state.news]

    if (this.component.newsCategories) {
      const categories = this.component.newsCategories.map((category) => {
        return category.replace(/ /g, '-').toLowerCase()
      })

      cards = cards.filter((card) => {
        return categories.includes(card.category)
      })
    }

    cards.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })

    this.cards = cards.slice(0, 3)
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