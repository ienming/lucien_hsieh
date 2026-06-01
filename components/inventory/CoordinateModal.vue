<script lang="ts" setup>
import ModalOverlay from '../ModalOverlay.vue';
const { isCoordinateModalOpen } = useCoordinate();
</script>

<template>
	<ModalOverlay :open="isCoordinateModalOpen">
		<div class="coordinate-modal">
			Coordinates
			<button @click="isCoordinateModalOpen = false">Close</button>
		</div>
	</ModalOverlay>
</template>

<style lang="scss" scoped></style>
