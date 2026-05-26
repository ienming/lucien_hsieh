<template>
	<div class="default-content">
		<ProjectMeta
			:description="project.description"
			:link="project.link"
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
				{{ project.description }}
			</p>
		</div>
	</div>
</template>

<script setup>
import ProjectMeta from '~/components/project/ProjectMeta.vue';

defineProps({
	project: {
		type: Object,
		required: true,
	},
});
</script>

<style lang="scss" scoped>
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
