<template>
	<div class="block-content">
		<h3 class="title">
			<slot name="title" mdc-unwrap="p" />
		</h3>
		<div class="content">
			<slot name="content" />
		</div>
	</div>
</template>

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

	:deep(.content p) {
		margin-bottom: $space-base;
		text-align: justify;
	}

	:deep(.subtitle) {
		margin-bottom: $space-md;
		font-weight: 600;
	}
}
</style>
