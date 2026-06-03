<script setup>
import ProjectMeta from '~/components/project/ProjectMeta.vue';
import ProjectCredit from '../project/ProjectCredit.vue';

defineProps({
	project: {
		type: Object,
		required: true,
	},
});

const { language } = useEnvironment();
</script>

<template>
	<div class="default-content">
		<ProjectMeta
			:description="project.description[language.toLocaleLowerCase()]"
			:link="project.link ?? null"
		/>
		<div class="modal-content">
			<img
				v-if="project.coverImage"
				:src="project.coverImage"
				:alt="project.name"
				class="modal-cover"
			/>
			<p
				v-if="project.description"
				class="modal-description"
			>
				{{ project.description[language.toLocaleLowerCase()] }}
			</p>
		</div>
		<div
			v-if="project.credits?.length"
			class="credit-container"
		>
			<ProjectCredit :credits="project.credits" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/project';

.default-content {
	display: flex;
	flex-direction: column;
}

.modal-cover {
	width: 100%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
	display: block;
}

.modal-content {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-lg);
	padding: var(--spacing-lg) var(--spacing-md);
	padding-bottom: var(--spacing-2xl);
}

.modal-description {
	font-size: 14px;
	line-height: 1.7;
	color: var(--color-text-primary);
	font-family: var(--font-mono);
}
</style>
