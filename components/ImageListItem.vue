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
			<div class="info fade-right-link">
				<span class="title">{{ title }}</span>
				<span class="sub-title">{{ subTitle }}</span>
			</div>
			<div class="meta">
				<p class="year">{{ year }}</p>
				<template
					v-for="(tag, idx) of tags"
					:key="tag">
					<span
						class="fade-link"
						@click.stop="$emit('filter-by-tag', tag)">{{ tag }}</span>
					<span v-if="idx !== tags.length - 1"> / </span>
				</template>
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
	border-bottom: 1px solid $color-neutral-900;
	list-style: none;
	cursor: pointer;
		
	.item-container {
		max-width: 1200px;
		margin: 0 auto;
		margin-bottom: $space-base;
		display: grid;
		grid-template-columns: auto;
		row-gap: $space-sm;

		@include response(md) {
			grid-template-columns: 3fr 1fr;
			padding: $space-base;
			margin-bottom: 0;
		}

		.cover {
			aspect-ratio: 4/3;
			object-fit: cover;
		}
	}

	.info {
		margin-bottom: $space-lg;

		@include response(md) {
			margin-bottom: 0;
		}

		.title {
			display: block;
			font-weight: $font-weight-500;
		}
		
		.sub-title {
			font-size: $font-size-md;
		}
	}


	.meta {
		font-size: $font-size-base;

		.year {
			margin-bottom: 0;
			color: $color-text-secondary;
		}
	}
}
</style>
