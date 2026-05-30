<script lang="ts" setup>
const isCoordinatesModalOpen = ref(false);
</script>

<template>
	<div class="works-coordinate">
		<span @click="isCoordinatesModalOpen = true">作品分類</span>
		<Transition>
			<div
				v-if="isCoordinatesModalOpen"
				class="coordinate-modal"
			>
				Coordinates
			</div>
		</Transition>
	</div>
</template>

<style lang="scss" scoped></style>
