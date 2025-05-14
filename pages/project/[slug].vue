<template>
    <!-- TODO: 換 loading 效果 -->
    <ProjectLayout
        v-if="isPageDataReady"
        :doc="pageData">
        <ContentRenderer
            :value="pageData" />
    </ProjectLayout>
    <div v-else>Page not found</div>
</template>

<script setup>
import ProjectLayout from '@/layouts/ProjectLayout';

const pageData = ref({});
const isPageDataReady = ref(false);
const route = useRoute();

const getPageData = async () => {
	const { slug } = route.params;
	const { data } = await useAsyncData(`project-${slug}`, async () => {
		return await queryCollection('project').path(`/project/${slug}`).first();
	});
	pageData.value = data.value;
};

try {
    await getPageData();
    isPageDataReady.value = true;
} catch (error) {
    console.log(error);
}
</script>
