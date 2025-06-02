<template>
	<span
		class="d-flex align-items-center gap-space-xs chip"
		@click="$emit('close')">
		<span>{{ label }}</span>
		<ClientOnly class="close">
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
});
defineEmits(['close']);
</script>

<style lang="scss" scoped>
.chip{
	border: 1px solid $color-text-secondary;
	padding: $space-xxs $space-sm;
	cursor: pointer;
	transition: opacity .3s ease-in-out;
	border-radius: $radius-xs;

	&:hover {
		opacity: 0.5;
	}
}
</style>