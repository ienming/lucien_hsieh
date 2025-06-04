<template>
	<header
		class="d-grid align-items-center container text-difference custom-header"
		:class="{hide: direction === SCROLL_DIRECTION.DOWN}">
		<div>
			<NuxtLink
				to="/"
				class="logo">
				<span class="cross-off-link">LUCIEN</span>
			</NuxtLink>
		</div>
		<nav class="nav">
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
		</nav>
	</header>
</template>

<script setup>
import {SCROLL_DIRECTION} from '~/constants/interaction';

const {direction} = useScrollDirection();
</script>

<style lang="scss" scoped>
.custom-header {
	position: fixed;
	top: 0;
	left: 50%;
	transform: translateX(-50%) translateY(0);
	z-index: $z-index-common-fixed;
	transition: transform .3s ease-in-out;
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

	.nav {
		display: grid;
		grid-template-rows: repeat(2, 1fr);

		@include response(md) {
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: unset;
		}
	}

	&.hide {
		transform: translateX(-50%) translateY(-100%);
	}
}
</style>
