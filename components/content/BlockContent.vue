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
		font-size: $font-size-lg;
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
		font-size: $font-size-basemd;
	}

	:deep(.content ul) {
		list-style: disc;
		padding-inline-start: $space-xl;
		font-size: $font-size-basemd;

		li {
			margin-bottom: $space-md;
		}
	}

	:deep(.subtitle) {
		margin-bottom: $space-md;
		font-weight: 600;
		font-size: $font-size-md;

		&:not(:first-child) {
			margin-top: $space-5xl;
		}
	}

	:deep(.callout-card) {
		padding: $space-md;
		border-radius: $radius-base;
		background-color: $color-neutral-900;
		border: 1px solid $color-neutral-800;
		color: $color-neutral-300;

		.title {
			font-weight: 600;
			font-size: $font-size-lg;
			line-height: 1.35;
		}
	}
}
</style>
