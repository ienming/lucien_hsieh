<template>
	<section class="hero-container">
		<p
			ref="heroTitle"
			class="title">Hi! I'm Lucien, I build web experiences through
			<span class="hidden-trigger">
				code
				<img class="hidden-img" src="/blossom-agate.png" alt="">
			</span>, blending
			<span class="hidden-trigger">
				design
				<img class="hidden-img" src="/labradorite-oval.png" alt="">
			</span>,
			<span class="hidden-trigger">
				storytelling
				<img class="hidden-img" src="/moonstone.png" alt="">
			</span>, and 
			<span class="hidden-trigger">
				micro-interaction
				<img class="hidden-img" src="/lapis-lazuli.png" alt="">
			</span>
		</p>
	</section>
</template>

<script setup>
import { gsap } from 'gsap';
import SplitText from 'gsap/SplitText';

const {isMobile} = useIsMobile();

const heroTitleRef = useTemplateRef('heroTitle');
const handlerMaps = new Map();

function revealIcon(target) {
	gsap.to(target, {
		width: isMobile.value ? '40px' : '60px',
		opacity: 1,
		duration: 0.5,
		rotate: (Math.random() - 1) * 100,
		ease: 'power3.out',
	});
}

onMounted(() => {
	const triggers = heroTitleRef.value.querySelectorAll('.hidden-trigger');
	triggers.forEach(trigger => {
		const img = trigger.querySelector('.hidden-img');
		const handler = () => revealIcon(img);
		trigger.addEventListener('mouseenter', handler);
		handlerMaps.set(trigger, handler);
	});

	const split = SplitText.create(heroTitleRef.value, {
		type: 'words',
		mask: 'words',
	});

	const tl = gsap.timeline();
	tl.fromTo(
		split.words,
		{ yPercent: 100 },
		{ yPercent: 0, stagger: 0.01 },
	);
});

onUnmounted(() => {
	handlerMaps.forEach((handler, trigger) => {
		trigger.removeEventListener('mouseenter', handler);
	})
})
</script>

<style lang="scss" scoped>
.hero-container {
	margin: 40px 0 0 0;
	letter-spacing: -0.2px;

	.title {
		font-size: $font-size-xl;
		line-height: 1.25;
		padding: 0 $space-base;
		max-width: 800px;

		@include response(md) {
			padding-left: $space-xl;
			font-size: $font-size-4xl;
		}
	}

	.hidden-trigger {
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: $space-sm;
		border-bottom: 2px solid $color-neutral-100;
		padding: $space-xs 0;
	}

	.hidden-img {
		width: 0;
		height: auto;
	}
}
</style>