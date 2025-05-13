<template>
    <li
        class="img-list-item"
        @mouseenter="$emit('mouse-enter-item')"
        @mouseleave="$emit('mouse-leave-item')">
        <span class="title">{{ title }}</span>
        <div class="meta">
            <template
                v-for="tag of tags"
                :key="tag">
                <span class="fade-link">{{ tag }}</span> / 
            </template>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '',
        },
        tags: {
            type: Array, 
            default: () => [],
        },
    }
};
</script>

<style scoped lang="scss">
.img-list-item {
    border-bottom: 1px solid black;
    list-style: none;
    display: grid;
    grid-template-columns: auto 150px;

    .title {
        padding: $space-md;
    }

    .meta {
        font-size: $font-size-sm;
        padding: $space-md;
    }
}
</style>
