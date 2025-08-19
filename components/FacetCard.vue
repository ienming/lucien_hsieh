<template>
	<div
		class="facet-card"
		:class="{'hovering': isCardHovering}"
		@mouseenter="isCardHovering = true"
		@mouseleave="isCardHovering = false">
		<div
			class="facet-cover-container"
			@click="isLightboxOpen = true">
			<!-- TODO: 換成 NuxtImg -->
			<div class="facet-cover" />
			<span class="d-flex gap-space-xs align-items-center expand-btn">
				<ClientOnly>
					<Icon name="iconoir:enlarge" />
				</ClientOnly>
				<span>Expand</span>
			</span>
			<div class="d-flex align-items-center gap-space-xs imgs-indicator">
				<div class="d-flex items">
					<div class="indicator-item" />
					<div class="indicator-item" />
				</div>
				<span class="d-flex align-items-center text">
					<!-- TODO: 數字 -->
					<ClientOnly>
						<Icon name="iconoir:plus" />
					</ClientOnly>
				</span>
			</div>
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
		:images="images"
		@close="isLightboxOpen = false" />
</template>

<script setup>
defineProps({
	images: {
		type: Array,
		default: () => [],
	},
});

const isCardHovering = ref(false);
const isLightboxOpen = ref(false);
</script>

<style lang="scss" scoped>
.facet-card {
	--indicator-avatar-size: 28px;
	--facet-card-max-width: 393px;
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
		max-width: var(--facet-card-max-width);
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
		cursor: pointer;

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
		}

		.imgs-indicator {
			position: absolute;
			right: $space-sm;
			top: $space-sm;
			padding: $space-xxs;
			background-color: $color-white;
			border-radius: $radius-round;
			border: 1px solid $color-neutral-900;

			.items {
				.indicator-item {
					border-radius: $radius-round;
					border: 1px solid $color-white;
					background-color: $color-neutral-900;
					width: var(--indicator-avatar-size);
					height: var(--indicator-avatar-size);

					&:not(:first-child) {
						margin-left: calc($space-sm * -1);
					}
				}
			}


			.text {
				font-size: $font-size-sm;
				color: $color-text-secondary;
			}
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
