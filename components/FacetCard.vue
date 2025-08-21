<template>
	<div
		ref="facetCard"
		class="facet-card"
		:class="{'hovering': isCardHovering}"
		@mouseenter="isCardHovering = true"
		@mouseleave="isCardHovering = false">
		<div
			class="facet-cover-container"
			@click="isLightboxOpen = true">
			<div class="facet-cover">
				<NuxtImg :src="images[0].url"/>
			</div>
			<span class="d-flex gap-space-xs align-items-center expand-btn">
				<ClientOnly>
					<Icon name="iconoir:enlarge" />
				</ClientOnly>
				<span>Expand</span>
			</span>
			<div
				v-if="images.length > 1"
				class="d-flex align-items-center gap-space-xs imgs-indicator">
				<div class="d-flex items">
					<NuxtImg
						v-for="img of images.slice(0, 5)"
						:key="img.title"
						:src="img.url"
						class="indicator-item" />
				</div>
				<span class="d-flex align-items-center text">
					{{ images.length }}+
				</span>
			</div>
		</div>
		<div
			class="d-flex flex-column gap-space-sm info-card"
			:class="{'expand': isCardHovering}">
			<div class="d-flex justify-contents-space-between align-items-start header">
				<span class="title">{{ title }}</span>
				<WorkTypeChip
					v-for="type of types"
					:key="type"
					:type="type"
					:clickable="false"
					size="sm"
					class="work-type" />
			</div>
			<div>
				<p class="content">{{ desc }}</p>
			</div>
		</div>
	</div>
	<Lightbox
		v-model:open="isLightboxOpen"
		:images="images" />
</template>

<script setup>
defineProps({
	title: {
		type: String,
		default: 'FacetCard',
	},
	desc: {
		type: String,
		default: 'Description...',
	},
	types: {
		type: Array,
		default: () => [],
	},
	images: {
		type: Array,
		default: () => [],
	},
});

const isCardHovering = ref(false);
const isLightboxOpen = ref(false);
const facetCard = ref(null);

onMounted(() => {
	const el = facetCard.value;
	const descContentHeight = el.querySelector('.content')?.getBoundingClientRect().height;
	el.style.setProperty('--desc-content-height', `${descContentHeight}px`);
})
</script>

<style lang="scss" scoped>
.facet-card {
	--indicator-avatar-size: 28px;
	--facet-card-max-width: 393px;
	--desc-content-height: 0px;
	background-color: $color-white;
	padding: $space-sm;
	border-radius: $radius-sm;
	overflow: hidden;
	border: 1px solid $color-neutral-900;
	position: relative;

	.facet-cover {
		border-radius: $radius-xs;
		object-fit: cover;
		overflow: hidden;
		max-width: var(--facet-card-max-width);
		background-color: $color-neutral-900;

		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			background-color: rgba(0, 0, 0, .35);
			opacity: 0;
			transition: opacity .1s ease-in;
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
			top: 40%;
			left: 50%;
			color: $color-white;
			font-size: $font-size-base;
			transform: translate(-50%, -50%);
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
				padding-right: $space-xs;
			}
		}
	}


	.info-card {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: $color-white;
		outline: 1px solid $color-neutral-900;
		border-radius: $radius-sm $radius-sm 0 0;
		transform: translateY(var(--desc-content-height));
		transition: .2s ease-in-out;

		.header {
			padding: $space-base $space-sm 0 $space-sm;
			font-size: $font-size-md;

			.work-type {
				flex-shrink: 0;
			}
		}

		.content {
			padding: 0 $space-sm $space-lg $space-sm;
			font-size: $font-size-base;
			max-height: 90px;
			overflow-y: scroll;
		}

		&.expand {
			transform: translateY(0);
		}
	}
}
</style>
