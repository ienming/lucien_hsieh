<template>
	<li
		class="img-list-item"
		@mouseenter="isMobile ? null : $emit('mouse-enter-item')"
		@mouseleave="isMobile ? null : $emit('mouse-leave-item')">
		<div class="align-items-center item-container">
			<NuxtImg
				:src="cover"
				class="d-md-none cover"
				loading="lazy"
				placeholder />
			<div class="info d-md-flex">
				<span class="title">{{ title }}</span>
				<span class="sub-title">{{ subTitle }}</span>
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

defineEmits(['mouse-enter-item', 'mouse-leave-item', 'filter-by-tag']);

const {isMobile} = useIsMobile();
</script>

<style scoped lang="scss">
.img-list-item {
	position: relative;
	z-index: 1;
	max-width: $content-max-width;
	padding: $space-md;
	background-color: $color-white;
	border: 1px solid $color-neutral-900;
	border-radius: $radius-base;
	margin-bottom: -1px;
	list-style: none;
	cursor: pointer;
		
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
		margin-bottom: $space-lg;

		.title {
			display: block;
			font-size: $font-size-md;
		}
		
		.sub-title {
			font-size: $font-size-base;
		}

		@include response(md) {
			margin-bottom: 0;
			align-items: end;
			gap: $space-base;
		}
	}


	.meta {
		display: grid;
		font-size: $font-size-base;

		.year {
			display: inline-flex;
			align-items: center;
			margin-bottom: 0;
			opacity: $opacity-50;
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
