<template>
	<div
		class="mobile-menu-hamburger"
		@click="isMobileMenuOpen = true">
		MENU
	</div>
	<MobileMenu v-model:open="isMobileMenuOpen"/>
</template>

<script setup>
const isMobileMenuOpen = ref(false);
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
	padding: $space-md;

	@include response(md) {
		display: none;
	}
}
</style>