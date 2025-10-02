<template>
	<div class="key-image">
		<NuxtImg
			v-if="url"
			:key="url"
			:src="url" />
		<div class="d-flex justify-contents-end align-items-start gap-space-sm hint">
			<span>{{ tagline }}</span>
			<ClientOnly>
				<div class="icon">
					<Icon
						name="iconoir:arrow-right-circle-solid"/>
				</div>
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
	top: $space-md;
	right: $space-md;
	z-index: 1;
	padding: $space-xs;
	border-radius: $radius-base;
	background-color: $color-white;
	border: 1px solid $color-neutral-900;
	max-width: 440px;

	img {
		aspect-ratio: 6 / 4;
		object-fit: cover;
		border-radius: $radius-sm;
		cursor: pointer;
		&:hover {
			opacity: $opacity-80;
		}
	}

	.hint {
		text-align: right;
		margin-top: $space-xs;
		border-top: 1px solid $color-neutral-950;
		font-size: $font-size-base;

		.icon {
			align-items: center;
			flex-shrink: 0;
			padding: $space-xs;
		}
	}
}
</style>
