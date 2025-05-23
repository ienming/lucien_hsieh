<template>
    <!-- TODO: 換 loading 效果 -->
    <article
        v-if="isPageDataReady"
        class="container project-article">
        <div class="d-grid gap-space-sm header">
            <div>
                <h1 class="title">{{ pageData.title }}</h1>
                <project-meta
                    class="d-block d-md-none"
                    :meta="meta" />
                <p v-if="meta.intros">{{ meta.intros }}</p>
            </div>
            <project-meta
                class="d-none d-md-block"
                :meta="meta" />
        </div>
        <ContentRenderer :value="pageData" />
    </article>
    <div v-else>Page not found</div>
</template>

<script setup>
import ProjectMeta from './partial/ProjectMeta.vue';

const pageData = ref({});
const isPageDataReady = ref(false);
const meta = ref({});

const getPageData = async () => {
    const route = useRoute();
	const { slug } = route.params;
	const { data } = await useAsyncData(`project-${slug}`, async () => {
		return await queryCollection('project').path(`/project/${slug}`).first();
	});
	pageData.value = data.value;
    meta.value = data.value.meta;
};

try {
    await getPageData();
    isPageDataReady.value = true;
} catch (error) {
    console.log(error);
}
</script>

<style lang="scss" scoped>
.project-article {
    .header {
        grid-template-columns: auto;

        @media screen and (min-width: 768px) {
            grid-template-columns: 3fr 1fr;
            gap: $space-md;
        }

        .title {
            margin-bottom: $space-lg;
        }

        .info {
            margin-bottom: $space-lg;
            
            .link {
                margin-top: $space-lg;
            }
        }

        p {
            white-space: pre-wrap;
        }
    }

    :deep(p) {
        margin-bottom: $space-base;
    }
}
</style>