<template>
	<header
		class="container custom-header"
		:class="{hide: direction === GESTURE_DIRECTION.DOWN}">
		<NuxtLink
			to="/"
			class="logo">
			<span class="fade-link">
				LUCIEN
			</span>
		</NuxtLink>
		<!-- Desktop -->
		<nav class="d-none d-md-grid nav">
			<NuxtLink
				class="link fade-right-link"
				@click="isAboutCardOpen = true">
				<span>(creator)</span>
			</NuxtLink>
		</nav>
		<Teleport to="body">
			<AboutCard
				v-if="isAboutCardOpen"
				v-model:open="isAboutCardOpen"
				class="about-card-desktop" />
		</Teleport>
	</header>
</template>

<script setup>
import {GESTURE_DIRECTION} from '~/constants/interaction';
import { showSplitTextOnHover } from '~/libs/animate';

const {direction} = useScrollDirection();
const isAboutCardOpen = ref(false);
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
		grid-template-columns: repeat(3, 1fr);
		row-gap: $space-lg;
		align-items: flex-start;
		padding: $space-md $space-xl;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: $space-sm;
		font-size: $font-size-lg;

		@include response(md) {
			grid-column: 1 / span 2;
		}
	}

	.nav {
		grid-template-columns: repeat(1, 1fr);
		justify-self: flex-end;
		font-size: $font-size-md;
	}

	&.hide {
		transform: translateX(-50%) translateY(-100%);
	}
}
</style>
