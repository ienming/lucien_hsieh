<template>
	<MasonryWall
		:items="items"
		:ssr-columns="1"
		:column-width="300"
		:gap="8"
		max-columns="2">
		<template #default="{ item }">
			<ImageRenderer :src="item" />
		</template>
	</MasonryWall>
</template>

<script setup>
import MasonryWall from '@yeger/vue-masonry-wall';

defineProps({
	items: {
		type: Array,
		default: () => [],
	},
});
</script>