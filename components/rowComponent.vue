<template>
  <div
    :class="inComponent ? 'content-margin' : 'content-container'"
    class="row"
  >
    <div
      v-for="(block, index) in component.component"
      :key="index"
      :class="component.component.length > 1 ? 'col-lg-6 mb-5' : 'col p-0'"
    >
      <div v-if="block.type === 'text'">
        <span
          v-if="block.smallHeadline"
          class="smallHeadline"
          style="min-height: 30px"
          >{{ block.smallHeadline }}</span
        >
        <h2 style="min-height: 45px">{{ block.headline }}</h2>
        <div v-html="$md.render(block.text ?? '')" class="content-block-text"></div>
        <div
          v-if="rowTextButtons(block).length"
          class="row-text-buttons"
        >
          <a
            v-for="(btn, btnIndex) in rowTextButtons(block)"
            :key="btnIndex"
            class="button"
            :href="btn.buttonDownloadLink || btn.buttonLink"
            :target="btn.buttonDownloadLink ? '_blank' : ''"
            >{{ btn.buttonText }}</a
          >
        </div>
      </div>
      <div class="content-image-container" v-if="block.type === 'image'">
        <img
          class="content-image"
          :src="block.image"
          :alt="block.alt"
          :title="block.title"
          loading="lazy"
        />
      </div>
      <div v-if="block.type === 'cards'">
        <component-block-small :component="block" />
      </div>
      <div v-if="block.type === 'mainCompetencies'">
        <main-competencies-component
          :component="block"
          :inComponent="inComponent"
        />
      </div>
      <div v-if="block.type === 'cooperationForm'">
        <component-cooperation-form v-if="block.embedForm" />
      </div>
      <div v-if="block.type === 'contactForm'">
        <kontactformular-component v-if="block.embedForm" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['component', 'inComponent'],
  methods: {
    rowTextButtons(block) {
      if (!block || block.type !== 'text') return []
      const fromList = Array.isArray(block.buttons) ? block.buttons : []
      return fromList.filter(
        (b) =>
          b &&
          b.buttonText &&
          (b.buttonLink || b.buttonDownloadLink)
      )
    },
  },
}
</script>

<style scoped>
.row-text-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 10px;
}

@media (min-width: 992px) {
  .row-text-buttons {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
}

.row-text-buttons .button {
  margin-top: 0;
  text-align: center;
}

@media (min-width: 992px) {
  .row-text-buttons .button {
    text-align: left;
  }
}

@media (max-width: 991.98px) {
  .row-text-buttons .button {
    display: block;
    width: 100%;
  }
}
</style>