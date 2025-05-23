<template>
    <ul class="info">
        <li
            v-for="tag of meta.tags"
            :key="tag.type"
            class="text-muted">
            {{ tag.type }} / {{ tag.desc }}
        </li>
        <div v-if="meta.links?.length">
            <a
                v-for="link of meta.links"
                :key="link.url"
                class="link fade-right-link"
                :href="link.url">
                {{ link.label ? link.label : 'LINK TO PROJECT' }}
            </a>
        </div>
    </ul>
</template>

<script setup>
defineProps({
    meta: {
        type: Object,
        default: () => {},
    },
})
</script>