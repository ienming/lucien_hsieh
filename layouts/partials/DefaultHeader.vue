<template>
    <div class="d-grid align-items-center custom-header">
        <NuxtLink
            to="/"
            class="cross-off-link logo">Header</NuxtLink>
        <NuxtLink to="info">Info</NuxtLink>
        <NuxtLink to="playroom">Playroom</NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
.custom-header {
    grid-template-columns: 2fr 1fr 1fr;
    padding: $space-base;

    .logo {
        font-size: $font-size-xl;
    }
}
</style>
