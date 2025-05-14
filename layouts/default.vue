<template>
    <div>
        <DefaultHeader />
        <slot />
        <DefaultFooter />
    </div>
</template>

<script setup>
import DefaultHeader from './partials/DefaultHeader';
import DefaultFooter from './partials/DefaultFooter';
</script>
