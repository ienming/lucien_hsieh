<template>
	<div
		class="d-grid wrapper"
		:class="classes">
		<slot mdc-unwrap="p" />
	</div>
</template>

<script setup>
const {column} = defineProps({
	column: {
		type: String,
		default: '2',
	},
});

const classes = computed(() => {
	const arr = [];
	
	arr.push(`grid-template-columns-1`);
	arr.push(`md:grid-template-columns-${column}`);

	return arr;
});
</script>

<style lang="scss" scoped>
.wrapper {
	gap: $space-xs;
}
</style>
