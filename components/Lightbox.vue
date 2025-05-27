<template>
	<Teleport to="body">
		<div
			v-show="open"
			class="lightbox-modal">
			<div class="img-header">
				<div class="actions">
					<div
						class="btn close"
						@click="$emit('close')">
						Close
					</div>
				</div>
			</div>
			<div class="img-container">
				<NuxtImg :src="currentImg" />
			</div>
			<div class="controls">
				<div
					class="btn prev"
					@click="handlePrevious">Previous</div>
				<div
					class="btn next"
					@click="handleNext">Next</div>
			</div>
		</div>
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
	z-index: 999;
	width: 100vw;
	height: 100vh;
	background-color: rgba(255, 255, 255, .85);
	backdrop-filter: blur(4px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;

	.img-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		width: 100%;

	}

	.btn {
		cursor: pointer;
	}

	.img-container {
		img {
			max-width: 600px;
		}
	}
}
</style>
