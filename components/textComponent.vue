<template>
  <div class="content-container text-container">
    <h2>{{ component.contentTitle }}</h2>
    <p>{{ component.contentText }}</p>
  </div>
</template>

<script>
export default {
    props: ['component'],
}
</script>

<style>
</style>