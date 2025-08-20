<template>
	<div class="key-image">
		<Transition name="fade">
			<NuxtImg
				v-if="url"
				:key="url"
				:src="url" />
		</Transition>
		<div class="d-flex justify-contents-end align-items-center gap-space-sm hint">
			<span>{{ tagline }}</span>
			<ClientOnly>
				<Icon name="iconoir:arrow-right-circle-solid" />
			</ClientOnly>
		</div>
	</div>
</template>

<script setup>
defineProps({
	url: {
		type: String,
		default: '',
	},
	tagline: {
		type: String,
		default: '',
	},
});
</script>

<style scoped lang="scss">
.key-image {
	position: fixed;
	bottom: 0;
	right: 0;
	z-index: 1;
	margin-top: $space-3xl;
	padding: $space-xs;
	border-radius: $radius-base;
	background-color: $color-white;
	border: 1px solid $color-neutral-900;

	img {
		aspect-ratio: 6 / 4;
		object-fit: cover;
		max-width: 600px;
		border-radius: $radius-sm;
		cursor: pointer;
		&:hover {
			opacity: $opacity-80;
		}
	}

	.hint {
		margin-top: $space-xs;
		border-top: 1px solid $color-neutral-950;
		font-size: $font-size-base;
	}
}
</style>
