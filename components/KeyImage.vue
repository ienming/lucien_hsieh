<template>
	<div class="key-image">
		<!-- TODO: 移除 -->
    	Key image: {{ id }}
		<!-- <NuxtImg
			v-show="id"
			:src="getImg({url: 'reindeer.webp'})" /> -->
	</div>
</template>

<script setup>
import { getImg } from '~/libs/helper';

defineProps({
	id: {
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
}
</style>
