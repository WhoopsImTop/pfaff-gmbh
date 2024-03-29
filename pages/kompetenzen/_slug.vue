<template>
  <div class="content-margin content-container">
    <div class="row">
      <div class="col-lg-6">
        <span class="smallHeadline">{{ seite.competenceName }}</span>
        <h1>{{ seite.competenceTitle }}</h1>
        <div v-html="$md.render(seite.competenceShortText ?? '')"></div>
      </div>
      <div class="competence-image-container col-lg-6">
        <img
          :src="seite.competenceImage"
          :alt="seite.competenceImageDescription ?? seite.competenceTitle"
          :title="seite.competenceImageDescription ?? seite.competenceTitle"
          loading="lazy"
        />
      </div>
    </div>
    <div class="competence-single">
      <div class="content competence-text-container" style="margin-top: 50px">
        <div v-html="$md.render(seite.competenceDescription)"></div>
      </div>
    </div>
    <component-renderer
      v-for="(component, index) in seite.pageContent"
      :key="index"
      :component="component"
      :inComponent="true"
    />
    <component-blocks
      :component="{
        title: 'Weitere Kompetenzen',
        competencies: competencies,
      }"
      :inComponent="true"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, app, store: { dispatch }, params }) {
    const seite = await $content(
      'kompetenzen/' + app.i18n.locale + '/' + params.slug
    ).fetch()
    await dispatch('nuxtServerInit')
    return { seite }
  },

  data() {
    return {
      competencies: [
        'komplettlösungen',
        'nachhaltigkeit',
        'materialien',
        'raumfertigung',
        'kleine-auflagen',
        'maschinenpark',
      ],
      competenciesToPush: [
        'insertteile',
        'filigrane-teilegeometrien',
        'mehrkomponententechnik',
        'optische-teile',
      ],
    }
  },

  head() {
    return {
      title: this.seite.competenceName,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.seite.competenceDescription,
        },
      ],
    }
  },

  beforeMount() {
    const index = this.competencies.indexOf(this.$route.params.slug)
    if (index > -1) {
      this.competencies.splice(index, 1)
      this.competenciesToPush.forEach((competence) => {
        this.competencies.push(competence)
      })
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
      name: 'Pfaff GmbH | ' + this.seite.competenceTitle,
      url: 'https://pfaffgmbh.com/kompetenzen/' + this.seite.slug,
      telephone: '+ (49) 7681 49397-0',
    }
  },
}
</script>

<style>
.competence-single.content-container {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 50px;
}

.competence-text-container {
  grid-column: 1 / 4;
}

@media (max-width: 1000px) {
  .competence-single.content-container {
    display: flex;
    flex-direction: column;
  }

  .image-container {
    height: 40vh;
  }

  .image-container img {
    object-fit: cover;
  }
}
</style>
