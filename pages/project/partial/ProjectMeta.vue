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
                <ClientOnly>
                    <Icon
                        name="ant-design:global-outlined"
                        size="24"/>
                </ClientOnly>
                <span>{{ link.label ? link.label : 'LINK TO PROJECT' }}</span>
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

<style lang="scss" scoped>
.info {
    background: linear-gradient(90deg, transparent, $color-neutral-900, transparent);
    padding: $space-base;
    border-radius: $radius-xs;

    @include response(md) {
        background: unset;
        padding: 0;
        border-radius: 0;
    }

    .text-muted {
        margin-bottom: $space-xxs;
    }

    .link {
        display: inline-flex;
        align-items: center;
        gap: $space-sm;
        margin: $space-base 0 0 0;
    }
}
</style>
