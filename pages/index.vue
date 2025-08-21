<template>
	<div>
		<section class="p-space-sm pb-0">
			<Workbench
				:projects="allProjects" />
		</section>
	</div>
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
		year: String(project.year),
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

<style lang="scss" scoped>
.work-list-h1 {
	font-size: $font-size-2xl;
	padding-left: $space-base;

	@include response(md) {
		font-size: $font-size-4xl;
		padding-left: $space-xl;
	}
}

.filter-container {
	position: relative;
	z-index: 1;
}

.project-list {
	gap: $space-sm;

	@include response(md) {
		gap: 0;
	}
}
</style>