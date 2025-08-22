<template>
	<span
		class="d-flex align-items-center gap-space-xs chip"
		:class="{
			'clickable': clickable,
			'active': selected,
			'small': size === 'sm'
		}"
		@click="$emit('toggle', value)">
		<slot name="prefixIcon" />
		<span>{{ label }}</span>
		<ClientOnly
			v-if="closable"
			class="close"
			@click="$emit('close')">
			<Icon name="iconoir:xmark" />
		</ClientOnly>
	</span>
</template>

<script setup>
defineProps({
	label: {
		type: String,
		default: '',
	},
	value: {
		type: String,
		default: '',
	},
	size: {
		type: String,
		default: 'md',
	},
	selected: {
		type: Boolean,
		default: false,
	},
	clickable: {
		type: Boolean,
		default: true,
	},
	closable: {
		type: Boolean,
		default: false,
	},
});
defineEmits(['close', 'toggle']);
</script>

<style lang="scss" scoped>
.chip{
	padding: $space-xxs $space-sm;
	transition: opacity .3s ease-in-out;
	border: 1px solid $color-neutral-900;
	border-radius: $radius-round;

	.close {
		font-size: $font-size-sm;
	}

	&.small {
		padding: $space-xxs $space-sm;
		gap: $space-xs;
		font-size: $font-size-sm;
	}

	&.active {
		background-color: $color-neutral-950;
		border: none;
	}

	&.clickable:hover {
		cursor: pointer;
		opacity: 0.5;
	}
}
</style>