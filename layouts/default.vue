<template>
    <div>
        <DefaultHeader />
        <main>
            <slot />
        </main>
        <DefaultFooter />
    </div>
</template>

<script setup>
import DefaultHeader from './partials/DefaultHeader';
import DefaultFooter from './partials/DefaultFooter';
</script>

<style lang="scss">
main {
    // 因為 footer fixed bottom，所以要預留一個可以捲動的範圍
    padding-bottom: 90px;
}
</style>
