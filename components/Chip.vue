<template>
	<span
		class="d-flex align-items-center gap-space-xs chip"
		:class="{'clickable': clickable}"
		@click="closable ? $emit('close') : null">
		<slot name="prefixIcon" />
		<span>{{ label }}</span>
		<ClientOnly
			v-if="closable"
			class="close">
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
	clickable: {
		type: Boolean,
		default: true,
	},
	closable: {
		type: Boolean,
		default: false,
	},
});
defineEmits(['close']);
</script>

<style lang="scss" scoped>
.chip{
	padding: $space-xxs $space-sm;
	transition: opacity .3s ease-in-out;
	border: 1px solid $color-neutral-900;
	border-radius: $radius-round;

	&.clickable:hover {
		cursor: pointer;
		opacity: 0.5;
	}
}
</style>