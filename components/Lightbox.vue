<template>
	<Teleport to="body">
		<Transition name="fade">
			<div
				v-show="open"
				class="lightbox-modal">
				<div
					class="btn close"
					@click="$emit('close')">
					<ClientOnly>
						<Icon
							name="ant-design:close-outlined"
							size="24" />
					</ClientOnly>
				</div>
				<div class="img-container">
					<NuxtImg :src="currentImg" />
				</div>
				<div class="controls">
					<div
						class="btn prev"
						@click="handlePrevious">
						<ClientOnly>
							<Icon
								name="ant-design:left-outlined"
								size="24" />
						</ClientOnly>
					</div>
					<div
						class="btn next"
						@click="handleNext">
						<ClientOnly>
							<Icon
								name="ant-design:right-outlined"
								size="24" />
						</ClientOnly>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
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
defineEmits(['close']);

const currentIdx = ref(startIdx);
watch(() => startIdx, newVal => currentIdx.value = newVal);
const currentImg = computed(() => images[currentIdx.value]);

// TODO: 加上可以按方向鍵就前後換圖

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
	position: fixed;
	top: 0;
	left: 0;
	z-index: $z-index-common-modal;
	overflow: auto;
	width: 100vw;
	height: 100vh;
	background-color: rgba(255, 255, 255, .85);
	backdrop-filter: blur(4px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: $space-lg;

	.close {
		position: absolute;
		top: 0;
		right: 0;
		padding: $space-sm $space-sm 0 0;

		@include response(md) {
			padding: $space-lg $space-lg 0 0;
		}
	}

	.btn {
		cursor: pointer;
		transition: background-color .3s cubic-bezier(1, 0, 0, 1);

		&:hover {
			background-color: rgba(255, 255, 255, .85);
		}
	}

	.controls {
		position: fixed;
		top: 50%;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.btn {
			display: inline-flex;
			align-items: center;
			padding: $space-sm;

			@include response(md) {
				padding: $space-lg;
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
