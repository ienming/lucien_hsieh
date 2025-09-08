<template>
	<NuxtLink
		:to="url"
		class="d-inline-block luc-inline-link">
		{{ label }}
		<ClientOnly>
			<Icon name="iconoir:arrow-up-right-square" />
		</ClientOnly>
	</NuxtLink>
</template>

<script setup>
defineProps({
	url: {
		type: String,
		default: '',
	},
	label: {
		type: String,
		default: '',
	},
})
</script>

<style lang="scss" scoped>
.luc-inline-link {
	&::after {
		content: '';
		display: block;
		width: 100%;
		height: 1px;
		background-color: $color-neutral-50;
	}
}
</style>