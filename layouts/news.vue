<template>
  <div class="light-bg">
    <navbar-component />
    <div class="content-container" style="margin: 100px auto">
      <div class="grid-4">
        <nuxt class="article-container" />
        <div class="sidebar">
          <div class="scrollable_container">
            <div class="sidebar-content">
              <span class="smallHeadline" style="width: max-content">News & Medien</span>
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
            <div class="sidebar-content">
              <a href="https://www.linkedin.com/company/pfaff-gmbh/" target="_blank"><img src="/linked_in_logo_blue.svg" width="100" alt="linkedIn Logo"></a>
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
  padding: 20px 40px;
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


@media (min-width: 1000px) and (max-width: 1230px) {
  .grid-4 {
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'sidebar';
  }
}
</style>