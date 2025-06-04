<template>
	<div class="d-grid align-items-center container text-difference custom-header">
		<div>
			<NuxtLink
				to="/"
				class="logo">
				<span class="cross-off-link">LUCIEN</span>
			</NuxtLink>
		</div>
		<div class="pages">
			<NuxtLink
				to="/info"
				class="link fade-right-link">
				<span>INFO</span>
			</NuxtLink>
			<NuxtLink
				to="/playroom"
				class="link fade-right-link">
				<span>PLAYROOM</span>
			</NuxtLink>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.custom-header {
	position: fixed;
	top: 0;
	background-color: $color-background-container;
	border-radius: 0 0 $radius-lg $radius-lg;
	z-index: $z-index-common-fixed;
	grid-template-columns: repeat(2, 1fr);
	row-gap: $space-xs;
	align-items: flex-start;

	@include response(md) {
		margin-bottom: $space-xxl;
		padding-top: $space-xxl;
	}

	.logo {
		font-size: $font-size-xl;
		font-weight: $font-weight-800;
	}

	.link {
		font-weight: $font-weight-500;
	}

	.pages {
		display: grid;
		grid-template-rows: repeat(2, 1fr);

		@include response(md) {
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: unset;
		}
	}
}
</style>
