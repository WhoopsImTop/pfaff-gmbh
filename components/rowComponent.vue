<template>
  <div class="content-container row">
    <div v-for="(block, index) in component.component" :key="index" class="col">
      <div v-if="block.type === 'text'">
        <h2>{{ block.headline }}</h2>
        <p v-html="$md.render(block.text)"></p>
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