<template>
	<div class="key-image">
		<NuxtImg
			v-show="url"
			:src="url" />
	</div>
</template>

<script setup>
defineProps({
	url: {
		type: String,
		default: '',
	},
});
</script>

<style scoped lang="scss">
.key-image {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 0;

	img {
		max-width: 800px;
	}
}
</style>
