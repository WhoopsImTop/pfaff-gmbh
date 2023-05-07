<template>
  <div class="content-container row">
    <div v-for="(block, index) in component.component" :key="index" class="col" :class="block.button ? 'align-end': ''">
      <div v-if="block.type === 'text'">
        <span class="smallHeadline">{{ block.smallHeadline }}</span>
        <h2>{{ block.headline }}</h2>
        <p v-html="$md.render(block.text)"></p>
        <a class="button" v-if="block.button" :href="block.button.buttonDownloadLink" download>{{ block.button.buttonText }}</a>
      </div>
      <div v-if="block.type === 'image'">
        <img :src="block.image" :alt="block.alt" />
      </div>
      <div v-if="block.type === 'cards'">
        <component-block-small :component="block" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['component'],
}
</script>

<style>
</style>