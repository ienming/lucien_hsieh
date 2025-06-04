<template>
	<div class="key-image">
		<Transition
			name="fade"
			mode="out-in">
			<NuxtImg
				v-if="url"
				:key="url"
				:src="url" />
		</Transition>
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
	right: 0;
	z-index: 0;

	img {
		width: 50vw;
		height: 100vh;
		object-fit: cover;
		border-radius: 0;
	}
}
</style>
