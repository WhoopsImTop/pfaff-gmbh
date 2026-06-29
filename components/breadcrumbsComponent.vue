<template>
  <nav aria-label="Breadcrumb" class="breadcrumbs">
    <ol>
      <li v-for="(item, index) in items" :key="index">
        <nuxt-link v-if="item.path && index < items.length - 1" :to="item.path">
          {{ item.name }}
        </nuxt-link>
        <span v-else aria-current="page">{{ item.name }}</span>
        <span v-if="index < items.length - 1" class="separator" aria-hidden="true"
          >/</span
        >
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.breadcrumbs {
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.breadcrumbs ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 0.25rem;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.breadcrumbs a {
  color: var(--primary-color, #333);
  text-decoration: none;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}

.separator {
  color: #999;
}
</style>
