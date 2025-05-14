<template>
  <article class="project-article">
    <div class="d-grid gap-space-sm header">
        <div>
            <h1>{{ doc.title }}</h1>
            <slot />
        </div>
        <ul class="info">
            <li
                v-for="tag of doc.meta.tags"
                :key="tag.type"
                class="text-muted">
                {{ tag.type }} / {{ tag.desc }}
            </li>
        </ul>
    </div>
  </article>
</template>

<script setup>
defineProps({
  doc: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
.project-article {
    padding: $space-xxl;

    .header {
        grid-template-columns: 3fr 1fr;

        .info {
            padding: $space-sm;
        }
    }
}
</style>
