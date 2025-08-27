<template>
	<div
		class="project-next"
		@click="navigateTo(path)">
		<div class="d-flex justify-contents-space-between align-items-center header">
			<span class="title">
				Next
			</span>
			<ClientOnly>
				<Icon name="iconoir:arrow-right" />
			</ClientOnly>
		</div>
		<div class="d-flex flex-column flex-md-row gap-space-lg content">
			<NuxtImg
				:src="cover"
				class="next-cover"
				loading="lazy"
				placeholder />
			<div class="d-flex flex-column gap-space-base next-info">
				<div class="info-header">
					<div class="title">{{ title }}</div>
					<div class="subtitle">{{ subtitle }}</div>
				</div>
				<div class="d-flex gap-space-sm tags">
					<WorkTypeChip
						v-for="tag of tags"
						:key="tag"
						:type="tag" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const {meta} = defineProps({
	meta: {
		type: Object,
		default: () => {},
	},
})

const {title, subtitle, path, tags, cover} = meta;
</script>

<style scoped lang="scss">
.project-next{
	width: 90vw;
	transition: opacity .3s ease-out;

	&:hover {
		// TODO: 改成別的動態
		opacity: $opacity-50;
		cursor: pointer;
	}

	.header, .content {
		border-radius: $radius-base;
		background-color: $color-white;
	}
	
	.header {
		padding: $space-base $space-sm;
		border: 1px solid $color-neutral-900;

		.title {
			font-size: $font-size-lg;
		}
	}

	.content {
		padding: $space-sm;

		@include response(md) {
			height: 280px;
			align-items: center;
		}
	}

	.next-cover {
		border-radius: $radius-sm;
		background-color: $color-neutral-800;
		width: 100%;
		max-width: 550px;
		aspect-ratio: 1 / 1.25;
		object-fit: cover;

		@include response(md) {
			width: unset;
			height: 100%;
			aspect-ratio: 9 / 4;
		}
	}

	.next-info {
		.title {
			font-size: $font-size-lg;

			@include response(md) {
				font-size: $font-size-xl;
			}
		}

		.subtitle {
			font-size: $font-size-md;
		}
	}
}
</style>
