<template>
	<div class="skeleton">
		<div class="bar" />
		<div class="bar" />
		<div class="bar short" />
	</div>
</template>

<style lang="scss" scoped>
.skeleton {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: $space-base;

	.bar {
		border-radius: $radius-xxs;
		max-width: 600px;
		height: 16px;
		background: linear-gradient(90deg, $color-neutral-800, $color-neutral-900, $color-neutral-800);
		animation: loading 6s infinite;

		&.short {
			max-width: 300px;
			width: 50vw;
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
}
</style>
