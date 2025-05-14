<template>
    <ContentRenderer
        v-if="pageData"
        :value="pageData" />
    <!-- TODO: 換 loading 效果 -->
    <div v-else>Page not found</div>
</template>

<script>
export default {
    data() {
        return {
            pageData: undefined,
        };
    },
    async created() {
        try {
            await this.getPageData();      
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        async getPageData() {
            const {slug} = this.$route.params;
            const {data} = await useAsyncData(`project-${slug}`, async () => {
                return await queryCollection('project').path(`/project/${slug}`).first();
            });
            this.pageData = data;
        },
    },
};
</script>