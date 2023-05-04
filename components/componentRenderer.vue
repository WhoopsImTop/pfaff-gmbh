<template>
  <div>
      <landing-slider v-if="component.type == 'slider'" :slideData="component.slide" />
      <text-component v-if="component.type == 'contentblock'" :component="component" />
      <block-renderer v-if="component.type == 'blocks'" :blocks="component.block" />
      <product-preview v-if="component.type == 'productPreview'" :components="component" />
      <card-component v-if="component.type == 'cards'" :component="component" />
      <component-blocks v-if="component.type == 'competenciesBlocks'" :component="component" />
      <row-component v-if="component.type == 'row'" :component="component" />
  </div>
</template>

<script>
import CardComponent from './cardComponent.vue'
import ComponentBlocks from './componentBlocks.vue'
import productPreview from './productPreview.vue'
export default {
  components: { productPreview, CardComponent, ComponentBlocks },
  props: ['component'],
}
</script>

<style>
</style>