<template>
	<header
		class="d-grid align-items-center container custom-header"
		:class="{hide: direction === GESTURE_DIRECTION.DOWN}">
		<div>
			<NuxtLink
				to="/"
				class="logo">
				<span class="fade-link">LUCIEN</span>
			</NuxtLink>
		</div>
		<!-- Desktop -->
		<nav class="d-none d-md-grid nav">
			<NuxtLink
				to="/works"
				class="link fade-right-link">
				<span>WORKS</span>
			</NuxtLink>
			<NuxtLink
				to="/fragments"
				class="link fade-right-link">
				<span>FRAGMENTS</span>
			</NuxtLink>
			<NuxtLink
				class="link fade-right-link"
				@click="isAboutModalOpen = true">
				<span>(curator)</span>
			</NuxtLink>
		</nav>
		<!-- Mobile -->
		<div class="d-md-none mobile-menu">
			<ClientOnly>
				<Icon
					name="iconoir:menu"
					class="d-block"
					@click="isMobileMenuOpen = true" />
			</ClientOnly>
		</div>
		<AboutModal v-model:open="isAboutModalOpen" />
		<MobileMenu v-model:open="isMobileMenuOpen"/>
	</header>
</template>

<script setup>
import {GESTURE_DIRECTION} from '~/constants/interaction';

const {direction} = useScrollDirection();
const isAboutModalOpen = ref(false);
const isMobileMenuOpen = ref(false);
</script>

<style lang="scss" scoped>
.custom-header {
	position: fixed;
	top: 0;
	left: 50%;
	transform: translateX(-50%) translateY(0);
	z-index: $z-index-common-fixed;
	transition: transform .3s ease-in-out;
	padding: $space-sm;
	grid-template-columns: repeat(2, 1fr);
	row-gap: $space-lg;
	align-items: flex-start;
	background-color: $color-background-container;
	border-radius: 0 0 $radius-sm $radius-sm;

	@include response(md) {
		background-color: transparent;
		padding: $space-md $space-xl;
	}

	.logo {
		font-size: $font-size-lg;
	}

	.nav {
		grid-template-columns: repeat(3, 1fr);
		font-size: $font-size-lg;
	}

	&.hide {
		transform: translateX(-50%) translateY(-100%);
	}

	.mobile-menu {
		justify-self: end;
		background-color: $color-white;
		padding: $space-xs;
		border-radius: $radius-xs;
		border: 1px solid $color-neutral-900;
		font-size: $font-size-2xl;
	}
}
</style>
