<template>
	<div
		class="project-meta"
		:class="{'align-top': direction === GESTURE_DIRECTION.DOWN}">
		<div
			ref="header"
			class="header">
			<div class="d-flex gap-space-lg justify-contents-space-between project-title">
				<div class="d-flex flex-column gap-space-xxs">
					<p class="title">{{ title }}</p>
					<p class="tagline">{{ tagline }}</p>
				</div>
			</div>
			<div class="d-flex flex-column flex-md-row gap-space-xs justify-contents-space-between actions">
				<!-- TODO: 思考多超連結的情況？ -->
				<Button
					v-if="links"
					:to="links[0].url"
					target="_blank"
					class="w-full d-flex justify-contents-space-between">
					<span>{{ links[0].label ? links[0].label : 'Link To Webpage' }}</span>
					<ClientOnly>
						<Icon name="iconoir:arrow-up-right-square-solid" />
					</ClientOnly>
				</Button>
				<Button
					variant="outlined"
					class="w-full d-flex justify-contents-space-between"
					@click="isContentShow = !isContentShow;">
					<span>About the project</span>
					<ClientOnly>
						<Icon
							name="iconoir:nav-arrow-up"
							class="toggle-btn"
							:class="{'downward': isContentShow}" />
					</ClientOnly>
				</Button>
				<div
					class="body"
					:class="{'show': isContentShow}">
					<div class="d-flex justify-contents-space-between flex-wrap meta">
						<div class="year">
							<span class="mr-space-sm">&lt;Year&gt;</span>
							<span>{{ year }}</span>
						</div>
						<div class="d-flex gap-space-xs flex-wrap align-items-start types">
							<span class="mr-space-sm">&lt;Type&gt;</span>
							<WorkTypeChip
								v-for="tag of tags" 
								:key="tag"
								:type="tag"
								:clickable="false" />
						</div>
					</div>
					<div class="common-paragraph content">
						<p
							v-for="(content, idx) of contents"
							:key="idx"
							:class="{
								'mb-space-base': idx !== contents.length - 1,
								'mb-space-2xl': idx === contents.length - 1,
							}">
							{{ content }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import gsap from 'gsap';
import {GESTURE_DIRECTION} from '~/constants/interaction';
import {splitMultiLine} from '~/libs/helper';

const {title, meta} = defineProps({
	title: {
		type: String,
		default: 'Project Title',
	},
	meta: {
		type: Object,
		default: () => {},
	},
})

const {direction} = useScrollDirection();
const headerRef = useTemplateRef('header');

const {tagline, year, tags, about, links} = meta;
const isContentShow = ref(false);

const contents = computed(() => splitMultiLine(about));

// TODO: refactor to useGSAP or plugin
let tl, ctx;
watch(isContentShow, newVal => {
	if (newVal) {
		tl.play();
	} else {
		tl.reverse();
	}
});

onMounted(() => {
	const {height: oriHeight} = headerRef.value.getBoundingClientRect();
	const {height: bodyHeight} = headerRef.value.querySelector('.body').getBoundingClientRect();

	ctx = gsap.context(() => {
		tl = gsap.timeline({
			paused: true,
		});
		tl
			.to(headerRef.value, {
				height: oriHeight + bodyHeight,
				ease: 'power2.out',
				duration: 0.5,
			})
			.to('.body', {
				clipPath: 'inset(0px 0% 0% 0px round 6px)',
				opacity: 1,
				duration: 0.4,
			}, '<');
	});
})

onUnmounted(() => {
	if (ctx) ctx.revert();
})
</script>

<style lang="scss" scoped>
.project-meta {
	position: fixed;
	--header-height: 40px;
	--space-between-header: calc(-1 * #{$space-base});
	top: calc(var(--header-height) + var(--space-between-header));
	left: 0;
	z-index: $z-index-common-fixed;
	background-color: $color-white;
	padding: $space-sm $space-base;
	border-radius: $radius-base;
	border: 1px solid $color-neutral-900;
	transition: all .15s ease-in-out;

	@include response(md) {
		--space-between-header: #{$space-lg};
		width: 400px;
		max-width: 50%;
		left: $space-lg;
	}

	.header {
		height: auto;

		.project-title {
			.title {
				font-size: $font-size-md;
				transition: font-size .3s ease-out;
			}
	
			.tagline {
				font-size: $font-size-base;
				line-height: 1.2;
				margin-bottom: $space-sm;
				color: $color-text-secondary;
				transition: font-size .3s ease-out;
			}
		}
	
		.actions {
			padding: $space-xs 0;
			position: relative;

			.toggle-btn {
				transition: transform .2s ease-out;

				&.downward {
					transform: rotate(180deg);
				}
			}

			.body {
				position: absolute;
				top: $space-5xl;
				width: 100%;
				max-height: 300px;
				overflow-y: scroll;
				clip-path: inset(0px 0% 100% 0px round 6px);
				opacity: 0;

				.meta {
					padding: $space-sm 0;
					font-size: $font-size-sm;
				}
			}
		}

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			width: calc(100% - $space-base * 2);
			height: 52px;
			background: linear-gradient(0deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
			pointer-events: none;
			opacity: 0;
			transition: opacity .5s ease-in;
		}

		&:has(.body.show) {
			&::after {
				opacity: 1;
			}
		}
	}

	&.align-top {
		top: 0;

		@include response(md) {
			top: $space-lg;
		}
	}
}
</style>
