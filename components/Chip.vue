<template>
	<span
		class="d-flex align-items-center gap-space-xs chip"
		@click="closable ? $emit('close') : null">
		<slot name="prefixIcon" />
		<span>{{ label }}</span>
		<ClientOnly
			v-if="closable"
			class="close">
			<Icon name="ant-design:close-outlined" />
		</ClientOnly>
	</span>
</template>

<script setup>
defineProps({
	label: {
		type: String,
		default: '',
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
	cursor: pointer;
	transition: opacity .3s ease-in-out;
	border: 1px solid $color-neutral-900;
	border-radius: $radius-round;

	&:hover {
		opacity: 0.5;
	}
}
</style>