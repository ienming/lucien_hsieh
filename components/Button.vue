<template>
	<button
		class="me-button"
		:class="classes">
		<slot />
	</button>
</template>

<script setup>
const props = defineProps({
	label: {
		type: String,
		default: 'Me Button',
	},
	type: {
		type: String,
		default: 'filled',
	},
	size: {
		type: String,
		default: 'md',
	},
});

const classes = computed(() => {
	const results = [];

	if (props.size === 'lg') results.push('large');

	if (props.type === 'filled') {
		results.push('filled')
	} else if (props.type === 'outlined') {
		results.push('outlined');
	};

	return results;
});
</script>

<style scoped lang="scss">
.me-button {
	display: flex;
	align-items: center;
	gap: $space-xs;
	padding: $space-sm;
	border-radius: $radius-sm;

	&.filled {
		background-color: $color-neutral-100;
		color: $color-white;
		transition: .3s ease-out;

		&:hover {
			opacity: $opacity-80;
		}
	}

	&.outlined {
		border: 1px solid $color-neutral-800;
	}

	&.large {
		padding: $space-base $space-md;
	}
}
</style>
