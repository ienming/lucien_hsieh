<script setup>
import ProjectMeta from '@/components/project/ProjectMeta.vue';

useHead({
	title: 'About | Lucien Hsieh',
});

const props = defineProps({
	project: {
		type: Object,
		required: true,
	},
});

const { language, isEn, isZh } = useEnvironment();
const projectDesc = computed(() => props.project.description?.[language.value.toLowerCase()]);
</script>

<template>
	<div class="project-content">
		<div class="meta-container">
			<ProjectMeta :description="projectDesc" />
		</div>
		<div
			v-if="isZh"
			class="project-paragraph-container"
		>
			<p class="project-paragraph">...</p>
		</div>
		<div
			v-else-if="isEn"
			class="project-paragraph-container"
		>
			<p class="project-paragraph en">something...</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/project';
</style>
