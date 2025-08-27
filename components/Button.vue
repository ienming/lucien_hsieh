<template>
	<!-- TODO: 優化 hover interaction design 樣式 -->
	<component
		:is="renderAs"
		:to="to"
		:target="target"
		:class="classes"
		class="me-button">
		<slot />
	</component>
</template>

<script setup>
import { NuxtLink } from '#components';

const props = defineProps({
	type: {
		type: String,
		default: 'filled',
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
})

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
	padding: $space-xs $space-sm;
	border-radius: $radius-sm;
	font-size: $font-size-base;
	transition: .3s ease-out;

	&.filled {
		background-color: $color-neutral-100;
		color: $color-white;

		&:hover {
			background-color: $color-neutral-300;
		}
	}

	&.outlined {
		border: 1px solid $color-neutral-800;
		color: $color-text-default;

		&:hover {
			background-color: $color-neutral-950;
		}
	}

	&.large {
		padding: $space-base $space-md;
		font-size: $font-size-md;
	}
}
</style>
