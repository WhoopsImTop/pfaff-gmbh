<template>
  <div class="content-container text-container">
    <h2>Aktuelle News</h2>
    <div class="card-container">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="pf-card"
      >
        <div class="card-content">
          <span class="article-date">{{ new Date(card.date).toLocaleDateString('de-DE') }}</span>
          <h3 v-html="card.title"></h3>
          <p>{{ $md.render(card.content.slice(0, 50)) }}...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['component'],
  data() {
    return {
      cards: []
    }
  },
  created() {
    this.cards = this.$store.state.news.slice(0, 3)
  }
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