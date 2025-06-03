<template>
	<div class="content-img">
		<NuxtImg
			placeholder
			:src="src"
			:alt="alt"
			:title="title"
			:class="{'disabled': !className.includes('lightbox')}"
			@click="$emit('preview', src)"
		/>
	</div>
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
