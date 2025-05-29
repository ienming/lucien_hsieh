<template>
	<NuxtImg
		class="content-img"
		placeholder
		:src="src"
		:alt="alt"
		:title="title"
		:class="{'disabled': !className.includes('lightbox')}"
		@click="$emit('preview', src)"
	/>
</template>

<script setup>
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
	margin: $space-sm 0;
	transition: opacity .3s ease-in-out;
	cursor: pointer;

	&:hover {
		opacity: .8;
	}

	&.disabled {
		pointer-events: none;
	}
}
</style>
