<template>
	<span
		class="d-flex align-items-center gap-space-xxs chip"
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
	padding: $space-xxs $space-sm;
	cursor: pointer;
	transition: opacity .3s ease-in-out;

	&:hover {
		opacity: 0.5;
	}
}
</style>