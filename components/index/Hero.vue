<template>
	<section class="hero-container">
		<p
			ref="heroTitle"
			class="title">Hi👋 I'm Lucien, I build web experiences through code, blending design, storytelling, and micro-interaction</p>
	</section>
</template>

<script setup>
import { gsap } from 'gsap';
import SplitText from 'gsap/SplitText';

const heroTitle = useTemplateRef('heroTitle');

onMounted(() => {
	const split = SplitText.create(heroTitle.value, {
		type: 'chars, lines',
		mask: 'lines',
	});

	const tl = gsap.timeline();
	tl.fromTo(
		split.chars,
		{ yPercent: 100 },
		{ yPercent: 0, stagger: 0.01 },
	);
});
</script>

<style lang="scss" scoped>
.hero-container {
	margin: 40px 0 120px 0;

	@include response(md) {
		margin-bottom: 420px;
	}

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
}
</style>