<template>
	<li
		ref="img-list-item"
		class="img-list-item">
		<div class="cover-container">
			<NuxtImg
				:src="cover"
				:class="imgFloatOnMobile"
				loading="lazy"
				placeholder
				class="d-md-none cover" />
		</div>
		<div class="info-container">
			<div
				class="d-flex flex-column flex-md-row info"
				@mouseenter="isMobile ? null : $emit('mouse-enter-item')">
				<span class="title">{{ title }}</span>
				<span
					v-if="isMobile"
					class="sub-title">{{ subTitle }}</span>
			</div>
			<div class="meta">
				<p class="year">{{ year }}</p>
				<div class="types d-flex gap-space-sm">
					<WorkTypeChip
						v-for="tag of tags"
						:key="tag"
						:type="tag"
						@click.stop="$emit('filter-by-tag', tag)" />
				</div>
			</div>
		</div>
	</li>
</template>

<script setup>
import { showSplitTextOnHover } from '~/libs/animate';

defineProps({
	title: {
		type: String,
		default: '',
	},
	subTitle: {
		type: String,
		default: '',
	},
	tags: {
		type: Array,
		default: () => [],
	},
	year: {
		type: String,
		default: '',
	},
	cover: {
		type: String,
		default: '',
	},
});

defineEmits(['mouse-enter-item', 'filter-by-tag']);

const listItemRef = useTemplateRef('img-list-item');
defineExpose({el: listItemRef});
const {isMobile} = useIsMobile();
let imgFloatOnMobile;

let cleanUp;

onMounted(() => {
	if (!isMobile.value) {
		cleanUp = showSplitTextOnHover(listItemRef.value.querySelector('.info .title'), {}, '.img-list-item');
	}
	imgFloatOnMobile = Math.random() - 0.5 > 0 ? 'left' : 'right';
});

onUnmounted(() => {
	if (cleanUp) {
		cleanUp();
	}
});
</script>

<style scoped lang="scss">
.img-list-item {
	position: relative;
	z-index: 1;
	max-width: $content-max-width;
	list-style: none;
	cursor: pointer;
	pointer-events: auto;

	@include response(md) {
		padding: $space-base $space-xl;
		background-color: $color-white;
		border-radius: $radius-sm;
		border-bottom: 1px solid $color-neutral-900;
	}

	.cover-container, .info-container {
		padding: $space-md;
		border-radius: $radius-sm;
		border: 1px solid $color-neutral-900;
		background-color: $color-white;

		@include response(md) {
			padding: 0;
			border: none;
		}
	}

	.cover {
		aspect-ratio: 4/3;
		object-fit: cover;
		border-radius: $radius-xs;

		&.left {
			margin-right: auto;
		}

		&.right {
			margin-left: auto;
		}
	}

	.info-container {
		display: grid;
		grid-template-columns: auto;
		margin-top: -1px;

		@include response(md) {
			grid-template-columns: repeat(4, 1fr);
		}

		.info {
			.title {
				display: block;
				font-size: $font-size-md;
			}
			
			.sub-title {
				display: inline-block;
				font-size: $font-size-base;
				color: $color-text-secondary;
				line-height: 1.13;
	
				@include response(md) {
					font-size: $font-size-base;
				}
			}
	
			@include response(md) {
				margin-bottom: 0;
				align-items: center;
				gap: $space-base;
				grid-column: 1 / 4;
			}
		}

		.meta {
			display: grid;
			font-size: $font-size-base;
	
			.year {
				display: inline-flex;
				align-items: center;
				margin-bottom: $space-sm;
				opacity: $opacity-50;
				font-size: $font-size-xs;
	
				@include response(md) {
					margin-bottom: 0;
					font-size: $font-size-base;
				}
			}
	
			.types {
				grid-column: 2 / -1;
			}
	
			@include response(md) {
				grid-template-columns: repeat(2, 1fr);
				grid-column: 4 / -1;
			}
		}
	}

}
</style>
