<template>
	<Chip
		:label="typeLabel"
		:value="type"
		:size
		class="work-type-chip">
		<template #prefixIcon>
			<div
				:style="{'background-color': typeColorStyle}"
				class="type-color" />
		</template>
	</Chip>
</template>

<script setup>
import { WORK_TYPES } from '~/constants/content';

const {type, size} = defineProps({
	type: {
		type: String,
		default: '',
	},
	size: {
		type: String,
		default: 'sm',
	},
});

const typeLabel = computed(() => {
	if (!WORK_TYPES[type]) return '?';
	return WORK_TYPES[type].id;
});

const typeColorStyle = computed(() => {
	if (!WORK_TYPES[type]) return 'black';
	return WORK_TYPES[type].color;
});
</script>

<style scoped lang="scss">
.work-type-chip {
	.type-color {
		width: 6px;
		height: 6px;
		border-radius: $radius-round;
		
		@include response(md) {
			width: 8px;
			height: 8px;
		}
	}
}

</style>
