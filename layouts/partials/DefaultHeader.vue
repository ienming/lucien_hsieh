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
				<span>(creator)</span>
			</NuxtLink>
		</nav>
		<AboutModal v-model:open="isAboutModalOpen" />
	</header>
</template>

<script setup>
import {GESTURE_DIRECTION} from '~/constants/interaction';
import { showSplitTextOnHover } from '~/libs/animate';

const {direction} = useScrollDirection();
const isAboutModalOpen = ref(false);
let cleanUp;

onMounted(() => {
	cleanUp = showSplitTextOnHover('.custom-header .fade-right-link', {
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
	
	@include response(md) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		row-gap: $space-lg;
		align-items: flex-start;
		padding: $space-md $space-xl;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: $space-sm;
		font-size: $font-size-lg;
	}

	.nav {
		grid-template-columns: repeat(3, 1fr);
		font-size: $font-size-md;
	}

	&.hide {
		transform: translateX(-50%) translateY(-100%);
	}
}
</style>
