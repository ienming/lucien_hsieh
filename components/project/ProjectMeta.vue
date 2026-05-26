<template>
	<div class="project-meta">
		<div class="meta-row">
			<span class="meta-label">Brief</span>
			<p class="meta-value">{{ description }}</p>
		</div>
		<div
			v-if="link"
			class="meta-row"
		>
			<span class="meta-label">Link</span>
			<a
				:href="link"
				target="_blank"
				rel="noopener noreferrer"
				class="meta-link"
				>{{ link }}</a
			>
		</div>
	</div>
</template>

<script setup>
defineProps({
	description: {
		type: String,
		default: 'This is description',
	},
	link: {
		type: String,
		default: 'https://test.test.com/test',
	},
});
</script>

<style lang="scss" scoped>
.project-meta {
	font-family: var(--font-mono);
	margin-bottom: var(--spacing-xl);
}

.meta-row {
	padding: var(--spacing-md);
	padding-bottom: var(--spacing-sm);
}

.meta-label {
	display: block;
	font-size: 12px;
	color: var(--color-text-muted);
	margin-bottom: var(--spacing-sm);
}

.meta-value {
	font-size: 16px;
	line-height: 22px;
	color: var(--color-text-primary);
}

.meta-link {
	font-size: 16px;
	font-weight: 600;
	text-decoration: underline;
	text-underline-offset: 3px;
	word-break: break-all;
	color: var(--color-text-muted);

	&:hover {
		color: var(--color-text-primary);
	}
}
</style>
