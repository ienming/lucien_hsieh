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
	top: 0;
	left: 0;
	z-index: 0;

	img {
		width: 100vw;
		height: 100vh;
		object-fit: cover;
	}
}
</style>
