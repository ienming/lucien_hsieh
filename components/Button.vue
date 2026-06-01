<script setup>
import { NuxtLink } from '#components';

const props = defineProps({
	variant: {
		type: String,
		default: 'filled',
		validator: (value) => ['filled', 'outlined'].includes(value),
	},
	size: {
		type: String,
		default: 'md',
	},
	to: {
		type: String,
		default: '',
	},
	target: {
		type: String,
		default: '_self',
	},
});

const renderAs = computed(() => {
	if (props.to) return NuxtLink;
	return 'button';
});

const classes = computed(() => {
	const results = [];

	if (props.size === 'lg') results.push('large');
	results.push(props.variant);

	return results;
});
</script>

<template>
	<!-- TODO: 優化 hover interaction design 樣式 -->
	<component
		:is="renderAs"
		:to="to"
		:target="target"
		:class="classes"
		class="luc-button"
	>
		<slot />
	</component>
</template>

<style scoped lang="scss">
.luc-button {
	display: flex;
	align-items: center;
	gap: $space-xs;
	padding: $space-xs $space-sm;
	border-radius: $radius-sm;
	font-size: $font-size-base;
	transition: 0.3s ease-out;

	&.filled {
		background-color: var(--color-neutral-100);
		color: var(--color-white);

		&:hover {
			background-color: var(--color-neutral-300);
		}
	}

	&.outlined {
		border: 1px solid var(--color-neutral-800);
		color: var(--color-text-default);

		&:hover {
			background-color: var(--color-neutral-950);
		}
	}

	&.large {
		padding: $space-base $space-md;
		font-size: $font-size-md;
	}
}
</style>
