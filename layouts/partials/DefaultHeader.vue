<template>
    <div class="d-grid align-items-center custom-header">
        <div>
            <!-- TODO: 移除測試 -->
            <!-- <NuxtLink
                to="/"
                class="logo">
                <span class="cross-off-link">LUCIEN</span>
            </NuxtLink> -->
            <NuxtLink to="/project/iroironairo">Test1</NuxtLink>
            <NuxtLink to="/project/alishan">Test2</NuxtLink>
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
    grid-template-columns: 2fr 1fr 1fr;
    padding: $space-base;
    max-width: 90%;
    margin: 0 auto;

    .logo {
        font-size: $font-size-xl;
        font-weight: $font-weight-800;
    }

    .link {
        font-weight: $font-weight-500;
    }
}
</style>
