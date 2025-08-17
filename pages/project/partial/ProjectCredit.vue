<template>
	<div class="project-credit">
		<div class="header">Credit</div>
		<div class="content">
			<ul class="d-flex flex-column gap-space-base credits">
				<li class="d-grid credit-item">
					<span class="credit-cate">Type</span>
					<span class="credit-to">Side Project</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.project-credit {
	width: 30vw;
	max-width: 695px;

	.header, .content {
		background-color: $color-white;
		padding: $space-base $space-sm;
		border-radius: $radius-base;
		border: 1px solid $color-neutral-900;
	}

	.header {
		font-size: $font-size-lg;
	}

	.content {
		margin-top: -1px;
	}
	
	.credit-item {
		grid-template-columns: minmax(auto, 140px) auto;
		padding-bottom: $space-sm;
		border-bottom: 1px solid $color-neutral-900;
		font-size: $font-size-md;

		.credit-cate {
			color: $color-text-secondary;
		}
	}
}
</style>
