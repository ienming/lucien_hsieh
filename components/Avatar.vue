<template>
	<div
		:style="{'background-image': img}"
		class="avatar" />
</template>

<script setup>
defineProps({
	img: {
		type: String,
		default: '',
	},
});
</script>

<style scoped lang="scss">
.avatar {
	width: 48px;
	height: 48px;
	border-radius: $radius-round;
	border: 1px solid $color-neutral-900;
	background-color: $color-neutral-900;
}
</style>
