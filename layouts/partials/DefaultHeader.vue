<template>
	<header
		class="container custom-header"
		:class="{hide: direction === GESTURE_DIRECTION.DOWN}">
		<div>
			<NuxtLink
				to="/"
				class="logo">
				<span class="fade-link">
					LUCIEN
				</span>
			</NuxtLink>
		</div>
	</header>
</template>

<script setup>
import {GESTURE_DIRECTION} from '~/constants/interaction';
import { showSplitTextOnHover } from '~/libs/animate';

const {direction} = useScrollDirection();
let cleanUp;

onMounted(() => {
	cleanUp = showSplitTextOnHover('.custom-header .logo', {
		stagger: 0.02,
	});
});

onUnmounted(() => {
	cleanUp();
})
</script>

<style lang="scss" scoped>
.custom-header {
	position: fixed;
	top: 0;
	left: 50%;
	transform: translateX(-50%) translateY(0);
	z-index: $z-index-common-fixed;
	transition: transform .3s ease-in-out;
	padding: $space-lg $space-base;
	display: flex;
	justify-content: center;
	border-radius: 0 0 $radius-sm $radius-sm;
	color: $color-white;
	mix-blend-mode: difference;

	.logo {
		display: flex;
		align-items: center;
		gap: $space-sm;
		font-size: $font-size-lg;
	}

	&.hide {
		transform: translateX(-50%) translateY(-100%);
	}
}
</style>
