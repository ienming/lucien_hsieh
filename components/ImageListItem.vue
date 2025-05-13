<template>
    <li
        class="align-items-center img-list-item"
        @mouseenter="$emit('mouse-enter-item')"
        @mouseleave="$emit('mouse-leave-item')">
        <div class="info fade-right-link">
            <span class="title">{{ title }}</span>
            <span class="sub-title">{{ subTitle }}</span>
        </div>
        <div class="meta">
            <p class="year">{{ year }}</p>
            <template
                v-for="(tag, idx) of tags"
                :key="tag">
                <span class="fade-link">{{ tag }}</span>
                <span v-if="idx !== tags.length - 1"> / </span>
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
        subTitle: {
            type: String,
            default: '',
        },
        tags: {
            type: Array, 
            default: () => [],
        },
        year: {
            type: String,
            default: '',
        },
    }
};
</script>

<style scoped lang="scss">
.img-list-item {
    border-bottom: 1px solid $color-neutral-900;
    list-style: none;
    display: grid;
    grid-template-columns: auto 150px;
    cursor: pointer;

    .info {
        padding: $space-md;
        
        .title {
            font-size: $font-size-xl;
            font-weight: $font-weight-700;
            display: block;
        }
    
        .sub-title {
            font-size: $font-size-lg;
            font-weight: $font-weight-500;
        }
    }


    .meta {
        font-size: $font-size-base;
        padding: $space-md;

        .year {
            margin-bottom: 0;
            color: $color-text-secondary;
        }
    }
}
</style>
