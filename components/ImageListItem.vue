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
	border-bottom: 1px solid $color-neutral-900;
	list-style: none;
	cursor: pointer;
		
	.item-container {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: auto;

		@media screen and (min-width: 768px) {
			grid-template-columns: 3fr 1fr;
			padding: $space-base;
		}
	}

	.cover {
		margin: $space-sm 0;
	}

	.info {
		.title {
			font-size: $font-size-xl;
			font-weight: $font-weight-700;
			display: block;
		}
		
		.sub-title {
			font-size: $font-size-md;
			font-weight: $font-weight-500;
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
