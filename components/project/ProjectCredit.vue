<template>
	<div class="project-credit">
		<div class="header">Credit</div>
		<div class="content">
			<ul class="d-flex flex-column gap-space-base credits">
				<li
					v-for="credit of credits"
					:key="credit.cate"
					class="d-grid credit-item"
				>
					<span class="credit-cate">{{ credit.cate }}</span>
					<span class="credit-to">{{ credit.to }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Credit {
	cate: string;
	to: string;
}

const props = withDefaults(
	defineProps<{
		credits?: Credit[];
	}>(),
	{
		credits: () => [
			{
				cate: 'Category',
				to: 'Lucien',
			},
		],
	},
);
const { credits } = props;
</script>

<style lang="scss" scoped>
.project-credit {
	width: 90vw;
	max-width: 695px;
	padding: var(--spacing-md);

	@include response(md) {
		width: 30vw;
		min-width: 360px;
	}

	.header {
		display: block;
		font-size: 12px;
		color: var(--color-text-muted);
		margin-bottom: var(--spacing-sm);
	}

	.credit-item {
		grid-template-columns: minmax(auto, 140px) auto;
		padding-bottom: $space-sm;
		font-size: $font-size-base;

		.credit-cate {
			color: var(--color-text-primary);
		}

		&:not(:last-child) {
			border-bottom: 1px solid var(--color-border);
		}
	}
}
</style>
