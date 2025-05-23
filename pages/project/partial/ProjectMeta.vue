<template>
    <ul class="info">
        <li
            v-for="info of meta.infos"
            :key="info.type"
            class="text-muted">
            {{ info.type }} / {{ info.desc }}
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