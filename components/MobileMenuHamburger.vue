<template>
	<div
		class="mobile-menu-hamburger"
		:class="{hide: direction === GESTURE_DIRECTION.DOWN}"
		@click="isMobileMenuOpen = true">
		(creator)
	</div>
	<MobileMenu v-model:open="isMobileMenuOpen"/>
</template>

<script setup>
import { GESTURE_DIRECTION } from '~/constants/interaction';

const isMobileMenuOpen = ref(false);
const {direction} = useScrollDirection();
</script>

<style lang="scss" scoped>
.mobile-menu-hamburger {
	position: sticky;
	z-index: $z-index-common-fixed;
	bottom: $space-4xl;
	display: inline-block;
	left: 50%;
	transform: translateX(-50%);
	background-color: $color-neutral-100;
	border-radius: $radius-sm;
	color: $color-white;
	padding: $space-sm $space-base;
	transition: transform .3s ease-in-out;

	@include response(md) {
		display: none;
	}

	&.hide {
		transform: translateX(-50%) translateY(100%);
	}
}
</style>