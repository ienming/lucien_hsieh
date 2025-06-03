<template>
	<div
		class="d-grid wrapper"
		:class="classes">
		<slot mdc-unwrap="p" />
	</div>
</template>

<script setup>
const {column, singleOnMobile} = defineProps({
	column: {
		type: String,
		default: '2',
	},
	singleOnMobile: {
		type: Boolean,
		default: true,
	},
});

const classes = computed(() => {
	const arr = [];
	
	if (singleOnMobile) {
		arr.push(`md:grid-template-columns-${column}`);
	} else {
		arr.push(`grid-template-columns-${column}`);
	}

	return arr;
});
</script>

<style lang="scss" scoped>
.wrapper {
	gap: $space-xs;
}
</style>
