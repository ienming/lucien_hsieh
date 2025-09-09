<template>
	<div
		v-if="type === 'text'"
		class="skeleton-text-container">
		<div class="skeleton bar" />
		<div class="skeleton bar" />
		<div class="skeleton bar short" />
	</div>
	<div
		v-else-if="type === 'image' || type === 'imageProfile'"
		class="skeleton skeleton-img"
		:class="{'profile': type === 'imageProfile'}" />
</template>

<script setup>
defineProps({
	type: {
		type: String,
		default: 'text',
		validator: (value) => ['text', 'image', 'imageProfile'].includes(value),
	},
});
</script>

<style lang="scss" scoped>
.skeleton {
	background: linear-gradient(90deg, $color-neutral-800, $color-neutral-900, $color-neutral-800);
	animation: loading 6s infinite;
}

.skeleton-img {
	width: 100%;
	aspect-ratio: 2.39 / 1;
	border-radius: $radius-sm;

	&.profile {
		aspect-ratio: 1 / 1.25;

		@include response(md) {
			aspect-ratio: 2.39 / 1;
		}
	}
}

.skeleton-text-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: $space-base;

	.bar {
		border-radius: $radius-xxs;
		max-width: 600px;
		height: 16px;

		&.short {
			max-width: 300px;
			width: 50vw;
		}
	}
}

@keyframes loading {
	from {
		background-position-x: 0px;
	}

	to {
		background-position-x: 1200px;
	}
}
</style>
