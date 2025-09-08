<template>
	<div
		class="d-flex flex-column gap-space-sm hero-intro">
		<div class="d-flex gap-space-lg justify-contents-space-between align-items-start">
			<p
				ref="heroTitle"
				class="title">Hi👋 I'm Lucien, I focused on digital storytelling and front-end development</p>
		</div>
		<div class="common-paragraph">
			<p>這裡就像我的工作調查台，收藏著我在沿途探索與挖掘出的作品。</p>
		</div>
	</div>
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
.hero-intro {
	background-color: $color-white;
	padding: $space-sm;
	border-radius: $radius-sm;
	border: 1px solid $color-neutral-900;
	width: 70vw;
	max-width: 420px;
	pointer-events: auto;
	margin: 0 auto;

	.title {
		font-size: $font-size-md;
		line-height: 1.25;

		@include response(md) {
			font-size: $font-size-lg;
		}
	}
}
</style>
