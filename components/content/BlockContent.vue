<template>
	<div class="block-content">
		<h3 class="title">
			<slot name="title" />
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
		grid-template-columns: repeat(2, 1fr);
		margin: 120px auto;
		gap: 0;
	}

	.title {
		font-size: $font-size-md;
		font-weight: 600;

		@include response(md) {
			font-size: $font-size-xl;
			max-width: $project-text-paragraph-max-width;
			display: grid;
			grid-template-columns: repeat(6, 1fr);

			:deep(>p) {
				grid-column: 2 / 5;
			}
		}
	}

	.content {
		@include response(md) {
			padding-right: $space-4xl;
			max-width: $project-text-paragraph-max-width;
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
