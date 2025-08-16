<template>
	<header
		class="d-grid align-items-center container custom-header"
		:class="{hide: direction === SCROLL_DIRECTION.DOWN}">
		<div>
			<NuxtLink
				to="/"
				class="logo">
				<span class="cross-off-link">LUUUUUCIEN</span>
			</NuxtLink>
		</div>
		<nav class="nav">
			<NuxtLink
				to="/"
				class="link fade-right-link">
				<span>WORKS</span>
			</NuxtLink>
			<NuxtLink
				to="/playroom"
				class="link fade-right-link">
				<span>PLAYGROUND</span>
			</NuxtLink>
			<NuxtLink
				to="/info"
				class="link fade-right-link">
				<span>(Creator)</span>
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
	row-gap: $space-lg;
	align-items: flex-start;

	@include response(md) {
		padding: $space-md $space-4xl;
	}

	.logo {
		font-size: $font-size-lg;
	}

	.link {
		font-size: $font-size-lg;
	}

	.nav {
		display: grid;
		grid-template-rows: repeat(2, 1fr);

		@include response(md) {
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: unset;
		}
	}

	&.hide {
		transform: translateX(-50%) translateY(-100%);
	}
}
</style>
