<template>
  <div class="light-bg">
    <navbar-component />
    <div class="content-container grid-4">
      <nuxt class="article-container" />
      <div class="sidebar">
        <div class="scrollable_container">
          <div class="sidebar-content">
            <span class="smallHeadline">News & Medien</span>
            <h2>Immer Informiert</h2>
            <p>
              Bleiben Sie auf dem Laufenden mit News, Fachbeiträgen,
              Pressemitteilungen und Stellenausschreibungen.
            </p>
          </div>
          <div class="sidebar-content">
            <h3>Themen</h3>
            <nuxt-link
              v-for="(link, index) in $store.state.blogKategorien"
              :key="index"
              :to="
                '/news-medien/' +
                link.categoryTitle.replace(/ /g, '-').toLowerCase()
              "
              style="margin-bottom: 10px"
            >
              {{ link.categoryTitle }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <footer-component />
  </div>
</template>
  
  <script>
import FooterComponent from '~/components/footerComponent.vue'
import navbarComponent from '~/components/navbarComponent.vue'
export default {
  components: { navbarComponent, FooterComponent },
}
</script>
  
<style>
.light-bg {
  background-color: var(--primary-light-color);
  display: flex;
  flex-direction: column;
}

.grid-4 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: 'header header header header sidebar sidebar';
  grid-gap: 10px;
  padding: 10px;
  color: #444;
}

.sidebar {
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  background-color: #ffffff;
  padding: 20px;
}

.scrollable_container {
  position: sticky;
  top: 100px;
}

.article-container {
  grid-area: header;
}
</style>