<template>
  <div :class="inComponent ? 'content-margin' : 'content-container'" class="row">
    <div v-for="(block, index) in component.component" :key="index" :class="component.component.length > 1 ? 'col-lg-6' : 'col p-0'">
      <div v-if="block.type === 'text'">
        <span v-if="block.smallHeadline" class="smallHeadline" style="min-height: 30px;">{{ block.smallHeadline }}</span>
        <h2 style="min-height: 45px">{{ block.headline }}</h2>
        <p v-html="$md.render(block.text ?? '')"></p>
        <a class="button" v-if="block.button" :href="block.button.buttonDownloadLink || block.button.buttonLink" :download="block.button.buttonDownloadLink ? true : false">{{ block.button.buttonText }}</a>
      </div>
      <div class="content-image-container" v-if="block.type === 'image'">
        <img class="content-image" :src="block.image" :alt="block.alt" :title="block.title" loading="lazy" />
      </div>
      <div v-if="block.type === 'cards'">
        <component-block-small :component="block" />
      </div>
      <div v-if="block.type === 'mainCompetencies'">
        <main-competencies-component :component="block" :inComponent="inComponent" />
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
}
</script>

<style>
</style>