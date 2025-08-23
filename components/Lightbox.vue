<template>
	<ModalOverlay
		:open="open"
		@update:open="$emit('update:open', $event)">
		<div
			ref="lightboxRef"
			class="d-flex justify-contents-center align-items-center w-full h-full lightbox-modal"
			@click.self="$emit('update:open', false)">
			<div
				class="img-container"
				@click="isInfoShow = !isInfoShow">
				<NuxtImg :src="currentImg.url" />
			</div>
			<div
				v-if="!isMobile && images.length > 1"
				class="controls-container"
				:class="{'show': isInfoShow}">
				<ClientOnly>
					<Icon
						name="iconoir:nav-arrow-left"
						class="left control-btn"
						@click="handlePrevious" />
				</ClientOnly>
				<ClientOnly>
					<Icon
						name="iconoir:nav-arrow-right"
						class="right control-btn"
						@click="handleNext" />
				</ClientOnly>
			</div>
			<Transition name="fade">
				<div
					v-show="isInfoShow"
					class="d-flex justify-contents-space-between gap-space-4xl info-container">
					<div class="d-flex flex-column gap-space-sm info">
						<div class="title">{{ currentImg.title }}</div>
						<div class="common-paragraph desc">{{ currentImg.desc }}</div>
					</div>
					<ul
						v-if="images.length > 1"
						class="d-flex gap-space-md indicators">
						<li
							v-for="(indicator, idx) of images"
							:key="indicator">
							<NuxtImg
								class="indicator"
								:src="indicator.url"
								:class="{'active': currentIdx === idx}"
								@click="currentIdx = idx" />
						</li>
					</ul>
				</div>
			</Transition>
		</div>
	</ModalOverlay>
</template>

<script setup>
import { GESTURE_DIRECTION } from '~/constants/interaction';

const {open, startIdx, images} = defineProps({
	open: {
		type: Boolean,
		default: false,
	},
	startIdx: {
		type: Number,
		default: 0,
	},
	images: {
		type: Array,
		default: () => [],
	},
});
const emits = defineEmits(['update:open']);
const { isMobile } = useIsMobile();

const currentIdx = ref(startIdx);
const isInfoShow = ref(true);
const lightboxRef = ref(null);
const { swipeDirection, bindEvents, unbindEvents } = useSwipe()

watch(lightboxRef, async (newVal) => {
	if (newVal) {
		document.addEventListener('keydown', handleKeydown);

		await nextTick();
		bindEvents(lightboxRef.value);
	} else {
		document.removeEventListener('keydown', handleKeydown);
		unbindEvents(lightboxRef.value);
	}
});

watch(() => startIdx, newVal => currentIdx.value = newVal);
const currentImg = computed(() => images[currentIdx.value]);

watch(swipeDirection, dir => {
	if (dir === GESTURE_DIRECTION.LEFT) {
		handleNext();
	} else if (dir === GESTURE_DIRECTION.RIGHT) {
		handlePrevious();
	} else if (dir === GESTURE_DIRECTION.DOWN) {
		emits('update:open', false);
	}
});

function handleKeydown(e) {
	if (e.code === 'ArrowLeft') {
		handlePrevious();
	} else if (e.code === 'ArrowRight') {
		handleNext();
	} else if (e.code === 'Escape') {
		emits('update:open', false);
	}
}

function handlePrevious() {
	if (currentIdx.value === 0) {
		currentIdx.value = images.length - 1;
		return;
	}

	currentIdx.value -= 1;
}

function handleNext() {
	if (currentIdx.value === images.length - 1) {
		currentIdx.value = 0;
		return;
	}

	currentIdx.value += 1;
}
</script>

<style scoped lang="scss">
.lightbox-modal {
	--indicator-size: 24px;
	position: absolute;

	@include response(md) {
		--indicator-size: 32px;
	}

	.controls-container {
		opacity: 0;
		transition: opacity .3s ease-in-out;

		&.show {
			opacity: 1;
		}

		.control-btn {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			color: $color-neutral-850;
			display: inline-block;
			padding: $space-md $space-4xl;
			cursor: pointer;
	
			&.left {
				left: 0;
			}
	
			&.right {
				right: 0;
			}
	
			&:hover {
				color: $color-white;
			}
		}
	}


	.info-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		flex-direction: column;
		background: linear-gradient(0deg, rgba(13, 13, 13, 1), rgba(13, 13, 13, 0)); //$color-neutral-50
		color: $color-white;
		padding: $space-sm;

		@include response(md) {		
			padding: $space-5xl $space-4xl $space-4xl $space-4xl;
			flex-direction: row;
		}
	}

	.info {
		.title {
			font-size: $font-size-md;
			line-height: 1.2;

			@include response(md) {
				font-size: $font-size-lg;
			}
		}
	}

	.indicators {
		flex-shrink: 0;
		padding: $space-xs;
		border-radius: $radius-xs;
		background-color: $color-neutral-100;

		@include response(md) {
			right: $space-6xl;
			bottom: $space-6xl;
			transform: unset;
			width: auto;
			padding: $space-md $space-lg;
			border-radius: $radius-base;
		}

		.indicator {
			width: var(--indicator-size);
			height: var(--indicator-size);
			background-color: $color-neutral-900;
			aspect-ratio: 1 / 1;
			object-fit: cover;
			border-radius: $radius-xs;
			opacity: $opacity-50;

			&:hover {
				opacity: 1;
			}

			&.active {
				opacity: 1;
				box-shadow:  0 0 0 5px $color-neutral-100, 0 0 0 8px $color-neutral-950;
			}
		}
	}

	.img-container {
		img {
			width: 100%;
			max-height: 90vh;
		}
	}
}
</style>
