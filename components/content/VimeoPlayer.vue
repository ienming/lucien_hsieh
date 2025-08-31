<template>
	<div
		class="video-player-container"
		:style="{ paddingBottom: aspectRatio+'%' }">
		<iframe
			:title="title"
			:src="vimeoUrl"
			frameborder="0"
			allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			class="h-full w-full video-player" />
	</div>
</template>

<script setup>
const {videoId, title, aspectRatio, isBackground} = defineProps({
	videoId: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		default: 'videoTitle',
	},
	aspectRatio: {
		type: Number,
		default: 56.25,
	},
	isBackground: {
		type: Boolean,
		default: true,
	},
});

const vimeoUrl = computed(() => {
	if (isBackground) {
		return `https://player.vimeo.com/video/${videoId}?background=1`;
	}
	return `https://player.vimeo.com/video/${videoId}`;
});
</script>

<style lang="scss" scoped>
.video-player-container {
	position: relative;
	border-radius: $radius-sm;
	overflow: hidden;

	.video-player {
		position: absolute;
		top: 0;
		left: 0;
	}
}
</style>