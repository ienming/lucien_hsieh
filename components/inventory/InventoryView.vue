<template>
	<div class="inventory-view">
		<div class="tool-bar">{{ t('viewInList') }}</div>
		<CardStack />
	</div>
</template>

<script setup>
import CardStack from '../inventory/CardStack.vue';

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.inventory-view {
	position: relative;

	.tool-bar {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		justify-content: end;
		padding: var(--spacing-lg);
	}
}
</style>
