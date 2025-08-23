<template>
	<section class="p-space-sm pb-0">
		<Workbench
			:projects="allProjects" />
	</section>
</template>

<script setup>
import Workbench from '~/components/workbench/Workbench.vue';

const allProjects = ref([]);
const getPageData = async () => {
	const { data } = await useAsyncData('', async () => {
		return await queryCollection('project').all();
	});

	allProjects.value = data.value.map(project => ({
		id: project.path.split('/')[2],
		title: project.title,
		subTitle: project.subtitle,
		tagline: project.tagline,
		year: project.year,
		tags: project.tags,
		cover: project.cover,
		mineral: project.mineral,
	}));
};

try {
	await getPageData();
} catch(error) {
	throw createError(error);
}
</script>
