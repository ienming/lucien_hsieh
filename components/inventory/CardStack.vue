<template>
	<div
		ref="scrollerEl"
		class="card-scroller"
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
			<div class="nothing-more">( ˶°ㅁ°) !! This is the end</div>
		</div>
	</div>
</template>

<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard.vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

gsap.registerPlugin(ScrollTrigger);

const { projects, currentIndex, registerScrollToCard } = useProjects();

const GAP = 65;
const SCALE_STEP = 0.09;

const scrollerEl = ref(null);
const sectionEl = ref(null);
const cardRefs = ref([]);
const breakpoints = useBreakpoints(breakpointsTailwind);

function setCardRef(el, i) {
	if (el) cardRefs.value[i] = el.$el ?? el;
}

let trigger = null;

onMounted(async () => {
	await nextTick();

	const cards = cardRefs.value.filter(Boolean);
	if (cards.length === 0) return;

	const heights = cards.map((el) => el.getBoundingClientRect().height + 120);
	const paddingTop = parseFloat(getComputedStyle(scrollerEl.value).paddingTop);
	const scrollerHeight = scrollerEl.value.clientHeight;

	// Section must be tall enough so user can scroll through the full animation
	const ANIM_SCROLL = (cards.length - 1) * 350;
	gsap.set(sectionEl.value, { height: ANIM_SCROLL + scrollerHeight });

	// Initial: top card at y=0, each subsequent card peeks by GAP
	cards.forEach((el, i) => {
		gsap.set(el, {
			position: 'absolute',
			top: 80,
			left: 0,
			right: 0,
			y: i * GAP,
			scale: 1 - i * SCALE_STEP,
			transformOrigin: 'top center',
		});
	});

	// Peel from top: card[i] exits upward, remaining cards slide into peek positions
	const tl = gsap.timeline();
	const flyawayOffset = breakpoints.greaterOrEqual('md') ? 80 : 160;
	for (let i = 0; i < cards.length - 1; i++) {
		tl.to(cards[i], {
			y: -heights[i] - flyawayOffset,
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
});

onUnmounted(() => {
	trigger?.kill();
	registerScrollToCard(null);
});
</script>

<style lang="scss" scoped>
.card-scroller {
	height: 100vh;
	overflow-y: auto;
	padding: 0 var(--spacing-xl);

	@media (max-width: 767px) {
		padding: 0 var(--spacing-md);
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

.nothing-more {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding-top: var(--spacing-xl);
	height: 50vh;
	color: var(--color-text-faint);
	font-size: 12px;
	font-family: var(--font-mono);
	letter-spacing: 0.12em;
}

.stacked-zone {
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
		height: 80px;
		background: linear-gradient(0deg, rgba(232, 232, 232, 0) 0%, rgba(232, 232, 232, 1) 100%);
		background: linear-gradient(0deg, transparent 0%, var(--color-bg) 100%);
		z-index: 1001;
	}
}
</style>
