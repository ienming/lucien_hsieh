<script lang="ts" setup>
import ModalOverlay from '../ModalOverlay.vue';
const { isCoordinateModalOpen } = useCoordinate();
</script>

<template>
	<ModalOverlay
		:open="isCoordinateModalOpen"
		transition="slide-from-bottom"
		@update:open="isCoordinateModalOpen = $event"
	>
		<div class="coordinate-modal">
			Coordinates
			<button @click="isCoordinateModalOpen = false">Close</button>
		</div>
	</ModalOverlay>
</template>

<style lang="scss" scoped>
.coordinate-modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	max-width: var(--card-max-width);
	background: var(--color-surface);
	border-radius: 16px;
	height: 50vh;
}
</style>
