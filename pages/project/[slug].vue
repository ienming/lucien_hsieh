<template>
    <ContentRenderer
        v-if="pageData"
        :value="pageData" />
    <!-- TODO: 換 loading 效果 -->
    <div v-else>Page not found</div>
</template>

<script setup>
// definePageMeta({
//   layout: 'custom',
// });

const pageData = ref();
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
} catch (error) {
    console.log(error);
}
</script>
