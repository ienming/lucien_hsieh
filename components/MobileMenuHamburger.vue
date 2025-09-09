<template>
	<div
		class="mobile-menu-hamburger"
		:class="{hide: direction === GESTURE_DIRECTION.DOWN}"
		@click="isMobileAboutOpen = true">
		<span class="trigger">
			(creator)
		</span>
		<AboutCard
			v-if="isMobileAboutOpen"
			v-model:open="isMobileAboutOpen" />
	</div>
</template>

<script setup>
import { GESTURE_DIRECTION } from '~/constants/interaction';

const isMobileAboutOpen = ref(false);
const {direction} = useScrollDirection();
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
		background-color: $color-neutral-100;
		border-radius: $radius-sm;
		color: $color-white;
		padding: $space-sm $space-base;
	}

	@include response(md) {
		display: none;
	}

	&.hide {
		transform: translateY(100%);
	}
}
</style>