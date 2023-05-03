<template>
  <div>
    <div v-for="(component, index) in components" :key="index">
      <text-component v-if="component.contentTitle && !component.cards" :component="component" />
      <block-renderer v-if="component.blocks" :blocks="component.blocks" />
      <product-preview v-if="component.productPreview" :components="component.productPreview" />
      <card-component v-if="component.cards" :component="component" />
    </div>
  </div>
</template>

<script>
import CardComponent from './cardComponent.vue'
import productPreview from './productPreview.vue'
export default {
  components: { productPreview, CardComponent },
  props: ['components'],
}
</script>

<style>
</style>