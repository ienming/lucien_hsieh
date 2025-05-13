<template>
    <div>
        <DefaultHeader />
        <section>
            <slot />
        </section>
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
