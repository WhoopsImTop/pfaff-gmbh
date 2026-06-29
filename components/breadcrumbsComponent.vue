<template>
  <nav aria-label="Breadcrumb" class="breadcrumbs">
    <ol>
      <li v-for="(item, index) in items" :key="index" :class="{ 'is-current': index === items.length - 1 }">
        <nuxt-link v-if="item.path && index < items.length - 1" :to="item.path">
          {{ item.name }}
        </nuxt-link>
        <span v-else aria-current="page" class="current">{{ item.name }}</span>
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
  margin-bottom: 0.75rem;
  font-size: 0.7rem;
  line-height: 1.2;
  color: #888;
}

.breadcrumbs ol {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 0.2rem;
  overflow: hidden;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  flex-shrink: 0;
}

.breadcrumbs li.is-current {
  flex-shrink: 1;
  min-width: 0;
  overflow: hidden;
}

.breadcrumbs a {
  color: #888;
  text-decoration: none;
  white-space: nowrap;
}

.breadcrumbs a:hover {
  color: var(--primary-color, #333);
  text-decoration: underline;
}

.current {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #aaa;
}

.separator {
  color: #ccc;
  flex-shrink: 0;
}
</style>
