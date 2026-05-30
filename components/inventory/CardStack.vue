<template>
	<div
		ref="scrollerEl"
		class="card-scroller"
		:class="{ scrollable: isScrollable }"
	>
		<div class="card-stack">
			<div
				ref="sectionEl"
				class="stacked-section"
			>
				<div class="stacked-zone">
					<ProjectCard
						v-for="(project, i) in projects"
						:key="project.id + '-' + i"
						:ref="(el) => setCardRef(el, i)"
						:project="project"
						:clickable="project.isOpen"
						:style="{ zIndex: projects.length - i }"
					/>
				</div>
			</div>
			<card-footer />
		</div>
	</div>
</template>

<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard.vue';
import CardFooter from './CardFooter.vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

gsap.registerPlugin(ScrollTrigger);

const { projects, currentIndex, registerScrollToCard } = useProjects();

const scrollerEl = ref(null);
const sectionEl = ref(null);
const cardRefs = ref([]);
const breakpoints = useBreakpoints(breakpointsTailwind);
const isScrollable = ref(false);

const GAP = breakpoints.greaterOrEqual('md').value ? 65 : 85;
const SCALE_STEP = 0.09;
const INITIAL_TOP_OFFSET = breakpoints.greaterOrEqual('md').value ? 80 : 20;
const FLYAWAY_OFFSET = 80;

function setCardRef(el, i) {
	if (el) cardRefs.value[i] = el.$el ?? el;
}

let trigger = null;

onMounted(() => {
	const cards = cardRefs.value.filter(Boolean);
	if (cards.length === 0) return;

	enterProjectCardsStackingAnimation(cards);
});

onUnmounted(() => {
	trigger?.kill();
	registerScrollToCard(null);
});

function enterProjectCardsStackingAnimation(cards) {
	const tl = gsap.timeline({
		delay: 0.2,
	});
	const tween = gsap.fromTo(
		cards,
		{
			top: INITIAL_TOP_OFFSET,
			y: (i) => i * GAP + 200,
			scale: (i) => 1 - i * SCALE_STEP,
			autoAlpha: 0,
		},
		{
			top: INITIAL_TOP_OFFSET,
			y: (i) => i * GAP,
			scale: (i) => 1 - i * SCALE_STEP,
			autoAlpha: 1,
			stagger: 0.3,
			duration: 0.5,
			ease: 'power2.out',
			onComplete: () => {
				initCardStacksScrollTrigger(cards);
				isScrollable.value = true;
			},
		},
	);
	tl.add(tween);
}

function initCardStacksScrollTrigger(cards) {
	const heights = cards.map((el) => el.getBoundingClientRect().height + 120);
	const paddingTop = parseFloat(getComputedStyle(scrollerEl.value).paddingTop);
	const scrollerHeight = scrollerEl.value.clientHeight;

	// Section must be tall enough so user can scroll through the full animation
	const ANIM_SCROLL = (cards.length - 1) * 350;
	gsap.set(sectionEl.value, { height: ANIM_SCROLL + scrollerHeight });

	// Peel from top: card[i] exits upward, remaining cards slide into peek positions
	const tl = gsap.timeline();
	for (let i = 0; i < cards.length - 1; i++) {
		tl.to(cards[i], {
			y: -heights[i] - FLYAWAY_OFFSET,
			scale: 1,
			ease: 'none',
		});
		tl.to(
			cards.slice(i + 1),
			{
				y: (j) => j * GAP,
				scale: (j) => 1 - j * SCALE_STEP,
				ease: 'none',
				onComplete: () => {
					currentIndex.value = i + 1;
				},
				onReverseComplete: () => {
					currentIndex.value = i;
				},
			},
			'<',
		);
		tl.to({}, { duration: 0.5 });
	}

	trigger = ScrollTrigger.create({
		trigger: sectionEl.value,
		scroller: scrollerEl.value,
		start: `top top+=${paddingTop}`,
		end: `+=${ANIM_SCROLL}`,
		scrub: true,
		animation: tl,
	});

	const n = projects.value.length;
	registerScrollToCard((index) => {
		if (n <= 1 || !trigger) return;
		const progress = index / (n - 1);
		const targetScroll = trigger.start + progress * (trigger.end - trigger.start);
		gsap.to(scrollerEl.value, {
			scrollTop: targetScroll,
			duration: 0,
			ease: 'power2.inOut',
			overwrite: true,
		});
	});
}
</script>

<style lang="scss" scoped>
.card-scroller {
	height: 100vh;
	overflow-y: auto;
	padding: 0 var(--spacing-xl);
	pointer-events: none;

	@media (max-width: 767px) {
		padding: 0 var(--spacing-md);
	}

	&.scrollable {
		pointer-events: auto;
	}
}

.card-stack {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	width: 100%;
	max-width: var(--card-max-width);
	margin: 0 auto;
}

.stacked-section {
	position: relative;
	width: 100%;
}

.stacked-zone {
	--top-offset: 20px;
	position: sticky;
	width: 100%;
	overflow: hidden;
	height: 100vh;
	top: 0;

	&::after {
		display: block;
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: var(--top-offset);
		background: linear-gradient(0deg, rgba(232, 232, 232, 0) 0%, rgba(232, 232, 232, 1) 100%);
		background: linear-gradient(0deg, transparent 0%, var(--color-bg) 100%);
		z-index: var(--z-index-common-fixed);
	}

	@media screen and (min-width: 768px) {
		--top-offset: 80px;
	}
}
</style>
