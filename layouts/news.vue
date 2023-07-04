<template>
  <div class="light-bg">
    <navbar-component />
    <div class="content-container" style="margin: 100px auto">
      <div class="grid-4">
        <nuxt class="article-container" />
        <div class="sidebar">
          <div class="scrollable_container">
            <div class="sidebar-content">
              <span class="smallHeadline">News & Medien</span>
              <h4>Immer Informiert</h4>
              <p>
                Bleiben Sie auf dem Laufenden mit News, Fachbeiträgen,
                Pressemitteilungen und Stellenausschreibungen.
              </p>
            </div>
            <div class="sidebar-content">
              <h4>Themen</h4>
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
  display: flex;
  flex-direction: column;
}

.grid-4 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: 'header header header header sidebar sidebar';
  grid-gap: 40px;
  padding: 60px 0;
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
  margin-bottom: 20px;
  padding: 40px;
}

.scrollable_container {
  position: sticky;
  top: 100px;
}

.article-container {
  grid-area: header;
}

@media (max-width: 1000px) {
  .grid-4 {
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    padding: 0;
  }

  .article-background {
    padding: 0;
    box-shadow: none;
  }

  .sidebar-content {
    padding: 20px 0;
  }

  .article-informations {
    display: block;
  }
}
</style>