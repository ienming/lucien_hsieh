<template>
    <div class="skeleton">
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
    </div>
</template>

<style lang="scss" scoped>
.skeleton {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $space-base;

    .bar {
        border-radius: $radius-xxs;
        max-width: 300px;
        height: 16px;
        background-color: $color-neutral-800;
    }
}
</style>
