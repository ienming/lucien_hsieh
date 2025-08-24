<template>
	<div class="project-credit">
		<div class="header">Credit</div>
		<div class="content">
			<ul class="d-flex flex-column gap-space-base credits">
				<li
					v-for="credit of credits"
					:key="credit.cate"
					class="d-grid credit-item">
					<span class="credit-cate">{{ credit.cate }}</span>
					<span class="credit-to">{{ credit.to }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
defineProps({
	credits: {
		type: Array,
		default:() => [],
	},
});
</script>

<style lang="scss" scoped>
.project-credit {
	width: 90vw;
	max-width: 695px;

	@include response(md) {
		width: 30vw;
	}

	.header, .content {
		background-color: $color-white;
		padding: $space-base $space-sm;
		border-radius: $radius-base;
	}

	.header {
		font-size: $font-size-lg;
		border: 1px solid $color-neutral-900;
	}
	
	.credit-item {
		grid-template-columns: minmax(auto, 140px) auto;
		padding-bottom: $space-sm;
		font-size: $font-size-base;

		.credit-cate {
			color: $color-text-secondary;
		}

		&:not(:last-child) {
			border-bottom: 1px solid $color-neutral-900;
		}
	}
}
</style>
