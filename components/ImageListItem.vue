<template>
	<li
		ref="img-list-item"
		class="img-list-item">
		<div class="align-items-center item-container">
			<NuxtImg
				:src="cover"
				class="d-md-none cover"
				loading="lazy"
				placeholder />
			<div
				class="d-flex flex-column flex-md-row info"
				@mouseenter="isMobile ? null : $emit('mouse-enter-item')">
				<span class="title">{{ title }}</span>
				<span class="sub-title">{{ subTitle }}</span>
				<span
					v-if="isMobile"
					class="tagline">{{ tagline }}</span>
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
defineProps({
	title: {
		type: String,
		default: '',
	},
	subTitle: {
		type: String,
		default: '',
	},
	tagline: {
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
</script>

<style scoped lang="scss">
.img-list-item {
	position: relative;
	z-index: 1;
	max-width: $content-max-width;
	padding: $space-xs;
	background-color: $color-white;
	border: 1px solid $color-neutral-900;
	border-radius: $radius-base;
	margin-bottom: -1px;
	list-style: none;
	cursor: pointer;

	@include response(md) {
		padding: $space-md $space-xl;
	}
		
	.item-container {
		margin: 0 auto;
		margin-bottom: $space-base;
		display: grid;
		grid-template-columns: auto;
		row-gap: $space-sm;

		@include response(md) {
			grid-template-columns: repeat(2, 1fr);
			margin-bottom: 0;
		}

		.cover {
			aspect-ratio: 4/3;
			object-fit: cover;
		}
	}

	.info {
		margin-bottom: $space-base;

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

		.tagline {
			margin-top: $space-sm;
			display: inline-block;
			font-size: $font-size-base;
		}

		@include response(md) {
			margin-bottom: 0;
			align-items: baseline;
			gap: $space-base;
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
			grid-template-columns: repeat(3, 1fr);
		}
	}
}
</style>
