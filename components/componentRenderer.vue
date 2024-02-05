<template>
  <div>
    <landing-slider
      v-if="component.type == 'slider'"
      :slideData="component.slide"
    />
    <text-component
      v-if="component.type == 'contentblock'"
      :component="component"
    />
    <block-renderer
      v-if="component.type == 'blocks'"
      :blocks="component.block"
      :title="component.blockTitle"
    />
    <client-only>
      <product-preview
        v-if="component.type == 'productPreview'"
        :components="component"
    /></client-only>
    <article-component v-if="component.type == 'news'" :component="component" />
    <card-component v-if="component.type == 'cards'" :component="component" />
    <component-blocks
      v-if="component.type == 'competenciesBlocks'"
      :component="component"
    />
    <row-component
      v-if="component.type == 'row'"
      :component="component"
      :inComponent="inComponent"
    />
    <team-component v-if="component.type == 'team'" :component="component" />
  </div>
</template>

<script>
export default {
  props: ['component', 'inComponent'],
}
</script>

<style></style>
