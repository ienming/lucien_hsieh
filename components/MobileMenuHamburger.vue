<template>
	<div
		class="mobile-menu-hamburger"
		:class="{hide: direction === GESTURE_DIRECTION.DOWN}"
		@click="isMobileMenuOpen = !isMobileMenuOpen">
		<span class="trigger">
			MENU
		</span>
		<Transition name="fade">
			<MobileMenu v-if="isMobileMenuOpen" />
		</Transition>
	</div>
</template>

<script setup>
import { GESTURE_DIRECTION } from '~/constants/interaction';

const {direction} = useScrollDirection();
const router = useRouter();
const isMobileMenuOpen = ref(false);

watch(direction, newVal => {
	if (newVal === GESTURE_DIRECTION.DOWN) {
		isMobileMenuOpen.value = false;
	}
});

const closeAfterNavigation = router.afterEach(() => {
	isMobileMenuOpen.value = false;
});

onUnmounted(() => {
	closeAfterNavigation();
})
</script>

<style lang="scss" scoped>
.mobile-menu-hamburger {
	position: sticky;
	z-index: $z-index-common-fixed;
	bottom: 0;
	padding-bottom: $space-md;
	transition: transform .3s ease-in-out;
	
	.trigger {
		display: block;
		margin: 0 auto;
		width: max-content;
		background-color: $color-primary;
		border-radius: $radius-sm;
		color: $color-white;
		padding: $space-sm $space-base;
		font-size: $font-size-xs;
		letter-spacing: 1px;
	}

	@include response(md) {
		display: none;
	}

	&.hide {
		transform: translateY(100%);
	}
}
</style>