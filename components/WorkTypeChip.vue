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
import { WORKLIST_TYPES } from '~/constants/content';

const props = defineProps({
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
	if (props.type === WORKLIST_TYPES.UIUX) {
		return 'UIUX';
	}else if (props.type === WORKLIST_TYPES.FE) {
		return 'Frontend Dev';
	}else if (props.type === WORKLIST_TYPES.APP) {
		return 'APP Design';
	}else if (props.type === WORKLIST_TYPES.LANDING_PAGE) {
		return 'Landing Page';
	}else if (props.type === WORKLIST_TYPES.DATA_VIZ) {
		return 'Data Visualization';
	}

	return '?';
});

const typeColorStyle = computed(() => {
	if (props.type === WORKLIST_TYPES.UIUX) {
		// TOOD: 把色票歸檔
		return '#2E7BF7';
	}else if (props.type === WORKLIST_TYPES.FE) {
		return '#4AEC5D';
	}else if (props.type === WORKLIST_TYPES.APP) {
		return '#AA6AF9';
	}else if (props.type === WORKLIST_TYPES.LANDING_PAGE) {
		return '#E4EC4A';
	}

	return 'black';
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
