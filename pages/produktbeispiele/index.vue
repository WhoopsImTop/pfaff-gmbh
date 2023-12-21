<template>
  <div class="content-margin">
    <component-renderer
      v-for="(component, index) in seite.components"
      :key="index"
      :component="component"
    />
    <div class="content-container" style="margin-top: 100px">
      <div class="produktfilter">
        <button
          id="all"
          class="filter-btn active"
          @click="activeFilterBtn = 'alle'"
        >
          Alle
        </button>
        <button
          v-for="(button, index) in $store.state.kategorien"
          :id="button.productCategoryTitle"
          :key="index"
          class="filter-btn"
          @click="activeFilterBtn = button.productCategoryTitle"
        >
          {{ button.productCategoryTitle }}
        </button>
      </div>
      <div class="portfolio-grid">
        <nuxt-link
          v-for="(produkt, index) in filteredProdukte"
          :key="index"
          :to="'/produktbeispiele/' + produkt.slug"
          class="portfolio-item"
        >
          <div class="portfolio-image">
            <img
              :src="produkt.productImage"
              :alt="produkt.productTitle"
              :title="produkt.productTitle"
              loading="lazy"
            />
          </div>
          <div class="portfolio-content">
            <div class="portfolio-items-categories">
              <span
                v-for="(category, index) in produkt.productCategories"
                :key="index"
                class="product-category"
                >{{ category }}</span
              >
            </div>
            <div class="portfolio-title">
              <h4 v-html="produkt.productTitle"></h4>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, app, store: { dispatch } }) {
    const seite = await $content(
      'seiten/' + app.i18n.locale + '/produktbeispiele'
    ).fetch()
    await dispatch('nuxtServerInit')
    return { seite }
  },

  data() {
    return {
      activeFilterBtn: 'alle',
    }
  },

  head() {
    return {
      title: 'Pfaff GmbH | Produktbeispiele',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Produktbeispiele der Pfaff GmbH. Wir entwickeln mit modernen Materialien, innovativer Technik und garantieren zertifizierte Qualität unter Reinraumbedingungen.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Pfaff, Kunststoff, Kunststoffverarbeitung, Spritzguss, Spritzgussteile',
        },
        {
          property: 'og:title',
          content: 'Pfaff GmbH | Produktbeispiele',
        },
        {
          property: 'og:description',
          content:
            'Produktbeispiele der Pfaff GmbH. Wir entwickeln mit modernen Materialien, innovativer Technik und garantieren zertifizierte Qualität unter Reinraumbedingungen.',
        },
        {
          property: 'og:image',
          content: 'https://pfaffgmbh.com/pfaff-historie.jpg',
        },
        {
          property: 'og:url',
          content: 'https://pfaffgmbh.com/produktbeispiele',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:locale',
          content: 'de_DE',
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://pfaffgmbh.com/produktbeispiele',
        },
      ],
    }
  },

  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Waldkirch, Deutschland',
        postalCode: '79183',
        streetAddress: 'Spinnereistraße  4-6',
      },
      email: 'info@pfaffgmbh.com',
      member: [
        {
          '@type': 'Organization',
        },
        {
          '@type': 'Organization',
        },
      ],
      alumni: [
        {
          '@type': 'Person',
          name: 'Corinna Pfaff',
        },
        {
          '@type': 'Person',
          name: 'Andreas Buff',
        },
      ],
      name: 'Pfaff GmbH | Produktbeispiele',
      url: 'https://pfaffgmbh.com/produktbeispiele',
      telephone: '+ (49) 7681 49397-0',
    }
  },

  computed: {
    filteredProdukte() {
      if (this.activeFilterBtn === 'alle') {
        return this.$store.state.produkte
      } else {
        return this.$store.state.produkte.filter((produkt) => {
          return produkt.productCategories.includes(this.activeFilterBtn)
        })
      }
    },
  },
}
</script>

<style>
.filter-btn {
  background-color: var(--primary-light-color);
  font-size: 18px;
  text-transform: uppercase;
  color: var(--primary-color);
  border: none;
  padding: 5px 10px;
  outline: none;
  cursor: pointer;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 2px;
}

.filter-btn:hover {
  background-color: var(--primary-color);
  color: var(--primary-light-color);
}

.filter-btn.active {
  background-color: var(--primary-color);
  color: #ffffff;
}

.portfolio-grid {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(330px, calc(100% / 3 - 20px))
  );
  grid-gap: 20px;
}

.portfolio-item {
  display: flex;
  flex-direction: column;
  transition: 0.3s ease-in-out;
  box-shadow: var(--box-shadow);
  border: none;
  position: relative;
  overflow: hidden;
}

.portfolio-item::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 20px;
  background-image: url('/arrow.svg');
  background-repeat: no-repeat;
  background-size: 40px;
  background-position: center;
  width: 40px;
  height: 40px;
  transition: 0.3s ease-in-out;
}

.portfolio-item:hover::after {
  bottom: 0px;
  transition: 0.3s ease-in-out;
}

.portfolio-item:hover {
  text-decoration: none;
  transform: translateY(-5px);
  box-shadow: 0px 10px 15px var(--primary-light-color);
}

.portfolio-image {
  height: 300px;
  width: 100%;
  overflow: hidden;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portfolio-content {
  display: flex;
  flex-direction: column;
  padding: 20px 20px 50px 20px;
  overflow: hidden;
  flex-grow: 1;
  word-wrap: break-word;
}

@media (max-width: 1230px) {
  .filter-btn {
    margin: 5px;
  }
}

@media (min-width: 1000px) and (max-width: 1230px) {
  .portfolio-grid {
    grid-template-columns: repeat(
      auto-fill,
      minmax(330px, calc(100% / 2 - 20px))
    );
  }
}

@media (max-width: 1000px) {
  .filter-btn {
    font-size: 16px;
    margin: 5px;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-item {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
