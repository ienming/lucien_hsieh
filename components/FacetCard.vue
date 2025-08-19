<template>
	<div
		class="facet-card"
		:class="{'hovering': isCardHovering}"
		@mouseenter="isCardHovering = true"
		@mouseleave="isCardHovering = false">
		<div class="facet-cover-container">
			<!-- TODO: 換成 NuxtImg -->
			<div class="facet-cover" />
			<span
				class="d-flex gap-space-xs align-items-center expand-btn"
				@click="isLightboxOpen = true">
				<ClientOnly>
					<Icon name="iconoir:enlarge" />
				</ClientOnly>
				<span>Expand</span>
			</span>
		</div>
		<div class="d-flex flex-column gap-space-sm info-card">
			<div class="d-flex justify-contents-space-between align-items-center header">
				<span class="title">Facet title</span>
				<WorkTypeChip />
			</div>
			<div>
				<p
					v-show="isCardHovering"
					class="content">content...</p>
			</div>
		</div>
	</div>
	<Lightbox
		:open="isLightboxOpen"
		@close="isLightboxOpen = false" />
</template>

<script setup>
const isCardHovering = ref(false);
const isLightboxOpen = ref(false);
</script>

<style lang="scss" scoped>
.facet-card {
	background-color: $color-white;
	padding: $space-sm;
	border-radius: $radius-sm;
	overflow: hidden;
	border: 1px solid $color-neutral-900;
	position: relative;

	.facet-cover {
		border-radius: $radius-xs;
		aspect-ratio: 1 / 1;
		object-fit: cover;
		overflow: hidden;
		max-width: 393px;
		background-color: $color-neutral-900;

		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, .35);
			opacity: 0;
			transition: opacity .3s ease-in-out;
		}
	}

	&.hovering {
		.facet-cover::after {
			opacity: 1;
		}

		.facet-cover-container {
			.expand-btn {
				opacity: 1;
			}
		}
	}

	.facet-cover-container {
		position: relative;

		.expand-btn {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			padding: $space-xxs $space-base;
			border-radius: $radius-round;
			font-size: $font-size-sm;
			background-color: $color-white;
			opacity: 0;
			cursor: pointer;
		}
	}


	.info-card {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		max-height: 180px;
		overflow-y: scroll;
		background-color: $color-white;
		outline: 1px solid $color-neutral-900;
		border-radius: $radius-sm $radius-sm 0 0;

		.header {
			padding: $space-base $space-sm 0 $space-sm;
			font-size: $font-size-md;
		}

		.content {
			padding: 0 $space-sm $space-lg $space-sm;
			font-size: $font-size-base;
		}
	}
}
</style>
