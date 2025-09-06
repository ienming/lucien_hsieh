<template>
	<div class="block-content">
		<h3 class="title">{{ title }}</h3>
		<p class="content">{{ content }}</p>
	</div>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		default: 'Section Title',
	},
	content: {
		type: String,
		default: 'Content...',
	},
});
</script>

<style scoped lang="scss">
.block-content {
	display: grid;
	grid-template-columns: 1;
	gap: $space-md;
	margin: 60px auto;
	padding: 0 $space-base;

	@include response(md) {
		width: 90vw;
		grid-template-columns: repeat(2, 1fr);
		padding: 0;
		margin: 120px auto;
		gap: 0;
	}

	.title {
		font-size: $font-size-md;
		font-weight: 600;

		@include response(md) {
			font-size: $font-size-xl;
		}
	}
}
</style>
