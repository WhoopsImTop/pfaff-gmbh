<template>
  <div class="content-margin">
    <div class="image-container">
      <img
        :src="seite.productImage"
        :alt="seite.productTitle"
        loading="lazy"
        :title="seite.productTitle"
      />
    </div>
    <div class="portfolio-single content-container">
      <div class="content text-container">
        <div class="portfolio-items-categories">
          <span
            v-for="(category, index) in seite.productCategories"
            :key="index"
            class="product-category"
            >{{ category }}</span
          >
        </div>
        <h1>{{ seite.productTitle }}</h1>
        <p v-html="$md.render(seite.productDescription)"></p>
      </div>
      <div class="zusatzinformationen">
        <h3>Zusatzinformationen</h3>
        <div class="info-container">
          <div
            class="info"
            v-for="(info, index) in seite.productFeatures"
            :key="index"
          >
            <strong>{{ info.featureTitle }}</strong>
            <p>{{ info.featureText }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="three-products-grid content-container">
      <nuxt-link
        v-for="(produkt, index) in relatedProducts"
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
            <h4>{{ produkt.productTitle }}</h4>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, app, store: { dispatch }, params }) {
    const seite = await $content(
      'produkte/' + app.i18n.locale + '/' + params.slug
    ).fetch()
    await dispatch('nuxtServerInit')
    const products = await $content('produkte/' + app.i18n.locale).fetch()
    const relatedProducts = []
    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      const productCategories = product.productCategories
      for (let j = 0; j < productCategories.length; j++) {
        const productCategory = productCategories[j]
        if (
          productCategory === seite.productCategories[0] &&
          product.slug !== seite.slug
        ) {
          relatedProducts.push(product)
        }
      }
    }
    relatedProducts.length = 3
    return { seite, relatedProducts }
  },

  head() {
    return {
      title: 'Pfaff GmbH | Produktbeispiel | ' + this.seite.productTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.seite.productDescription,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Pfaff, Kunststoff, Kunststoffverarbeitung, Spritzguss, Spritzgussteile',
        },
        {
          property: 'og:title',
          content: 'Pfaff GmbH | Produktbeispiel | ' + this.seite.productTitle,
        },
        {
          property: 'og:description',
          content: this.seite.productDescription,
        },
        {
          property: 'og:image',
          content: this.seite.productImage,
        },
        {
          property: 'og:url',
          content: 'https://pfaffgmbh.com/produktbeispiele/' + this.seite.slug,
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
          href: 'https://pfaffgmbh.com/produktbeispiele/' + this.seite.slug,
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
      name: 'Pfaff GmbH | Produktbeispiel | ' + this.seite.productTitle,
      url: 'https://pfaffgmbh.com/produktbeispiele/' + this.seite.slug,
      telephone: '+ (49) 7681 49397-0',
    }
  },
}
</script>

<style>
.portfolio-single.content-container {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
}

.zusatzinformationen {
  grid-column: 3 / 4;
}

.info-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

.content.text-container {
  grid-column: 1 / 3;
}

.three-products-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  margin-top: 80px;
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
@media (max-width: 1000px) {
  .image-container {
    height: 40vh;
  }

  .image-container img {
    object-fit: cover;
  }

  .portfolio-single.content-container {
    display: flex;
    flex-direction: column;
  }

  .three-products-grid {
    display: flex;
    flex-direction: column;
  }

  .info-container {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 1230px) {
  .product-category {
    margin-bottom: 5px;
  }
}
</style>