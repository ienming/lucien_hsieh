<template>
	<Teleport to="body">
		<Transition name="fade">
			<div
				v-if="open"
				ref="lightboxRef"
				class="lightbox-modal"
				@click.self="$emit('close')">
				<div class="img-container">
					<NuxtImg :src="currentImg.url" />
				</div>
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
	</Teleport>
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
const emits = defineEmits(['close']);

const currentIdx = ref(startIdx);
const lightboxRef = ref(null);
const { swipeDirection, bindEvents, unbindEvents } = useSwipe()

watch(() => open, async (newVal) => {
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
		handlePrevious();
	} else if (dir === GESTURE_DIRECTION.RIGHT) {
		handleNext();
	} else if (dir === GESTURE_DIRECTION.DOWN) {
		emits('close');
	}
});

function handleKeydown(e) {
	console.log(e);
	if (e.code === 'ArrowLeft') {
		handlePrevious();
	} else if (e.code === 'ArrowRight') {
		handleNext();
	} else if (e.code === 'Escape') {
		emits('close');
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
	position: fixed;
	top: 0;
	left: 0;
	z-index: $z-index-common-modal;
	overflow: auto;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, .75);
	backdrop-filter: blur(4px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@include response(md) {
		--indicator-size: 32px;
	}

	.btn {
		cursor: pointer;
		transition: background-color .3s cubic-bezier(1, 0, 0, 1);
	}

	.info {
		position: absolute;
		left: 0;
		top: 0;
		color: $color-white;
		padding: $space-sm;

		.title {
			font-size: $font-size-md;
			line-height: 1.2;

			@include response(md) {
				font-size: $font-size-lg;
			}
		}

		@include response(md) {
			top: unset;
			left: $space-6xl;
			bottom: $space-6xl;
		}
	}

	.indicators {
		position: absolute;
		right: 50%;
		bottom: 0;
		padding: $space-sm;
		border-radius: $radius-sm;
		background-color: $color-neutral-100;
		transform: translateX(50%);
		width: 100%;

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
