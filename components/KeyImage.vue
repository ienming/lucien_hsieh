<template>
	<div class="key-image">
		<!-- TODO: 移除 -->
		Key image: {{ url }}
		<NuxtImg
			v-show="url"
			:src="getImg(url.includes('alishan') ? 'fox.webp' : 'reindeer.webp')" />
	</div>
</template>

<script setup>
import { getImg } from '~/libs/helper';

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
