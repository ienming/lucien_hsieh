<template>
    <div class="d-grid align-items-center container custom-header">
        <div>
            <NuxtLink
                to="/"
                class="logo">
                <span class="cross-off-link">LUCIEN</span>
            </NuxtLink>
        </div>
        <div>
            <NuxtLink
                to="/info"
                class="link fade-right-link">
                <span>INFO 🎐</span>
            </NuxtLink>
        </div>
        <div>
            <NuxtLink
                to="/playroom"
                class="link fade-right-link">
                <span>PLAYROOM 🪁</span>
            </NuxtLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.custom-header {
    grid-template-rows: repeat(3, 1fr);

    @include response(md) {
        grid-template-columns: 2fr 1fr 1fr;
        grid-template-rows: unset;
        margin-bottom: $space-xxl;
        padding-top: $space-xxl;
    }

    .logo {
        font-size: $font-size-xl;
        font-weight: $font-weight-800;
    }

    .link {
        font-weight: $font-weight-500;
    }
}
</style>
