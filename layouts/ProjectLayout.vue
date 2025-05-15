<template>
  <article class="container project-article">
    <div class="d-grid gap-space-sm header">
        <div>
            <h1 class="title">{{ doc.title }}</h1>
            <slot />
        </div>
        <ul class="info">
            <li
                v-for="tag of doc.meta.tags"
                :key="tag.type"
                class="text-muted">
                {{ tag.type }} / {{ tag.desc }}
            </li>
            <div v-if="doc.meta.links.length">
                <a
                    v-for="link of doc.meta.links"
                    :key="link.url"
                    class="link fade-right-link"
                    :href="doc.meta.link">
                    {{ link.label ? link.label : 'LINK TO PROJECT' }}
                </a>
            </div>
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
    .header {
        grid-template-columns: 3fr 1fr;

        .title {
            margin-bottom: $space-lg;
        }

        .info {
            padding: $space-sm;

            .link {
                margin-top: $space-lg;
            }
        }
    }

    :deep(p) {
        margin-bottom: $space-base;
    }
}
</style>
