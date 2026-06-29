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
import {
  breadcrumbSchema,
  buildSeoHead,
  organizationSchema,
  resolveDescription,
} from '~/utils/seo'

const COMPETENCE_KEYWORDS = {
  raumfertigung:
    'Reinraumfertigung ISO 7, Reinraum Spritzguss, Medizintechnik Reinraum',
  'kleine-auflagen':
    'Prototypen Spritzguss, Kleinserie Kunststoff, StartUp Spritzguss Partner',
  insertteile: 'Insert-Molding, Umspritzen Kunststoff, Insertteile Spritzguss',
  'filigrane-teilegeometrien':
    'Mikrospritzguss, Kleinstteile Spritzguss, filigrane Kunststoffteile',
  mehrkomponententechnik:
    'Mehrkomponentenspritzguss, 2K Spritzguss, Mehrkomponententechnik Medizintechnik',
  'optische-teile':
    'optische Spritzgussteile, Linsen Spritzguss, Lichtleiter Fertigung',
  materialien: 'PEEK Spritzguss, PPSU Kunststoff, Hochleistungskunststoffe',
  maschinenpark: 'Arburg Spritzguss, vollelektrisch Spritzgussmaschine',
  komplettlösungen: 'Komplettlösungen Spritzguss, Baugruppen Kunststoff',
  nachhaltigkeit: 'nachhaltiger Spritzguss, umweltbewusste Kunststoffverarbeitung',
}

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

  computed: {
    competencePath() {
      return `/kompetenzen/${this.seite.slug}`
    },
    breadcrumbSchemaItems() {
      return [
        { name: 'Startseite', path: '/' },
        { name: 'Kompetenzen', path: '/kompetenzen' },
        { name: this.seite.competenceName, path: this.competencePath },
      ]
    },
    competenceDescription() {
      return resolveDescription(
        this.seite.seoDescription,
        this.seite.competenceShortText,
        this.seite.competenceDescription
      )
    },
  },

  head() {
    return buildSeoHead({
      title: this.seite.seoTitle || this.seite.competenceName,
      description: this.competenceDescription,
      path: this.competencePath,
      image: this.seite.competenceImage,
      keywords:
        COMPETENCE_KEYWORDS[this.seite.slug] ||
        `Spritzguss, ${this.seite.competenceName}, Pfaff GmbH`,
    })
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
    return [
      organizationSchema({
        name: `Pfaff GmbH | ${this.seite.competenceTitle}`,
        url: `https://pfaffgmbh.com${this.competencePath}`,
      }),
      breadcrumbSchema(this.breadcrumbSchemaItems),
    ]
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
