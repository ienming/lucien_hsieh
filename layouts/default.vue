<template>
    <div>
        <DefaultHeader />
        <slot />
        <DefaultFooter />
    </div>
</template>

<script>
import DefaultHeader from './partials/DefaultHeader';
import DefaultFooter from './partials/DefaultFooter';

export default {
    components: {
        DefaultHeader,
        DefaultFooter,
    },
};
</script>
