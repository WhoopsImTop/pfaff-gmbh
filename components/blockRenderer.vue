<template>
  <div class="content-container">
    <div class="grid">
      <div v-for="(block, index) in blocks" :key="index" class="product-card">
        <div class="product-card-image">
          <img :src="block.blockImage" :alt="block.title" />
        </div>
        <div class="product-card-content">
          <span class="product-category">{{ block.blockCategory }}</span>
          <h3 style="margin-top: 10px">{{ block.blockTitle }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blocks'],
}
</script>

<style>
</style>