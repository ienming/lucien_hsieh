<template>
	<div
		class="content-img"
		:class="{'disabled': !className?.includes(LIGHTBOX_CLASS_NAME)}">
		<img
			v-if="useLocal"
			:src="src"
			alt="">
		<NuxtImg
			v-else
			placeholder
			:src="src"
			:alt="alt"
			:title="title"
			loading="lazy"
			@click="$emit('preview', src)"
		/>
	</div>
</template>

<script setup>
import { LIGHTBOX_CLASS_NAME } from '~/constants/content';

const {alt, src, title} = defineProps({
	alt: {
		type: String,
		default: '',
	},
	src: {
		type: String,
		default: '',
	},
	title: {
		type: String,
		default: '',
	},
});
defineEmits(['preview']);
const attrs = useAttrs();
const {class: className} = attrs;

// For development testing
const useLocal = computed(() => {
	if (src.startsWith('/')) return true;
	return false;
})
</script>

<style scoped lang="scss">
.content-img {
	transition: opacity .3s ease-in-out;
	cursor: pointer;

	img {
		width: 100%;
		border-radius: $radius-sm;
		margin: $space-xs 0;
	}

	&:hover {
		opacity: .8;
	}

	&.disabled {
		pointer-events: none;
	}
}
</style>
