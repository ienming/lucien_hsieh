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
		</div>
	</div>
</template>

<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard.vue';

gsap.registerPlugin(ScrollTrigger);

const { projects, currentIndex } = useProjects();

const GAP = 65;
const SCALE_STEP = 0.09;

const scrollerEl = ref(null);
const sectionEl = ref(null);
const cardRefs = ref([]);

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
	for (let i = 0; i < cards.length - 1; i++) {
		tl.to(cards[i], {
			y: -heights[i] - 80,
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
});

onUnmounted(() => {
	trigger?.kill();
});
</script>

<style lang="scss" scoped>
.card-scroller {
	height: 100vh;
	overflow-y: auto;
	padding: var(--spacing-xl);

	@media (max-width: 767px) {
		padding: var(--spacing-md);
		padding-bottom: 48px;
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
	position: sticky;
	top: var(--spacing-xl);
	width: 100%;
	overflow: hidden;
	height: 80vh;

	@media (max-width: 767px) {
		top: var(--spacing-md);
	}

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
