<template>
	<div
		class="content-img"
		:class="{'disabled': !className?.includes(LIGHTBOX_CLASS_NAME)}">
		<NuxtImg
			placeholder
			:src="src"
			:alt="alt"
			:title="title"
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
</script>

<style scoped lang="scss">
.content-img {
	transition: opacity .3s ease-in-out;
	cursor: pointer;

	img {
		width: 100%;
	}

	&:hover {
		opacity: .8;
	}

	&.disabled {
		pointer-events: none;
	}
}
</style>
